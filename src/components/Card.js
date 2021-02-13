import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet,ImageBackground, Image} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import AsyncStorage from '@react-native-community/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Tooltip } from 'react-native-elements';

const image = { uri: "https://cards-path.herokuapp.com/basic1%20-%20A.png" };
function Card(props) {
  const [bg,setBg] = useState('')
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [position, setPosition] = useState('')
  const [fileUri, setFileUri] = useState('')
  const [size, setSize] = useState('')

  const readData = async () => {
    try {
      const background= await AsyncStorage.getItem('background')
      if(await AsyncStorage.getItem('name'))
        setName(await AsyncStorage.getItem('name'));
      if(await AsyncStorage.getItem('id'))
        setId(await AsyncStorage.getItem('id'))
      if(await AsyncStorage.getItem('email'))
        setEmail(await AsyncStorage.getItem('email'))
      if(await AsyncStorage.getItem('phone'))
        setPhone(await AsyncStorage.getItem('phone'))
        if(await AsyncStorage.getItem('address'))
        setAddress(await AsyncStorage.getItem('address'))
        if(await AsyncStorage.getItem('position'))
        setPosition(await AsyncStorage.getItem('position'))
      if (background !== null) {
        setBg(background)
    
      const pfp = Json.parse(await AsyncStorage.getItem('profilepicture'))
      if(pfp)
        setFileUri(pfp)
     
      }
      
    } catch (e) {
    }
  }
  useEffect(() => {
    // Update the document title using the browser API
    readData()
setSize(props.image_size)
  });

  const choosePhoto = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //console.log('response', JSON.stringify(response));
        setFileUri(response)
        await AsyncStorage.setItem('profilepicture', JSON.stringify(response))
      }
    });
  }
