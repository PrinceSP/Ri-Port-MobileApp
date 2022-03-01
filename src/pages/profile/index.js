import React, {useState,useContext} from 'react'
import {View,Text,Image} from 'react-native'
import {Button,BioHolder,Gap,Header} from '../../components'
import {DateIcon,Email,Address,Phone,AvatarProfile,ID,MainLogo} from '../../assets'
import {AuthContext} from '../../context/authContext'

const Profile = ({navigation})=>{
  const {user} = useContext(AuthContext)

  return(
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <Gap height={15}/>
      <Header name='Profile' action='< back' edit={true} nav={navigation}/>
      <Gap height={350}/>
      <View style={{flex:0.9,alignItems:'center',justifyContent:'flex-end'}}>
        <View style={{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:130,width:130,alignItems:'center',justifyContent:'center'}}>
          {user.profilePicture ? <Image source={{uri:`data:image/png;base64,${user.profilePicture}`}} style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/> : <View style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/>}
        </View>
        <Gap height={20}/>
        <BioHolder icon={<AvatarProfile fill="#a0a0a0"/>} userInfo='Prince Siachin' labelInfo='Fullname'/>
        <BioHolder icon={<Email height={28}/>} userInfo='prince@gmail.com' labelInfo='Email address'/>
        <BioHolder icon={<Address height={28}/>} userInfo='Luwuk, Central Sulawesi' labelInfo='Address'/>
        <BioHolder icon={<DateIcon height={28}/>} userInfo='28-08-2001' labelInfo='Date of Birth'/>
        <BioHolder icon={<Phone height={26}/>} userInfo='081213507373' labelInfo='Phone Number'/>
        <BioHolder icon={<ID height={24}/>} userInfo='081213507373' labelInfo='ID Card Number'/>
        <Gap height={28}/>
      </View>
    </View>
  )
}

export default Profile
