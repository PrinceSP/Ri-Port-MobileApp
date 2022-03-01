import React, {useContext} from 'react'
import {Text,ScrollView,View,StyleSheet} from 'react-native'
import {Header,Gap,ReportList} from '../../components'
import {ThemeContext} from '../../context/themeContext'

const ReportListPage=({navigation})=>{
  const {color, bgColor} = useContext(ThemeContext)

  return(
    <View style={[container,{backgroundColor:bgColor}]}>
      <Gap height={15}/>
      <Header name="Your reports" button={true} navigation={navigation} color={color} bgColor={bgColor}/>
      <Gap height={45}/>
      <ScrollView style={{paddingHorizontal:14}}>

        <Text style={{color:`${color==='#fff'?'#afa':'#8891E0'}`}}>Status</Text>
        <Gap height={25}/>
        <ReportList status='Pending' title='Laporan jalan rusak' date='28 augustus 2001' color={color}/>
        <Gap height={18}/>
        <ReportList status='Pending' title='Laporan jalan rusak' date='28 augustus 2001' color={color}/>
        <Gap height={18}/>
        <ReportList status='Pending' title='Laporan jalan rusak' date='28 augustus 2001' color={color}/>

      </ScrollView>
    </View>

  )
}

const style=StyleSheet.create({
  container:{ flex: 1},
})

const {container} = style

export default ReportListPage
