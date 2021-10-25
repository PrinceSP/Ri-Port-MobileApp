import React from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap} from '../../components'
import {Atomic} from '../../assets'

const Home = ({navigation})=>{
  const months = [
    'January','February','March','April',
    'Mei','June','July','August',
    'September','October','November','December'
  ]
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth()+1).padStart(2,'0');
  let year = today.getFullYear()

  return(
    <View style={container}>
      <Gap height={20}/>
      <Header name="Home" button={true} navigation={navigation}/>
        <Gap height={45}/>
      <ScrollView contentContainerStyle={scrollViewCont}>
        <View style={{flexDirection:'row'}}>
          <Text style={headingTitle2}>Hello,</Text>
          <Text style={headingTitle1}> Prince!</Text>
          <Image style={{right:6,bottom:2}} source={Atomic}/>
        </View>
        <Text style={{fontSize:20,fontFamily:'Poppins-Light'}}>{today=`${dd} ${months[mm-1]} ${year}`}</Text>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
  scrollViewCont:{paddingHorizontal:20,paddingBottom:35},
  headingTitle1:{fontSize:35,fontFamily:'PlayfairDisplay-Bold',color:'#000'},
  headingTitle2:{fontSize:35,fontFamily:'PlayfairDisplay-Regular',color:'#000'},
})

const {container,scrollViewCont,headingTitle1,headingTitle2} = style

export default Home
