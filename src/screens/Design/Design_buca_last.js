import React,{useState} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,Text,SafeAreaView,ScrollView,StatusBar, Image} from 'react-native'
import SvgUri from 'react-native-svg-uri';


function Design_buca_last({navigation}) {
    return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
    <Image source={require('../../assets/Buca_Project-2.png')} style={{height:"50%", width:"90%", marginTop:35, alignSelf:'center'}}/>
    <View>
        <View style={{marginLeft:25,paddingTop:45}}>
            <Text style={{fontSize:25, fontWeight:'bold', color:'#000'}}>You did it!</Text>
        </View>
        <View style={{flexDirection:'row', paddingLeft:25}}>
            <Text style={{fontSize:25, color:'#898989'}}>Create, explore and share </Text>
        </View>
    </View>
    <View style={{margin:15, paddingTop:20, alignItems:'flex-end', flexDirection:'row',position:'absolute', bottom:0,right:0, }}>
        <TouchableOpacity onPress={()=> navigation.navigate('Design_buca_done') } style={{margin:35}}>
        <Text style={{fontSize:20, color:'#00bd89', alignSelf:'flex-end'}}>Continue </Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
    )
}

export default Design_buca_last
