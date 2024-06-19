import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableOpacity, Text, Image,
  ScrollView,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import TripleFlipHistoryCard from '../Components/TripleFlipHistoryCard';
import backButton from '../assets/back.png';
import editButton from '../assets/edit.png';

async function getId() {
  // const userId = await Storage({ key: 'userId', value: '', saveKey: false });
  const userId = '65bd4fce479f4d7759aa4bc6';

  try {
    if (!userId) {
      console.log('User ID is null.');
    }
  } catch (err) {
    console.log(err);
  }
  return userId;
}

const genreColors = {
  Colors: '#1b4d2f',
  Sounds: '#1a5261',
  Textures: '#803911',
  Weather: '#845791',
  Nature: '#648a22',
  Relationships: '#b87496',
};

const textColors = {
  'Plot Points': '#5BB2CF',
  Settings: '#BFD25A',
  Objects: '#7BAC8A',
  Traits: '#C97621',
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#151716',
  },
  container: {
    padding: '5%',
    paddingTop: '15%',
    paddingBottom: '15%',
  },
  title: {
    color: '#BFD25A',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  smallButton: {
    height: 24,
    resizeMode: 'contain',
  },
  storyStarterCard: {
    backgroundColor: '#19333D',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: '50%',
    marginTop: 12,
  },
  normalText: {
    color: 'white',
  },
  banner: {
    width: '100%',
    height: 150,
    alignItems: 'left',
    padding: 20,
    borderRadius: 10,
  },
  doorButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  innerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    borderRadius: 20,
    alignItems: 'left',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  topicText: {
    fontSize: 20,
    fontWeight: 600,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',

  },
  buttonContainer: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
  },
  screenTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
  selectText: {
    color: '#aaa',
  },
  deleteText: {
    color: '#DE5B45',
  },
});

