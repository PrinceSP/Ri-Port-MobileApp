import React,{useState} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,ScrollView,Image,Platform} from 'react-native'
import {Input,Gap,Button,Header} from '../../components'
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


  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={20}/>
      <Header name="Sign Up"/>
      <Gap height={45}/>
      <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center',paddingBottom:35}} showsVerticalScrollIndicator={false}>
        <View style={{alignItems:'center'}}>
          <View style={{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:150,width:150,alignItems:'center',justifyContent:'center'}}>
            {isTrue = hasPhoto===true?<Image style={{height:130,width:130,borderRadius:65}} source={{uri:photo}}/>:<View style={{height:130,width:130,backgroundColor:'#eee',borderRadius:65}}/>}
          </View>
          <Gap height={21}/>
          <Button name="Upload a profile image"
            color="#6DCDF5"
            fam="Poppins-Medium"
            size={19}
            style={{minWidth:200,alignItems:'center'}}
            onPress={getImage}/>
        </View>
        <Gap height={59}/>
        <Input placeholder="Fullname" />
        <Gap height={30}/>
        <Input placeholder="Email address" />
        <Gap height={30}/>
        <Input placeholder="Address" />
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
        <Input placeholder="Phone number" />
        <Gap height={30}/>
        <Input placeholder="ID Card" />
        <Gap height={30}/>
        <Input placeholder="Password" />
        <Gap height={78}/>
        <Button style={style.button} name="SIGN UP" color="#FFF" weight={500} size={24}
          onPress={()=>navigation.navigate('Root',{screen:'Home'})}/>
        <Gap height={28}/>
        <View style={{flexDirection:'row'}}>
          <Text style={style.poppinsMed}>Have an account?</Text>
          <Text style={[style.poppinsMed,{color:'#FF1D1D'}]}> Login</Text>
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
