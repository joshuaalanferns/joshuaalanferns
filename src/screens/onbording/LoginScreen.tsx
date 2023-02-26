/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {height, width} from '../../utility/Dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen: React.FC = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [firepassword, setfirepassword] = useState<string>('');

  const handleLogin = () => {
    if (email === '') {
      setEmailError('Email cannot be empty');
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Password cannot be empty');
    } else {
      setPasswordError('');
    }
    if (email && password !== '') {
      firestore()
        .collection('unsplashUsers')
        .where('email', '==', email)
        .get()
        .then(async responce => {
          console.log(responce);
          let data = responce?._docs;
          let savedata = data[0]?._data;
          setfirepassword(data[0]?._data?.password);
          console.log(data[0]?._data?.password);
          if (firepassword === password) {
            try {
              await AsyncStorage.setItem('userData', JSON.stringify(savedata));
              navigation.navigate('main');
            } catch (error) {
              console.log('Error storing data:', error);
            }
          } else {
            ToastAndroid.show('Incorrect Password', ToastAndroid.LONG);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //android:windowSoftInputMode="adjustResize"
  return (
    <KeyboardAwareScrollView
      style={{width: width, height: height, backgroundColor: 'white'}}
      extraScrollHeight={100}
      //   extraHeight={100}
      enableOnAndroid={true}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://images.squarespace-cdn.com/content/v1/5d156acaa1812b0001589449/1563318589867-YBZF2P63QV1HUHHCQYZ6/Kapture+2019-05-26+at+16.13.55.gif?format=1000w',
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.topContainer}>
          <Text style={styles.topconText}>Hello Again!</Text>
          <Text style={styles.topconText1}>Wellcome back you've</Text>
          <Text style={styles.topconText1}>been missed!</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {emailError !== '' && <Text style={styles.error}>{emailError}</Text>}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholderTextColor="grey"
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.passwordIcon}
              onPress={toggleShowPassword}>
              {showPassword ? (
                <MaterialIcons name="eye" size={24} color="#666" />
              ) : (
                <MaterialIcons name="eye-off" size={24} color="#666" />
              )}
            </TouchableOpacity>
          </View>
          {passwordError !== '' && (
            <Text style={styles.error}>{passwordError}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 20}}
          onPress={() => navigation.navigate('signup')}>
          <Text style={styles.label2}>SignUp </Text>
          <Text style={styles.label3}>
            Join the community of Unsplash today!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 150,
  },
  topContainer: {
    marginBottom: height / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '400',
  },
  topconText: {
    marginTop: -20,
    fontSize: 28,
    fontWeight: '600',
    color: 'black',
  },
  topconText1: {
    fontSize: 18,
    fontWeight: '300',
    color: 'grey',
  },
  form: {
    flex: 1,
    width: '80%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 60,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 60,
  },
  passwordInput: {
    flex: 1,
    color: 'black',
  },
  passwordIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
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

export default LoginScreen;
