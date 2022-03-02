import React , {useState,useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

import slides from './onBoardList'
import OnBoardingItem from './onBoardingItem'
import Paginator from '../paginator'
import {Button} from '../../atoms'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = ({navigation}) => {
  const [currentIndex,setCurrentIndex]=useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;

  //set the current index of each item
  const viewableItemsChanged = useRef(({viewableItems}) =>{
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current

  const sideRef = useRef(null)

  const moveTo= async ()=>{
    try {
      await AsyncStorage.setItem("@viewed","true")
      navigation.navigate('WelcomeScreen')
    } catch (e) {
      return e
    }
  }

  return (
    <View style={style.container}>
      <View style={{flex:3}}>
        <FlatList data={slides}
          renderItem={({item})=><OnBoardingItem item={item}/>}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={item=>item.id}
          onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX} } } ],
            {useNativeDriver:false}
          )}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={viewableItemsChanged}
          ref={sideRef}
          />
      </View>
      <Paginator data={slides} scrollX={scrollX}/>
      <Button name="Get Started"
        size={20}
        fam='Poppins-SemiBold' style={style.button}
        color="#fff"
        onPress={moveTo}/>
    </View>
  );
};

const style = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  button:{
    marginBottom:45,
    backgroundColor:'#2940D3',
    // backgroundColor:'#1da43b',
    height:56,
    width:327,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#3D087B',
    shadowOpacity: 1,
    elevation: 9
  }
})

export default OnBoarding;
