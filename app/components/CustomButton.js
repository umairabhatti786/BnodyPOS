import React, { Children } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";

const CustomButton = ({
  backgroundColor,
  titleContainer,
  title,
  containerStyle,
  onPressButton,
  isDisabled,
  leftIcon,
  leftIconStyle,
  rightIcon,
  rightIconStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPressButton}
      style={[
        styles.mainContainer,
        containerStyle ? containerStyle : null,
        {
          backgroundColor: isDisabled ? AppColor.disableColor : backgroundColor,
        },
      ]}
    >
      <View
        style={[
          leftIconStyle,
          {
            marginHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        {leftIcon}
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.buttonTitle,
          titleContainer ? titleContainer : null,
          { color: isDisabled ? AppColor.gray1 : AppColor.white },
        ]}
      >
        {title}
      </Text>
      <View
        style={[
          {
            marginHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
          },

          rightIconStyle,
        ]}
      >
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // height: sizeHelper.calHp(118),
    // width: sizeHelper.calWp(150),
    // width: '100%',
    height: sizeHelper.calHp(50),
    borderRadius: sizeHelper.calWp(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeHelper.calWp(5),
    flexDirection: "row",

    elevation: 3,
  },
  buttonTitle: {
    fontSize: sizeHelper.calHp(20),

    fontFamily: "ProximaNova-Regular",
  },
});

export default CustomButton;
