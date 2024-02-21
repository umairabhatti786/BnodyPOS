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
  ScrollView,
} from "react-native";

import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/FontAwesome";

import * as Animatable from "react-native-animatable";
import { useRoute } from "@react-navigation/native";

const Search = ({ props }) => {
  const optionsArray = [
    {
      id: "orderSearch",
      title: props.StringsList._473,
      icon: (
        <Icon
          name={"first-order"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(30)
          }
          color={"#c21213"}
        />
      ),
      color: AppColor.black,
    },
    {
      id: "productSearch",

      title: props.StringsList._357,
      icon: (
        <Icon
          name={"product-hunt"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(20)
              : sizeHelper.calWp(25)
          }
          color={"#1b4cc3"}
        />
      ),
      color: "#1b4cc3",
    },
  ];

  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;
  const onClickSearchFunction = async (type) => {
    switch (type) {
      case "orderSearch":
        let num = await props.getLastOrderNumber();
        props.toggleSearchScan();
        props.setSearchText(num);
        props?.setOptionType(type);
        break;
      case "productSearch":
        props?.setOptionType(type);
        props.setSearchText("");
        props.setPlaceHolder("");
        break;
      default:
        break;
    }
  };

  return (
    <Animatable.View
      animation={"fadeInDownBig"}
      ref={props.viewref}
      duration={500}
      useNativeDriver
      value={100}
      style={{
        height: sizeHelper.screentHeight,
        position: "absolute",
        width: sizeHelper.screenWidth,
        top: 0,
        zIndex: 50000,
        elevation: 5,
        overflow: "hidden",

        backgroundColor: "rgba(0, 0, 0, 0.7)",

        alignItems: "center",
      }}
    >
      <View style={styles.searchContainer}>
        <View>
          <TextInput
            // editable={}
            style={styles.search}
            ref={props.ref_searchBar}
            value={props.searchText}
            onEndEditing={(text) => {
              props?.optionType === "orderSearch" &&
              props?.isFocusSearch === true
                ? props.getOrderBySearch()
                : props?.optionType === "productSearch" &&
                  props?.isFocusSearch === true
                ? props.searchTextFun(text)
                : null;
            }}
            onChangeText={(text) => {
              props.onChangeText("searchText", text);
            }}
            onFocus={() => {
              props?.setFocusSearch(true);
            }}
            placeholder={`${props.StringsList?._304}/${props.StringsList?._141}`}
            placeholderTextColor={AppColor.black}
            numberOfLines={1}
            multiline={false}
            textAlignVertical={"center"}
          />

          {props.barCode && (
            <View
              style={[
                styles.search,
                {
                  justifyContent: "center",
                  position: "absolute",
                  backgroundColor: "white",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: sizeHelper.calHp(20),
                  fontFamily: "ProximaNova-Regular",
                }}
              >
                {props.barCodeText === ""
                  ? `${props.StringsList?._470} ${props.StringsList?._436}`
                  : props.barCodeText}
              </Text>
            </View>
          )}
        </View>
        <Menu
          style={{
            justifyContent: "center",
            alignItems: "center",
            right:
              sizeHelper.screenWidth > 450
                ? sizeHelper.calWp(-20)
                : sizeHelper.calWp(-75),
          }}
          onSelect={(type) => onClickSearchFunction(type)}
        >
          <MenuTrigger renderTouchable={renderTouchable}>
            <View
              style={{
                alignSelf: "center",
                backgroundColor: AppColor.green,
                padding: 8,
                borderRadius: 100,
              }}
            >
              <Image
                style={[styles.icon]}
                source={require("../assets/images/menu.png")}
              />
            </View>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              width: "auto",

              backgroundColor: AppColor.white,
              marginTop: I18nManager.isRTL
                ? sizeHelper.calWp(60)
                : sizeHelper.calWp(52),

              elevation: 50,

              marginEnd: I18nManager.isRTL
                ? sizeHelper.calWp(120)
                : sizeHelper.calWp(0),
            }}
          >
            {optionsArray.map((item, index) => (
              <MenuOption
                renderTouchable={renderTouchable}
                key={item.id}
                value={item.id}
              >
                {index !== 0 && <View />}
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: sizeHelper.calHp(5),
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={[styles.title1, { color: item.color }]}>
                    {item.title}
                  </Text>
                </View>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
        {props?.optionType === "orderSearch" ? null : (
          <TouchableOpacity
            disabled={false}
            onPress={() => {
              props.toggleSearchScan();
            }}
            style={styles.cameraContainer2}
          >
            {!props.barCode ? (
              <View
                style={{
                  alignSelf: "center",
                  backgroundColor: AppColor.blue3,
                  padding: 8,
                  borderRadius: 100,
                }}
              >
                <Image
                  style={[styles.icon]}
                  source={require("../assets/images/find.png")}
                />
              </View>
            ) : (
              <View
                style={{
                  alignSelf: "center",
                  backgroundColor: AppColor.blue3,
                  padding: 8,
                  borderRadius: 100,
                }}
              >
                <Image
                  style={[styles.icon]}
                  source={require("../assets/images/QR.png")}
                />
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: sizeHelper.screenWidth > 450 ? 50 : 30,
          bottom: 100,
          position: "absolute",
          backgroundColor: AppColor.black2,
          padding: 10,
        }}
        onPress={() => {
          if (props?.searchText !== "") {
            props.setSearchText("");
            props.setOptionType("orderSearch");
            props.viewref.current
              ?.fadeOutUpBig()
              .then(() => props.setIsSearch(false));
          } else {
            props.viewref.current
              ?.fadeOutUpBig()
              .then(() => props.setIsSearch(false));
          }
        }}
      >
        <Image
          style={{
            width: sizeHelper.calHp(60),
            height: sizeHelper.calHp(60),
            resizeMode: "contain",
          }}
          source={require("../assets/images/cross.png")}
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  title1: {
    fontSize: sizeHelper.calHp(20),
    marginStart: sizeHelper.calWp(5),
    fontFamily: "ProximaNova-Regular",
    alignSelf: "center",
    textAlign: "center",
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
        ? sizeHelper.calWp(95)
        : sizeHelper.calWp(70),
  },
  icon: {
    // marginTop: 5,
    width: sizeHelper.calHp(30),
    height: sizeHelper.calHp(30),
    resizeMode: "contain",
  },

  searchContainer: {
    // width:
    //   sizeHelper.screenWidth > 450
    //     ? sizeHelper.calWp(365)
    //     : sizeHelper.calWp(365),
    width: sizeHelper.screenWidth - 30,
    height: sizeHelper.calHp(80),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(50),
    paddingStart: sizeHelper.calWp(11),
    alignItems: "center",
    flexDirection: "row",
    top: 80,
    // left: 12,
  },

  search: {
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(6),
    // width:
    //   sizeHelper.screenWidth > 450
    //     ? sizeHelper.calWp(285)
    //     : sizeHelper.calWp(250),
    width: sizeHelper.screenWidth - 110,
    borderRadius: sizeHelper.calHp(18),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    fontSize: sizeHelper.calHp(20),
    fontFamily: "ProximaNova-Regular",
    overflow: "hidden",
  },
});

export default Search;
