import React,{useState} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,Text,SafeAreaView,ScrollView,StatusBar, Image} from 'react-native'
import SvgUri from 'react-native-svg-uri';


function CreateYourOwnDesign({navigation}) {
    return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
    <View>
        <View style={{marginLeft:25,paddingTop:45}}>
            <Text style={{fontSize:35, fontWeight:'bold', color:'#000'}}>Have something else in mind?</Text>
        </View>
    </View>
    <Image source={require('../../assets/create-from-scratch.png')} style={{height:"50%", width:"90%", marginTop:35, alignSelf:'center'}}/>
    <View>
        <View style={{marginLeft:25,paddingTop:45}}>
            <Text style={{fontSize:25, fontWeight:'bold', color:'#000'}}>Create your own</Text>
        </View>
    </View>
    <View style={{margin:15, paddingTop:20, alignItems:'flex-end', flexDirection:'row',position:'absolute', bottom:0,right:0, }}>
        <TouchableOpacity onPress={()=> navigation.navigate('BuiltDesign') } style={{margin:35}}>
        <Text style={{fontSize:20, color:'#00bd89', alignSelf:'flex-end'}}>Continue </Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
    )
}

export default CreateYourOwnDesign
