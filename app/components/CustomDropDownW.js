import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";

const CustomDropDownW = ({
  buttonBackroundColor,
  titleColor,
  placeholderTitle,
  items,
  setItems,
  onChangeValue,
  dropDownWidth,
  dropDownHeight,
  value,
  setValue,
  disabled,
  dropDownDirection,
  open,
  setOpen,
  zIndex,
}) => {
  // const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      nestedScrollEnabled={true}
      autoScroll={true}
      itemSeparator={false}
      itemSeparatorStyle={{
        backgroundColor: AppColor.white,
        height: 0.5,
        width: dropDownWidth - sizeHelper.calWp(30),
        alignSelf: "center",
      }}
      dropDownDirection={dropDownDirection ? dropDownDirection : "AUTO"}
      disabled={disabled}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onPress={(open) =>
        // console.log('was the picker open?', open, )
        setValue(null)
      }
      // onChangeValue={(item, index) => onChangeValue(item, index)}
      placeholder={placeholderTitle}
      //style={styles.dropDownStyle}
      placeholderStyle={{
        alignSelf: "center",
        textAlign: "center",
        // paddingStart: sizeHelper.calWp(15),
        fontSize: sizeHelper.calHp(22),
        color: disabled ? AppColor.gray1 : AppColor.black3,
        fontFamily: "ProximaNova-Regular",
      }}
      labelProps={{
        numberOfLines: 1,
        adjustsFontSizeToFit: true,
      }}
      style={{
        backgroundColor: disabled ? AppColor.disableColor : AppColor.white,
        paddingEnd: 0,
        marginEnd: 0,
        borderRadius: 0,
        borderWidth: 0,
        borderRadius: sizeHelper.calWp(5),
        height: dropDownHeight,
        width: dropDownWidth,
        borderColor: AppColor.gray2,
        borderWidth: 0.5,
      }}
      dropDownMaxHeight={400}
      dropDownContainerStyle={{
        width: dropDownWidth,
        backgroundColor: disabled ? AppColor.disableColor : AppColor.white,
        borderWidth: 0,
        borderColor: AppColor.gray2,
        borderWidth: 0.5,
        //paddingHorizontal: sizeHelper.calWp(20),
      }}
      arrowIconContainerStyle={{
        height: sizeHelper.calHp(40),
        width: sizeHelper.calWp(35),
        justifyContent: "center",
        alignItems: "center",
      }}
      arrowIconStyle={{
        width: sizeHelper.calWp(20),
        height: sizeHelper.calHp(20),
        tintColor: disabled ? AppColor.gray1 : AppColor.black,
      }}
      listItemContainerStyle={{
        zIndex: 110100,
        paddingStart: sizeHelper.calWp(5),
        borderColor: AppColor.gray2,
        // borderWidth: 0.5,
      }}
      containerStyle={{
        borderRadius: sizeHelper.calWp(15),
        padding: 0,
        margin: 0,
        width: dropDownWidth,
        borderColor: AppColor.gray2,
        borderWidth: 0.5,
      }}
      textStyle={{
        paddingStart: sizeHelper.calWp(15),
        fontSize: sizeHelper.calHp(22),
        color: disabled ? AppColor.gray1 : AppColor.black3,
        fontFamily: "ProximaNova-Regular",
        marginStart: 0,
      }}
      labelStyle={{
        color: disabled ? AppColor.gray1 : AppColor.black3,
        textAlign: "center",
        fontSize: sizeHelper.calHp(22),
      }}
      tickIconStyle={{
        width: sizeHelper.calWp(15),
        height: sizeHelper.calHp(15),
        tintColor: disabled ? AppColor.gray1 : AppColor.black3,
      }}
      zIndex={zIndex}
    />
  );
};

export default CustomDropDownW;
