import React,{useState} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,ScrollView,Image,Platform} from 'react-native'
import {Input,Gap,Button,Header,ImagePicker} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import {AuthContext} from '../../context/authContext'

 const EditProfilePage =({navigation})=>{
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [date,setDate] = useState(new Date())
  const [show,setShow] = useState(false)
  const [theDate,setTheDate]= useState('')
  const {user:currentUser} = React.useContext(AuthContext)

  const getImage=()=>{
    const options={
      maxHeight:160,
      maxWidth:160,
      includeBase64:true,
    }
    launchImageLibrary(options,res=>{
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
      let fDate = `${tempDate.getDate()}-${(tempDate.getMonth()+1)}-${tempDate.getFullYear()}`
      setTheDate(fDate)
    } else {
      setDate(new Date())
      setTheDate('')
    }
  }

  const submit = async()=>{
    try {
      const options = {
        method: 'put',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId:currentUser._id,profilePicture:photoBase64})
      }
      const req = await fetch(`https://riport-app.herokuapp.com/api/users/${currentUser._id}`,options)
      const results = await req.json()
      console.log(results);
    } catch (e) {
      console.log(e._message);
    }
    // setHasPhoto(false)
    // setPhoto('');
    setPhotoBase64('');
    // setUserInfo({fname:'',email:'',username:'',theDate:'',phone:'',password:''})
  }

  return(
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Gap height={15}/>
      <Header name="Edit Profile" action='Cancel' nav={navigation}/>
      <Gap height={40}/>
      <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center',paddingBottom:35}} showsVerticalScrollIndicator={false}>
        <ImagePicker
          photo={photo}
          hasPhoto={hasPhoto}
          onPress={getImage}/>
        <Gap height={59}/>
        <Input placeholder="Fullname" />
        <Gap height={30}/>
        <Input placeholder="Email address" />
        <Gap height={30}/>
        <Input placeholder="Address" />
        <Gap height={30}/>
        <View>
          <TouchableOpacity style={{width:330,height:50,borderRadius:50,position:'absolute',zIndex:2}} onPress={()=>setShow(true)}/>
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
        <Gap height={78}/>
        <Button style={style.button} name="SAVE" color="#FFF" weight={500} size={24} onPress={submit}/>
        <Gap height={28}/>
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

export default EditProfilePage
