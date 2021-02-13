import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Chat_name({navigation, name, user, socket}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ChattingScreen', {
          userName: name,
          roomUsers: user,
          socket: socket,
        });
      }}>
      <View style={styles.container}>
        <View style={{flex: 1, marginLeft: 15}}>
          <Image
            source={require('../assets/girl.png')}
            style={{width: 50, height: 50}}
          />
        </View>
        <View style={{flex: 3, justifyContent: 'space-around'}}>
          <Text style={{margin: 5, fontWeight: 'bold'}}>{name}</Text>
          <Text style={{margin: 5}}>Hello! How r u?</Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={{margin: 5, fontWeight: '500'}}>3m ago</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Chat_name;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
