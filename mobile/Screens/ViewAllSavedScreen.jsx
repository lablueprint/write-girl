import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Button, Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import TripleFlipHistoryCard from '../Components/TripleFlipHistoryCard';

async function getId() {
  // const userId = await Storage({ key: 'userId', value: '', saveKey: false });
  const userId = '65bd4fce479f4d7759aa4bc6';

  try {
    if (!userId) {
      console.log('User ID is null.');
    }
  } catch (err) {
    console.log(err);
  }
  return userId;
}

const getTraitByID = async (id) => {
  try {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/characterTrait/getByID/${id}`, { timeout: 20000 });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};


export default function ViewAllSavedScreen() {
  const route = useRoute();
  const subject = route.params?.subject;
  const [savedData, setSavedData] = useState('');
  console.log(subject);

  const getTraits = async (n) => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getTraits/${userId}`, { timeout: 20000 });
      setSavedData(
        await Promise.all(
          saved.data.reverse().map(
            async (starter) => getTraitByID(starter.traitID),
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  useEffect(() => {
    getTraits();
    console.log(savedData);
  }, []);

  return (
    <ScrollView>
      {savedData.map((data) => (
        <Text key={data._id}>
          {data.trait}
        </Text>
      ))}
    </ScrollView>
  );
}

ViewAllSavedScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
