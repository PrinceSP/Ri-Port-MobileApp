import React, {useState,useContext} from 'react'
import {View,Text,Image} from 'react-native'
import {Button,BioHolder,Gap,Header} from '../../components'
import {DateIcon,Email,Address,Phone,AvatarProfile,ID,MainLogo} from '../../assets'
import {AuthContext} from '../../context/authContext'
import {ThemeContext} from '../../context/themeContext'

const Profile = ({navigation})=>{
  const {user} = useContext(AuthContext)
  const {color, bgColor} = useContext(ThemeContext)

  return(
    <View style={{flex:1,backgroundColor:bgColor}}>
      <Gap height={15}/>
      <Header name='Profile' action='< back' edit={true} nav={navigation} color={color} bgColor={bgColor}/>
      <Gap height={350}/>
      <View style={{flex:0.9,alignItems:'center',justifyContent:'flex-end'}}>
        <View style={{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:130,width:130,alignItems:'center',justifyContent:'center'}}>
          {user.profilePicture ? <Image source={{uri:`data:image/png;base64,${user.profilePicture}`}} style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/> : <View style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/>}
        </View>
        <Gap height={20}/>
        <BioHolder icon={<AvatarProfile fill="#a0a0a0"/>} userInfo={user.username} labelInfo='Fullname' color={color} backgroundColor={bgColor}/>
        <BioHolder icon={<Email height={28}/>} userInfo={user.email} labelInfo='Email address' color={color} backgroundColor={bgColor}/>
        <BioHolder icon={<Address height={28}/>} userInfo={user.address} labelInfo='Address' color={color} backgroundColor={bgColor}/>
        <BioHolder icon={<DateIcon height={28}/>} userInfo={user.dateOfBirth} labelInfo='Date of Birth' color={color} backgroundColor={bgColor}/>
        <BioHolder icon={<Phone height={26}/>} userInfo={user.phoneNumber} labelInfo='Phone Number' color={color} backgroundColor={bgColor}/>
        <BioHolder icon={<ID height={24}/>} userInfo={user.ktpId} labelInfo='ID Card Number' color={color} backgroundColor={bgColor}/>
        <Gap height={28}/>
      </View>
    </View>
  )
}

export default Profile
