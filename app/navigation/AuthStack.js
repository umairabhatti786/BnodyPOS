import React from "react";
import LoginScreen from "../screens/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"login"}
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name={"login"}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
