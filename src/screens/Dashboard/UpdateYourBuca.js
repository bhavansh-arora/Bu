import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import CardDynamic from '../../components/CardDynamic';
import {useDispatch, connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import Input_header from '../../components/Input_header';
import Header from '../../components/Design_header';
import SvgUri from 'react-native-svg-uri';
import AsyncStorage from '@react-native-community/async-storage';

function UpdateBuca({navigation,...props}) {
  const {
    _id,
    name,
    phNumber,
    countryCode,
    contactList,
    email,
    add,
    pos,
    background,
    profilePhoto,
    frontFontFamily,
    frontFontSize,
    cardType,
    frontFontColor,
    underline,
    linkedInId,
    facebookId,
    instagramid,
    web

  }=props

  const [linkedin, setLinkedin] = useState(linkedInId)
  const [instagram, setInstagram] = useState(facebookId)
  const [facebook, setFacebook] = useState(instagramid)
  const [website, setWebsite] = useState(web)
  const [address, setAddress] = useState(add)
  const [position, setPosition] = useState(pos)

  const retrieveData = async () =>{
    
}

useEffect(() => {
    retrieveData()
},[])

async function storeData(){
  if(position)
  {
    await AsyncStorage.setItem('position', position)
  }
  if(address)
  {
    await AsyncStorage.setItem('address', address)
  }
  if(linkedin)
  {
    await AsyncStorage.setItem('linkedinid', linkedin)
  }
  if(instagram)
  {
    await AsyncStorage.setItem('instagramid', instagram)
  }
  if(facebook)
  {
    await AsyncStorage.setItem('facebookid', facebook)
  }
  if(website)
  {
    await AsyncStorage.setItem('websitelink', website)
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
      <Header title="Your buca" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.footer}>

          <View style={{width: '90%'}}>
            <CardDynamic
              image_size="60"
              svg_width="12"
              svg_width_pin="14"
              value={cardType} 
              big={true} 
              address={address}
              position={position}
              fontColor = {frontFontColor}
              fontSize = {frontFontSize}
              fontFamily = {frontFontFamily}
              underline = {underline}
              profilePhoto = {profilePhoto}
              bg = {background}
              big={true}
              name={name}
              phone={phNumber}
              email={email} 
            />
          </View>

          <Input_header header="Address"  onChange={text => setAddress(text)}
      value={address}/>
          <TextInput
            value={address}
            onChangeText = {async (val) => {
              setAddress(val)
              //console.log(val)
            }}
            placeholder="Enter your address"
            style={styles.add_input}
            multiline={true}
            numberOfLines={2}
            minHeight={60}
          />
          <Input_header header="Linkedin ID" />
          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/linkedin.svg')}
            />
            <TextInput
               value={linkedin}
              onChangeText = {async (val) => {
                setLinkedin(val)
                //console.log(val)
              }}
              placeholder="Enter your linkedin id"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Instagram ID" />

          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/instagram.svg')}
            />
            <TextInput
            value={instagram}
            onChangeText = {async (val) => {
              setInstagram(val)
              //console.log(val)
            }}
              placeholder="Enter your instagram id"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Facebook ID" />

          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/facebook.svg')}
            />

            <TextInput
            value={facebook}
            onChangeText = {async (val) => {
              setFacebook(val)
              //console.log(val)
            }}
              placeholder="Enter your facebook id"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Website" />

          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/cv.svg')}
            />

            <TextInput
            value={website}
            onChangeText = {async (val) => {
              setWebsite(val)
              //console.log(val)
            }}
              placeholder="Enter your Website Link"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Position"  onChange={text => setPosition(text)}
      value={position} />
          <TextInput
          value={position}
          onChangeText = {async (val) => {
            setPosition(val)
            //console.log(val)
          }}
            autoCapitalize="none"
            style={styles.position_input_style}
          />
          <View style={{width: '90%', alignItems: 'flex-end'}}></View>
          <View style={{width: '90%', alignItems: 'flex-start'}}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                display: 'flex',
                marginTop: 20,
              }}
              onPress={() => {
                storeData()
                navigation.navigate('Choose')}}>
              <Text style={styles.text}>Change buca design</Text>
              <SvgUri
                width="22"
                height="22"
                style={{paddingLeft: 10}}
                source={require('../../assets/chevron_right.svg')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 10, marginTop: 20}} />
      </ScrollView>
      <View style={styles.bottom_bar}>
        <TouchableOpacity
          style={styles.touchable_login}
          onPress={() => {
            console.log(name)
            storeData()
            navigation.pop()
            }}>
          <View style={styles.buuton_login}>
            <Text style={styles.button_text}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    _id: state.loginReg._id || '',
    name: state.loginReg.name || '',
    phNumber: state.loginReg.phNumber || '',
    countryCode: state.loginReg.countryCode || '',
    contactList: state.loginReg.contactList || '',
    add: state.loginReg.address || '',
    pos: state.loginReg.position || '',
    background: state.loginReg.background || '',
    profilePhoto: state.loginReg.profilePhoto || '',
    instagramid: state.loginReg.instagramid || '',
    facebookId: state.loginReg.facebookId || '',
    linkedInId: state.loginReg.linkedInId || '',
    web:state.loginReg.website || '',
    cardType:state.loginReg.cardType || 1,
    email:state.loginReg.email || '',
    frontFontFamily:state.loginReg.frontFontFamily || 'Champagne',
    frontFontSize:state.loginReg.frontFontSize || 12,
    frontFontColor: state.loginReg.frontFontColor || 'black',
    underline:state.loginReg.underline || 'none'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBuca);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
  },
  header: {
    height: '10%',
    shadowOffset: {height: 2},
    shadowColor: '#bdbdbd',
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 7,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    height: '90%',
    marginTop: 10,
  },
  header_text: {
    fontSize: 17,
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  password_input_style: {
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    width: '90%',
    paddingRight: 10,
  },
  password_input_focused: {
    borderWidth: 2,
    borderColor: '#00BD84',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    width: '90%',
  },
  text: {
    color: '#00bd84',
    fontSize: 17,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  bottom_bar: {
    backgroundColor: '#fff',
    height: 100,
    shadowColor: '#bdbdbd',
    borderColor: '#bdbdbd',
    shadowOffset: {height: 0},
    shadowColor: '#bdbdbd',
    shadowOpacity: 20,
    elevation: 5,
  },
  buuton_login: {
    backgroundColor: '#00bd84',
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  touchable_login: {
    height: 42,
    paddingTop: 15,
  },
  position_input_style: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 7,
    fontSize: 17,
    width: '90%',
  },
  input_view: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 17,
    width: '90%',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_input: {
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 17,
    width: '90%',
    paddingRight: 10,
    borderWidth: 2,
    borderColor: '#bdbdbd',
  },
});
