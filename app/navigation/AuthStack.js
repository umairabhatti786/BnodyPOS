import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import LoginScreen from '../screens/login';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'login'}
      screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={'login'}
        component={LoginScreen}
      />

    </Stack.Navigator>
  );
};

export default AuthStack;
