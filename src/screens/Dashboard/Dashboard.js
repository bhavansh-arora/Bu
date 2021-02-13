import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import FlipCard from 'react-native-flip';
import RBSheet from 'react-native-raw-bottom-sheet';
import SvgUri from 'react-native-svg-uri';
import CardDynamic from '../../components/CardDynamic';
import Card from '../../components/Card'

const windowHeight = Dimensions.get('window').height;
var margin = 0.125 * windowHeight - 76 + 8;
function Dashboard({navigation,...props}) {
  const refRBSheet = useRef();
  const {
    _id,
    name,
    phNumber,
    countryCode,
    contactList,
    email,
    address,
    position,
    background,
    profilePhoto,
    frontFontFamily,
    frontFontSize,
    cardType,
    frontFontColor,
    underline,
  }=props
console.log(background.uri ,"DASH")
  /*
  const [number,setNumber] = useState(1)
    const [fileUri, setFileUri] = useState('')
    const [address, setAddress] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [website, setWebsite] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('');
    const [cardType, setCardType] = useState(-1)
    const [fontColor, setFontColor] = useState('black')
    const [fontSize, setFontSize] = useState(12)
    const [fontFamily, setFontFamily] = useState('Champagne')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [background, setBackground] = useState('')
    const [name,setName] = useState('')
    const [phone, setPhone] = useState('')
    const [underline, setUnderLine] = useState('none')*/
    console.log(name)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 175,
            alignItems: 'center',
          },
        }}
        animationType="slide">
        <Text style={{fontSize: 17, fontWeight: '500'}}>Share your buca</Text>
        <View
          style={{
            width: '100%',
            height: 76,
            marginTop: margin,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{width: 60, alignItems: 'center'}}>
            <Image
              style={{height: 50, width: 50, resizeMode: 'cover'}}
              source={require('../../assets/whatsapp.png')}
            />

            <Text style={{fontWeight: '800', fontSize: 12, marginTop: 5}}>
              Whatsapp
            </Text>
          </View>
          <View style={{width: 60, alignItems: 'center'}}>
            <Image
              style={{height: 50, width: 50, resizeMode: 'cover'}}
              source={require('../../assets/email.png')}
            />

            <Text style={{fontWeight: '800', fontSize: 12, marginTop: 5}}>
              Email
            </Text>
          </View>
          <View style={{width: 60, alignItems: 'center'}}>
            <Image
              style={{height: 50, width: 50, resizeMode: 'cover'}}
              source={require('../../assets/sms.png')}
            />

            <Text style={{fontWeight: '800', fontSize: 12, marginTop: 5}}>
              SMS
            </Text>
          </View>
        </View>
      </RBSheet>
      <View style={styles.header}>
        <Text style={styles.header_text}>Your Buca</Text>
        <TouchableOpacity style={styles.edit_text} onPress={() => navigation.navigate('SettingsScreen')}>
          <Text style={styles.edit_text}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1, display: 'flex'}}>
        <View
          style={{
            width: '90%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: '5%',
            marginTop: 15,
            marginBottom: 15,
          }}>
          <TouchableOpacity
            style={styles.touchable_login}
            onPress={() => navigation.navigate('QrContainer')}>
            <View style={styles.buuton_login}>
              <SvgUri
                width="20"
                height="20"
                source={require('../../assets/qr_code.svg')}
                onPress={() => {
                  alert('hello');
                }}
              />

              <Text style={styles.button_text}>QR Code</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable_login}
            onPress={() => onShare()}>
            <View style={styles.buuton_login}>
              <Text style={styles.button_text}>Share</Text>
              <SvgUri
                width="20"
                height="20"
                source={require('../../assets/share.svg')}
                onPress={() => {
                  alert('hello');
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignItems: 'center', marginBottom: 40}} onPress={()=>console.log(profilePhoto)}>
          <FlipCard
            style={styles.card_container}
            side={1}
            front={
              <View style={{width:"90%"}}>
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

            }
            back={
                  <View style={{alignItems:"center",marginLeft:"2.5%",width:"90%",borderRadius:5}}>
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



            }
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center', backgroundColor: '#fff'}}>
          <View style={styles.tree_container}>
            <View
              style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{}}>You saved</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: '#00bd84',
                    fontSize: 30,
                    fontWeight: 'bold',
                    alignSelf: 'flex-end',
                  }}>
                  30
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 12,
                    color: '#8e8e93',
                    alignSelf: 'flex-end',
                  }}>
                  Trees
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 5,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}>
              <Image
                style={{height: 140, width: 205, resizeMode: 'cover',alignSelf:"flex-end"}}
                source={require('../../assets/trees.png')}
                onPress={() => {
                  alert('hello');
                }}
              />
            </View>
          </View>
        </View>

        <Text style={styles.header_left}>Badges</Text>
        <View style={styles.badge_container}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{
                alignSelf: 'center',
                height: 50,
                width: 50,
                resizeMode: 'cover',
              }}
              source={require('../../assets/perfectionist.png')}
            />
            <Text style={{fontSize: 10, marginTop: 5}}>Perfectionist</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{
                alignSelf: 'center',
                height: 50,
                width: 50,
                resizeMode: 'cover',
              }}
              source={require('../../assets/achiever.png')}
            />
            <Text style={{fontSize: 10, marginTop: 5}}>Achiever</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{
                alignSelf: 'center',
                height: 50,
                width: 50,
                resizeMode: 'cover',
              }}
              source={require('../../assets/scholar.png')}
            />
            <Text style={{fontSize: 10, marginTop: 5}}>Scholar</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{
                alignSelf: 'center',
                height: 50,
                width: 50,
                resizeMode: 'cover',
              }}
              source={require('../../assets/champion.png')}
            />
            <Text style={{fontSize: 10, marginTop: 5}}>Champion</Text>
          </View>
        </View>
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
        <SvgUri
          width="40"
          height="40"
          style={{alignSelf: 'center'}}
          source={require('../../assets/yourbuca.svg')}
        />
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
        <TouchableOpacity onPress={() => {
              navigation.navigate("Chat")
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
        <TouchableOpacity onPress={() => {
              navigation.navigate('ContactsList')
            }}>


          <SvgUri
            width="25"
            height="25"
            source={require('../../assets/contact.svg')}

          />
          </TouchableOpacity>
        </View>
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
    address: state.loginReg.address || '',
    position: state.loginReg.position || '',
    background: state.loginReg.background || '',
    profilePhoto: state.loginReg.profilePhoto || '',
    instagramid: state.loginReg.instagramid || '',
    facebookId: state.loginReg.facebookId || '',
    linkedInId: state.loginReg.linkedInId || '',
    website:state.loginReg.website || '',
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card_container: {
    backgroundColor: '#fff',
    shadowColor: '#bdbdbd',
    shadowOpacity: 1,
    elevation: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderColor: '#fff',

    marginBottom: 195,
    width: '100%',
    marginLeft: '5%',
  },
  header: {
    height: '10%',
    shadowOffset: {height: 2},
    shadowColor: '#bdbdbd',
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingBottom: 7,
    flexDirection: 'row',
    display: 'flex',
  },
  badge_container: {
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  header_text: {
    marginLeft: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 25,
    flex: 1,
    marginTop: '7%',
  },
  edit_text: {
    color: '#00bd84',
    marginTop: '9%',
    marginRight: 5,
    fontSize: 17,
    fontWeight: '500',
  },
  buuton_login: {
    backgroundColor: '#00bd84',
    borderRadius: 5,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button_text: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  touchable_login: {
    height: 42,
    paddingTop: 15,
    width: '40%',
  },

  tree_container: {
    width: '90%',
    shadowColor: '#bdbdbd',
    shadowOpacity: 1,
    elevation: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    flexDirection: 'row',
    height: 140,
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  header_left: {
    fontSize: 17,
    color: '#2d2d2d',
    fontWeight: '900',
    paddingTop: 20,
    marginHorizontal: '5%',
  },
});
