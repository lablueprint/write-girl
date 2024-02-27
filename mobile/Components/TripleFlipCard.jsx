import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
const logo = require('../assets/logo.png');

const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderRadius: 20,
    borderWidth: 8,
  },
});

const palette = {
  red: {
    backgroundColor: '#DE5B45',
    borderColor: '#D95B30',
  },
  blue: {
    backgroundColor: '#5BB2CF',
    borderColor: '#3E99B7',
  },
  green: {
    backgroundColor: '#BFD25A',
    borderColor: '#A7C020',
  },
};

const stepStyle = {
  0: {
    height: '15%',
  },
  1: {
    height: '20%',
  },
  2: {
    height: '20%',
  },
  3: {
    height: '20%',
  },
};

export default function TripleFlipCard({ step, image, color }) {
  // WriteGirl logo
  // Triple Flip Image for this particular card
  return (
    <View style={[styles.card, palette[color], stepStyle[step]]}>
      <Text>
        On step:
        {step}
      </Text>
      <Image source={logo} />
    </View>
  );
}

TripleFlipCard.propTypes = {
  step: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
