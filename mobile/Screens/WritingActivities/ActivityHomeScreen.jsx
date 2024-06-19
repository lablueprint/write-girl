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
    flex: 1,
    backgroundColor: '#021921',
  },
});

const activityData = [
  {
    activity: 'Pocket Prompts',
    description: 'Let the collection of objects and words inspire a poem, story or even a song. Dont think...',
    image: PocketPromptsImage,
    pageDirect: 'Pocket Prompt Home',
  },
  {
    activity: 'Story Starters',
    description: 'Let the collection of objects and words inspire a poem, story or even a song. Dont think...',
    image: StoryStartersImage,
    pageDirect: 'Story Starters',
  },
  {
    activity: 'Door Activity',
    description: 'Let the collection of objects and words inspire a poem, story or even a song. Dont think...',
    image: DoorActivityImage,
    pageDirect: 'Door Activity',
  },
  {
    activity: 'Triple Flips',
    description: 'Let the collection of objects and words inspire a poem, story or even a song. Dont think...',
    image: TripleFlipsImage,
    pageDirect: 'Triple Flip',
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
