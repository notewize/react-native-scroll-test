import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  Animated,
  Dimensions,
  StyleSheet,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const TOTAL_SECTIONS = 100;

const App: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  animatedValue.addListener(({value}) => {
    console.log('Animated value: ', value);
  });

  const handlePlay = () => {
    console.log('play');
    setIsPlaying(true);
    Animated.timing(animatedValue, {
      toValue: -TOTAL_SECTIONS * width,
      duration:
        (TOTAL_SECTIONS + currentValue / (TOTAL_SECTIONS * width)) * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setIsPlaying(false));
  };

  const handlePause = () => {
    console.log('pause');
    setIsPlaying(false);
    animatedValue.stopAnimation(value => {
      console.log('Stop', value);
      setCurrentValue(value);
    });
  };

  const sections = Array.from({length: TOTAL_SECTIONS}).map((_, index) => (
    <View key={index} style={[styles.section, {width}]}>
      <Text style={styles.sectionText}>{index}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Play" onPress={handlePlay} disabled={isPlaying} />
        <Button title="Pause" onPress={handlePause} disabled={!isPlaying} />
      </View>
      <Animated.View style={{transform: [{translateX: animatedValue}]}}>
        <LinearGradient
          colors={['white', 'red']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          {sections}
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  gradient: {
    flexDirection: 'row',
    width: width * TOTAL_SECTIONS,
    height: 300,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 100,
    zIndex: 100,
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 100,
    fontWeight: 'bold',
  },
});

export default App;
