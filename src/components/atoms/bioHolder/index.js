//this bioHolder atom is used for the holder of informations for the user profile page
import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import Button from '../button'
import {ArrowR} from '../../../assets'

const BioHolder = ({icon,userInfo,labelInfo,color,backgroundColor,onPress})=>{

  const style=StyleSheet.create({
    container:{
      minHeight:60,
      width:329,
      flexDirection:'row',
      alignItems:'flex-end',
      marginBottom:14
    },
    iconHolder:{
      backgroundColor,borderRadius:50,
      height:50,width:50,padding:6,
      alignItems:'center',justifyContent:'center',
    },
    infoHolder:{
      height:50, width:285,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:20
    },
    button:{
      backgroundColor:"rgba(210,210,240,0.5)",paddingHorizontal:15,paddingVertical:12,borderRadius:10
    },
    info:{
      fontSize:16, fontFamily:'Poppins-Medium', color
    },
    label:{color:"#777",fontFamily:'Lato-Regular'},
    infoContainer:{height:45,flexDirection:'column',justifyContent:'space-between'}
  })

  const {container,iconHolder,infoHolder,label,info,infoContainer} = style

  return(
    <View style={container}>
      <View style={iconHolder}>
        {icon}
      </View>
      <View style={infoHolder}>
        <View style={infoContainer}>
          <Text style={label}>{labelInfo}</Text>
          <Text style={info}>{userInfo}</Text>
        </View>
        <Button style={style.button} onPress={onPress} name={<ArrowR stroke={color} strokeWidth={4} height={10} width={10}/>}/>
      </View>
    </View>
  )
}



export default BioHolder
