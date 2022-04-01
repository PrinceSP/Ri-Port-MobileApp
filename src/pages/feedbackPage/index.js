import React, {useEffect,useState,useContext} from 'react'
import {View,Text,StyleSheet,Image,TextInput,ScrollView,Modal} from 'react-native'
import {FeedbackIllustration,ModalSuccessIcon} from '../../assets'
import {Header,Gap,Button,ModalSuccess,FeedbackForm} from '../../components'
import {useTheme} from '../../context/themeContext'
import {AuthContext} from '../../context/authContext'

const Feedback=({navigation})=>{
  const [visible,setVisible] = useState(false)
  const {theme} = useTheme()
  const {user:currentUser} = useContext(AuthContext)
  const [desc,setDesc] = useState('')

  const submit = ()=>{
    const options={
      method:'post',
      headers:{
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({userId:currentUser[0]._id,desc})
    }
    fetch('https://riport-app.herokuapp.com/api/feedback/',options)
    .then(res=>{
      if (res.status===500) {
        setDesc('')
        setVisible(false)
      } else{
        setVisible(true)
        setDesc('')
      }
    }).catch(e=>{
      setVisible(false)
      setDesc('')
    })

  }
  return(
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <Gap height={15}/>
      <Header name='App Feedback' action='< back' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Gap height={45}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalSuccess visible={visible}>
          <View style={modalContainer}>
            <Text onPress={()=>setVisible(false)} style={{fontSize:28,position:'absolute',right:30,top:24,color:'#000'}}>X</Text>
            <ModalSuccessIcon height={120} width={120}/>
            <View style={[headingWrapper,{marginTop:21}]}>
              <Text style={[{color:'#823589'},headingText]}>Thank you so much,</Text>
              <Text style={[{color:'#718496',marginLeft:4},headingText]}>{currentUser[0].username}!</Text>
            </View>
            <Text style={comment}>Your feedback will help us improve our app</Text>
            <View style={[headingWrapper,{marginTop:50}]}>
              <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'#C0A8C2'}}>Need some help?</Text>
              <Text style={{color:'#E550F2',marginLeft:4,fontSize:15,fontFamily:'Poppins-SemiBold'}}>Contact Us!</Text>
            </View>
          </View>
        </ModalSuccess>
        <View style={innerWrapper}>
          <FeedbackIllustration height={117}/>
          <FeedbackForm desc={desc} onChangeText={(e)=>setDesc(e)}/>
          <Gap height={26}/>
          <Button style={button} name="Send Feedback"
            color="#fff"
            fam='Poppins-Medium' size={24}
            onPress={submit}/>
        </View>
      </ScrollView>
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
  },
  innerWrapper:{alignItems:'center'},
  headingWrapper:{flexDirection:'row'},
  headingText:{fontSize:16,fontFamily:'Poppins-SemiBold'},
  comment:{textAlign:'center',width:230,marginTop:5,color:'#999'},
  modalBg:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.43)',
    alignItems:'center',
    justifyContent:'center'
  },
  modalContainer:{
    backgroundColor:'#fff',
    minHeight:405,
    minWidth:329,
    borderRadius:20,
    alignItems:'center',
    paddingVertical:64
  }
})

const {button,innerWrapper,headingWrapper,headingText,comment,feedbackTextContainer,modalBg,modalContainer} = style

export default Feedback
