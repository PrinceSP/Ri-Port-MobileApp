import React from 'react'
import {TextInput,StyleSheet} from 'react-native'

const Input = ({...rest})=>{
  return(
    <TextInput style={style.container} {...rest}/>
  )
}

const style=StyleSheet.create({
  container:{
    height:50,
    width:329,
    borderWidth:1.5,
    borderColor:'#A0A0A0',
    borderRadius:50,
    paddingHorizontal:28.77,
    fontSize:19
  }
})

export default Input
