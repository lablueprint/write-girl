import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView, Image,
} from 'react-native';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Progress from 'react-native-progress';
import colorsImage from '../../assets/doors/colors.png';
import soundsImage from '../../assets/doors/sounds.png';
import texturesImage from '../../assets/doors/textures.png';
import weatherImage from '../../assets/doors/weather.png';
import natureImage from '../../assets/doors/nature.png';
import relationshipsImage from '../../assets/doors/relationships.png';
import stepGraphic from '../../assets/doors/step-graphic.png';
import completeGraphic from '../../assets/doors/complete-graphic.png';

const window = Dimensions.get('window');
const activityDim = window.width * 0.5;
const bannerDim = window.width - 40;
const windowWidth = window.width;

const date = new Date();
const month = date.getMonth();
const monthActivityNum = Math.ceil((month + 1) / 2) - 1;

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

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    gap: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },

  activity: {
    alignItems: 'center',
    width: activityDim,
    height: activityDim * 1.25,
    justifyContent: 'flex-end', // will create the gutter between body and footer
  },

  banner: {
    width: bannerDim,
    height: 150,
    alignItems: 'left',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
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
    padding: 0,
  },

  barButtonContainer: {
    width: 40,
  },

  bar: {
    marginTop: 4,
  },

  barContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    marginTop: 20,
  },

  doorText: {
    padding: 16,
    fontWeight: 'bold',
    fontSize: 20,
  },

  heading: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 60,
  },

  activityHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },

  activityText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 60,
    marginBottom: 20,
    color: 'white',
  },

  activityBodyText: {
    fontSize: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    color: 'white',
  },

  monthDoorText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  monthDoorImage: {
    flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },

  activityGraphic: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },

  completeGraphic: {
    width: '100%',
    marginTop: 60,
    marginBottom: 60,
  },

  monthDoorImageSmall: {
    width: '200%',
    height: 220,
    resizeMode: 'contain',
  },
  gridDoorImage: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
  },

  welcomeBannerTextContainer: {
    width: '50%',
  },

  welcomeBannerImageContainer: {
    width: '25%',
  },

  welcomeBannerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },

  doorButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'black',
    width: '100%',
  },

  doorButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },

});

// List of genre mappings in order
const genreLabels = [
  {
    label: 'Colors',
    color: '#76A785',
    color2: '#1b4d2f',
    image: colorsImage,
    id: 1,
  },
  {
    label: 'Sounds',
    color: '#63A1AF',
    color2: '#1a5261',
    image: soundsImage,
    id: 2,
  },
  {
    label: 'Textures',
    color: '#E97A54',
    color2: '#803911',
    image: texturesImage,
    id: 3,
  },
  {
    label: 'Weather',
    color: '#b184bf',
    color2: '#845791',
    image: weatherImage,
    id: 4,
  },
  {
    label: 'Nature',
    color: '#BFD25A',
    color2: '#648a22',
    image: natureImage,
    id: 5,
  },
  {
    label: 'Relationships',
    color: '#F0A2B8',
    color2: '#b87496',
    image: relationshipsImage,
    id: 6,
  },
];

