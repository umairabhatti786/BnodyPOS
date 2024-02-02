import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/Login/LoginScreen";
import HomeScreen from "../../screens/Home/HomeScreen";
import SettingsScreen from "../../screens/Settings/SettingsScreen";
import DetailsScreen from "../../screens/Details/DetailsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AllFavEvents from "../../screens/AllFavEvents/AllFavEvents";

const AppStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AllFavEvents" component={AllFavEvents} />
    </Stack.Navigator>
  );
};

export default AppStack;
