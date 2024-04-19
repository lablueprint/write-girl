import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import ActivityNavigationCard from '../../Components/ActivityNavigationCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const activityData = [
  {
    activity: 'Pocket Prompts',
    description: 'hello fejfiejfiejfiejf',
    backgroundColor: '#F3A749',
  },
  {
    activity: 'Story Starters',
    description: 'hello fejfiejfiejfiejf',
    backgroundColor: '#53116A',
  },
  {
    activity: 'Door Activity',
    description: 'hello fejfiejfiejfiejf',
    backgroundColor: '#3498db',
  },
  {
    activity: 'Triple Flip',
    description: 'hello fejfiejfiejfiejf',
    backgroundColor: '#e74c3c',
  },
];

export default function ActivityHomeScreen() {
  return (
    <View style={styles.container}>
      {activityData.map((activity, index) => (
        <ActivityNavigationCard
          key={index}
          activity={activity.activity}
          description={activity.description}
          backgroundColor={activity.backgroundColor}
        />
      ))}
    </View>
  );
}
