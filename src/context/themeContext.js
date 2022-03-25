import React, {createContext,useContext,useState,useEffect} from 'react'
import {defaultTheme,darkTheme} from '../config/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
  const [theme,setTheme] = useState(defaultTheme)
  const [isLoading,setIsLoading] = useState(true)
  const [mode,setMode] = useState(false)

  const getTheme = async()=>{
    const themeMode = await AsyncStorage.getItem("themeMode")
    console.log(themeMode);
    if (themeMode!==null) {
      themeMode === 'default' ? (setTheme(defaultTheme), setMode(false)) : (setTheme(darkTheme),setMode(true))
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    getTheme()
  },[])

  const updateTheme= currentThemeMode=>{
    const newTheme = currentThemeMode === "default" ? darkTheme : defaultTheme
    // if (newTheme.themeMode === "dark") {
    //   setMode(true)
    // } else{
    //   setMode(false)
    // }
    newTheme.themeMode ==="default" ? setMode(false) : setMode(true)
    setTheme(newTheme)
    AsyncStorage.setItem("themeMode",newTheme.themeMode)
  }

  return (
    <ThemeContext.Provider value={{theme,isLoading,mode,updateTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = ()=> useContext(ThemeContext)
