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

  unchecked: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'black',
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'black',
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

// List of genre mappings in order
const genreLabels = [
  'Writing Experiments', 'Journalism', 'Songwriting', 'Poetry', 'Screenwriting', 'Comedy', 'Fiction', 'Memoir', 'Sci-Fi', 'Free Genre',
];

export default function ProgressiveWritingScreen() {
  const [activities, setActivities] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [step, setStep] = useState(0);

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

  const displayPage = () => {
    const content = (
      <View style={styles.banner}>
        <Text>
          {genreFilter[selectedActivity].activity[step]}
        </Text>
      </View>
    );
    switch (step) {
      case 1:
        return (
          <View>
            <View style={styles.banner}>
              <Text>Graphic holder</Text>
            </View>
            {content}
            <Button title="Start" onPress={() => { setStep(step + 1); }} />
          </View>
        );
      case genreFilter[selectedActivity].activity.length - 1:
        return (
          <View>
            <View style={styles.banner}>
              <Text>Complete!</Text>
            </View>
            <View style={styles.banner}>
              <Text>Graphic holder</Text>
            </View>
            {content}
            <Button title="Back to activity list" onPress={() => { setStep(0); }} />
            <Button title="Save" onPress={() => { console.log('save placeholder'); }} />
          </View>
        );
      default:
        return (
          <View>
            <View style={styles.banner}>
              <Text>Graphic holder</Text>
            </View>
            {content}
            <Button title="Next" onPress={() => { setStep(step + 1); }} />
          </View>
        );
    }
  };

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
              <View style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'column',
                gap: 10,
              }}
              >
                {
                  step === 0
                    ? genreFilter.map((activity, idx) => {
                      if (activity.activity.length > 0) {
                        return (
                          <TouchableOpacity
                            style={styles.banner}
                            onPress={() => [setSelectedActivity(idx), setStep(1)]}
                          >
                            <Text>
                              {activity.activity[0]}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                      return (<View />);
                    })
                    : (
                      <View style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'column',
                        gap: 10,
                      }}
                      >
                        {displayPage()}
                        {
                          step >= 2
                            ? (
                              <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                gap: 10,
                              }}
                              >
                                {
                              Array.from(
                                { length: genreFilter[selectedActivity].activity.length - 2 },
                                (_, i) => {
                                  let style = styles.unchecked;
                                  if (i < step - 2) {
                                    style = styles.checked;
                                  }
                                  return (
                                    <View style={style}>
                                      <Text>{i}</Text>
                                    </View>
                                  );
                                },
                              )
                            }
                              </View>
                            ) : <View />
                        }
                      </View>
                    )
                }
                {
              }
              </View>

              <Button title="Back" onPress={() => { setGenreFilter(null); setStep(0); }} />
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
