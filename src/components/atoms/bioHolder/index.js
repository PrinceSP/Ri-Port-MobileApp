//this bioHolder atom is used for the holder of informations for the user profile page
import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const BioHolder = ({icon,userInfo,labelInfo})=>{

  const style=StyleSheet.create({
    container:{
      minHeight:60,
      width:329,
      flexDirection:'row',
      alignItems:'flex-end',
      marginBottom:10
    },
    iconHolder:{
      height:41, width:53, borderWidth:1, borderBottomLeftRadius:10,
      borderTopLeftRadius:10, alignItems:'center', justifyContent:'center',borderColor:'#a0a0a0'
    },
    infoHolder:{
      height:41, width:265, flexDirection:'row', borderRightWidth:1, borderTopWidth:1,
      borderBottomWidth:1, borderBottomRightRadius:10,
      borderTopRightRadius:10, alignItems:'center',
      paddingHorizontal:5.77, borderColor:'#a0a0a0'
    },
    label:{
      position:'absolute',color:'#898898',
      top:-13, backgroundColor:'#fff', left:5.77,
      fontFamily:'Poppins-Medium', fontSize:14,
    },
    info:{
      fontSize:17, fontFamily:'Poppins-Medium', color:'#000'
    }
  })

  const {container,iconHolder,infoHolder,label,info} = style

  return(
    <View style={container}>
      <View style={iconHolder}>
        {icon}
      </View>
      <View style={infoHolder}>
        <Text style={label}>{labelInfo}</Text>
        <Text style={info}>{userInfo}</Text>
      </View>
    </View>
  )
}



export default BioHolder