export default function ViewAllSavedScreen({ navigation }) {
  const route = useRoute();
  const subject = route.params?.subject;
  const [savedData, setSavedData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState([]);

  const getActivityByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/activity/getByID/${id}`, { timeout: 20000 });
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getPlotPointByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/plotPoint/getByID/${id}`, { timeout: 20000 });
      return res.data.plotPoint;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getTraitByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/characterTrait/getByID/${id}`, { timeout: 20000 });
      return res.data.trait;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getItemByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/item/getByID/${id}`, { timeout: 20000 });
      return res.data.item;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getSettingByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/setting/getByID/${id}`, { timeout: 20000 });
      return res.data.setting;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getPlotPoints = async () => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setSavedData(
        await Promise.all(
          saved.data.savedPlots.reverse().map(
            async (starter) => [
              await getPlotPointByID(starter.plotID), starter.date, starter.plotID,
            ],
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getTraits = async () => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setSavedData(
        await Promise.all(
          saved.data.savedTraits.reverse().map(
            async (starter) => [
              await getTraitByID(starter.traitID), starter.date, starter.traitID,
            ],
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getItems = async () => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setSavedData(
        await Promise.all(
          saved.data.savedItems.reverse().map(
            async (starter) => [
              await getItemByID(starter.objectID), starter.date, starter.objectID,
            ],
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getSettings = async () => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setSavedData(
        await Promise.all(
          saved.data.savedSettings.reverse().map(
            async (starter) => [
              await getSettingByID(starter.settingID), starter.date, starter.settingID,
            ],
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getActivities = async () => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getActivities/${userId}`, { timeout: 20000 });
      setSavedData(
        await Promise.all(
          saved.data.msg.at(0).savedActivities.reverse().map(
            async (activity) => getActivityByID(activity.activityID),
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getTripleFlips = async () => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getTripleFlips/${userId}`, { timeout: 20000 });
      setSavedData(
        await Promise.all(
          saved.data.msg.at(0).savedTripleFlips.reverse().map(
            async (flip) => [flip.flipID, flip.date],
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const removePlot = async (data) => {
    const userId = await getId();
    const plotJSON = {
      plotID: data[2],
    };
    try {
      if (userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removePlots/${userId}`, plotJSON);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const removeItem = async (data) => {
    const userId = await getId();
    const objectJSON = {
      objectID: data[2],
    };
    try {
      if (userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeItems/${userId}`, objectJSON);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const removeTrait = async (data) => {
    const userId = await getId();
    const traitJSON = {
      traitID: data[2],
    };
    try {
      if (userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeTraits/${userId}`, traitJSON);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const removeSetting = async (data) => {
    const userId = await getId();
    const settingJSON = {
      settingID: data[2],
    };
    try {
      if (userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeSettings/${userId}`, settingJSON);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const removeTripleFlip = async (data) => {
    const userId = await getId();
    const flipJSON = {
      flipID: data[0],
    };
    try {
      if (userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeTripleFlips/${userId}`, flipJSON);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const removeActivity = async (data) => {
    const userId = await getId();
    const activityJSON = {
      activityID: data._id,
    };
    try {
      if (userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeActivities/${userId}`, activityJSON);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const changeSelected = (select, data) => {
    const newSelected = [...selected];
    if (select === true) {
      newSelected.push(data);
    } else {
      newSelected.splice(newSelected.indexOf(data), 1);
    }
    setSelected(newSelected);
  };

  const removeSelected = () => {
    const newSavedData = [...savedData];
    switch (subject) {
      case 'Plot Points':
        selected.forEach((data) => {
          removePlot(data);
          newSavedData.splice(newSavedData.indexOf(data), 1);
        });
        break;
      case 'Traits':
        selected.forEach((data) => {
          removeTrait(data);
          newSavedData.splice(newSavedData.indexOf(data), 1);
        });
        break;
      case 'Objects':
        selected.forEach((data) => {
          removeItem(data);
          newSavedData.splice(newSavedData.indexOf(data), 1);
        });
        break;
      case 'Settings':
        selected.forEach((data) => {
          removeSetting(data);
          newSavedData.splice(newSavedData.indexOf(data), 1);
        });
        break;
      case 'Triple Flips':
        selected.forEach((data) => {
          removeTripleFlip(data);
          newSavedData.splice(newSavedData.indexOf(data), 1);
        });
        break;
      case 'Door Activities':
        selected.forEach((data) => {
          removeActivity(data);
          newSavedData.splice(newSavedData.indexOf(data), 1);
        });
        break;
      default:
    }
    setSavedData(newSavedData);
    setSelected([]);
    setEditMode(false);
  };

  useEffect(() => {
    switch (subject) {
      case 'Plot Points':
        getPlotPoints();
        break;
      case 'Traits':
        getTraits();
        break;
      case 'Objects':
        getItems();
        break;
      case 'Settings':
        getSettings();
        break;
      case 'Triple Flips':
        getTripleFlips();
        break;
      case 'Door Activities':
        getActivities();
        break;
      default:
    }
  }, []);

  let display = null;
  if (subject === 'Traits' || subject === 'Plot Points' || subject === 'Settings' || subject === 'Objects') {
    display = savedData.map((data, index, array) => (
      <View style={{ width: '100%' }} key={data[2]}>
        {index === 0 || array[index - 1][1] !== data[1]
          ? <Text style={[styles.normalText, { marginTop: 12 }]}>{data[1]}</Text>
          : null}
        {editMode === true
          ? (
            <View style={[styles.horizontalContainer, { marginTop: 12 }]} key={data[2]}>
              <View style={styles.buttonContainer}>
                <BouncyCheckbox
                  size={20}
                  fillColor="#aaa"
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={(isChecked) => changeSelected(isChecked, data)}
                />
              </View>
              <View style={[styles.innerCard, { width: '90%' }]}>
                <Text style={[styles.topicText, { color: textColors[subject] }]}>
                  {data[0]}
                </Text>
              </View>
            </View>
          )
          : (
            <View style={[styles.innerCard, { marginTop: 12 }]} key={data[2]}>
              <Text style={[styles.topicText, { color: textColors[subject] }]}>
                {data[0]}
              </Text>
            </View>
          )}
      </View>
    ));
  } else if (subject === 'Triple Flips') {
    display = savedData.map((data, index) => (
      editMode === true
        ? (
          <View key={index} style={styles.horizontalContainer}>
            <View style={styles.buttonContainer}>
              <BouncyCheckbox
                size={20}
                fillColor="#aaa"
                innerIconStyle={{ borderWidth: 2 }}
                onPress={(isChecked) => changeSelected(isChecked, data)}
              />
            </View>
            <View style={{ width: '90%' }}>
              <TripleFlipHistoryCard
                flipId={data[0]}
                date={data[1]}
              />
            </View>
          </View>
        )
        : (
          <TripleFlipHistoryCard
            key={index}
            flipId={data[0]}
            date={data[1]}
          />
        )
    ));
  } else if (subject === 'Door Activities') {
    display = savedData.map((data) => (
      editMode === true
        ? (
          <View style={[styles.horizontalContainer, { marginTop: 20 }]} key={data._id}>
            <View style={styles.buttonContainer}>
              <BouncyCheckbox
                size={20}
                fillColor="#aaa"
                innerIconStyle={{ borderWidth: 2 }}
                onPress={(isChecked) => changeSelected(isChecked, data)}
              />
            </View>
            <View style={{ width: '90%' }} key={data[0]}>
              <TouchableOpacity
                style={[styles.banner, { backgroundColor: genreColors[data.genre] }]}
              >
                <Text style={styles.doorButtonText}>
                  {data.activity[0]}
                </Text>
                <Text style={{ color: 'white', marginTop: 20 }}>
                  {data.activity.length - 2}
                  {' '}
                  {data.activity.length - 2 === 1 ? 'step' : 'steps'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        : (
          <TouchableOpacity
            key={data._id}
            style={[styles.banner, { backgroundColor: genreColors[data.genre], marginTop: 20 }]}
          >
            <Text style={styles.doorButtonText}>
              {data.activity[0]}
            </Text>
            <Text style={{ color: 'white', marginTop: 20 }}>
              {data.activity.length - 2}
              {' '}
              {data.activity.length - 2 === 1 ? 'step' : 'steps'}
            </Text>
          </TouchableOpacity>
        )
    ));
  }
  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.horizontalContainer, { marginBottom: 12 }]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backButton} style={styles.smallButton} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '80%', alignItems: 'center' }}>
            <Text style={styles.screenTitle}>{subject}</Text>
          </View>
          <View style={[styles.buttonContainer, { alignItems: 'flex-end' }]}>
            {editMode === false
              ? (
                <TouchableOpacity onPress={() => setEditMode(true)}>
                  <Image source={editButton} style={styles.smallButton} />
                </TouchableOpacity>
              )
              : null}
          </View>
        </View>
        {editMode === true
          ? (
            <View style={[styles.horizontalContainer, { marginTop: 12 }]}>
              <View style={{ width: '50%', alignItems: 'flex-start' }}>
                <Text style={styles.selectText}>
                  {selected.length}
                  {' '}
                  selected
                </Text>
              </View>
              <View style={{ width: '50%', alignItems: 'flex-end' }}>
                {selected.length === 0
                  ? (
                    <TouchableOpacity onPress={() => setEditMode(false)}>
                      <Text style={styles.deleteText}>Cancel</Text>
                    </TouchableOpacity>
                  )
                  : (
                    <TouchableOpacity onPress={() => removeSelected()}>
                      <Text style={styles.deleteText}>
                        Delete all (
                        {selected.length}
                        )
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          )
          : null}
        { display }
      </ScrollView>
    </View>
  );
}

ViewAllSavedScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
