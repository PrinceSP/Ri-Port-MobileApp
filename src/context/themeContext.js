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
    if (themeMode!==null) {
      themeMode === 'default' ? setTheme(defaultTheme) : setTheme(darkTheme)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    getTheme()
  },[])

  const updateTheme= currentThemeMode=>{
    const newTheme = currentThemeMode === "default" ? darkTheme : defaultTheme
    if (newTheme.themeMode==="default") {
      setMode(false)
    } else{
      setMode(true)
    }
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
