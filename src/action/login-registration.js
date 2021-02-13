import {serviceCall} from './service-call';

export function showLoader() {
  return {
    type: 'SHOW_LOADER',
    payload: true,
  };
}

export function logout(){
  return{
    type:'LOGOUT',
    payload:true
  }
}


export function showHideTost(payload) {
  return {
    type: 'SHOW_HIDE_TOST',
    payload,
  };
}

export function clearRedirect() {
  return {
    type: 'CLEAR_REDIRECT',
  };
}

export function login(payload) {
  return {
    type: 'LOGIN',
    payload: serviceCall({
      parms: 'login',
      body: payload,
      method: 'POST',
    }),
  };
}

export function update_data(data)
{
  return {
    type: 'UPDATE_DATA',
    payload: data,
  };
}

export function loginAuth(payload) {
  return {
    type: 'LOGINAUTH',
    payload: serviceCall({
      parms: 'login',
      body: payload,
      method: 'POST',
    }),
  };
}

export function registerUser(payload) {
  return {
    type: 'REGISTER_USER',
    payload: serviceCall({
      parms: 'register',
      body: payload,
      method: 'POST',
    }),
  };
}

export function addMoney(payload) {
  return {
    type: 'ADD_MONEY',
    payload,
  };
  
}

