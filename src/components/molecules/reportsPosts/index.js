import React from 'react'
import {Text,View,StyleSheet,Image, Dimensions, TouchableOpacity} from 'react-native'
import {Button} from '../../atoms'

const ReportPost = ({location,color,backgroundColor,username,picture,desc,userPicture})=>{
  const {width} = Dimensions.get('window')
  return(
    <View style={[container,{backgroundColor}]}>
      <View style={profileContainer}>
        <View style={{width:'98%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri:`data:image/png;base64,${userPicture}`}} style={profpic}/>
            <View style={{marginLeft:10}}>
              <Text style={[name,{color:color==="#000"?"#444":"#ddd"}]}>{username}</Text>
              <Text style={[locationStyle,{color:color==="#000"?"#777":"#fff"}]}>{location?location:'Indonesia'}</Text>
            </View>
          </View>
          <TouchableOpacity style={optionButton}>
            <View style={option}/>
            <View style={option}/>
            <View style={option}/>
          </TouchableOpacity>
        </View>
      </View>
      {desc&&<Text style={[descStyle,{color}]}>{desc}</Text>}
      <View style={imageContainer}>
        {picture?<Image style={[imageDummy,{width}]} source={{uri:`data:image/png;base64,${picture}`}}/>:<View style={imageDummy}/>}
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
  name:{fontFamily:'Poppins-SemiBold',fontSize:16},
  option:{width:4,height:4,borderRadius:4,backgroundColor:'#aaa'},
  optionButton:{height:20,alignItems:'center',justifyContent:'space-between',flexDirection:'column'},
  locationStyle:{
    width:300
  }
})

const {container,imageDummy,profpic,profileContainer,name,imageContainer,descStyle,option,optionButton,locationStyle} = style

export default ReportPost
