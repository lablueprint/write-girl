import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
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
    backgroundColor: ['#EA7806', '#F3A749', '#FFE09D'],
    pageDirect: 'Home',
  },
  {
    activity: 'Story Starters',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    backgroundColor: ['#EA7806', '#F3A749', '#FFE09D'],
    pageDirect: 'Story Starters',
  },
  {
    activity: 'Door Activity',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    backgroundColor: ['#EA7806', '#F3A749', '#FFE09D'],
    pageDirect: 'Home',
  },
  {
    activity: 'Triple Flip',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    backgroundColor: ['#EA7806', '#F3A749', '#FFE09D'],
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
          backgroundColor={activity.backgroundColor}
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

