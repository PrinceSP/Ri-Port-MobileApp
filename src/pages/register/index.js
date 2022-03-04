import React,{useState} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import {Input,Gap,Button,Header,ImagePicker} from '../../components'


const Register =({navigation})=>{
  const [show,setShow] = useState(false)
  const [userInfo,setUserInfo] = useState({
    username:'',
    phoneNumber:'',
    password:''
  })
  const {username,phoneNumber,password} = userInfo

  //handle submit form button
  const submit = async ()=>{
    try {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,phoneNumber,password})
      }
      const req = await fetch('https://riport-app.herokuapp.com/api/auth/register',options)
      const results = await req.json()
      if (req.status === 200) {
        setTimeout(()=>{
          navigation.navigate('Login')
        },1000)
      } else{
        console.log(results);
      }
      // reset the values of each keys after submit button has been pressed
      setUserInfo({...userInfo,username:'',phoneNumber:'',password:''})
    } catch (e) {
      return e
    }
  }

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Sign Up" action='Cancel' nav={navigation}/>
      <Gap height={70}/>
      <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center',paddingBottom:35}} showsVerticalScrollIndicator={false}>
        <Text style={style.headingText}>Create an account</Text>
        <Gap height={59}/>
        <Input placeholder="Username" defaultValue={username} onChangeText={(event)=>{
            setUserInfo({...userInfo,username:event})}}/>
        <Gap height={30}/>
        <Input placeholder="Phone number" defaultValue={phoneNumber} onChangeText={(event)=>{
            setUserInfo({...userInfo,phoneNumber:event})}}/>
        <Gap height={30}/>
        <Input placeholder="Password" defaultValue={password} onChangeText={(event)=>{
            setUserInfo({...userInfo,password:event})}}/>
        <Gap height={78}/>
        <Button name="SIGN UP" color="#FFF" fam='Poppins-Medium' size={24} style={style.button}
          onPress={()=>submit()}/>
        <Gap height={28}/>
        <View style={{flexDirection:'row'}}>
          <Text style={style.poppinsMed}>Have an account?</Text>
          <Button name='Login' color='#FF1D1D' fam='Poppins-Bold' style={{marginLeft:4}} onPress={()=>navigation.navigate('Login')}/>
        </View>
      </ScrollView>
    </View>

  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#FFB830',
    height:66,
    width:329,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  poppinsMed:{
    fontFamily:'Poppins-Medium',
    color:'#777'
  },
  headingText:{fontSize:28,fontFamily:'Poppins-Bold',color:'#000'}
})

export default Register
