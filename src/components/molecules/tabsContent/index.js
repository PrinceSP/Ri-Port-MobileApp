import React, {useState} from 'react'
import {View,Text,Dimensions,StyleSheet} from 'react-native'
import {Tab} from '../../atoms'
import {useTheme} from '../../../context/themeContext'

const TabsContent = ({state,navigation})=>{
  const [selected,setSelected] = useState('Home')
  const {theme} = useTheme()
  const {routes} = state
  const current = (currentTab) => {return (currentTab===selected ? theme.color:'none')}

  const handleChange = (active)=>{
    setSelected(active)
    navigation.navigate(active)
  }

  return(
      <View style={[style.container,{backgroundColor:theme.backgroundColor}]}>
        {
          routes.map(route=>{
            return(
              <Tab tab={route}
                key={route.key}
                color={current(route.name)}
                onPress={()=>handleChange(route.name)}/>
            )
          })
        }
      </View>
  )
}

const style = StyleSheet.create({
  container:{
    height:60,
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    alignItems:'center',
    justifyContent:'space-around',
    flexDirection:'row',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius:20,
    elevation: 16,
  }
})

export default TabsContent
