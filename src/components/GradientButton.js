import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";
import LinearGradient from "react-native-linear-gradient";

import { colors } from "../utils/colors";
function GradientButton({
  loading,
  title,
  onPress,
  icon,
  color,
  width,
  height,
  borderColor,
  borderRadius,
  marginTop,
  alignItems,
  justifyContent,
  borderWidth,
  backgroundColor,
  fontFamily,
  marginBottom,
  fontSize,
  marginHorizontal,
}) {
  return (
    <TouchableOpacity
      disabled={loading}
      activeOpacity={0.6}
      style={[
        {
          //   backgroundColor: backgroundColor || colors.primary,
          width: width || "100%",
          height: verticalScale(height || 45),
          borderRadius: borderRadius || scale(10),
          alignItems: alignItems || "center",
          overflow: "hidden",
          justifyContent: justifyContent || "center",
          marginTop,
          marginBottom: marginBottom,
          marginHorizontal: marginHorizontal,
        },
      ]}
      onPress={onPress}
    >
      <LinearGradient
        start={{ x: 0.5, y: 0.2 }}
        colors={["#EAD996", "#DEC476", "#C99D3E"]}
        style={{
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} size={moderateScale(26)} />
        ) : (
          <Text
            style={[
              {
                color: color || colors.white,
                fontSize: verticalScale(fontSize || 14),
                fontWeight: "600",
              },
            ]}
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filledButton: {
    backgroundColor: colors.primary,
  },
});

export default GradientButton;
