import React from "react";
import { Text } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { View } from "react-native-animatable";
import Loading from "../components/Loading";
import SplashScreen from "../screens/splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const RootStack = (props) => {
  // console.log('Root Stack, Props are: ', props);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"splash"} component={SplashScreen} />
      <Stack.Screen name={"Main"} component={MainStack} />
      <Stack.Screen name={"Auth"} component={AuthStack} />
    </Stack.Navigator>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.appState.isLoading,
  };
};

export default connect(mapStateToProps)(RootStack);
