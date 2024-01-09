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

// Genre-map is a constant mapping between name and index into queried data retrieved from database.
const genreMap = {
  'Writing Experiments': 0, Journalism: 1, Songwriting: 2, Poetry: 3, Screenwriting: 4, Comedy: 5, Fiction: 6, Memoir: 7, 'Sci-Fi': 8, 'Free Genre': 9,
};

// List of genre mappings in order
const genreLabels = [
  'Writing Experiments', 'Journalism', 'Songwriting', 'Poetry', 'Screenwriting', 'Comedy', 'Fiction', 'Memoir', 'Sci-Fi', 'Free Genre',
];

export default function ProgressiveWritingScreen() {
  const [activities, setActivities] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);

  /*
    getAllActivities
    Queries with GET at the getAllActivities endpoint for all progressive writing activity types.
    - Initiailizes the state for currently saved/tracked activities for the user.
  */
  const getAllActivities = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/getAllActivities`);
    setActivities(res.data);
  };

  /*
    addNewActivity
    Creates POST request at the createActivity endpoint to store a new activity.

    @params
    newActivity : Object{genre: genreName, activity: activityName}
  */
  const addNewActivity = async (newActivity) => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/createActivity`, newActivity);

    /*
      Add additional logic to update the current list of activities for the given genre without
      sending a database request.
    */
  };

  /*
    selectActivityGenre
    Filters the current activities for particular genre based on door selected.
    Changes display to generate each activity prompt onto the page.

    @params
    name : str
      Note: `name` must be a valid name within the activity genre (i.e Poetry, Sci-Fi, etc)
  */
  const selectActivityGenre = async (name) => {
    const filteredList = activities.filter((activity) => activity === name);
    setGenre(filteredList);
  };

  useEffect(() => {
    getAllActivities();
  }, [activities]);

  return (
    <View style={styles.container}>
      {
        genreFilter === null
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
                {genre[0].genre}
              </Text>
              <View>
                {
                  genre.map((activity) => (
                    <View>
                      <Text>
                        {activity.activity[0]}
                      </Text>
                    </View>
                  ))
                }
              </View>
              <Button title="Back" onPress={() => { setGenre([]); }} />
              {/* <Button title="Create Activity" onPress={() =>
                addNewActivity({ genre: 'Poetry', activity: ['a', 'b', 'c'] })} /> */}
            </View>
          )
      }
      {/* <Button title="send data" onPress={() => { addNewActivity(givenActivities); }} />
      <Button title="get all data" onPress={() => { getAllActivities(); }} /> */}
    </View>
  );
}
