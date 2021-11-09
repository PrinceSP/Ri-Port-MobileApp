import React from 'react'
import {View,Text} from 'react-native'
import {Header,Gap} from '../../components'

const NotificationsPage = ({navigation})=>{
  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15} button={true} action='Cancel'/>
      <Header name="Notifications" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <Text>Notif Page</Text>
    </View>
  )
}

export default NotificationsPage
