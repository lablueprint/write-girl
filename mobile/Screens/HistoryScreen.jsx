import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView, FlatList,
} from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue, withTiming, withDelay, withSpring,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import axios from 'axios';
import TripleFlipHistoryCard from '../Components/TripleFlipHistoryCard';

const buffer = Dimensions.get('screen').width * 0.05;
const halfBuffer = 0.5 * buffer;
const styles = StyleSheet.create({
  main: {
    paddingTop: '10%',
    paddingHorizontal: '5%',
    backgroundColor: '#151716',
    height: '100%',
  },
  title: {
    paddingBottom: '2.5%',
    paddingVertical: '10%',
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  scrollContainer: {
    height: '40%',
  },
  scroll: {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
  },
  historyContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10%',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarText: {
    color: 'white',
    fontSize: 16,
  },
  caption: {
    color: 'white',
    fontSize: 16,
    paddingBottom: buffer,
  },
});

async function getId() {
  // let userId = await Storage({ key: 'hello', value: '', saveKey: false });
  const userId = '65bc75ca64a9510aeb9c5cc0';
  try {
    if (!userId) {
      console.log('User ID is null.');
    }
  } catch (err) {
    console.log(err);
  }
  return userId;
}

export default function HistoryScreen({ navigation }) {
  const [flipIDs, setFlipHistory] = useState([]);
  useEffect(async () => {
    const getHistory = async () => {
      try {
        const userId = await getId();
        console.log(userId);
        const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getTripleFlipHistory/${userId}`);
        setFlipHistory(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    let history = await getHistory();
    history = JSON.parse(JSON.stringify(history.tripleFlipHistory));
    setFlipHistory(history);
  }, []);

  const flipHistory = Object.keys(flipIDs).map(
    (tripleFlip) => <TripleFlipHistoryCard flipId={flipIDs[tripleFlip].flipID} date={flipIDs[tripleFlip].date} />,
  );

  return (
    <View style={styles.main}>
      <View>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Text style={styles.navbarText}>
              &lt;
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          Triple Flips History
        </Text>
        <Text style={styles.caption}>
          See all your past flips!
        </Text>
        <TouchableOpacity
          style={{
            display: 'flex', backgroundColor: 'red', borderRadius: 20, paddingHorizontal: halfBuffer, width: '30%', justifyContent: 'center', alignItems: 'center',
          }}
          onPress={() => { setFlipHistory(Array.from(flipIDs.reverse())); }}
        >
          <Text style={{
            color: 'white', borderRadius: 20,
          }}
          >
            Most Recent
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1, borderRadius: 20,
      }}
      >
        <ScrollView>
          {
              flipHistory
            }
          <View style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', paddingHorizontal: buffer, paddingVertical: buffer,
          }}
          >
            <Text style={{
              color: 'white', fontWeight: '800', paddingHorizontal: halfBuffer, paddingVertical: halfBuffer,
            }}
            >
              Reached the End?
            </Text>
            <Text style={{
              color: 'white', paddingHorizontal: buffer, paddingBottom: 4 * buffer, paddingTop: buffer,
            }}
            >
              Your creativity hasn&apos;t.
              Flipped anew and continue on your journey of inspiration.
            </Text>
          </View>
        </ScrollView>
      </View>

    </View>
  );
}

HistoryScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
