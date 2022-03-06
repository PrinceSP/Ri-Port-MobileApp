import React, {useState,useContext} from 'react'
import {View,Text,Image} from 'react-native'
import {Button,BioHolder,Gap,Header} from '../../components'
import {DateIcon,Address,Phone,AvatarProfile,ID,MainLogo} from '../../assets'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'

const Profile = ({navigation})=>{
  const {user} = useContext(AuthContext)
  const {theme} = useTheme()

  return(
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <Gap height={15}/>
      <Header name='Profile' action='< back' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <View style={{flex:0.86,alignItems:'center',justifyContent:'flex-end'}}>
        <View style={{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:130,width:130,alignItems:'center',justifyContent:'center'}}>
          {user.profilePicture ? <Image source={{uri:`data:image/png;base64,${user.profilePicture}`}} style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/> : <View style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/>}
        </View>
        <Gap height={20}/>
        <Text style={{color:theme.color,backgroundColor:theme.backgroundColor,fontSize:28,fontFamily:'Poppins-Bold'}}>{user.username}</Text>
        <Text style={{color:"#999",backgroundColor:theme.backgroundColor,fontSize:16,fontFamily:'Poppins-Regular'}}>{user.email}</Text>
        <Gap height={20}/>
        <BioHolder icon={<Address height={22}/>}
          labelInfo=""
          userInfo={user.address}
          labelInfo='Address'
          color={theme.color}
          backgroundColor="#66bb8a"
          onPress={()=>alert('address')}/>
        <BioHolder icon={<DateIcon height={22}/>}
          labelInfo=""
          userInfo={user.dateOfBirth}
          labelInfo='Date of Birth'
          color={theme.color}
          backgroundColor="#f44"
          onPress={()=>alert('date of birth')}/>
        <BioHolder icon={<Phone height={20}/>}
          labelInfo="Phone Number"
          userInfo={user.phoneNumber}
          color={theme.color}
          backgroundColor="#ffa500"
          onPress={()=>alert('phone')}/>
        <BioHolder icon={<ID height={18}/>}
          userInfo={user.ktpId}
          labelInfo='ID Card Number'
          color={theme.color}
          backgroundColor="#009"
          onPress={()=>alert('id card number')}/>
      </View>
    </View>
  )
}

export default Profile
