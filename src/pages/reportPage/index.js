import React, {useState,useEffect} from 'react'
import {Text,View,StyleSheet,ScrollView,Alert} from 'react-native'
import {Header,Gap,ReportForm,MapFinder,Button,ReportInput} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'

const ReportPage = ({navigation})=>{
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoInfos,setPhotoInfos] = useState({
    photoBase64:'',
    photo:''
  })
  const [photoName,setPhotoName] = useState('no photo uploaded')
  const [data,setData] = useState({
    fname:'',
    address:'',
    phone:'',
    idCard:'',
  })
  const [reportInfo,setReportInfo] = useState({})

  const getImage=()=>{
    const options={
      maxHeight:160,maxWidth:160,
      includeBase64:true,saveToPhotos: true
    }

    launchImageLibrary(options,res=>{
      const localTime = new Date().getTime();
      const fileName = localTime +'.jpg';
      //handling when user cancel upload the image
      if(res.didCancel){
        //reset the value to its default value
        setHasPhoto(false)
        setPhotoInfos({photo:''});
        setPhotoInfos({photoBase64:''});
        setPhotoName('no photo uploaded')
      }else{
        setPhotoInfos({...photoInfos,photo:res.assets[0].uri});
        setPhotoInfos({...photoInfos,photoBase64:res.assets[0].base64});
        setHasPhoto(true);
        setPhotoName(fileName)
      }
    })
  }

  const {fname,address,idCard,phone} = data

  const getGeometrics = (datas)=>{
    setReportInfo(datas)
  }

  const submit = ()=>{
    //merge all the datas from these states
    //submit all the datas from form
    const allDatas = {...data,...reportInfo,...photoInfos};
    for (let data in allDatas) {
      if (data.values(data) != '') {
        console.log(data.values(data));
      }
    }
    console.log(allDatas);
    setData({...data,fname:'',address:'',phone:'',idCard:''})
    setPhotoInfos({...photoInfos,photoBase64:'',photo:''})
    setReportInfo({})

    return allDatas
  }

  return(
    <View style={container}>
      <Gap height={15}/>
      <Header name="report" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={style.formContainer}>
        <Text style={text1}>Make Your Report</Text>
        <Gap height={63}/>
        {/*<ReportForm formData={toReportForm}/>*/}
        <View>
          <ReportInput label="Fullname *" value={fname} onChangeText={e=>{
              setData({...data,fname:e})
            }}/>
          <Gap height={28}/>
          <ReportInput label="Phone Number *" value={phone} onChangeText={e=>{
              setData({...data,phone:e})
            }}/>
          <Gap height={28}/>
          <ReportInput label="ID Card *" value={idCard} onChangeText={e=>{
              setData({...data,idCard:e})
            }}/>
          <Gap height={28}/>
          <ReportInput label="Your Address *" value={address} onChangeText={e=>{
              setData({...data,address:e})
            }}/>
          <Gap height={28}/>
        </View>
        <MapFinder getGeometrics={getGeometrics}/>
        <Gap height={47}/>
        <View style={{width:270}}>
          <Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Upload Road Picture*</Text>
          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Button name="Upload" color='#fff' fam='Poppins-Medium' style={button} onPress={()=>getImage()}/>
            <Text style={{marginLeft:18,color:'#000'}}>{photoName}</Text>
          </View>
        </View>
        <View style={{alignItems:'center'}}>
          <Button name="Submit Report" color='#fff' fam='Poppins-Bold' size={24} style={buttonSubmit} onPress={()=>submit()}/>
        </View>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  text1:{fontSize:20,fontFamily:'Lato-Bold',color:'#565665'},
  formContainer:{paddingHorizontal:20,paddingBottom:150},
  button:{
    marginTop:12,
    backgroundColor:'#000',
    height:37,
    width:88,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonSubmit:{
    marginTop:68,
    backgroundColor:'#598EF5',
    height:67,
    width:340,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
})

const {container,text1,mapContainer,formContainer,button,buttonSubmit} = style


export default ReportPage
