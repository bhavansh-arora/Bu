import React from 'react';
import {StyleSheet, Text, View,SafeAreaView,TextInput,Button} from 'react-native';
export default function Input_Label(props){


return(
<View>
        <Text style={styles.input_label}>{props.label}</Text>
</View>
);

}

const styles = StyleSheet.create({

        input_label:{
                fontSize:17,
                color:"#8e8e93",
                width:"100%",
                marginTop:"35%"
        
          }
    
})