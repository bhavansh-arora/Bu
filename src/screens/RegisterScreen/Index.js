import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Login_header from '../../components/Login_header';
import {useDispatch, connect} from 'react-redux';
import {showLoading,register} from '../../action/user-registration'
import Loader from '../../components/Loader';
import PhoneInput, {getDialCode} from 'react-native-phone-input'
import AsyncStorage from '@react-native-community/async-storage';
import {Tooltip} from 'react-native-elements';

function Index({...props}) {
  const {
    navigation,
    loading,
    showLoading,
    register,
    errorFieldType,
    errorMessage,
    redirectTo,
    success
  } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpassword,setcPassword] = useState('')
  const [email_focused, setEmailfocus] = useState(false);
  const [password_focused, setPasswordfocus] = useState(false);
  const [name_focused, setNamefocus] = useState(false);
  const [phone_focused, setPhonefocus] = useState(false);
  const [cpassword_focused, setcPasswordfocus] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [nameError,setNameError] = useState(null)
  const [emailError,setEmailError] = useState('')
  const [phoneError,setPhoneError] = useState('')
  const [passError,setPassError] = useState(null)
  const [cpassError,setcPassError] = useState(null)
  const [termsError, setTermsError] = useState('')
  const [countryCode, setCountryCode] = useState(34)

  var lookup = require('country-data').lookup;

  useEffect(() => {
    if(props.route.params)
    {
      if(props.route.params.user.user.email)
        setEmail(props.route.params.user.user.email)
      if(props.route.params.user.user.name)
        setName(props.route.params.user.user.name)
    }
    }, [])
  

    function renderToggle()
    {
      if(toggleCheckBox)
      {
        return(<Image
          style={{
            alignSelf: 'center', 
            width:10,
            height:10,
          }}
          source={require('../../assets/tick-white.png')}
          size={10}
        />)
      }
      return false
    }

  const ScreenHeight = Dimensions.get('window').height;
  function CheckToggle() {
    setToggleCheckBox(!toggleCheckBox);
  }
  
  const onEmailFocus = () => {
    setEmailfocus(true);
    setPasswordfocus(false);
    setcPasswordfocus(false);
    setNamefocus(false);
    setPhonefocus(false);
  };
  const onPassFocus = () => {
    setEmailfocus(false);
    setcPasswordfocus(false);
    setPasswordfocus(true);
    setNamefocus(false);
    setPhonefocus(false);
  };
  const onPhoneFocus = () => {
    setEmailfocus(false);
    setPasswordfocus(false);
    setcPasswordfocus(false);
    setNamefocus(false);
    setPhonefocus(true);
  };
  const oncPassFocus = () => {
    setEmailfocus(false);
    setcPasswordfocus(true);
    setPasswordfocus(false);
    setNamefocus(false);
    setPhonefocus(false);
  };
  const onNameFocus = () => {
    setEmailfocus(false);
    setPasswordfocus(false);
    setcPasswordfocus(false);
    setNamefocus(true);
    setPhonefocus(false);
  };
  const confirmPass = () => {
    if(checkPassword()){
      if(password==cpassword){
        setPassError("")
        setcPassError("")
        return true;
      }
      else{
        setPassError("*passwords don't match")
        setcPassError("*passwords don't match")
        return false;
      }
    }
  }
  const checkPassword = () => {
    if(checkPhone()){
if(password.length>=6){
  setPassError("")
  return true;
}
else{
  setPassError("*enter a valid password")
  return false;
}
    }
  }


  const checkPhone = () =>{
    if(checkEmail()){
if(phone.length>0){
  setPhoneError("")

  return true;
}
else{
  setPhoneError("*enter valid phone")

  return false;
}
    }
  }
 const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    }
    else {
      console.log("Email is Correct");
      return true;
    }
  }
  const checkEmail = () => {
    if(checkName()){
if(validate(email)){
  setEmailError("")
return true;
}
else{
  setEmailError("*enter valid email")
return false;
}
    }
  }
  const checkName = () => {
    if(name.length>0){
      setNameError("")

      return true;
    }
    else{
      setNameError("*enter valid name")

      return false;
    }
  }

  function checkTerms()
  {
    if(!toggleCheckBox)
    {
      setTermsError("*Accept terms and condition")
      return false
    }
    setTermsError("")
      return true
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('phone', '' + phone);
      await AsyncStorage.setItem('cc', '' + countryCode);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem(
        'background',
        'https://cards-path.herokuapp.com/basic1%20-%20A.png',
      );
      await AsyncStorage.setItem('password', password);

     // alert('Data successfully saved')
    } catch (e) {
      alert(e);
    }
  }

  const make_api_call = () => {
    if(confirmPass() && checkTerms()){
      storeData()
      showLoading();
      register({
      email: email,
        password: password,
        name: name,
        phNumber:phone,
        countryCode:countryCode
      });
    }



   /*  var formBody = [];

    var register_credentials = {
      email: email,
      password: password,
      fullName: name,
      loginType: 'usermanual',
      userType: 'individual',
      socialToken: 'abcd',
    };
    for (var property in register_credentials) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(register_credentials[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    fetch('https://buca-api.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.join('&'),
    })
      .then((response) =>
        response.status == 201
          ? (navigation.navigate('Home'),
            alert('Registration Successful', response.json()))
          : response.json(),
      )
      //If response is in json then in success
      .then((responseJson) => {
        //  dispatch({type:"SET_INVISIBLE"})
        alert(responseJson.message);
      })

      .catch((error) => {
        //dispatch({type:"SET_INVISIBLE"})
        alert(error);
      }); */
  };
  if (redirectTo) {
    console.log("redirectTo")
     navigation.navigate(redirectTo);
     return true;
   }
  return (
    <SafeAreaView style={styles.container}>
       <Loader loading={loading} />

      <View
        style={{marginHorizontal: 20, maxHeight: ScreenHeight, height: 'auto'}}>
        <Login_header title="Register" />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-between"}}>
        <Text style={styles.password_label}>Full Name</Text>
        <Text style={styles.errorLabel}>{nameError!=null ? nameError : ''}</Text>

        </View>
          <TextInput
            onChangeText={(val) => setName(val)}
            autoCapitalize="none"
            placeholder="Enter your full name"
            value={name}
            style={
              nameError
?styles.password_input_error
:(  !name_focused
                ? styles.password_input_style
                : styles.password_input_focused)
            }
            onFocus={() => onNameFocus()}
          />
        <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-between"}}>
        <Text style={styles.password_label}>Email</Text>
        <Text style={styles.errorLabel}>{emailError.length!=0  ? emailError :  (errorFieldType=="email"||errorFieldType=="emphone" ? errorMessage : '')}</Text>

        </View>

          <TextInput
            value={email}
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            style={emailError||errorFieldType=="email"||errorFieldType=="emphone"
?styles.password_input_error
:(  !email_focused
                ? styles.password_input_style
                : styles.password_input_focused)


            
            }
            placeholder="Enter your email"
            onFocus={() => onEmailFocus()}
          />
                  <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-between"}}>
                  <Text style={styles.password_label}>Phone Number</Text>
                  <Text style={styles.errorLabel}>{phoneError.length!=0 ? phoneError :  (errorFieldType=="phone"||errorFieldType=="emphone" ? errorMessage : '')}</Text>

                  </View>
                  <PhoneInput textProps={{placeholder:"000-0000-000", onFocus:() => onPhoneFocus(),}} initialCountry="es" onChangePhoneNumber={(val)=> {
                    setPhone(val)}}
                    getCountryCode = {true}
                    onSelectCountry = {(val)=>{setCountryCode(val.toUpperCase(),lookup.countries({alpha2:val.toUpperCase()})[0].countryCallingCodes[0])}} value={phone} style={phoneError||errorFieldType=="phone"||errorFieldType=="emphone" 
?styles.password_input_error
:(  phone_focused
                ? styles.password_input_focused
                : styles.password_input_style)}/>


                            <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-between"}}>
                            <Tooltip popover={<Text style={{color:'#fff', fontSize:10,}}>The password should be atleast 6 characters long</Text>}>
                            <Text style={styles.password_label}>Password</Text>
                            </Tooltip>
                            <Text style={styles.errorLabel}>{passError!=null ? passError :  errorFieldType=="password" ? errorMessage : ''}</Text>

                            </View>
          

          <TextInput
            onChangeText={(val) => setPassword(val)}
            autoCapitalize="none"
            secureTextEntry={true}

            style={
passError
?styles.password_input_error
:( password_focused
                ? styles.password_input_focused
                : styles.password_input_style)
              
             
            }
            placeholder="Enter your password"
            onFocus={() => onPassFocus()}
          />
                                      <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-between"}}>
                                      <Text style={styles.password_label}>Re-type password</Text>
                                      <Text style={styles.errorLabel}>{cpassError!=null ? cpassError : ''}</Text>

                                      </View>
                
          <TextInput
                      onChangeText={(val) => setcPassword(val)}
                      secureTextEntry={true}

            autoCapitalize="none"
            style={
cpassError
?styles.password_input_error
:( cpassword_focused
                ? styles.password_input_focused
                : styles.password_input_style)




              
            }
            placeholder="Re-enter your password"
            onFocus={() => oncPassFocus()}
          />
          <Text style={styles.TermsError}>{termsError}</Text>
           <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                
                }}
                onPress={() => CheckToggle()}>
                <View
                  style={toggleCheckBox ? styles.checked : styles.unchecked}>
                  {renderToggle()}
                </View>
                
                <Text style={styles.remember}>I read and agree to the terms and conditions.</Text>
              </TouchableOpacity>
          <TouchableOpacity
            onPress={() => make_api_call()}
            style={styles.touchable_login}>
            <View style={styles.buuton_login}>
              <Text style={styles.button_text}>Register</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Index')}
            style={styles.touchable_register}>
            <View style={styles.register_container}>
              <Text style={styles.account}>Already have account? </Text>
              <Text style={styles.register}>Login</Text>
            </View>
          </TouchableOpacity>
          <View style={{height: 100}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.userReg.loading || false,
    errorFieldType: state.userReg.errorFieldType || '',
    errorMessage: state.userReg.errorMessage || '',
    redirectTo: state.userReg.redirectTo || '',
    success: state.userReg.success || '',

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => {
      dispatch(showLoading());
    },
    register: (data) => {
      dispatch(register(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  password_input_style: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 7,
    fontSize: 14,
  },
  TermsError:{
    color:'#F00',
    marginTop:15,
    fontSize:15,
  },
  password_input_focused: {
    borderWidth: 2,
    borderColor: '#00bd84',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 7,
    fontSize: 14,
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
  password_label: {
    marginTop: '7%',
    fontSize: 17,
    color: '#2d2d2d',
  },
  tnc: {
    color: '#00bd84',
    fontSize: 15,
    marginTop: '8%',
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
  touchable_login: {
    height: 42,
    marginTop: '8%',
  },
  touchable_register: {
    marginTop: '7%',
  },
  checkbox: {
    alignSelf: 'center',
  },
  checked: {
    borderWidth: 1,
    borderColor: '#00bd84',
    height: 18,
    width: 18,
    borderRadius: 5,
    backgroundColor: '#00bd84',
    marginRight: 5,
    marginTop: '8%',
  },
  unchecked: {
    borderWidth: 1,
    borderColor: '#00bd84',
    height: 18,
    width: 18,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 5,
    marginTop: '8%',
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
  remember: {
    color: '#00bd84',
    fontSize: 15,
    marginLeft:5
  },
  errorLabel:{
    marginTop: '7%',
    fontSize: 17,
    color: '#ff0000',
  },
});
