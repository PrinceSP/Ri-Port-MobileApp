import React, {useState,useContext} from 'react'
import {Text,View,StyleSheet,Platform} from 'react-native'
import {ReportInput,Gap,Header,Button} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'
import DateTimePicker from '@react-native-community/datetimepicker';

const EditIDCard = ({navigation}) => {
  const [ktpId,setKtpId] = useState('')
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)

  const submit=(data)=>{
    const options = {
      method:'put',
      headers:{
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }
    fetch(`https://riport-app.herokuapp.com/api/users/${currentUser._id}`,options)
  }
  return (
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
      <Gap height={15}/>
      <Header name="Edit ID Card" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={40}/>
      <View style={styles.inputContainer}>
        <ReportInput color={theme.color} label="Your ID Card" defaultValue={ktpId} onChangeText={(e)=>setKtpId(e)}/>
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
