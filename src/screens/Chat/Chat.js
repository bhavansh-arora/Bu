import React, {Component, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {color} from 'react-native-reanimated';
import SvgUri from 'react-native-svg-uri';
import Chat_name from '../../components/Chat_name';
import socket from '../../socket/socketConn.js';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

function FirstRoute() {
  const navigation = useNavigation();
  const [contactList, setContactList] = useState([]);
  const [id, setId] = useState('');
  const [messageValue, setMessageValue] = useState([]);
  const [store,setStore] = useState([])

  const readData = async () => {
    try {
      const contacts = await AsyncStorage.getItem('contacts');
      const uid = await AsyncStorage.getItem('id');
      const messages = await AsyncStorage.getItem('messages');
      const off = JSON.parse(await AsyncStorage.getItem('offlinechat')).data

      if (contacts !== null) {
        setContactList(JSON.parse(contacts));
      }
      if (uid !== null) {
        setId(uid);
      }
      if (messages !== null) {
        var msgs = JSON.parse(messages)
        setStore(JSON.parse(messages))
        if(off)
          {
            for(var i=0;i<off.length;i++){
              var temp = {
                message:off[i].message,
                sendBy:off[i].sendBy,
                sendTo:off[i].sendTo,
                time:off[i].time
              }
              msgs.push(temp)
            }
          }
        setMessageValue((msgs));
      }
    } catch (e) {
     // alert(e);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(store));
    } catch (e) {
   //   alert(e);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    if (id) {
      socket.emit('user-joined-server', {userId: id});
    }
  }, [id]);

  const timestampFormat = (time) => {
    var ts = new Date(time).toLocaleTimeString();
    // console.log(ts);
    return ts.length === 11
      ? ts.slice(0, 5) + ' ' + ts.slice(-2)
      : ts.slice(0, 4) + ' ' + ts.slice(-2);
  };

  useEffect(() => {
    socket.off().on('receive-message', (message) => {
      if (message) {
        setMessageValue((prevState) => [...prevState, message]);
        return;
      }
    });
  });

  useEffect(() => {
    if (messageValue.length > 0) {
      storeData();
      return;
    }
  }, [messageValue]);

  function contactListSimp(){
    if(!contactList)
      return
    return  contactList.map((element) => {
      var user = [element.id, id];

      return (
        <Chat_name
          key={element.email}
          navigation={navigation}
          name={element.name}
          user={user}
          messageValue={() => {
            if (messageValue.length > 0) {
              return messageValue;
            }
          }}
        />
      );
    })
  }

  return (
    <SafeAreaView style={[styles.scene, {backgroundColor: '#eee', flex: 1}]}>
      {contactListSimp()}

      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: '#00bd84',
          width: 70,
          height: 70,
          borderRadius: 35,
          bottom: 25,
          zIndex: 10,
          borderWidth: 5,
          borderColor: '#fff',
          justifyContent: 'center',
          zIndex: 2,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <SvgUri
            width="40"
            height="40"
            style={{alignSelf: 'center'}}
            source={require('../../assets/yourbuca.svg')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          backgroundColor: '#eee',
          shadowOffset: {height: 2},
          shadowColor: '#bdbdbd',
          shadowOpacity: 0.5,
          bottom: 0,
          zIndex: 1,
          width: '100%',
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
          alignItems: 'center'
        }}>
        <Image
          
          source={require('../../assets/comment-1-color.png')}
          onPress={() => {
            alert('hello');
          }}
          style={{width:25,
          height:25}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ContactsList');
            }}>
            <SvgUri
              width="25"
              height="25"
              source={require('../../assets/contact.svg')}
              onPress={() => {
                alert('hello');
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);
const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const initialLayout = {width: Dimensions.get('window').height};
function Chat() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'chats'},
    {key: 'second', title: 'groups'},
    {key: 'third', title: 'Calls'},
  ]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#00bd89'}}
      style={{backgroundColor: 'white'}}
      activeColor="#00bd89"
      inactiveColor="#aaa"
      labelStyle={{fontWeight: '500'}}
      pressColor="#00bd89"
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
        translucent={false}
      />
      <View
        style={{
          height: 40,
          marginLeft: 15,
          backgroundColor: '#fff',
          marginTop: 40,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: 25,
            paddingVertical: 5,
          }}>
          Your buca
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgUri
            width="25"
            height="25"
            source={require('../../assets/contact.svg')}
            onPress={() => {
              alert('hello');
            }}
            style={{margin: 5}}
          />

          <SvgUri
            width="25"
            height="25"
            source={require('../../assets/contact.svg')}
            onPress={() => {
              alert('hello');
            }}
          />
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        style={{flex: 1}}
      />
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#00bd89',
    height: 70,
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footer: {
    flex: 7,
  },
  header_text: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  profile: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  scene: {
    flex: 1,
  },
  header_text: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
