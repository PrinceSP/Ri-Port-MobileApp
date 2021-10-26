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
    borderColor:'#B5DCFF',
    borderRadius:50,
    paddingHorizontal:28.77,
    fontSize:19,
    backgroundColor:'#fff',
    // shadowColor: '#666',
    // shadowOffset: { width: 10, height: 10 },
    // shadowOpacity: 1,
    // elevation:40
  }
})

export default Input
