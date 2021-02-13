import React from 'react'
import {Text,StyleSheet} from 'react-native'

function Input_header(props) {
    return (
      
<Text style={styles.password_label}>{props.header}</Text>
      
    )
}

export default Input_header
const styles= StyleSheet.create({
    password_label: {
        marginTop: '3%',
        fontSize: 17,
        color: '#2d2d2d',
        width: '90%',
      },
})