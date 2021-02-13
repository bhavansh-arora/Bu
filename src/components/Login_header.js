import React from 'react';
import {StyleSheet, Text, View,SafeAreaView,TextInput,Button} from 'react-native';
export default function Login_header(props){
    return(
        <View>
        <Text style={styles.login_text}>{props.title}</Text>
        <View style={styles.welcome_container}>
        <Text style={styles.welcome_text}>Hi, welcome to </Text>
        <Text style={styles.buca}>buca</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    login_text:{
        color:"#00BD84",
        fontSize:34,
        fontWeight:"bold",
        marginTop:10
      },
      welcome_text:{
        fontSize:20,
        color:"#8E8E93"
      },
      welcome_container:{
        flexDirection:"row",
        alignItems:"center",
      },
      buca:{
        color:"#2d2d2d",
        fontSize:20,
        fontWeight:"bold",
        marginVertical:5
      },
})