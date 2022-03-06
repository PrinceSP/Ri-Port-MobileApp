import React,{useEffect,useState,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap,ReportPost} from '../../components'
import {getCurrentDate} from '../../config'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'

const Home = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const {theme} = useTheme()
  return(
    <View style={[container,{backgroundColor:theme.backgroundColor}]}>
      <Gap height={15}/>
      <Header name="Home" button={true} navigation={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={15}/>
      <ScrollView contentContainerStyle={scrollViewCont}>
        <View style={{flexDirection:'row'}}>
          <Text style={[headingTitle,{color:theme.color}]}>Hello,</Text>
          <Text style={[headingTitle,{color:theme.color}]}> {currentUser?.username}!</Text>
        </View>
        <Text style={[date,{color:theme.color}]}>{getCurrentDate()}</Text>
        <ReportPost location="Makassar, Indonesia" color={theme.color} backgroundColor={theme.backgroundColor}/>
        <ReportPost location="Palu, Indonesia" color={theme.color} backgroundColor={theme.backgroundColor}/>
        <ReportPost location="Luwuk, Indonesia" color={theme.color} backgroundColor={theme.backgroundColor}/>
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
