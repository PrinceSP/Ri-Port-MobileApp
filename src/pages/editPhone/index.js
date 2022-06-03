import React, {useState,useContext,useRef,useEffect} from 'react'
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Modal,KeyboardAvoidingView,ActivityIndicator} from 'react-native'
import {Gap,Header,Button,toastConfig} from '../../components'
import {Verify} from '../../assets'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'
import Toast from 'react-native-toast-message';

const EditPhone = ({navigation}) => {
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)
  const [phoneNumber,setPhone] = useState(currentUser[0].phoneNumber.number)
  const [toggle,setToggle] = useState(false)
  const [isFetching,setIsFetching] = useState(false)

  const OtpScreen = ({navigation})=>{
    const [otpValue,setOtpValue] = useState("")
    let inputRef = useRef(null)

    const changeNumber=()=>{
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
        await fetch(`https://riport-app.herokuapp.com/api/auth/verifyPhoneNumber`,options)
        .then(res=>{
          Toast.show({
            type:'success',
            text1:'Success',
            text2:'Your phone number has been verified!'
          })
        }).catch(e=>{
          Toast.show({
            type:'error',
            text1:'Error',
            text2:"Can't verified your number!"
          })
        })
        setToggle(false)
      } catch (e) {
        Toast.show({
          type:'error',
          text1:'Error',
          text2:"Check your internet connection!"
        })
        return e
      }
    }

    return(
      <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
       <Gap height={15}/>
       <Text style={{color:theme.color,fontSize:20,alignSelf:'center',fontFamily:'Poppins-Regular'}}>Verify Phone</Text>
       <Gap height={40}/>
       <Text style={[styles.otpDesc,{color:theme.color==="#fff"?"#afafaf":"#7C7C7C"}]}>Code is sent to {phoneNumber}</Text>
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
         <Button name="Change number" color={theme.color} weight={500} size={15} onPress={()=>changeNumber()}/>
         <Button name="Send OTP" color={theme.color} weight={500} size={15} onPress={()=>sendOTP()}/>
       </View>
      </View>
    )
  }

  const submit=async()=>{
    try {
      const options = {
        method:'post',
        headers:{
          'Accept':'application/json, text/plain, */*',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({userId:currentUser[0]._id,phoneNumber:`+62${phoneNumber}`})
      }
      const updateNumber = {
        method:'put',
        headers:{
          'Accept':'application/json, text/plain, */*',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({userId:currentUser[0]._id,phoneNumber:{number:phoneNumber,verified:false}})
      }
      setIsFetching(true)
      await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,updateNumber)
      .then(res=>{
        setIsFetching(false)
        Toast.show({
          type:'success',
          text1:'Success',
          text2:'Code has been sent to your phone'
        })
      }).catch(e=>{
        setIsFetching(false)
        Toast.show({
          type:'error',
          text1:'Error',
          text2:"Cannot sent the code!"
        })
      })
      await fetch(`https://riport-app.herokuapp.com/api/auth/smsOtpToPhone`,options)
      if (phoneNumber!==(null||"")) {
        setToggle(true)
      }
    } catch (e) {
      setIsFetching(false)
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
      <Header name="Edit Phone" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Toast config={toastConfig} position="top" topOffset={0} visibilityTime={2000}/>
      <Gap height={40}/>
      <Verify style={styles.illustration}/>
      <Text style={[styles.desc,{color:theme.color==="#fff"?"#afafaf":"#7C7C7C"}]}>You’ll receive a 4 digit code to verify next.</Text>
      <View style={[styles.inputContainer,{backgroundColor:theme.backgroundColor,borderBottomColor:"#244db7"}]}>
        {isFetching===true&&<ActivityIndicator style={{zIndex:1,position:'absolute',top:200,backgroundColor:'#bcbcbc',padding:10,borderRadius:50}} size="large" color="#fff"/>}
        <View style={styles.openDialogView}>
          <Text style={[styles.dialCode,{color:theme.color}]}>+62 | </Text>
        </View>
        <TextInput style={[styles.textInput,{color:theme.color}]}
          placeholder="9999-999-999" placeholderTextColor={theme.color==="#fff"?"#888":"#aaa"}
          keyboardType='numeric' defaultValue={phoneNumber} onChangeText={(e)=>setPhone(e)}/>
        {phoneNumber !=='' && <TouchableOpacity style={styles.clear} onPress={()=>setPhone('')}>
          <Text style={{color:"#fff"}}>X</Text>
        </TouchableOpacity>}
      </View>
      <Gap height={100}/>
      <Button style={styles.button} name="Continue" color="#FFF" weight={500} size={22} onPress={()=>submit()}/>
      {toggle&&<Modal animationType="slide" transparent={true} visible={toggle}>
        <OtpScreen phoneNumber={phoneNumber}/>
      </Modal>}
    </View>
  )
}

const styles=StyleSheet.create({
  illustration:{
    alignSelf:'center',
    marginBottom:60
  },
  button:{
    backgroundColor:'#4444FF',
    height:50,
    width:279,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    shadowColor:"#ffffff",
    elevation:20
  },
  inputContainer:{
    width:355,
    alignSelf:'center',
    flexDirection:'row',
    paddingHorizontal:12,
    borderRadius:10,
    alignItems:'center',
    borderBottomWidth:1.5,
  },
  openDialogView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  textInput:{
    marginLeft:5,
    flex:1,
    height:50,
    fontSize:18
  },
  clear:{
    backgroundColor:"#8a8a8a",
    paddingHorizontal:8,
    paddingVertical:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:12
  },
  desc:{
    alignSelf:'center',
    width:227,
    height:49,
    textAlign:'center',
    marginBottom:59,
    fontSize:16,
    fontFamily:'Poppins-Regular'
  },
  dialCode:{fontSize:18},
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
  textView:{textAlign:'center',fontSize:20,paddingHorizontal:20,paddingVertical:13,color:"#000"},
  changeBtn:{paddingHorizontal:35,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}
})

export default EditPhone
