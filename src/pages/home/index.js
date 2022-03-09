import React,{useEffect,useState,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Image,SafeAreaView,FlatList} from 'react-native'
import {Header,Gap,ReportPost} from '../../components'
import {getCurrentDate} from '../../config'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'

const Home = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const {theme} = useTheme()

  const [datas,setDatas] = useState(null)
  const [refreshing,setRefreshing] = useState(false)

  const fetchDatas = async()=>{

    try {
      const res = await fetch('https://riport-app.herokuapp.com/api/posts/')
      const allReport = await res.json()
      setDatas(allReport)
      setRefreshing(true)
    } catch (e) {
      setDatas([])
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(()=>{
    let mounted = true
    if (mounted) {
      fetchDatas()
    }
    return ()=> mounted=false
  },[])

  return(
    <View style={[container,{backgroundColor:theme.backgroundColor}]}>
      <Gap height={15}/>
      <Header name="Home" button={true} navigation={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={15}/>
      <SafeAreaView style={scrollViewCont}>
        <FlatList
          keyExtractor={item => item._id}
          refreshing={refreshing}
          onRefresh={fetchDatas}
          showsVerticalScrollIndicator={false}
          data={datas}
          renderItem={({item,index})=><ReportPost username={item.fullname} location={item.address} color={theme.color} picture={currentUser.profilePicture} backgroundColor={theme.backgroundColor}/>}
          ListHeaderComponent={
            <View style={{backgroundColor:'#fff'}}>
              <View style={{flexDirection:'row'}}>
                <Text style={[headingTitle,{color:theme.color}]}>Hello,</Text>
                <Text style={[headingTitle,{color:theme.color}]}> {currentUser?.username}!</Text>
              </View>
              <Text style={[date,{color:theme.color}]}>{getCurrentDate()}</Text>
            </View>
          }
          ListFooterComponent={
            <Gap height={100}/>
          }
          stickyHeaderIndices={[0]}
          />
      </SafeAreaView>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1},
  scrollViewCont:{paddingHorizontal:20,marginBottom:100},
  headingTitle:{fontSize:25,fontFamily:'PlayfairDisplay-Regular'},
  date:{fontSize:16,fontFamily:'Poppins-Light'}
})

const {container,scrollViewCont,headingTitle,date} = style

export default Home
