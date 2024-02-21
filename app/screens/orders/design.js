import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  I18nManager,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";

import sizeHelper from "../../helpers/sizeHelper";
import AppColor from "../../constant/AppColor";
import styles from "./style";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomPicker from "../../components/CustomPicker";
const Design = (props) => {
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        disabled={true}
        onPress={() => {
          let orderID = item?.item?.OrderCode;
          props.navigation.navigate("home", { id: orderID });
        }}
      >
        <View
          style={{
            flex: 1,
            // backgroundColor: AppColor.backColor,
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              borderWidth: 0,
              backgroundColor: AppColor.white,
              // borderColor: AppColor.white,
              flex: 1,
              justifyContent: "center",
              padding: sizeHelper.calWp(10),
              borderRadius: 5,
              shadowRadius: 3.84,
              elevation: 4,
              marginVertical: sizeHelper.calWp(5),

              padding: sizeHelper.calWp(15),
            }}
          >
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                justifyContent: "space-between",
                padding: sizeHelper.calWp(5),
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: sizeHelper.calHp(22),
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                  left: -3,
                }}
              >
                {props.StringsList._450}
              </Text>
              <Text
                style={{
                  fontSize: sizeHelper.calHp(20),

                  color: AppColor.black,
                  fontFamily: "ProximaNova-Regular",
                }}
              >
                {item?.item?.OrderCode}
              </Text>
            </View>
            {item?.item?.TableCode !== "" && (
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",

                  justifyContent: "space-between",
                  padding: sizeHelper.calWp(5),
                }}
              >
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(22),
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                  }}
                >
                  {props.StringsList._484}
                </Text>
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,
                    fontFamily: "ProximaNova-Regular",
                    // textAlign: "center",
                  }}
                >
                  {item?.item?.TableCode}
                </Text>
              </View>
            )}
            {item?.item?.OrderTaker !== "" && (
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",

                  justifyContent: "space-between",
                  padding: sizeHelper.calWp(5),
                }}
              >
                <Text
                  style={{
                    //   textAlign: "center",
                    fontSize: sizeHelper.calHp(22),
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                  }}
                >
                  {props.StringsList._457}
                </Text>
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,
                    fontFamily: "ProximaNova-Regular",
                    //   textAlign: "center",
                  }}
                >
                  {item?.item?.OrderTaker}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                justifyContent: "space-between",
                padding: sizeHelper.calWp(5),
              }}
            >
              <Text
                style={{
                  //   textAlign: "center",
                  fontSize: sizeHelper.calHp(22),
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                {props.StringsList._455}
              </Text>
              <Text
                style={{
                  fontSize: sizeHelper.calHp(20),
                  color: AppColor.black,
                  fontFamily: "ProximaNova-Regular",
                  //   textAlign: "center",
                }}
              >
                {item?.item?.OrderType === 1
                  ? props.StringsList._329
                  : item?.item?.OrderType === 2
                  ? props.StringsList._328
                  : props.StringsList._26}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                justifyContent: "space-between",
                padding: sizeHelper.calWp(5),
              }}
            >
              <Text
                style={{
                  //   textAlign: "center",
                  fontSize: sizeHelper.calHp(22),
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                {props.StringsList._460}
              </Text>
              <Text
                style={{
                  fontSize: sizeHelper.calHp(20),
                  color: AppColor.black,
                  fontFamily: "ProximaNova-Regular",
                  //   textAlign: "center",
                }}
              >
                {item?.item?.OrderTime}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                justifyContent: "space-between",
                padding: sizeHelper.calWp(5),
              }}
            >
              <Text
                style={{
                  fontSize: sizeHelper.calHp(22),
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                {props.StringsList._462}
              </Text>
              <Text
                style={{
                  fontSize: sizeHelper.calHp(20),
                  color: AppColor.black,
                  fontFamily: "ProximaNova-Regular",
                  //   textAlign: "center",
                }}
              >
                {item?.item?.TimeRequired} mins
              </Text>
            </View>
            {props.selectedCounter !== "" && (
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",

                  justifyContent: "space-between",
                  padding: sizeHelper.calWp(5),
                }}
              >
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(22),
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                  }}
                >
                  {props.StringsList._82}
                </Text>
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(22),
                    color: AppColor.black,
                    fontFamily: "ProximaNova-Regular",
                  }}
                >
                  {props.selectedCounter}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                justifyContent: "space-between",
                padding: sizeHelper.calWp(5),
              }}
            >
              <Text
                style={{
                  fontSize: sizeHelper.calHp(22),
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                {props.StringsList._531}
              </Text>
              <Text
                style={{
                  fontSize: sizeHelper.calHp(22),
                  color:
                    item?.item?.IsPaid === true ? AppColor.green : AppColor.red,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                {item?.item?.IsPaid === true
                  ? props.StringsList._505
                  : props.StringsList._532}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                justifyContent: "space-between",
                padding: sizeHelper.calWp(5),
              }}
            >
              <Text
                style={{
                  fontSize: sizeHelper.calHp(22),
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                {props.StringsList._459}
              </Text>
              <Text
                style={{
                  fontSize: sizeHelper.calHp(20),
                  color: AppColor.white,
                  fontFamily: "ProximaNova-Regular",
                  //   textAlign: "center",
                  backgroundColor:
                    item?.item?.Status === 1 || item?.item?.Status === 4
                      ? AppColor.green
                      : AppColor.orange,
                  paddingHorizontal: sizeHelper.calHp(15),
                  paddingVertical: sizeHelper.calHp(8),
                  borderRadius: sizeHelper.calHp(5),
                }}
              >
                {item?.item?.Status === 1
                  ? props.StringsList._453
                  : item?.item?.Status === 2
                  ? props.StringsList._481
                  : item?.item?.Status === 3
                  ? props.StringsList._516
                  : props.StringsList._515}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <StatusBar hidden={true} />

        <Header props={props} isSearch={props.isSearch} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: sizeHelper.calHp(35),
          }}
        >
          <View
            style={{
              backgroundColor: AppColor.backColor,
              justifyContent: "center",
              alignItems: "center",
              marginTop: sizeHelper.calHp(10),
            }}
          >
            <Text
              style={{
                // width: "25%",

                fontSize: sizeHelper.calHp(30),
                color: AppColor.black,
                fontFamily: "Proxima Nova Bold",
                textAlign: "center",
              }}
            >
              {props.StringsList._506}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: AppColor.backColor,
              justifyContent: "center",
              alignItems: "center",
              marginTop: sizeHelper.calHp(10),
            }}
          >
            <View>
              <CustomPicker
                data={props.counters}
                onSelect={(selectedItem, index) => {
                  props.filterOrders(selectedItem);
                }}
                defaultButtonText={"Select Counter"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdownSmall}
                buttonTextStyle={styles.dropdownBtnTxtSmall}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Icon
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={isOpened ? AppColor.black : AppColor.gray1}
                      size={sizeHelper.screenWidth > 450 ? 14 : 14}
                    />
                  );
                }}
                dropdownIconPosition={I18nManager.isRTL ? "left" : "right"}
                dropdownStyle={styles.dropdownDropdownStyleSmall}
                rowStyle={styles.dropdownRowStyleSmall}
                rowTextStyle={styles.dropdownRowTxtStyleSmall}
                selectedRowStyle={styles.dropdownSelectedRowStyleSmall}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,

            zIndex: 0,
          }}
        >
          {props.pendingOrders !== null ? (
            <View
              style={{
                width: "95%",
                backgroundColor: AppColor.backColor,
                alignSelf: "center",
                padding: sizeHelper.calWp(5),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 200,
                }}
                data={props.pendingOrders}
                extraData={props.pendingOrders}
                renderItem={renderItem}
                keyExtractor={(item) => "_" + item.OrderCode.toString()}
                key={(item) => "_" + item.OrderCode.toString()}
              />
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                height: 600,
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 270,
                  height: 270,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/noRecord.png")}
              />
              <Text
                style={{
                  fontSize: sizeHelper.calHp(40),
                  color: AppColor.black,
                  fontFamily: "ProximaNova",
                  textAlign: "center",
                }}
              >
                {props.StringsList._301}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: AppColor.black,
                  fontFamily: "ProximaNova",
                  textAlign: "center",
                  margin: 10,
                }}
              >
                Please check any other counter
              </Text>
            </View>
          )}
        </View>

        {(props.isLoading || props.AddProductLoader) && (
          <View style={[styles.popupContainer, { zIndex: 99999 }]}>
            <Loading />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Design;
