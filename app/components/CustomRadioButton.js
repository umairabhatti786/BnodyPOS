import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";

const CustomRadioButton = ({ isSelected, title, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        //justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        height: sizeHelper.calWp(25),
        // backgroundColor: "green",
        width: sizeHelper.calWp(100),
      }}
    >
      <TouchableOpacity
        onPress={onSelect}
        style={{
          height: sizeHelper.calWp(18),
          width: sizeHelper.calWp(18),
          borderRadius: sizeHelper.calWp(18) / 2,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0.5,
          borderColor: AppColor.gray1,
        }}
      >
        {isSelected && (
          <View
            style={{
              height: sizeHelper.calWp(10),
              width: sizeHelper.calWp(10),
              borderRadius: sizeHelper.calWp(10) / 2,
              backgroundColor: AppColor.blue2,
            }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          marginStart: sizeHelper.calHp(15),
          fontSize: sizeHelper.calHp(18),
          color: AppColor.black,
          fontFamily: "ProximaNova-Regular",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