/* 
  function renderFileUri() {
    if (fileUri) {
      return <TouchableOpacity onPress={choosePhoto}>
        <Image
          source={{ uri: fileUri }}
    width={props.image_size} height={props.image_size} style={{  width:70,
      height:70,
      paddingBottom:14,
      marginLeft:15,
      marginRight:45,
      borderRadius:50,}} resizeMethod='scale' resizeMode='cover'
        />
      </TouchableOpacity>
    } else {
      return <TouchableOpacity onPress={choosePhoto}>
        <Tooltip popover={<Text style={{color:'#fff'}}>Press on the avatar to add images</Text>}>
      <SvgUri
        source={require('../assets/avatar.svg')}
        width={props.image_size} height={props.image_size} style={ styles.avatar_premium2}
      />
      </Tooltip>
    </TouchableOpacity>
    }
  }*/

  if(props.value==1){ 
    return (


        <ImageBackground source={props.bg} imageStyle={{ borderRadius: 5}} style={props.big
            ? styles.card_free1
            : styles.card_small_free1}>
            <View style={styles.mainview_free1}>
                <View style={styles.leftview_free1}>
                    <View>
                <Text style={
            props.big
              ? styles.name_free1
              : styles.name_small_free1
          }>{name}</Text>
                <Text style={props.big
              ? styles.position_free1
              : styles.position_small_free1}>{position}</Text>
                </View>
                <View style={styles.fieldsspace_free1}>
                <View style={styles.fieldspace_free1}>
                <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_free1} source={require('../assets/call.svg')} />

                <Text style={props.big
              ? styles.fields_free1
              : styles.fields_small_free1}>{phone}</Text>
                </View>
                <View style={styles.fieldspace_free1}>
                <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_free1} source={require('../assets/mail.svg')} />

                <Text style={props.big
              ? styles.fields_free1
              : styles.fields_small_free1}>{email}</Text>
                </View>
                <View style={styles.fieldspace_free1}>
                <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_free1} source={require('../assets/pin.svg')} />

                <Text style={props.big
              ? styles.fields_free1
              : styles.fields_small_free1}>{address}</Text>
                </View>
                </View>
                </View>

              
           </View>
            <View style={styles.avatarview_free1}>
              <TouchableOpacity onPress={choosePhoto}>

            <SvgUri width={props.image_size} height={props.image_size} style={ styles.icon_free1} source={require('../assets/avatar.svg')} />

            </TouchableOpacity>
            </View>
            
        </ImageBackground> 
 
        )
    }
      
      
      
      
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  else if(props.value==2){
      return(

    
  
        <ImageBackground source={props.bg} imageStyle={{ borderRadius: 5}} style={props.big
            ? styles.card_free1
            : styles.card_small_free1}>
             <View style={styles.leftview_free2}>
             <TouchableOpacity onPress={choosePhoto}>
             <SvgUri width={props.image_size} height={props.image_size} style={ styles.icon_free2} source={require('../assets/avatar.svg')} />

             </TouchableOpacity>

        </View>
        <View style={styles.headercontainer_free2}>
            <View style={styles.headerview_free2}>
                <View>
            <Text style={   props.big
              ? styles.name_free2
              : styles.name_small_free2}>{name}</Text>
            <Text style={props.big
              ? styles.position_free2
              : styles.position_small_free2}>{position}</Text>
            </View>
            <View style={styles.fieldview_free2}>
            <View style={styles.fieldvalues_free2}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_free2} source={require('../assets/call.svg')} />

            <Text style={props.big
              ? styles.fields_free2
              : styles.fields_small_free2}>{phone}</Text>
            </View>
            <View style={styles.fieldvalues_free2}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_free2} source={require('../assets/mail.svg')} />

            <Text style={props.big
              ? styles.fields_free2
              : styles.fields_small_free2}>{email}</Text>
            </View>
            <View style={styles.fieldvalues_free2}>
            <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_free2 } source={require('../assets/pin.svg')} />

            <Text style={props.big
              ? styles.fields_free2
              : styles.fields_small_free2}>{address}</Text>
            </View>
            </View>
            </View>

          
       </View>
       
        
    </ImageBackground>
      )
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 else if(props.value==3){
     return(

  
 <ImageBackground source={props.bg} imageStyle={{ borderRadius: 5}} style={props.big
    ? styles.card_premium1
    : styles.card_small_premium1}>
    <View style={styles.topview_premium1}>
    <TouchableOpacity onPress={choosePhoto}>
    <SvgUri width={props.image_size} height={props.image_size} style={  styles.icon_premium1} source={require('../assets/avatar.svg')} />

    </TouchableOpacity>

</View>
<View style={styles.bottomview_premium1}>
    <View style={styles.bottomleftview_premium1}>
        <View>
            <Text  style={ props.big
              ? styles.name_premium1
              : styles.name_small_premium1}>{name}</Text>
            <Text style={props.big
              ? styles.position_premium1
              : styles.position_small_premium1}>{position}</Text>
            </View>
    </View>
    
    <View style={styles.bottomrightcontainer_premium1}>
    <View style={styles.bottomrightview_premium1}>
            <View style={styles.fieldvalues_phone_premium1}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_premium1} source={require('../assets/call.svg')} />

            <Text style={props.big
              ? styles.fields_premium1
              : styles.fields_small_premium1}>{phone}</Text>
            </View>
            <View style={styles.fieldvalues_premium1}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_premium1} source={require('../assets/mail.svg')} />

            <Text numberOfLines={2} ellipsizeMode="head" style={props.big
              ? styles.fields_premium1
              : styles.fields_small_premium1}>{email}</Text>
            </View>
            <View style={styles.fieldvalues_premium1}>
            <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_premium1} source={require('../assets/pin.svg')} />

            <Text style={props.big
              ? styles.fields_premium1
              : styles.fields_small_premium1}>{address}</Text>
            </View>
            </View>
        
    </View>
</View>
  


