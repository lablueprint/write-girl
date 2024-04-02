/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

// const user = SecureStore.getItemAsync('user');
const fetchUser = async () => {
  const user = await SecureStore.getItemAsync('user');
  console.log('check');
  console.log(SecureStore.getItemAsync('user'));
  return user;
};

const initialState = fetchUser().then((user) => {
  const userState = user.token ? {
    refresh: 0, id: user.id, token: user.token,
  }
    : {
      refresh: 0, id: null, token: null,
    };
  return userState;
});
console.log('plz');

// const initialState = user.token ? {
//   refresh: 0, id: user.id, token: user.token,
// }
//   : {
//     refresh: 0, id: null, token: null,
//   };
console.log('initial state: ', initialState);
console.log(SecureStore.getItemAsync('user'));

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.refresh = 0;
      state.id = action.payload.id;
      state.token = action.payload.token;
      console.log('state: ', state);
      SecureStore.setItemAsync('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.refresh = 0;
      state.id = null;
      state.token = null;
      SecureStore.deleteItemAsync('user');
    },
    refresh: (state) => {
      state.refresh += 1;
    },
  },
});

export const {
  login,
  logout,
  refresh,
} = authSlice.actions;
const { reducer } = authSlice;
export default reducer;

export const isTokenExpired = (token) => {
  console.log('token: ', token);
  return false;
//   const decodedToken = jwt_decode(token);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp < currentTime;
};
