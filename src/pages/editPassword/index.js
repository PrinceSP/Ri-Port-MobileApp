import React, {useState,useContext} from 'react'
import {Text,View,StyleSheet,Dimensions} from 'react-native'
import {Input,Gap,Header,Button,toastConfig} from '../../components'
import {useTheme} from '../../context/themeContext'
import {EyeTrue,EyeFalse} from '../../assets'
import {AuthContext} from '../../context/authContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import {updateError} from '../../config/validator'

const {width} = Dimensions.get('window')

const EditPassword = ({navigation}) => {
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)
  const [password,setPassword] = useState('')
  const [message,setMessage] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [hide,setHide] = useState(false)

  const validation = ()=>{
    if(password.length < 1 && confirmPassword.length < 1)
      return updateError("Fields can't be empty",setMessage)
    if(!password.trim() !== !confirmPassword.trim())
      return updateError("Password doesn't match!",setMessage)
    return true
  }

  const submit= async (data)=>{
    try {
      if(validation()){
        const options = {
          method:'put',
          headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        }
        const req = await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,options)
        const results = await req.json()
        if (req.status === 200) {
          Toast.show({
            type:'success',
            text1:'Success',
            text2:'Your password has been updated!'
          })
          setPassword('')
          setConfirmPassword('')
        } else {
          Toast.show({
            type:'error',
            text1:'Error',
            text2:"Cannot update your password!"
          })
          setPassword('')
          setConfirmPassword('')
        }
      }
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
      <Header name="Password" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Toast config={toastConfig} position="top" topOffset={0} visibilityTime={2000}/>
      <Gap height={40}/>
      <View style={styles.inputContainer}>
        <Text style={[styles.headingTitle,{color:theme.color}]}>Create new password</Text>
        <Gap height={10}/>
        <Text style={[styles.secondaryHeading,{color:theme.backgroundColor==="#fff"?"#777":"#ccc"}]}>Your new password must be different</Text>
        <Text style={[styles.secondaryHeading,{color:theme.backgroundColor==="#fff"?"#777":"#ccc"}]}>from previous used password.</Text>
        <Gap height={40}/>
        {message ? <Text style={{color:theme.backgroundColor==="#fff"?"#777":"#fff"}}>{message}</Text> : null}
        <View>
          <Input secureTextEntry={hide} borderRadius={10} width={width/1.115} setLabel={true} label="New password" color={theme.color} placeholder="*********" defaultValue={password} onChangeText={(e)=>setPassword(e)}/>
          {hide?<EyeFalse height={20} onPress={()=>setHide(false)} style={styles.passwordHideToggle}/> : <EyeTrue height={20} onPress={()=>setHide(true)} style={styles.passwordHideToggle}/>}
        </View>
        <Gap height={20}/>
        <View>
          <Input secureTextEntry={hide} borderRadius={10} width={width/1.115} setLabel={true} color={theme.color} label="Confirm new Password" placeholder="*********" defaultValue={confirmPassword} onChangeText={(e)=>setConfirmPassword(e)}/>
          {hide?<EyeFalse height={20} onPress={()=>setHide(false)} style={styles.passwordHideToggle}/> : <EyeTrue height={20} onPress={()=>setHide(true)} style={styles.passwordHideToggle}/>}
        </View>
      </View>
      <Gap height={75}/>
      <Button style={styles.button} name="Update" color="#FFF" weight={500} size={22} onPress={()=>submit({userId:currentUser[0]._id,password})}/>
    </View>
  )
}
const styles=StyleSheet.create({
  button:{
    backgroundColor:'#7777FF',
    height:55,
    width:width/1.115,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  inputContainer:{
    width:350,
    alignSelf:'center'
  },
  headingTitle:{
    fontSize:26,
    fontFamily:"Poppins-Bold"
  },
  secondaryHeading:{
    fontSize:16
  },
  passwordHideToggle:{position:'absolute',right:0,top:"55s%"},
})
export default EditPassword
