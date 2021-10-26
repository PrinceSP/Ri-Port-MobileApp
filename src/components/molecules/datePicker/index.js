import React, {useState} from 'react'
import {View,Text, Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from '../../components'

const DatePicker = ()=>{
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
      {
        show && <DateTimePicker testID='dateTimePicker'
        value={date}
        mode={mode}
        display='default'
        onChange={onChange}
        is24Hour={true}
        />
      }
  )
}

export default DatePicker
