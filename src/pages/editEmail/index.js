import React, {useState,useContext,useRef} from 'react'
import {View,StyleSheet,Modal,Text,KeyboardAvoidingView,TextInput,Platform} from 'react-native'
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
       <View>
         <Text style={[styles.otpDesc,{color:theme.color==="#fff"?"#afafaf":"#7C7C7C"}]}>Code is sent to</Text>
         <Text style={[styles.otpDesc2,{color:theme.color==="#fff"?"#afafaf":"#7C7C7C"}]}>{email}</Text>
       </View>
       <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'padding'} style={{flex:.4,alignItems:'center',padding:10}}>
         <View>
          <TextInput
            ref={(input) =>  inputRef = input}
            placeholder="0"
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
         <Button name="Send OTP"
           color={theme.backgroundColor}
           fam='Poppins-Medium'
           size={16}
           style={styles.button2}
           onPress={()=>sendOTP()}/>
         <Text style={{color:'#aaa',fontSize:16,marginVertical:40}}>OR</Text>
         <View style={{flexDirection:'row'}}>
           <Text style={{color:"#888",fontSize:16}}>Wrong email? </Text>
           <Button name="Change email" color={theme.color} weight={500} size={16} fam="Poppins-Bold" onPress={()=>changeEmail()}/>
         </View>
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
        <Text style={[styles.verifyStatus,{backgroundColor:currentUser[0].email.verified===false ? "#ff96bf" : "#2abd40"}]}>{currentUser[0].email.verified===false?"Unverified":"Verified"}</Text>
        <ReportInput color={theme.color} label="Your Email" defaultValue={email} onChangeText={(e)=>setEmail(e)}/>
      </View>
      <Gap height={65}/>
      <View style={{alignItems:'center'}}>
        <Button style={[styles.button,{backgroundColor:'#FFB830'}]} name="Verify current email" color="#FFF" weight={500} size={22} onPress={()=>setToggle(true)}/>
        <Text style={{marginVertical:20,color:theme.color}}>OR</Text>
        <Button style={[styles.button,{backgroundColor:"#4444FF"}]} name="Update email" color="#FFF" weight={500} size={22} onPress={()=>submit()}/>
      </View>
      {toggle&&<Modal animationType="slide" transparent={true} visible={toggle}>
        <OtpScreen phoneNumber={email}/>
      </Modal>}
    </View>
  )
}

const styles = StyleSheet.create({
  button:{
    height:50,
    width:279,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  inputContainer:{
    width:350,
    alignSelf:'center',
    position:'relative'
  },
  otpDesc:{
    alignSelf:'center',
    height:49,
    fontSize:18,
    fontFamily:'Poppins-Regular'
  },
  otpDesc2:{
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
    borderColor:"#9EAAFF",
    borderRadius:10,
    backgroundColor:'#F8F8F8'
  },
  textView:{textAlign:'center',fontSize:20,paddingHorizontal:20,paddingVertical:13,color:"#000"},
  changeBtn:{paddingHorizontal:35,flexDirection:'column',alignItems:'center',justifyContent:'space-between',marginTop:"30%"},
  verifyStatus:{
    width:100,
    paddingVertical:2,
    textAlign:'center',
    borderRadius:50,
    color:"#fff",
    fontFamily:"Poppins-SemiBold",
    position:'absolute',
    left:"30%"
  },
  button2:{
    marginBottom:10,
    backgroundColor:'#4444FF',
    height:55,
    width:329,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
    elevation:20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: "#88aaff",
        shadowOpacity: 1,
        shadowRadius:20,
      },
      android:{
        elevation: 14,
      },
    })
  },
})

export default EditEmail
