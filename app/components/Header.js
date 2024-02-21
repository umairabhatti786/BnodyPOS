import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  I18nManager,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";

import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";
import BnodyLogo from "../assets/svg/bnodyLogo.svg";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { list } from "../constant/global";
import { useRoute } from "@react-navigation/native";
const Header = ({ props }) => {
  const route = useRoute();
  const onPressHome = () => {
    if (props?.orderCode === false && route.name === "home") {
      props.onClickCancel();
      list.isOrderPlaced = false;
      props.navigation.navigate("home", { id: undefined });
    } else if (props?.orderCode === true && route.name === "home") {
      if (props?.selectedProducts.length > 0) {
        Alert.alert(props.StringsList._537, props.StringsList._475, [
          {
            text: "OK",
            onPress: () => {
              props.onClickCancel();
              props.navigation.navigate("dashboard");
            },
          },
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Presed");
            },
            style: "cancel",
          },
        ]);
      } else {
        props.navigation.navigate("dashboard");
      }
    } else {
      props.navigation.navigate("home", { id: undefined });
    }
  };

  const dashboardSettingArray = [
    {
      id: "saleBilType",
      title: props.StringsList._511,
      icon: (
        <Icon
          name={"print"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={AppColor.blue5}
        />
      ),
      color: AppColor.black,
    },
    {
      id: "billingType",
      title: props.StringsList._334,

      icon: (
        <FontAwesome5
          name={"receipt"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={AppColor.blue5}
        />
      ),
      color: AppColor.black,
    },
    {
      id: "pairPrinter",
      title: props.StringsList._36,
      icon: (
        <Icon
          name={"print"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={AppColor.blue5}
        />
      ),
      color: AppColor.black,
    },
    {
      id: "terminalSetup",
      title: props?.StringsList?._35,
      icon: (
        <Icon
          name={"print"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={AppColor.blue5}
        />
      ),
      color: AppColor.black,
    },
  ];
  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;

  const TopNavigationDashBoard = () => (
    <View style={{ marginEnd: sizeHelper.calWp(20) }}>
      <Menu onSelect={(value) => props?.onClickSetting(value)}>
        <MenuTrigger renderTouchable={renderTouchable}>
          <Image
            style={styles.icon}
            source={require("../assets/images/setting.png")}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            width: "auto",
            marginTop: sizeHelper.calWp(32),
            marginEnd: I18nManager.isRTL
              ? sizeHelper.calWp(200) - sizeHelper.screenWidth
              : 0,
          }}
        >
          {dashboardSettingArray.map((item, index) => (
            <MenuOption
              renderTouchable={renderTouchable}
              key={item.id}
              value={item.id}
            >
              {index !== 0 && (
                <View
                  style={{
                    marginBottom: sizeHelper.calHp(5),
                    borderBottomWidth: 1,
                    borderBottomColor: AppColor.black2,
                  }}
                />
              )}
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginVertical: sizeHelper.calHp(5),
                  paddingHorizontal: 15,
                }}
              >
                {item.icon}
                <Text
                  style={[
                    styles.title1,
                    {
                      color: item.color,
                      marginHorizontal: sizeHelper.calWp(5),
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          right: 10,
          justifyContent: "space-between",
        }}
      >
        {route.name === "home" && (
          <TouchableOpacity
            disabled={false}
            style={{ left: 10 }}
            onPress={() => props.navigation.navigate("TableBook")}
          >
            <Text
              style={{
                fontFamily: "ProximaNova-Regular",
                fontSize:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calHp(25)
                    : sizeHelper.calHp(20),
                color: AppColor.white,
              }}
            >
              {props.StringsList._469}
            </Text>
          </TouchableOpacity>
        )}
        {route.name === "home" && (
          <TouchableOpacity
            disabled={false}
            style={{ left: 20 }}
            onPress={onPressHome}
          >
            <Text
              style={{
                fontFamily: "ProximaNova-Regular",
                fontSize:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calHp(25)
                    : sizeHelper.calHp(20),
                color: AppColor.yellow1,
              }}
            >
              {props.StringsList._470}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <TouchableOpacity
          disabled={route.name === "dashboard" ? true : false}
          onPress={onPressHome}
        >
          <BnodyLogo
            width={sizeHelper.calWp(110)}
            height={sizeHelper.calHp(45)}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {route.name === "home" && (
          <>
            <TouchableOpacity
              onPress={() => props?.setIsSearch(true)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginEnd: sizeHelper.calWp(10),
              }}
            >
              <Image
                style={{
                  width:
                    sizeHelper.screenWidth > 450
                      ? sizeHelper.calHp(35)
                      : sizeHelper.calHp(25),
                  height:
                    sizeHelper.screenWidth > 450
                      ? sizeHelper.calHp(35)
                      : sizeHelper.calHp(25),
                  resizeMode: "contain",
                }}
                source={require("../assets/images/find.png")}
              />
            </TouchableOpacity>
          </>
        )}
        {route.name === "dashboard" && (
          <TouchableOpacity
            style={{ marginEnd: sizeHelper.calWp(10) }}
            onPress={() => {
              list.isHoldedInvoiceOpened = true;
              props.navigation?.navigate("home", { type: "holdInvoice" });
            }}
          >
            <Image
              style={{
                width: sizeHelper.calHp(30),
                height: sizeHelper.calHp(30),
                resizeMode: "contain",
              }}
              source={require("../assets/images/invoice.png")}
            />
          </TouchableOpacity>
        )}
        {route.name === "dashboard" && (
          <TouchableOpacity
            style={{ marginEnd: sizeHelper.calWp(10) }}
            onPress={() => props.rebootTerminalFunction()}
          >
            <Image
              style={{
                width: sizeHelper.calHp(30),
                height: sizeHelper.calHp(30),
                resizeMode: "contain",
              }}
              source={require("../assets/images/refresh.png")}
            />
          </TouchableOpacity>
        )}

        {route.name === "dashboard" && <TopNavigationDashBoard />}

        <TouchableOpacity
          onPress={props.onClickLogoutFunction}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width:
                sizeHelper.screenWidth > 450
                  ? sizeHelper.calHp(35)
                  : sizeHelper.calHp(25),
              height:
                sizeHelper.screenWidth > 450
                  ? sizeHelper.calHp(35)
                  : sizeHelper.calHp(25),
              resizeMode: "contain",
            }}
            source={require("../assets/images/shutdown.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColor.blue5,
    flexDirection: "row",
    paddingTop: sizeHelper.calHp(14),
    paddingHorizontal: sizeHelper.calWp(20),
    width: sizeHelper.screenWidth,
    paddingBottom: sizeHelper.calHp(10),
    justifyContent: "space-between",
    height:
      Platform.OS === "ios" ? sizeHelper.calHp(100) : sizeHelper.calHp(50),
  },
  topView: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title1: {
    fontSize: sizeHelper.calHp(20),
    marginStart: sizeHelper.calWp(5),
    fontFamily: "ProximaNova-Regular",
    alignSelf: "center",
    textAlign: "center",
  },

  bottomView: {
    alignItems: "center",
    flexDirection: "row",
    right:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(15)
        : sizeHelper.calWp(-5),
  },

  cameraContainer: {
    width: sizeHelper.calHp(50),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(50) / 2,
    paddingEnd: sizeHelper.calWp(5),
    paddingBottom: sizeHelper.calWp(5),
  },
  cameraContainer2: {
    width: sizeHelper.calHp(50),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(50) / 2,
    marginStart: sizeHelper.calWp(14),
    right:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(80)
        : sizeHelper.calWp(70),
  },
  icon: {
    width: sizeHelper.calHp(30),
    height: sizeHelper.calHp(30),
    resizeMode: "contain",
    left: 5,
  },

  searchContainer: {
    width:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(365)
        : sizeHelper.calWp(345),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(25),
    paddingStart: sizeHelper.calWp(11),
    alignItems: "center",
    flexDirection: "row",
  },

  search: {
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(6),
    width:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(285)
        : sizeHelper.calWp(250),
    borderRadius: sizeHelper.calHp(18),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    fontSize: sizeHelper.calHp(18),
    fontFamily: "ProximaNova-Regular",
    overflow: "hidden",
  },
});

export default Header;
