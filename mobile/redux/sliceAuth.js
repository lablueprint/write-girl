/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

// const user = SecureStore.getItemAsync('user');
console.log('Slice auth ran');

const initialState = {
  refresh: 0, id: null, token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.refresh = 0;
      state.id = action.payload.id;
      state.token = action.payload.token;
      SecureStore.setItemAsync('user', JSON.stringify(action.payload));
    //   state.authHeader = {
    //     Authorization: `Bearer ${action.payload.token}`,
    //   };
    //   // Store username and password securely
    //   try {
    //     await SecureStore.setItemAsync('email', JSON.stringify(action.payload.email));
    //   } catch (e) {
    //     console.error(e);
    //   }
    },
    logout: (state) => {
      state.refresh = 0;
      state.id = null;
      state.token = null;
      state.authHeader = null;
      // SecureStore.deleteItemAsync('user');
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
