import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Button from '../button'

const ReportList =({status,title,date,color="#000"})=>{
  return(
    <View style={styles.container}>
      <Text style={[styles.status,{color}]}>{status}</Text>
      <View style={styles.dataWrapper}>
        <Text style={[styles.title,{color}]}>{title}</Text>
        <Text style={[styles.date,{color}]}>{date}</Text>
      </View>
      <Button name='details' color={color==='#fff'?'#4abcff':'#3043F0'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',
    width:365,borderBottomWidth:1,borderColor:'#F1DADA',paddingBottom:7.73,
    marginBottom:15
  },
    status:{
      fontFamily:'Poppins-Regular',fontSize:12,
    },
    title:{fontFamily:'Poppins-Regular',fontSize:16,},
    dataWrapper:{width:216,minHeight:42},
    date:{fontFamily:'Poppins-Regular',fontSize:14,}

})

export default ReportList
