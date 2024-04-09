import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, Dimensions, ScrollView, Alert,
} from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import HomeScreenCard from '../Components/HomeScreenCard';
import TabBar from '../Components/HomeScreenTab';
import { logout } from '../redux/sliceAuth';

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

export default function HomeScreen() {
  const [page, setPage] = React.useState('pep_talk');
  const [cardData, setCardData] = React.useState('default_text');
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      dispatch(logout());
    } catch (err) {
      console.error(err.message);
      Alert.alert('Error', 'Cannot log out');
    }
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
      </View>
      <View style={styles.logoutButton}>
        <Button title="Log Out" onPress={handleLogOut} color="#000000" />
      </View>
    </ScrollView>
  );
}
