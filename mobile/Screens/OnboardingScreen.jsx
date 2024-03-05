import { React, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Animated, FlatList
} from 'react-native';
//import Onboarding from 'react-native-onboarding-swiper';
import welcomeIcon from '../assets/welcomeIcon.png';
import OnboardingItem from '../Components/OnboardingItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function OnboardingScreen({ navigation }) {
  const slides = [
    {
      id: 1,
      title: 'Challenge your creativity!',
      description: 'placeholder',
      image: require('../assets/welcomeIcon.png'),
    },
    {
      id: 2,
      title: 'Improve your writing skills!',
      description: 'placeholder',
      image: require('../assets/welcomeIcon.png'),
    },
    {
      id: 3,
      title: 'Your own writing tool!',
      subtitle: 'placeholder',
      image: require('../assets/welcomeIcon.png'),
    },
  ];

  const[currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        ref={slidesRef}
      />
    </View>
  );
}

/*
// Skip component as a function declaration
function Skip({ ...props }) {
  return (
    <TouchableOpacity
      style={{
        marginLeft: 10,
        marginHorizontal: 10,
      }}
      {...props}
    >
      <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
  );
}

// Next component as a function declaration
function Next({ ...props }) {
  return (
    <TouchableOpacity
      style={{
        //width: 220,
        //height: 60,
        marginHorizontal: 10,
      }}
      {...props}
    >
      <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
  );
}

// Done component as a function declaration
function Done({ ...props }) {
  return (
    <TouchableOpacity
      style={{
        width: 220,
        marginHorizontal: 10,
      }}
      {...props}
    >
      <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  );
}

function CustomDot({ selected }) {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 10,
        borderRadius: 10, // Set border radius for a rounded appearance
        backgroundColor: selected ? '#000' : '#888', // Change colors as needed
        marginHorizontal: 3,
        marginBottom: 500,
      }}
    />
  );
}

/*
export default function OnboardingScreen({ navigation }) {
  const handleNext = () => {
    navigation.replace('Sign Up');
  };

  return (
    <View style={styles.container}>
      <Onboarding
        DotComponent={CustomDot}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        bottomBarColor="#fff"
        onSkip={() => navigation.replace('Sign Up')}
        onDone={() => navigation.navigate('Sign Up')}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={welcomeIcon} />,
            title: 'Challenge your creativity!',
            subtitle: 'placeholder',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={welcomeIcon} />,
            title: 'Improve your writing skills!',
            subtitle: 'placeholder',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={welcomeIcon} />,
            title: 'Your own writing tool!',
            subtitle: 'placeholder',
          },
        ]}
      />
      <TouchableOpacity>
        <Text style={{ fontSize: 16 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
*/

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

//DELETE ONBOARDING IN APP NAVIGATION LATERRRR