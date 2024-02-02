import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const Button = ({
  disabled,
  text,
  margin,
  marginBottom,
  fontWeight,
  fontSize,
  marginHorizontal,
  backgroundColor,
  onPress,
  marginTop,
  color,
  elevation,
  flex,
  height,
  width,
  borderRadius,
  borderWidth,
  borderColor,
  onPressIn,
  padding,

  marginVertical,
  fontFamily,
}) => {
  // console.log(borderColor)

  return (
    <TouchableOpacity
      disabled={disabled}
      onPressIn={onPressIn}
      onPress={onPress}
      style={{
        marginBottom: marginBottom,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
        flex: flex,
        alignSelf: "center",
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
        height: height,
        width: width,
        borderRadius: borderRadius,
        justifyContent: "center",
        marginTop: marginTop,
        elevation: elevation,
        borderColor: "#000",
        padding: padding,
        margin: margin,
      }}
    >
      <Text
        style={{
          color: color,
          fontSize: fontSize,
          textAlign: "center",
          fontWeight: fontWeight,
          fontFamily: fontFamily,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
