import React, {useState} from "react"
import {StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

const MapFinder = ()=>{

	const [ region, setRegion ] = useState({
		latitude: 1.4730796311491023,
		longitude: 124.85402639232787,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	return (
		<View>
			<Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Location*</Text>
			<View style={style.placesContainer}>
				<GooglePlacesAutocomplete
					placeholder="Search your location here...."
					returnKeyType={'search'}
					autoFocus={false}
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
						console.log(data.description,details.geometry.location)
						// update the region by its latitude and longitude
						setRegion({
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						})
					}}
					query={{
						key: "AIzaSyB-lpOPCdsdF7SluzBjETaOIfT-ZDgX2ZA",
						language: "en",
						components: "country:id",
						types: "establishment",
						radius: 30000,
						location: `${region.latitude}, ${region.longitude}`
					}}
					styles={{
						listView:style.textInput,
						textInput:{color:'#000'},
						TextInputContainer:{
							width:'100%',
						},
						description:{
							fontWeight:'bold',
							zIndex:1,
							color:'#000'
						}
					}}
				/>
			</View>
			<View style={style.mapContainer}>
				<MapView
					style={style.map}
					initialRegion={{
						latitude: 1.4730796311491023,
						longitude: 124.85402639232787,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
					provider="google"
				>
					<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
					<Marker
						coordinate={region}
						pinColor="#fff"
						draggable={true}
						onDragEnd={(e) => {
							setRegion({
								latitude: e.nativeEvent.coordinate.latitude,
								longitude: e.nativeEvent.coordinate.longitude
							})
						}}
					>
						<Callout>
							<Text>I'm here</Text>
						</Callout>
					</Marker>
					<Circle center={region} radius={1000} />
				</MapView>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	mapContainer:{minHeight:400,width:350,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#8ACEEC'},
  map: {
    ...StyleSheet.absoluteFill
  },
	placesContainer: { flex: 0,borderWidth:1,borderColor:'#8ACEEC',width: "100%", zIndex: 1,marginVertical:10},
	textInput:{backgroundColor: "#eee",minHeight:50,marginVertical:5,color:'#000'}
})

export default MapFinder
