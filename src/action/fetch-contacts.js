import {serviceCall} from './service-call';

export function showLoad() {
  return {
    type: 'SHOW_LOAD',
    payload: false,
  };
}

export function addContact(payload) {
    return {
 type: 'ADD_CONTACT',
    payload: serviceCall({
      parms: 'addcontact',
      body: payload,
      method: 'POST',
    }),
    };
}