import React, {useState,useEffect,useContext} from 'react'
import {Text,View,StyleSheet,Dimensions,useWindowDimensions,ActivityIndicator} from 'react-native'
import {Header,Gap,ReportForm,MapFinder,Button,ReportInput,toastConfig} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'
import Toast from 'react-native-toast-message';

const {width,height} = Dimensions.get('window')

const ReportPage = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoInfos,setPhotoInfos] = useState({
    photoBase64:'',
    photo:''
  })
  const [reportInfo,setReportInfo] = useState({})
  const [photoName,setPhotoName] = useState('no photo uploaded')
  const [data,setData] = useState({
    title:'',
    description:''
  })
  const {theme} = useTheme()
  const [isFetching,setIsFetching] = useState(false)

  const getImage=()=>{
    const options={
      maxHeight:200,maxWidth:200,
      saveToPhotos: true,
      includeBase64:true,
    }

    launchImageLibrary(options,res=>{
      const localTime = new Date().getTime();
      const fileName = localTime +'.jpg';
      //handling when user cancel upload the image
      if(res.didCancel){
        //reset the value to its default value
        setHasPhoto(false)
        // setPhotoInfos({photo:''});
        setPhotoInfos({...photoInfos,photoBase64:''});
        setPhotoName('no photo uploaded')
      }else{
        // setPhotoInfos({...photoInfos,photo:res.assets[0].fileName});
        setPhotoInfos({...photoInfos,photoBase64:res.assets[0].base64});
        setHasPhoto(true);
        setPhotoName(fileName)
      }
    })
  }

  const {title,description} = data

  const getGeometrics = (...datas)=>{
    setReportInfo(...datas)
  }

  const submit = async()=>{
    top.value = withSpring(dimensions.height / 1,springConfig)
    try {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId:currentUser[0]._id,
          fullname:currentUser[0]?.fullname,
          userPicture:currentUser[0]?.profilePicture,
          title,
          address:reportInfo.desc,
          phoneNumber:currentUser[0].phoneNumber.number,
          ktpId:currentUser[0].ktpId,
          location:{
            latitude:reportInfo.region.latitude,
            longitude:reportInfo.region.longitude,
          },
          desc:description,
          roadPicture:photoInfos.photoBase64,
          status:'Pending'
        })
      }
      setIsFetching(true)
      const res = currentUser[0].email.verified===true && await fetch(`https://riport-app.herokuapp.com/api/posts/`,options)
      if(res.status === 201){
        setIsFetching(false)
        Toast.show({
          type:'success',
          text1:'Success',
          text2:'Your report has been post'
        })
      }
      setData({...data,title:'',description:''})
      setPhotoInfos({...photoInfos,photoBase64:''})
      setReportInfo({})
      setPhotoName('no photo uploaded')
    } catch (e) {
      setIsFetching(false)
      Toast.show({
        type:'error',
        text1:'Failed',
        text2:'Fill all the form first!'
      })
      setData({...data,title:'',description:''})
      setPhotoInfos({...photoInfos,photoBase64:''})
      setReportInfo({})
      setPhotoName('no photo uploaded')
      return e
    }
    setData({...data,title:'',description:''})
    setPhotoInfos({...photoInfos,photoBase64:''})
    setReportInfo({})
    setPhotoName('no photo uploaded')
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

  // console.log('data from maps:'+JSON.stringify(reportInfo));

  return(
    <>
      <MapFinder getGeometrics={getGeometrics} navigation={navigation}/>
      {isFetching===true && <ActivityIndicator style={{zIndex:1,position:'absolute',top:200,left:"43%",backgroundColor:'#bcbcbc',padding:10,borderRadius:50}} size="large" color="#fff"/>}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[bottomSheet,bottomSheetStyle,{backgroundColor:theme.backgroundColor,shadowColor:theme.color}]}>
          <View style={sheetLine}/>
          <View>
            <ReportInput color={theme.color} label="Title *" defaultValue={title} onChangeText={e=>{
                setData({...data,title:e})
              }}/>
            <Gap height={28}/>
            <ReportInput color={theme.color} label="Description *" defaultValue={description} onChangeText={e=>{
                setData({...data,description:e})
              }}/>
            <Gap height={28}/>
          </View>
          <Gap height={27}/>
          <View style={{width:270}}>
            <Text style={upload}>Upload Road Picture*</Text>
            <View style={{alignItems:'center',flexDirection:'row'}}>
              <Button name="Upload" color={theme.backgroundColor} fam='Poppins-Medium' style={[button,{backgroundColor:theme.color}]} onPress={()=>getImage()}/>
              <Text style={{marginLeft:18,color:theme.color}}>{photoName}</Text>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Button name="REPORT" color='#fff' fam='Poppins-Bold' size={24} style={buttonSubmit} onPress={()=>submit()}/>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Button name="+" style={[toggleBottomSheet,{backgroundColor:'#44f'}]} color="#fff" size={40} onPress={()=>{
        top.value = withSpring(dimensions.height / 25,springConfig)
      }}/>
      <Toast config={toastConfig} position='top' topOffset={0} visibilityTime={3000} autoHide={true}/>
    </>
  )
}

const style=StyleSheet.create({
  container:{ flex: 1},
  text1:{fontSize:20,fontFamily:'Lato-Bold',color:'#565665'},
  formContainer:{paddingHorizontal:20,paddingBottom:150},
  button:{
    marginTop:12,
    height:37,
    width:120,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonSubmit:{
    marginTop:68,
    backgroundColor:'#598EF5',
    height:57,
    width:220,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
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
    paddingHorizontal:10
  },
  sheetLine:{
    width:70,
    borderTopWidth:4,
    borderTopColor:"#777",
    borderRadius:2,
    alignSelf:'center',
    marginVertical:15
  },
  upload:{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17},
  toggleBottomSheet:{position:'absolute',bottom:130,right:20,
    width:55,height:55,borderRadius:50,alignItems:'center',justifyContent:'center',
    elevation:9,
    shadowColor:"#fff"
  }
})

const {container,text1,mapContainer,formContainer,button,buttonSubmit,bottomSheet,sheetLine,upload,toggleBottomSheet} = style


export default ReportPage
