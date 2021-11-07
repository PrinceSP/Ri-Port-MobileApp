import React, {useState} from "react"
import {StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

const MapFinder = ()=>{
	const [ pin, setPin ] = useState({
		latitude: 1.4730796311491023,
		longitude: 124.85402639232787
	})

	const [ region, setRegion ] = useState({
		latitude: 1.4730796311491023,
		longitude: 124.85402639232787,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	return (
		<View>
			<Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Location*</Text>
			<GooglePlacesAutocomplete
				placeholder="Search your location here...."
				autoFillOnNotFound={true}
				autoFocus={false}
				returnKeyType={'default'}
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "AIzaSyDt7xuHsiC7oXDe5yRvfdJahz4FG4K1Ma4",
					language: "en",
					components: "country:id",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0,borderWidth:1,borderColor:'#8ACEEC',width: "100%", zIndex: 1,marginVertical:10},
					listView: { backgroundColor: "#fff" }
				}}
			/>
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
						coordinate={pin}
						pinColor="black"
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
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	mapContainer:{height:400,width:350,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
  map: {
    ...StyleSheet.absoluteFill
  },
})

export default MapFinder
