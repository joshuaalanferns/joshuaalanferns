import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/main/DashboardScreen';
import PhotoDetailScreen from '../screens/main/PhotoDetailScreen';


const Stack = createStackNavigator();

function Auth(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        options={{headerShown: false}}
        name="dashboard"
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="photodetail"
        component={PhotoDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default Auth;
