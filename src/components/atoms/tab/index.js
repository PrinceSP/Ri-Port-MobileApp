import React from 'react'
import {TouchableOpacity,View,StyleSheet,Animated} from 'react-native'
import {HomeIcon,ReportIcon,NotifIcon} from '../../../assets'

const Tab = ({tab,color,onPress})=>{
  const otherStyles= {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: color,
    shadowOpacity: 1,
    shadowRadius:20,
    elevation: 10,
    borderRadius:50,
  }

  const containerStyle={
    height:4,
    width:24,
    backgroundColor:color,
    marginTop:6,
    borderRadius:20
  }

  const style = StyleSheet.create({
    report:{
      bottom:25,
      shadowOffset: { width: 10, height: 10 },
      shadowColor: color,
      shadowOpacity: 1,
      shadowRadius:20,
      elevation: 10,
      borderRadius:50,
      backgroundColor : "#17F348"
    },
    other:color==='#fff'?otherStyles:{},
    container:color==='#fff'?containerStyle:{}
  });

  const {report,other,container} = style;


  return(
    <TouchableOpacity onPress={onPress} style={{alignItems:'center'}}>
      {
        tab.name === 'Home'?<View style={{alignItems:'center'}}><HomeIcon height={28} fill={color} style={other}/><Animated.View style={container}/></View>
        :tab.name=== 'Report'?<ReportIcon style={report} height={78} width={78}/>
        :<View style={{alignItems:'center'}}><NotifIcon height={28} fill={color} style={other}/><Animated.View style={container}/></View>
      }
    </TouchableOpacity>
  )
}



export default Tab
