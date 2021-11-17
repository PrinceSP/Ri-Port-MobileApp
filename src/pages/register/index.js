import React,{useState} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,ScrollView,Image,Platform} from 'react-native'
import {Input,Gap,Button,Header,ImagePicker} from '../../components'
import {PD} from '../../assets'
import {launchImageLibrary} from 'react-native-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';


const Register =({navigation})=>{
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [date,setDate] = useState(new Date())
  const [show,setShow] = useState(false)
  const [theDate,setTheDate]= useState('')
  const [userInfo,setUserInfo] = useState({
    fname:'',
    email:'',
    address:'',
    phone:'',
    idCardNumber:'',
    password:''
  })


  let isTrue;

  const getImage=()=>{
    const options={
      maxHeight:160,
      maxWidth:160,
      includeBase64:true,
    }
    launchImageLibrary(options,res=>{
      console.log(res.assets[0].uri);
      if(res.didCancel){
        setHasPhoto(false)
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.assets[0].base64);
        setHasPhoto(true);
      }
    })
  }

  const onChange = (e, selectedDate)=>{
    const currentDate = selectedDate || date

    setShow(Platform=='ios')
    if (e.type === 'set') {
      setDate(currentDate)
      let tempDate = new Date(currentDate)
      let fDate = `${tempDate.getDate()} ${(tempDate.getMonth()+1)} ${tempDate.getFullYear()}`
      setTheDate(fDate)
    } else {
      setDate(new Date())
      setTheDate('')
    }
  }

  //handle submit form button
  const submit = ()=>{
    // navigate into home page
    navigation.navigate('Root',{screen:'BottomTabs'})
    // show in console the key names and key values of each data stored in userInfo
    // using looping for...in to loop through object
    for(const datas in userInfo) console.log(`${datas} : ${userInfo[datas]}`);
    // reset the values of each keys after submit button has been pressed
    setUserInfo({fname:'',email:'',address:'',phone:'',idCardNumber:'',password:''})
  }

  const {fname,email,address,phone,idCardNumber,password} = userInfo

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Sign Up" action='Cancel' nav={navigation}/>
      <Gap height={45}/>
      <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center',paddingBottom:35}} showsVerticalScrollIndicator={false}>
        <ImagePicker
          photo={photo}
          hasPhoto={hasPhoto}
          onPress={getImage}/>
        <Gap height={59}/>
        <Input placeholder="Fullname" value={fname} onChangeText={(event)=>{
            setUserInfo({...userInfo,fname:event})}}/>
        <Gap height={30}/>
        <Input placeholder="Email address" value={email}  onChangeText={(event)=>{
            setUserInfo({...userInfo,email:event})}}/>
        <Gap height={30}/>
        <Input placeholder="Address" value={address} onChangeText={(event)=>{
            setUserInfo({...userInfo,address:event})}}/>
        <Gap height={30}/>
        <View>
          <TouchableOpacity style={{width:327,height:48,borderRadius:50,position:'absolute',zIndex:2}} onPress={()=>setShow(true)}/>
          <Input placeholder="Birth of date" value={theDate}/>
        </View>
        {
          show && <DateTimePicker testID='dateTimePicker'
          value={date}
          mode='date'
          display='default'
          onChange={onChange}
          is24Hour={true}
          />
        }
        <Gap height={30}/>
        <Input placeholder="Phone number" value={phone} onChangeText={(event)=>{
            setUserInfo({...userInfo,phone:event})}}/>
        <Gap height={30}/>
        <Input placeholder="ID Card" value={idCardNumber} onChangeText={(event)=>{
            setUserInfo({...userInfo,idCardNumber:event})}}/>
        <Gap height={30}/>
        <Input placeholder="Password" value={password} onChangeText={(event)=>{
            setUserInfo({...userInfo,password:event})}}/>
        <Gap height={78}/>
        <Button name="SIGN UP" color="#FFF" fam='Poppins-Medium' size={24} style={style.button}
          onPress={()=>submit()}/>
        <Gap height={28}/>
        <View style={{flexDirection:'row'}}>
          <Text style={style.poppinsMed}>Have an account?</Text>
          <Button name='Login' color='#FF1D1D' fam='Poppins-Bold' style={{marginLeft:4}} onPress={()=>navigation.navigate('Login')}/>
        </View>
      </ScrollView>
    </View>

  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#FFB830',
    height:66,
    width:329,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  poppinsMed:{
    fontFamily:'Poppins-Medium'
  }
})

export default Register
