import React, {useState} from 'react'
import {View,Text,Dimensions,StyleSheet} from 'react-native'
import {Tab} from '../../atoms'

//get the screen dimensions
const {width} = Dimensions.get('screen')

const TabsContent = ({state,navigation})=>{
  const [selected,setSelected] = useState('Home')
  const {routes} = state
  const current = (currentTab) => {return (currentTab===selected ? '#fff':'none')}

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
    height:60,
    position:'absolute',
    // width,
    elevation:0,
    bottom:15,
    // borderTopRightRadius:15,
    // borderTopLeftRadius:15,
    left:10,
    right:10,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor:'#0C4274',
  }
})

export default TabsContent
