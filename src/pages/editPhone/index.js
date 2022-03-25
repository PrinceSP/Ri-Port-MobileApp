import React, {useState,useContext} from 'react'
import {Text,View,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,Modal,SafeAreaView,FlatList} from 'react-native'
import {Gap,Header,Button} from '../../components'
import {Countries} from '../../config/countries'
import {Verify} from '../../assets'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'

const EditPhone = ({navigation}) => {
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)
  const [phoneNumber,setPhone] = useState(currentUser.phoneNumber)

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
      <Header name="Edit Phone" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={40}/>
      <Verify style={styles.illustration}/>
      <Text style={[styles.desc,{color:theme.color==="#fff"?"#afafaf":"#7C7C7C"}]}>You’ll receive a 4 digit code to verify next.</Text>
      <View style={[styles.inputContainer,{backgroundColor:theme.backgroundColor,borderBottomColor:"#244db7"}]}>
        <View style={styles.openDialogView}>
          <Text style={{color:theme.color}}>+62 | </Text>
        </View>
        <TextInput style={[styles.textInput,{color:theme.color}]}
          placeholder="9999-999-999" placeholderTextColor={theme.color==="#fff"?"#888":"#aaa"}
          keyboardType='numeric' defaultValue={phoneNumber} onChangeText={(e)=>setPhone(e)}/>
        <TouchableOpacity style={styles.clear} onPress={()=>setPhone('')}>
          <Text style={{color:theme.color}}>X</Text>
        </TouchableOpacity>
      </View>
      <Gap height={100}/>
      <Button style={styles.button} name="Continue" color="#FFF" weight={500} size={22} onPress={()=>submit({userId:currentUser._id,phoneNumber:`0${phoneNumber}`})}/>
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
    height:50
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
  }
})

export default EditPhone