</ImageBackground> 

 )
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
else {
    return(

  
<ImageBackground source={props.bg} imageStyle={{ borderRadius: 5}} style={props.big
            ? styles.card_premium2
            : styles.card_small_premium2}>
<View style={styles.topview_premium2}>

        <Text  style={props.big
              ? styles.name_premium2
              : styles.name_small_premium2}>{name}</Text>
        <Text style={props.big
              ? styles.position_premium2
              : styles.position_small_premium2}>{position}</Text>
        
</View>
<View style={styles.bottomview_premium2}>
<View style={styles.leftview_premium2}>
<TouchableOpacity onPress={choosePhoto}>
<SvgUri width={props.image_size} height={props.image_size} style={  styles.icon_premium2} source={require('../assets/avatar.svg')} />

</TouchableOpacity>

</View>

<View style={styles.bottomrightcontainer_premium2}>
<View style={styles.bottomrightview_premium2}>
        <View style={styles.fieldvalues_premium2}>
        <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_premium2} source={require('../assets/call.svg')} />

        <Text style={props.big
              ? styles.fields_phone_premium2
              : styles.fields_small_phone_premium2}>{phone}</Text>
        </View>
        <View style={styles.fieldvalues_premium2}>
        <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_premium2} source={require('../assets/mail.svg')} />

        <Text numberOfLines={2} ellipsizeMode="head" style={props.big
              ? styles.fields_premium2
              : styles.fields_small_premium2}>{email}</Text>
        </View>
        <View style={styles.fieldvalues_premium2}>
        <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_premium2 } source={require('../assets/pin.svg')} />

        <Text style={props.big
              ? styles.fields_premium2
              : styles.fields_small_premium2}>{address}</Text>
        </View>
        </View>
    
</View>
</View>



</ImageBackground>

)
}

}

