import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Text,
  I18nManager,
} from "react-native";
import * as Progress from "react-native-progress";

import { createStackNavigator } from "@react-navigation/stack";
import * as Animatable from "react-native-animatable";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./style";
import BnodyLogo from "../../assets/svg/bnodyLogo.svg";
import sizeHelper from "../../helpers/sizeHelper";
import AppColor from "../../constant/AppColor";

const Design = (props) => {
  return props.showRealApp === false ? (
    <Animatable.View style={{ flex: 1 }} animation="zoomIn">
      <StatusBar
        hidden={true}
        barStyle="light-content"
        backgroundColor={AppColor.blue}
      />

      <AppIntroSlider
        activeDotStyle={{
          marginBottom: -20,
          // width: 30,
          backgroundColor: AppColor.blue2,
        }}
        dotStyle={{
          marginBottom: -20,
          backgroundColor: AppColor.gray3,
        }}
        data={I18nManager.isRTL ? props.slidesArb : props.slidesEng}
        renderItem={props.renderItem}
        renderDoneButton={props.renderDoneButton}
        renderNextButton={props.renderNextButton}
      />
    </Animatable.View>
  ) : (
    <ImageBackground
      source={require("../../assets/images/splashBg.png")}
      imageStyle={{ width: "100%", height: "100%" }}
      style={styles.splashContainer}
    >
      <StatusBar hidden />
      <BnodyLogo />
      <Progress.Bar
        useNativeDriver
        indeterminate
        progress={1}
        width={sizeHelper.calWp(400)}
        height={sizeHelper.calHp(2)}
        unfilledColor={AppColor.blue5}
        borderWidth={0}
        style={{ marginTop: sizeHelper.calHp(64) }}
        color={AppColor.white}
      />
    </ImageBackground>
  );
};

export default Design;
