import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 8,
    flex: 1,
    justifyContent: 'center', // Vertically center
    alignItems: 'center', // Horizontally center
  },
  image: {
    width: '50%',
    height: '80%',
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

export default function TripleFlipCard({ image, color }) {
  // WriteGirl logo
  // Triple Flip Image for this particular card
  return (
    <View style={[styles.card, palette[color]]}>
      <Image style={styles.image} source={image} />
    </View>
  );
}

TripleFlipCard.propTypes = {
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
