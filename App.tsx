/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import SplashScreen from './src/screens/onbording/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './src/Navigation/Auth';
import Main from './src/Navigation/Main';
import {Provider} from 'react-redux';
import store from './src/components/Redux/store';

const Stack = createStackNavigator();
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="auth" component={Auth} />
          <Stack.Screen name="main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
