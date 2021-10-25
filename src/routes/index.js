import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {WelcomeScreen,OnBoardingPage,SplashScreen,Login,Register} from '../pages'

const {Navigator, Screen} = createNativeStackNavigator()

const Routes = ()=>{
  return(
    <Navigator>
      <Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
      <Screen name="OnBoardingPage" component={OnBoardingPage} options={{headerShown:false}}/>
      <Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown:false}}/>
      <Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Screen name="Register" component={Register} options={{headerShown:false}}/>
    </Navigator>
  )
}

export default Routes
