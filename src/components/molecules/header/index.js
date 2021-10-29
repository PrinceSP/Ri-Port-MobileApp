import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import {Burger,Edit} from '../../../assets'

const Header = ({name,button,navigation,action,edit,nav})=>{
  const BackCancel = ({onPress})=>{
    return(
      <TouchableOpacity onPress={onPress} style={{fontFamily:'Poppins-Regular',color:'#7a7a7a',fontSize:15}}>
        <Text>{action}</Text>
      </TouchableOpacity>
    )
  }

  return(
    <View style={{minHeight:43,alignItems:'center',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:17,
    backgroundColor:'#fff'}}>
      {
        button===true?<Burger onPress={()=>navigation.openDrawer()}/>
        :action==='< back'?<BackCancel onPress={() => nav.goBack()}/>
        :<BackCancel/>
      }
      <Text style={{fontFamily:'Poppins-Regular',color:'#000',fontSize:22}}>{name}</Text>
      {edit===true?<TouchableOpacity style={{flexDirection:'row'}}><Edit/><Text>Edit</Text></TouchableOpacity>:<View style={{width:42}}/>}

    </View>
  )
}

export default Header
