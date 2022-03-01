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

  // const logoToShare='data:image/png;base64,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'
  const logoToShare ="https://github.com/PrinceSP"

  const shareBtn = async ()=>{
    const shareOptions = {
       message: `Find the road around you that damaded or in bad condition and report it with our application`,
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
