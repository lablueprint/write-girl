import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView, ImageBackground, Image,
} from 'react-native';
import axios from 'axios';
import colorsImage from '../../assets/doors/colors.png';
import soundsImage from '../../assets/doors/sounds.png';
import texturesImage from '../../assets/doors/textures.png';
import weatherImage from '../../assets/doors/weather.png';
import natureImage from '../../assets/doors/nature.png';
import relationshipsImage from '../../assets/doors/relationships.png';

const window = Dimensions.get('window');
const activityDim = window.width * 0.5;
const bannerDim = window.width * 0.9;
const buttonDim = window.height * 0.05;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    gap: 0,
  },

  activity: {
    alignItems: 'center',
    width: activityDim,
    height: activityDim * 1.25,
    justifyContent: 'flex-end', // will create the gutter between body and footer
  },

  banner: {
    width: bannerDim,
    height: activityDim,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    padding: 10,
  },

  buttonBanner: {
    width: bannerDim,
    height: buttonDim,
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

  verticalDisplay: {
    backgroundColor: 'blue',
    height: 20000,
  },

  finishActivityInteractives: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: 'auto',
  },

  bg: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

  backButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },

  activityDisplay: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    padding: 10,
  },

  progressBar: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },

  doorText: {
    padding: 16,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

// List of genre mappings in order
const genreLabels = [
  {
    label: 'Colors',
    color: '#76A785',
    image: colorsImage,
  },
  {
    label: 'Sounds',
    color: '#63A1AF',
    image: soundsImage,
  },
  {
    label: 'Textures',
    color: '#E97A54',
    image: texturesImage,
  },
  {
    label: 'Weather',
    color: '#9FE7FF',
    image: weatherImage,
  },
  {
    label: 'Nature',
    color: '#BFD25A',
    image: natureImage,
  },
  {
    label: 'Relationships',
    color: '#F0A2B8',
    image: relationshipsImage,
  },
  // 'Sounds', 'Textures', 'Weather', 'Nature', 'Relationships',
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
    setGenreFilter(filteredList);
  };

  useEffect(() => {
    getAllActivities();
  }, [activities]);

  // Note: there are ridiculous issues when returning a styled element (i.e. styling disappears :( )
  // Solution: Add adjacent components into a vector and finally map them to the output.
  const displayPage = () => {
    if (step === 0) {
      return (
        genreFilter.map((activity, idx) => {
          if (activity.activity.length > 0) {
            return (
              <TouchableOpacity
                key={activity.activity[0]}
                style={[styles.banner, { borderRadius: 10 }]}
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
      );
    } if (step === 1) {
      const content = [];
      content.push(
        <View key="graphic" style={[styles.banner, { height: window.height * 0.25, borderRadius: 10 }]}>
          <Text>Graphic holder</Text>
        </View>,
        <View key="activity" style={[styles.banner, { height: window.height * 0.35 }]}>
          <Text>
            {genreFilter[selectedActivity].activity[step]}
          </Text>
        </View>,
        <TouchableOpacity
          key="button"
          style={styles.buttonBanner}
          onPress={() => { setStep(step + 1); }}
        >
          <Text>
            Start
          </Text>
        </TouchableOpacity>,
      );
      return (
        content.map((elem) => elem)
      );
    } if (step === genreFilter[selectedActivity].activity.length) {
      const content = [];
      content.push(
        <View key="message" style={[styles.banner, { height: window.height * 0.2, borderRadius: 10 }]}>
          <Text>Complete!</Text>
        </View>,
        <View key="graphic" style={[styles.banner, { height: window.height * 0.3 }]}>
          <Text>Graphic holder</Text>
        </View>,
        <View key="exit" style={styles.finishActivityInteractives}>
          <TouchableOpacity title="Save" onPress={() => { console.log('save placeholder'); }} style={[styles.buttonBanner, { width: bannerDim * 0.25 }]}>
            <Text>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setStep(0); }}
            style={[styles.buttonBanner, { width: bannerDim * 0.75 }]}
          >
            <Text>Back to Activity List</Text>
          </TouchableOpacity>
        </View>,
      );
      return (
        content.map((elem) => elem)
      );
    }

    const content = [];
    content.push(
      <View key="graphic" style={[styles.banner, { height: window.height * 0.2 }]}>
        <Text>Graphic holder</Text>
      </View>,
      <View key="instructions" style={[styles.banner, { height: window.height * 0.3 }]}>
        <Text>
          {genreFilter[selectedActivity].activity[step]}
        </Text>
      </View>,
      <TouchableOpacity key="next" title="Next" onPress={() => { setStep(step + 1); }} style={styles.buttonBanner}>
        <Text>
          Next
        </Text>
      </TouchableOpacity>,
    );
    return (
      content.map((elem) => elem)
    );
  };

  return (
    <View>
      {
        genreFilter === null
          ? (
            <ScrollView contentContainerStyle={styles.container}>
              {
              genreLabels.map((category) => (
                // 10 Doors Screen
                <ImageBackground
                  source={category.image}
                  style={{
                    backgroundColor: category.color,
                  }}
                  resizeMode="contain"
                >
                  <TouchableOpacity
                    key={category.label}
                    style={styles.activity}
                    onPress={() => { selectActivityGenre(category.label); }}
                  >

                    <Text
                      style={styles.doorText}
                    >

                      {category.label}

                    </Text>
                    {/* <Image source={doorImage} styles={styles.door} resizeMode="stretch" /> */}

                  </TouchableOpacity>
                </ImageBackground>
              ))
            }
            </ScrollView>
          )
          : (
            <View style={styles.bg}>
              <View style={styles.backButton}>
                <Button title="< back" onPress={() => { if (step === 0) { setGenreFilter(null); } else { setStep(0); } }} />
              </View>
              {/* Filtered Activity Screen */}
              <View style={styles.activityDisplay}>
                {displayPage()}
                {
                  step >= 2
                    ? (
                      <View style={styles.progressBar}>
                        {
                          Array.from(
                            { length: genreFilter[selectedActivity].activity.length - 2 },
                            (_, i) => {
                              let style = styles.unchecked;
                              if (i < step - 2) {
                                style = styles.checked;
                              }
                              return (
                                <View key={i} style={style}>
                                  <Text>{i}</Text>
                                </View>
                              );
                            },
                          )
                        }
                      </View>
                    ) : <View key={-1} />
                }
              </View>

              <TouchableOpacity title="Back" onPress={() => { setGenreFilter(null); setStep(0); }} />
            </View>
          )
      }
    </View>
  );
}
