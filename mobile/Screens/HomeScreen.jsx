import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import HomeScreenCard from '../Components/HomeScreenCard';
import TabBar from '../Components/HomeScreenTab';

const window = Dimensions.get('window');
const contentWidth = window.width * 0.9;
const buttonHeight = window.height * 0.05;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'space-between',
    justifyContent: 'center',
  },

  headerBanner: {
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    align: 'center',
    height: window.height * 0.20,
    paddingTop: 30,   // Padding for the top
    paddingBottom: 10, // Padding for the bottom
    paddingLeft: 15,  // Padding for the left (if needed)
    paddingRight: 15, // Padding for the right (if needed)
  },

  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    // backgroundColor: '#D9D9D9',
    // justifyContent: 'space-between',
    width: contentWidth,
    height: buttonHeight,
  },

  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
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
});

export default function HomeScreen() {
  const [page, setPage] = React.useState('pep_talk');
  const [cardData, setCardData] = React.useState('default_text');

  // Retrieves and sets cardText to a PepTalk json object from database
  const getCardText = async (route) => {
    try {
      console.log('requesting axios data');
      const res = await axios.get(process.env.EXPO_PUBLIC_SERVER_URL + route);
      console.log('retrieved data');
      setCardData(res.data);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  function displayPage() {
    if (page === 'saved') {
      return (
        <View>
          <HomeScreenCard text="saved placeholder" />
        </View>
      );
    }
    if (page === 'writing_tip') {
      return (
        <View>
          <HomeScreenCard text="writing tips placeholder" />
        </View>
      );
    }
    return (
      <View>
        <HomeScreenCard text={cardData} />
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
    <View style={styles.container}>
      {
        welcomeBanner
      }
      <TabBar styles={styles.tabBar} selectedTab={page} setPage={setPage} getText={() => { setCardData(''); getCardText('/pepTalk/get'); }} />
      <View style={styles.cardContainer}>
        {
          displayPage()
        }
      </View>
    </View>
  );
}

