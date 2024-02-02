import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { images } from "../assets/images";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      // source={images.assembleLogin}
    >
      <View style={[styles.popupContainer, { zIndex: 99999 }]}>
        <ActivityIndicator size="small" color={"black"} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  popupContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 9999,
  },
});
export default Loading;
