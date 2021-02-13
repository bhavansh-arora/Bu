import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {TextInput} from 'react-native-paper';
import socket from '../../socket/socketConn.js';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

function ChattingScreen({navigation, route}) {
  // const messages = [];
  const scrollViewRef = useRef();
  const [textMessage, setTextMessage] = useState([]);
  const [sentMessage, setSentMessage] = useState({});
  const [messageValue, setMessageValue] = useState([]);
  const [showDelete, setShowDelete] = useState(false)
  const [selected,setSelected] = useState(null)

  const [userOnlineStatus, setUserOnlineStatus] = useState('');

  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [id, setId] = useState('');
  const [selectedColor, setSelectedColor] = useState(true)

  const colorCode = 'transparent';

  // Store data to local storage

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messageValue));
    } catch (e) {
     // alert(e);
    }
  };

  // Read data from local storage

  const readData = async () => {
    try {
      const em = await AsyncStorage.getItem('email');
      const uid = await AsyncStorage.getItem('id');
      const messages = await AsyncStorage.getItem('messages');
      

      if (em !== null) {
        setUserLoggedIn(em);
      }

      if (uid !== null) {
        setId(uid);
      }
      if (messages !== null) {
        setMessageValue(JSON.parse(messages));
      }
    } catch (e) {
      // alert(e);
    }
  };

  // read data

  useEffect(() => {
    readData();
  }, []);

  // timeStamp

  const timestampFormat = (time) => {
    var ts = new Date(time).toLocaleTimeString();
    // console.log(ts);
    return ts.length === 11
      ? ts.slice(0, 5) + ' ' + ts.slice(-2)
      : ts.slice(0, 4) + ' ' + ts.slice(-2);
  };

  // user online socket status

  useEffect(() => {
    if (id) {
      socket.emit('user-joined-server', {userId: id});
    }
  }, [id]);

  setInterval(() => {
    socket.emit('check-online-status', {
      roomUser1: route.params.roomUsers[0],
    });
    socket.on('confirm-online-status', (onlineStatus) => {
      setUserOnlineStatus(onlineStatus.userStatus);
    });
  }, 100);

  //  send messange function

  function handlePress() {
    if (textMessage.length > 0) {
      const utcDate = new Date();
      const currentTime = timestampFormat(utcDate.toUTCString());
      setSentMessage({
        sendTo: route.params.roomUsers[0],
        sendBy: route.params.roomUsers[1],
        message: textMessage,
        time: currentTime,
      });
      setTextMessage('');
    } else {
      return;
    }
  }

  useEffect(() => {
    if (messageValue.length > 0) {
      storeData();
    }
  }, [messageValue]);

  //  save and emit messagechat

  useEffect(() => {
    if (Object.entries(sentMessage).length > 0) {
      socket.emit('send-message', sentMessage);
      setMessageValue((prevState) => [...prevState, sentMessage]);
      setSentMessage({});
    }
  }, [sentMessage]);

  // save received message

  useEffect(() => {
    socket.off().on('receive-message', (message) => {
      if (message) {
        setMessageValue((prevState) => [...prevState, message]);
      }
    });
  });

  // code

  async function deleteMsg(t){
    console.log(t)
    var temp = []
    for(var i = 0;i<messageValue.length;i++)
    {
      var isPresent = false
      for(var e = 0;e<t.length;e++)
      {
        
        if(messageValue[i].sendBy==t[e].sendBy && messageValue[i].sendTo==t[e].sendTo && messageValue[i].message==t[e].message && messageValue[i].time == t[e].time)
          {
            isPresent=true;
          }
      }
      if(isPresent)
        continue;
      temp.push(messageValue[i])
    }
    console.log(messageValue.length, temp.length)
    setMessageValue(temp)
    setSelected([])
    await AsyncStorage.setItem('messages', temp);
    setShowDelete(false)
  }

  function isInSelected(e){
    
    if(selected!=null)
    {
      var temp = selected
      for(var i = 0;i<temp.length;i++)
      {
        if(temp[i].sendBy==e.sendBy && temp[i].sendTo==e.sendTo && temp[i].message==e.message && temp[i].time == e.time)
          {
            return true
            break;
          }
      }}
      return false
  }

  function afterSelection(){
    if(showDelete)
      return <TouchableOpacity onPress={()=>{deleteMsg(selected)}}>
      <Image
          width="20"
          height="20"
          style={{alignSelf: 'center'}}
          source={require('../../assets/delete.png')}
          style={{marginLeft: 155,height:30, width:30}}
        />
        </TouchableOpacity>
      else return <></>
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#4ad1aa',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1%',
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Chat');
            }}>
            <SvgUri
              width="20"
              height="20"
              style={{alignSelf: 'center'}}
              source={require('../../assets/arrow_back_ios.svg')}
              style={{marginLeft: 15}}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/girl.png')}
            style={{
              width: 40,
              height: 40,
              marginBottom: 5,
              borderRadius: 50,
              marginLeft: 5,
            }}
          />
          <Text style={{margin: 5, fontWeight: 'bold', fontSize: 17}}>
            <Text>{route.params.userName + '\n'}</Text>
            <Text>{userOnlineStatus}</Text>
          </Text>
          {afterSelection()}
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginRight: 15,
            justifyContent: 'space-evenly',
            width: '30%',
          }}></View>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 60,
          paddingBottom: 10,
          backgroundColor: '#ECE5DD',
        }}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {messageValue.map((e) => {
            if (
              route.params.roomUsers.includes(e.sendBy) &&
              route.params.roomUsers.includes(e.sendTo)
            ) {
              return (
                <TouchableOpacity onPress={()=>console.log("Pressed")} onLongPress={()=>{
                  if(showDelete)
                  {
                    var temp = selected
                     var isPresent = isInSelected(e)
                      if(isPresent){
                        var temp2 = []
                        for(var i = 0;i<temp.length;i++)
                        {
                          if(temp[i].sendBy==e.sendBy && temp[i].sendTo==e.sendTo && temp[i].message==e.message && temp[i].time == e.time)
                            {
                              continue
                            }
                            temp2.push(temp[i])
                        }
                        temp = temp2
                      }
                      else{
                        temp.push(e)
                      }
                    if(temp.length==0){
                      setShowDelete(false)
                      setSelected(null)
                    }
                    else {
                      setSelected(temp)
                    }
                    
                  }
                  else{
                    setShowDelete(true)
                    var temp = []
                    temp.push(e)
                    setSelected(temp)
                  }
                  setSelectedColor(!selectedColor)
                }}>
                <Text
                  key={uuid.v4()}
                  style={
                    e.sendBy == id ? isInSelected(e) ? {...styles.chat_sent, backgroundColor:'#AAAAFF'}:styles.chat_sent : isInSelected(e) ? {...styles.chat_received, backgroundColor:'AAAAFF'}:styles.chat_received
                  }>
                  {e.message}
                </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#4ad1aa',
          shadowOffset: {height: 2},
          shadowColor: '#bdbdbd',
          shadowOpacity: 0.5,
          bottom: 0,

          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
        }}>
        <View
          style={{
            backgroundColor: '#ddd',
            width: '75%',
            marginLeft: 15,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            height="40"
            placeholder="Type your message"
            style={styles.password_input_focused}
            onChangeText={(e) => {
              setTextMessage(e);
            }}
            value={textMessage}
          />
        </View>
        <TouchableOpacity onPress={() => handlePress()}>
          <View
            style={{
              backgroundColor: `${colorCode}`,
              width: 'auto',
              marginRight: 15,
              height: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SvgUri
              width="20"
              height="20"
              style={{alignSelf: 'center', paddingHorizontal: 15}}
              source={require('../../assets/send.svg')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChattingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  password_input_focused: {
    height: 40,
    fontSize: 14,
    width: '100%',
  },
  chat_sent: {
    backgroundColor: '#DCF8C6',
    paddingVertical: 10,
    color: '#000',
    fontWeight: 'normal',
    borderRadius: 10,
    paddingHorizontal: 15,
    maxWidth: '70%',
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  chat_sent_selected: {
    backgroundColor: '#AAAAFF',
    paddingVertical: 10,
    color: '#000',
    fontWeight: 'normal',
    borderRadius: 10,
    paddingHorizontal: 15,
    maxWidth: '70%',
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  chat_received: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    color: '#000',
    fontWeight: 'normal',
    borderRadius: 10,
    borderRadius: 50,
    paddingHorizontal: 15,
    maxWidth: '70%',
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
});
