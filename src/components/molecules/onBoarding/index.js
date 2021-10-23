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

const OnBoarding = () => {
  const [currentIIndex,setCurrentIndex]=useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;

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
    </View>
  );
};

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"linear-gradient(180deg, #BBFF64 -25.56%, rgba(192, 206, 173, 0) 100%), #FFFFFF;",
    alignItems:'center',
    justifyContent:'center'
  }
})

export default OnBoarding;
