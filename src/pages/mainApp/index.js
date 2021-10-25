import React from 'react'
import {View,Text,Button} from 'react-native'
import Home from '../home'

const MainApp = ()=>{
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Home/>
    </View>
  )
}

export default MainApp
