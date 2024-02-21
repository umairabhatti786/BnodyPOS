import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { back } from "react-native/Libraries/Animated/Easing";
import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";

const LongTable = (props) => {
  console.log("SquareTableStyle", props);
  return (
    <TouchableOpacity
      onPress={() => {
        props.Pprop.onSelectTable(props.index);
      }}
      style={styles.container}
    >
      <View
        style={[
          styles.leftRightContainer,
          {
            backgroundColor: props.item.isSelected
              ? AppColor.brickRedLight
              : AppColor.white,
          },
        ]}
      ></View>
      <View
        style={[
          styles.centerContainer,
          {
            backgroundColor: props.item.isSelected
              ? AppColor.brickRedLight
              : AppColor.white,
          },
        ]}
      >
        <Text style={{ fontSize: sizeHelper.calHp(22) }}>A1</Text>
        {props.item.isSelected && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: sizeHelper.calHp(36),
              width: "100%",
              //   backgroundColor: 'green',
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: props.item.isSelected
                ? AppColor.brickRed
                : AppColor.white,
              borderBottomStartRadius: sizeHelper.calHp(5),
              borderBottomEndRadius: sizeHelper.calHp(5),
            }}
          >
            <Text style={{ fontSize: sizeHelper.calHp(13) }}>Occupied</Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.leftRightContainer,
          {
            backgroundColor: props.item.isSelected
              ? AppColor.brickRedLight
              : AppColor.white,
          },
        ]}
      ></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    //  borderRadius: sizeHelper.calWp(5),
    alignItems: "center",

    //backgroundColor: AppColor.white,
  },
  leftRightContainer: {
    height: sizeHelper.calHp(91),
    width: sizeHelper.calWp(6),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calWp(6) / 2,
  },
  centerContainer: {
    height: sizeHelper.calHp(141),
    width: sizeHelper.calWp(657),
    marginHorizontal: sizeHelper.calWp(8),
    backgroundColor: AppColor.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calHp(5),
  },
});

export default LongTable;
