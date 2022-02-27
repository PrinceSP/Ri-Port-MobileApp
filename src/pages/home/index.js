import React,{useEffect,useState,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap,ReportPost} from '../../components'
import {apiCall,getCurrentDate} from '../../config'
import {AuthContext} from '../../context/authContext'

const Home = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  return(
    <View style={container}>
      <Gap height={15}/>
      <Header name="Home" button={true} navigation={navigation}/>
      <Gap height={15}/>
      <ScrollView contentContainerStyle={scrollViewCont}>
        <View style={{flexDirection:'row'}}>
          <Text style={headingTitle2}>Hello,</Text>
          <Text style={headingTitle1}> {currentUser?.username}!</Text>
        </View>
        <Text style={{fontSize:20,fontFamily:'Poppins-Light',color:'#999'}}>{getCurrentDate()}</Text>
        <ReportPost/>
        <ReportPost/>
        <ReportPost/>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  scrollViewCont:{paddingHorizontal:20,paddingBottom:125},
  headingTitle1:{fontSize:35,fontFamily:'PlayfairDisplay-Bold',color:'#000'},
  headingTitle2:{fontSize:35,fontFamily:'PlayfairDisplay-Regular',color:'#000'},
})

const {container,scrollViewCont,headingTitle1,headingTitle2} = style

export default Home
