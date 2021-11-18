import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import {Burger,Edit} from '../../../assets'

const Header = ({name,button,navigation,action,edit,nav,page})=>{

  const BackCancel = ({onPress})=>{
    return(
      <TouchableOpacity onPress={onPress}>
        <Text style={{fontFamily:'Poppins-Regular',color:'#7a7a7a',fontSize:15}}>{action}</Text>
      </TouchableOpacity>
    )
  }

  return(
    <View style={{minHeight:43,alignItems:'center',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:17,
    backgroundColor:'#fff'}}>
      {
        button===true?<Burger onPress={()=>navigation.openDrawer()}/>
        :<BackCancel onPress={()=>nav.goBack()}/>

      }
      <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:22}}>{name}</Text>
      {edit===true?<TouchableOpacity onPress={()=>nav.navigate('EditProfile')} style={{flexDirection:'row'}}><Edit/><Text style={{color:'#7a7a7a'}}>Edit</Text></TouchableOpacity>:<View style={{width:42}}/>}

    </View>
  )
}

export default Header
