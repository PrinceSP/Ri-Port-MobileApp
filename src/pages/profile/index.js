import React, {useState,useContext} from 'react'
import {View,Text,Image,StyleSheet,Dimensions} from 'react-native'
import {Button,BioHolder,Gap,Header,ImagePicker} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import {DateIcon,Address,Phone,AvatarProfile,ID,MainLogo,Mail} from '../../assets'
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
          body: JSON.stringify({userId:user[0]._id,profilePicture:res.assets[0].base64})
        }
        fetch(`https://riport-app.herokuapp.com/api/users/${user[0]._id}`,option)
      }
    })
  }
  // const max_length = 15
  let emails = user[0].email.mail>15 ?  user[0].email.mail : user[0].email.mail.substring(0,15)
  // emails = emails.substring(0, last)
  emails = emails + `...`
  return(
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <Gap height={15}/>
      <Header name='Profile' action='< back' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <View style={{flex:0.96,alignItems:'center',justifyContent:'flex-end'}}>
        <View style={styles.imageContainer}>
          {photo ? <Image source={{uri:`data:image/png;base64,${photoBase64}`}} style={styles.imageHolder}/>
        : user[0]?.profilePicture ? <Image source={{uri:`data:image/png;base64,${user[0].profilePicture}`}} style={styles.imageHolder}/>
            : <View style={styles.imageHolder}/>}
        </View>
        <ImagePicker onPress={getImage}/>
        <Gap height={20}/>
        <Text style={{color:theme.color,backgroundColor:theme.backgroundColor,fontSize:28,fontFamily:'Poppins-Bold'}}>{user[0].username}</Text>
        <Text style={{color:"#999",backgroundColor:theme.backgroundColor,fontSize:16,fontFamily:'Poppins-Regular'}}>{user[0].email.mail}</Text>
        <Gap height={20}/>
        <BioHolder icon={<Address height={22}/>}
          labelInfo='Personal Informations'
          userInfo="Your Biodata"
          color={theme.color}
          backgroundColor="#66bb8a"
          onPress={()=>navigation.navigate('EditProfile')}/>
        <BioHolder icon={<Mail height={22}/>}
          labelInfo='Email Address'
          userInfo={emails}
          color={theme.color}
          backgroundColor="#fc99ad"
          onPress={()=>navigation.navigate('EditEmail')}/>
        <BioHolder icon={<DateIcon height={22}/>}
          userInfo={user[0].dateOfBirth}
          labelInfo='Date of Birth'
          color={theme.color}
          backgroundColor="#f44"
          onPress={()=>navigation.navigate('EditBornDate')}/>
        <BioHolder icon={<Phone height={20}/>}
          labelInfo="Phone Number"
          userInfo={user[0]?.phoneNumber.number}
          color={theme.color}
          backgroundColor="#ffa500"
          onPress={()=>navigation.navigate('EditPhone')}/>
        <BioHolder icon={<ID height={18}/>}
          userInfo={user[0].ktpId}
          labelInfo='ID Card Number'
          color={theme.color}
          backgroundColor="#009"
          onPress={()=>navigation.navigate('EditIDCard')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer:{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:Dimensions.get('window').height/5.7,width:Dimensions.get('window').width/3,alignItems:'center',justifyContent:'center'},
  imageHolder:{height:Dimensions.get('window').height/6.65,width:Dimensions.get('window').width/3.6,backgroundColor:'#eee',borderRadius:50,resizeMode: 'cover'},
})

export default Profile
