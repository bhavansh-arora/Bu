import React, { Component } from 'react'
import {StyleSheet,View,ScrollView,Text,TouchableOpacity,TextInput,ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

const image = { uri: "https://cards-path.herokuapp.com/basic1- A.png" };

class Templates extends Component{
  
  state ={ isLoading: true,
    links:[],
  count:0}  
    componentWillMount() {
      fetch('https://api-buca.herokuapp.com/template', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json()) //If response is in json then in success
  
        .then((responseJson) => {
          //  dispatch({type:"SET_INVISIBLE"})
          //alert(responseJson.path);
          const data = []
          for(let i=1;i<4;i++)
            data.push(responseJson[i].templates[0].path)
          this.setState({  
            isLoading: false,  
            links: data,
            count:3
           }, function(){  
             console.log(this.state.links)
           }); 
        })
        .catch((error) => {
          //dispatch({type:"SET_INVISIBLE"})
          console.log(error);
        });
    }
  render(){
    const storeData = async (image_url,type) => {
      try {
       await AsyncStorage.setItem('background',image_url)
       await AsyncStorage.setItem('cardType', JSON.stringify(type))
       // alert('Data successfully saved')
      } catch (e) {
        alert(e)
      }
    }
  
    const { navigation } = this.props;

  
      return [...Array(this.state.count)].map((elementInArray, index) => (
<TouchableOpacity onPress={()=>{
  storeData(this.state.links[index],index+1)
navigation.navigate("BuiltDesign")
}}>
      <ImageBackground source={{uri:this.state.links[index]}} imageStyle={{ borderRadius: 10}} style={{width:"100%",height:175,shadowColor: '#bdbdbd',
  shadowOpacity: 1,
  elevation: 20, 
shadowOffset:{
    width:2,height:2
},
marginTop:20}} />
</TouchableOpacity>
      
      

      ));

  }
}
export default function(props) {
  const navigation = useNavigation();

  return <Templates {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({

})