/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width} from '../utility/Dimensions';

const MainScreenImge = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1675747150294-0376b8c69e52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=1399&h=594%201x',
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text
        style={{
          position: 'absolute',
          top: 30,
          left: 10,
          color: 'white',
          fontSize: 30,
          fontWeight: '600',
        }}>
        Unsplash
      </Text>
      <Text style={styles.text}>The internet’s source for visuals.</Text>
      <Text style={styles.text2}>Powered by creators everywhere.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: width,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  image: {
    width: width,
    height: 200,
  },
  text: {
    position: 'absolute',
    top: 80,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  text2: {
    position: 'absolute',
    top: 105,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default MainScreenImge;
