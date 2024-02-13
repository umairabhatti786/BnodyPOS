import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { View } from 'react-native-animatable';
import Loading from '../components/Loading';
import SplashScreen from '../screens/splash';

const Stack = createStackNavigator();

const RootStack = props => {
  // console.log('Root Stack, Props are: ', props);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name={'splash'} component={SplashScreen} />
      <Stack.Screen name={'Main'} component={MainStack} />
      <Stack.Screen name={'Auth'} component={AuthStack} />
    </Stack.Navigator>
  );
};
const mapStateToProps = state => {
  return {
    isLoading: state.appState.isLoading,
  };
};

export default connect(mapStateToProps)(RootStack);
