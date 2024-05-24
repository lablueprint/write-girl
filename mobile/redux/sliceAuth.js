/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

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
    },
    logout: (state) => {
      state.refresh = 0;
      state.id = null;
      state.token = null;
      state.authHeader = null;
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

export const isTokenExpired = (token) => false;
