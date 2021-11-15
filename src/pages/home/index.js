import React,{useEffect,useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Header,Gap,WeatherAPI,ReportPost} from '../../components'
import {Atomic} from '../../assets'
import {apiCall,getCurrentDate} from '../../config'

const Home = ({navigation})=>{
  const [userPost,setUserPost] = useState({
    author:'',
    title:''
  })

  useEffect(()=>{
    apiCall('http://192.168.1.3:4000/v1/blog/posts',res=>{
      const datas = JSON.parse(res)
      datas.data.map(data=>{
        return setUserPost(data)
      })
    })
  },[])

  const {author,title} = userPost

  console.log(title);

  return(
    <View style={container}>
      <Gap height={15}/>
      <Header name="Home" button={true} navigation={navigation}/>
      <Gap height={25}/>
      <ScrollView contentContainerStyle={scrollViewCont}>
        <View style={{flexDirection:'row'}}>
          <Text style={headingTitle2}>Hello,</Text>
          <Text style={headingTitle1}> Prince!</Text>
          <Image style={{right:6,bottom:2}} source={Atomic}/>
        </View>
        <Text style={{fontSize:20,fontFamily:'Poppins-Light'}}>{getCurrentDate()}</Text>
        <WeatherAPI/>
        <ReportPost/>
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
