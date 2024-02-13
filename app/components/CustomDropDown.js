import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';

const CustomDropDown = ({
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
}) => {
  // const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      nestedScrollEnabled={true}
      itemSeparator={false}
      itemSeparatorStyle={{
        backgroundColor: AppColor.white,
        height: 0.5,
        width: dropDownWidth - sizeHelper.calWp(30),
        alignSelf: 'center',
      }}
      dropDownDirection={dropDownDirection ? dropDownDirection : 'AUTO'}
      disabled={disabled}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onPress={open =>
        // console.log('was the picker open?', open, )
        setValue(null)
      }
      // onChangeValue={(item, index) => onChangeValue(item, index)}
      placeholder={placeholderTitle}
      //style={styles.dropDownStyle}
      placeholderStyle={{
        alignSelf: 'center',
        textAlign: 'center',
        // paddingStart: sizeHelper.calWp(15),
        fontSize: sizeHelper.calHp(22),
        color: disabled ? AppColor.gray1 : AppColor.white,
        fontFamily: 'ProximaNova-Semibold',
      }}
      labelProps={{
        numberOfLines: 1,
        adjustsFontSizeToFit: true,
      }}
      style={{
        backgroundColor: disabled ? AppColor.disableColor : AppColor.blue2,
        paddingEnd: 0,
        marginEnd: 0,
        borderRadius: 0,
        borderWidth: 0,
        borderRadius: sizeHelper.calWp(5),
        height: dropDownHeight,
        width: dropDownWidth,
      }}
      dropDownMaxHeight={400}
      dropDownContainerStyle={{
        width: dropDownWidth,
        backgroundColor: disabled ? AppColor.disableColor : AppColor.blue2,
        borderWidth: 0,
        // paddingHorizontal: sizeHelper.calWp(0),
      }}
      arrowIconContainerStyle={{
        height: sizeHelper.calHp(40),
        width: sizeHelper.calWp(35),

        justifyContent: 'center',
        alignItems: 'center',
      }}
      arrowIconStyle={{
        width: sizeHelper.calWp(20),
        height: sizeHelper.calHp(20),
        tintColor: disabled ? AppColor.gray1 : AppColor.white,
      }}
      listItemContainerStyle={{
        zIndex: 110100,
        paddingStart: sizeHelper.calWp(5),
      }}
      containerStyle={{
        borderRadius: sizeHelper.calWp(15),
        padding: 0,
        margin: 0,
        width: dropDownWidth,
      }}
      textStyle={{
        paddingStart: sizeHelper.calWp(15),
        fontSize: sizeHelper.calHp(22),
        color: disabled ? AppColor.gray1 : AppColor.white,
        marginStart: 0,
      }}
      labelStyle={{
        color: disabled ? AppColor.gray1 : AppColor.white,
        textAlign: 'center',
        fontSize: sizeHelper.calHp(22),
      }}
      tickIconStyle={{
        width: sizeHelper.calWp(15),
        height: sizeHelper.calHp(15),
        tintColor: disabled ? AppColor.gray1 : AppColor.white,
      }}
      zIndex={9000}
    />
  );
};

export default CustomDropDown;
