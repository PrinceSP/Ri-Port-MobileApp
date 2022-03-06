import React from 'react'
import {useTheme} from '../../../context/themeContext'

const ThemeWrapper = ({children})=>{
  const {isLoading} = useTheme()
  if (isLoading) return null
  return children
}

export default ThemeWrapper
