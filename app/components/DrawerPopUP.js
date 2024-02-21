import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, BackHandler } from "react-native";

import * as Animatable from "react-native-animatable";
import Header from "./Header";
import sizeHelper from "../helpers/sizeHelper";
import CustomButton from "./CustomButton";
import CustomRadioButton from "./CustomRadioButton";

import AppColor from "../constant/AppColor";
import {
  CreateTable,
  DeleteTable,
  getData,
  updateColunm,
} from "../sqliteHelper";
import {
  DrawerSetupCoulumnskey,
  DrawerSetupCreateTableCoulumns,
  DrawerSetupTable,
  InsertDrawerSetup,
} from "../sqliteTables/DrawerSetup";
import Loading from "./Loading";
import moment from "moment";

const DrawerPopUp = (props) => {
  const [isDesposit, setDesposit] = useState(true);
  const [drawerSetupArr, setDrawerSetupArr] = useState({});
  const [iniCash, setIniCash] = useState("");
  const [dwCash, setDWCash] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSelect = (type) => {
    if (type === "Deposit") {
      setDesposit(true);
    } else {
      setDesposit(false);
    }
  };

  let amountDetails = [
    { id: "StartDate", title: props.StringsList._47, value: "0" },
    { id: "initialCash", title: props.StringsList._48, value: "0" },
    { id: "DepositCash", title: props.StringsList._50, value: "0" },
    { id: "CashRefund", title: props.StringsList._49, value: "0" },
    { id: "CashSales", title: props.StringsList._52, value: "0" },
    { id: "withDraw", title: props.StringsList._51, value: "0" },
    { id: "estimatedAmountinDrawer", title: props.StringsList._53, value: "0" },
    {
      id: "creditSales",
      title: props.StringsList._54,
      value: "0",
    },
    {
      id: "creditRefunds",
      title: props.StringsList._55 + " " + props.StringsList._56,
      value: "0",
    },
    { id: "cardSale", title: props.StringsList._57, value: "0" },
    { id: "cardReturn", title: props.StringsList._58, value: "0" },
  ];
  const onClickCancel = () => {
    props.navigation.navigate("dashboard");
  };

  useEffect(() => {
    // DeleteTable(DrawerSetupTable);
    // CreateTable(DrawerSetupTable, DrawerSetupCreateTableCoulumns);
    // InsertDrawerSetup(DrawerSetupCoulumnskey);
    console.log(
      "props.userConfiguration.EndCashDrawerAllowed",
      props.userConfiguration
    );
    getData(DrawerSetupTable, (cb) => {
      setDrawerSetupArr(cb[0]);
      console.log("drawerSetupArr", drawerSetupArr);
    });
  }, []);

  const onStartCash = (type) => {
    setLoading(true);
    if (type === "start") {
      let columnName = [
        "StartDate",
        "initialCash",
        "estimatedAmountinDrawer",
        "isInitialCashSet",
      ];
      let columnValue = [
        moment().format("DD-MM-YYYY, hh:mm:ss A"),
        iniCash,
        iniCash,
        "true",
      ];
      updateColunm(
        DrawerSetupTable,
        columnName,
        "id",
        "D12345678",
        columnValue
      );
      getData(DrawerSetupTable, (cb) => {
        setDrawerSetupArr(cb[0]);
        setLoading(false);
        setIniCash("");
      });
    } else {
      if (props.userConfiguration.EndCashDrawerAllowed === 1) {
        DeleteTable(DrawerSetupTable);
        CreateTable(DrawerSetupTable, DrawerSetupCreateTableCoulumns);
        InsertDrawerSetup(DrawerSetupCoulumnskey);
        getData(DrawerSetupTable, (cb) => {
          setDrawerSetupArr(cb[0]);
          setLoading(false);
          setIniCash("");
          updateColunm(
            DrawerSetupTable,
            ["isInitialLogin"],
            "id",
            "D12345678",
            "false"
          );
        });
      } else {
        setLoading(false);
      }
    }
  };
  const changeText = (text, type) => {
    if (type === "dwCash") {
      setDWCash(text);
    } else {
      setIniCash(text);
    }
  };

  const onSave = () => {
    let estimatedAmountinDrawer = isDesposit
      ? Number(drawerSetupArr.estimatedAmountinDrawer) + Number(dwCash)
      : Number(drawerSetupArr.estimatedAmountinDrawer) - Number(dwCash);
    if (dwCash !== "") {
      let dCash = isDesposit
        ? Number(drawerSetupArr.DepositCash) + Number(dwCash)
        : Number(drawerSetupArr.withDraw) + Number(dwCash);
      console.log("sdasdsadasads", dCash);
      setLoading(true);
      if (estimatedAmountinDrawer > 0) {
        let columnName = isDesposit
          ? ["DepositCash", "estimatedAmountinDrawer"]
          : ["withDraw", "estimatedAmountinDrawer"];
        let columnValue = [dCash, estimatedAmountinDrawer];
        updateColunm(
          DrawerSetupTable,
          columnName,
          "id",
          "D12345678",
          columnValue
        );
        getData(DrawerSetupTable, (cb) => {
          setDrawerSetupArr(cb[0]);
          setLoading(false);
          setDWCash("");
        });
        props.cancel("drawer");
      } else {
        alert("you don’t have sufficient balance to complete this request");
        setLoading(false);
      }
    }
  };

  return (
    <Animatable.View
      style={styles.container}
      ref={props.viewref}
      duration={500}
      useNativeDriver
      value={100}
      // easing="ease-in"
      animation="slideInRight"
    >
      {/* <Header title={i18n.t('drawer')} /> */}

      <View style={styles.amountDetailsContianer}>
        {amountDetails.map((item, index) => {
          return (
            <View
              key={item.title + item.value}
              style={styles.titleValueContainer}
            >
              <Text style={[styles.titleValueStyle]}>{item.title}</Text>
              <View
              // style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
              >
                <Text style={[styles.titleValueStyle]}>
                  {item.id === "StartDate"
                    ? drawerSetupArr[item.id]
                    : Number(drawerSetupArr[item.id]).toFixed(
                        props.TerminalConfiguration.DecimalsInAmount
                      )}
                </Text>
              </View>
            </View>
          );
        })}

        <Text style={styles.initialAmount}>{props.StringsList._46}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: sizeHelper.calHp(10),
          }}
        >
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => {
              changeText(text);
            }}
            editable={drawerSetupArr.isInitialCashSet === "false"}
            value={iniCash}
            placeholder="0.00"
          />
          {/* New button code here  */}
          <View style={{ zIndex: 0, alignItems: "center" }}>
            <CustomButton
              containerStyle={[styles.buttonStyle]}
              title={
                drawerSetupArr.isInitialCashSet === "true"
                  ? props.StringsList._100
                  : props.StringsList._184
              }
              backgroundColor={AppColor.blue2}
              onPressButton={() => {
                drawerSetupArr.isInitialCashSet === "true"
                  ? onStartCash("end")
                  : onStartCash("start");
              }}
            />
          </View>
          {/* <CustomButton
            backgroundColor={AppColor.blue2}
            title={
              drawerSetupArr.isInitialCashSet === 'true'
                ? props.StringsList._100
                : props.StringsList._184
            }
            onPressButton={() => {
              drawerSetupArr.isInitialCashSet === 'true'
                ? onStartCash('end')
                : onStartCash('start');
            }}
          /> */}
        </View>
        <Text style={styles.initialAmount}>
          {props.StringsList._50 + " " + props.StringsList._51}
        </Text>
        <View style={styles.redioButtonContainer}>
          <View>
            <CustomRadioButton
              onSelect={() => onSelect("Deposit")}
              isSelected={isDesposit}
              title={props.StringsList._50}
            />
            <TextInput
              style={styles.inputField2}
              placeholder={props.StringsList._310}
              keyboardType="number-pad"
              onChangeText={(text) => {
                changeText(text, "dwCash");
              }}
              value={dwCash}
            />
          </View>
          <View>
            <CustomRadioButton
              onSelect={() => onSelect("Withdraw")}
              isSelected={!isDesposit}
              title={props.StringsList._51}
            />
            <TextInput
              style={styles.inputField2}
              //keyboardType="number-pad"
              placeholder={props.StringsList._134}
            />
          </View>
        </View>

        {/* New button code here  */}

        <View style={styles.buttonContainer}>
          <View
            style={{
              flexDirection: "row-reverse",
              // justifyContent: "space-between",
              flex: 1,
            }}
          >
            <CustomButton
              containerStyle={{
                backgroundColor: AppColor.red1,
              }}
              backgroundColor={AppColor.red1}
              onPressButton={() => props.cancel("drawer")}
              title={props.StringsList._2}
            />
            <CustomButton
              containerStyle={{
                marginEnd: sizeHelper.calHp(15),
              }}
              backgroundColor={AppColor.blue2}
              title={props.StringsList._1}
              isDisabled={!dwCash}
              onPressButton={onSave}
            />
          </View>
        </View>
      </View>
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
    width: "95%",
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calWp(10),
    shadowColor: AppColor.black,
    shadowOffset: {
      width: 52,
      height: 40,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 40,
  },
  amountDetailsContianer: {
    paddingHorizontal: sizeHelper.calWp(22),
    paddingVertical: sizeHelper.calWp(15),
    // width: '100%',
  },
  titleValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: sizeHelper.calHp(10),
  },
  titleValueStyle: {
    marginTop: sizeHelper.calHp(5),
    fontSize: sizeHelper.calHp(18),
    color: AppColor.black,
    fontFamily: "ProximaNova-Regular",
  },
  initialAmount: {
    marginTop: sizeHelper.calHp(20),
    fontSize: sizeHelper.calHp(18),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
    // backgroundColor: 'green',
  },
  inputField: {
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(495),
    height: sizeHelper.calHp(40),
    backgroundColor: "transparent",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    borderBottomWidth: 1,
    borderColor: AppColor.gray3,
  },
  inputField2: {
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(330),
    height: sizeHelper.calHp(40),
    backgroundColor: "transparent",
    fontFamily: "ProximaNova-Regular",
    fontSize: sizeHelper.calHp(18),
    color: AppColor.black,
    borderBottomWidth: 1,
    borderColor: AppColor.gray3,
    marginTop: sizeHelper.calHp(40),
  },
  redioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: sizeHelper.calHp(15),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: sizeHelper.calHp(50),
  },
  popupContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.popUpBackgroundColor,
  },
  // button design
  buttonStyle: {
    height: sizeHelper.calWp(50),

    // flex: 1,
  },
  buttonStyle2: {
    height: sizeHelper.calWp(50),

    flex: 1,
  },
});

export default DrawerPopUp;
