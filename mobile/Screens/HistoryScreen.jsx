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

const styles = StyleSheet.create({
  main: {
    paddingTop: '10%',
    paddingHorizontal: '5%',
    backgroundColor: '#151716',
    height: '100%',
  },
  title: {
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

// const animationDuration = 350;

// function CustomLayoutTransition(values) {
//   'worklet';

//   return {
//     animations: {
//       originY: withTiming(values.targetOriginY, { duration: animationDuration }),
//       originX: withTiming(values.targetOriginX, { duration: animationDuration }),
//       height: withTiming(values.targetHeight, { duration: animationDuration }),
//     },
//     initialValues: {
//       originY: values.currentOriginY,
//       originX: values.currentOriginX,
//       height: values.currentHeight,
//     },
//   };
// }

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
      </View>
      <View style={{
        flex: 1, borderRadius: 20,
      }}
      >
        <ScrollView>
          {
              flipHistory
            }
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
