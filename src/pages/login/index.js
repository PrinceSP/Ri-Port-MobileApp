import React from 'react'
import {Text,View,StyleSheet,ScrollView} from 'react-native'
import {MainLogo} from '../../assets'
import {Input,Gap,Button,Header} from '../../components'

const Login =()=>{
  return(
    <ScrollView>
      <Gap height={20}/>
      <Header name="Sign In"/>
      <Gap height={45}/>
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <MainLogo height={130}/>
        <Gap height={65}/>
        <Input placeholder="Email address" />
        <Gap height={30}/>
        <Input placeholder="Password" />
        <Gap height={26}/>
        <Text style={style.poppinsMed}>forgot password?</Text>
        <Gap height={29}/>
        <Button style={style.button} name="SIGN IN" color="#FFF" weight={500} size={24}/>
        <Gap height={25}/>
        <View style={{flexDirection:'row'}}>
          <Text style={style.poppinsMed}>Not a user yet?</Text>
          <Text style={[style.poppinsMed,{color:'#FF1D1D'}]}> Sign Up</Text>
        </View>
      </View>
    </ScrollView>
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

export default Login
