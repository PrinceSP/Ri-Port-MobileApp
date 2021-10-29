import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {FeedbackIllustration} from '../../assets'
import {Header,Gap,Input,Button} from '../../components'

const Feedback=()=>{
  return(
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <Gap height={20}/>
      <Header name='App Feedback' action='Cancel'/>
      <Gap height={45}/>
      <View style={{alignItems:'center'}}>
        <FeedbackIllustration height={117}/>
        <View style={{shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,shadowRadius:20,elevation: 7,alignItems:'center',paddingTop:28,paddingBottom:20,
          borderRadius:20,backgroundColor : "#fff",height:328,width:339}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{color:'#9E20A9',fontSize:16,fontFamily:'Poppins-SemiBold'}}>Send me your</Text>
            <Text style={{color:'#0085FF',fontSize:16,fontFamily:'Poppins-SemiBold',marginLeft:4}}>Feedback!</Text>
          </View>
          <Text style={{textAlign:'center',width:230,marginTop:5}}>Tell me how was your experience and leave me a comment</Text>
          <Gap height={77}/>
          <View style={{height:138,width:300,borderRadius:6,backgroundColor:'#FBEFEF'}}>
            <Input height={100} fontSize={10} placeholder={`leave me any suggestions, doubts or claims
                to improve:)`} width={300} backgroundColor='transparent' borderColor='#FBEFEF'/>
          </View>
        </View>
        <Gap height={26}/>
        <Button style={style.button} name="Send Feedback" color="#fff" weight={500} size={24}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  button:{
    marginBottom:15,
    backgroundColor:'#71B3C1',
    height:66,
    width:329,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  }
})

export default Feedback
