import React from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import { useNavigation } from '@react-navigation/native';

const ScreenWidth = Dimensions.get('window').width
function Template_header(props) {

       const navigation = useNavigation(); 

    return (
        <View style={styles.header}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <TouchableOpacity onPress={()=>{props.redirectTo=="Design"?navigation.navigate('Design'):(props.redirectTo=="Choose"?navigation.navigate('Choose'):'')}}>
                    <SvgUri width="22" height="22" style={{marginLeft:10}} source={require('../assets/arrow_back_ios.svg')} />
                    </TouchableOpacity>
                    <Text style={styles.header_text}>{props.title}</Text>
                    <Text style={styles.header_texta}>></Text>


        </View>

    </View>
    )
}

export default Template_header
const styles=StyleSheet.create({
    header:{
        height:"10%",
        shadowOffset: { height: 2 },
          shadowColor: '#bdbdbd',
          shadowOpacity: 0.5,
          elevation: 5,
        backgroundColor:"#fff",
        justifyContent:"flex-end",
        paddingBottom:7,
        
        }
        ,header_text:{
            fontSize:17,
        color:"#2d2d2d",
        fontWeight:"bold"
      
        },
        header_texta:{
            fontSize:22,
        color:"#fff",
        fontWeight:"bold",
        paddingRight:10
      
        },
})
