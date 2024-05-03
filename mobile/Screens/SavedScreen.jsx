import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';
import Storage from '../Components/Storage';

export default function SavedScreen() {
  const [allSaved, setAllSaved] = useState('');
  const [activities, setActivities] = useState('');
  const [storyStarters, setStoryStarters] = useState('');
  const [plotPoints, setPlotPoints] = useState([]);
  const [pepTalks, setPepTalks] = useState('');
  const [writingTips, setWritingTips] = useState('');
  const [tripleFlips, setTripleFlips] = useState('');

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
              {JSON.stringify(activities[key].at(0))}
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
              {storyStarters[key].slice(0, 3).reverse().map((starter) => (
                starter.plotID
              ))}
            </Text>
          )}
        </View>
      ))}
      <Button onPress={() => getPlotPoints(3)} title="Plot Points" />
      {plotPoints.map((point) => (
        <Text key={point.plotPoint}>
          {point.plotPoint}
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
      <Button onPress={getTripleFlips} title="Triple Flips" />
      {Object.keys(tripleFlips).map((key) => (
        <View key={key}>
          {tripleFlips[key] && tripleFlips[key].length > 0 && (
            <Text key={key}>
              {key}
              :
              {' '}
              {JSON.stringify(tripleFlips[key].at(0))}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
