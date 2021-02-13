import {serviceCall} from './service-call';

export function showLoading() {
  return {
    type: 'SHOW_LOADING',
    payload: true,
  };
}
export function clearRedirect() {
  return {
    type: 'CLEAR_REDIRECT',
  };
}
export function register(payload) {
  return {
    type: 'REGISTER',
    payload: serviceCall({
      parms: 'register',
      body: payload,
      method: 'POST',
    }),
  };
}