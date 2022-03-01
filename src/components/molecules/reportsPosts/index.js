import React from 'react'
import {Text,View,StyleSheet,Image} from 'react-native'
import {PD} from '../../../assets'
import {Button} from '../../atoms'

const ReportPost = ({location,color,backgroundColor})=>{

  return(
    <View style={[container,{backgroundColor}]}>
      <View style={profileContainer}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={PD} style={profpic}/>
          <View style={{marginLeft:10}}>
            <Text style={{fontFamily:'Poppins-SemiBold',color,fontSize:17}}>Testing</Text>
            <Text style={{color}}>{location?location:'Jakarta, Indonesia'}</Text>
          </View>
        </View>
        <Button name='details' color={color==='#fff'?'#aff':'#00f'}/>
      </View>
      <View style={imageContainer}>
        <View style={imageDummy}/>
      </View>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ height:350,marginTop:30,justifyContent:'space-between'},
  profpic:{height:50,width:50, borderRadius:50},
  profileContainer:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  imageDummy:{height:280,width:350,borderRadius:40,backgroundColor:'#aaa'},
  imageContainer:{alignItems:'center',justifyContent:'center'}
})

const {container,imageDummy,profpic,profileContainer,imageContainer} = style

export default ReportPost