export default function ProgressiveWritingScreen() {
  const [activities, setActivities] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);
  const [genreInfo, setGenreInfo] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  const checkIfSaved = async (value) => {
    try {
      const userId = '65bd4fce479f4d7759aa4bc6';
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/checkIfSavedActivity/${userId}/${value}`);
      setSaved(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return false;
  };
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
    setGenreInfo(genreLabels.filter((info) => info.label === name));
  };

  useEffect(() => {
    getAllActivities();
  }, [activities]);

  const saveActivity = async () => {
    const userId = '65bd4fce479f4d7759aa4bc6';
    const activityJSON = {
      date: date.toDateString(),
      activityID: genreFilter[selectedActivity]._id,
    };

    try {
      if (!saved && userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/addActivities/${userId}`, activityJSON);
        checkIfSaved(genreFilter[selectedActivity]._id);
        return response;
      }
      console.log('User ID is null or already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const selectActivity = (idx) => {
    setSelectedActivity(idx);
    checkIfSaved(genreFilter[idx]._id);
    setStep(2);
  };

  const removeActivity = async () => {
    const userId = '65bd4fce479f4d7759aa4bc6';
    const activityJSON = {
      activityID: genreFilter[selectedActivity]._id,
    };

    try {
      if (saved && userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeActivities/${userId}`, activityJSON);
        checkIfSaved(activityJSON.activityID);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const saveButton = () => {
    let button = <View />;
    if (step >= 2 && step === genreFilter[selectedActivity].activity.length) {
      if (!saved) {
        button = (
          <Button title="Save" onPress={() => { saveActivity(); }} />
        );
      } else {
        button = (
          <Button title="Unsave" onPress={() => { removeActivity(); }} />
        );
      }
    }
    return button;
  };

  // Note: there are ridiculous issues when returning a styled element (i.e. styling disappears :( )
  // Solution: Add adjacent components into a vector and finally map them to the output.
  const displayPage = () => {
    if (step === 0) {
      return (
        <ScrollView>
          <View style={styles.welcomeBannerContainer}>
            <View style={styles.welcomeBannerTextContainer}>
              <Text style={styles.activityText}>
                Welcome to
              </Text>
              <Text style={styles.activityHeading}>
                {genreInfo[0].label}
              </Text>
            </View>
            <View style={styles.welcomeBannerImageContainer}>
              <Image source={genreInfo[0].image} style={styles.monthDoorImageSmall} />
            </View>
          </View>
          {
        genreFilter.map((activity, idx) => {
          if (activity.activity.length > 0) {
            return (
              <TouchableOpacity
                key={activity.activity[0]}
                style={[styles.banner, { backgroundColor: genreInfo[0].color2 }]}
                onPress={() => [selectActivity(idx)]}
              >
                <Text style={styles.doorButtonText}>
                  {activity.activity[0]}
                </Text>
                <Text style={{ color: 'white', marginTop: 20 }}>
                  {activity.activity.length - 2}
                  {' '}
                  {activity.activity.length - 2 === 1 ? 'step' : 'steps'}
                </Text>
              </TouchableOpacity>
            );
          }
          return (<View />);
        })
      }
        </ScrollView>
      );
    }
    if (step === genreFilter[selectedActivity].activity.length) {
      const content = [];
      content.push(
        <Text key="heading" style={styles.activityHeading}>Great work!</Text>,
        <Image key="graphic" source={completeGraphic} style={styles.completeGraphic} />,
        <Text key="message" style={[styles.activityBodyText, { textAlign: 'center' }]}>
          You&apos;ve completed
          {' '}
          {genreFilter[selectedActivity].activity[0]}
          {' '}
          from the
          {' '}
          {genreInfo[0].label}
          {' '}
          door!
        </Text>,
        <View key="exit" style={styles.finishActivityInteractives}>
          <TouchableOpacity
            onPress={() => { setStep(0); }}
            style={[
              styles.doorButton,
              { width: bannerDim, marginTop: 20, backgroundColor: genreInfo[0].color2 },
            ]}
          >
            <Text style={styles.doorButtonText}>Back to activities</Text>
          </TouchableOpacity>
        </View>,
      );
      return (
        content.map((elem) => elem)
      );
    }
    const content = [];
    content.push(
      <Text key="part" style={styles.activityHeading}>
        Part
        {' '}
        {step - 1}
      </Text>,
      <Image key="graphic" source={stepGraphic} style={styles.activityGraphic} />,
      <Text key="instructions" style={styles.activityBodyText}>
        {genreFilter[selectedActivity].activity[step]}
      </Text>,
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
            <ScrollView>
              <View style={{
                backgroundColor: genreLabels[monthActivityNum].color,
              }}
              >
                <Text style={styles.heading}>
                  Door Activity
                </Text>
                <Text style={styles.monthDoorText}>
                  Door of the month
                </Text>
                <Image source={genreLabels[monthActivityNum].image} style={styles.monthDoorImage} />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={
                      [
                        styles.doorButton,
                        { marginBottom: 60, backgroundColor: genreLabels[monthActivityNum].color2 },
                      ]
                    }
                    onPress={() => { selectActivityGenre(genreLabels[monthActivityNum].label); }}
                  >
                    <Text style={styles.doorButtonText}>
                      {genreLabels[monthActivityNum].label}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.container}>
                {
              genreLabels.map((category) => (
                // 10 Doors Screen
                <TouchableOpacity
                  key={category.label}
                  style={[styles.activity, {
                    backgroundColor: category.color,
                  }]}
                  onPress={() => { selectActivityGenre(category.label); }}
                >
                  <Image source={category.image} style={styles.gridDoorImage} />
                  <Text
                    style={styles.doorText}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))
            }
              </View>
            </ScrollView>
          )
          : (
            <View style={{
              backgroundColor: genreInfo[0].color,
              width: '100%',
              height: '100%',
            }}
            >
              <View style={styles.backButton}>
                <Button title="< Back" onPress={() => { if (step === 0) { setGenreFilter(null); setGenreInfo(null); } else { setStep(0); } }} />
                {saveButton()}
              </View>
              {/* Filtered Activity Screen */}
              <View style={styles.activityDisplay}>
                {displayPage()}
                {
                  step >= 2 && step !== genreFilter[selectedActivity].activity.length
                    ? (
                      <View style={styles.barContainer}>
                        <TouchableOpacity style={styles.barButtonContainer} key="back" title="Back" onPress={() => { setStep(step === 2 ? 0 : step - 1); }}>
                          <Text style={{ color: 'white' }}>
                            Back
                          </Text>
                        </TouchableOpacity>
                        <Progress.Bar
                          style={styles.bar}
                          progress={
                            (step - 1) / (genreFilter[selectedActivity].activity.length - 2)
                          }
                          width={windowWidth - 120}
                          height={10}
                          borderRadius={50}
                          borderWidth={0}
                          unfilledColor="#333333"
                          color="white"
                        />
                        <TouchableOpacity style={styles.barButtonContainer} key="next" title="Next" onPress={() => { setStep(step + 1); }}>
                          <Text style={{ color: 'white', textAlign: 'right' }}>
                            Next
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : <View key={-1} />
                }
              </View>

              <TouchableOpacity title="Back" onPress={() => { setGenreFilter(null); setGenreInfo(null); setStep(0); }} />
            </View>
          )
      }
    </View>
  );
}
