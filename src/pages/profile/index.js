import React, {useState} from 'react'
import {View,Text, Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from '../../components'

const Profile = ()=>{
  const [date,setDate] = useState(new Date())
  const [mode,setMode] = useState('date')
  const [show,setShow] = useState(false)

  const onChange = (e, selectedDate)=>{
    const currentDate = selectedDate || date
    setShow(Platform=='ios')
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/'+tempDate.getFullYear()
    console.log(fDate);
  }

  return(
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile
