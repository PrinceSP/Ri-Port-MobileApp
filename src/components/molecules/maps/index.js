import React, {useState,useRef} from "react"
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE, animateToRegion } from "react-native-maps"
import {CustomMarker,Burger} from '../../../assets'

const MapFinder = ({getGeometrics,navigation})=>{
	const [ region, setRegion ] = useState({
		latitude: 1.4730796311491023,
		longitude: 124.85402639232787,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
		detail:null
	})

	let mapRef = useRef(region)

	const locationChange=()=>{
		mapRef.current.animateToRegion(region,300)
	}

	const clearing=()=>{
		mapRef.current?.clear()
	}

	return (
		<View style={{flex:1}}>
			<View style={style.placesContainer}>
				<GooglePlacesAutocomplete
					ref={mapRef}
					placeholder={region.detail?region.detail:"Search your location here...."}
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
							detail:data.description
						})
						getGeometrics(region)
					}}
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
						textInput:{color:'#000',borderRadius:15,height:50,elevation:10},
						description:{
							fontWeight:'bold',
							zIndex:2,
							color:'#000',
						}
					}}
					renderLeftButton={()=><Burger stroke={"#fff"} strokeWidth="4" strokeLinecap="round" onPress={()=>navigation.openDrawer()}/>}
					renderRightButton={() => <TouchableOpacity style={{height:20,width:20,alignItems:'center',justifyContent:'center',borderRadius:20,background:"#aaa",position:'absolute'}} onPress={()=>clearing()}><Text style={{color:'#000'}}>X</Text></TouchableOpacity>}
				/>
			</View>
			<View style={style.mapContainer}>
				<MapView
					ref={(map)=>mapRef.current=map}
					style={style.map}
					initialRegion={region}
					provider={PROVIDER_GOOGLE}
					onPress={locationChange}
				>
					<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} image={CustomMarker} title="I'm Here"
					description={region?.detail}/>
					<Marker
						coordinate={region}
						draggable={true}
						onDragEnd={(e) => {
							setRegion({
								...region,
								latitude: e.nativeEvent.coordinate.latitude,
								longitude: e.nativeEvent.coordinate.longitude,
							})
							getGeometrics(region)
						}}
						image={CustomMarker}
						title="I'm Here"
						description={region?.detail}
					/>
				</MapView>
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
	placesContainer: {width: "85%", zIndex: 1,position:'absolute',top:20,left:"7%"},
	listView:{minHeight:50,color:'#000'}
})

export default MapFinder
