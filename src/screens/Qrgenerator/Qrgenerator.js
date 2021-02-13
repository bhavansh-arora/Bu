import React,{useEffect,useState} from 'react'
import {View,StyleSheet,Dimensions,SafeAreaView,StatusBar,Image,Text} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-community/async-storage'

  let logoFromFile = require('../../assets/yourbuca.png');
const windowWidth = Dimensions.get('window').width;
function Qrgenerator() {
    const [name, setName] = useState('')
  const [id,setId] = useState('abc')
 // const [fullid,setFullId] = useState('')
  const readData = async () => {
    try {
      const username = await AsyncStorage.getItem('name')
  const uid = await AsyncStorage.getItem('id')
      if (username !== null) {
        setName(username)
      //  alert(name)
      }
      if(id !== null){
        setId(uid)
       // setFullId("yourbuca://")
        
      }
    } catch (e) {
      alert(e)
    }
  }
    useEffect(() => {
        // Update the document title using the browser API
        readData()
    });
    return (
       <SafeAreaView style={styles.container}>
        <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
        translucent={false}
      />
      <View style={styles.card_container}>
 <Image style={styles.profile_pic} source={require('../../assets/user.png')} />
    <Text style={styles.title}>{name}</Text>
<Text style={styles.desc}>Your Buca</Text>

<QRCode
      value={id}
     size={0.4*windowWidth}
    />
    </View>
    <Text style={styles.brief}>Your QR code is private. If anybody scans it with the Buca mobile app, they will get your business card.</Text>
       </SafeAreaView>
       
    )
}

export default Qrgenerator
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems:"center",
    justifyContent:"center"
  },
  card_container:{
      backgroundColor:"#fff",
      height:0.8*windowWidth,
      alignItems:"center",
      width:"80%",
      borderRadius:10
  },profile_pic:{
      alignSelf:"center",height:50,width:50,resizeMode:"cover",top:-25,borderWidth:3,borderColor:"#fff",borderRadius:25
  },
  title:{
      fontWeight:"bold",
      fontSize:17
  },
  desc:{
      color:"#8e8e93",
      marginTop:5,
      marginBottom:10,
      fontWeight:"500",
      fontSize:15
  },
  brief:{
      alignItems:"center",
      width:"80%",
      color:"#8e8e93",
      textAlign:"center",
      marginTop:15,
      fontWeight:"700"
  }
})
