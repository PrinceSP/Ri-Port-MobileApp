import React, {useState,useEffect} from 'react'
import {Text,View} from 'react-native'


const WeatherAPI=()=>{
  const [data,setData] = useState()

  // async function fetchData(){
  //   let res = await fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=London", {
  //   	"method": "GET",
  //   	"headers": {
  //   		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  //   		"x-rapidapi-key": "cd55f51d64msh18564c4288222a4p1e8936jsnc9d604ef618f"
  //   	}
  //   })
  //   .then(response => {
  //   	console.log(response);
  //     setData(response)
  //   })
  //   .catch(err => {
  //   	console.error(err);
  //   });
  // }

  return(
    <View>
      <Text>Weather API call</Text>
    </View>
  )
}

export default WeatherAPI
