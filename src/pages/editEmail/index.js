import React, {useState,useContext,useRef} from 'react'
import {View,StyleSheet,Modal,Text,KeyboardAvoidingView,TextInput} from 'react-native'
import {ReportInput,Gap,Header,Button,toastConfig} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'
import Toast from 'react-native-toast-message';

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
        .then(res=>{
          Toast.show({
            type:'success',
            text1:'Success',
            text2:'Your email has been verified!'
          })
        }).catch(e=>{
          Toast.show({
            type:'error',
            text1:'Error',
            text2:"Can't verified your email!"
          })
        })
        setToggle(false)
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

  const submit=async()=>{
    try {
      const options = {
        method:'put',
        headers:{
          'Accept':'application/json, text/plain, */*',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({userId:currentUser[0]._id,email:{mail:email,verified:false}})
      }
      await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,options)
      .then(res=>{
        Toast.show({
          type:'success',
          text1:'OTP has been sent',
          text2:'Check your email for OTP!'
        })
      }).catch(e=>{
        Toast.show({
          type:'error',
          text1:'Error',
          text2:'Cannot send OTP to email!'
        })
      })
      if (!email.trim() || email.length >= 8) {
        setToggle(true)
      }
    } catch (e) {
      return e
    }
    // setToggle(true)
  }

  return (
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
      <Gap height={15}/>
      <Header name="Edit Email" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Toast config={toastConfig} position="top" topOffset={0} visibilityTime={2000}/>
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
