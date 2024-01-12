import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function StoryStarterScreen() {
  const [trait, setTrait] = useState('a');
  const [plotPoint, setPlotPoint] = useState('aa');
  const [setting, setSetting] = useState('');
  const [item, setItem] = useState('');

  const getTrait = async () => {
    try {
      const randomTrait = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/trait/get`, { timeout: 20000 });
      setTrait(randomTrait.data);
    } catch (err) {
      console.log(err);
    }
    return true;
  };
  const getPlotPoint = async () => {
    try {
      console.log('clicked button');
      const randomPlotPoint = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/plotPoint/get`, { timeout: 20000 });
      setPlotPoint(randomPlotPoint.data);
    } catch (err) {
      console.log(err);
    }
    return true;
  };
  const getSetting = async () => {
    try {
      const randomSetting = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/setting/get`, { timeout: 20000 });
      setSetting(randomSetting.data);
    } catch (err) {
      console.log(err);
    }
    return true;
  };
  const getItem = async () => {
    try {
      const randomItem = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/item/get`, { timeout: 20000 });
      setItem(randomItem.data);
      return randomItem.data;
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  useEffect(() => {
    getTrait();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Story Starter Screen</Text>
      <Button onPress={getTrait} title="Get random character trait" />
      <Text>{trait}</Text>
      <Button onPress={getPlotPoint} title="Get random plot point" />
      <Text>{plotPoint}</Text>
      <Button onPress={getSetting} title="Get random setting" />
      <Text>{setting}</Text>
      <Button onPress={getItem} title="Get random item" />
      <Text>{item}</Text>
    </View>
  );
}
