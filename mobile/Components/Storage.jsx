import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';

export default function Storage({ key, value, saveKey }) {
  const saveData = async () => {
    if (saveKey) {
      await SecureStore.setItemAsync(key, value).then(() => console.log('hi'));
    } else {
      await SecureStore.getItemAsync('hello').then((result) => { console.log('result: ', result); });
    //   if (result) {
    //     console.log("Here's your value: ", result);
    //     return result;
    //   }
    //   console.log('No values stored under that key.');
    }
    return false;
  };
  saveData();

  return null;
}

Storage.propTypes = {
  key: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  saveKey: PropTypes.bool,
};

Storage.defaultProps = {
  saveKey: false,
};
