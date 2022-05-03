import React from 'react'
import {View,Text,Dimensions,StyleSheet} from 'react-native'
import {SuccessIcon,FailedIcon} from '../../../assets'

const toastConfig = {
  success:({text1,text2})=>(
    <View style={style.container} contentContainerStyle={{zIndex:2000}}>
      <View style={style.icon}>
        <SuccessIcon/>
      </View>
      <View style={style.textCont}>
        <Text style={{fontSize:25,fontFamily:'Poppins-Medium',color:'#B6E203'}}>{text1}</Text>
        <Text style={style.secondMessage}>{text2}</Text>
      </View>
    </View>
  ),
  error:({text1,text2})=>(
    <View style={style.container} contentContainerStyle={{zIndex:1000}}>
      <View style={style.icon}>
        <FailedIcon/>
      </View>
      <View style={style.textCont}>
        <Text style={{fontSize:25,fontFamily:'Poppins-Medium',color:'#FF6B00'}}>{text1}</Text>
        <Text style={style.secondMessage}>{text2}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container:{backgroundColor:'#000',width:Dimensions.get('window').width,height:80,flexDirection:'row',alignItems:'center',zIndex:1000},
  icon:{marginRight:22,marginLeft:15},
  secondMessage:{fontSize:15,fontFamily:'Poppins-Regular',color:'#8CC4F8'},
  textCont:{flexDirection:'column',justifyContent:'center',height:35}
})

export default toastConfig
