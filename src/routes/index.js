import React from 'react'
import { Button, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {WelcomeScreen,OnBoardingPage,SplashScreen,Login,Register,Home,Profile,MainApp} from '../pages'

const {Navigator, Screen} = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Root=()=>{
  return(
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Drawer.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
    </Drawer.Navigator>
  )
}

const Routes = ()=>{
  return(
    <Navigator>
      <Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
      <Screen name="OnBoardingPage" component={OnBoardingPage} options={{headerShown:false}}/>
      <Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown:false}}/>
      <Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Screen name="Root" component={Root} options={{headerShown:false}}/>
    </Navigator>
  )
}
export default Routes
