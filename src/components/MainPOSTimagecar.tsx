/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {height, width} from '../utility/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainIMage from './MainIMage';

interface CardProps {
  imageSource: ImageSourcePropType;
  title: string;
  description: string;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  name: string;
  profileimage: string;
}

class MainPOSTimagecar extends PureComponent<CardProps> {
  render() {
    const {imageSource, titleStyle, name, profileimage, description} =
      this.props;
    console.log(description);
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <FastImage
            style={styles.profile}
            source={{
              uri: profileimage,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={[styles.title, titleStyle]}>{name}</Text>
        </View>
        <MainIMage imageSource={imageSource} discription={description} />
        <View style={styles.belowcontainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <View
              style={{
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: 'center',
                borderColor: 'grey',
              }}>
              <Ionicons
                name="heart-sharp"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
            <View
              style={{
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: 'center',
                marginLeft: 10,
                borderColor: 'grey',
              }}>
              <Ionicons name="add" size={24} color="grey" style={styles.icon} />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginRight: 20,
            }}>
            <Text style={styles.text}>Download</Text>
            <View
              style={{
                padding: 6,
                borderRightWidth: 0.5,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                alignItems: 'center',
                borderColor: 'grey',
              }}>
              <Ionicons
                name="chevron-down-outline"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,

    width: width,
    marginTop: 20,
  },

  belowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 0.5,
    padding: 8,
    borderColor: 'grey',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
    marginLeft: 15,
  },
  description: {
    fontSize: 14,
  },
  mainImage: {
    width: width,
    height: height / 3,
  },
});

export default MainPOSTimagecar;
