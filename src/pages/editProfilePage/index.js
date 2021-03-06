import React,{useState,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,ActivityIndicator} from 'react-native'
import {Input,Gap,Button,Header,ImagePicker,toastConfig} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'
import Toast from 'react-native-toast-message';

 const EditProfilePage =({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const [isFetching,setIsFetching] = useState(false)
  const {theme} = useTheme()
  const [userInfo,setUserInfo] = useState({
    fullname:currentUser[0].fullname,username:currentUser[0].username,ktpId:currentUser[0].ktpId
  })

  const submit = async(dataToSubmit)=>{
    try {
      const options = {
        method: 'put',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      }
      setIsFetching(true)
      await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,options)
      .then(res=>{
        setIsFetching(false)
        Toast.show({
          type:'success',
          text1:'Success',
          text2:'Your bio has been updated!'
        })
      }).catch(e=>{
        setIsFetching(false)
        Toast.show({
          type:'error',
          text1:'Error',
          text2:'Internal server error!'
        })
      })
    } catch (e) {
      Toast.show({
        type:'error',
        text1:'Cannot update your account!',
        text2:'Check again your internet connection'
      })
      return e
    }
  }

  return(
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
      <Gap height={15}/>
      <Header name="Edit Bio" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Toast config={toastConfig} position="top" topOffset={0} visibilityTime={2200}/>
      <Gap height={40}/>
      <Text style={style.heading}>Public Informations</Text>
      <ScrollView keyboardShouldPersistTap='always' contentContainerStyle={{alignItems:'center',justifyContent:'center',paddingBottom:35}} showsVerticalScrollIndicator={false}>
        <Input borderRadius={14} setLabel={true} label="Fullname" color={theme.color} placeholder="john bernard doe" defaultValue={userInfo.fullname} onChangeText={(event)=>{
            setUserInfo({...userInfo,fullname:event})}}/>
        <Gap height={30}/>
        <Input borderRadius={14} setLabel={true} label="Username" color={theme.color} placeholder="johndoe12" defaultValue={userInfo.username}
          onChangeText={event=>{
            setUserInfo({...userInfo,username:event})}}/>
        <Gap height={30}/>
        {isFetching===true&&<ActivityIndicator style={{zIndex:1,position:'absolute',top:200,backgroundColor:'#bcbcbc',padding:10,borderRadius:50}} size="large" color="#fff"/>}
        <Input borderRadius={14} setLabel={true} keyboardType='numeric' label="KTP ID" color={theme.color} placeholder="732180xxxxx" defaultValue={userInfo.ktpId}
          onChangeText={event=>{
            setUserInfo({...userInfo,ktpId:event})}}/>
        <Gap height={60}/>
        <Button style={style.button} name="SAVE" color="#FFF" weight={500} size={22} onPress={()=>submit({userId:currentUser[0]._id,fullname:userInfo.fullname,username:userInfo.username,ktpId:userInfo.ktpId})}/>
        <Gap height={28}/>
      </ScrollView>
    </View>

  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#4444FF',
    height:50,
    width:329,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center'
  },
  heading:{
    fontSize:20,
    fontFamily:'Poppins-Regular',
    color:"#888",
    marginLeft:20,
    marginBottom:30,
  }
})

export default EditProfilePage
