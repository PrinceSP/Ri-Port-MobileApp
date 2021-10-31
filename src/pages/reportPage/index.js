import React from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap} from '../../components'

const ReportPage = ({navigation})=>{

  return(
    <View style={container}>
      <Gap height={20}/>
      <Header name="Your reports" button={true} navigation={navigation}/>
      <Gap height={45}/>
      
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
})

const {container} = style


export default ReportPage
