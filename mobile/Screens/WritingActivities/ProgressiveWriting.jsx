import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView, ImageBackground, Image, Pressable,
} from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import colorsImage from '../../assets/doors/colors.png';
import soundsImage from '../../assets/doors/sounds.png';
import texturesImage from '../../assets/doors/textures.png';
import weatherImage from '../../assets/doors/weather.png';
import natureImage from '../../assets/doors/nature.png';
import relationshipsImage from '../../assets/doors/relationships.png';

const window = Dimensions.get('window');
const activityDim = window.width * 0.5;
const bannerDim = window.width - 40;
const buttonDim = window.height * 0.05;
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    padding: 10,
    marginTop: 20,
  },

  buttonBanner: {
    width: bannerDim,
    height: buttonDim,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    padding: 10,
    marginTop: 20,
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

  progressBar: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },

  bar: {
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
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 64,
  },

  activityHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },

  activityText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 64,
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
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  monthDoorImage: {
    flex: 1,
    width: '100%',
    height: 360,
    resizeMode: 'cover',
  },

  monthDoorImageSmall: {
    width: '200%',
    height: 220,
    resizeMode: 'cover',
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: 'black',
    width: '100%',
  },

  doorButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 16,
    marginRight: 16,
    color: 'white',
  },

});

// List of genre mappings in order
const genreLabels = [
  {
    label: 'Colors',
    color: '#76A785',
    image: colorsImage,
    id: 1,
  },
  {
    label: 'Sounds',
    color: '#63A1AF',
    image: soundsImage,
    id: 2,
  },
  {
    label: 'Textures',
    color: '#E97A54',
    image: texturesImage,
    id: 3,
  },
  {
    label: 'Weather',
    color: '#9FE7FF',
    image: weatherImage,
    id: 4,
  },
  {
    label: 'Nature',
    color: '#BFD25A',
    image: natureImage,
    id: 5,
  },
  {
    label: 'Relationships',
    color: '#F0A2B8',
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
    setGenreInfo(genreLabels.filter((info) => info.label === name));
  };

  useEffect(() => {
    getAllActivities();
  }, [activities]);

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
                style={[styles.banner, { borderRadius: 10 }]}
                onPress={() => [setSelectedActivity(idx), setStep(2)]}
              >
                <Text>
                  {activity.activity[0]}
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
    // if (step === 1) {
    //   const content = [];
    //   content.push(
    //     <View key="graphic" style={[styles.banner, { height: window.height * 0.25, borderRadius: 10 }]}>
    //       <Text>Graphic holder</Text>
    //     </View>,
    //     <View key="activity" style={[styles.banner, { height: window.height * 0.35 }]}>
    //       <Text>
    //         {genreFilter[selectedActivity].activity[step]}
    //       </Text>
    //     </View>,
    //     <TouchableOpacity
    //       key="button"
    //       style={styles.buttonBanner}
    //       onPress={() => { setStep(step + 1); }}
    //     >
    //       <Text>
    //         Start
    //       </Text>
    //     </TouchableOpacity>,
    //   );
    //   return (
    //     content.map((elem) => elem)
    //   );
    // }
    if (step === genreFilter[selectedActivity].activity.length) {
      const content = [];
      content.push(
        <Text style={styles.activityHeading}>Great work!</Text>,
        <View key="graphic" style={[styles.banner, { height: window.height * 0.3 }]}>
          <Text>Graphic holder</Text>
        </View>,
        <Text style={styles.activityBodyText}>
          You've completed
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
          {/* <TouchableOpacity title="Save" onPress={() => { console.log('save placeholder'); }} style={[styles.buttonBanner, { width: bannerDim * 0.4 - 10, marginRight: 10 }]}>
            <Text>
              Save
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => { setStep(0); }}
            style={[styles.doorButton, { width: bannerDim, marginTop: 20 }]}
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
      <Text style={styles.activityHeading}>Part</Text>,
      <View key="graphic" style={[styles.banner, { height: window.height * 0.2 }]}>
        <Text>Graphic holder</Text>
      </View>,
      <View key="instructions" style={[styles.banner, { height: window.height * 0.3 }]}>
        <Text>
          {genreFilter[selectedActivity].activity[step]}
        </Text>
      </View>,
      <TouchableOpacity key="next" title="Next" onPress={() => { setStep(step + 1); }}>
        <Text>
          Next
        </Text>
      </TouchableOpacity>,
      <TouchableOpacity key="back" title="Back" onPress={() => { setStep(step - 1); }}>
        <Text>
          Back
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
                    style={[styles.doorButton, { marginBottom: 64 }]}
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
                  </TouchableOpacity>
                </ImageBackground>
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
                <Button title="< back" onPress={() => { if (step === 0) { setGenreFilter(null); setGenreInfo(null); } else { setStep(0); } }} />
              </View>
              {/* Filtered Activity Screen */}
              <View style={styles.activityDisplay}>
                {displayPage()}
                {
                  step >= 2 && step !== genreFilter[selectedActivity].activity.length
                    ? (
                      // <View style={styles.progressBar}>
                      //   {
                      //     Array.from(
                      //       { length: genreFilter[selectedActivity].activity.length - 2 },
                      //       (_, i) => {
                      //         let style = styles.unchecked;
                      //         if (i < step - 2) {
                      //           style = styles.checked;
                      //         }
                      //         return (
                      //           <View key={i} style={style}>
                      //             <Text>{i}</Text>
                      //           </View>
                      //         );
                      //       },
                      //     )
                      //   }
                      // </View>
                      <Progress.Bar progress={(step - 1) / (genreFilter[selectedActivity].activity.length - 2)} width={windowWidth - 40} height={10} borderRadius={50} borderWidth={0} unfilledColor="#333333" color="white" style={styles.bar} />
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
