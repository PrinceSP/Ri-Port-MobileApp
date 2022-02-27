import React, {useState,useContext} from 'react'
import {Text,View,Image,StyleSheet,SafeAreaView} from 'react-native'
import {MainLogo} from '../../assets'
import {Input,Gap,Button,Header} from '../../components'
import {AuthContext} from '../../context/authContext'

const Login =({navigation})=>{
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
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
        dispatch({ type: "LOGIN_SUCCESS", payload: results.datas });
        setPassword('')
        setUsername('')
        navigation.navigate('Root',{screen:'BottomTabs'})
      }else {
        console.log(results);
      }
    } catch (e) {
      dispatch({ type: "LOGIN_FAILURE", payload: e });
      setPassword('')
      setUsername('')
    }
  }
  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Sign Up" action='Cancel' nav={navigation}/>
      <Gap height={45}/>
      <SafeAreaView>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <MainLogo height={130}/>
          <Gap height={65}/>
          <Input placeholder="Username" defaultValue={username} onChangeText={event=>setUsername(event)}/>
          <Gap height={30}/>
          <Input placeholder="Password" defaultValue={password} onChangeText={event=>setPassword(event)}/>
          <Gap height={26}/>
          <Text style={style.poppinsMed}>forgot password?</Text>
          <Gap height={29}/>
          <Button style={style.button} name="SIGN IN" color="#FFF" weight={500} size={24} onPress={()=>handleLogin()}/>
          <Gap height={25}/>
          <View style={{flexDirection:'row'}}>
            <Text style={style.poppinsMed}>Not a user yet?</Text>
            <Button name='Sign Up' color='#FF1D1D' fam='Poppins-Bold' style={{marginLeft:4}} onPress={()=>navigation.navigate('Register')}/>
          </View>
        </View>
      </SafeAreaView>
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
    fontFamily:'Poppins-Medium',
    color:'#777'
  }
})

export default Login
