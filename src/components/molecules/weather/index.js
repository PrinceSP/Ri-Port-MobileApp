import React, {useState,useEffect} from 'react'
import {Text,View} from 'react-native'


const WeatherAPI=()=>{
  const [data,setData] = useState()
  const [desc,setDesc] = useState('')

  useEffect(()=>{
    apiHolder()
  },[])

  function apiCall(url,res,rej){
    let datas = new XMLHttpRequest()
    datas.onreadystatechange = function (){
      if (datas.readyState === 4) {
        if (datas.status === 200) {
          res(datas.response)
        }else{
          rej()
        }
      }
    }
    datas.open('get',url)
    datas.send()
  }

  function apiHolder(){
    const apiKey = `8f5a73fd3b0e7a36a6127887c4ee73be`
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=madrid&appid=${apiKey}`

    apiCall(apiUrl,results=>{
      const datas = JSON.parse(results)
      const icon = `http://openweathermap.org/img/wn/${datas.weather[0].icon}.png`
      setData(datas)
      setDesc(datas.weather[0].main)
      console.log(desc);
    },()=>{
      console.log('error');
    })
  }

  return(
    <View>
      <Text>Weather API call</Text>
    </View>
  )
}

export default WeatherAPI
