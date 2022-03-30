import React, {useState,useContext,useRef,useEffect} from 'react'
import {Text,View,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import {Gap,Header,Button} from '../../components'
import {Countries} from '../../config/countries'
import {Verify} from '../../assets'
import {useTheme} from '../../context/themeContext'

const OtpScreen = ({navigation})=>{
  const {theme} = useTheme()
  const [otpValue,setOtpValue] = useState(" ")
  let inputRef = useRef(null)

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

  return(
    <View style={{backgroundColor:theme.backgroundColor,flex:1}}>
     <Gap height={15}/>
     <Header name="Verify Phone" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
     <Gap height={40}/>
     <Text style={[styles.otpDesc,{color:theme.color==="#fff"?"#afafaf":"#7C7C7C"}]}>Code is sent to {phoneNumber}</Text>
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
     <Button name="Change Number" color="#000" weight={500} size={16} onPress={()=>submit({userId:currentUser._id,phoneNumber:{number:`+62${phoneNumber}`}})}/>
    </View>
  )
}

const styles=StyleSheet.create({
  illustration:{
    alignSelf:'center',
    marginBottom:60
  },
  button:{
    backgroundColor:'#FFB830',
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
    margin:14,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1.5,
    borderStyle:'solid',
    borderColor:"#4EAAFF",
    backgroundColor:'#F8F8F8'
  },
  textView:{textAlign:'center',fontSize:20,paddingHorizontal:20,paddingVertical:13}
})

export default OtpScreen
