export default function UserReg(state = {}, action) {
 switch (action.type) {

      case 'SHOW_LOADING': {
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
     case 'REGISTER': {
      const newState = {...state};
      console.log('action.payload', action.payload.data);
     // console.log(newState.loading)
      if (
        action.payload &&
        action.payload.status < 300 &&
        action.payload.status >= 200
      ) {
        newState.redirectTo = 'Design';
        newState.userDetails = action.payload.data;
        
      } 
      
      else {
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
     case 'CLEAR_REDIRECT': {
      const newState = {...state};
      newState.redirectTo = '';
      return newState;
    }
     default:
      return {...state};

 }
 

}