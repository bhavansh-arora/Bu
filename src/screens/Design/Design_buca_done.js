import React,{useState, useEffect} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,Text,SafeAreaView,ScrollView,StatusBar, Image} from 'react-native'
import CardDynamic from '../../components/CardDynamic'
import AsyncStorage from '@react-native-community/async-storage'

function Design_buca_done({navigation}) {

    const [number,setNumber] = useState(1)
    const [fileUri, setFileUri] = useState('')
    const [address, setAddress] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [website, setWebsite] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('');
    const [cardType, setCardType] = useState(-1)
    const [fontColor, setFontColor] = useState('black')
    const [fontSize, setFontSize] = useState(12)
    const [fontFamily, setFontFamily] = useState('Champagne')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [background, setBackground] = useState('')
    const [underline, setUnderLine] = useState('none')
    const [name,setName] = useState('')
    const [phone, setPhone] = useState('')

  const retrieveData = async () =>{
    try{
    
        const file = await AsyncStorage.getItem('fileUri')
        if(file)
            setFileUri(file)
        const bg= await AsyncStorage.getItem('background')
        if(await AsyncStorage.getItem('email'))
            setEmail(await AsyncStorage.getItem('email'))
        console.log(bg)
        if (bg !== null) {
            setBackground(bg)
            const add = await AsyncStorage.getItem('address')
            const pos = await AsyncStorage.getItem('position')
            const web = await AsyncStorage.getItem('websitelink')
            const inst = await AsyncStorage.getItem('instagramid')
            const fb = await AsyncStorage.getItem('facebookid')
            const lkid = await AsyncStorage.getItem('linkedinid')
            const pfp = JSON.parse(await AsyncStorage.getItem('profilepicture'))
            const cc = JSON.parse(await AsyncStorage.getItem('cardType'))
            const num = JSON.parse(await AsyncStorage.getItem('value'))
            const fontC = await AsyncStorage.getItem('fontColor')
            const fontF = await AsyncStorage.getItem('fontFamily')
            const under = await AsyncStorage.getItem('underline')
            const fontS = JSON.parse(await AsyncStorage.getItem('fontSize'))
            if(cc)
                setCardType(cc)
            if(num)
                setNumber(num)
            if(fontC)
                setFontColor(fontC)
            if(web)
                setWebsite(web)
            if(fontF)
                setFontFamily(fontF)
            if(under)
                setUnderLine(under)
            if(fontS)
                setFontSize(fontS)
            if(inst)
                setInstagram(inst)
            if(fb)
                setFacebook(fb)
            if(lkid)
                setLinkedin(lkid)
            if(add)
                setAddress(add)
            if(pos)
                setPosition(pos)
            if(pfp)
                setProfilePhoto(pfp)
            if(await AsyncStorage.getItem('name'))
                setName(await AsyncStorage.getItem('name'));
            if(await AsyncStorage.getItem('phone'))
                setPhone(await AsyncStorage.getItem('phone'))
        }
    }
    catch(e){
        console.log(e)
    }
    
}

useEffect(() => {
    retrieveData()
},[])


    return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:"#fff",alignItems:"center"}}>
    <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
    <View style={{justifyContent:'space-between', alignContent:'space-between', alignItems:'flex-start'}}>
        <View style={{flexDirection:'row', paddingLeft:25,paddingTop:45}}>
            <Text style={{fontSize:35, color:'#00bd89', fontWeight:'bold'}}>Congratulations!</Text>
        </View>
        <View style={{marginHorizontal:25}}>
            <Text style={{fontSize:30, fontWeight:'bold'}}>Your buca is ready to be used</Text>
        </View>
    </View>
    <View style={{marginTop:55,width:"90%"}}>
    <CardDynamic
        image_size="70"
        svg_width="12"
        svg_width_pin="14"
        value={number} 
        big={true} 
        address={address}
        position={position}
        fontColor = {fontColor}
        fontSize = {fontSize}
        fontFamily = {fontFamily}
        underline = {underline}
        profilePhoto = {profilePhoto.uri}
        bg = {background}
        big={true}
        name={name}
        phone={phone}
        email={email} 
    />
    </View>
    <View style={{width:"100%",flexDirection:"row",justifyContent:"space-around",alignSelf:"baseline",marginTop:150}}>
    <TouchableOpacity onPress={()=>navigation.navigate('Design_buca_last')} style={{  marginBottom:45}}>
        <Text style={{fontSize:20, color:'#898989',}}>Go back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} style={{ marginBottom:45}}>
        <Text style={{fontSize:20, color:'#00bd89'}}>Continue</Text>
        </TouchableOpacity>
   
      
        </View>
    </SafeAreaView>
    </>
    )
}

export default Design_buca_done
