import React from 'react'
import {View,StyleSheet,Text,Image} from 'react-native'
import {Button} from '../../atoms'

const ReportDetails = ({date,roadPicture,title,desc}) => {
  return (
    <View style={style.container}>
      <Text>{date}</Text>
      <Text>{title}</Text>
      <Image source={{uri:`data:image/png;base64,${roadPicture}`}} style={{backgroundColor:'#aaa'}}/>
      <Text>{desc}</Text>
      <Button name="exit" onPress={()=>alert('pressed')}/>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'rgba(114, 213, 255, 1)',
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default ReportDetails
