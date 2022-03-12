import React, {useState,useContext} from 'react'
import {View,Text,Image} from 'react-native'
import {Button,BioHolder,Gap,Header,ImagePicker} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import {DateIcon,Address,Phone,AvatarProfile,ID,MainLogo} from '../../assets'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'

const Profile = ({navigation})=>{
  const {user} = useContext(AuthContext)
  const {theme} = useTheme()
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')

  const getImage = ()=>{
    const options={
      maxHeight:160,
      maxWidth:160,
      includeBase64:true,
    }
    launchImageLibrary(options,res=>{
      if(res.didCancel){
        setHasPhoto(false)
        setPhoto('');
        setPhotoBase64('');
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.assets[0].base64);
        setHasPhoto(true);
        const option = {
          method: 'put',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({userId:user._id,profilePicture:res.assets[0].uri})
        }
        fetch(`https://riport-app.herokuapp.com/api/users/${user._id}`,option)
      }
    })
  }

  return(
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <Gap height={15}/>
      <Header name='Profile' action='< back' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <View style={{flex:0.86,alignItems:'center',justifyContent:'flex-end'}}>
        <View style={{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:130,width:130,alignItems:'center',justifyContent:'center'}}>
          {photo!==''?<Image source={{uri:photo}} style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/>:user.profilePicture ? <Image source={{uri:user.profilePicture}} style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/>
          : <View style={{height:115,width:115,backgroundColor:'#eee',borderRadius:65}}/>}
        </View>
        <ImagePicker onPress={getImage}/>
        <Gap height={20}/>
        <Text style={{color:theme.color,backgroundColor:theme.backgroundColor,fontSize:28,fontFamily:'Poppins-Bold'}}>{user.username}</Text>
        <Text style={{color:"#999",backgroundColor:theme.backgroundColor,fontSize:16,fontFamily:'Poppins-Regular'}}>{user.email}</Text>
        <Gap height={20}/>
        <BioHolder icon={<Address height={22}/>}
          labelInfo='Personal Informations'
          userInfo="Your Biodata"
          color={theme.color}
          backgroundColor="#66bb8a"
          onPress={()=>navigation.navigate('EditProfile')}/>
        <BioHolder icon={<DateIcon height={22}/>}
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
