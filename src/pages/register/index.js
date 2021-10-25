import React,{useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Input,Gap,Button,Header} from '../../components'
import {PD} from '../../assets'
import {launchImageLibrary} from 'react-native-image-picker'

const Register =({navigation})=>{
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')

  let isTrue;

  const getImage=()=>{
    const options={
      maxHeight:160,
      maxWidth:160,
      // includeBase64:true,
    }
    launchImageLibrary(options,res=>{
      console.log(res.assets[0].uri);
      if(res.didCancel){
        setHasPhoto(false)
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.base64);
        setHasPhoto(true);
      }
    })
  }

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={20}/>
      <Header name="Sign Up"/>
      <Gap height={45}/>
      <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center',paddingBottom:35}}>
        <View style={{alignItems:'center'}}>
          <View style={{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:150,width:150,alignItems:'center',justifyContent:'center'}}>
            {isTrue = hasPhoto===true?<Image style={{height:130,width:130,borderRadius:65}} source={{uri:photo}}/>:<View style={{height:130,width:130,backgroundColor:'#eee',borderRadius:65}}/>}
          </View>
          <Gap height={21}/>
          <Button name="Upload a profile image"
            color="#6DCDF5"
            fam="Poppins-Medium"
            size={19}
            style={{miWidth:200,alignItems:'center'}}
            onPress={getImage}/>
        </View>
        <Gap height={59}/>
        <Input placeholder="Fullname" />
        <Gap height={30}/>
        <Input placeholder="Email address" />
        <Gap height={30}/>
        <Input placeholder="Address" />
        <Gap height={30}/>
        <Input placeholder="Date of birth" />
        <Gap height={30}/>
        <Input placeholder="Phone number" />
        <Gap height={30}/>
        <Input placeholder="ID Card" />
        <Gap height={30}/>
        <Input placeholder="Password" />
        <Gap height={78}/>
        <Button style={style.button} name="SIGN UP" color="#FFF" weight={500} size={24}
          onPress={()=>navigation.navigate('Root',{screen:'Home'})}/>
        <Gap height={28}/>
        <View style={{flexDirection:'row'}}>
          <Text style={style.poppinsMed}>Have an account?</Text>
          <Text style={[style.poppinsMed,{color:'#FF1D1D'}]}> Login</Text>
        </View>
      </ScrollView>
    </View>

  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#ED6262',
    height:66,
    width:329,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  poppinsMed:{
    fontFamily:'Poppins-Medium'
  }
})

export default Register
