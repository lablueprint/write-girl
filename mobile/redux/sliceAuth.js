/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// import { createTransform } from 'redux-persist';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const user = SecureStore.getItemAsync('user');
console.log('currUser: ', user);

// const userObj = JSON.parse(user._j);

// console.log('userObject: ', userObj);

// console.log('userToken: ', userObj.token);

const initialState = user ? {
  refresh: 0, id: user.id, token: user.token,
}
  : {
    refresh: 0, id: null, token: null,
  };

console.log('plz: ', initialState);

// const initialState = user.token ? {
//   refresh: 0, id: user.id, token: user.token,
// }
//   : {
//     refresh: 0, id: null, token: null,
//   };
console.log('initial state: ', initialState);
console.log('pp: ', SecureStore.getItemAsync('user'));
console.log('timing');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loading = false;
      state.refresh = action.payload.refresh;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
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
  setUser,
  login,
  logout,
  refresh,
} = authSlice.actions;

// const user = SecureStore.getItemAsync('user');
export const fetchUser = () => async (dispatch) => {
  try {
    console.log('fetchUser');
    const user = await SecureStore.getItemAsync('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  } catch (e) {
    console.error('Error fetching user: ', e);
  }
  // console.log('check');
  // console.log('mm: ', SecureStore.getItemAsync('user'));
};

export default authSlice.reducer;
// const { userReducer } = authSlice;
// export default userReducer;

// export const isTokenExpired = (token) => {
//   console.log('token: ', token);
//   return false;
// //   const decodedToken = jwt_decode(token);
// //   const currentTime = Date.now() / 1000;
// //   return decodedToken.exp < currentTime;
// };
