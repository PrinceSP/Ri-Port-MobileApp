import React from 'react'
import {View,Text,StyleSheet,TextInput} from 'react-native'
import {FeedbackIllustration} from '../../../assets'
import {Gap} from '../../atoms'
import {useTheme} from '../../../context/themeContext'

const FeedbackForm =({desc,onChangeText})=>{
  const {theme} = useTheme()

  return(
    <View style={[feedbackContainer,{backgroundColor:theme.backgroundColor==="#fff"?"#fff":"#453747"}]}>
      <View style={headingWrapper}>
        <Text style={[{color:theme.backgroundColor==="#fff"?"#9E20A9":"#c97af0"},headingText]}>Send me your</Text>
        <Text style={[{color:theme.backgroundColor==="#fff"?"#0085FF":"#5aadfa",marginLeft:4},headingText]}>Feedback!</Text>
      </View>
      <Text style={comment}>Tell me how was your experience and leave me a comment</Text>
      <Gap height={37}/>
      <View style={[feedbackTextContainer,{backgroundColor:theme.backgroundColor==="#fff"?"#FBEFEF":"#564848"}]}>
        <TextInput style={textArea}
          underlineColorAndroid="transparent"
          placeholderTextColor="#C0A8C2"
          numberOfLines={10}
          multiline={true}
          defaultValue={desc}
          placeholder={`leave me any suggestions, doubts or claims to improve:)`}
          onChangeText={onChangeText}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  feedbackContainer:{shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius:20,
    elevation: 7,
    alignItems:'center',
    paddingTop:28,
    borderRadius:20,
    height:328,
    width:339
  },
  headingWrapper:{flexDirection:'row'},
  headingText:{fontSize:16,fontFamily:'Poppins-SemiBold'},
  comment:{textAlign:'center',width:230,marginTop:5,color:'#999'},
  feedbackTextContainer:{height:170,marginBottom:20,width:300,borderRadius:6},
  textArea: {
    textAlignVertical: 'top',
    fontSize:18,
    paddingHorizontal:15,
    color:'#000'
  }
})

const {textArea,mainWrapper,innerWrapper,feedbackContainer,headingWrapper,headingText,comment,feedbackTextContainer,modalBg,modalContainer} = style

export default FeedbackForm
