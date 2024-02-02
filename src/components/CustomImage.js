import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import { icons } from "../assets/icons";
import { images } from "../assets/images";
import FastImage from "react-native-fast-image";
import CustomText from "./CustomText";

const CustomImage = (props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={props.onImagePress ? 0.7 : 1}
        onPress={props.onImagePress}
        disabled={props?.disabled}
        style={[
          {
            width: scale(props.width || 70),
            height: scale(props.height || 70),
            borderRadius: 100,
            overflow: "hidden",
            borderColor: !props.imageUrl == "" && colors.yellow,
            borderWidth: !props.imageUrl == "" ? 2 : 0,
            //   backgroundColor: colors.green,
            alignSelf: "center",
            alignItems: "center",
          },
          props.mainStyle,
        ]}
      >
        <FastImage
          //   resizeMode="contain"
          source={
            !props.imageUrl == ""
              ? { uri: props.imageUrl }
              : props.multi
              ? icons.followProfile
              : icons.followProfile
          }
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({});
