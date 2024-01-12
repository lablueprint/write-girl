import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView,
} from 'react-native';
import axios from 'axios';

const activityDim = Dimensions.get('window').width * 0.45;
const bannerDim = Dimensions.get('window').width * 0.9;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },

  activity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    width: activityDim,
    height: activityDim,
  },

  banner: {
    width: bannerDim,
    height: activityDim,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    padding: 10,
  },
});

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
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/createActivity`, newActivity);

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
    const filteredList = activities.filter(
      (activity) => activity.genre === name,
    );
    // console.log(filteredList);
    setGenreFilter(filteredList);
  };

  useEffect(() => {
    getAllActivities();
  }, [activities]);

  return (
    <View>
      {
        genreFilter === null
          ? (
            <ScrollView contentContainerStyle={styles.container}>
              {
              genreLabels.map((label) => (
                // 10 Doors Screen
                <TouchableOpacity
                  style={styles.activity}
                  onPress={() => { selectActivityGenre(label); }}
                >
                  <Text>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))
            }
            </ScrollView>
          )
          : (
            <View style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '100%',
            }}
            >
              {/* Filtered Activity Screen */}
              {/* <Text>
                {genreFilter[0].genre}
              </Text> */}
              <View style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'column',
                gap: 10,
              }}
              >
                {
                  genreFilter.map((activity) => (
                    <TouchableOpacity style={styles.banner}>
                      <Text>
                        {activity.activity[0]}
                      </Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <Button title="Back" onPress={() => { setGenreFilter(null); }} />
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
