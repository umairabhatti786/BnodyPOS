import React from "react";
import { StyleSheet } from "react-native";
import AppColor from "../../constant/AppColor";
import sizeHelper from "../../helpers/sizeHelper";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColor.gray2,
    paddingTop: 20,
    // marginTop: sizeHelper.calHp(4),
    // alignSelf: 'center',
    //   width: '100%',
    //height: sizeHelper.calHp(540),
    alignItems: "center",
    //   flexDirection: "row",
    //marginHorizontal: 15
    //alignItems: "center"
  },
  rowContainer: {
    //backgroundColor: AppColor.gray2,
    //   paddingBottom: 60,
    //  flexDirection: "row",
    //marginHorizontal: 15
    //    justifyContent: "space-around"
  },
});

export default styles;
