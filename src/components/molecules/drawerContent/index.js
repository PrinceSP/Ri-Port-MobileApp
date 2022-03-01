import React, {useContext,useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Switch,Image,Platform} from 'react-native'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import Share from 'react-native-share'
import {AvatarProfile,Help,Report,ShareIcon,SignOut,PD,Single} from '../../../assets'
import {AuthContext} from '../../../context/authContext'
import {ThemeContext} from '../../../context/themeContext'

const DrawerContent = (props)=>{
  const {user} = useContext(AuthContext)
  const [darkMode,setDarkMode] = useState(false)
  const {toggleScheme,theme, color, bgColor} = useContext(ThemeContext)

  const style = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:bgColor
    },
    section:{
      paddingTop:33,
      paddingBottom:20,
      paddingLeft:16,
      borderBottomWidth:1,
      borderBottomColor:'#F1DADA'
    },
    image:{
      width:90,
      height:90,
      borderRadius:35
    },
    title:{
      fontFamily:'Lato-Bold',
      color,
      fontSize:20,
      marginTop:14
    },
    desc:{
      fontFamily:'Lato-Regular',
      color,
      fontSize:16
    },
    menu:{
      fontSize:16,
      color
    },
    darkModeStyle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,marginTop:10},
    drawerItemsContainer:{paddingVertical:18,borderBottomWidth:1,borderBottomColor:'#F1DADA'},
  })
  const {container,section,image,title,desc,menu,darkModeStyle,drawerItemsContainer} = style

  const shareBtn = async ()=>{
    const shareOptions = {
       message: 'Find the road around you that damaded or in bad condition, and report it with our application',
       title:'Share Via',
       url:logoToShare
     }

     try {
       const ShareResponse = await Share.open(shareOptions);
       console.log(JSON.stringify(ShareResponse));
     } catch(error) {
       console.log('Error => ', error);
     }
   };
  return(
    <View style={container}>
      <DrawerContentScrollView {...props}>
        <View style={container}>
          <View style={section}>
            {user.profilePicture ?<Image style={image} source={{uri:`data:image/png;base64,${user.profilePicture}`}}/>
             :<View style={[image,{backgroundColor:'#e8e8e8',alignItems:'center',justifyContent:'center'}]}><AvatarProfile height={40} width={40}/></View>}
            <View>
              <Text style={title}>{user?.username}</Text>
              <Text style={desc}>{user?.email}</Text>
            </View>
          </View>
          <View style={drawerItemsContainer}>
            <DrawerItem labelStyle={menu}
              icon={()=><AvatarProfile height={28} width={28}/>}
              label="Profile"
              onPress={()=>{props.navigation.navigate('Profile')}}/>
            <DrawerItem labelStyle={menu}
              icon={()=><Report height={28} width={28}/>}
              label="Your Reports"
              onPress={()=>{props.navigation.navigate('ReportListPage')}}/>
            <View style={darkModeStyle}>
              <Text style={[menu,{fontFamily:'Lato-Bold'}]}>Dark Mode</Text>
              <Switch thumbColor={color=="#fff"?color:"#aaa"} trackColor={{false:'lightblue',true:'grey'}} value={theme} onValueChange={()=>toggleScheme()}/>
            </View>
          </View>
          <View style={[{paddingTop:19}]}>
            <DrawerItem labelStyle={menu}
              icon={()=><ShareIcon height={28} width={28}/>}
              label="Tell a friend"
              onPress={shareBtn}/>
            <DrawerItem labelStyle={menu}
              icon={()=><Help height={28} width={28}/>}
              label="Help and Feedback"
              onPress={()=>{props.navigation.navigate('Feedback')}}/>
            <DrawerItem labelStyle={menu}
              icon={()=><SignOut height={28} width={28}/>}
              label="Sign Out"
              onPress={()=>{}}/>
          </View>
          <View style={{paddingLeft:20,marginTop:20}}>
            <Text style={{color}}>v.1.0</Text>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{marginBottom:15,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
        <Text style={{marginRight:10,color}}>Made By</Text>
        <Image source={PD}/>
      </View>
    </View>
  )
};

export default DrawerContent;
