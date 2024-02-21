import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import { reach } from "yup";
import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";
import { CheckBoxCustom } from "./CheckBoxCustom";
import CustomButton from "./CustomButton";
import CustomDropDown from "./CustomDropDown";
import { CustomMenu } from "./CustomMenu";
import { getData } from "../sqliteHelper";
import { HoldInvoiceTable } from "../sqliteTables/HoldInvoice";
import Loading from "./Loading";

const ReturnInvoice = ({
  displayAlert,
  onPressCancel,
  reacallFunc,
  data,
  StringsList,
  isLoading,
  isAddon,
  selectedAllProducts,
  TerminalConfiguration,
  selectedProducts,
  restState,
  setToggle,
}) => {
  return (
    <Modal
      visible={displayAlert}
      transparent={true}
      animationType={"fade"}
      zIndex={0}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // borderRadius: 25,
        }}
      >
        <View
          style={{
            backgroundColor: AppColor.blue1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "90%",
            padding: sizeHelper.calWp(15),
            borderTopRightRadius: sizeHelper.calHp(10),
            borderTopLeftRadius: sizeHelper.calHp(10),
          }}
        >
          <Text
            style={{
              fontSize: sizeHelper.calHp(25),
              color: AppColor.white,
              fontFamily: "Proxima Nova Bold",
            }}
          >
            {isAddon ? "Addons" : StringsList._29 + " " + "Invoice"}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (selectedProducts.length < 1) {
                restState();
                onPressCancel();
              } else {
                onPressCancel();
              }
            }}
          >
            <Image
              style={{
                width: sizeHelper.calHp(35),
                height: sizeHelper.calHp(35),
                resizeMode: "contain",
              }}
              source={require("../assets/images/cross.png")}
            />
            {/* <Icon
              name={'close'}
              size={sizeHelper.calWp(35)}
              color={AppColor.white}
            /> */}
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "90%",
            backgroundColor: AppColor.white,
            paddingVertical: sizeHelper.calHp(20),
            // justifyContent: 'center',
            // alignItems: 'center',
            borderBottomLeftRadius: sizeHelper.calHp(10),
            borderBottomRightRadius: sizeHelper.calHp(10),
            paddingHorizontal: sizeHelper.calWp(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: AppColor.blue1,
              paddingVertical: sizeHelper.calHp(20),
              paddingStart: sizeHelper.calWp(8),
            }}
          >
            <Text
              style={{
                width: "40%",
                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: "Proxima Nova Bold",
              }}
            >
              {StringsList._304}
            </Text>
            <Text
              style={{
                width: "38%",

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: "Proxima Nova Bold",
                textAlign: "center",
              }}
            >
              {StringsList._177}
            </Text>
            <Text
              style={{
                width: "22%",

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: "Proxima Nova Bold",
                textAlign: "center",
              }}
            >
              {isAddon
                ? StringsList._320 + " " + StringsList._98
                : StringsList._6}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: sizeHelper.calHp(400),
            }}
          >
            {data.length > 0 ? (
              data.map((item, index) => {
                return isAddon && !item?.IsAddedInReturnList ? (
                  <TouchableOpacity
                    disabled={isLoading}
                    key={item.SalesInvoiceDetailsID}
                    onPress={() => {
                      // setToggle(true);
                      item.IsAddedInReturnList = true;
                      reacallFunc(item, "returnInvoice", index);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "38%",
                          fontSize: sizeHelper.calHp(20),
                          marginVertical: sizeHelper.calHp(20),
                          marginHorizontal: "0.5%",
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                        }}
                      >
                        {item.ProductName}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "36.5%",
                          marginHorizontal: "0.5%",
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                          textAlign: "center",
                        }}
                      >
                        {item.Quantity}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "20.5%",
                          marginHorizontal: "0.5%",
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                          textAlign: "center",
                        }}
                      >
                        {item.GrandAmount.toFixed(
                          TerminalConfiguration.DecimalsInAmount
                        )}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 3,
                        backgroundColor: AppColor.white1,
                        zIndex: 0,
                      }}
                    />
                  </TouchableOpacity>
                ) : item.IsParentAddOn && !item?.IsAddedInReturnList ? (
                  <TouchableOpacity
                    disabled={isLoading}
                    key={item.SalesInvoiceDetailsID}
                    onPress={() => {
                      // setToggle(true);
                      item.IsAddedInReturnList = true;
                      reacallFunc(item, "returnInvoice", index);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "38%",
                          fontSize: sizeHelper.calHp(20),
                          marginVertical: sizeHelper.calHp(20),
                          marginHorizontal: "0.5%",
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                        }}
                      >
                        {item.ProductName}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "36.5%",
                          marginHorizontal: "0.5%",
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                          textAlign: "center",
                        }}
                      >
                        {item.Quantity}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "20.5%",
                          marginHorizontal: "0.5%",
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                          textAlign: "center",
                        }}
                      >
                        {item.GrandAmount.toFixed(
                          TerminalConfiguration.DecimalsInAmount
                        )}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 3,
                        backgroundColor: AppColor.white1,
                        zIndex: 0,
                      }}
                    />
                  </TouchableOpacity>
                ) : null;
              })
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: sizeHelper.calHp(20),
                  marginVertical: sizeHelper.calHp(20),
                  marginHorizontal: "0.5%",
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                No Record Found!
              </Text>
            )}
          </ScrollView>
          <View style={{ alignSelf: "flex-end" }}>
            {!isAddon && (
              <CustomButton
                containerStyle={{
                  marginEnd: sizeHelper.calHp(15),
                }}
                backgroundColor={AppColor.blue2}
                title={StringsList._306}
                onPressButton={() => selectedAllProducts(data)}
                isDisabled={data.length < 1 && isLoading}
              />
            )}
          </View>
        </View>
      </View>
      {isLoading && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: AppColor.popUpBackgroundColor,
            zIndex: 9999,
          }}
        >
          <Loading />
        </View>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReturnInvoice);
