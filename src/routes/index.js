import React from 'react'
import { Button, View,Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {WelcomeScreen,OnBoardingPage,SplashScreen,Login,Feedback,
  Register,Home,Profile,ReportPage,NotificationsPage,EditProfilePage} from '../pages'
import {DrawerContent,TabsContent} from '../components'
const {Navigator, Screen} = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

 const BottomTabs = ()=>{
  return(
    <Tab.Navigator tabBar={(props)=><TabsContent {...props}/>} screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Report" component={ReportPage}/>
      <Tab.Screen name="Notif" component={NotificationsPage}/>
    </Tab.Navigator>
  )
}
const Root=()=>{
  return(
    <Drawer.Navigator initialRouteName="Home"
      drawerContent={props=><DrawerContent {...props}/>}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 300,
          borderTopRightRadius:20,
          borderBottomRightRadius:20,
        },
        focused:Boolean,
        drawerActiveBackgroundColor:'#abcdef'
      }}>
      <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{headerShown:false}}/>
      <Drawer.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
      <Drawer.Screen name="Feedback" component={Feedback} options={{headerShown:false}}/>
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
      <Screen name="EditProfile" component={EditProfilePage} options={{headerShown:false}}/>
      <Screen name="Root" component={Root} options={{headerShown:false}}/>
    </Navigator>
  )
}
export default Routes
