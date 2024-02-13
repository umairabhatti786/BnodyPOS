import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';

const CustomButton = ({
  backgroundColor,
  titleContainer,
  title,
  containerStyle,
  onPressButton,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPressButton}
      style={[
        styles.mainContainer,
        containerStyle ? containerStyle : null,
        { backgroundColor: isDisabled ? AppColor.disableColor : backgroundColor },


      ]}>
      <Text
        numberOfLines={1}
        style={[
          styles.buttonTitle,
          titleContainer ? titleContainer : null,
          { color: isDisabled ? AppColor.gray1 : AppColor.white },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // height: sizeHelper.calHp(118),
    width: sizeHelper.calWp(150),
    height: sizeHelper.calHp(50),
    borderRadius: sizeHelper.calWp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calWp(5),

    elevation: 3,
  },
  buttonTitle: {
    fontSize: sizeHelper.calHp(22),

    fontFamily: 'ProximaNova-Semibold',
  },
});

export default CustomButton;
