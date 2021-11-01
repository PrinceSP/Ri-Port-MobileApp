import React from 'react'
import {View,Text,StyleSheet,Image,TextInput,ScrollView} from 'react-native'
import {FeedbackIllustration} from '../../assets'
import {Header,Gap,Button} from '../../components'

const Feedback=({navigation})=>{
  return(
    <View style={mainWrapper}>
      <Gap height={20}/>
      <Header name='App Feedback' action='< back' nav={navigation}/>
      <Gap height={45}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={innerWrapper}>
          <FeedbackIllustration height={117}/>
          <View style={feedbackContainer}>
            <View style={headingWrapper}>
              <Text style={[{color:'#9E20A9'},headingText]}>Send me your</Text>
              <Text style={[{color:'#0085FF',marginLeft:4},headingText]}>Feedback!</Text>
            </View>
            <Text style={comment}>Tell me how was your experience and leave me a comment</Text>
            <Gap height={77}/>
            <View style={feedbackTextContainer}>
              <TextInput style={textArea}
                underlineColorAndroid="transparent"
                placeholderTextColor="#C0A8C2"
                numberOfLines={10}
                multiline={true}
                placeholder={`leave me any suggestions, doubts or claims to improve:)`}/>
            </View>
          </View>
          <Gap height={26}/>
          <Button style={button} name="Send Feedback" color="#fff" weight={500} size={24}/>
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
  mainWrapper:{flex:1,backgroundColor:'#fff'},
  innerWrapper:{alignItems:'center'},
  feedbackContainer:{shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius:20,
    elevation: 7,
    alignItems:'center',
    paddingTop:28,
    borderRadius:20,
    backgroundColor : "#fff",
    height:328,
    width:339
  },
  headingWrapper:{flexDirection:'row'},
  headingText:{fontSize:16,fontFamily:'Poppins-SemiBold'},
  comment:{textAlign:'center',width:230,marginTop:5},
  feedbackTextContainer:{height:140,marginBottom:20,width:300,borderRadius:6,backgroundColor:'#FBEFEF'},
  textArea: {
    textAlignVertical: 'top',
    fontSize:18,
    paddingHorizontal:15
  }
})

const {button,textArea,mainWrapper,innerWrapper,feedbackContainer,headingWrapper,headingText,comment,feedbackTextContainer} = style

export default Feedback
