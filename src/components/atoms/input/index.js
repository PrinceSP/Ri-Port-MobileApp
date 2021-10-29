import React from 'react'
import {TextInput,StyleSheet} from 'react-native'

const Input = ({height=50,fontSize=19,borderColor='#B5DCFF',backgroundColor='#fff',width=329,...rest})=>{
  const style=StyleSheet.create({
    container:{
      height,
      width,
      borderWidth:1.5,
      borderColor,
      borderRadius:50,
      paddingHorizontal:28.77,
      fontSize,
      backgroundColor,
      // shadowColor: '#666',
      // shadowOffset: { width: 10, height: 10 },
      // shadowOpacity: 1,
      // elevation:40
    }
  })

  return(
    <TextInput style={style.container} {...rest}/>
  )
}



export default Input
