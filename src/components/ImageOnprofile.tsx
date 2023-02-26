import React from 'react';
import {
  View,
  Text,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {height, width} from '../utility/Dimensions';
import {useNavigation} from '@react-navigation/native';

interface Props {
  imageSource: ImageSourcePropType;
  name: string;
  discription: string;
}

const ImageOnprofile: React.FC<Props> = ({imageSource, name, discription}) => {
  const navigation = useNavigation();
  // console.log(discription, 'MainIMage');
  const onPress = () => {
    navigation.navigate('photodetail', {
      discription: discription,
    });
  };
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.mainImage}
        source={{
          uri: imageSource,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  mainImage: {
    width: width,
    height: height / 1.6,
  },
});

export default ImageOnprofile;
