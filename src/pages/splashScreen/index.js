import React, {useEffect,useState} from 'react'
import {View} from 'react-native'
import {MainLogo} from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation})=>{
  const[loading,setLoading] = useState(true)
  const[viewedOnBoarding,setViewedOnBoarding] = useState(false)

  const checkOnBoarding = async()=>{
    try {
      const value = await AsyncStorage.getItem("@viewed")
      if (value!==null) {
        setViewedOnBoarding(true)
      }
    } catch (e) {
      console.log(e);
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    checkOnBoarding()
    setTimeout(()=>{
      loading?navigation.replace('WelcomeScreen'):navigation.replace('OnBoardingPage');
    },1000)
  },[])
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <MainLogo/>
    </View>
  )
}

export default SplashScreen
