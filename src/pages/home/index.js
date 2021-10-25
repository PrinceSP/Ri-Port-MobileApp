import React from 'react'
import {View,Text,Button} from 'react-native'
import {Header} from '../../components'

const Home = ({navigation})=>{
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Header name="Home" button={true} navigation={navigation}/>
      <Text>Home Page</Text>
    </View>
  )
}

export default Home
