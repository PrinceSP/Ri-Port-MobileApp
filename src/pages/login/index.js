import React, {useState,useContext} from 'react'
import {Text,View,Image,StyleSheet,ScrollView} from 'react-native'
import {MainLogo} from '../../assets'
import {Input,Gap,Button,Header} from '../../components'
import {AuthContext} from '../../context/authContext'

const Login =({navigation})=>{
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const {isFetching,dispatch} = useContext(AuthContext)

  const fetchData = async()=>{
    dispatch({type:"LOGIN_START"})
    try {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:'dindadgm',password:'123123123'})
      }
      const response = await fetch('https://riport-app.herokuapp.com/api/auth/login',options)
      const results = await response.json()
      dispatch({type:"LOGIN_SUCCESS",payload:results.datas})
      setUsername('')
      setPassword('')
      navigation.navigate('Root',{screen:'BottomTabs'})
    } catch (e) {
      isFetching=false
      return e
    }
  }
  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Sign Up" action='Cancel' nav={navigation}/>
      <Gap height={45}/>
      <ScrollView>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <MainLogo height={130}/>
          <Gap height={65}/>
          <Input placeholder="Username" defaultValue={username} onChangeText={event=>setUsername(event)}/>
          <Gap height={30}/>
          <Input placeholder="Password" defaultValue={password} onChangeText={event=>setPassword(event)}/>
          <Gap height={26}/>
          <Text style={style.poppinsMed}>forgot password?</Text>
          <Gap height={29}/>
          <Button style={style.button} name="SIGN IN" color="#FFF" weight={500} size={24} onPress={()=>fetchData()}/>
          <Gap height={25}/>
          <View style={{flexDirection:'row'}}>
            <Text style={style.poppinsMed}>Not a user yet?</Text>
            <Button name='Sign Up' color='#FF1D1D' fam='Poppins-Bold' style={{marginLeft:4}} onPress={()=>navigation.navigate('Register')}/>
          </View>
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
    fontFamily:'Poppins-Medium',
    color:'#777'
  }
})

export default Login
