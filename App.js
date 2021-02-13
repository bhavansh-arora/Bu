import React, {Component} from 'react';
import {Linking,Alert} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import DeepLinking from 'react-native-deep-linking';
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';
import notifee from '@notifee/react-native'

import Index from './src/screens/LoginScreen/Index';
import Register from './src/screens/RegisterScreen/Index';
import Home from './src/screens/Design/Design_buca';
import Design from './src/screens/HomeScreen/Home';
import Choose from './src/screens/Choose_templates/Choose_templates';
import CreateDesign from './src/components/CreateDesign';
import BuiltDesign from './src/screens/BuiltDesign/BuiltDesign';
import Dashboard from './src/screens/Dashboard/Dashboard';
import Qrgen from './src/screens/Qrgenerator/Qrgenerator';
import Templates from './src/screens/Templates/Templates';
import ReduxStore from './src/reducer/store';
import Chat from './src/screens/Chat/Chat';
import SettingsScreen from './src/screens/Dashboard/Settings';
import ChattingScreen from './src/screens/ChattingScreen/ChattingScreen';
import QrConatiner from './src/screens/QrContainer/QrContainer';
import ContactsList from './src/screens/ContactsList/ContactsList';
import Design_buca_first from './src/screens/Design/Design_buca_first';
import Design_buca_last from './src/screens/Design/Design_buca_last';
import test from './src/test'
import CreateYourOwnDesign from './src/screens/Choose_templates/createYourOwn'
import Design_buca_done from './src/screens/Design/Design_buca_done';
import updateYourBuca from './src/screens/Dashboard/UpdateYourBuca';
import UpdateYourBuca from './src/screens/Dashboard/UpdateYourBuca';

const Stack = createStackNavigator();
const initialNav = createStackNavigator();

export default function App() {


  return(
    <NavigationContainer independent={true}>
    <initialNav.Navigator initialRouteName="stack">
    <initialNav.Screen
      name="stack"
      component={DefApp}
      options={{headerShown: false}}/>
    <initialNav.Screen
      name="contact"
      component={ContactsList}
      options={{headerShown:false}}/>
    </initialNav.Navigator>
    </NavigationContainer>)
}

class DefApp extends Component {
  state = {
    response: {},
  };
  storeData = async (e) => {
    try {
      await AsyncStorage.setItem('sharing_id',e );
      var email = await AsyncStorage.getItem('email').then(()=>{
        var data = {
          addUser:e.data,
          currentUser:email,
        }
        axios({
          method:'POST',
          url:'https://api-buca.herokuapp.com/addcontact',
          data:qs.stringify(data),
          headers:{
              'content-type':'application/x-www-form-urlencoded;charset=utf-8'
          }
          });
        navigation.navigate("ContactsList")
      })


     // alert('Data successfully saved')
    } catch (e) {
      alert(e);
    }
  }

  /*

  example function for performance trace

async function customTrace() {
  // Define & start a trace
  const trace = await firebase.perf().startTrace('custom_trace');

  // Define trace meta details
  trace.putAttribute('user', 'abcd');
  trace.putMetric('credits', 30);

  // Stop the trace
  await trace.stop();
}
  */
  async componentDidMount() {

    //firebase

   // firebase.crashlytics().log('Test Message!');
    //firebase.crashlytics().recordError(37,"Test Error");
    DeepLinking.addScheme('https://buca.yourbuca');
    Linking.addEventListener('url', this.handleUrl);
    this.checkPermission();
    this.createNotificationListeners();
    DeepLinking.addRoute('/businessid', (response) => {
      this.setState({response});
    });

    DeepLinking.addRoute('/businessid/:id', (response) => {
      const {navigation }= this.props
      navigation.navigate("contact")
   //   this.setState({response});
   this.storeData(response.id)

    });

    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          DeepLinking.evaluateUrl(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }
  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method.
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token

        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {

    // This listener triggered when notification has been received in foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.displayNotification(title, body);
    });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.displayNotification(title, body);
    });

    // This listener triggered when app is closed and we click,tapped and opened notification
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.displayNotification(title, body);
    }
  }


  async displayNotification(title, body) {
    const channelId = await notifee.createChannel({
      id:'default',
      name:'Default Channel'
    })
    const contacts = await AsyncStorage.getItem('contacts');
    if(!title)
      {
        await notifee.displayNotification({
          title:body,
          body:body,
          android:{
            channelId,
          }
        })
      }
    else{
      fetch(URL, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then((response) => response.json()) //If response is in json then in success

          .then((responseJson) => {
              AsyncStorage.setItem('offlinechat', JSON.stringify(responseJson))
          })
          .catch((error) => {
            //dispatch({type:"SET_INVISIBLE"})
            console.log('catch error' + error);
          });
          var name
        for(var i = 0;i < contacts.length;i++){
          if(contacts[i].id == title)
            name = contacts[i].name
        }
        console.log(name)
      await notifee.displayNotification({
        title:body,
        body:body,
        android:{
          channelId,
        }
      })
    }
  }

  render() {
    return (
      <Provider store={ReduxStore}>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Design_buca_done" >
            <Stack.Screen
            name="createYourOwn"
            component={CreateYourOwnDesign}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="updateBuca"
            component={UpdateYourBuca}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Design_buca_done"
            component={Design_buca_done}
            options={{headerShown:false}}
            />
            <Stack.Screen
              name="Design_buca_first"
              component={Design_buca_first}
              options={{headerShown:false}}/>
            <Stack.Screen
              name="Design_buca_last"
              component={Design_buca_last}
              options={{headerShown:false}}/>
            <Stack.Screen
              name="Index"
              component={Index}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ContactsList"
              component={ContactsList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QrContainer"
              component={QrConatiner}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChattingScreen"
              component={ChattingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Design"
              component={Design}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Choose"
              component={Choose}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateDesign"
              component={CreateDesign}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BuiltDesign"
              component={BuiltDesign}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Qrgen"
              component={Qrgen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Templates"
              component={Templates}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="test"
              component={test}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

/*


*/
