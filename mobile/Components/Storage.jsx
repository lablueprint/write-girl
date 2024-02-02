// import { useState } from 'react';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';

// export default function Storage({ id = '' }) {
//   const [userId, setUserId] = useState(id);
//   if (id) {
//     setUserId(id);
//     return userId;
//   } if (userId) {
//     return userId;
//   }
//   console.log('No User ID provided to storage component! Using empty string instead...');
// }

export default async function Storage({ key, value, saveKey }) {
  if (saveKey) {
    await SecureStore.setItemAsync(key, value);
  } else {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log("Here's your value \n", result);
      return result;
    }
    console.log('No values stored under that key.');
  }
}
// need a thing that saves the id of the user created;
// need a thing that gets the ;

Storage.propTypes = {
  key: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  saveKey: PropTypes.bool.isRequired,
};

// Storage.propTypes = {
//   id: PropTypes.string.isRequired,
// };
