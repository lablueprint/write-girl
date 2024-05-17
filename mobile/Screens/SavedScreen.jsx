import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
  ScrollView, Pressable, Button,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import TripleFlipHistoryCard from '../Components/TripleFlipHistoryCard';

// List of genre mappings in order
const genreColors = {
  Colors: '#1b4d2f',
  Sounds: '#1a5261',
  Textures: '#803911',
  Weather: '#845791',
  Nature: '#648a22',
  Relationships: '#b87496',
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#151716',
  },
  container: {
    backgroundColor: '#151716',
    alignItems: 'left',
    padding: '5%',
    paddingTop: '10%',
    paddingBottom: '15%',
  },
  title: {
    color: '#BFD25A',
    fontSize: 32,
    fontWeight: 'bold',
  },
  titleContainer: {
    width: '75%',
  },
  buttonContainer: {
    width: '25%',
  },
  viewAllButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 4,
    borderRadius: '50%',
    borderColor: 'white',
    borderWidth: 1,
    width: '100%',
    position: 'absolute',
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    marginTop: 16,
    marginBottom: 8,
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
});

export default function SavedScreen({ navigation }) {
  const [allSaved, setAllSaved] = useState('');
  const [activities, setActivities] = useState([]);
  const [storyStarters, setStoryStarters] = useState('');
  const [plotPoints, setPlotPoints] = useState([]);
  const [traits, setTraits] = useState([]);
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState([]);
  const [pepTalks, setPepTalks] = useState('');
  const [writingTips, setWritingTips] = useState('');
  const [tripleFlips, setTripleFlips] = useState([]);

  const navigateToViewAllSavedScreen = (option) => {
    if (option !== '') {
      navigation.navigate('View All Saved', {
        subject: option,
      });
    }
  };

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

  const getAllSaved = async () => {
    const userId = await getId();
    try {
      if (userId) {
        const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getAllSaved/${userId}`, { timeout: 20000 });
        setAllSaved(saved.data);
        return saved.data;
      }
      console.log('User ID is null.');
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getStoryStarters = async () => {
    const userId = await getId();

    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setStoryStarters(saved.data);
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

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
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getTraitByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/characterTrait/getByID/${id}`, { timeout: 20000 });
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getItemByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/item/getByID/${id}`, { timeout: 20000 });
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getSettingByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/setting/getByID/${id}`, { timeout: 20000 });
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getPlotPoints = async (n) => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setPlotPoints(
        await Promise.all(
          saved.data.savedPlots.reverse().slice(0, n).map(
            async (starter) => getPlotPointByID(starter.plotID),
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getTraits = async (n) => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setTraits(
        await Promise.all(
          saved.data.savedTraits.reverse().slice(0, n).map(
            async (starter) => getTraitByID(starter.traitID),
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getItems = async (n) => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setItems(
        await Promise.all(
          saved.data.savedItems.reverse().slice(0, n).map(
            async (starter) => getItemByID(starter.objectID),
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getSettings = async (n) => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getStoryStarters/${userId}`, { timeout: 20000 });
      setSettings(
        await Promise.all(
          saved.data.savedSettings.reverse().slice(0, n).map(
            async (starter) => getSettingByID(starter.settingID),
          ),
        ),
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  const getActivities = async (n) => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getActivities/${userId}`, { timeout: 20000 });
      setActivities(
        await Promise.all(
          saved.data.msg.at(0).savedActivities.reverse().slice(0, n).map(
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
  const getPepTalks = async () => {
    const userId = await getId();

    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getPepTalks/${userId}`, { timeout: 20000 });
      setPepTalks(saved.data);
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };
  const getWritingTips = async () => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getWritingTips/${userId}`, { timeout: 20000 });
      setWritingTips(saved.data);
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };
  const getTripleFlips = async (n) => {
    const userId = await getId();
    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getTripleFlips/${userId}`, { timeout: 20000 });
      setTripleFlips(
        await Promise.all(
          saved.data.msg.at(0).savedTripleFlips.reverse().slice(0, n).map(
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

  useEffect(() => {
    getPlotPoints(3);
    getTraits(3);
    getItems(3);
    getSettings(3);
    getTripleFlips(1);
    getActivities(1);
  }, []);

  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Plot Points</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.viewAllButton} onPress={() => navigateToViewAllSavedScreen('Plot Points')}>
              <Text style={styles.normalText}>View all</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.normalText}>Most recent</Text>
        {plotPoints.map((starter) => (
          <View style={styles.storyStarterCard}>
            <Text style={styles.normalText} key={starter._id}>
              {starter.plotPoint}
            </Text>
          </View>
        ))}
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Traits</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.viewAllButton} onPress={() => navigateToViewAllSavedScreen('Traits')}>
              <Text style={styles.normalText}>View all</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.normalText}>Most recent</Text>
        {traits.map((starter) => (
          <View style={styles.storyStarterCard}>
            <Text style={styles.normalText} key={starter._id}>
              {starter.trait}
            </Text>
          </View>
        ))}
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Objects</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.viewAllButton} onPress={() => navigateToViewAllSavedScreen('Objects')}>
              <Text style={styles.normalText}>View all</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.normalText}>Most recent</Text>
        {items.map((starter) => (
          <View style={styles.storyStarterCard}>
            <Text style={styles.normalText} key={starter._id}>
              {starter.item}
            </Text>
          </View>
        ))}
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Settings</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.viewAllButton} onPress={() => navigateToViewAllSavedScreen('Settings')}>
              <Text style={styles.normalText}>View all</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.normalText}>Most recent</Text>
        {settings.map((starter) => (
          <View style={styles.storyStarterCard}>
            <Text style={styles.normalText} key={starter._id}>
              {starter.setting}
            </Text>
          </View>
        ))}
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Triple Flips</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.viewAllButton} onPress={() => navigateToViewAllSavedScreen('Triple Flips')}>
              <Text style={styles.normalText}>View all</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.normalText}>Most recent</Text>
        {tripleFlips.map((flip, index) => (
          <TripleFlipHistoryCard
            key={index}
            flipId={flip[0]}
            date={flip[1]}
          />
        ))}
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Door Activities</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.viewAllButton} onPress={() => navigateToViewAllSavedScreen('Door Activities')}>
              <Text style={styles.normalText}>View all</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.normalText}>Most recent</Text>
        {activities.map((activityObj) => (
          <TouchableOpacity
            key={activityObj._id}
            style={[styles.banner, { backgroundColor: genreColors[activityObj.genre] }]}
          >
            <Text style={styles.doorButtonText}>
              {activityObj.activity[0]}
            </Text>
            <Text style={{ color: 'white', marginTop: 20 }}>
              {activityObj.activity.length - 2}
              {' '}
              {activityObj.activity.length - 2 === 1 ? 'step' : 'steps'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

SavedScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
