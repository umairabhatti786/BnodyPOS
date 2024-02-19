import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  I18nManager,
  Keyboard,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";
import BnodyLogo from "../assets/svg/bnodyLogo.svg";

const Header = ({ props }) => {
  const suitcaseArray = [
    {
      id: "saleBilType",
      title: props.StringsList._174,
      icon: (
        <Icon
          name={"print"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={"#ba569c"}
        />
      ),
      color: "#ba569c",
    },
    // {

    {
      id: "billingType",
      title: "Billing Type",
      icon: (
        <Icon
          name={"print"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={"#7e9a49"}
        />
      ),
      color: "#7e9a49",
    },
    {
      id: "terminalSetup",
      title: props.StringsList?._35,
      icon: (
        <Icon
          name={"print"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={"#fb865a"}
        />
      ),
      color: "#fb865a",
    },
    {
      id: "pairPrinter",
      title: props.StringsList?._36,
      icon: (
        <Icon
          name={"print"}
          size={
            sizeHelper.screenWidth > 450
              ? sizeHelper.calWp(30)
              : sizeHelper.calWp(35)
          }
          color={"#7e9a49"}
        />
      ),
      color: "#7e9a49",
    },
  ];

  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;

  const TopNavigation = () => (
    <View style={{ marginEnd: sizeHelper.calWp(30) }}>
      <Menu onSelect={(value) => props.onClickSetting(value)}>
        <MenuTrigger renderTouchable={renderTouchable}>
          <Icon
            name={"suitcase"}
            size={
              sizeHelper.screenWidth > 450
                ? sizeHelper.calWp(30)
                : sizeHelper.calWp(35)
            }
            color={AppColor.white}
          />
        </MenuTrigger>
        <MenuOptions
          style={{ backgroundColor: "white" }}
          optionsContainerStyle={{
            width: "auto",
            marginTop: sizeHelper.calWp(32),
            marginEnd: I18nManager.isRTL
              ? sizeHelper.calWp(200) - sizeHelper.screenWidth
              : 0,
          }}
        >
          {suitcaseArray.map((item, index) => (
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
                }}
              >
                {item.icon}
                <Text style={[styles.title1, { color: item.color }]}>
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
      <View style={styles.topView}>
        <BnodyLogo
          // backgroundColor={'green'}
          width={sizeHelper.calWp(80)}
          height={sizeHelper.calHp(33)}
        />
        {Platform.OS !== "ios" && !props.isDashboard && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.terminalIdText}>
              {props.StringsList._172 + " : "}
            </Text>
            <View
              style={{
                backgroundColor: AppColor.yellowColor,
                width: sizeHelper.calWp(60),
                height: sizeHelper.calHp(30),
                borderRadius: sizeHelper.calWp(5),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[styles.terminalIdText]}>
                {props.TerminalConfiguration?.TerminalCode}
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            zIndex: 500,
          }}
        >
          {props.isDashboard && <TopNavigation />}

          <TouchableOpacity onPress={() => props.onClickPowerOff()}>
            <Icon
              name={"power-off"}
              size={
                sizeHelper.screenWidth > 450
                  ? sizeHelper.calWp(30)
                  : sizeHelper.calWp(35)
              }
              color={AppColor.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!props.isDashboard && (
        <View style={styles.bottomView}>
          {props.isSearch ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                // justifyContent: 'space-between',
              }}
            >
              <View style={styles.searchContainer}>
                <View>
                  <TextInput
                    editable={!props.disabled}
                    style={styles.search}
                    ref={props.ref_searchBar}
                    value={props.searchText}
                    //onFocus={Keyboard.dismiss}
                    onEndEditing={() => {
                      props.searchTextFun();
                    }}
                    onChangeText={(text) => {
                      props.onChangeText("searchText", text);
                    }}
                    placeholder={`${props.StringsList?._135} ${props.StringsList?._304}/${props.StringsList?._141}`}
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
                          ? `${props.StringsList?._130} ${props.StringsList?._436}`
                          : props.barCodeText}
                      </Text>
                    </View>
                  )}
                </View>
                {!props.isDashboard && (
                  <TouchableOpacity
                    disabled={props.disabled}
                    onPress={() => {
                      props.toggleSearchScan();
                    }}
                    style={styles.cameraContainer2}
                  >
                    {!props.barCode ? (
                      <Icon
                        name={"qrcode"}
                        size={sizeHelper.calWp(40)}
                        color={props.barCode ? AppColor.blue2 : AppColor.gray1}
                        style={{ alignSelf: "center" }}
                      />
                    ) : (
                      <Icon
                        name={"search"}
                        size={sizeHelper.calWp(35)}
                        color={AppColor.grayColor}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                disabled={props?.returnInvoiceNumber}
                onPress={props?.onInvoiceClick}
                style={[
                  styles.invoiceContainer,
                  {
                    backgroundColor: props?.invoiceNumber
                      ? AppColor.yellowColor
                      : AppColor.blue1,
                  },
                ]}
              >
                <Text
                  style={[styles.terminalIdText, { color: AppColor.white }]}
                >
                  {props.invoiceNumber
                    ? props.invoiceNumber
                    : props.returnInvoiceNumber}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.title}>{props.title}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColor.blue1,
    // flex: 1,
    //height:sizeHelper.calHp(142),
    paddingTop: sizeHelper.calHp(14),
    paddingHorizontal: sizeHelper.calWp(25),
    width: sizeHelper.screenWidth,
    paddingBottom: sizeHelper.calHp(20),
    // height: sizeHelper.calHp(200),
  },
  topView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    top: Platform.OS === "ios" ? 15 : 0,
    marginHorizontal: Platform.OS === "android" ? 0 : 5,
  },

  terminalIdText: {
    fontSize: sizeHelper.calHp(22),
    color: AppColor.white,
    fontFamily: "Proxima Nova Bold",
    // fontWeight: "bold"
  },
  title: {
    fontSize: sizeHelper.calHp(20),
    color: AppColor.white,
    fontFamily: "Proxima Nova Bold",
    width: sizeHelper.calWp(80),
    backgroundColor: "green",
    alignSelf: "center",
    textAlign: "center",
  },

  title1: {
    fontSize: sizeHelper.calHp(20),
    marginStart: sizeHelper.calWp(5),
    fontFamily: "Proxima Nova Bold",
    alignSelf: "center",
    textAlign: "center",
  },

  bottomView: {
    marginTop: sizeHelper.calHp(35),
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: 'center',
    // backgroundColor: "green"
  },
  searchContainer: {
    width: sizeHelper.calWp(530),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(25),
    paddingStart: sizeHelper.calWp(11),
    alignItems: "center",
    flexDirection: "row",
    top: Platform.OS === "ios" ? 5 : 0,
  },

  search: {
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(6),
    width: sizeHelper.calWp(440),
    borderRadius: sizeHelper.calHp(18),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    fontSize: sizeHelper.calHp(18),
    fontFamily: "ProximaNova-Regular",
  },
  invoiceContainer: {
    width: sizeHelper.calWp(160),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.yellowColor,
    borderRadius: sizeHelper.calHp(25),
    alignItems: "center",
    justifyContent: "center",
    marginStart: sizeHelper.calWp(14),
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
    // paddingEnd: sizeHelper.calWp(5),
    //paddingBottom: sizeHelper.calWp(5)
  },
});

export default Header;
