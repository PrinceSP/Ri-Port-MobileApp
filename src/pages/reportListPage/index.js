import React from 'react'
import {Text,ScrollView,View,StyleSheet} from 'react-native'
import {Header,Gap,ReportList} from '../../components'

const ReportListPage=({navigation})=>{
  return(
    <View style={container}>
      <Gap height={20}/>
      <Header name="Your reports" button={true} navigation={navigation}/>
      <Gap height={45}/>
      <ScrollView style={{paddingHorizontal:14}}>
        <Text style={{color:'#8891E0'}}>Status</Text>
        <Gap height={25}/>
        <ReportList status='Pending' title='Laporan jalan rusak' date='28 augustus 2001'/>
        <Gap height={18}/>
        <ReportList status='Pending' title='Laporan jalan rusak' date='28 augustus 2001'/>
        <Gap height={18}/>
        <ReportList status='Pending' title='Laporan jalan rusak' date='28 augustus 2001'/>

      </ScrollView>
    </View>

  )
}

const style=StyleSheet.create({
  container:{ flex: 1,backgroundColor:'#fff'},
})

const {container} = style

export default ReportListPage
