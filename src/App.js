import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'
import {AuthContextProvider} from './context/authContext'
import {ThemeContextProvider} from './context/themeContext'

const App = () => {

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </ThemeContextProvider>
    </AuthContextProvider>
  );

}
export default App;
