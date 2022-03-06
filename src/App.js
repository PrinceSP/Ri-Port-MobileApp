import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'
import {AuthContextProvider} from './context/authContext'
import {ThemeContextProvider} from './context/themeContext'
import {ThemeWrapper} from './components'

const App = () => {

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <ThemeWrapper>
          <NavigationContainer>
            <Routes/>
          </NavigationContainer>
        </ThemeWrapper>
      </ThemeContextProvider>
    </AuthContextProvider>
  );

}
export default App;
