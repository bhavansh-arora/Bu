
import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const CardDesign = (props) => {

  return (
<View style={{flexDirection:'row', justifyContent:'flex-start', padding:10, paddingLeft:20}}>
    <View style={{flex:2,}}>
        <Text style={styles.header}>Front Card</Text>
        <View style={{flex:1,}}>
            <View  style={styles.card_holder}>
                <TouchableOpacity style={styles.button} onPress={()=>props.setNumber(1)}>
                    <View style={(props.number==1)?styles.card_selected:styles.card}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>props.setNumber(2)} >
                    <View style={(props.number==2)?styles.card_right_selected:styles.card_right}></View>
                </TouchableOpacity>
            </View>
            <View  style={styles.card_holder}>
                <TouchableOpacity style={styles.button} onPress={()=>props.setNumber(3)}>
                    <View style={(props.number==3)?styles.card_selected:styles.card}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>props.setNumber(4)}>
                    <View style={(props.number==4)?styles.card_right_selected:styles.card_right}></View>    
                </TouchableOpacity>
            </View>
        </View>
    </View>
    <View style={{flex:1,}}>
        <Text style={styles.header}>Back Card</Text>
        <View  style={{flexDirection:"row",marginLeft:5,marginBottom:15, flex:1}}>
            <TouchableOpacity style={styles.button} onPress={()=>{}}>
                <View style={styles.card_selected}></View>
            </TouchableOpacity>
        </View>
    </View>
</View>
  );
};

const styles = StyleSheet.create({
    card_container:{
        backgroundColor:"#f9f9f9",
        alignItems:"center",
        paddingTop:10,
        
    },
    card_holder:{
        flexDirection:"row",
        alignItems:"center", 
        flex:1,
        justifyContent:'space-between',

    },
    button:{
        flex:1,
        marginHorizontal:10,
        width:"100%"
    },
    header:{
        fontSize:17,
        color:"#2d2d2d",
        fontWeight:"bold",
        paddingTop:20,
        marginHorizontal:"5%",
        textAlign:'center'
    },
    card:{
        backgroundColor:"#fff",
        height:70,
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
        marginLeft:5,
        borderWidth:1,
    },
     card_selected:{
        backgroundColor:"#fff",
        height:70,
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
        marginLeft:5,
        borderWidth:1,
        borderColor:"#00bd84"
    },
    card_right:{
        backgroundColor:"#fff",
        height:70,
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
        marginRight:5,
        borderWidth:1,
    },
    card_right_selected:{
        backgroundColor:"#fff",
        height:70,
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
        marginRight:5,
        borderWidth:1,
        borderColor:"#00bd84"
    
    },
      card_front_backs:{
          fontSize:20,
          color:'black',
          textAlign:'center',
          fontWeight:'600',
          padding:10,
      }
})

export default CardDesign;