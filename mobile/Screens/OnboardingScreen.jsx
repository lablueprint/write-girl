import { React, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet, Text, Animated, FlatList,
} from 'react-native';
import OnboardingItem from '../Components/OnboardingItem';
import Paginator from '../Components/Paginator';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nextAlign: {
    marginLeft: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 60,
  },
  nextButton: {
    backgroundColor: '#BFD25A',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 20,
    marginBottom: 60,
  },
  nextText: {
    fontSize: 20,
  },
});

export default function OnboardingScreen({ navigation }) {
  const slides = [
    {
      id: 1,
      title: 'Challenge your creativity!',
      description: 'placeholder to make it look nice and beautiful',
      image: require('../assets/welcome1.png'),
    },
    {
      id: 2,
      title: 'This is your personal tool.',
      description: 'placeholder to make it look nice and beautiful',
      image: require('../assets/welcome2.png'),
    },
    {
      id: 3,
      title: 'Unique prompts and features.',
      description: 'placeholder to make it look nice and beautiful',
      image: require('../assets/welcome3.png'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
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
    <LinearGradient
      style={styles.container}
      colors={['#DE5B45', '#7EA591', '#5CB1CE']}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 1, y: 0 }}
    >
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
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
    </LinearGradient>
  );
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};