import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxPromise from 'redux-promise';

import LoginReg from './login-registration';
import UserReg from './user-registration';
import Fetch from './fetch-contacts';
const reducers = combineReducers({
  loginReg: LoginReg,
  userReg: UserReg,
  fetch: Fetch
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
