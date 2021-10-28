import React from 'react'
import {TouchableOpacity,View,StyleSheet} from 'react-native'
import {HomeIcon,ReportIcon,NotifIcon} from '../../../assets'

const Tab = ({tab,color,onPress})=>{
  const style = StyleSheet.create({
    report:{
      bottom:25,
      shadowOffset: { width: 10, height: 10 },
      shadowColor: '#fff',
      shadowOpacity: 1,
      shadowRadius:20,
      elevation: 10,
      borderRadius:50,
      backgroundColor : "#17F348"
    },
    bottomBorder:{
      height:4,
      width:30,
      borderRadius:20,
      backgroundColor:color,
      marginTop:4
    }
  });

  const {report,bottomBorder} = style;


  return(
    <TouchableOpacity onPress={onPress} style={{alignItems:'center'}}>
      {
        tab.name === 'Home'?<View><HomeIcon height={28} fill={color} stroke={color}/>{}</View>
        :tab.name=== 'Report'?<ReportIcon style={report} height={78} width={78}/>
      :<View><NotifIcon height={28} fill={color} stroke={color}/>{}</View>
      }
      {/**<View style={bottomBorder}/>**/}
    </TouchableOpacity>
  )
}



export default Tab
