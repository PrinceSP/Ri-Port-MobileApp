import React, {createContext,useContext,useState} from 'react'

const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {

  const [theme,setTheme] = useState(false)
  const [color,setColor] = useState('#000')
  const [bgColor,setBgColor] = useState('#fff')

  const toggleScheme = ()=>{
    if(theme){
      setTheme(false)
      setBgColor('#fff')
      setColor('#000')
    }else{
      setTheme(true)
      setBgColor('#121212')
      setColor('#fff')
    }
  }
  return (
    <ThemeContext.Provider value={{theme, toggleScheme, color, bgColor}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = ()=> useContext(ThemeContext)
