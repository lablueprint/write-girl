import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView,
} from 'react-native';
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
  recentFilter: {
    display: 'flex',
    paddingHorizontal: halfBuffer,
    width: '60%',
    flexDirection: 'row',
    columnGap: '2%',
  },
  filterArrowIndicator: {
    color: 'white', borderRadius: 20,
  },
  mostRecent: {
    color: 'white',
    borderRadius: 20,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#FFF',
    height: 0.25,
    width: '100%',
    marginVertical: 20,
  },
  scrollViewContainer: {
    flex: 1,
    borderRadius: 20,
  },
  postHistoryBuffer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: buffer,
    paddingVertical: buffer,
  },
  endScrollText: {
    color: 'white',
    fontWeight: '800',
    paddingHorizontal: halfBuffer,
    paddingVertical: halfBuffer,
  },
  endScrollQuote: {
    color: 'white',
    paddingHorizontal: buffer,
    paddingBottom: 4 * buffer,
    paddingTop: buffer,
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
  const [recent, setRecent] = useState(true);

  const getHistory = async () => {
    try {
      const userId = await getId();
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/getTripleFlipHistory/${userId}`);
      setFlipHistory(JSON.parse(JSON.stringify(res.data.tripleFlipHistory)).reverse());
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const flipHistory = Object.keys(flipIDs).map(
    (tripleFlip, index) => (
      <TripleFlipHistoryCard
        key={index}
        flipId={flipIDs[tripleFlip].flipID}
        date={flipIDs[tripleFlip].date}
      />
    ),
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
          style={styles.recentFilter}
          onPress={() => { setFlipHistory(Array.from(flipIDs.reverse())); setRecent(!recent); }}
        >
          {
            recent
              ? (
                <Text style={styles.filterArrowIndicator}>
                  &#x25BC; Sorting by
                </Text>
              ) : (
                <Text style={styles.filterArrowIndicator}>
                  &#x25B2; Sorting by
                </Text>
              )
          }
          { recent
            ? (
              <Text style={styles.mostRecent}>
                Most Recent
              </Text>
            ) : (
              <Text style={styles.mostRecent}>
                Least Recent
              </Text>
            )}
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.scrollViewContainer}>
        <ScrollView>
          {
              flipHistory
            }
          <View style={styles.postHistoryBuffer}>
            <Text style={styles.endScrollText}>
              Reached the End?
            </Text>
            <Text style={styles.endScrollQuote}>
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
