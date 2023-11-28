import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const givenActivities = {
  activity: 'baseball',
  genre: 'sport',
};

export default function ProgressiveWritingScreen() {
  const [activities, setActivities] = useState([]);

  const getAllActivities = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/getAllActivities`);
    setActivities(res.data);
  };

  useEffect(() => {
    getAllActivities();
  }, [activities]);

  const addNewActivity = async (newActivity) => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/createActivity`, newActivity);
  };

  return (
    <View style={styles.container}>
      <Text>Progressive Writing Screen</Text>
      {
        activities.map(({ activity, genre, _id }) => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
              Activity:
              {' '}
              {activity}
              Genre:
              {'  '}
              {genre}
              ID:
              {'  '}
              {_id}
            </Text>
          </View>
        ))
      }
      <Button title="send data" onPress={() => { addNewActivity(givenActivities); }} />
      <Button title="get all data" onPress={() => { getAllActivities(); }} />
    </View>
  );
}
