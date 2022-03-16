import React, {useState,useContext} from 'react'
import {Text,View,StyleSheet,Platform} from 'react-native'
import {ReportInput,Gap,Header,Button} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'
import DateTimePicker from '@react-native-community/datetimepicker';

const EditBornDate = ({navigation}) => {
  const [date,setDate] = useState(new Date())
  const [show,setShow] = useState(false)
  const [bornDate,setBornDate] = useState('')
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)

  //handle on change event when user change the date
  const onChange = (e, selectedDate)=>{
    const currentDate = selectedDate || date

    setShow(Platform=='ios')
    if (e.type === 'set') {
      // set the inputed date into the current date
      setDate(currentDate)
      // put the current date inputed by user into the built-in date function to return the actual Date
      let tempDate = new Date(currentDate)
      // from the actual date in 'tempDate', get the date day-month-year
      let fDate = `${tempDate.getDate()}-${(tempDate.getMonth()+1)}-${tempDate.getFullYear()}`
      setBornDate(fDate)
    } else {
      // reseting the dates
      setDate(new Date())
      // setTheDate('') when user cancel input the date
      setBornDate('')
    }
  }

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
      <Header name="Edit Born Date" action='Cancel' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={40}/>
      <View style={styles.dateContainer}>
        <Button style={styles.toggleDate} onPress={()=>setShow(true)}/>
        <ReportInput color={theme.color} label="Your Birth Date" defaultValue={bornDate}/>
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
      <Gap height={65}/>
      <Button style={styles.button} name="Update" color="#FFF" weight={500} size={22} onPress={()=>submit({userId:currentUser._id,dateOfBirth:bornDate})}/>
    </View>
  )
}
const styles=StyleSheet.create({
  button:{
    backgroundColor:'#FFB830',
    height:50,
    width:279,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  toggleDate:{
    height:55,
    width:'100%',
    borderRadius:14,
    position:'absolute',
    top:10,
    zIndex:2
  },
  dateContainer:{
    width:350,
    alignSelf:'center'
  }
})
export default EditBornDate
