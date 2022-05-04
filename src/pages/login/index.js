import React, {useState,useContext} from 'react'
import {Text,View,Image,StyleSheet,KeyboardAvoidingView,ActivityIndicator,Platform} from 'react-native'
import {MainLogo,EyeTrue,EyeFalse} from '../../assets'
import {Input,Gap,Button,Header,toastConfig} from '../../components'
import {AuthContext} from '../../context/authContext'
import Toast from 'react-native-toast-message';

const Login =({navigation})=>{
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [formError,setFormError] = useState('')
  const [hide,setHide] = useState(true)
  const {isFetching,dispatch} = useContext(AuthContext)
  const url = 'https://riport-app.herokuapp.com/api/auth/login'

  const handleLogin = async()=>{
    dispatch({type:"LOGIN_START"})
    try {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,password})
      }
      const response = await fetch(url,options)
      const results = await response.json()

      if (response.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: [results.datas] });
        Toast.show({
          type:'success',
          text1:'Success',
          text2:'Successfuly login'
        })
        setTimeout(()=>{
          navigation.navigate('Root',{screen:'BottomTabs'})
        },1000)
      }else{
        isFetching=false
        Toast.show({
          type:'error',
          text1:'Error',
          text2:'Username or Password is invalid!'
        })
      }
      setPassword('')
      setUsername('')
    } catch (e) {
      dispatch({ type: "LOGIN_FAILURE", payload: e });
      Toast.show({
        type:'error',
        text1:'Error',
        text2:'Username or Password is invalid!'
      })
    }
    setHide(true)
  }

  const signUp = ()=>{
    navigation.navigate('Register')
    setPassword('')
    setUsername('')
  }

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Sign In" action='Cancel' nav={navigation}/>
      <Gap height={45}/>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={style.container}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <MainLogo height={130}/>
          <Gap height={65}/>
          <Input placeholder="Username" borderRadius={14} defaultValue={username} onChangeText={event=>setUsername(event)}/>
          <Gap height={30}/>
          {isFetching&&<ActivityIndicator style={{zIndex:1,position:'absolute',top:200,backgroundColor:'#bcbcbc',padding:10,borderRadius:50}} size="large" color="#fff"/>}
          <View>
            <Input placeholder="Password" borderRadius={14} defaultValue={password} secureTextEntry={hide} onChangeText={event=>setPassword(event)}/>
            {hide ? <EyeFalse height={20} onPress={()=>setHide(false)} style={{position:'absolute',right:0,top:15}}/> : <EyeTrue height={20} onPress={()=>setHide(true)} style={{position:'absolute',right:0,top:15}}/>}
          </View>
          <Gap height={26}/>
          <Button name='forgot password?' style={style.poppinsMed} onPress={()=>navigation.navigate('ForgotPassword')}/>
          <Gap height={29}/>
          <Button style={style.button} name={isFetching?"LOADING...":"SIGN IN"} color="#FFF" weight={500} size={24} onPress={()=>handleLogin()}/>
          <Gap height={25}/>
          <View style={{flexDirection:'row'}}>
            <Text style={style.poppinsMed}>Not a user yet?</Text>
            <Button name='Sign Up' color='#FF1D1D' fam='Poppins-Bold' style={{marginLeft:4}} onPress={()=>signUp()}/>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} position='top' topOffset={0} visibilityTime={2000}/>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1
  },
  button:{
    marginBottom:15,
    backgroundColor:'#ED6262',
    height:60,
    width:329,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
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
  }
})

export default Login
