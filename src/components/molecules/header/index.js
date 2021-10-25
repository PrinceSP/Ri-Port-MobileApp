import React from 'react'
import {Text,View} from 'react-native'

const Header = ({name})=>{
  return(
    <View style={{minHeight:43,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:17}}>
      <Text style={{fontFamily:'Poppins-Regular',color:'#7a7a7a',fontSize:15}}>Cancel</Text>
      <Text style={{fontFamily:'Poppins-Regular',color:'#000',fontSize:22}}>{name}</Text>
      <View style={{width:42}}/>
    </View>
  )
}

export default Header
