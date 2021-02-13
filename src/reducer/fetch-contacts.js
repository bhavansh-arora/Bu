export default function Fetch(state = {}, action) {
  switch (action.type) {

    case 'SHOW_LOAD': {
      const newState = {...state};
      newState.loading = action.payload;
   alert("show load")
      
      return newState;
    }
   

  

    case 'ADD_CONTACT': {
      const newState = {...state};

      console.log('action.payload', action.payload.data);
      if (
        action.payload &&
        action.payload.status < 300 &&
        action.payload.status >= 200
      ) {

        newState.redirectTo = 'Design';
        newState.userDetails = action.payload.data;
        newState.name = action.payload.data.data.name;
        console.log("hey baby")
        alert("true")
      } else {
alert("false")
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

   


    default:
      return {...state};
  }
}
