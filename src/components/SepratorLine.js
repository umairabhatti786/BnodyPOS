import { View, Text } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../utils/colors";
import { verticalScale } from "react-native-size-matters";

const SepratorLine = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: verticalScale(props.height || 4),
        backgroundColor: colors.superLightGray,
      }}
    ></View>
  );
};

export default SepratorLine;
