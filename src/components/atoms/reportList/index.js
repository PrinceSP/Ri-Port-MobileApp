import React from 'react'
import {View,Text} from 'react-native'

const ReportList =({status,title,date})=>{
  return(
    <View style={{flexDirection:'row',justifyContent:'space-between',
      alignItems:'center',width:365,borderBottomWidth:1,borderColor:'#F1DADA',paddingBottom:7.73}}>
      <Text style={{fontFamily:'Poppins-Regular',fontSize:12}}>{status}</Text>
      <View style={{width:216,minHeight:42}}>
        <Text style={{fontFamily:'Poppins-Regular',fontSize:16}}>{title}</Text>
        <Text style={{fontFamily:'Poppins-Regular',fontSize:14}}>{date}</Text>
      </View>
      <Text>details</Text>
    </View>
  )
}

export default ReportList
