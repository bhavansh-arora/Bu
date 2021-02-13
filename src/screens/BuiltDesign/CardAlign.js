import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';

const CardAlign = () => {

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Align Elements</Text>
            <Image source={require('../../assets/position.png')} style={styles.image}/>
            <Text style={styles.header}>Divide Space</Text>
            <Image source={require('../../assets/position2.png')} style={styles.image}/>
        </View>
    )

    };

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    header:{
        fontSize:18
    },
    image:{
        flex:1,
        flexDirection:'row',
        height:275,
        width:225
    }
});

export default CardAlign;