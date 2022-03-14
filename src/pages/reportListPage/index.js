import React, {useContext,useEffect,useState} from 'react'
import {Text,FlatList,View,StyleSheet,SafeAreaView} from 'react-native'
import {Header,Gap,ReportList} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'

const ReportListPage=({navigation})=>{
  const [datas,setDatas] = useState(null)
  const [refreshing,setRefreshing] = useState(false)
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)

  const fetchDatas = async()=>{
    try {
      const res = await fetch(`https://riport-app.herokuapp.com/api/posts/postsList/${currentUser._id}`)
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
      <Header name="Your reports" action='< back' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={35}/>
      <SafeAreaView style={{paddingHorizontal:14}}>
        <FlatList
          keyExtractor={item => item._id}
          refreshing={refreshing}
          onRefresh={fetchDatas}
          showsVerticalScrollIndicator={false}
          data={datas}
          renderItem={({item,index})=><ReportList status='Pending' title='Laporan jalan rusak' date='28 augustus 2001' color={theme.color}/>}
          ListHeaderComponent={
            <Text style={{color:`${theme.color==='#fff'?'#afa':'#8891E0'}`}}>Status</Text>
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
  headingTitle:{fontSize:25,fontFamily:'PlayfairDisplay-Regular'},
  date:{fontSize:16,fontFamily:'Poppins-Light'}
})

const {container,headingTitle,date} = style

export default ReportListPage
