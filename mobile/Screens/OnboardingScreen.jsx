import { React, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Animated, FlatList,
} from 'react-native';
//import Onboarding from 'react-native-onboarding-swiper';
import welcomeIcon from '../assets/welcomeIcon.png';
import OnboardingItem from '../Components/OnboardingItem';
import Paginator from '../Components/Paginator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nextAlign: {
    marginLeft: 50,
    flexDirection: 'row',
    justifyContent: 'space-between', // Place items at each end of the row
    alignItems: 'center',
    width: '80%', // Adjust the width as needed
  },
  nextButton: {
    backgroundColor: '#BFD25A',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 20,
    marginBottom: 50,
  },
  nextText: {
    // font: 'Lato',
    fontSize: 20,
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
      title: 'This is your personal tool.',
      description: 'helloooooooooo',
      image: require('../assets/welcomeIcon.png'),
    },
    {
      id: 3,
      title: 'Unique prompts and features.',
      description: 'placeholder',
      image: require('../assets/welcomeIcon.png'),
    },
  ];

  const[currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const renderItem = ({ item }) => <OnboardingItem item={item} />;

  const handleNext = () => {
    const nextIndex = currentIndex + 1;

    // If it's the last onboarding page, navigate to another screen
    if (nextIndex === slides.length) {
      navigation.navigate('Sign Up'); // Replace 'NextScreen' with the name of your target screen
    } else {
      // Scroll to the next page
      if (slidesRef.current && nextIndex < slides.length) {
        slidesRef.current.scrollToIndex({ index: nextIndex });
      }
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
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
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />

      <View style={styles.nextAlign}>
        <Paginator data={slides} scrollX={scrollX} />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

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