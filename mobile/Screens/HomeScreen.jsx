import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, Dimensions, ScrollView, Alert,
} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
import Storage from '../Components/Storage';
import HomeScreenCard from '../Components/HomeScreenCard';
import TabBar from '../Components/HomeScreenTab';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    gap: 20,
  },

  headerBanner: {
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    align: 'center',
    height: window.height * 0.20,
    paddingTop: 30, // Padding for the top
    paddingBottom: 10, // Padding for the bottom
    paddingLeft: 15, // Padding for the left (if needed)
    paddingRight: 15, // Padding for the right (if needed)
  },

  bottomHalfContainer: {
    alignItems: 'center',
  },

  cardContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
  },

  logoutButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
  },
});

export default function HomeScreen({ navigation }) {
  const [allSaved, setAllSaved] = useState('');
  const [activities, setActivities] = useState('');
  const [storyStarters, setStoryStarters] = useState('');
  const [pepTalks, setPepTalks] = useState('');
  const [writingTips, setWritingTips] = useState('');
  const [tripleFlips, setTripleFlips] = useState('');
  const [page, setPage] = React.useState('pep_talk');
  const [cardData, setCardData] = React.useState('default_text');

  const deleteToken = async () => {
    try {
      // Delete email and password asyncronously
      await SecureStore.deleteItemAsync('email');
      await SecureStore.deleteItemAsync('password');
      // Navigate to login screen
      navigation.navigate('Log In');
    } catch (error) {
      console.error('Error deleting user token information:', error);
    }
  };

  const handleLogOut = async () => {
    try {
      deleteToken();
    } catch (err) {
      console.error(err.message);
      Alert.alert('Error', 'Cannot log out');
    }
  };

  async function getId() {
    const userId = await Storage({ key: 'hello', value: '', saveKey: false });

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

  const getActivities = async () => {
    const userId = await getId();

    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getActivities/${userId}`, { timeout: 20000 });
      setActivities(saved.data);
      return saved.data;
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

  const getTripleFlips = async () => {
    const userId = await getId();

    try {
      const saved = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getTripleFlips/${userId}`, { timeout: 20000 });
      setTripleFlips(saved.data);
      return saved.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  // Retrieves and sets cardText to a PepTalk json object from database
  const getCardText = async (route) => {
    setCardData('');
    try {
      const res = await axios.get(process.env.EXPO_PUBLIC_SERVER_URL + route);
      setCardData(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    getCardText('/pepTalk/get');
  }, []);

  function displayPage() {
    if (page === 'saved') {
      return (
        <View>
          <HomeScreenCard text="saved placeholder" getNewText={() => getCardText()} />
        </View>
      );
    }
    if (page === 'writing_tip') {
      return (
        <View>
          <HomeScreenCard text={cardData} getNewText={() => getCardText('/writingTip/get')} />
        </View>
      );
    }
    return (
      <View>
        <HomeScreenCard text={cardData} getNewText={() => getCardText('/pepTalk/get')} />
      </View>
    );
  }
  const welcomeBanner = (
    <View style={styles.headerBanner}>
      <Text style={styles.title}>
        Hi Edwardo & Cwu,
      </Text>
      <Text style={styles.description}>
        the toolkit is where you can find writing
        help and your saved items!
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {
        welcomeBanner
      }
        <View style={styles.bottomHalfContainer}>
          <TabBar selectedTab={page} setPage={setPage} getText={getCardText} />
        </View>
        <View style={styles.cardContainer}>
          {
          displayPage()
        }
        </View>
      </View>
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button onPress={getAllSaved} title="Get all saved" />
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
        ))}
        <Button onPress={getActivities} title="Writing Activities" />
        {Object.keys(activities).map((key) => (
          <View key={key}>
            {activities[key] && activities[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(activities[key])}
            </Text>
            )}
          </View>
        ))}
        <Button onPress={getStoryStarters} title="Story Starters" />
        {Object.keys(storyStarters).map((key) => (
          <View key={key}>
            {storyStarters[key] && storyStarters[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(storyStarters[key])}
            </Text>
            )}
          </View>
        ))}
        <Button onPress={getPepTalks} title="Pep Talks" />
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
        ))}
        <Button onPress={getWritingTips} title="Writing Tips" />
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
        ))}
        <Button onPress={getTripleFlips} title="Triple Flips" />
        {Object.keys(tripleFlips).map((key) => (
          <View key={key}>
            {tripleFlips[key] && tripleFlips[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(tripleFlips[key])}
            </Text>
            )}
          </View>
        ))}
      </View>
      <View style={styles.logoutButton}>
        <Button title="Log Out" onPress={handleLogOut} color="#000000" />
      </View>
    </ScrollView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
