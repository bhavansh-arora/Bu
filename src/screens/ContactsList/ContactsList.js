import React, {useState, useEffect} from 'react';
import Header from '../../components/Design_header';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import CardDynamic from '../../components/Card1';

function ContactsList({navigation}) {
  const [email, setEmail] = useState();
  const [contactList, setContactList] = useState([]);

  const [sharingId, setSharingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  readData = async () => {
    try {
      const uid = await AsyncStorage.getItem('sharing_id');
      const email = await AsyncStorage.getItem('email');
      const contacts = await AsyncStorage.getItem('contacts');

      // const uid = '5ff3fd145d65f400045da9ba';

      if (uid !== null) {
        setSharingId(uid);
     //   alert('hi');
      }

      if (contacts !== null) {
        setContactList(JSON.parse(contacts));
      }
      if (email !== null) {
        setEmail(email);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    if (sharingId !== null) {
      fetch('https://api-buca.herokuapp.com/addcontact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          currentUser: email,
          addUser: sharingId,
        },
      })
        .then((response) => {
          // console.log(response);
          setIsLoading(false);
          setSharingId('');
        }) //If response is in json then in success

        .catch((error) => {
          //dispatch({type:"SET_INVISIBLE"})
          alert('catch error' + error);
          setIsLoading(false);
          setSharingId('');
        });
    } else {
      setIsLoading(false);
      setSharingId('');
    }
  }, [sharingId]);

  return (
    <SafeAreaView style={[styles.scene, {backgroundColor: '#fff', flex: 1}]}>
      {/* <Loader loading={this.state.isLoading} /> */}
      <Header title="Contacts List" />
      <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
        {contactList.map((element) => {
          return (
            <View style={{marginLeft: '5%', width: '90%'}}>
              <CardDynamic
                image_size="70"
                svg_width="12"
                svg_width_pin="14"
                value={1} 
                big={true} 
                address={element.address}
                position={element.position}
                fontColor = "black"
                fontSize = {12}
                fontFamily = "Champagne"
                underline = "none"
                profilePhoto = {element.profileImage}
                bg = {element.background}
                big={true} 
                name={element.name}
                phone={element.phNumber}
                email={element.email}
              />
            </View>
          );
        })}
      </ScrollView>

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
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat');
          }}>
          <Image
          
          source={require('../../assets/comment-1.png')}
          onPress={() => {
            alert('hello');
          }}
          style={{width:25,
          height:25}}
        />
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <SvgUri
            width="25"
            height="25"
            source={require('../../assets/contact.svg')}
            fill="#00bd89"
            onPress={() => {
              alert('hello');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ContactsList;

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
