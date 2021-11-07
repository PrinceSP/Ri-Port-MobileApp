import React from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Gap,ReportInput} from '../../atoms'

const ReportForm = ({navigation})=>{

  return(
    <View>
      <ReportInput label="Fullname *"/>
      <Gap height={28}/>
      <ReportInput label="Phone Number *"/>
      <Gap height={28}/>
      <ReportInput label="ID Card Number(KTP) *"/>
      <Gap height={28}/>
      <ReportInput label="Your Address *"/>
      <Gap height={28}/>
    </View>
  )
}

export default ReportForm
