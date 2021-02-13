import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import SvgUri from 'react-native-svg-uri';

function Card_Design(props) {
if(props.value==1){ 
    return (


        <View style={props.big
            ? styles.card
            : styles.card_small}>
            <View style={{borderColor:"#2d2d2d",alignItems:"center",width:"50%",backgroundColor:"#fff",justifyContent:"center",marginLeft:"8%"}}>
                <View style={{display:"flex",flex:1}}>
                    <View>
                <Text style={
            props.big
              ? styles.name
              : styles.name_small
          }>THOMAS FREDERICK</Text>
                <Text style={props.big
              ? styles.position
              : styles.position_small}>Business Man</Text>
                </View>
                <View style={{paddingTop:10}}>
                <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
                <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon} source={require('../assets/call.svg')} />

                <Text style={props.big
              ? styles.fields
              : styles.fields_small}>+49-157-5558-694</Text>
                </View>
                <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
                <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon} source={require('../assets/mail.svg')} />

                <Text style={props.big
              ? styles.fields
              : styles.fields_small}>thomasfrederick@hotmail.com</Text>
                </View>
                <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
                <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={  {marginRight:10}} source={require('../assets/pin.svg')} />

                <Text style={props.big
              ? styles.fields
              : styles.fields_small}>Friedrichstrasse 121,10117 Berlin, Germany</Text>
                </View>
                </View>
                </View>

              
           </View>
            <View style={{alignItems:"flex-end",justifyContent:"center",paddingRight:15,flex:1}}>
            <SvgUri width={props.image_size} height={props.image_size} style={  {marginRight:10}} source={require('../assets/avatar.svg')} />

            </View>
            
        </View> 
        )
    }
      
      
      
      
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  else if(props.value==2){
      return(

    
  
        <View style={props.big
            ? styles.card
            : styles.card_small}>
             <View style={{alignItems:"flex-end",marginTop:10,paddingLeft:15}}>
        <SvgUri width={props.image_size} height={props.image_size} style={  {marginRight:10}} source={require('../assets/avatar.svg')} />

        </View>
        <View style={{borderColor:"#2d2d2d",alignItems:"center",width:"50%",backgroundColor:"#fff",justifyContent:"center",marginLeft:"8%"}}>
            <View style={{display:"flex",flex:1}}>
                <View>
            <Text style={   props.big
              ? styles.name
              : styles.name_small}>THOMAS FREDERICK</Text>
            <Text style={props.big
              ? styles.position
              : styles.position_small}>Business Man</Text>
            </View>
            <View style={{paddingTop:10}}>
            <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon} source={require('../assets/call.svg')} />

            <Text style={props.big
              ? styles.fields
              : styles.fields_small}>+49-157-5558-694</Text>
            </View>
            <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon} source={require('../assets/mail.svg')} />

            <Text style={props.big
              ? styles.fields
              : styles.fields_small}>thomasfrederick@hotmail.com</Text>
            </View>
            <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
            <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={  {marginRight:10}} source={require('../assets/pin.svg')} />

            <Text style={props.big
              ? styles.fields
              : styles.fields_small}>Friedrichstrasse 121,10117 Berlin, Germany</Text>
            </View>
            </View>
            </View>

          
       </View>
       
        
    </View>
      )
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 else if(props.value==3){
     return(

    
 <View style={props.big
    ? styles.card_top
    : styles.card_small_top}>
    <View style={{alignItems:"center",justifyContent:"center",width:"100%",height:"40%"}}>
<SvgUri width={props.image_size} height={props.image_size} style={  {marginRight:10}} source={require('../assets/avatar.svg')} />

</View>
<View style={{flex:1,flexDirection:"row",display:"flex",}}>
    <View style={{width:"50%",alignItems:"center"}}>
        <View>
            <Text  style={ props.big
              ? styles.name
              : styles.name_small}>THOMAS FREDERICK</Text>
            <Text style={props.big
              ? styles.position
              : styles.position_small}>Business Man</Text>
            </View>
    </View>
    
    <View style={{width:"50%"}}>
    <View style={{paddingTop:10}}>
            <View style={{alignItems:"center",flexDirection:"row",marginRight:20}}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon} source={require('../assets/call.svg')} />

            <Text style={props.big
              ? styles.fields_sm
              : styles.fields_small}>+49-157-5558-694</Text>
            </View>
            <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
            <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon} source={require('../assets/mail.svg')} />

            <Text numberOfLines={2} ellipsizeMode="head" style={props.big
              ? styles.fields_sm
              : styles.fields_small}>thomasfrederick@hotmail.com</Text>
            </View>
            <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
            <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={  {marginRight:10}} source={require('../assets/pin.svg')} />

            <Text style={props.big
              ? styles.fields_sm
              : styles.fields_small}>Friedrichstrasse 121,10117 Berlin, Germany</Text>
            </View>
            </View>
        
    </View>
