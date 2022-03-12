import React,{useState,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView} from 'react-native'
import {Input,Gap,Button,Header,ImagePicker} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import {AuthContext} from '../../context/authContext'

 const EditProfilePage =({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const [userInfo,setUserInfo] = useState({
    fullname:currentUser.fullname,username:currentUser.username,ktpId:currentUser.ktpId
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
      await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser._id}`,options)
    } catch (e) {
      return e
    }
  }

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Edit Bio" action='Cancel' nav={navigation}/>
      <Gap height={40}/>
      <Text style={style.heading}>Public Informations</Text>
      <ScrollView keyboardShouldPersistTap='always' contentContainerStyle={{alignItems:'center',justifyContent:'center',paddingBottom:35}} showsVerticalScrollIndicator={false}>
        <Input borderRadius={14} placeholder="Fullname" defaultValue={userInfo.fullname} onChangeText={(event)=>{
            setUserInfo({...userInfo,fullname:event})}}/>
        <Gap height={30}/>
        <Input borderRadius={14} placeholder="Username" defaultValue={userInfo.username}
          onChangeText={event=>{
            setUserInfo({...userInfo,username:event})}}/>
        <Gap height={30}/>
        <Input borderRadius={14} placeholder="KTP ID" defaultValue={userInfo.ktpId}
          onChangeText={event=>{
            setUserInfo({...userInfo,ktpId:event})}}/>
        <Gap height={60}/>
        <Button style={style.button} name="SAVE" color="#FFF" weight={500} size={22} onPress={()=>submit({userId:currentUser._id,fullname:userInfo.fullname,username:userInfo.username,ktpId:userInfo.ktpId})}/>
        <Gap height={28}/>
      </ScrollView>
    </View>

  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#FFB830',
    height:50,
    width:329,
    borderRadius:50,
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
