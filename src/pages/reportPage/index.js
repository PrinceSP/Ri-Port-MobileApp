import React, {useState,useEffect,useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Dimensions,useWindowDimensions} from 'react-native'
import {Header,Gap,ReportForm,MapFinder,Button,ReportInput} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler,useAnimatedStyle,useSharedValue,withSpring} from 'react-native-reanimated'

const {width,height} = Dimensions.get('window')

const ReportPage = ({navigation})=>{
  const {user:currentUser} = useContext(AuthContext)
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoInfos,setPhotoInfos] = useState({
    photoBase64:'',
    photo:''
  })
  const [photoName,setPhotoName] = useState('no photo uploaded')
  const [data,setData] = useState({
    fname:currentUser.username,
    address:currentUser.address,
    phone:currentUser.phoneNumber,
    idCard:currentUser.ktpId,
  })
  const [reportInfo,setReportInfo] = useState({})
  const {theme} = useTheme()

  const getImage=()=>{
    const options={
      maxHeight:160,maxWidth:160,
      saveToPhotos: true
    }

    launchImageLibrary(options,res=>{
      const localTime = new Date().getTime();
      const fileName = localTime +'.jpg';
      //handling when user cancel upload the image
      if(res.didCancel){
        //reset the value to its default value
        setHasPhoto(false)
        setPhotoInfos({photo:''});
        // setPhotoInfos({photoBase64:''});
        setPhotoName('no photo uploaded')
      }else{
        setPhotoInfos({...photoInfos,photo:res.assets[0].fileName});
        // setPhotoInfos({...photoInfos,photoBase64:res.assets[0].base64});
        setHasPhoto(true);
        setPhotoName(fileName)
      }
    })
  }

  const {fname,address,idCard,phone} = data

  const getGeometrics = (datas)=>{
    setReportInfo(datas)
  }

  const submit = ()=>{
    //merge all the datas from these states
    //submit all the datas from form
    const allDatas = {...data,...reportInfo,...photoInfos};
    setData({...data,fname:'',address:'',phone:'',idCard:''})
    setPhotoInfos({...photoInfos,photoBase64:'',photo:''})
    setReportInfo({})
    setPhotoName('no photo uploaded')
    console.log(allDatas);

    return allDatas
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


  return(
    <>
      <Button name="Make Report" onPress={()=>{
        top.value = withSpring(dimensions.height/25,springConfig)
      }}/>
      <MapFinder getGeometrics={getGeometrics} navigation={navigation}/>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[bottomSheet,bottomSheetStyle,{backgroundColor:theme.backgroundColor,shadowColor:theme.color}]}>
          <View style={sheetLine}/>
          <View>
            <ReportInput color={theme.bgColor} label="Fullname *" defaultValue={fname} onChangeText={e=>{
                setData({...data,fname:e})
              }}/>
            <Gap height={28}/>
            <ReportInput color={theme.bgColor} label="Phone Number *" defaultValue={phone} onChangeText={e=>{
                setData({...data,phone:e})
              }}/>
            <Gap height={28}/>
            <ReportInput color={theme.bgColor} label="ID Card *" defaultValue={idCard} onChangeText={e=>{
                setData({...data,idCard:e})
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
    width:88,
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
  upload:{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}
})

const {container,text1,mapContainer,formContainer,button,buttonSubmit,bottomSheet,sheetLine,upload} = style


export default ReportPage
