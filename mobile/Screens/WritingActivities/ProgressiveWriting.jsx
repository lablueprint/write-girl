import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity,
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
  activity: 'edward allen poe',
  genre: 'Poetry',
};

const genreMap = {
  'Writing Experiments': 0, Journalism: 1, Songwriting: 2, Poetry: 3, Screenwriting: 4, Comedy: 5, Fiction: 6, Memoir: 7, 'Sci-Fi': 8, 'Free Genre': 9,
};

const genres = [
  'Writing Experiments', 'Journalism', 'Songwriting', 'Poetry', 'Screenwriting', 'Comedy', 'Fiction', 'Memoir', 'Sci-Fi', 'Free Genre',
];

export default function ProgressiveWritingScreen() {
  const [activities, setActivities] = useState([]);
  const [genre, setGenre] = useState([]);

  const getAllActivities = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/getAllActivities`);
    console.log(res.data);
    setActivities(res.data);
  };

  useEffect(() => {
    getAllActivities();
  }, [activities]);

  const addNewActivity = async (newActivity) => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/createActivity`, newActivity);
  };

  const selectActivityGenre = async (name) => {
    const idx = genreMap[name];
    const activity = activities[idx];
    setGenre(name);
  };

  const obj = activities[genreMap[genre]];
  console.log('object here', obj);
  const genreArr = obj ? obj.activities : null;

  return (
    <View style={styles.container}>
      <Text>Progressive Writing Screen</Text>
      {
        genre.length === 0
          ? genres.map((label) => (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: '4px',
                borderColor: 'black',
              }}
              onPress={() => { setGenre(label); }}
            >
              <Text>
                {label}
              </Text>
            </TouchableOpacity>
          ))
          : genreArr.map(({ activity }) => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>
                Activity:
                {' '}
                {activity}
                Genre:
                {' '}
                {genre}
              </Text>
            </View>
          ))
      }
      <Button title="send data" onPress={() => { addNewActivity(givenActivities); }} />
      <Button title="get all data" onPress={() => { getAllActivities(); }} />
    </View>
  );
}
