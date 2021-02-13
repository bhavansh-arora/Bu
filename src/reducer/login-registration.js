import AsyncStorage from '@react-native-community/async-storage';

export default function LoginReg(state = {}, action) {
  switch (action.type) {

    case 'SHOW_LOADER': {
      const newState = {...state};
      newState.loading = action.payload;
      newState.errorFieldType = '';
      newState.errorMessage='';
      return newState;
    }


    case 'HIDE_LOADER': {
      const newState = {...state};
      newState.showTostFlag = action.payload;
      return newState;
    }

    case 'CLEAR_REDIRECT': {

      const newState = {...state};
      newState.redirectTo = '';
      newState.id = '';
      return newState;
    }
    case 'LOGOUT':{
      const newState = {...state}
      newState.redirectTo = '';
      newState.email = '';
      return newState
    }

    case 'LOGIN': {
      const newState = {...state};
      if (
        action.payload &&
        action.payload.status < 300 &&
        action.payload.status >= 200
      ) {

        newState.redirectTo = 'Design_buca_first';
        newState.userDetails = action.payload.data;
        newState.name = action.payload.data.data.name;
        newState._id = action.payload.data.data._id;
        newState.phNumber = action.payload.data.data.phNumber;
        newState.countryCode = action.payload.data.data.countryCode;
        newState.email = action.payload.data.data.email;
        newState.contactList = action.payload.data.data.contactList;
        newState.address = action.payload.data.data.address;
        newState.position = action.payload.data.data.position;
        if((action.payload.data.data.cardCreated))
        {
          newState.redirectTo = 'Dashboard';
          newState.background = action.payload.data.data.backgroundUrl;
          newState.profilePhoto = action.payload.data.data.profileImage;
          newState.instagramid = action.payload.data.data.instagramid;
          newState.facebookId = action.payload.data.data.facebookId;
          newState.linkedInId = action.payload.data.data.linkedInId;
          newState.website = action.payload.data.data.websiteLink;
          newState.frontFontSize = action.payload.data.data.frontFontSize;
          newState.frontFontFamily = action.payload.data.data.frontFontFamily;
          newState.frontFontColor = action.payload.data.data.frontFontColor
        }

      } else {

        newState.errorFieldType =
          (action.payload &&
            action.payload.data &&
            action.payload.data.errorFieldType) ||
          '';
        newState.errorMessage =
          (action.payload &&
            action.payload.data &&
            action.payload.data.message) ||
          'Something went wrong';
      }
      newState.loading = false;
      return newState;
    }
    case 'LOGINAUTH': {

      const newState = {...state};
      if (
        action.payload &&
        action.payload.status < 300 &&
        action.payload.status >= 200
      ) {
        newState.redirectTo = 'Design_buca_first';
        newState.userDetails = action.payload.data;
        newState.name = action.payload.data.data.name;
        newState._id = action.payload.data.data._id;
        newState.phNumber = action.payload.data.data.phNumber;
        newState.countryCode = action.payload.data.data.countryCode;
        newState.email = action.payload.data.data.email;
        newState.contactList = action.payload.data.data.contactList;
        newState.address = action.payload.data.data.address;
        newState.position = action.payload.data.data.position;
        if(action.payload.data.data.backgroundUrl)
        {
          var t = JSON.parse(action.payload.data.data.backgroundUrl)
          newState.background = t.uri;
        }
        if(action.payload.data.data.profileImage)
        {
          var t = JSON.parse(action.payload.data.data.profileImage)
          newState.profilePhoto = t.uri;
        }
        newState.instagramid = action.payload.data.data.instagramid;
        newState.facebookId = action.payload.data.data.facebookId;
        newState.linkedInId = action.payload.data.data.linkedInId;
        newState.website = action.payload.data.data.websiteLink;
        newState.frontFontSize = action.payload.data.data.frontFontSize;
          newState.frontFontFamily = action.payload.data.data.frontFontFamily;
          newState.underline = 'none'
        if(action.payload.data.data.frontFontUnderline)
          newState.underline = 'underline'
          newState.frontFontColor = action.payload.data.data.frontFontColor
        if((action.payload.data.data.cardCreated))
        newState.redirectTo = 'Dashboard';
        try {
          AsyncStorage.setItem('name', newState.name);
          AsyncStorage.setItem('id', newState._id);
          AsyncStorage.setItem('phone', '' + newState.phNumber);
          AsyncStorage.setItem('cc', '' + newState.countryCode);
          AsyncStorage.setItem('email', newState.email);
          AsyncStorage.setItem('contacts', JSON.stringify(newState.contactList));
          AsyncStorage.setItem('position',newState.position);
          AsyncStorage.setItem('toggle', JSON.stringify(true))
          if(newState.address)
            AsyncStorage.setItem('position', newState.address)
          if(newState.website)
            AsyncStorage.setItem('websitelink',newState.website)
          if(newState.instagramid)
            AsyncStorage.setItem('instagramid',newState.instagramid)
          if(newState.facebookId)
            AsyncStorage.setItem('facebookid',newState.facebookId)
          if(newState.linkedInId)
            AsyncStorage.setItem('linkedinid',newState.linkedInId)
          if(newState.profilePhoto)
            AsyncStorage.setItem('profilepicture',JSON.stringify(newState.profilePhoto))
          if(newState.background)
            AsyncStorage.setItem('background',JSON.stringify(newState.background))

         // alert('Data successfully saved')
        } catch (e) {
          alert(e);
        }
      } else {

        newState.errorFieldType =
          (action.payload &&
            action.payload.data &&
            action.payload.data.errorFieldType) ||
          '';
        newState.errorMessage =
          (action.payload &&
            action.payload.data &&
            action.payload.data.message) ||
          'Something went wrong';
      }
      newState.loading = false;
      return newState;
    }
    case 'REGISTER_USER': {
      alert("hidden")

      const newState = {...state};

      if (
        action.payload &&
        action.payload.status < 300 &&
        action.payload.status >= 200
      ) {
        newState.redirectTo = '/dashboard';
        newState.userDetails = JSON.parse(action.payload.config.data);
      } else {
        newState.showTostFlag = true;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.message
        ) {
          newState.tostMessage = action.payload.data.message;
        } else {
          newState.tostMessage =
            (action.payload && action.payload.data) || 'Something went wrong';
        }
      }
      newState.loading = false;
      return newState;
    }

    case 'ADD_MONEY': {
      const newState = {...state};
      newState.userDetails.money = newState.userDetails.money + 10;
      return newState;
    }

    case 'UPDATE_DATA':{
      const newState = {...state};
        newState.address = action.payload.address;
        newState.position = action.payload.position;
        var temp = JSON.parse(action.payload.backgroundUrl)
        console.log(temp.uri, "TEMP")
        newState.background = temp.uri;
        if(action.payload.profileImage){
          var t = JSON.parse(action.payload.profileImage)
          newState.profilePhoto = t.uri;
          console.log(t.uri)
        }
        newState.instagramid = action.payload.instagramid;
        newState.facebookId = action.payload.facebookId;
        newState.linkedInId = action.payload.linkedInId;
        newState.website = action.payload.websiteLink,
        newState.frontFontSize =action.payload.frontFontSize;
        newState.frontFontFamily = action.payload.frontFontFamily;
        newState.name = action.payload.name;
        newState.phNumber = action.payload.phone;
        newState.email = action.payload.email;
        newState.contactList = []
        newState.frontFontColor = action.payload.frontFontColor
        console.log("Update Data",newState)
        return newState
    }


    default:
      return {...state};
  }
}
