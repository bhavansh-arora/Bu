import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet,ImageBackground, Image,Linking} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = { uri: "https://cards-path.herokuapp.com/basic1%20-%20A.png" };
function CardDynamic(props) {
  const [size, setSize] = useState('')
/*
  const readData = async () => {
    try {
      if(await AsyncStorage.getItem('name'))
        setName(await AsyncStorage.getItem('name'));
      if(await AsyncStorage.getItem('id'))
        setId(await AsyncStorage.getItem('id'))
      if(await AsyncStorage.getItem('email'))
        setEmail(await AsyncStorage.getItem('email'))
      if(await AsyncStorage.getItem('phone'))
        setPhone(await AsyncStorage.getItem('phone'))

      
    } catch (e) {
    }
  }*/
  useEffect(() => {
    setSize(props.image_size)
  },[]);

  function dialPhone(){
    let phoneNumber = '';
 
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${props.phone}`;
    }
    else {
      phoneNumber = `telprompt:${props.phone}`;
    }
 
    Linking.openURL(phoneNumber);
  }

  function openMail()
  {
    Linking.openURL(`mailto:${props.email}?subject=SendMail&body=Description`)
  }

  const openMap = (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  }

  const styles= StyleSheet.create({
    //cards Free 1
    icon_small:{
      marginTop:2,
      color:props.fontColor,
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
      },
      borderColor:"#fff",
      marginTop:20,
      flexDirection:"row",
      marginBottom:20,
   },
    mainview_free1:{
      borderColor:"#2d2d2d",
      alignItems:"center",
      width:"50%",
      justifyContent:"center",
      marginLeft:"8%"
    },
    leftview_free1:{
      display:"flex",
      flex:1
    },
     name_free1:{
      paddingTop:10,
      color:props.fontColor,
      fontSize:props.fontSize+2,
      textDecorationLine:props.underline,
      fontFamily:props.fontFamily
    },
    position_free1:{
      color:"#2d2d2d",
      fontSize:props.fontSize,
      paddingTop:5,
      fontWeight:"500",
      textDecorationLine:props.underline,
      color:props.fontColor,
      fontFamily:props.fontFamily
    },
    fields_free1:{
      color:"#2d2d2d",
      fontSize:props.fontSize,
      fontWeight:"500",
      textDecorationLine:props.underline,
      color:props.fontColor,
      fontFamily:props.fontFamily
    },
    icon_free1:{
      marginRight:10,
      color:props.fontColor,
    },
    fieldsspace_free1:{
      paddingTop:10,
    },
    fieldspace_free1:{
      alignItems:"center",
      flexDirection:"row",
      paddingTop:6,
    },
    avatarview_free1:{
      alignItems:"flex-end",
      justifyContent:"center",
      paddingRight:15,
      flex:1
    },
  
    //cards free 2
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
    },
    borderColor:"#fff",
    borderWidth:2,
    marginTop:20,
    flexDirection:"row",
    marginBottom:20,
    },
     name_free2:{
      paddingTop:10,
      color:props.fontColor,
      fontSize:props.fontSize+2,
      textDecorationLine:props.underline,
      fontFamily:props.fontFamily
    },
    position_free2:{
      color:"#2d2d2d",
      fontSize:props.fontSize,
      paddingTop:5,
      fontWeight:"500",
      textDecorationLine:props.underline,
      color:props.fontColor,
      fontFamily:props.fontFamily
    },
    fields_free2:{
      color:"#2d2d2d",
      fontSize:props.fontSize,
      fontWeight:"500",
      textDecorationLine:props.underline,
      color:props.fontColor,
      fontFamily:props.fontFamily
    },
    icon_free2:{
      marginRight:10,
      color:props.fontColor,
    },
    leftview_free2:{
      alignItems:"flex-end",
      marginTop:10,
      marginLeft:15
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

  //cards premium 1
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
      },
      borderColor:"#fff",
      marginBottom:20,
      marginTop:20,
    },
   name_premium1:{
      paddingTop:10,
      color:props.fontColor,
      fontSize:props.fontSize+2,
      fontFamily:props.fontFamily,
      textDecorationLine:props.underline,
    },
    position_premium1:{
      color:"#2d2d2d",
      fontSize:props.fontSize,
      paddingTop:5,
      textDecorationLine:props.underline,
      fontWeight:"500",
      color:props.fontColor,
      fontFamily:props.fontFamily,
    },
     fields_premium1:{
      color:"#2d2d2d",
      fontSize:props.fontSize,
      textDecorationLine:props.underline,
      fontWeight:"500",
      paddingRight:15,
      color:props.fontColor,
      fontFamily:props.fontFamily,
    },
    icon_premium1:{
      marginRight:10,
      color:props.fontColor,
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

  //cards premium 2
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
      paddingTop:10,
      textDecorationLine:props.underline,
      textDecorationColor:props.fontColor,
      color:props.fontColor,
      fontSize:props.fontSize+2,
      fontFamily:props.fontFamily
    },
    position_premium2:{
      color:"#2d2d2d",textDecorationLine:props.underline,fontSize:props.fontSize,paddingTop:5,fontWeight:"500",color:props.fontColor,fontFamily:props.fontFamily
    },
  fields_phone_premium2:{
      color:"#2d2d2d",textDecorationLine:props.underline,fontSize:props.fontSize,fontWeight:"500",color:props.fontColor,fontFamily:props.fontFamily
    },
   fields_premium2:{
      color:"#2d2d2d",textDecorationLine:props.underline,fontSize:props.fontSize,fontWeight:"500",paddingRight:15,color:props.fontColor,fontFamily:props.fontFamily
    },
    icon_premium2:{
      marginRight:10,color:props.fontColor,
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

  //card small free 1
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
      paddingTop:10,
      color:props.fontColor,
    },
    position_small_free1:{
      color:"#2d2d2d",fontSize:props.fontSize,paddingTop:5,fontWeight:"500",color:props.fontColor,
  
    },
    fields_small_free1:{
      color:"#2d2d2d",fontSize:props.fontSize,paddingTop:2,fontWeight:"500",paddingRight:20,color:props.fontColor,
  
    },

    //cards small free 2
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
      fontSize:props.fontSize+2,
      paddingTop:10,color:props.fontColor,
  
    },
    position_small_free2:{
      color:"#2d2d2d",fontSize:props.fontSize,paddingTop:5,fontWeight:"500",color:props.fontColor,
  
    },
    fields_small_free2:{
      color:"#2d2d2d",fontSize:props.fontSize,paddingTop:2,fontWeight:"500",paddingRight:20,color:props.fontColor,
    },

    //card small premium 1
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
      fontSize:props.fontSize+2,
      paddingTop:10,
      color:props.fontColor,
    },
    position_small_premium1:{
      color:"#2d2d2d",fontSize:props.fontSize,paddingTop:5,fontWeight:"500",color:props.fontColor,
  
    },fields_small_premium1:{
      color:"#2d2d2d",fontSize:props.fontSize,paddingTop:2,fontWeight:"500",paddingRight:20,color:props.fontColor,
  
    },

    //card small premium 2
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
      fontSize:props.fontSize+2,
      paddingTop:10
  
    },
    position_small_premium2:{
      color:"#2d2d2d",
      fontSize:props.fontSize,
      paddingTop:5,
      fontWeight:"500",
      color:props.fontColor,
    },
  fields_small_phone_premium2:{
      color:"#2d2d2d",
      fontSize:props.fontSize,paddingTop:2,fontWeight:"500",paddingRight:20,
      color:props.fontColor,
  
    },
  fields_small_premium2:{
      color:"#2d2d2d",fontSize:props.fontSize,paddingTop:2,fontWeight:"500",paddingRight:20,
      color:props.fontColor,
  
    },
  })

  function renderProfilePhoto()
  {
    var def =  <SvgUri width={props.image_size} height={props.image_size} style={ styles.icon_free1} source={require('../assets/avatar.svg')} />
    if(props.profilePhoto)
    {
        def = <Image
                source={{ uri: props.profilePhoto }}
                style={{  width:parseFloat(props.image_size),
                          height:parseFloat(props.image_size),
                          marginRight:10,
                          borderRadius:parseFloat(props.image_size),}}
          />
    }
    return def
  }

  if(props.value==1){ 
    return (


        <ImageBackground source={{uri:props.bg}} imageStyle={{ borderRadius: 5}} style={props.big
            ? styles.card_free1
            : styles.card_small_free1}>
            <View style={styles.mainview_free1}>
                <View style={styles.leftview_free1}>
                    <View>
                <Text style={
            props.big
              ? styles.name_free1
              : styles.name_small_free1
          }>{props.name}</Text>
                <Text style={props.big
              ? styles.position_free1
              : styles.position_small_free1}>{props.position}</Text>
                </View>
                <View style={styles.fieldsspace_free1}>
                <TouchableOpacity onPress={dialPhone}>
                <View style={styles.fieldspace_free1}>
                  
                <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_free1} source={require('../assets/call.svg')} fill={props.fontColor}/>

                <Text style={props.big
              ? styles.fields_free1
              : styles.fields_small_free1}>{props.phone}</Text>
              
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={openMail}>
                <View style={styles.fieldspace_free1}>
                  
                <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_free1} source={require('../assets/mail.svg')} fill={props.fontColor}/>

                <Text style={props.big
              ? styles.fields_free1
              : styles.fields_small_free1}>{props.email}</Text>
              
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openMap(0,0)}>
                <View style={styles.fieldspace_free1}>
                <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_free1} source={require('../assets/pin.svg')} fill={props.fontColor}/>

                <Text style={props.big
              ? styles.fields_free1
              : styles.fields_small_free1}>{props.address}</Text>
                </View>
                </TouchableOpacity>
                </View>
                </View>
                

              
           </View>
           <View style={{flexDirection:'row', position:'absolute', bottom:5,right:0}}>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/facebook.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/instagram.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize} height={props.fontSize} style={  styles.icon_free1} source={require('../assets/mail.svg')} fill={props.fontColor}/>
                </View>
            <View style={styles.avatarview_free1}>
            {renderProfilePhoto()}
            </View>
            
        </ImageBackground> 
 
        )
    }
      
      
      
      
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  else if(props.value==2){
      return(

    
  
        <ImageBackground source={{uri:props.bg}} imageStyle={{ borderRadius: 5}} style={props.big
            ? styles.card_free1
            : styles.card_small_free1}>
             <View style={styles.leftview_free2}>
             {renderProfilePhoto()}

        </View>
        <View style={styles.headercontainer_free2}>
            <View style={styles.headerview_free2}>
                <View>
            <Text style={   props.big
              ? styles.name_free2
              : styles.name_small_free2}>{props.name}</Text>
            <Text style={props.big
              ? styles.position_free2
              : styles.position_small_free2}>{props.position}</Text>
            </View>
            <View style={styles.fieldview_free2}>
            <View style={styles.fieldvalues_free2}>
              <TouchableOpacity onPress={dialPhone}> 
            <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_free2} source={require('../assets/call.svg')} fill={props.fontColor} />

            <Text style={props.big
              ? styles.fields_free2
              : styles.fields_small_free2}>{props.phone}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={openMail}>
            <View style={styles.fieldvalues_free2}>
              
            <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_free2} source={require('../assets/mail.svg')} fill={props.fontColor}/>

            <Text style={props.big
              ? styles.fields_free2
              : styles.fields_small_free2}>{props.email}</Text>
              
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openMap(0,0)}>
            <View style={styles.fieldvalues_free2}>
            <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_free2 } source={require('../assets/pin.svg')} fill={props.fontColor}/>

            <Text style={props.big
              ? styles.fields_free2
              : styles.fields_small_free2}>{props.address}</Text>
            </View>
            </TouchableOpacity>
            </View>
            
            </View>

          
       </View>
       <View style={{flexDirection:'row', position:'absolute', bottom:5,right:0}}>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/facebook.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/instagram.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize} height={props.fontSize} style={  styles.icon_free1} source={require('../assets/mail.svg')} fill={props.fontColor}/>
                </View>
        
    </ImageBackground>
      )
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 else if(props.value==3){
     return(

  
 <ImageBackground source={{uri:props.bg}} imageStyle={{ borderRadius: 5}} style={props.big
    ? styles.card_premium1
    : styles.card_small_premium1}>
    <View style={styles.topview_premium1}>
    {renderProfilePhoto()}

</View>
<View style={styles.bottomview_premium1}>
    <View style={styles.bottomleftview_premium1}>
        <View>
            <Text  style={ props.big
              ? styles.name_premium1
              : styles.name_small_premium1}>{props.name}</Text>
            <Text style={props.big
              ? styles.position_premium1
              : styles.position_small_premium1}>{props.position}</Text>
            </View>
    </View>
    
    <View style={styles.bottomrightcontainer_premium1}>
    <View style={styles.bottomrightview_premium1}>
    <TouchableOpacity onPress={dialPhone}>
            <View style={styles.fieldvalues_phone_premium1}>
              
            <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_premium1} source={require('../assets/call.svg')} fill={props.fontColor}/>

            <Text style={props.big
              ? styles.fields_premium1
              : styles.fields_small_premium1}>{props.phone}</Text>
              
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openMail}>
            <View style={styles.fieldvalues_premium1}>
              
            <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_premium1} source={require('../assets/mail.svg')} fill={props.fontColor}/>

            <Text numberOfLines={2} ellipsizeMode="head" style={props.big
              ? styles.fields_premium1
              : styles.fields_small_premium1}>{props.email}</Text>
              
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openMap(0,0)}>
            <View style={styles.fieldvalues_premium1}>
            <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_premium1} source={require('../assets/pin.svg')} fill={props.fontColor}/>

            <Text style={props.big
              ? styles.fields_premium1
              : styles.fields_small_premium1}>{props.address}</Text>
            </View>
            </TouchableOpacity>
            </View>
        
    </View>
</View>
<View style={{flexDirection:'row', position:'absolute', bottom:5,right:0}}>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/facebook.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/instagram.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize} height={props.fontSize} style={  styles.icon_free1} source={require('../assets/mail.svg')} fill={props.fontColor}/>
                </View>


</ImageBackground> 

 )
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
else {
    return(

  
<ImageBackground source={{uri:props.bg}} imageStyle={{ borderRadius: 5}} style={props.big
            ? styles.card_premium2
            : styles.card_small_premium2}>
<View style={styles.topview_premium2}>

        <Text  style={props.big
              ? styles.name_premium2
              : styles.name_small_premium2}>{props.name}</Text>
        <Text style={props.big
              ? styles.position_premium2
              : styles.position_small_premium2}>{props.position}</Text>
        
</View>
<View style={styles.bottomview_premium2}>
<View style={styles.leftview_premium2}>
{renderProfilePhoto()}

</View>

<View style={styles.bottomrightcontainer_premium2}>
<View style={styles.bottomrightview_premium2}>
<TouchableOpacity onPress={dialPhone}>
        <View style={styles.fieldvalues_premium2}>
          
        <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon_premium2} source={require('../assets/call.svg')} fill={props.fontColor}/>

        <Text style={props.big
              ? styles.fields_phone_premium2
              : styles.fields_small_phone_premium2}>{props.phone}</Text>
              
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openMail}>
        <View style={styles.fieldvalues_premium2}>
          
        <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon_premium2} source={require('../assets/mail.svg')} fill={props.fontColor}/>

        <Text numberOfLines={2} ellipsizeMode="head" style={props.big
              ? styles.fields_premium2
              : styles.fields_small_premium2}>{props.email}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>openMap(0,0)}>
        <View style={styles.fieldvalues_premium2}>
        <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={ styles.icon_premium2 } source={require('../assets/pin.svg')} fill={props.fontColor}/>

        <Text style={props.big
              ? styles.fields_premium2
              : styles.fields_small_premium2}>{props.address}</Text>
        </View>
        </TouchableOpacity>
        </View>
    
</View>
</View>

<View style={{flexDirection:'row', position:'absolute', bottom:5,right:0}}>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/facebook.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize+2} height={props.fontSize+2} style={ styles.icon_free1} source={require('../assets/instagram.svg')} fill={props.fontColor}/>
                <SvgUri width={props.fontSize} height={props.fontSize} style={  styles.icon_free1} source={require('../assets/mail.svg')} fill={props.fontColor}/>
                </View>

</ImageBackground>

)
}

}

export default CardDynamic
