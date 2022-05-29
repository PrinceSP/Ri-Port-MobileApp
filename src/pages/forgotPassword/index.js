import React,{useState} from 'react'
import {View,Text,StyleSheet,Dimensions,Modal,Linking} from 'react-native'
import {Header,toastConfig,Gap,Input,Button} from '../../components'
import {CheckedEmail} from '../../assets'
import {ArrowRTwo} from "../../assets"
import Toast from 'react-native-toast-message'

const ForgotPassword = ({navigation}) => {
  const [username,setUsername] = useState('')
  const {width} = Dimensions.get('screen')
  const [toggle,setToggle] = useState(false)

  const CheckMail = ()=>{

    const changeNumber=()=>{
      setToggle(false)
    }

    return(
      <View style={{backgroundColor:"#fff",flex:1,alignItems:'center'}}>
        <Gap height={120}/>
        <View style={{backgroundColor:"#85F4FD",height:100,width:100,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
          <CheckedEmail height={60}/>
        </View>
        <Gap height={30}/>
        <Text style={[style.headingTitle,{color:"#000"}]}>Check your mail</Text>
        <Gap height={10}/>
        <Text style={style.secondaryHeading}>We have sent a password recover</Text>
        <Text style={style.secondaryHeading}>link to your email.</Text>
        <Gap height={40}/>
        <Button name="Open email app" color='#fff' style={style.buttonOpen} fam='Poppins-SemiBold' size={18} onPress={()=>Linking.openURL("mailto:princedinda1228@gmail.com")}/>
        <Gap height={24}/>
        <Button name="Skip, I'll confirm later" color='#777' fam='Poppins-SemiBold' size={18} onPress={()=>setToggle(false)}/>
        <View style={{alignItems:'center',justifyContent:'center',position:'absolute',bottom:"5%"}}>
          <Text style={style.secondaryHeading}>Did not receive email? Check you spam filter, or</Text>
          <Button name="try another email address" color='#44f' fam='Poppins-Bold' onPress={()=>setToggle(false)}/>
        </View>
      </View>
    )
  }

  const handleForgot = async()=>{
    try {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username})
      }
      const response = await fetch('https://riport-app.herokuapp.com/api/users/forgot-password',options)
      const results = await response.json()

      if (response.status === 201) {
        Toast.show({
          type:'success',
          text1:'Success',
          text2:'Successfuly send link to email!'
        })
        setToggle(true)
      }else{
        Toast.show({
          type:'error',
          text1:'Error',
          text2:results
        })
        console.log(results);
      }
      setUsername('')
    } catch (e) {
      Toast.show({
        type:'error',
        text1:'Error',
        text2:'errors'
      })
      setUsername('')
    }
  }

  return (
    <View style={[style.container,{backgroundColor:"#fff"}]}>
      <Gap height={15}/>
      <Header name="" action='Cancel' nav={navigation}/>
      <Toast config={toastConfig} position="top" topOffset={0} visibilityTime={2000}/>
      <Gap height={45}/>
      <View style={style.content}>
        <Text style={style.headingTitle}>Forgot your password?</Text>
        <Text style={style.secondaryHeading}>Enter the username associated with your account</Text>
        <Text style={style.secondaryHeading}>and we'll send an email with link to</Text>
        <Text style={style.secondaryHeading}>reset your password</Text>
        <Gap height={60}/>
        <Input borderRadius={8} width={width/1.1} setLabel={true} label="Username" color="#666" placeholder="princesiachin98" defaultValue={username} onChangeText={event=>setUsername(event)}/>
        <Gap height={40}/>
        <View style={style.sendContainer}>
          <Text style={style.send}>Send Link</Text>
          <Button name={<ArrowRTwo/>} color='#fff' style={[style.buttonSend,{backgroundColor:"#ED6262"}]} fam='Poppins-Bold' onPress={handleForgot}/>
        </View>
      </View>
      {toggle&&<Modal animationType="slide" transparent={true} visible={toggle}>
        <CheckMail/></Modal>}
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
  },
  headingTitle:{
    fontSize:26,
    fontFamily:"Poppins-Bold",
    color:"#222"
  },
  content:{
    paddingHorizontal:17
  },
  secondaryHeading:{
    color:"#777",
    fontSize:16
  },
  sendContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  send:{
    fontSize:20,
    fontFamily:'Poppins-Bold',
    color:"#000"
  },
  buttonSend:{
    width:90,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#FF1D1D",
    borderRadius:50
  },
  buttonOpen:{
    width:230,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#4444FF",
    borderRadius:10
  }
})

export default ForgotPassword
