import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import PocketPromptsImage from '../../assets/pocketprompts.png';
import StoryStartersImage from '../../assets/storystarters.png';
import DoorActivityImage from '../../assets/dooractivity.png';
import TripleFlipsImage from '../../assets/tripleflips.png';
import ActivityNavigationCard from '../../Components/ActivityNavigationCard';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
});

const activityData = [
  {
    activity: 'Pocket Prompts',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: PocketPromptsImage,
    pageDirect: 'Home',
  },
  {
    activity: 'Story Starters',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: StoryStartersImage,
    pageDirect: 'Story Starters',
  },
  {
    activity: 'Door Activity',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: DoorActivityImage,
    pageDirect: 'Home',
  },
  {
    activity: 'Triple Flips',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: TripleFlipsImage,
    pageDirect: 'Home',
  },
];

export default function ActivityHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {activityData.map((activity, index) => (
        <ActivityNavigationCard
          key={index}
          activity={activity.activity}
          description={activity.description}
          image={activity.image}
          pageDirect={activity.pageDirect}
          navigation={navigation}
        />
      ))}
    </View>
  );
}

ActivityHomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
