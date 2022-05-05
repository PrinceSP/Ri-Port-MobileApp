import React, {useState,useContext} from 'react'
import {View,Text,Image,StyleSheet,Dimensions} from 'react-native'
import {Button,BioHolder,Gap,Header,ImagePicker,toastConfig} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import {DateIcon,Address,Phone,AvatarProfile,ID,MainLogo,Mail} from '../../assets'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'
import Toast from 'react-native-toast-message';

const Profile = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
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
          body: JSON.stringify({userId:currentUser[0]._id,profilePicture:res.assets[0].base64})
        }
        fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,option)
        .then(res=>{
          Toast.show({
            type:'success',
            text1:'Success',
            text2:'Profile picture has been updated!'
          })
        }).catch(e=>{
          Toast.show({
            type:'error',
            text1:'Error',
            text2:"Cannot update profile picture!"
          })
        })
      }
    })
  }

  let emails = currentUser[0].email.mail > 15 ?  currentUser[0].email.mail : currentUser[0].email.mail.substring(0,15)
  emails = emails + `...`

  return(
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <Gap height={15}/>
      <Header name='Profile' action='< back' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Toast config={toastConfig} position="top" topOffset={0} visibilityTime={2000}/>
      <View style={{flex:0.96,alignItems:'center',justifyContent:'flex-end'}}>
        <View style={styles.imageContainer}>
          {photo ? <Image source={{uri:`data:image/png;base64,${photoBase64}`}} style={styles.imageHolder}/>
        : currentUser[0]?.profilePicture ? <Image source={{uri:`data:image/png;base64,${currentUser[0].profilePicture}`}} style={styles.imageHolder}/>
            : <View style={styles.imageHolder}/>}
        </View>
        <ImagePicker onPress={getImage}/>
        <Gap height={20}/>
        <Text style={{color:theme.color,backgroundColor:theme.backgroundColor,fontSize:28,fontFamily:'Poppins-Bold'}}>{currentUser[0].username}</Text>
        <Text style={{color:"#999",backgroundColor:theme.backgroundColor,fontSize:16,fontFamily:'Poppins-Regular'}}>{currentUser[0].email.mail}</Text>
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
          userInfo={currentUser[0].dateOfBirth}
          labelInfo='Date of Birth'
          color={theme.color}
          backgroundColor="#f44"
          onPress={()=>navigation.navigate('EditBornDate')}/>
        <BioHolder icon={<Phone height={20}/>}
          labelInfo="Phone Number"
          userInfo={currentUser[0]?.phoneNumber.number}
          color={theme.color}
          backgroundColor="#ffa500"
          onPress={()=>navigation.navigate('EditPhone')}/>
        <BioHolder icon={<ID height={18}/>}
          userInfo={currentUser[0]?.ktpId}
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
