import React, {useState} from 'react'
import {View,Text,StyleSheet,Dimensions,Modal,Image} from 'react-native'
import Button from '../button'

const {width,height} = Dimensions.get('screen')

const ReportList =({status,title,date,roadPicture,desc,color="#000"})=>{
  const [visible,setVisible] = useState(false)

  return(
    <View style={styles.container}>
      <Modal transparent visible={visible}>
        <View style={styles.modalContainer}>
          <Button name="< close" style={{marginBottom:40}} size={20} color="#909090" onPress={()=>setVisible(false)}/>
          <Text style={{color:"#adadad",fontFamily:"Poppins-SemiBold"}}>{date}</Text>
          <Text style={{color:"#153077",fontFamily:"Poppins-Bold",fontSize:22,marginBottom:15}}>{title}</Text>
          <Image resizeMode="cover" style={{height:height/3,width:"100%",borderRadius:20}} source={{uri:`data:image/png;base64,${roadPicture}`}}/>
          <Text style={{color:"#153077",fontFamily:"Poppins-Regular",fontSize:17,marginTop:25}}>{desc}</Text>
        </View>
      </Modal>
      <Text style={[styles.status,{color}]}>{status}</Text>
      <View style={styles.dataWrapper}>
        <Text style={[styles.title,{color}]}>{title}</Text>
        <Text style={[styles.date,{color}]}>{date}</Text>
      </View>
      <Button name='details' color={color==='#fff'?'#4abcff':'#3043F0'} onPress={()=>setVisible(true)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',
    width:width/1.085,borderBottomWidth:1,borderColor:'#F1DADA',paddingBottom:7.73,
    marginBottom:15
  },
  status:{
    fontFamily:'Poppins-Regular',fontSize:12,
  },
  title:{fontFamily:'Poppins-Regular',fontSize:16,},
  dataWrapper:{width:216,minHeight:42},
  date:{fontFamily:'Poppins-Regular',fontSize:14},
  modalContainer:{
    flex:1,
    // backgroundColor:'rgba(114, 213, 255, 1)',
    backgroundColor:'#fff',
    alignItems:'flex-start',
    // justifyContent:'center',
    paddingHorizontal:24,
    paddingVertical:30
  }
})

export default ReportList
