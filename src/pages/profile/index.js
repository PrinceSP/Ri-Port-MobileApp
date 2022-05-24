import React, {useState,useContext} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,useWindowDimensions,PermissionsAndroid,ActivityIndicator} from 'react-native'
import {Button,BioHolder,Gap,Header,ImagePicker,toastConfig} from '../../components'
import {launchImageLibrary,launchCamera} from 'react-native-image-picker'
import {DateIcon,Address,Phone,AvatarProfile,ID,MainLogo,Mail} from '../../assets'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'
import Toast from 'react-native-toast-message';
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'

const Profile = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const {theme} = useTheme()
  const [photo,setPhoto] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoBase64,setPhotoBase64] = useState('')
  const [isFetching,setIsFetching] = useState(false)

  const imageGallery = ()=>{
    const options={
      maxHeight:400,
      maxWidth:400,
      includeBase64:true,
    }
    launchImageLibrary(options,res=>{
      if(res.didCancel){
        setHasPhoto(false)
        setPhoto('');
        setPhotoBase64('');
      }else{
        setPhoto(res.assets[0].uri);
        setPhotoBase64(res.assets[0].base64);
        setHasPhoto(true);
        const option = {
          method: 'put',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({userId:currentUser[0]._id,profilePicture:res.assets[0].base64})
        }
        fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,option)
        .then(res=>{
          Toast.show({
            type:'success',
            text1:'Success',
            text2:'Profile picture has been updated!'
          })
        }).catch(e=>{
          Toast.show({
            type:'error',
            text1:'Error',
            text2:"Cannot update profile picture!"
          })
        })
      }
    })
  }

  const fromCamera = async() => {
    const options = {
      includeBase64:true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "RiPort App Camera Permission",
          message:
            "RiPort App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        launchCamera(options, (res) => {
          if (res.didCancel) {
            setHasPhoto(false)
            setPhoto('');
            setPhotoBase64('');
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else {
            setPhoto(res.assets[0].uri);
            setPhotoBase64(res.assets[0].base64);
            setHasPhoto(true);
            const option = {
              method: 'put',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({userId:currentUser[0]._id,profilePicture:res.assets[0].base64})
            }
            setIsFetching(true)
            fetch(`https://riport-app.herokuapp.com/api/users/${currentUser[0]._id}`,option)
            .then(res=>{
              setIsFetching(false)
              Toast.show({
                type:'success',
                text1:'Success',
                text2:'Profile picture has been updated!'
              })
            }).catch(e=>{
              Toast.show({
                type:'error',
                text1:'Error',
                text2:"Cannot update profile picture!"
              })
              setIsFetching(false)
            })
            .finally(()=>{
              setIsFetching(false)
            })
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const dimensions = useWindowDimensions()
  const springConfig ={
    damping:80,
    overshootClamping:true,
    restDisplacementThreshold:0.1,
    stiffness:500
  }

  const top = useSharedValue(dimensions.height)

  const bottomSheetStyle = useAnimatedStyle(()=>{
    return{
      top:withSpring(top.value,springConfig)
    }
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context){
      context.startTop = top.value
    },
    onActive(event,context){
      top.value = context.startTop + event.translationY
    },
    onEnd(){
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height
      } else{
        top.value = dimensions.height
      }
    }
  })

  const closeBottomSheet = ()=>{
    top.value = withSpring(dimensions.height/1,springConfig)
  }

  let emails = currentUser[0].email.mail > 15 ?  currentUser[0].email.mail : currentUser[0].email.mail.substring(0,15)
  emails = emails + `...`

  return(
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <Gap height={15}/>
      <Header name='Profile' action='< back' nav={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
      <Toast config={toastConfig} position="top" topOffset={0} visibilityTime={2000}/>
      <View style={{flex:0.96,alignItems:'center',justifyContent:'flex-end'}}>
        <View style={styles.imageContainer}>
          {photo ? <Image source={{uri:`data:image/png;base64,${photoBase64}`}} style={styles.imageHolder}/>
        : currentUser[0]?.profilePicture ? <Image source={{uri:`data:image/png;base64,${currentUser[0].profilePicture}`}} style={styles.imageHolder}/>
            : <View style={styles.imageHolder}/>}
        </View>
        <ImagePicker onPress={()=>{
          top.value = withSpring(dimensions.height / 2,springConfig)
        }}/>
        <Gap height={20}/>
        <Text style={{color:theme.color,backgroundColor:theme.backgroundColor,fontSize:28,fontFamily:'Poppins-Bold'}}>{currentUser[0].username}</Text>
        <Text style={{color:"#999",backgroundColor:theme.backgroundColor,fontSize:16,fontFamily:'Poppins-Regular'}}>{currentUser[0].email.mail}</Text>
        <Gap height={20}/>
        <BioHolder icon={<Address height={22}/>}
          labelInfo='Personal Informations'
          userInfo="Your Biodata"
          color={theme.color}
          backgroundColor="#66bb8a"
          onPress={()=>navigation.navigate('EditProfile')}/>
        <BioHolder icon={<Mail height={22}/>}
          labelInfo='Email Address'
          userInfo={emails}
          color={theme.color}
          backgroundColor="#fc99ad"
          onPress={()=>navigation.navigate('EditEmail')}/>
        <BioHolder icon={<DateIcon height={22}/>}
          userInfo={currentUser[0].dateOfBirth}
          labelInfo='Date of Birth'
          color={theme.color}
          backgroundColor="#f44"
          onPress={()=>navigation.navigate('EditBornDate')}/>
        <BioHolder icon={<Phone height={20}/>}
          labelInfo="Phone Number"
          userInfo={`+62${currentUser[0].phoneNumber.number}`}
          color={theme.color}
          backgroundColor="#ffa500"
          onPress={()=>navigation.navigate('EditPhone')}/>
        <BioHolder icon={<ID height={18}/>}
          userInfo="provide strong password"
          labelInfo='Change password'
          color={theme.color}
          backgroundColor="#009"
          onPress={()=>navigation.navigate('EditPassword')}/>
        {isFetching===true&&<ActivityIndicator style={{zIndex:1,position:'absolute',top:200,backgroundColor:'#bcbcbc',padding:10,borderRadius:50}} size="large" color="#fff"/>}
      </View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheet,bottomSheetStyle,{backgroundColor:theme.backgroundColor,shadowColor:theme.color}]}>
          <View style={styles.sheetLine}/>
          <Text style={[styles.panelTitle,{color:theme.color}]}>Upload Photo</Text>
          <Text style={[styles.panelSubtitle,{color:theme.color==="#000"?"#888":"#aaa"}]}>Choose Your Profile Photo</Text>
          <Gap height={20}/>
          <Button name="Take a photo" color={theme.color==="#000"?"#fff":"#fff"} size={18} fam='Poppins-SemiBold' onPress={()=>fromCamera()} style={[styles.button,{backgroundColor:theme.backgroundColor==='#000'?'#ED6262':'#f73b3b'}]}/>
          <Button name="Choose from gallery" color={theme.color==="#000"?"#fff":"#fff"} size={18} fam='Poppins-SemiBold' onPress={()=>imageGallery()} style={[styles.button,{backgroundColor:theme.backgroundColor==='#000'?'#ED6262':'#f73b3b'}]}/>
          <Button name="Cancel" color={theme.color==="#000"?"#fff":"#fff"} size={18} fam='Poppins-SemiBold' style={[styles.button,{backgroundColor:theme.backgroundColor==='#000'?'#ED6262':'#f73b3b'}]} onPress={closeBottomSheet}/>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer:{borderStyle:'dashed',borderWidth:2,borderColor:'#8CC4F8',borderRadius:75,height:Dimensions.get('window').height/5.7,width:Dimensions.get('window').width/3,alignItems:'center',justifyContent:'center'},
  imageHolder:{height:Dimensions.get('window').height/6.65,width:Dimensions.get('window').width/3.6,backgroundColor:'#eee',borderRadius:50,resizeMode: 'cover'},
  sheetLine:{width:70,borderTopWidth:4,borderTopColor:"#777",borderRadius:2,alignSelf:'center',marginVertical:15},
  bottomSheet:{
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    zIndex:99,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius:3.84,
    elevation:10,
    paddingHorizontal:10,
    alignItems:'center'
  },
  panelTitle:{fontFamily:"Poppins-SemiBold",fontSize:25},
  panelSubtitle:{fontFamily:"Poppins-Regular"},
  button:{
    marginBottom:15,
    // backgroundColor:'#f73b3b',
    // backgroundColor:'#ED6262',
    height:60,width:329,borderRadius:14,alignItems:'center',
    justifyContent:'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: "#88aaff",
        shadowOpacity: 1,
        shadowRadius:5,
      },
      android:{
        elevation: 4,
      },
    })
  },
})

export default Profile
