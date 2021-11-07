import React, {useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Dimensions} from 'react-native'
import {Header,Gap,ReportForm,MapFinder,Button} from '../../components'

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
        <Gap height={47}/>
        <View>
          <Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Upload Your ID Card Photo Here*</Text>
          <Button name="Upload" color='#fff' fam='Poppins-Medium' style={style.button}/>
        </View>
        <Gap height={47}/>
        <View>
          <Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Upload Road Picture*</Text>
          <Button name="Upload" color='#fff' fam='Poppins-Medium' style={style.button}/>
        </View>
        <View style={{alignItems:'center'}}>
          <Button name="Submit Report" color='#fff' fam='Poppins-Bold' size={24} style={style.buttonSubmit}/>
        </View>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  text1:{fontSize:20,fontFamily:'Lato-Bold'},
  formContainer:{paddingHorizontal:20,paddingBottom:150},
  button:{
    marginTop:12,
    backgroundColor:'#000',
    height:37,
    width:88,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonSubmit:{
    marginTop:68,
    backgroundColor:'#598EF5',
    height:67,
    width:340,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
})

const {container,map,text1,mapContainer,formContainer} = style


export default ReportPage
