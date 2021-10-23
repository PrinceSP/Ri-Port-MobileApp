import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {OnBoarding} from './components'

const App = () => {

  return (
    <OnBoarding/>
  );
};

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems:'center',
    justifyContent:'center'
  }
})

export default App;
