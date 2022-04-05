import React, {useState,useContext,useRef} from 'react'
import {View,StyleSheet,Modal,Text,KeyboardAvoidingView,TextInput} from 'react-native'
import {ReportInput,Gap,Header,Button} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'

const EditEmail = ({navigation}) => {
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)
  const [email,setEmail] = useState(currentUser[0].email.mail)
  const [toggle,setToggle] = useState(false)

  const OtpScreen = ({navigation})=>{
    const [otpValue,setOtpValue] = useState("")
    let inputRef = useRef(null)

    const changeEmail=()=>{
      setToggle(false)
    }

    const sendOTP = async()=>{
      try {
        const options = {
          method:'post',
          headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({userId:currentUser[0]._id,otp:otpValue})
        }
        await fetch(`https://riport-app.herokuapp.com/api/auth/verify-email`,options)
        setToggle(false)
      } catch (e) {
        return e
      }
    }

    return(
      <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
       <Gap height={15}/>
       <Text style={{color:theme.color,fontSize:20,alignSelf:'center',fontFamily:'Poppins-Regular'}}>Edit Email</Text>
       <Gap height={40}/>
       <Text style={[styles.otpDesc,{color:theme.color==="#fff"?"#afafaf":"#7C7C7C"}]}>Code is sent to {email}</Text>
       <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'padding'} style={{flex:.4,alignItems:'center',padding:10}}>
         <View>
          <TextInput
            ref={(input) =>  inputRef = input}
            onChangeText={(val)=>setOtpValue(val)}
            defaultValue={otpValue}
            style={{width:0,height:0}}
            maxLength={4}
            returnKeyType="done"
            keyboardType="numeric"
            />
          <View style={styles.containerInput}>
            {
              Array(4).fill().map((item,index)=>(
                <View style={styles.cellView} key={index}>
                  <Text style={styles.textView} onPress={()=>inputRef.focus()}>
                    {otpValue && otpValue > 0 ? otpValue[index] : " "}
                  </Text>
                </View>
              ))
            }
          </View>
         </View>
       </KeyboardAvoidingView>
       <View style={styles.changeBtn}>
         <Button name="Change email" color={theme.color} weight={500} size={15} onPress={()=>changeEmail()}/>
         <Button name="Send OTP" color={theme.color} weight={500} size={15} onPress={()=>sendOTP()}/>
       </View>
      </View>
    )
  }

  const submit=()=>{
    // try {
    //   const options = {
    //     method:'post',
    //     headers:{
    //       'Accept':'application/json, text/plain, */*',
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({userId:currentUser[0]._id,phoneNumber:`+62${phoneNumber}`})
    //   }
    //   const updateNumber = {
    //     method:'put',
    //     headers:{
    //       'Accept':'application/json, text/plain, */*',
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({userId:currentUser[0]._id,phoneNumber:{number:phoneNumber}})
    //   }
    //   await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,updateNumber)
    //   await fetch(`https://riport-app.herokuapp.com/api/auth/smsOtpToPhone`,options)
    //   if (phoneNumber!==(null||"")) {
    //     setToggle(true)
    //   }
    // } catch (e) {
    //   return e
    // }
    setToggle(true)
  }

  return (
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
      <Gap height={15}/>
      <Header name="Edit Email" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={15}/>
      <View style={styles.inputContainer}>
        <ReportInput color={theme.color} label="Your Email" defaultValue={email} onChangeText={(e)=>setEmail(e)}/>
      </View>
      <Gap height={65}/>
      <Button style={styles.button} name="Update" color="#FFF" weight={500} size={22} onPress={()=>submit()}/>
      {toggle&&<Modal animationType="slide" transparent={true} visible={toggle}>
        <OtpScreen phoneNumber={email}/>
      </Modal>}
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
  },
  otpDesc:{
    alignSelf:'center',
    height:49,
    marginBottom:29,
    fontSize:18,
    fontFamily:'Poppins-Regular'
  },
  containerInput:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  cellView:{
    height:60,
    width:60,
    marginHorizontal:14,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1.5,
    borderStyle:'solid',
    borderColor:"#4EAAFF",
    backgroundColor:'#F8F8F8'
  },
  textView:{textAlign:'center',fontSize:20,paddingHorizontal:20,paddingVertical:13},
  changeBtn:{paddingHorizontal:35,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}
})

export default EditEmail
