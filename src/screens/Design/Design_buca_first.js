import React,{useState} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,Text,SafeAreaView,ScrollView,StatusBar, Image} from 'react-native'
import SvgUri from 'react-native-svg-uri';


function Design_buca_first({navigation}) {
    return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
    <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
    <Image source={require('../../assets/Buca_Project-1.png')} style={{height:"50%", width:"90%", marginTop:35, alignSelf:'center'}}/>
    <View>
        <View style={{flexDirection:'row', paddingLeft:25,paddingTop:45}}>
            <Text style={{fontSize:25, color:'#00bd89'}}>Welcome to </Text>
            <Text style={{fontSize:25, fontWeight:'bold'}}>buca</Text>
        </View>
        <View style={{marginLeft:25}}>
            <Text style={{fontSize:35, fontWeight:'bold'}}>A buissness card network</Text>
        </View>
    </View>
    <View style={{margin:15, paddingTop:20, alignItems:'flex-end'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Design')}>
        <Text style={{fontSize:20, color:'#00bd89', alignSelf:'flex-end'}}>Get started</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
    )
}

export default Design_buca_first
