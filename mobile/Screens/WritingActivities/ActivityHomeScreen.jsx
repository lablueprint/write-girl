import React from 'react';
import {
  View,
} from 'react-native';
import ActivityNavigationCard from '../../Components/ActivityNavigationCard';

const activityData = [
  {
    activity: 'Pocket Prompts',
    description: 'hello fejfiejfiejfiejf',
    backgroundColor: '#3498db',
  },
  {
    activity: 'Story Starters',
    description: 'hello fejfiejfiejfiejf',
    backgroundColor: '#e74c3c',
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
    <View>
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
