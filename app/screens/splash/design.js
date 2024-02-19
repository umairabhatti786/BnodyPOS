import React from "react";
import { View, StatusBar, SafeAreaView, Platform } from "react-native";
import * as Progress from "react-native-progress";

import { DotIndicator } from "react-native-indicators";
import { createStackNavigator } from "@react-navigation/stack";
import * as Animatable from "react-native-animatable";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./style";
import Logo from "../../assets/svg/logo.svg";
import sizeHelper from "../../helpers/sizeHelper";
import AppColor from "../../constant/AppColor";

const Design = (props) => {
  return !props.showRealApp ? (
    <Animatable.View style={{ flex: 1 }} animation="zoomIn">
      <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor={AppColor.blue}
      />

      <AppIntroSlider
        activeDotStyle={{
          marginBottom: 20,
          width: 30,
          backgroundColor: AppColor.white,
        }}
        dotStyle={{
          marginBottom: 20,
          backgroundColor: AppColor.gray3,
        }}
        data={props.slides}
        renderItem={props.renderItem}
        renderDoneButton={props.renderDoneButton}
        renderNextButton={props.renderNextButton}
      />
    </Animatable.View>
  ) : (
    <View style={styles.splashContainer}>
      <StatusBar hidden />
      <Logo />
      <Progress.Bar
        useNativeDriver
        indeterminate
        progress={1}
        width={sizeHelper.calWp(400)}
        height={sizeHelper.calHp(2)}
        unfilledColor={AppColor.yellowColor}
        borderWidth={0}
        style={{ marginTop: sizeHelper.calHp(64) }}
        color={AppColor.white}
      />
    </View>
  );
};

export default Design;
