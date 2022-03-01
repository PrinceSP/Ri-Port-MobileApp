import React, {createContext,useState} from 'react'

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
  const [theme,setTheme] = useState(false)
  const [color,setColor] = useState('#000')
  const [bgColor,setBgColor] = useState('#fff')

  const toggleScheme = ()=>{
    if(theme===true){
      setTheme(false)
      setBgColor('#fff')
      setColor('#000')
    } else{
      setTheme(true)
      setBgColor('#444')
      setColor('#fff')
    }
  }
  return (
    <ThemeContext.Provider value={{theme, toggleScheme, color, bgColor}}>
      {children}
    </ThemeContext.Provider>
  )
}
