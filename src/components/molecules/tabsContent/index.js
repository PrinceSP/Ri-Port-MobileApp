import React, {useState} from 'react'
import {View,Text,Dimensions,StyleSheet} from 'react-native'
import {Tab} from '../../atoms'

//get the screen dimensions
const {width} = Dimensions.get('screen')

const TabsContent = ({state,navigation})=>{
  const [selected,setSelected] = useState('Home')
  const {routes} = state
  const current = (currentTab) => {return (currentTab===selected ? '#000':'none')}

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
    height:65,
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    // width,
    alignItems:'center',
    justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor:'#fff',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius:20,
    elevation: 10,
  }
})

export default TabsContent
