// import React, { useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import PropTypes from 'prop-types';
// import Loading from '../Components/Loading';

// function AuthLoading({ navigation }) {
//   const checkLoginState = async () => {
//     // retrieve the value of the token
//     const userToken = await SecureStore.getItemAsync('token');

//     // navigate to the app screen if a token is present
//     // else navigate to the auth screen
//     navigation.navigate(userToken ? 'Home' : 'Auth');
//   };
//   // call checkLoginState when the component mounts
//   useEffect(() => {
//     checkLoginState();
//   });
//   return <Loading />;
// }
// export default AuthLoading;

// AuthLoading.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func,
//   }).isRequired,
// };
