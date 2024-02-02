import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import CustomText from "./CustomText";
import { colors } from "../utils/colors";
import commonStyles from "../utils/CommonStyles";

import { images } from "../assets/images";

const CustomTextInput = ({ ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      disabled={!props.onPress}
      style={[
        {
          width: props.width || "100%",
          height: props.height || verticalScale(50),
          borderRadius: props.borderRadius || moderateScale(12),
          backgroundColor: props.backgroundColor || colors.white,
          padding: scale(10),
          marginTop: props.marginTop || verticalScale(0),
          borderColor: props.borderColor,
          paddingLeft: props.paddingLeft,
          zIndex: 1,
        },
        props.inputStyle,
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        {props.compulsory && (
          <CustomText
            label={"*"}
            color={colors.red}
            // marginBottosm={10}
            marginRight={3}
            // fontSize={10}
          />
        )}

        <CustomText
          label={props.withLabel}
          color={colors.inputGray}
          fontSize={verticalScale(6)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor:"red",
          width: "100%",
          height: verticalScale(props.inputContainerHeight || 24),
          // marginTop: props.inputMarginTop || verticalScale(5),
        }}
      >
        <TextInput
          editable={props.editable}
          style={{
            width: props.rigthIcon ? "90%" : "95%",
            height: props.inputHeight || "100%",
            paddingRight: props.paddingRight || 10,
            alignSelf: "flex-end",
            paddingHorizontal: props.paddingHorizontal,
            paddingTop: verticalScale(1),
            color: props.color || colors.black,
            fontSize: verticalScale(10),
          }}
          onChangeText={props.onChangeText}
          value={props.value}
          maxLength={props.maxLength}
          numberOfLines={props.numberOfLines}
          keyboardType={props.keyboardType}
          autoCapitalize="none"
          multiline={props.multiline}
          // multiline={props.multiline}
          placeholder={props.placeholder}
          // placeholder={props.placeholder}
          placeholderTextColor={colors.inputGray}
          secureTextEntry={props.secureTextEntry}
        />
        {props.rigthIcon ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onRightPress}
            style={{
              width: props.iconWidth || scale(20),
              height: props.iconHeight || verticalScale(20),
              marginLeft: verticalScale(12),
            }}
          >
            <Image
              style={commonStyles.img}
              resizeMode="contain"
              source={props.rigthIcon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default CustomTextInput;
const styles = ScaledSheet.create({
  icon: {
    width: "20@s",
    height: "20@vs",
    marginLeft: verticalScale(10),
  },
});
