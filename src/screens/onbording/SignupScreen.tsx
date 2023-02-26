/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import {height, width} from '../../utility/Dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const SignupScreen: React.FC = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showconfirmPassword, setshowConfirmPassword] =
    useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleLogin = () => {
    let error = false;
    if (name === '') {
      setNameError('Name cannot be empty');
      error = true;
    } else {
      setNameError('');
    }
    if (email === '') {
      setEmailError('Email cannot be empty');
      error = true;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Password cannot be empty');
      error = true;
    } else if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long');
      error = true;
    } else {
      setPasswordError('');
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('Confirm password cannot be empty');
      error = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      error = true;
    } else {
      setConfirmPasswordError('');
    }

    if (!error) {
      firestore()
        .collection('unsplashUsers')
        .where('email', '==', email)
        .get()
        .then(DATA => {
          console.log(DATA);
          if (DATA?._docs?.length === 0) {
            firestore()
              .collection('unsplashUsers')
              .add({
                name: name,
                email: email,
                password: password,
              })
              .then(DATA => {
                console.log(DATA);
                ToastAndroid.show(
                  'Account Created Sucessfully',
                  ToastAndroid.LONG,
                );
                if (DATA?._firestore) {
                  navigation.navigate('login');
                  console.log('User added!');
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            console.log('User already exists!');
            ToastAndroid.show('User already exists!', ToastAndroid.LONG);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setshowConfirmPassword(!showconfirmPassword);
  };

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
          <Text style={styles.topconText}>Hey!</Text>
          <Text style={styles.topconText1}>Welcome to our community! </Text>
          <Text style={styles.topconText1}>Sign up below to join us!</Text>
        </View>
        <View style={styles.form}>
          <TextInput
           placeholderTextColor="grey"
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {nameError !== '' && <Text style={styles.error}>{nameError}</Text>}
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
          <View style={styles.passwordContainer}>
            <TextInput
             placeholderTextColor="grey"
              style={styles.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={!showconfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.passwordIcon}
              onPress={toggleShowPassword}>
              {showconfirmPassword ? (
                <MaterialIcons name="eye" size={24} color="#666" />
              ) : (
                <MaterialIcons name="eye-off" size={24} color="#666" />
              )}
            </TouchableOpacity>
          </View>
          {confirmPasswordError !== '' && (
            <Text style={styles.error}>{confirmPasswordError}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: height,
  },
  image: {
    width: 200,
    height: 150,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
    flexGrow: 1,
    // flex: 1,
    width: '80%',
    marginTop: 20,
    marginBottom: height / 5,
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
    marginBottom: 10,
    height: 60,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
});

export default SignupScreen;
