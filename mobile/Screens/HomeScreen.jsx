import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity,
} from 'react-native';
import HomeScreenCard from '../Components/HomeScreenCard';
import TabBar from '../Components/HomeScreenTab';

const window = Dimensions.get('window');
const contentWidth = window.width * 0.9;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
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
    backgroundColor: '#D9D9D9',
    justifyContent: 'space-between',
    width: contentWidth,
  },
});

export default function HomeScreen() {
  const [page, setPage] = React.useState('pep_talk');
  function displayPage() {
    if (page === 'saved') {
      return (
        <View>
          <Text>Placeholder text for the saved writing activities.</Text>
        </View>
      );
    }
    if (page === 'writing_tip') {
      return (
        <View>
          <Text>Placeholder text for the saved writing activities.</Text>
        </View>
      );
    }
    return (
      <View>
        <HomeScreenCard text="pep talk placeholder" />
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
      <TabBar />
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => { setPage('pep_talk'); }}>
          { /* Make sure to add the icon for each individual portion */}
          <Text>
            Pep Talk
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setPage('writing_tip'); }}>
          <Text>
            Writing Tip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setPage('saved'); }}>
          <Text>
            Saved
          </Text>
        </TouchableOpacity>

      </View>
      {
        displayPage()
      }
      <Text>Home Screen</Text>
    </View>
  );
}