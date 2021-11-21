import React, {useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Alert} from 'react-native'
import {Header,Gap,ReportForm,MapFinder,Button} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'

const ReportPage = ({navigation})=>{
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [photoName,setPhotoName] = useState('no photo uploaded')
  const [data,setData] = useState()
  const [reportInfo,setReportInfo] = useState({
    photo:'',
    location:{
      addressDesc:'',
      lang:'',
      lons:''
    }
  })

  const getImage=()=>{
    const options={
      maxHeight:160,maxWidth:160,
      includeBase64:true,saveToPhotos: true
    }

    launchImageLibrary(options,res=>{
      const localTime = new Date().getTime();
      const file ={
        uri : res.assets[0].uri,
        name :localTime +'.jpg',
      }

      //handling when user cancel upload the image
      if(res.didCancel){
        //reset the value to its default value
        setHasPhoto(false)
        setReportInfo({photo:''});
        setPhotoBase64('');
        setPhotoName('no photo uploaded')
      }else{
        setReportInfo({...reportInfo,photo:res.assets[0].uri});
        setPhotoBase64(res.assets[0].base64);
        setHasPhoto(true);
        setPhotoName(file.name)
        console.log(res.assets[0].fileName);
      }
    })
  }

  const toReportForm = (datas)=>{
    setData(datas)
  }

  const submit = ()=>{
    console.log(data,reportInfo);
  }

  return(
    <View style={container}>
      <Gap height={15}/>
      <Header name="report" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={style.formContainer}>
        <Text style={text1}>Make Your Report</Text>
        <Gap height={63}/>
        <ReportForm formData={toReportForm}/>
        <MapFinder/>
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
