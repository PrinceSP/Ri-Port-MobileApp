import React from 'react'
import {TouchableOpacity,Text} from 'react-native'
import {HomeIcon,ReportIcon,NotifIcon} from '../../../assets'

const Tab = ({tab,color,onPress})=>{
  return(
    <TouchableOpacity onPress={onPress} style={{alignItems:'center'}}>
      {
        tab.name === 'Home'?<HomeIcon height={38} fill={color} stroke='black'/>
        :tab.name==='Report'?<ReportIcon height={68} width={68}/>
      :<NotifIcon height={38} fill={color} stroke='black'/>
      }
      {/**<Text style={{color}}>{tab.name}</Text>**/}
    </TouchableOpacity>
  )
}

export default Tab
