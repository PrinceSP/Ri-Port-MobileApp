import React, {} from 'react'
import {DeviceEventEmitter} from 'react-native'
import {View,Text,StyleSheet} from 'react-native'

const  NotificationToast= () => {
  useEffect(()=>{
    DeviceEventEmitter.addListener()
  },[])

  return (
    <View>
    </View>
  )
}

export default NotificationToast
