import React from 'react';
import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


const OnBoardingItem = ({item}) => {

  const {width} = useWindowDimensions()

  return (
    <View style={[style.container,{width}]}>
      <Image source={item.image} style={[style.image,{width,resizeMode:'contain'}]}/>
      <View style={{flex:0}}>
        <Text style={style.title}>{item.title}</Text>
        <Text style={style.desc}>{item.desc}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    height:97,
    width:104,
    justifyContent:'center',
    position:'absolute',
    top:97
  },
  title:{
    marginTop:65,
    fontWeight:'700',
    fontSize:27,
    marginBottom:25,
    color:'#000',
    textAlign:'center',
  },
  desc:{
    fontWeight:'300',
    color:'#686767',
    textAlign:'center',
    paddingHorizontal:64,
    fontSize:20
  }
})

export default OnBoardingItem;
