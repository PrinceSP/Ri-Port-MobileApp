import React,{useEffect,useState,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap,ReportPost} from '../../components'
import {getCurrentDate} from '../../config'
import {AuthContext} from '../../context/authContext'
import {ThemeContext} from '../../context/themeContext'

const Home = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const {color, bgColor} = useContext(ThemeContext)
  return(
    <View style={[container,{backgroundColor:bgColor}]}>
      <Gap height={15}/>
      <Header name="Home" button={true} navigation={navigation} color={color} bgColor={bgColor}/>
      <Gap height={15}/>
      <ScrollView contentContainerStyle={scrollViewCont}>
        <View style={{flexDirection:'row'}}>
          <Text style={[headingTitle,{color}]}>Hello,</Text>
          <Text style={[headingTitle,{color}]}> {currentUser?.username}!</Text>
        </View>
        <Text style={[date,{color}]}>{getCurrentDate()}</Text>
        <ReportPost location="Makassar, Indonesia" color={color} backgroundColor={bgColor}/>
        <ReportPost location="Palu, Indonesia" color={color} backgroundColor={bgColor}/>
        <ReportPost location="Luwuk, Indonesia" color={color} backgroundColor={bgColor}/>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1},
  scrollViewCont:{paddingHorizontal:20,paddingBottom:125},
  headingTitle:{fontSize:25,fontFamily:'PlayfairDisplay-Regular'},
  date:{fontSize:16,fontFamily:'Poppins-Light'}
})

const {container,scrollViewCont,headingTitle,date} = style

export default Home
