import React, {useRef,useEffect} from 'react'
import {View,Animated,StyleSheet} from 'react-native'

const Skeleton = () => {
  const opacity = useRef(new Animated.Value(0.3))

  useEffect(()=>{
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current,{
          toValue:1,
          useNativeDriver:true,
          duration:500
        }),
        Animated.timing(opacity.current,{
          toValue:0.3,
          useNativeDriver:true,
          duration:800
        })
      ])
    ).start()
  },[opacity])
  return (
    <View style={[styles.container]}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <Animated.View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginBottom:30,opacity:opacity.current}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column',marginLeft:10}}>
            <View style={{height:20,width:200,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
        </Animated.View>
        <Animated.View style={{height:30,alignItems:'center',justifyContent:'space-between',opacity:opacity.current}}>
          <View style={styles.option}/>
          <View style={styles.option}/>
          <View style={styles.option}/>
        </Animated.View>
      </View>
      <Animated.View style={[styles.desc,{opacity:opacity.current}]}>
        <View style={{backgroundColor:"#E1E9EE",height:15,width:"30%"}}/>
        <View style={{backgroundColor:"#E1E9EE",height:15,width:"70%"}}/>
        <View style={{backgroundColor:"#E1E9EE",height:15,width:"70%"}}/>
      </Animated.View>
      <Animated.View style={{backgroundColor:"#E1E9EE",height:200,width:"100%",borderRadius:7,opacity:opacity.current}}/>
      <Animated.View style={{opacity:opacity.current,marginBottom:30}}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <Animated.View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginBottom:30,opacity:opacity.current}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column',marginLeft:10}}>
            <View style={{height:20,width:200,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
        </Animated.View>
        <Animated.View style={{height:30,alignItems:'center',justifyContent:'space-between',opacity:opacity.current}}>
          <View style={styles.option}/>
          <View style={styles.option}/>
          <View style={styles.option}/>
        </Animated.View>
      </View>
      <Animated.View style={[styles.desc,{opacity:opacity.current}]}>
        <View style={{backgroundColor:"#E1E9EE",height:15,width:"30%"}}/>
        <View style={{backgroundColor:"#E1E9EE",height:15,width:"70%"}}/>
        <View style={{backgroundColor:"#E1E9EE",height:15,width:"70%"}}/>
      </Animated.View>
      <Animated.View style={{backgroundColor:"#E1E9EE",height:200,width:"100%",borderRadius:7,opacity:opacity.current}}/>
      <Animated.View style={{opacity:opacity.current}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:200,
    paddingHorizontal:20
  },
  imageSkeleton:{
    height:60,
    width:60,
    borderRadius:60,
    backgroundColor:'#E1E9EE'
  },
  desc:{
    height:60,
    marginBottom:10,
    justifyContent:'space-between'
  },
  option:{width:7,height:7,borderRadius:7,backgroundColor:'#E1E9EE'}
})

export default Skeleton
