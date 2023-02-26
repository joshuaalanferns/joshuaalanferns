import React, {FC} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {width} from '../utility/Dimensions';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
interface Props {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  userdata: boolean;
}

const Header: FC<Props> = ({placeholder, onChangeText, value, userdata}) => {
  return (
    <View style={styles.container}>
      <View style={styles.Headercontainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJ1BMVEUAAAD////V1dWWlpZ0dHTPz89qamrh4eGQkJDk5OTR0dGtra3Y2NgWv+ptAAABL0lEQVR4nO3cMQ7CQAxFwQCBQOD+56Wms2RHxjDvAKs/vbXLqaR1qW+tmbbUPENISJiIMBghIWEiwmCEhISJCIMREhImIgxGSEiYiDAYISFhIsJghISEiQiDERISJiIMRkhImIgwGCEhYSLCYISEhIkIgxESEiYiDPb7wtsBwlvNtCLhdq5vq5lWJPziCOdHOD/C+RHOj3B+hPMjnB/h/AjnRzg/wvkRzo9wfoTzI5wf4fz+QHip6P44YNrjXrKt6KrgeoDwWrStJkJCwv4ICQn7IyQk7I+QkLA/QkLC/ggJCfsjJCTsj5CQsD9CQsL+CAkJ+yMkJOyPkJCwP0JCwv4ICQn7IyQk7G8/QLh3oz56vsq/oH09u1GSJEmSJEmSJEmSJEmSJEmSJEmSJP1rbwwaXQZE0kwUAAAAAElFTkSuQmCC',
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.serachcontainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="#666"
            style={{marginLeft: 8}}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            selectionColor={'grey'}
          />
        </View>
        {userdata ? (
          <FastImage
            style={styles.profile}
            source={{
              uri: 'https://images.unsplash.com/placeholder-avatars/extra-large.jpg?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff',
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : null}
        <MaterialIcons
          name="menu-sharp"
          size={28}
          color="#666"
          style={{marginLeft: 8}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Headercontainer: {
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row',
    width: '95%',
  },
  serachcontainer: {
    marginLeft: 10,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    height: 40,
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: 35,
    height: 35,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  input: {
    fontSize: 16,
    height: 40,
    flex: 1,
    color: '#999',
    marginLeft: 5,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontSize: 20,
    color: '#999',
  },
});

export default Header;
