import React, {useState,useEffect,useContext} from 'react'
import {Text,View,StyleSheet,Dimensions} from 'react-native'
import {Header,Gap,ReportForm,MapFinder,Button,ReportInput} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import {AuthContext} from '../../context/authContext'
import {useTheme} from '../../context/themeContext'
import {Gesture,GestureDetector} from 'react-native-gesture-handler'
import Animated, {useSharedValue,useAnimatedStyle} from 'react-native-reanimated'

const {height:screenHeight} = Dimensions.get('window')

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

  const translateY = useSharedValue(0)
  const gesture = Gesture.Pan().onUpdate((event)=>{
    translateY.value=event.translationY
  })
  const bottomSheetStyle = useAnimatedStyle(()=>{
    return{
      transform:[{translateY: translateY.value}]
    }
  })

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

  return(
    // <View style={[container,{backgroundColor:theme.backgroundColor}]}>
    //   <Gap height={15}/>
    //   <Header name="report" button={true} navigation={navigation} color={theme.color} bgColor={theme.backgroundColor}/>
    //   <Gap height={20}/>
    //   <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={style.formContainer}>
    //     <Text style={text1}>Make Your Report</Text>
    //     <Gap height={33}/>
    //     <MapFinder getGeometrics={getGeometrics}/>
    //     <Gap height={28}/>
    //     <View>
    //       <ReportInput color={theme.color} label="Fullname *" defaultValue={fname} onChangeText={e=>{
    //           setData({...data,fname:e})
    //         }}/>
    //       <Gap height={28}/>
    //       <ReportInput color={theme.color} label="Phone Number *" defaultValue={phone} onChangeText={e=>{
    //           setData({...data,phone:e})
    //         }}/>
    //       <Gap height={28}/>
    //       <ReportInput color={theme.color} label="ID Card *" defaultValue={idCard} onChangeText={e=>{
    //           setData({...data,idCard:e})
    //         }}/>
    //       <Gap height={28}/>
    //     </View>
    //     <Gap height={27}/>
    //     <View style={{width:270}}>
    //       <Text style={{color:'#8ACEEC',fontFamily:'Poppins-Medium',fontSize:17}}>Upload Road Picture*</Text>
    //       <View style={{alignItems:'center',flexDirection:'row'}}>
    //         <Button name="Upload" color={theme.backgroundColor} fam='Poppins-Medium' style={[button,{backgroundColor:theme.color}]} onPress={()=>getImage()}/>
    //         <Text style={{marginLeft:18,color:theme.color}}>{photoName}</Text>
    //       </View>
    //     </View>
    //     <View style={{alignItems:'center'}}>
    //       <Button name="Submit Report" color='#fff' fam='Poppins-Bold' size={24} style={buttonSubmit} onPress={()=>submit()}/>
    //     </View>
    //   </ScrollView>
    // </View>
      <>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[style.bottomSheet,bottomSheetStyle]}>
            <View style={style.line}/>
          </Animated.View>
        </GestureDetector>
        <MapFinder getGeometrics={getGeometrics} navigation={navigation}/>
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
    height:67,
    width:340,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center'
  },
  bottomSheet:{
    height: screenHeight,
    width:'100%',
    position: 'absolute',
    top: screenHeight / 1.5,
    backgroundColor:'#fff',
    borderRadius:25
  },
  line:{
    width:70,
    height:4,
    backgroundColor:'#999',
    alignSelf:'center',
    marginVertical:15,
    borderRadius:2
  }
})

const {container,text1,mapContainer,formContainer,button,buttonSubmit,bottomSheet,line} = style


export default ReportPage
