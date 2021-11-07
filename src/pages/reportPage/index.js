import React, {useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Dimensions} from 'react-native'
import {Header,Gap,ReportForm,MapFinder} from '../../components'

const ReportPage = ({navigation})=>{
  return(
    <View style={container}>
      <Gap height={20}/>
      <Header name="report" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <ScrollView contentContainerStyle={style.formContainer}>
        <Text style={text1}>Make Your Report</Text>
        <Gap height={63}/>
        <ReportForm/>
        <MapFinder/>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  text1:{fontSize:20,fontFamily:'Lato-Bold'},
  formContainer:{paddingHorizontal:20,paddingBottom:150}
})

const {container,map,text1,mapContainer,formContainer} = style


export default ReportPage