export default Card
const styles= StyleSheet.create({
  
 

  
 

  icon_small:{
marginTop:2
  },














   card_free1:{
width:"100%",
backgroundColor:"#fff",
height:190,
borderRadius:5,
  shadowColor: '#bdbdbd',
  shadowOpacity: 1,
  elevation: 20, 
shadowOffset:{
    width:2,height:2
},borderColor:"#fff",
marginTop:20,
flexDirection:"row",
marginBottom:20,

  },
  mainview_free1:{
borderColor:"#2d2d2d",alignItems:"center",width:"50%",justifyContent:"center",marginLeft:"8%"
  },
  leftview_free1:{
    display:"flex",flex:1
  },
   name_free1:{
    fontWeight:"bold",
    paddingTop:10
  },
  position_free1:{
    color:"#2d2d2d",fontSize:12,paddingTop:5,fontWeight:"500"
  },
  fields_free1:{
    color:"#2d2d2d",fontSize:11,fontWeight:"500",
  },
  icon_free1:{
    marginRight:10
  },
  fieldsspace_free1:{
    paddingTop:10
  },
  fieldspace_free1:{
    alignItems:"center",flexDirection:"row",paddingTop:6
  },
  avatarview_free1:{
alignItems:"flex-end",justifyContent:"center",paddingRight:15,flex:1
  },






 card_free2:{
width:"90%",
backgroundColor:"#fff",
height:190,
borderRadius:5,
  shadowColor: '#bdbdbd',
  shadowOpacity: 1,
  elevation: 20, 
shadowOffset:{
    width:2,height:2
},borderColor:"#fff",
borderWidth:2,
marginTop:20,
flexDirection:"row",
marginBottom:20,

  },
   name_free2:{
    fontWeight:"bold",
    paddingTop:10
  },
  position_free2:{
    color:"#2d2d2d",fontSize:12,paddingTop:5,fontWeight:"500"
  },
  fields_free2:{
    color:"#2d2d2d",fontSize:11,fontWeight:"500",
  },
  icon_free2:{
    marginRight:10
  },
leftview_free2:{
  alignItems:"flex-end",marginTop:10,marginLeft:15
},
headercontainer_free2:{
  borderColor:"#2d2d2d",alignItems:"center",width:"50%",justifyContent:"center",marginLeft:"8%"
},
headerview_free2:{
  display:"flex",flex:1
},
fieldview_free2:{
  paddingTop:10
},
fieldvalues_free2:{
  alignItems:"center",flexDirection:"row",paddingTop:6
},



 card_premium1:{
width:"100%",
    backgroundColor:"#fff",
    height:190,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    
    marginBottom:20,
    marginTop:20,
  },
 name_premium1:{
    fontWeight:"bold",
    paddingTop:10
  },
  position_premium1:{
    color:"#2d2d2d",fontSize:12,paddingTop:5,fontWeight:"500"
  },
   fields_premium1:{
    color:"#2d2d2d",fontSize:10,fontWeight:"500",paddingRight:15
  },
  icon_premium1:{
    marginRight:10
  },
    topview_premium1:{
    alignItems:"center",justifyContent:"center",width:"100%",height:"40%"
  },
bottomview_premium1:{
  flex:1,flexDirection:"row",display:"flex",
},
bottomleftview_premium1: {width:"50%",alignItems:"center"},
bottomrightcontainer_premium1:{
  width:"50%"
},
bottomrightview_premium1:{
  paddingTop:10
},
fieldvalues_phone_premium1:{
  alignItems:"center",flexDirection:"row",marginRight:20
},
fieldvalues_premium1:{
alignItems:"center",flexDirection:"row",paddingTop:6
},




 card_premium2:{
width:"100%",
    backgroundColor:"#fff",
    height:190,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    
    marginBottom:20,
    marginTop:20,
  },
   name_premium2:{
    fontWeight:"bold",
    paddingTop:10
  },
  position_premium2:{
    color:"#2d2d2d",fontSize:12,paddingTop:5,fontWeight:"500"
  },
fields_phone_premium2:{
    color:"#2d2d2d",fontSize:11,fontWeight:"500",
  },
 fields_premium2:{
    color:"#2d2d2d",fontSize:10,fontWeight:"500",paddingRight:15
  },
  icon_premium2:{
    marginRight:10
  },
topview_premium2:{
  alignItems:"center",justifyContent:"center",width:"100%",paddingTop:5
},
bottomview_premium2:{
  flex:1,flexDirection:"row",display:"flex"
},
leftview_premium2:{
  width:"40%",alignItems:"center",justifyContent:"center"
},
fieldvalues_premium2:{
alignItems:"center",flexDirection:"row",paddingTop:6
},
bottomrightcontainer_premium2:{
  width:"50%"
},
bottomrightview_premium2:{
paddingTop:14
},


















  card_small_free1:{
    width:"90%",
    backgroundColor:"#fff",
    height:150,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    flexDirection:"row",
    marginTop:10,
    marginLeft:"5%",
  },
    name_small_free1:{
    fontWeight:"bold",
    fontSize:10,
    paddingTop:10

  },
  position_small_free1:{
    color:"#2d2d2d",fontSize:8,paddingTop:5,fontWeight:"500",

  },
  fields_small_free1:{
    color:"#2d2d2d",fontSize:7,paddingTop:2,fontWeight:"500",paddingRight:20

  },
    card_small_free2:{
    width:"90%",
    backgroundColor:"#fff",
    height:150,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    flexDirection:"row",
    marginTop:10,
    marginLeft:"5%",
  },
    name_small_free2:{
    fontWeight:"bold",
    fontSize:10,
    paddingTop:10

  },
  position_small_free2:{
    color:"#2d2d2d",fontSize:8,paddingTop:5,fontWeight:"500",

  },
  fields_small_free2:{
    color:"#2d2d2d",fontSize:7,paddingTop:2,fontWeight:"500",paddingRight:20

  },








      card_small_premium1:{
   width:"90%",
    backgroundColor:"#fff",
    height:150,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    marginTop:10,
    marginLeft:"5%",
    marginBottom:20,
  },
    name_small_premium1:{
    fontWeight:"bold",
    fontSize:10,
    paddingTop:10

  },
  position_small_premium1:{
    color:"#2d2d2d",fontSize:8,paddingTop:5,fontWeight:"500",

  },fields_small_premium1:{
    color:"#2d2d2d",fontSize:7,paddingTop:2,fontWeight:"500",paddingRight:20

  },







      card_small_premium2:{
   width:"90%",
    backgroundColor:"#fff",
    height:150,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    marginTop:10,
    marginLeft:"5%",
    marginBottom:20,
  },
    name_small_premium2:{
    fontWeight:"bold",
    fontSize:10,
    paddingTop:10

  },
  position_small_premium2:{
    color:"#2d2d2d",fontSize:8,paddingTop:5,fontWeight:"500",

  },
fields_small_phone_premium2:{
    color:"#2d2d2d",fontSize:8,paddingTop:2,fontWeight:"500",paddingRight:20,

  },
fields_small_premium2:{
    color:"#2d2d2d",fontSize:7,paddingTop:2,fontWeight:"500",paddingRight:20

  },



})