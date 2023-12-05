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

const genreLabels = [
  'Writing Experiments', 'Journalism', 'Songwriting', 'Poetry', 'Screenwriting', 'Comedy', 'Fiction', 'Memoir', 'Sci-Fi', 'Free Genre',
];

export default function ProgressiveWritingScreen() {
  const [activities, setActivities] = useState([]);
  const [genre, setGenre] = useState([]);

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

  const selectActivityGenre = async (name) => {
    const idx = genreMap[name];
    const activity = activities[idx];
    setGenre(activity);
  };

  return (
    <View style={styles.container}>
      <Text>Progressive Writing Screen</Text>
      {
        genre.length === 0
          ? genreLabels.map((label) => (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: '4px',
                borderColor: 'black',
              }}
              onPress={() => { selectActivityGenre(label); }}
            >
              <Text>
                {label}
              </Text>
            </TouchableOpacity>
          ))
          : (
            <View>
              <Text>
                {genre.genre}
              </Text>
              <View>
                {
                  genre.activity.map((prompt) => (
                    <View>
                      <Text>
                        {prompt}
                      </Text>
                    </View>
                  ))
                }
              </View>
              <Button title="Back" onPress={() => { setGenre([]); }} />
            </View>
          )
      }
      {/* <Button title="send data" onPress={() => { addNewActivity(givenActivities); }} />
      <Button title="get all data" onPress={() => { getAllActivities(); }} /> */}
    </View>
  );
}
