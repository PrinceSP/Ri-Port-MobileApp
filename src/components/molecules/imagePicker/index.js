import React,{useState} from 'react'
import {View} from 'react-native'
import {Button} from '../../atoms'
import {ReportIcon} from '../../../assets'

const ImagePicker=({hasPhoto,onPress,photo})=>{
  return(
    <View style={{alignItems:'center'}}>
      <Button name={<ReportIcon height={40} width={40}/>}
        color="#6DCDF5"
        fam="Poppins-Medium"
        size={40}
        style={{height:40,width:40,backgroundColor:"#FFC700",position:'absolute',bottom:0,left:30,alignItems:'center',justifyContent:'center',borderRadius:50}}
        onPress={onPress}/>
    </View>
  )
}

export default ImagePicker
