import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
  SafeAreaView,
} from "react-native";

import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";
import CustomButton from "./CustomButton";
import DineLogo from "../assets/svg/dineLogo";
import TimeLog from "../assets/svg/timeLogo";
import SwipeButton from "./SwipeButton";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomMenu from "./CustomMenu";
const KitchenItem = () => {
  const [disabled, setDisabled] = useState(true);

  const productList = [
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
    {
      name: "beef kabab",
      quntity: 5,
      price: 25,
    },
  ];
  const menuList = [
    { name: "Add Time", id: 0 },
    {
      name: "Print",
      id: 1,
    },
    {
      name: "Remove",
      id: 3,
    },
  ];

  const CheckoutButton = () => {
    return (
      <SafeAreaView
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              disabled === false ? AppColor.orange1 : AppColor.gray,
          },
        ]}
      >
        <View style={styles.iconView}>
          <Icon
            name={
              I18nManager.isRTL ? "angle-double-left" : "angle-double-right"
            }
            size={20}
            color={AppColor.gray3}
          />
        </View>
        <View style={styles.iconTextView}>
          <Text
            style={[
              styles.text,
              { color: disabled === true ? AppColor.gray3 : AppColor.white },
            ]}
          >
            Swipe to Fullfil
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.orderIdTextStyle}>#165548</Text>
        <View
          style={{
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <DineLogo />
          <Text
            style={[
              styles.textStyle,
              {
                color: AppColor.black3,
                marginStart: sizeHelper.calWp(5),
                alignSelf: "center",
              },
            ]}
          >
            Dine-in
          </Text>
        </View>
        <TouchableOpacity>
          <CustomMenu menuList={menuList} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={styles.textStyle}>Table #01</Text>
        <Text style={styles.textTime}>
          2:00am<Text style={styles.textStyle}>{"\n"}M Irfan</Text>
        </Text>
      </View>
      <View style={styles.divider} />

      <FlatList
        data={productList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={styles.textStyle}>{item.name}</Text>
              <Text style={styles.textStyle}>
                {item.quntity}{" "}
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: AppColor.blue5,
                      fontFamily: "ProximaNova-Regular",
                    },
                  ]}
                >
                  {" "}
                  SA {item.price}
                </Text>
              </Text>
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <TimeLog />
        <Text style={styles.textTime}>2:00am</Text>
      </View>

      <View style={styles.swipeContainer}>
        <SwipeButton
          containerStyles={styles.swipeButtonContainer}
          disableResetOnTap
          width={"100%"}
          height={40}
          disabled={disabled}
          disabledRailBackgroundColor={AppColor.white}
          disabledThumbIconBackgroundColor={"#fff"}
          disabledThumbIconBorderColor={AppColor.white}
          railBackgroundColor={AppColor.orange}
          railFillBackgroundColor={AppColor.orange}
          railBorderColor={disabled === false ? AppColor.orange : AppColor.gray}
          thumbIconStyles={{ borderRadius: 5, borderColor: AppColor.orange }}
          enableReverseSwipe={false}
          railFillBorderColor={AppColor.white}
          railStyles={{ borderRadius: 5, borderColor: AppColor.orange }}
          resetAfterSuccessAnimDelay={300}
          resetAfterSuccessAnimDuration={300}
          shouldResetAfterSuccess={true}
          thumbIconBackgroundColor={
            disabled === false ? AppColor.orange1 : AppColor.gray
          }
          thumbIconBorderColor={
            disabled === false ? AppColor.orange1 : AppColor.gray
          }
          thumbIconComponent={CheckoutButton}
          titleFontSize={12}
          thumbIconWidth={150}
          //     onSwipeSuccess
          //     disableResetOnTap
          //     forceReset
          //     onSwipeFail
          //     onSwipeStart
          swipeSuccessThreshold={10}
        />
      </View>

      {/* <CustomButton
        containerStyle={styles.buttonStyle}
        title={I18nManager.isRTL ? 'تحويل' : 'Transfer'}
        backgroundColor={AppColor.orange}
        onPressButton={() => {}}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: sizeHelper.calHp(383),
    width: "100%",
    backgroundColor: AppColor.white,
    elevation: sizeHelper.calHp(10),
    padding: sizeHelper.calWp(10),
    borderRadius: sizeHelper.calWp(5),

    marginVertical: sizeHelper.calWp(10),
  },
  divider: {
    width: "100%",
    backgroundColor: AppColor.gray2,
    height: sizeHelper.calHp(2),
    marginTop: sizeHelper.calHp(15),
    marginBottom: sizeHelper.calHp(10),
  },
  buttonStyle: {
    height: sizeHelper.calWp(40),
    width: sizeHelper.calWp(150),
    marginTop: sizeHelper.calHp(10),
    marginEnd: sizeHelper.calHp(20),
    alignSelf: "center",
  },
  orderIdTextStyle: {
    fontSize: sizeHelper.calHp(25),
    color: AppColor.blue5,
    fontFamily: "Proxima Nova Bold",
    marginTop: sizeHelper.calHp(10),
  },
  textStyle: {
    fontSize: sizeHelper.calHp(18),
    color: AppColor.black3,
    fontFamily: "Proxima Nova Bold",
  },
  textTime: {
    fontSize: sizeHelper.calHp(16),
    color: AppColor.black,
    fontFamily: "ProximaNova-Regular",
    marginStart: sizeHelper.calWp(20),
  },
  dotText: {
    fontSize: sizeHelper.calHp(30),
    color: AppColor.gray2,
    fontFamily: "Proxima Nova Bold",
  },
  iconView: { alignItems: "center" },
  iconTextView: { alignItems: "center", marginHorizontal: 10 },
  text: { fontFamily: "Proxima Nova Bold" },
  iconContainer: {
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  swipeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  swipeButtonContainer: {
    width: "100%",
    borderRadius: 5,
  },
});

export default KitchenItem;
