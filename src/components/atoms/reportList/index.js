import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import Button from '../button'

const ReportList =({status,title,date})=>{
  return(
    <View style={{flexDirection:'row',justifyContent:'space-between',
      alignItems:'center',width:365,borderBottomWidth:1,borderColor:'#F1DADA',paddingBottom:7.73}}>
      <Text style={{fontFamily:'Poppins-Regular',fontSize:12,color:'#000'}}>{status}</Text>
      <View style={{width:216,minHeight:42}}>
        <Text style={{fontFamily:'Poppins-Regular',fontSize:16,color:'#000'}}>{title}</Text>
        <Text style={{fontFamily:'Poppins-Regular',fontSize:14,color:'#000'}}>{date}</Text>
      </View>
      <Button name='details' color='#3043F0'/>
    </View>
  )
}

export default ReportList
