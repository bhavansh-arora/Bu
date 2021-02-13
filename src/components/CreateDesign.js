import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import { useNavigation } from '@react-navigation/native';



function CreateDesign() {
    const navigation = useNavigation(); 

    return (
        <TouchableOpacity onPress={() => navigation.navigate("createYourOwn")} style={{marginHorizontal:"5%",marginTop:10,alignItems:"center",borderRadius:5,
    }}>
       <View style={styles.container}>
         
                      
           
           <View style={styles.card} />
         

           <View style={{flexDirection:"row",alignItems:"center"}}>
           <SvgUri width="25" height="25" style={  {marginRight:10}} source={require('../assets/add_more.svg')} />
           <Text style={styles.text}>Create Design</Text>

           </View>
       </View>
       </TouchableOpacity>
    )
}

export default CreateDesign
const styles = StyleSheet.create({
container:{
    width:"100%",
    backgroundColor:"#f2fbf8",
    height:175,
    alignItems:"center",
    justifyContent:'space-around'
},
card:{
    backgroundColor:"#00bd84",
    width:"30%",
    height:"35%",
    borderColor:"#2d2d2d",
    borderWidth:1,
    borderStyle:"dashed",
marginTop:20    
},
text:{
    color:"#00bd84",
    fontSize:15,
    paddingRight:10,
    marginVertical:20
},
outside_borders:{
    height:"5%",
    width:"30%",
    borderStyle:"dashed",
    borderColor:"#2d2d2d",
    borderWidth:1,

    
    

}
})