import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import translatorHelper, { t } from "../helpers/translatorHelp";

import { Formik } from "formik";
import * as yup from "yup";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

import Header from "./Header";
import sizeHelper from "../helpers/sizeHelper";
import CustomButton from "./CustomButton";
import CustomRadioButton from "./CustomRadioButton";
import AppColor from "../constant/AppColor";
import { ServerCall } from "../redux/actions/asynchronousAction";
import Loading from "./Loading";
import CustomDropDown from "./CustomDropDown";
import AlertModel from "./AlertModel";
import errorMessages from "../constant/errorMessages";
// import { date } from 'yup';

const LoyaltyCard = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [redeemText, setRedeemText] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [displayAlert, setDisplayAlert] = useState(false);
  const [message, setMessage] = useState("");

  const arry = [
    { title: props.StringsList._409, value: "LoyaltyName" },
    { title: props.StringsList._72, value: "BuyerCode" },
    { title: props.StringsList._203, value: "BuyerName" },
    { title: props.StringsList._410, value: "RegistrationDate" },
    { title: props.StringsList._138, value: "Phone" },
    { title: props.StringsList._411, value: "Email" },
    { title: props.StringsList._423, value: "RedeemPoints" },
    { title: props.StringsList._424, value: "BalancePoints" },
    { title: props.StringsList._412, value: "Country" },
  ];
  const onChangeText = (text, type) => {
    setRedeemText(text);
  };
  useEffect(async () => {
    if (props.buyerInfo) {
      if (props.buyerInfo.LoyaltyCard !== null) {
        let info = {
          LoyaltyName: props.buyerInfo?.LoyaltyCard
            ? props.buyerInfo.LoyaltyCard.LoyaltyName
            : "",
          BuyerCode: props.buyerInfo?.LoyaltyCard
            ? props.buyerInfo.LoyaltyCard.BuyerCode
            : "",
          BuyerName: props.buyerInfo?.LoyaltyCard
            ? props.buyerInfo.LoyaltyCard.ClientName
            : "",
          RegistrationDate: "",
          Phone: props.buyerInfo?.LoyaltyCard
            ? props.buyerInfo.LoyaltyCard.Phone
            : "",
          Email: props.buyerInfo?.LoyaltyCard
            ? props.buyerInfo.LoyaltyCard.Email
            : "",
          RedeemPoints: props.buyerInfo?.LoyaltyCard
            ? String(props.buyerInfo.LoyaltyCard.RedeemPoints)
            : 0,
          BalancePoints: props.buyerInfo?.LoyaltyCard
            ? String(
                props.buyerInfo.LoyaltyCard.TotalPoints -
                  props.buyerInfo.LoyaltyCard.RedeemPoints
              )
            : 0,
          Country: props.buyerInfo?.LoyaltyCard
            ? props.buyerInfo.LoyaltyCard.CountryName
            : "",
        };

        if (props.buyerInfo.LoyaltyCard.RegistrationDate !== "") {
          let date, month, year;
          year = props.buyerInfo.LoyaltyCard.RegistrationDate.slice(0, 4);
          month = props.buyerInfo.LoyaltyCard.RegistrationDate.slice(4, 6);
          date = props.buyerInfo.LoyaltyCard.RegistrationDate.slice(6, 8);
          const currentDate = year + "/" + month + "/" + date;
          info.RegistrationDate = currentDate;
        }

        setInitialValues(info);
      }
    }
  }, []);

  const redeemPointsFun = () => {
    if (redeemText !== 0 && props.buyerInfo?.LoyaltyCard) {
      if (
        Number(redeemText) <=
        Number(
          props.buyerInfo?.LoyaltyCard.TotalPoints -
            props.buyerInfo.LoyaltyCard.RedeemPoints
        )
      ) {
        props.setRedeemPoints(Number(redeemText));
        props.cancel("loyaltyCard");
      } else {
        let msg = errorMessages.GetCustomerMessage(
          "ExceedsRedeemPoints",
          props.StringsList
        );
        setDisplayAlert(true);
        setMessage(msg);
      }
    }
  };
  return (
    <Animatable.View
      style={styles.container}
      ref={props.loyaltyCardViewRef}
      duration={600}
      useNativeDriver
      value={100}
      // easing="ease-in"
      animation="slideInRight"
    >
      <View style={styles.searchAddContainer}>
        <Text style={styles.title}>{props.StringsList._423}</Text>
        <View style={styles.textInputContainer2}>
          <TextInput
            style={styles.textInput}
            placeholder={""}
            onChangeText={(text) => {
              onChangeText(text);
            }}
          />
        </View>
        <CustomButton
          containerStyle={{
            marginEnd: sizeHelper.calHp(15),
          }}
          backgroundColor={AppColor.blue2}
          title={props.StringsList._418}
          onPressButton={redeemPointsFun}
        />
      </View>

      <View style={styles.divider} />

      <View style={{ zIndex: 0 }}>
        <View
          style={{
            // paddingHorizontal: sizeHelper.calWp(20),
            paddingVertical: sizeHelper.calWp(15),
          }}
        >
          {arry.map((item) => {
            return (
              <View id={item.value}>
                <View
                  style={{
                    width: "100%",
                    // backgroundColor: 'green',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: sizeHelper.calHp(20),
                  }}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      zIndex={0}
                      editable={false}
                      BuyerName={item.value}
                      onChangeText={() => onChangeText(text)}
                      style={styles.textInput}
                      placeholder={item.title}
                      value={initialValues[item?.value]}

                      //   onChangeText(text, item.value);
                      // }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            containerStyle={{
              backgroundColor: AppColor.red1,
            }}
            backgroundColor={AppColor.red1}
            onPressButton={() => props.cancel("loyaltyCard")}
            title={props.StringsList._2}
          />
        </View>
      </View>
      <AlertModel
        displayAlert={displayAlert}
        onAlertShow={setDisplayAlert}
        setisPromptAlert={() => {}}
        isPromptAlert={false}
        message={message}
        value={""}
        onChangeText={() => {}}
        reacallFunc={() => {}}
        placeholderText={""}
        type={""}
      />

      {isLoading && (
        <View style={styles.popupContainer}>
          <Loading />
        </View>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "92%",
    backgroundColor: AppColor.white,
    paddingBottom: sizeHelper.calHp(20),
    borderRadius: sizeHelper.calWp(15),
    shadowColor: AppColor.black,
    paddingHorizontal: sizeHelper.calWp(30),
    shadowOffset: {
      width: 52,
      height: 40,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 40,
    alignSelf: "center",
  },
  textInput: {
    zIndex: 0,
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(400),
    height: sizeHelper.calHp(40),
    backgroundColor: "transparent",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    //backgroundColor: 'green',
  },
  textInputContainer: {
    zIndex: 0,
    width: sizeHelper.calWp(450),
    height: sizeHelper.calHp(60),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(60),
    paddingStart: sizeHelper.calWp(20),
    alignItems: "center",
    flexDirection: "row",
    shadowColor: AppColor.blue1,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 10,
  },
  textInputContainer2: {
    width: sizeHelper.calWp(250),
    height: sizeHelper.calHp(60),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(60),
    paddingStart: sizeHelper.calWp(20),
    marginHorizontal: sizeHelper.calWp(60),
    alignItems: "center",
    flexDirection: "row",
    shadowColor: AppColor.blue1,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 10,
  },
  divider: {
    width: "100%",
    alignSelf: "center",
    height: 3,
    backgroundColor: AppColor.gray2,
    marginTop: sizeHelper.calHp(15),
  },
  title: {
    fontSize: sizeHelper.calHp(18),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: sizeHelper.calHp(60),
  },
  redioButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: sizeHelper.calHp(25),
  },
  searchAddContainer: {
    zIndex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: sizeHelper.calHp(25),
  },
  errorText: {
    //textAlign: 'right',
    color: AppColor.orange,
    fontFamily: "ProximaNova-Semibold",
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(20),

    marginStart: sizeHelper.calWp(200),
  },
  popupContainer: {
    width: "115%",
    height: "115%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.popUpBackgroundColor,
  },
});

const mapStateToProps = (state) => {
  return {
    TerminalConfiguration: state.user.SaveAllData.TerminalConfiguration,
    ProductsInfo: state.user.SaveAllData.ProductsInfo,
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyCard);
