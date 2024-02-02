import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";
// import colors from '../../Utils/colors';
import { colors } from "../utils/colors";

function CustomText(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      disabled={!props.onPress}
      style={[
        props.container,
        {
          width: props.width,
          height: props.height,
        },
      ]}
    >
      <Text
        style={[
          {
            color: props.color || colors.black,
            fontSize: verticalScale(props.fontSize || 10),
            marginTop: verticalScale(props.marginTop || 0),
            backgroundColor: props?.backgroundColor,
            marginBottom: verticalScale(props.marginBottom || 0),
            margin: moderateScale(props.margin || 0),
            marginLeft: scale(props.marginLeft || 0),
            marginRight: scale(props.marginRight || 0),
            marginBottom: scale(props.marginBottom || 0),
            alignSelf: props.alignSelf || "flex-start",
            fontWeight: props.fontWeight,
            marginHorizontal: props.marginHorizontal,
            fontStyle: props.fontStyle,
            marginVertical: verticalScale(props.marginVertical || 0),
            textAlign: props.textAlign,
            lineHeight: props.lineHeight,
            textTransform: props.textTransform,
            textDecorationColor: props.textDecorationColor,
            textDecorationLine: props.textDecorationLine,
            paddingHorizontal: props.paddingHorizontal,
            fontFamily: props.fontFamily,
            // textShadowColor: 'rgba(0, 0, 0, 0.25)',
            // textShadowOffset: {width: 2, height: 2},
            // textShadowRadius: 3,
          },
          props.textStyle,
        ]}
        textDecorationStyle={props.textDecorationStyle}
        ellipsizeMode={props.ellipsizeMode}
        textTransform={props?.textTransform}
        numberOfLines={props.numberOfLines}
      >
        {props.label}
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomText;
