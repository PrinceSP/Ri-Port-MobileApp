import React, {useState,useContext} from 'react'
import {View,StyleSheet} from 'react-native'
import {ReportInput,Gap,Header,Button} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'

const EditEmail = ({navigation}) => {
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)
  const [email,setEmail] = useState(currentUser[0].email.mail)

  return (
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
      <Gap height={15}/>
      <Header name="Edit Email" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={15}/>
      <View style={styles.inputContainer}>
        <ReportInput color={theme.color} label="Your Email" defaultValue={email} onChangeText={(e)=>setEmail(e)}/>
      </View>
      <Gap height={65}/>
      <Button style={styles.button} name="Update" color="#FFF" weight={500} size={22} onPress={()=>submit({userId:currentUser._id,ktpId})}/>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default EditEmail
