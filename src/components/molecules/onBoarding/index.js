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

const OnBoarding = ({navigation}) => {
  const [currentIndex,setCurrentIndex]=useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;

  //set the current index of each item
  const viewableItemsChanged = useRef(({viewableItems}) =>{
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current

  const sideRef = useRef(null)

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
      <Button name="Get Started"
        size={20}
        weight={600} style={style.button}
        color="#fff"
        onPress={() => navigation.navigate('WelcomeScreen')}/>
      <Paginator data={slides} scrollX={scrollX}/>
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
    marginBottom:75,
    backgroundColor:'#1da43b',
    height:56,
    width:227,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  }
})

export default OnBoarding;
