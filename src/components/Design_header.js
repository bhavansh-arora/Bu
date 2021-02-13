import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
function Design_header(props) {
    return (
        <View style={styles.header}>
        <Text style={styles.header_text}>{props.title}</Text>
    </View>
    )
}

export default Design_header
const styles=StyleSheet.create({
    header:{
        height:"10%",
        shadowOffset: { height: 2 },
          shadowColor: '#bdbdbd',
          shadowOpacity: 0.5,
          elevation: 5,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"flex-end",
        paddingBottom:7,
        
        }
        ,header_text:{
            fontSize:17,
        color:"#2d2d2d",
        fontWeight:"bold"
        },
})
