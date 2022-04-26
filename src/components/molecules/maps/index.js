import React, {useState,useRef,useEffect} from "react"
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import {CustomMarker,Burger} from '../../../assets'
import {useTheme} from '../../../context/themeContext'
import Geocoder from 'react-native-geocoding';

const dark = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

const defaultStyle = [{
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#8ec3b9"
		}
	]
}]

const MapFinder = ({getGeometrics,navigation})=>{
	const [ region, setRegion ] = useState({
		latitude: 1.4730796311491023,
		longitude: 124.85402639232787,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	})
  const [desc,setDetails] = useState(null)
	const {theme} = useTheme()

  const datas = {region,desc}

  const mapRef = useRef(region)
	const queryRef = useRef(null)

  Geocoder.init("AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",{language : "en"}); // use a valid API key
  Geocoder.from(region)
  		.then(res => {
        const addressComponent = res.results[0].formatted_address;
        const address = addressComponent.split(',').splice(1,5).join(',')
  			setDetails(address);
        // console.log('data from address: '+address);
  		})
  		.catch(error => console.warn(error));

	const goToCurrentRegion=()=>{
		mapRef.current.animateToRegion(region,300)
	}

  const clearing=()=>{
    queryRef.current?.clear()
  }

  useEffect(()=>{
    getGeometrics(datas)
  },[desc])

  useEffect(()=>{
    return ()=> console.log('clean up');
  },[])

  // console.log('data form desc: '+desc);

	return (
		<View style={{flex:1}}>
			<View style={style.mapContainer}>
				<MapView
					ref={map=>mapRef.current=map}
					style={style.map}
					customMapStyle={theme.themeMode==='default'?defaultStyle:dark}
          initialRegion={region}
					provider={PROVIDER_GOOGLE}
					onPress={goToCurrentRegion}
				>
					<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} image={CustomMarker} title="I'm Here"
					description={desc}/>
					<Marker
						coordinate={region}
						draggable={true}
            onDragEnd={(e) => {
              setRegion({
                ...region,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
              getGeometrics(datas)
            }}
						image={CustomMarker}
						title="I'm Here"
						description={desc}
					/>
				</MapView>
			</View>
      <View style={style.placesContainer}>
				<GooglePlacesAutocomplete
          ref={queryRef}
					placeholder={desc?desc:"Search your location here...."}
					returnKeyType={'search'}
					autoFocus={true}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row=>row.description}
					GooglePlacesSearchQuery={{
						rankby: "distance"
					}}
					GooglePlacesDetailsQuery={{
						fields:['formatted_address','geometry']
					}}
					enablePoweredByContainer={false}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						// update the region by its latitude and longitude
						setRegion({...region,
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
						})
            setDetails(data?.description)
						getGeometrics(datas)
            // console.log('data from query: '+data?.description);
					}}
          renderLeftButton={()=><Burger stroke={"#fff"} strokeWidth="4" strokeLinecap="round" onPress={()=>navigation.openDrawer()}/>}
					renderRightButton={() => <TouchableOpacity style={{height:25,width:65,alignItems:'center',justifyContent:'center',borderRadius:5,backgroundColor:theme.backgroundColor==="000"?"#aaa":"#bbb"}} onPress={()=>clearing()}><Text style={{color:theme.color,fontSize:15}}>clear</Text></TouchableOpacity>}
					query={{
						key: "AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",
						language: "en",
						components: "country:id",
						types: "establishment",
						radius: 30000,
						location: `${region.latitude}, ${region.longitude}`
					}}
					textInputProps={{
						placeholderTextColor: '#899',
						InputComp: TextInput,
					}}
					styles={{
						listView:style.listView,
            textInputContainer: {
              alignItems:'center',
              justifyContent:'space-between'
            },
						textInput:{color:'#000',borderRadius:15,height:50,elevation:10,marginHorizontal:10},
						description:{
							fontWeight:'bold',
							zIndex:2,
							color:'#000',
						}
					}}
				/>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	mapContainer:{flex:1},
  map: {
    ...StyleSheet.absoluteFill,
		marginBottom:0
  },
	placesContainer: {width: "95%", zIndex: 1,position:'absolute',top:20,left:"3%"},
	listView:{minHeight:50,color:'#000'}
})

export default MapFinder
