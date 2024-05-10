import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Button, Text,
  ScrollView, Pressable,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import TripleFlipHistoryCard from '../Components/TripleFlipHistoryCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151716',
    alignItems: 'left',
    padding: '5%',
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  titleContainer: {
    width: '75%',
    height: 40,
  },
  buttonContainer: {
    width: '25%',
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
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
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getPlotPointByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/plotPoint/getByID/${id}`, { timeout: 20000 });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getTraitByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/characterTrait/getByID/${id}`, { timeout: 20000 });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getItemByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/item/getByID/${id}`, { timeout: 20000 });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getSettingByID = async (id) => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/setting/getByID/${id}`, { timeout: 20000 });
      console.log(res.data);
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

  // {Object.keys(storyStarters).map((key) => (
  //   <View key={key}>
  //     {storyStarters[key] && storyStarters[key].length > 0 && (
  //       <Text key={key}>
  //         {key}
  //         :
  //         {' '}
  //         {storyStarters[key].slice(0, 3).reverse().map((starter) => (
  //           JSON.stringify(getPlotPointByID())
  //         ))}
  //       </Text>
  //     )}
  //   </View>
  // ))}

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Button onPress={getAllSaved} title="Get all saved" />
      {Object.keys(allSaved).map((key) => (
        <View key={key}>
          {allSaved[key] && allSaved[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(allSaved[key])}
            </Text>
          )}
        </View>
      ))} */}
      {/* <Button onPress={getStoryStarters} title="Story Starters" />
      {Object.keys(storyStarters).map((key) => (
        <View key={key}>
          {storyStarters[key] && storyStarters[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {storyStarters[key].slice(0, 3).reverse().map((starter) => (
                starter.plotID
              ))}
            </Text>
          )}
        </View>
      ))} */}
      <Button title="View all" onPress={() => navigateToViewAllSavedScreen('plotPoint')} />
      {plotPoints.map((starter) => (
        <Text key={starter._id}>
          {starter.plotPoint}
        </Text>
      ))}
      <Button title="View all" onPress={() => navigateToViewAllSavedScreen('trait')} />
      {traits.map((starter) => (
        <Text key={starter._id}>
          {starter.trait}
        </Text>
      ))}
      <Button title="View all" onPress={() => navigateToViewAllSavedScreen('item')} />
      {items.map((starter) => (
        <Text key={starter._id}>
          {starter.item}
        </Text>
      ))}
      <Button title="View all" onPress={() => navigateToViewAllSavedScreen('setting')} />
      {settings.map((starter) => (
        <Text key={starter._id}>
          {starter.setting}
        </Text>
      ))}
      {/* <Button onPress={getPepTalks} title="Pep Talks" />
      {Object.keys(pepTalks).map((key) => (
        <View key={key}>
          {pepTalks[key] && pepTalks[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(pepTalks[key])}
            </Text>
          )}
        </View>
      ))} */}
      {/* <Button onPress={getWritingTips} title="Writing Tips" />
      {Object.keys(writingTips).map((key) => (
        <View key={key}>
          {writingTips[key] && writingTips[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(writingTips[key])}
            </Text>
          )}
        </View>
      ))} */}
      <View style={styles.headingContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Triple Flips</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.viewAllButton}>
            <Text>View all</Text>
          </Pressable>
        </View>
      </View>
      {tripleFlips.map((flip) => (
        <TripleFlipHistoryCard
          key={flip[0]}
          flipId={flip[0]}
          date={flip[1]}
        />
      ))}
      <Button title="View all" />
      {activities.map((activityObj) => (
        <Text key={activityObj._id}>
          {activityObj.activity[0]}
        </Text>
      ))}
      {/* <Button onPress={getActivities} title="Door Activities" />
      {Object.keys(activities).map((key) => (
        <View key={key}>
          {activities[key] && activities[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(activities[key].at(0))}
            </Text>
          )}
        </View>
      ))} */}
    </ScrollView>
  );
}

SavedScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
