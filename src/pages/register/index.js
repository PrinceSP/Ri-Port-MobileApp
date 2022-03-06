import React,{useState} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,Platform} from 'react-native'
import {Input,Gap,Button,Header,ImagePicker} from '../../components'
import {EyeTrue,EyeFalse} from '../../assets'

const Register =({navigation})=>{
  const [show,setShow] = useState(false)
  const [userInfo,setUserInfo] = useState({
    username:'',
    email:'',
    password:''
  })
  const {username,email,password} = userInfo
  const [hide,setHide] = useState(true)

  //handle submit form button
  const submit = async ()=>{
    try {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,email,phoneNumber:'0987654321',password})
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
      setUserInfo({...userInfo,username:'',email:'',password:''})
    } catch (e) {
      return e
    }
    setHide(true)
  }

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={40}/>
      <Text style={style.headingText}>Create a New Account</Text>
      <Text style={style.desc}>{`Create an account so you can post your personal report or see others`}</Text>
      <View style={{alignItems:'center',justifyContent:'center',paddingBottom:35}}>
        <Gap height={39}/>
        <Input borderRadius={10} setLabel={true} label="Username" placeholder="goncalves210" defaultValue={username} onChangeText={(event)=>{
            setUserInfo({...userInfo,username:event})}}/>
        <Gap height={30}/>
        <Input borderRadius={10} setLabel={true} label="Email" placeholder="raul@gmail.com" defaultValue={email} onChangeText={(event)=>{
            setUserInfo({...userInfo,email:event})}}/>
        <Gap height={30}/>
        <View>
          <Input borderRadius={10} setLabel={true} label="Password" placeholder="character must be 8 or more" defaultValue={password} secureTextEntry={hide} onChangeText={(event)=>{
              setUserInfo({...userInfo,password:event})}}/>
          {hide ? <EyeFalse height={20} onPress={()=>setHide(false)} style={style.passwordHideToggle}/> : <EyeTrue height={20} onPress={()=>setHide(true)} style={style.passwordHideToggle}/>}
        </View>
          <Gap height={58}/>
        <Button name="SIGN UP" color="#FFF" fam='Poppins-Medium' size={24} style={style.button}
          onPress={()=>submit()}/>
        <Gap height={28}/>
        <View style={{flexDirection:'row'}}>
          <Text style={style.poppinsMed}>Have an account?</Text>
          <Button name='Login' color='#FF1D1D' fam='Poppins-Bold' style={{marginLeft:4}} onPress={()=>navigation.navigate('Login')}/>
        </View>
      </View>
    </View>

  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#4444FF',
    height:66,
    width:329,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:15,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: "#88aaff",
        shadowOpacity: 1,
        shadowRadius:20,
      },
      android:{
        elevation: 14,
      },
    })
  },
  poppinsMed:{
    fontFamily:'Poppins-Medium',
    color:'#777'
  },
  headingText:{fontSize:28,fontFamily:'Lato-Black',color:'#493dbf',marginLeft:30,marginBottom:10},
  desc:{
    fontFamily:'Poppins-Regular',
    color:'#bababf',
    textAlign:'left',
    marginLeft:30,
    fontSize:16
  },
  passwordHideToggle:{position:'absolute',right:0,top:45}
})

export default Register
