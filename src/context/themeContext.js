import React, {createContext,useState} from 'react'
export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {

  const [theme,setTheme] = useState(false)
  const [color,setColor] = useState('#000')
  const [bgColor,setBgColor] = useState('#fff')

  const toggleScheme = ()=>{
    if(theme){
      setTheme(false)
      setBgColor('#fff')
      setColor('#000')
      // console.log(toggle._j);
    } else if(toggle=="false"){
      setTheme(true)
      setBgColor('#121212')
      setColor('#fff')
      // console.log(toggle._j);
    } else{
      return theme
    }
  }
  return (
    <ThemeContext.Provider value={{theme, toggleScheme, color, bgColor}}>
      {children}
    </ThemeContext.Provider>
  )
}
