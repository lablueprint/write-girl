import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableOpacity, Text,
  ScrollView, Button,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import TripleFlipHistoryCard from '../Components/TripleFlipHistoryCard';

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
    alignItems: 'left',
    padding: '5%',
    paddingTop: '10%',
    paddingBottom: '15%',
  },
  title: {
    color: '#BFD25A',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    width: '25%',
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
    marginTop: 20,
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
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    borderRadius: 20,
    alignItems: 'left',
    marginTop: 12,
  },
  topicText: {
    fontSize: 20,
    fontWeight: 600,
  },
});

export default function ViewAllSavedScreen({ navigation }) {
  const route = useRoute();
  const subject = route.params?.subject;
  const [savedData, setSavedData] = useState([]);

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
            async (starter) => [await getPlotPointByID(starter.plotID), starter.date],
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
            async (starter) => [await getTraitByID(starter.traitID), starter.date],
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
            async (starter) => [await getItemByID(starter.objectID), starter.date],
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
            async (starter) => [await getSettingByID(starter.settingID), starter.date],
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

  const printEveryID = async () => {
    console.log('Printing All IDs:');
    // for (let i = 0; i < plotPoints.length; i++) {
    //   console.log(plotPoints[i]._id);
    // }

    // for (let i = 0; i < traits.length; i++) {
    //   console.log(traits[i]._id);
    // }

    // for (let i = 0; i < items.length; i++) {
    //   console.log(items[i]._id);
    // }

    // for (let i = 0; i < settings.length; i++) {
    //   console.log(settings[i]._id);
    // }

    // for (let i = 0; i < tripleFlips.length; i++) {
    //   console.log(tripleFlips[i][2]);
    // }

    // for (let i = 0; i < activities.length; i++) {
    //   console.log(activities[i]._id);
    // }

    console.log('Done');
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
      <View style={{ width: '100%' }}>
        {index === 0 || array[index - 1][1] !== data[1] ? <Text style={[styles.normalText, { marginTop: 12 }]}>{data[1]}</Text> : null}
        <View style={styles.innerCard} key={data[0]}>
          <Text style={[styles.topicText, { color: textColors[subject] }]}>
            {data[0]}
          </Text>
        </View>
      </View>
    ));
  } else if (subject === 'Triple Flips') {
    display = savedData.map((data, index) => (
      <TripleFlipHistoryCard
        key={index}
        flipId={data[0]}
        date={data[1]}
      />
    ));
  } else if (subject === 'Door Activities') {
    display = savedData.map((data) => (
      <TouchableOpacity
        key={data._id}
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
    ));
  }

  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.container}>

        <Button title="Back" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{subject}</Text>
        <Text style={styles.normalText}>Most recent</Text>
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
