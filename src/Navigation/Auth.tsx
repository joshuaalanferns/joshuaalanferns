import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/onbording/LoginScreen';
import SignupScreen from '../screens/onbording/SignupScreen';

const Stack = createStackNavigator();

function Auth(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        options={{headerShown: false}}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="signup"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}

export default Auth;
