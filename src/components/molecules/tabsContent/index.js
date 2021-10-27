import React, {useState} from 'react'
import {View,Text,Dimensions,StyleSheet} from 'react-native'
import {Tab} from '../../atoms'

//get the screen dimensions
const {width} = Dimensions.get('screen')

const TabsContent = ({state,navigation})=>{
  const [selected,setSelected] = useState('Home')
  const {routes} = state
  const current = (currentTab) => {return (currentTab===selected ? '#F24E1E':'#fff')}

  const handleChange = (active)=>{
    setSelected(active)
    navigation.navigate(active)
  }

  return(
      <View style={style.container}>
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
    minHeight:90,
    position:'absolute',
    width,
    elevation:0,
    bottom:25,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'space-around',
    flexDirection:'row'
  }
})

export default TabsContent
