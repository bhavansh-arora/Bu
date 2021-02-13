import React, {useState,useEffect,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDispatch, connect} from 'react-redux';
import Login_header from '../../components/Login_header';
import Loader from '../../components/Loader';
import {showLoader, login,loginAuth} from '../../action/login-registration';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import BottomSheet from 'reanimated-bottom-sheet';
import firebase from "react-native-firebase";
import socket from '../../socket/socketConn.js';


function LoginIndex({route,...props}) {
  const {
    navigation,
    loading,
    showLoader,
    login,
    errorFieldType,
    errorMessage,
    redirectTo,
    _id,
    register,
    phNumber,
    name,
    countryCode,
    contactList,
    position,
    address,
    background,
    profilePhoto,
    instagramid,
    facebookId,
    linkedInId,
    website,
    loginAuth
  } = props;

  const sheetRef = React.useRef(null);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [email_focused, setemailfocus] = useState(false);
  const [password_focused, setpasswordfocus] = useState(false);
  const [emailErr,setEmailErr] = useState('')
  const [passErr,setPassErr] = useState('')
  var LocalAuth = require('react-native-local-auth')
  const [authenticated, setAuthenticated] = useState(false)
  const [biometery, setBiometery] = useState(false)
  const ScreenHeight = Dimensions.get('window').height;
  const[resetEmail, setResetEmail] = useState('')
  const [resetEmailErr, setResetEmailErr] = useState('')
  const[isRedirectedTo, setIsRedirectedTo] = useState(false)
  const [isRememberMe, setIsRememberMe] = useState(false)
  const [loadingForgotPass, setLoadingForgotPass] = useState(false)
  const [fcmToken, setFcmToken] = useState('')
  const refRBSheet = useRef();

  useEffect(() => {
    retrieveData()
    firebase.messaging().getToken().then((res)=>{
      setFcmToken(res)
    })
    GoogleSignin.configure({
      webClientId: '662013247666-l9cbdeljruuamv0m9b8flq4apq93udh9.apps.googleusercontent.com',
      offlineAccess: false,
      forceCodeForRefreshToken: true,
      iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, [])

  async function storeOffline(){
    var URL = `http://api-buca.herokuapp.com/getOfflineChats/${_id}`
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
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('id', _id);
      await AsyncStorage.setItem('phone', '' + phNumber);
      await AsyncStorage.setItem('cc', '' + countryCode);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('contacts', JSON.stringify(contactList));
      await AsyncStorage.setItem('authenticated', JSON.stringify(authenticated))
      await AsyncStorage.setItem('biometery', JSON.stringify(biometery));
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('position',position);
      await AsyncStorage.setItem('address',address);
      await AsyncStorage.setItem('toggle', JSON.stringify(true))
      if(position)
        await AsyncStorage.setItem('position', position)
      if(website)
        await AsyncStorage.setItem('websitelink',website)
      if(instagramid)
        await AsyncStorage.setItem('instagramid',instagramid)
      if(facebookId)
        await AsyncStorage.setItem('facebookid',facebookId)
      if(linkedInId)
        await AsyncStorage.setItem('linkedinid',linkedInId)
      if(profilePhoto)
        await AsyncStorage.setItem('profilepicture',JSON.stringify(profilePhoto))
      if(background)
        await AsyncStorage.setItem('background',JSON.stringify(background))

     // alert('Data successfully saved')
    } catch (e) {
      alert(e);
    }
  }

  const retrieveData = async () => {
    try{
      if(JSON.parse(await AsyncStorage.getItem('toggle')))
        {
          setIsRedirectedTo(true)
        }
        console.log(JSON.parse(await AsyncStorage.getItem('toggle')))
      if(JSON.parse(await AsyncStorage.getItem('biometery')))
        setBiometery(true)
      const pw = await AsyncStorage.getItem('password')
      const em= await AsyncStorage.getItem('email')
      const id = await AsyncStorage.getItem('id')
      if (id) {
        socket.emit('user-joined-server', {userId: id});
      }
      await AsyncStorage.getItem('redirect').then(async(v)=>{
        console.log(v)
      })
      await AsyncStorage.getItem('email').then(async(val)=>{
          await AsyncStorage.getItem('password').then((pass)=>{
            firebase.messaging().getToken().then((fcm)=>{
              console.log("email", val, "PASS", pass,fcm)
              if(val)
                {showLoader()
                  //navigation.navigate('Dashboard')
                storeData()
                loginAuth({
                  email: val,
                  password: pass,
                  deviceToken: fcm
                });}
            })
            if(val && pass){
              /*
              */
            }
          })

      })
      if(em)
      {
        setemail(em)
        //console.log("email", email.length, "EMPTY", em.length)
      }
      if(pw)
      {
        setpassword(pw)
        //console.log("pass", password.length, "EMPTY", pw.length)
      }
    } catch(e){
      alert(e)
    }
  }

  const onemailFocus = () => {
    setemailfocus(true);
    setpasswordfocus(false);
  };
  const onpassFocus = () => {
    setpasswordfocus(true);
    setemailfocus(false);
  };
  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
  }
 const checkEmail = () => {
  if(validate(email)){
      setEmailErr("")

    return true;
  }
  else{
      setEmailErr("*enter valid email")

    return false;
  }
 }
 const checkResetEmail = () => {
  if(validate(resetEmail)){
      setResetEmailErr("")

    return true;
  }
  else{
      setResetEmailErr("*enter valid email")

    return false;
  }
 }
  const check_pass = () => {
    if(checkEmail()){
      if(password.length>=6){
    setPassErr("")
      return true;
      }
      else{
        setPassErr("*enter a valid password")
      return false;
      }
    }
  }




  const make_api_call = async () => {
    if(check_pass()){
        {
           {
            showLoader()
          {
            setIsRememberMe(true)
            setBiometery(true)
            setAuthenticated(true)
              loginAuth({
                email: email,
                password: password,
                deviceToken: fcmToken,
              });
            setIsRedirectedTo(true)
            storeData()
          }
    }
  }
//checkEmail();
  };
  }

  function resetEmailSent()
  {
    setResetEmailErr("Password has been sent to your email")
    setLoadingForgotPass(false)
  }
  const forgot_password = () => {
    setLoadingForgotPass(true);
    if(!checkResetEmail())
      {
        setLoadingForgotPass(false)
        return false;}
    console.log("Reseting password")
    fetch('https://api-buca.herokuapp.com/reset', {
      method: 'POST',
      body:({
        email: email,
        })
    }).then(resetEmailSent());
  }

  function getInfoFromToken (token) {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log(user)
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  function loginWithFacebook () {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user)
      navigation.navigate('Register', {user:userInfo})
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  const renderInner = () => (
    <View style={{padding:20, backgroundColor:'#fff', height:300}}>
      <Text style={styles.password_label}>Enter your email address</Text>
          <TextInput
            autoCapitalize="none"
            value={resetEmail}
            placeholder="Enter your email"
            style=
             {emailErr||errorFieldType=="email"?styles.password_input_error:(  email_focused
                ? styles.password_input_focused
                : styles.password_input_style)
            }
            onChangeText={(val) => setResetEmail(val)}
            onFocus={() => {onemailFocus()}}
          />
          <TouchableOpacity
            onPress={() => forgot_password()}
            style={{marginTop:'5%'}}>
            <View style={styles.buuton_login}>
              <Text style={styles.button_text}>Send Steps to email</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.errorLabel}>{resetEmailErr}</Text>
    </View>
  )

  const renderHeader = () => (
    <>
    <View style={styles.forgot_header}>
      <View style={styles.forgot_panel_header}>
        <View style={styles.forgot_panel_handle}></View>
      </View>
    </View>
    </>
  )


  if (isRedirectedTo) {
  if(redirectTo)
    {
      storeData()
      navigation.navigate(redirectTo)
      storeOffline()
    }
  }

  if(loadingForgotPass)
    {
      return(
        <Loader loading={true}/>
      )
    }

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        initialSnap={1}
        borderRadius={10}
        renderContent={renderInner}
        renderHeader={renderHeader}
        onCloseEnd = {()=> {setResetEmail("")
      setResetEmailErr("")}}
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
            height: 220,
            alignItems: 'center',
            width:"100%"
          },
        }}
        animationType="slide">
            <View style={{ backgroundColor:'#fff', height:325,width:"90%"}}>
      <Text style={styles.password_label}>Email Address</Text>
      <Text style={styles.errorLabel}>{resetEmailErr}</Text>

          <TextInput
            autoCapitalize="none"
            value={resetEmail}
            placeholder="Enter your email"
            style=
             {emailErr||errorFieldType=="email"?styles.password_input_error:(  email_focused
                ? styles.password_input_focused
                : styles.password_input_style)
            }
            onChangeText={(val) => setResetEmail(val)}
            onFocus={() => {onemailFocus()}}
          />
          <TouchableOpacity
            onPress={() => forgot_password()}
            style={{marginTop:'5%'}}>
            <View style={styles.buuton_login}>
              <Text style={styles.button_text}>Reset Password</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.errorLabel}>{resetEmailErr}</Text>
    </View>
        </RBSheet>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
      <Loader loading={loading} />

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginHorizontal: 20, maxHeight: ScreenHeight, height: 'auto'}}>
        <Login_header title="Login" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.password_label}>Email Address</Text>
            <Text style={styles.errorLabel}>
              {emailErr.length != 0
                ? emailErr
                : errorFieldType == 'email'
                ? errorMessage
                : ''}
            </Text>
          </View>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your email"
            style={
              emailErr || errorFieldType == 'email'
                ? styles.password_input_error
                : email_focused
                ? styles.password_input_focused
                : styles.password_input_style
            }
            onChangeText={(val) => setemail(val)}
            onFocus={() => onemailFocus()}
          />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.password_label}>Password</Text>
            <Text style={styles.errorLabel}>
              {passErr.length != 0
                ? passErr
                : errorFieldType == 'password'
                ? errorMessage
                : ''}
            </Text>
          </View>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your password"
            style={
              passErr || errorFieldType == 'password'
                ? styles.password_input_error
                : password_focused
                ? styles.password_input_focused
                : styles.password_input_style
            }
            onChangeText={(val) => setpassword(val)}
            onFocus={() => onpassFocus()}
            secureTextEntry={true}
          />
          <View style={styles.remember_forget}>
            <TouchableOpacity
              onPress={()=> refRBSheet.current.open()}>
              <Text style={styles.remember}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => make_api_call()}
            style={styles.touchable_login}>
            <View style={styles.buuton_login}>
              <Text style={styles.button_text}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.touchable_register}>
            <View style={styles.register_container}>
              <Text style={styles.account}>Don't have an account? </Text>
              <Text style={styles.register}>Register</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'space-around', flex:1, paddingTop:30}}>
          <TouchableOpacity
            onPress={() => loginWithFacebook()}
            style={{marginTop:'2%',flex:1}}>
            <View style={styles.facebook_login}>
              <Text style={styles.button_text}>Facebook</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => loginWithGoogle()}
            style={{marginTop:'2%',flex:1}}>
            <View style={styles.google_login}>
              <Text style={styles.button_text}>Google</Text>
            </View>
          </TouchableOpacity>
          </View>

          <View style={{height: 100}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loginReg.loading || false,
    errorFieldType: state.loginReg.errorFieldType || '',
    errorMessage: state.loginReg.errorMessage || '',
    redirectTo: state.loginReg.redirectTo || '',
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLoader: () => {
      dispatch(showLoader());
    },
    login: (data) => {
      dispatch(login(data));
    },
    loginAuth: (data) => {
      dispatch(loginAuth(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginIndex);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  password_label: {
    marginTop: '7%',
    fontSize: 17,
    color: '#2d2d2d',
  },
  errorLabel: {
    marginTop: 7,
    fontSize: 17,
    color: '#ff0000',
  },

  remember_forget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
  },
  remember: {
    color: '#00bd84',
    fontSize: 15,
  },
  facebook_login:{
    backgroundColor:'#08f',
    borderRadius: 5,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    padding:15,
    width:"95%",
    flex:1,
  },
  google_login:{
    backgroundColor:'#f40',
    borderRadius: 5,
    height: 52,
    padding:15,
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    flex:1,
  },
  forget: {
    color: '#00bd84',
    fontSize: 15,
    fontStyle: 'italic',
  },
  buuton_login: {
    backgroundColor: '#00bd84',
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  register: {
    fontSize: 17,
    color: '#00bd84',
    fontWeight: 'bold',
  },
  register_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  account: {
    fontSize: 17,
    color: '#2d2d2d',
  },

  password_input_style: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
  },
  password_input_focused: {
    borderWidth: 2,
    borderColor: '#00BD84',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
  },
  touchable_login: {
    marginTop: '30%',
  },
  touchable_register: {
    marginTop: '7%',
  },
  checked: {
    borderWidth: 1,
    borderColor: '#00bd84',
    height: 18,
    width: 18,
    borderRadius: 5,
    backgroundColor: '#00bd84',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center'
  },
  unchecked: {
    borderWidth: 1,
    borderColor: '#00bd84',
    height: 18,
    width: 18,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  password_input_error: {
    borderWidth: 2,
    borderColor: '#ff0000',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 7,
    fontSize: 14,
  },
  forgot_header:{
    backgroundColor:'#FFF',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  forgot_panel_header:{
    alignItems:'center',
  },
  forgot_panel_handle:{
    width:40,
    height:8,
    borderRadius:4,
    backgroundColor:'#898989',
    marginBottom:10
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
