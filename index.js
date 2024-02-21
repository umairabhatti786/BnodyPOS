/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry, LogBox } from "react-native";
import App from "./App";

import { name as appName } from "./app.json";
LogBox.ignoreLogs([
  "Remote debugger",
  "Cannot update a component (`HomeScreen`) while rendering a different component (`QR`)",
  'Each child in a list should have a unique "key" prop.',
  `  Can't perform a React state update on an unmounted component`,
]);

AppRegistry.registerComponent(appName, () => App);
