import React, {useState,useContext} from 'react'
import {Text,View,StyleSheet,Platform} from 'react-native'
import {ReportInput,Gap,Header,Button,toastConfig} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const EditIDCard = ({navigation}) => {
  const [ktpId,setKtpId] = useState('')
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)

  const submit= async (data)=>{
    try {
      const options = {
        method:'put',
        headers:{
          'Accept':'application/json, text/plain, */*',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      }
      await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser._id}`,options)
      .then(res=>{
        Toast.show({
          type:'success',
          text1:'Success',
          text2:'Your KTP ID has been updated!'
        })
      }).catch(e=>{
        Toast.show({
          type:'error',
          text1:'Error',
          text2:"Cannot update your KTP ID!"
        })
      })
    } catch (e) {
      Toast.show({
        type:'error',
        text1:'Error',
        text2:"Check your internet connection!"
      })
      return e
    }
  }
  return (
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
      <Gap height={15}/>
      <Header name="Edit ID Card" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={40}/>
      <View style={styles.inputContainer}>
        <ReportInput keyboardType='numeric' color={theme.color} label="Your ID Card" defaultValue={ktpId} onChangeText={(e)=>setKtpId(e)}/>
      </View>
      <Gap height={65}/>
      <Button style={styles.button} name="Update" color="#FFF" weight={500} size={22} onPress={()=>submit({userId:currentUser._id,ktpId})}/>
    </View>
  )
}
const styles=StyleSheet.create({
  button:{
    backgroundColor:'#FFB830',
    height:50,
    width:279,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  inputContainer:{
    width:350,
    alignSelf:'center'
  }
})
export default EditIDCard
