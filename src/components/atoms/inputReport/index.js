import React from 'react'
import {TextInput,Text,View} from 'react-native'

const ReportInput = ({label,color="#000",...rest}) => {
  return (
    <View style={{height:69,borderBottomWidth:1,borderColor:'#F1DADA'}}>
      <Text style={{fontSize:17,fontFamily:'Poppins-Medium',color:'#8ACEEC'}}>{label}</Text>
      <TextInput style={{fontSize:20,color}}{...rest}/>
    </View>
  )
}

export default ReportInput
