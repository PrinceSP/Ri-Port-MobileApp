import React from 'react'
import {TouchableHighlight,View,StyleSheet,Text,Animated,Platform} from 'react-native'
import {HomeIcon,ReportIcon,NotifIcon} from '../../../assets'

const Tab = ({tab,color,onPress})=>{
  const otherStyles= {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: "#B6E203",
        shadowOpacity: 1,
        shadowRadius:20,
      },
      android:{
        shadowColor: "#B6E203",
        elevation: 10,
      },
    }),
    borderRadius:50,
  }

  const colors = color==='#000';
  const style = StyleSheet.create({
    report:{
      position:'absolute',bottom:-10,
      height:70,
      width:70,
      borderWidth:5,
      borderColor:'#eee',
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFC700',
      ...Platform.select({
        ios: {
          shadowColor:"#fa9",
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 1,
          shadowRadius:20
        },
        android: {
          elevation:10
        }
      })
    },
    other:colors?otherStyles:{},
  });

  const {report,other} = style;

  return(
    <TouchableHighlight underlayColor="#fff" activeOpacity={0.6} onPress={onPress} style={{alignItems:'center'}}>
      {
        tab.name === 'Home'?<View style={{alignItems:'center'}}><HomeIcon stroke={color=="none"?"#888":"#000"} strokeWidth="3" height={27} fill={color} style={other}/></View>
      :tab.name=== 'Report'?<View style={report}><ReportIcon height={60}/></View>
    :<View style={{alignItems:'center'}}><NotifIcon height={28} width={38} stroke={color==="#000"?"#000":"#888"} strokeWidth="3" fill={color} style={other}/></View>
      }
    </TouchableHighlight>
  )
}



export default Tab
