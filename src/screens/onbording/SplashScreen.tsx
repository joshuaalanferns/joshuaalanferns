import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width, height} from '../../utility/Dimensions';
import {greating} from '../../utility/dummyData';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {}
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const IMAGE_HEIGHT = 100;
const ANIMATION_DURATION = 600;
const WOBBLE_DURATION = 300;
const WOBBLE_AMPLITUDE = 0;
const SplashScreen: React.FC<Props> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % greating.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [greating]);

  useEffect(() => {
    translateX.value = withTiming(-currentIndex * width, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  }, [currentIndex]);

  const slideStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  const imageY = useSharedValue(IMAGE_HEIGHT);
  const textY = useSharedValue(IMAGE_HEIGHT);
  const wobble = useDerivedValue(() => {
    return interpolate(
      Math.floor(Date.now() / WOBBLE_DURATION) % 2,
      [0, 1],
      [-WOBBLE_AMPLITUDE, WOBBLE_AMPLITUDE],
      Animated.Extrapolate.CLAMP,
    );
  });
  React.useEffect(() => {
    imageY.value = withTiming(0, {duration: ANIMATION_DURATION});
    textY.value = withTiming(IMAGE_HEIGHT - 85, {duration: 1200});
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{translateY: imageY.value}, {rotate: `${wobble.value}deg`}],
  }));

  const textStyle = useAnimatedStyle(() => ({
    transform: [{translateY: textY.value}],
  }));

  const translateY = useSharedValue(100);
  const opacity = useDerivedValue(() => {
    return interpolate(translateY.value, [0, 100], [1, 0], Extrapolate.CLAMP);
  });

  async function getUserData() {
    try {
      const UserData = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(UserData);
      console.log('User data retrieved successfully:', userData);
      if (UserData) {
        navigation.navigate('main');
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  }

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 1000});
    const timer = setTimeout(() => {
      getUserData();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });
  //   console.log('====================================');
  //   console.log(navigation);
  //   console.log('====================================');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.sceondContainer}>
        <AnimatedFastImage
          style={[styles.image, imageStyle]}
          source={{
            uri: 'https://images.squarespace-cdn.com/content/v1/5d156acaa1812b0001589449/1563318589867-YBZF2P63QV1HUHHCQYZ6/Kapture+2019-05-26+at+16.13.55.gif?format=1000w',
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Animated.Text style={[styles.mainText, textStyle]}>
          Hi There,
        </Animated.Text>
        <Animated.Text style={[styles.mainText, textStyle]}>
          I'm Unsplash
        </Animated.Text>
        <Animated.View style={[styles.slider, slideStyle]}>
          {greating.map((item, index) => (
            <View style={styles.slide} key={index}>
              <Text style={styles.secText}>{item.text}</Text>
            </View>
          ))}
        </Animated.View>
        <View style={styles.ThirdContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('main')}>
            <Text style={styles.label}>Let's GO .....</Text>
          </TouchableOpacity>
          <Animated.View style={style}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => navigation.navigate('auth')}>
              <Text style={styles.label2}>Login </Text>
              <Text style={styles.label3}>now for better Experience</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: width,
    height: height,
  },
  slider: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sceondContainer: {
    marginTop: height * 0.03,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: -5,
  },
  mainText: {
    marginTop: -5,
    fontSize: 35,
    color: 'black',
    fontWeight: '500',
  },
  secText: {
    marginTop: height / 4,
    fontSize: 24,
    color: 'grey',
    fontWeight: '300',
    margin: 10,
    textAlign: 'center',
    // textShadowOffset: {width: 0, height: 1},
    // textShadowRadius: 1,
    // elevation: 2,
  },
  ThirdContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height / 6,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  label: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label2: {
    marginTop: 20,
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label3: {
    marginTop: 20,
    color: '#000',
    fontSize: 16,
    fontWeight: '300',
  },
});

export default SplashScreen;
