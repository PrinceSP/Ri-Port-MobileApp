import React, {useState} from 'react'
import {Text,View,StyleSheet,ScrollView} from 'react-native'
import {Header,Gap,ReportForm,MapFinder,Button} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'

const ReportPage = ({navigation})=>{
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [photoName,setPhotoName] = useState('no photo uploaded')

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

      if(res.didCancel){
        setHasPhoto(false)
        setPhoto('');
        setPhotoBase64('');
        setPhotoName('no photo uploaded')
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.assets[0].base64);
        setHasPhoto(true);
        setPhotoName(file.name)
        console.log(res.assets[0].fileName);
      }
    })
  }

  return(
    <View style={container}>
      <Gap height={15}/>
      <Header name="report" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={style.formContainer}>
        <Text style={text1}>Make Your Report</Text>
        <Gap height={63}/>
        <ReportForm/>
        <MapFinder/>
        <Gap height={47}/>
        <View style={{width:270}}>
          <Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Upload Road Picture*</Text>
          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Button name="Upload" color='#fff' fam='Poppins-Medium' style={button} onPress={()=>getImage()}/>
            <Text style={{marginLeft:18}}>{photoName}</Text>
          </View>
        </View>
        <View style={{alignItems:'center'}}>
          <Button name="Submit Report" color='#fff' fam='Poppins-Bold' size={24} style={buttonSubmit}/>
        </View>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  text1:{fontSize:20,fontFamily:'Lato-Bold'},
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
