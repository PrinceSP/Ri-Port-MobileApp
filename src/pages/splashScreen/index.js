import React, {useEffect} from 'react'
import {
  Text,
  View,
} from 'react-native'
import {MainLogo} from '../../assets'

const SplashScreen = ({navigation})=>{
  useEffect(()=>{
    setTimeout(()=>{
      navigation.replace('OnBoardingPage');
    },1200)
  },[])
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <MainLogo/>
    </View>
  )
}

export default SplashScreen
