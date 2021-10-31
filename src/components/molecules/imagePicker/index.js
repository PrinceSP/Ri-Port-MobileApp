import React,{useState} from 'react'
import {View,Image} from 'react-native'
import {Gap,Button} from '../../atoms'

const ImagePicker=({hasPhoto,onPress,photo})=>{
  return(
    <View style={{alignItems:'center'}}>
      <View style={{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:150,width:150,alignItems:'center',justifyContent:'center'}}>
        {hasPhoto===true?<Image style={{height:130,width:130,borderRadius:65}} source={{uri:photo}}/>:<View style={{height:130,width:130,backgroundColor:'#eee',borderRadius:65}}/>}
      </View>
      <Gap height={21}/>
      <Button name="Upload a profile image"
        color="#6DCDF5"
        fam="Poppins-Medium"
        size={19}
        style={{minWidth:200,alignItems:'center'}}
        onPress={onPress}/>
    </View>
  )
}

export default ImagePicker
