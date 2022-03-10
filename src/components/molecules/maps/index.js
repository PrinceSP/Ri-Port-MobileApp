import React, {useState} from "react"
import {StyleSheet, Text, View, Image, TextInput } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE, animateToRegion } from "react-native-maps"
import {CustomMarker} from '../../../assets'

const MapFinder = ({getGeometrics})=>{

	const [ region, setRegion ] = useState({
		latitude: 1.4730796311491023,
		longitude: 124.85402639232787,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
		detail:null
	})
	const [mapRef,setMapRef] = useState(null)

	const locationChange=()=>{
		mapRef.animateToRegion(region)
	}

	return (
		<View style={{flex:1}}>
			{/**<Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Location*</Text>**/}
			<View style={style.placesContainer}>
				<GooglePlacesAutocomplete
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
						textInput:{color:'#000',borderRadius:25,height:50,elevation:10},
						description:{
							fontWeight:'bold',
							zIndex:2,
							color:'#000',
							borderRadius:50
						}
					}}
				/>
			</View>
			<View style={style.mapContainer}>
				<MapView
					ref={(map)=>setMapRef(map)}
					style={style.map}
					initialRegion={region}
					showCompass={true}
					showMyUserLocation={true}
					showMyLocationButton={true}
					provider={PROVIDER_GOOGLE}
					onPress={locationChange}
				>
					<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} image={CustomMarker} title="I'm Here"
					description={region?.detail}/>
					<Marker
						coordinate={region}
						draggable={true}
						onDragEnd={(e) => {
							console.log(e);
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
					{/**<Circle center={region} radius={1000} />**/}
				</MapView>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	mapContainer:{flex:1},
	// minHeight:400,width:350,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#8ACEEC'
  map: {
    ...StyleSheet.absoluteFill
  },
	placesContainer: {width: "85%", zIndex: 1,position:'absolute',top:20,left:"7%"},
	listView:{minHeight:50,marginVertical:5,color:'#000'}
})

export default MapFinder