</View>
  


</View> 
 )
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
else {
    return(

  
<View style={props.big
            ? styles.card_top
            : styles.card_small_top}>
<View style={{alignItems:"center",justifyContent:"center",width:"100%",paddingTop:5}}>

        <Text  style={props.big
              ? styles.name
              : styles.name_small}>THOMAS FREDERICK</Text>
        <Text style={props.big
              ? styles.position
              : styles.position_small}>Business Man</Text>
        
</View>
<View style={{flex:1,flexDirection:"row",display:"flex"}}>
<View style={{width:"40%",alignItems:"center",justifyContent:"center"}}>
<SvgUri width={props.image_size} height={props.image_size} style={  {marginRight:10}} source={require('../assets/avatar.svg')} />

</View>

<View style={{width:"50%"}}>
<View style={{paddingTop:10}}>
        <View style={{alignItems:"center",flexDirection:"row",paddingTop:10}}>
        <SvgUri width={props.svg_width} height={props.svg_width} style={ styles.icon} source={require('../assets/call.svg')} />

        <Text style={props.big
              ? styles.fields_four
              : styles.fields_small_four}>+49-157-5558-694</Text>
        </View>
        <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
        <SvgUri width={props.svg_width} height={props.svg_width} style={  styles.icon} source={require('../assets/mail.svg')} />

        <Text numberOfLines={2} ellipsizeMode="head" style={props.big
              ? styles.fields
              : styles.fields_small}>thomasfrederick@hotmail.com</Text>
        </View>
        <View style={{alignItems:"center",flexDirection:"row",paddingTop:6}}>
        <SvgUri width={props.svg_width_pin} height={props.svg_width_pin} style={  {marginRight:10}} source={require('../assets/pin.svg')} />

        <Text style={props.big
              ? styles.fields
              : styles.fields_small}>Friedrichstrasse 121,10117 Berlin, Germany</Text>
        </View>
        </View>
    
</View>
</View>



</View>

)
}

}

export default Card_Design
const styles= StyleSheet.create({
    card:{
width:"90%",
backgroundColor:"#fff",
height:175,
borderRadius:5,
  shadowColor: '#bdbdbd',
  shadowOpacity: 1,
  elevation: 20, 
shadowOffset:{
    width:2,height:2
},borderColor:"#fff",
borderWidth:2,
marginTop:20,
flexDirection:"row"
  },
  card_small:{
    width:"40%",
    backgroundColor:"#fff",
    height:100,
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
  },
  card_top:{
    width:"90%",
    backgroundColor:"#fff",
    height:175,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    flexDirection:"row",
    flexDirection:"column",
    marginBottom:20,
    marginTop:20,


  },
  card_small_top:{
    width:"70%",
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
    flexDirection:"column",
    marginBottom:20,

  },
  name:{
    fontWeight:"bold",
    paddingTop:10
  },
  position:{
    color:"#2d2d2d",fontSize:12,paddingTop:5,fontWeight:"500"
  },
  fields:{
    color:"#2d2d2d",fontSize:12,fontWeight:"500",paddingRight:15
  },
  fields_four:{
    color:"#2d2d2d",fontSize:12,fontWeight:"500",paddingRight:15
  },
  fields_sm:{
    color:"#2d2d2d",fontSize:11,fontWeight:"500",paddingRight:25
  },
  name_small:{
    fontWeight:"bold",
    fontSize:10,
    paddingTop:10

  },
  position_small:{
    color:"#2d2d2d",fontSize:8,paddingTop:5,fontWeight:"500",

  },
  fields_small:{
    color:"#2d2d2d",fontSize:8,paddingTop:2,fontWeight:"500",paddingRight:20

  },fields_small_four:{
    color:"#2d2d2d",fontSize:8,paddingTop:2,fontWeight:"500",paddingRight:20,paddingTop:20

  },icon:{
    marginRight:10
  },icon_small:{
marginTop:2
  }
})
