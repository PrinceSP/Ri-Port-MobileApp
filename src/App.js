import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'

const App = () => {

  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );

}
export default App;
