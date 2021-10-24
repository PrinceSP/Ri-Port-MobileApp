import React from 'react'
import {TouchableOpacity,Text,StyleSheet} from 'react-native'

const Button = ({name,size,weight,color,...rest})=>{
  const style = StyleSheet.create({
    text:{
      color,
      fontSize:size,
      fontWeight:`${weight}`
    }
  })

  return(
    <TouchableOpacity {...rest}>
      <Text style={style.text}>{name}</Text>
    </TouchableOpacity>
  )
}



export default Button
