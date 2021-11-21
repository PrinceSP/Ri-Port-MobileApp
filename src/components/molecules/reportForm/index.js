import React, {useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native'
import {Gap,ReportInput} from '../../atoms'

const ReportForm = ({formData})=>{
  const [data,setData]= useState({
    fname:'',
    address:'',
    phone:'',
    idCard:'',
  })

  const {fname,address,phone,idCard} = data

  return(
    <View>
      <ReportInput label="Fullname *" value={fname} onChangeText={e=>{
          setData({...data,fname:e})
          formData(data)
        }}/>
      <Gap height={28}/>
      <ReportInput label="Phone Number *" value={phone} onChangeText={e=>{
          setData({...data,phone:e})
          formData(data)
        }}/>
      <Gap height={28}/>
      <ReportInput label="ID Card *" value={idCard} onChangeText={e=>{
          setData({...data,idCard:e})
          formData(data)
        }}/>
      <Gap height={28}/>
      <ReportInput label="Your Address *" value={address} onChangeText={e=>{
          setData({...data,address:e})
          formData(data)
        }}/>
      <Gap height={28}/>
    </View>
  )
}

export default ReportForm
