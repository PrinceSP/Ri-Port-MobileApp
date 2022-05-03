import React from 'react'
import {View,Text} from 'react-native'
import {Header,Gap,Empty} from '../../components'
import {useTheme} from '../../context/themeContext'

const NotificationsPage = ({navigation})=>{
  const {theme} = useTheme()
  return(
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
      <Gap height={15} button={true} action='Cancel'/>
      <Header name="     Notifications" button={true} navigation={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={200}/>
      <Empty/>
    </View>
  )
}

export default NotificationsPage
