import React, { useState } from "react";
import { View, Modal, Text, TextInput, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";

export const CheckBoxCustom = ({ value, onValueChange, title }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: sizeHelper.calHp(10),
        // backgroundColor: 'green',
      }}
    >
      <CheckBox
        value={value}
        onValueChange={onValueChange}
        style={{
          // alignSelf: 'center',

          transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        }}
        tintColors={{ true: AppColor.blue2, false: AppColor.grayColor }}
      />
      <Text
        style={{
          fontSize: sizeHelper.calHp(15),
          marginStart: sizeHelper.calWp(10),
          color: AppColor.black,
          fontFamily: "Proxima Nova Bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};
