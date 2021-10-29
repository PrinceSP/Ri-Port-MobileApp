import React from 'react'
import {View,Text} from 'react-native'
import {Header,Gap} from '../../components'

const NotificationsPage = ({navigation})=>{
  return(
    <View>
      <Gap height={20} button={true} action='Cancel'/>
      <Header name="Notifications" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <Text>Notif Page</Text>
    </View>
  )
}

export default NotificationsPage
