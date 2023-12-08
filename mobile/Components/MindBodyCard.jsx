import {
  StyleSheet, Text, View, Button, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-deck-swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

export default function MindBodyCard({ activity, number }) {
  return (
    <View style={styles.container}>
      <Swiper
        cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.text}>{card}</Text>
          </View>
        )}
        onSwiped={(cardIndex) => { console.log(cardIndex); }}
        onSwipedAll={() => { console.log('onSwipedAll'); }}
        cardIndex={0}
        backgroundColor="#4FD0E9"
        stackSize={3}
      >
        <Button
          onPress={() => { console.log('oulala'); }}
          title="Press me"
        >
          You can press me
        </Button>
      </Swiper>
    </View>
  );
}

MindBodyCard.propTypes = {
  activity: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
