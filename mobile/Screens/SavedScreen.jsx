import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';
import Storage from '../Components/Storage';

export default function SavedScreen() {
  const [allSaved, setAllSaved] = useState('');
  const [activities, setActivities] = useState('');
  const [storyStarters, setStoryStarters] = useState('');
  const [pepTalks, setPepTalks] = useState('');
  const [writingTips, setWritingTips] = useState('');
  const [tripleFlips, setTripleFlips] = useState('');

  async function getId() {
    const userId = await Storage({ key: 'userId', value: '', saveKey: false });

    try {
      if (!userId) {
        console.error('User ID is null.');
      }
    } catch (err) {
      console.error(err);
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
      console.error('User ID is null.');
    } catch (err) {
      console.error(err);
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

  return (
    <View>
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
  );
}
