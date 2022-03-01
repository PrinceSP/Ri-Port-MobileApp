import React,{useEffect,useState,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap,ReportPost} from '../../components'
import {getCurrentDate} from '../../config'
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
          <Text style={headingTitle}>Hello,</Text>
          <Text style={headingTitle}> {currentUser?.username}!</Text>
        </View>
        <Text style={date}>{getCurrentDate()}</Text>
        <ReportPost location="Makassar, Indonesia"/>
        <ReportPost location="Palu, Indonesia"/>
        <ReportPost location="Luwuk, Indonesia"/>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  scrollViewCont:{paddingHorizontal:20,paddingBottom:125},
  headingTitle:{fontSize:25,fontFamily:'PlayfairDisplay-Regular',color:'#000'},
  date:{fontSize:16,fontFamily:'Poppins-Light',color:'#999'}
})

const {container,scrollViewCont,headingTitle,date} = style

export default Home
