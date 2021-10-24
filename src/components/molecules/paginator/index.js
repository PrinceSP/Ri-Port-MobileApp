import React , {useState,useRef} from 'react';
import {
  StyleSheet,
  Animated,
  useWindowDimensions,
  View,
} from 'react-native';

const Paginator = ({data,scrollX}) => {

  const {width} = useWindowDimensions()

  return (
    <View style={{flexDirection:'row',height:54}}>
      {data.map((_,i)=>{
        // make the input range for the dot
        const inputRange = [(i-1)*width,i*width,(i+1)*width];

        // the width of the dot interpolated change when the user scroll horizontally
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange:[12,22,12],
          extrapolate:'clamp'
        })

        //make the last dot opacity reduced when user slides horizontally
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange:[0.3,1,0.3],
          extrapolate:'clamp'
        })
        return <Animated.View style={[style.dot,{width: dotWidth,opacity}]} key={i.toString()}/>
      })}
    </View>
  );
};

const style = StyleSheet.create({
  dot:{
    height:12,
    borderRadius:6,
    backgroundColor:'#493d8a',
    marginHorizontal:8
  }
})

export default Paginator;
