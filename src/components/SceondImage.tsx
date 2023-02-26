/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width} from '../utility/Dimensions';

interface CardProps {
  category: string;
}

const SecondImage: React.FC<CardProps> = ({category}) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1675702664508-0235c0e9d4e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=1999&h=594 1x',
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text
        style={{
          position: 'absolute',
          top: 45,
          left: 10,
          color: 'white',
          fontSize: 30,
          fontWeight: '600',
        }}>
        {category}
      </Text>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 90,
          left: 10,
          flexDirection: 'row',
          backgroundColor: '#fff',
          alignItems: 'center',
          padding: 10,
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: 'grey',
            fontSize: 18,
            fontWeight: '300',
          }}>
          Submit to {''}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: '300',
          }}>
          {category}
        </Text>
      </TouchableOpacity>
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
});

export default SecondImage;
