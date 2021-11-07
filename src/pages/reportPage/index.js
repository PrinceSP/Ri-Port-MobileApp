import React from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap,ReportInput} from '../../components'

const ReportPage = ({navigation})=>{

  return(
    <View style={container}>
      <Gap height={20}/>
      <Header name="report" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <ScrollView contentContainerStyle={style.formContainer}>
        <Text style={style.text1}>Make Your Report</Text>
        <Gap height={63}/>
        <ReportInput label="Fullname *"/>
        <Gap height={28}/>
        <ReportInput label="Phone Number *"/>
        <Gap height={28}/>
        <ReportInput label="ID Card Number(KTP) *"/>
        <Gap height={28}/>
        <ReportInput label="Your Address *"/>
        <Gap height={28}/>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  formContainer:{paddingHorizontal:20,paddingBottom:150},
  text1:{fontSize:20,FontFamily:'Lato-Bold'}
})

const {container} = style


export default ReportPage
