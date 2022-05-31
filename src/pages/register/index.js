import React,{useState} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,Platform,ActivityIndicator} from 'react-native'
import {Input,Gap,Button,Header,ImagePicker,toastConfig} from '../../components'
import {isValidObjField,updateError,isValidEmail} from '../../config/validator'
import {EyeTrue,EyeFalse} from '../../assets'
import Toast from 'react-native-toast-message';

const Register =({navigation})=>{
  const [userInfo,setUserInfo] = useState({
    username:'',
    email:'',
    password:'',
    ktpId:''
  })
  const [message,setMessage] = useState("")
  const [hide,setHide] = useState(true)
  const {username,email,password,ktpId} = userInfo
  const [isFetching,setIsFetching] = useState(false)

  const validation = ()=>{
    if(!isValidObjField(userInfo))
      return updateError("Fields can't be empty",setMessage)
    if (!username.trim() || username.length < 6)
      return updateError("Username must have min 6 characters",setMessage)
    if(!isValidEmail(email))
      return updateError("Email address must contains '@'",setMessage)
    if(email.length < 8)
      return updateError("Email length must be 8 or more characters")
    if(!ktpId.trim() || ktpId.length < 16)
      return updateError("KTP ID's length must have 16 characters or more",setMessage)
    if(!password.trim() || password.length < 8 )
      return updateError("Password must have min 8 characters",setMessage)

    return true
  }
  //handle submit form button
  const submit = async ()=>{
    try {
      if (validation()) {
        const options = {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username,email:{mail:email},phoneNumber:{number:'-'},password, ktpId,role:'reporter'})
        }
        setIsFetching(true)
        const req = await fetch('https://riport-app.herokuapp.com/api/auth/register',options)
        const results = await req.json()
        if (req.status === 200) {
          setIsFetching(false)
          Toast.show({
            type:'success',
            text1:'Success',
            text2:'Your new account has been saved!'
          })
          setTimeout(()=>{
            navigation.navigate('Login')
          },1000)
        } else{
          setIsFetching(false)
          Toast.show({
            type:'error',
            text1:'Error',
            text2:'An error occured'
          })
        }
        // reset the values of each keys after submit button has been pressed
        setUserInfo({...userInfo,username:'',email:'',password:'',ktpId:''})
      }
    } catch (e) {
      setIsFetching(false)
      Toast.show({
        type:'error',
        text1:'Error',
        text2:'An error occured'
      })
      return e
    }
    setHide(true)
  }

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Sign Up" action='Cancel' nav={navigation}/>
      <Gap height={30}/>
      <Text style={style.headingText}>Create a New Account</Text>
      <Text style={style.desc}>{`Create an account so you can post your personal report or see others`}</Text>
      <View style={{alignItems:'center',justifyContent:'center',paddingBottom:35}}>
        {isFetching===true&&<ActivityIndicator style={{zIndex:1,position:'absolute',top:200,backgroundColor:'#bcbcbc',padding:10,borderRadius:50}} size="large" color="#fff"/>}
        <Gap height={40}/>
        {message ? <Text style={{color:'#000'}}>{message}</Text> : null}
        <Input borderRadius={14} placeholder="goncalves210" defaultValue={username} onChangeText={(event)=>{
            setUserInfo({...userInfo,username:event})}}/>
        <Gap height={30}/>
        <Input borderRadius={14} placeholder="raul@gmail.com" defaultValue={email} onChangeText={(event)=>{
            setUserInfo({...userInfo,email:event})}}/>
        <Gap height={30}/>
        <Input borderRadius={14} placeholder="KTP ID : 7302188080xxx" defaultValue={ktpId} onChangeText={(event)=>{
            setUserInfo({...userInfo,ktpId:event})}}/>
        <Gap height={30}/>
        <View>
          <Input borderRadius={14} placeholder="character must be 8 or more" defaultValue={password} secureTextEntry={hide} onChangeText={(event)=>{
              setUserInfo({...userInfo,password:event})}}/>
          {hide ? <EyeFalse height={20} onPress={()=>setHide(false)} style={style.passwordHideToggle}/> : <EyeTrue height={20} onPress={()=>setHide(true)} style={style.passwordHideToggle}/>}
        </View>
          <Gap height={58}/>
        <Button name="SIGN UP" color="#FFF" fam='Poppins-Medium' size={24} style={style.button}
          onPress={()=>submit()}/>
        <Gap height={28}/>
        <View style={{flexDirection:'row'}}>
          <Text style={style.poppinsMed}>Have an account?</Text>
          <Button name='Sign In' color='#FF1D1D' fam='Poppins-Bold' style={{marginLeft:4}} onPress={()=>navigation.navigate('Login')}/>
        </View>
      </View>
      <Toast config={toastConfig} position='top' topOffset={0} visibilityTime={2000}/>
    </View>
  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:10,
    backgroundColor:'#4444FF',
    height:55,
    width:329,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
    elevation:20,
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
  passwordHideToggle:{position:'absolute',right:0,top:15},
  errorToggle:{
    fontFamily:'Poppins-Regular',
    color:'#000',
    textAlign:'left',
    marginBottom:10,
    fontSize:16
  }
})

export default Register
