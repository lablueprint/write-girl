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
    backgroundColor: 'red',
    display: 'space-between',
  },

  headerBanner: {
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    height: window.height * 0.20,
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
});

export default function HomeScreen() {
  const [page, setPage] = React.useState('pep_talk');
  const [cardData, setCardData] = React.useState('default_text');

  // Retrieves and sets cardText to a PepTalk json object from database
  const getCardText = async ({ route }) => {
    try {
      console.log('requesting axios');
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}${route}`);
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
        <HomeScreenCard text={cardData.talk} />
      </View>
    );
  }
  const welcomeBanner = (
    <View style={styles.headerBanner}>
      <Text>
        Hi, John Doe
      </Text>
      <Text>
        the toolkit is where you can find writing help and your saved items!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {
        welcomeBanner
      }
      <TabBar styles={styles.tabBar} selectedTab={page} setPage={setPage} getText={() => { getCardText('/pepTalk/get'); }} />
      {
        cardData && displayPage()
      }
      <Text>Home Screen</Text>
    </View>
  );
}
