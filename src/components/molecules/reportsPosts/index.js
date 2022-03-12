import React from 'react'
import {Text,View,StyleSheet,Image, Dimensions} from 'react-native'
import {Button} from '../../atoms'

const ReportPost = ({location,color,backgroundColor,username,picture,desc})=>{
  const {width} = Dimensions.get('window')
  return(
    <View style={[container,{backgroundColor}]}>
      <View style={profileContainer}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={{uri:picture}} style={profpic}/>
          <View style={{marginLeft:10}}>
            <Text style={[name,{color:color==="#000"?"#444":"#ddd"}]}>{username}</Text>
            <Text style={{color:color==="#000"?"#777":"#fff"}}>{location?location:'Indonesia'}</Text>
          </View>
        </View>
      </View>
      <Text style={[descStyle,{color}]}>{desc}</Text>
      <View style={imageContainer}>
        {picture?<Image style={[imageDummy,{width}]} source={{uri:picture}}/>:<View style={imageDummy}/>}
      </View>
    </View>
  )
}

const style=StyleSheet.create({
  container:{ height:350,marginTop:30,marginBottom:50,alignItems:'flex-start',justifyContent:'space-between'},
  profpic:{height:45,width:45, borderRadius:45},
  profileContainer:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  imageDummy:{height:280},
  imageContainer:{alignItems:'center',justifyContent:'center'},
  descStyle:{
    fontSize:14,
    marginVertical:15
  },
  name:{fontFamily:'Poppins-SemiBold',fontSize:16}
})

const {container,imageDummy,profpic,profileContainer,name,imageContainer,descStyle} = style

export default ReportPost
