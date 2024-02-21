import React from "react";
import { View, ActivityIndicator, Text, I18nManager } from "react-native";
import AppColor from "../constant/AppColor";

const Loading = () => {
  return (
    <View
      style={{
        margin: 20,
        width: 200,
        height: 70,
        backgroundColor: AppColor.white,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: AppColor.black,
            fontFamily: "ProximaNova-Semibold",
            marginRight: 5,
          }}
        >
          {I18nManager.isRTL ? "انتظر من فضلك" : "Please Wait"}
        </Text>
        <ActivityIndicator
          size="small"
          color={AppColor.black}
          animating={true}
        />
      </View>
    </View>
  );
};
export default Loading;
