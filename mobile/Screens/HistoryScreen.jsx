import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Dimensions, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import TripleFlipHistoryCard from '../Components/TripleFlipHistoryCard';

const styles = StyleSheet.create({
  main: {
    paddingVertical: '10%',
    paddingHorizontal: '5%',
    backgroundColor: 'grey',
    height: '100%',
  },
});

async function getId() {
  // let userId = await Storage({ key: 'hello', value: '', saveKey: false });
  const userId = '65bc75ca64a9510aeb9c5cc0';
  try {
    if (!userId) {
      console.log('User ID is null.');
    }
  } catch (err) {
    console.log(err);
  }
  return userId;
}

export default function HistoryScreen() {
  const [flipIDs, setFlipHistory] = useState([]);
  useEffect(async () => {
    const getHistory = async () => {
      try {
        const userId = await getId();
        console.log(userId);
        const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getTripleFlipHistory/${userId}`);
        setFlipHistory(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    let history = await getHistory();
    history = JSON.parse(JSON.stringify(history.tripleFlipHistory));
    setFlipHistory(history);
  }, []);
  const flipHistory = Object.keys(flipIDs).map(
    (tripleFlip) => <TripleFlipHistoryCard flipId={flipIDs[tripleFlip].flipID} date={flipIDs[tripleFlip].date} />,
  );
  return (
    <View style={styles.main}>
      {
        flipHistory
      }
    </View>
  );
}
