import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {WelcomeScreen,OnBoardingPage,SplashScreen,OtpScreen,Login,Feedback,ReportListPage,EditEmail,
  Register,Home,EditIDCard,EditPhone,Profile,ReportPage,EditBornDate,NotificationsPage,EditProfilePage} from '../pages'
import {DrawerContent,TabsContent} from '../components'
const {Navigator, Screen} = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomTabs = ()=>{
  return(
    <Tab.Navigator screenOptions={() => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarVisible: false,
      })}
      tabBar={(props)=><TabsContent {...props}/>}>
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
      <Drawer.Screen name="ReportListPage" component={ReportListPage} options={{headerShown:false}}/>
      <Drawer.Screen name="Feedback" component={Feedback} options={{headerShown:false}}/>
    </Drawer.Navigator>
  )
}

const Routes = ()=>{
  const[viewedOnBoarding,setViewedOnBoarding] = React.useState(false)
  const checkOnBoarding = async()=>{
    try {
      const value = await AsyncStorage.getItem("@viewed")
      if (value!==null) {
        return setViewedOnBoarding(true)
      }else{
        return setViewedOnBoarding(false)
      }
    } catch (e) {
      return e
    }
  }
  React.useEffect(()=>{
    checkOnBoarding()
  },[])

  return(
    <Navigator>
      <Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
      <Screen name="OnBoardingPage" component={viewedOnBoarding==false?OnBoardingPage:WelcomeScreen} options={{headerShown:false}}/>
      <Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown:false}}/>
      <Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Screen name="EditProfile" component={EditProfilePage} options={{headerShown:false}}/>
      <Screen name="EditBornDate" component={EditBornDate} options={{headerShown:false}}/>
      <Screen name="EditIDCard" component={EditIDCard} options={{headerShown:false}}/>
      <Screen name="EditPhone" component={EditPhone} options={{headerShown:false}}/>
      <Screen name="OtpScreen" component={OtpScreen} options={{headerShown:false}}/>
      <Screen name="EditEmail" component={EditEmail} options={{headerShown:false}}/>
      <Screen name="Root" component={Root} options={{headerShown:false}}/>
    </Navigator>
  )
}
export default Routes
