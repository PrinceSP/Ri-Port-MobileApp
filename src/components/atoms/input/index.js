import React from 'react'
import {TextInput,StyleSheet} from 'react-native'

const Input = ({...rest})=>{
  const style=StyleSheet.create({
    container:{
      height:50,
      width:329,
      borderWidth:1.5,borderColor:'#B5DCFF',
      borderRadius:50,
      paddingHorizontal:28.77,fontSize:19,backgroundColor:'#fff',
    }
  })

  return(
    <TextInput placeholderTextColor="#999" style={style.container} {...rest}/>
  )
}



export default Input
