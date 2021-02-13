import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import Loader from '../../components/Loader';
import Template from '../../components/Template'
import Template_header from '../../components/Template_header'

class Templates extends Component {
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
          for(let i=0;i<responseJson[1].templates.length;i++)
            data.push(responseJson[1].templates[i].path)
          this.setState({  
            isLoading: false,  
            links: data,
            count:responseJson[1].templates.length
           }, function(){  
             console.log(this.state.links)
           }); 
        })
        .catch((error) => {
          //dispatch({type:"SET_INVISIBLE"})
          console.log(error);
        });
    }
  state = {};
  render() {
    return (
              
      <SafeAreaView style={styles.container}>
               <Template_header title="Templates" redirectTo="Choose"/>

        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#ffffff"
          translucent={false}
        />
       <Loader loading={this.state.isLoading} />

       <ScrollView style={{flex:1,display:"flex"}}>
       <View style={{width:"90%",marginTop:15,marginBottom:7,shadowColor: '#bdbdbd',
  shadowOpacity: 1,
  elevation: 20, 
  marginLeft:"5%",
shadowOffset:{
    width:2,height:2
},}}>
  
        <Template />
        
        


       </View>
       
       </ScrollView>

      </SafeAreaView>
    );
  }
}



export default Templates;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    display:"flex"
  },
});
