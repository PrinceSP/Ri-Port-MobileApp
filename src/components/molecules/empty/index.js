import React from 'react'
import {View,Text} from 'react-native'
import {NoData} from '../../../assets'

const Empty = () => {
  return (
    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <NoData height={120}/>
      <Text style={{fontSize:20,color:"#777",marginBottom:7,marginTop:15}}>No Data</Text>
      <Text style={{fontSize:15,color:"#aaa"}}>There is no notification to be shown!</Text>
    </View>
  )
}

export default Empty
