import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {OnBoarding} from '../../components'
import {Button} from '../../components'
import {Img4} from '../../assets'

const WelcomeScreen = ({navigation})=>{
  return(
    <View style={style.container}>
      <Image style={style.image} source={Img4}/>
      <Text style={style.title}>Welcome User</Text>
      <Text style={style.desc}>{`You're only a few steps away
        from joining RiPort`}</Text>
      <View style={{marginTop:65}}>
        <Button name="Log In"
          style={[style.button,{backgroundColor:'#fff',borderWidth:1}]}
          size={23}
          weight={600}
          color="#000"
          onPress={()=>navigation.replace('Login')}/>
        <Button name="Sign Up"
          style={style.button}
          size={23}
          weight={600}
          color="#fff"/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    height:185,
    width:200,
    justifyContent:'center',
  },
  title:{
    marginTop:65,
    fontWeight:'800',
    fontSize:30,
    marginBottom:25,
    color:'#493d7a',
    textAlign:'center',
  },
  desc:{
    fontWeight:'300',
    color:'#686767',
    textAlign:'center',
    paddingHorizontal:64,
    fontSize:20
  },
  button:{
    marginBottom:15,
    backgroundColor:'#000',
    height:56,
    width:227,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  }
})
export default WelcomeScreen
