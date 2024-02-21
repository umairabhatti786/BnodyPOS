import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { I18nManager, StyleSheet, LogBox } from "react-native";
import * as RNLocalize from "react-native-localize";
import { NavigationContainer } from "@react-navigation/native";
import AppRouter from "./app/routes/AppRoutes";
import { Provider } from "react-redux";
import persist from "./app/redux/store/store";
import { MenuProvider } from "react-native-popup-menu";
import "./shim.js";

const persistStore = persist();
var localeInfo = RNLocalize.getLocales();
var language = localeInfo[0].languageCode;

LogBox.ignoreLogs(["Warning: ..."]);

const App = () => {
  return (
    <MenuProvider skipInstanceCheck={true} style={{ flex: 1 }}>
      <NavigationContainer>
        <Provider store={persistStore.store}>
          <AppRouter />
        </Provider>
      </NavigationContainer>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
