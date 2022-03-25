import React, {useContext} from 'react'
import {Text,View,StyleSheet,ScrollView,Switch,Image,Platform} from 'react-native'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import Share from 'react-native-share'
import {AvatarProfile,Help,Report,ShareIcon,SignOut} from '../../../assets'
import {AuthContext} from '../../../context/authContext'
import {useTheme} from '../../../context/themeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DrawerContent = (props)=>{
  const {user} = useContext(AuthContext)
  const {theme,updateTheme,mode} = useTheme()

  const style = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:theme.backgroundColor
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
      color:theme.color,
      fontSize:20,
      marginTop:14
    },
    desc:{
      fontFamily:'Lato-Regular',
      color:theme.color,
      fontSize:16
    },
    menu:{
      fontSize:16,
      color:theme.color
    },
    darkModeStyle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,marginTop:10},
    drawerItemsContainer:{paddingVertical:18,borderBottomWidth:1,borderBottomColor:'#F1DADA'},
  })
  const {container,section,image,title,desc,menu,darkModeStyle,drawerItemsContainer} = style

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

   const signOut=async()=> {
     try {
       props.navigation.navigate('Login')
       await AsyncStorage.clear()
     } catch (e) {
       console.log(e);
     }
   }
   const changeTheme = ()=>updateTheme(theme.themeMode)
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
              <Switch thumbColor={theme.color=="#fff"?"#f5dd4b":"#aaa"} trackColor={{false:'#d4d3d4',true:'#81b0ff'}} value={mode} onValueChange={changeTheme}/>
            </View>
          </View>
          <View style={[{paddingTop:19}]}>
            <DrawerItem labelStyle={menu}
              icon={()=><ShareIcon height={26} width={26}/>}
              label="Tell a friend"
              onPress={shareBtn}/>
            <DrawerItem labelStyle={menu}
              icon={()=><Help height={28} width={28}/>}
              label="Help and Feedback"
              onPress={()=>{props.navigation.navigate('Feedback')}}/>
            <DrawerItem labelStyle={menu}
              icon={()=><SignOut height={28} width={28}/>}
              label="Sign Out"
              onPress={signOut}/>
          </View>
          <View style={{paddingLeft:20,marginTop:20}}>
            <Text style={{color:theme.color}}>v.1.0</Text>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{marginBottom:15,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
        <Text style={{color:theme.color,fontFamily:'Poppins-Bold',fontSize:16}}>RiPort</Text>
      </View>
    </View>
  )
};

export default DrawerContent;
