import React from 'react'
import {Text,View,StyleSheet} from 'react-native'
import {MainLogo} from '../../assets'
import {Input,Gap,Button} from '../../components'

const Login =()=>{
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <MainLogo height={130}/>
      <Gap height={65}/>
      <Input placeholder="Email address" />
      <Gap height={30}/>
      <Input placeholder="Password" />
      <Gap height={26}/>
      <Text>forgot password?</Text>
      <Gap height={29}/>
      <Button style={style.button} name="SIGN IN" color="#FFF" weight={500} size={24}/>
      <Gap height={25}/>
      <View style={{flexDirection:'row'}}>
        <Text>Not a user yet?</Text>
        <Text>Sign Up</Text>
      </View>
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
  }
})

export default Login
