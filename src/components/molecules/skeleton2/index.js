import React, {useRef,useEffect} from 'react'
import {View,Animated,StyleSheet} from 'react-native'

const SkeletonTwo = () => {
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
    <Animated.View style={[styles.container,{opacity:opacity.current}]}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:30}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column'}}>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:10,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
          <View style={{height:20,width:50,backgroundColor:'#E1E9EE'}}/>
        </View>
      </View>
      <View style={{width:"100%",height:4,backgroundColor:"#E1E9EE"}}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:30}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column'}}>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:10,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
          <View style={{height:20,width:50,backgroundColor:'#E1E9EE'}}/>
        </View>
      </View>
      <View style={{width:"100%",height:4,backgroundColor:"#E1E9EE"}}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:30}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column'}}>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:10,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
          <View style={{height:20,width:50,backgroundColor:'#E1E9EE'}}/>
        </View>
      </View>
      <View style={{width:"100%",height:4,backgroundColor:"#E1E9EE"}}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:30}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column'}}>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:10,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
          <View style={{height:20,width:50,backgroundColor:'#E1E9EE'}}/>
        </View>
      </View>
      <View style={{width:"100%",height:4,backgroundColor:"#E1E9EE"}}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:30}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column'}}>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:10,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
          <View style={{height:20,width:50,backgroundColor:'#E1E9EE'}}/>
        </View>
      </View>
      <View style={{width:"100%",height:4,backgroundColor:"#E1E9EE"}}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:100}}>
        <View style={{width:"100%",flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:30}}>
          <View style={styles.imageSkeleton}/>
          <View style={{flexDirection:'column'}}>
            <View style={{height:20,width:150,backgroundColor:'#E1E9EE'}}/>
            <View style={{height:10,width:150,backgroundColor:'#E1E9EE',marginTop:10}}/>
          </View>
          <View style={{height:20,width:50,backgroundColor:'#E1E9EE'}}/>
        </View>
      </View>
      <View style={{width:"100%",height:4,backgroundColor:"#E1E9EE"}}/>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:200,
    paddingHorizontal:20,
    flexDirection:'column'
  },
  imageSkeleton:{
    height:15,
    width:70,
    backgroundColor:'#E1E9EE'
  }
})

export default SkeletonTwo
