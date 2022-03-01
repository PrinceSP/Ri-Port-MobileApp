import React, {useContext,useState} from 'react'
import {Text,View,StyleSheet,ScrollView,Switch,Image,Platform} from 'react-native'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import Share from 'react-native-share'
import {AvatarProfile,Help,Report,ShareIcon,SignOut,PD,Single} from '../../../assets'
import {AuthContext} from '../../../context/authContext'

const style = StyleSheet.create({
  container:{
    flex:1
  },
  section:{
    paddingTop:33,
    paddingBottom:38,
    paddingLeft:16,
    borderBottomWidth:1,
    borderBottomColor:'#F1DADA'
  },
  image:{
    width:90,
    height:90,
    borderRadius:40
  },
  title:{
    fontFamily:'Lato-Bold',
    color:'#000',
    fontSize:20,
    marginTop:14
  },
  desc:{
    fontFamily:'Lato-Regular',
    color:'#000',
    fontSize:16
  },
  menu:{
    fontSize:16,
    color:'#000'
  },
  darkModeStyle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20}

})

const {container,section,image,title,desc,menu,darkModeStyle} = style

const DrawerContent = (props)=>{
  const {user} = useContext(AuthContext)
  const [darkMode,setDarkMode] = useState(false)

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
            <Image style={image} source={{uri:`data:image/png;base64,${user.profilePicture}`}}/>
            <View>
              <Text style={title}>{user?.username}</Text>
              <Text style={desc}>{user.email}</Text>
            </View>
          </View>
          <View style={{paddingVertical:18,borderBottomWidth:1,borderBottomColor:'#F1DADA'}}>
            <DrawerItem labelStyle={menu}
              icon={()=><AvatarProfile height={28} width={28}/>}
              label="Profile"
              onPress={()=>{props.navigation.navigate('Profile')}}/>
            <DrawerItem labelStyle={menu}
              icon={()=><Report height={28} width={28}/>}
              label="Your Reports"
              onPress={()=>{props.navigation.navigate('ReportListPage')}}/>
            <DrawerItem labelStyle={menu}
              icon={()=><SignOut height={28} width={28}/>}
              label="Sign Out"
              onPress={()=>{}}/>
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
            <View style={darkModeStyle}>
              <Text>Dark Mode</Text>
              <Switch value={darkMode} onValueChange={(value)=>setDarkMode(value)}/>
            </View>
          </View>
          <View style={{paddingLeft:20,marginTop:20}}>
            <Text>v.1.0</Text>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{marginBottom:15,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
        <Text style={{marginRight:10}}>Made By</Text>
        <Image source={PD}/>
      </View>
    </View>
  )
};

export default DrawerContent;
