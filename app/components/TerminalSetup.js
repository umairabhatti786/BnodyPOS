import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  DevSettings,
  Image,
  I18nManager,
} from "react-native";

import { connect } from "react-redux";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";
import { CheckBoxCustom } from "./CheckBoxCustom";
import CustomButton from "./CustomButton";
import {
  CreateTable,
  DeleteTable,
  getData,
  updateColunm,
} from "../sqliteHelper";
import {
  InsertTerminalSetup,
  TerminalSetupCoulumnskey,
  TerminalSetupCreateTableCoulumns,
  TerminalSetupTable,
} from "../sqliteTables/TerminalSetup";
import { setI18nConfig } from "../helpers/translatorHelp";
import CustomPicker from "./CustomPicker";
import CustomDropDown from "./CustomDropDown";

const TerminalSetup = ({
  displayAlert,
  isPromptAlert,
  terminalCode,
  StringsList,
  onPressCancel,
}) => {
  const [isDrawerHandling, setDrawerHandling] = useState(false);
  const [isParcel, setParcel] = useState(false);
  const [isEndDrawerLayout, setEndDrawerLayout] = useState(false);
  const [isBeepSound, setBeepSound] = useState(false);
  const [isSelfBilling, setSelfBilling] = useState(false);
  const [isPrintProductFamily, setPrintProductFamily] = useState(false);
  const [isBillLabeling, setBillLabeling] = useState(false);
  const [isSelfCount, setSelfCount] = useState(false);
  const [isPrintAddOns, setPrintAddOns] = useState(false);
  const [printGroupProducts, setPrintGroupProducts] = useState(false);
  const [noOfCopies, setNoOfCopies] = useState("");
  const [startFrom, setStartFrom] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [requiredTime, setRequiredTime] = useState("");
  const [isKitchenDisplay, setIsKitchenDisplay] = useState(true);
  const [language, setLanguage] = useState([
    { label: "English", value: "english" },
    { label: "Arabic", value: "arabic" },
  ]);
  const [lanaguageValue, setLanguageValue] = useState();
  const [preLanaguageValue, setPreLanguageValue] = useState();

  useEffect(() => {
    getData(TerminalSetupTable, (cb) => {
      console.log(" cb:", cb);
      setDrawerHandling(cb[0].DrawerHanding === "true" ? true : false);
      setParcel(cb[0].AddParcelType === "true" ? true : false);
      setEndDrawerLayout(cb[0].EndDrawerOnLogout === "true" ? true : false);
      setBeepSound(cb[0].BeepSound === "true" ? true : false);
      setSelfBilling(cb[0].SelfBilling === "true" ? true : false);
      setPrintProductFamily(cb[0].PrintProductFamily === "true" ? true : false);
      setBillLabeling(cb[0].BillLabeling === "true" ? true : false);
      setSelfCount(cb[0].SelfCount === "true" ? true : false);
      setPrintAddOns(cb[0].PrintAddons === "true" ? true : false);
      setPrintGroupProducts(cb[0].printGroupProducts === "true" ? true : false);
      setNoOfCopies(cb[0].Copies);
      setLanguageValue(cb[0].TerminalLanguage);
      setPreLanguageValue(cb[0].TerminalLanguage);
      setStartFrom(cb[0].StartFrom);
      setRequiredTime(cb[0].requiredTime);
      setIsKitchenDisplay(cb[0].IsKitchenDisplay === "true" ? true : false);
    });
  }, []);

  const updateTerminalSetting = () => {
    let columnName = [
      "AddParcelType",
      "EndDrawerOnLogout",
      "BeepSound",
      "TerminalLanguage",
      "SelfBilling",
      "DrawerHanding",
      "BillLabeling",
      "Copies",
      "SelfCount",
      "StartFrom",
      "PrintProductFamily",
      "PrintAddons",
      "printGroupProducts",
      "requiredTime",
      "IsKitchenDisplay",
    ];
    let columnValue = [
      isParcel,
      isEndDrawerLayout,
      isBeepSound,
      lanaguageValue,
      isSelfBilling,
      isDrawerHandling,
      isBillLabeling,
      noOfCopies,
      isSelfCount,
      startFrom,
      isPrintProductFamily,
      isPrintAddOns,
      printGroupProducts,
      requiredTime,
      isKitchenDisplay,
    ];
    updateColunm(TerminalSetupTable, columnName, "id", "12345678", columnValue);
    if (preLanaguageValue !== lanaguageValue) {
      setI18nConfig(lanaguageValue === "english" ? "en" : "ar");
      DevSettings.addMenuItem("Show Secret Dev Screen", () => {
        Alert.alert("Showing secret dev screen!");
      });
      DevSettings.reload();
    }
  };

  const onChangeText = (text, type) => {
    if (type === "startFrom") {
      setStartFrom(text);
    } else {
      setNoOfCopies(text);
    }
  };
  return (
    <Modal visible={displayAlert} transparent={true} animationType={"fade"}>
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
            backgroundColor: AppColor.blue5,
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
            {I18nManager?.isRTL
              ? `مطعم بنودي  ${StringsList._35}`
              : `Bnody Restaurant  ${StringsList._35}`}
          </Text>

          <TouchableOpacity onPress={onPressCancel}>
            <Image
              style={{
                width: sizeHelper.calHp(35),
                height: sizeHelper.calHp(35),
                resizeMode: "contain",
              }}
              source={require("../assets/images/cross.png")}
            />
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
          <Text
            style={{
              fontSize: sizeHelper.calHp(20),
              color: AppColor.black,
              fontFamily: "Proxima Nova Bold",
            }}
          >
            {StringsList._84}
          </Text>
          <View
            style={{
              width: "75%",
              justifyContent: "space-between",
              //   alignItems: 'center',
              flexDirection: "row",
              marginTop: sizeHelper.calHp(10),
              //   backgroundColor: 'green',
            }}
          >
            <View
              style={{
                // width: '75%',
                justifyContent: "flex-start",

                // backgroundColor: 'yellow',
                alignItems: "flex-start",
                // marginTop: sizeHelper.calHp(10),
              }}
            >
              <CheckBoxCustom
                value={isDrawerHandling}
                onValueChange={setDrawerHandling}
                title={StringsList._370}
              />
              <CheckBoxCustom
                value={isEndDrawerLayout}
                onValueChange={setEndDrawerLayout}
                title={StringsList._86}
              />
            </View>
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <CheckBoxCustom
                value={isParcel}
                onValueChange={setParcel}
                title={StringsList._24}
              />
              <CheckBoxCustom
                value={isBeepSound}
                onValueChange={setBeepSound}
                title={StringsList._85}
              />
            </View>
          </View>
          {/* Language Selection */}

          <View
            style={{
              width: "100%",
              height: 3,
              backgroundColor: AppColor.white1,
              zIndex: 0,
            }}
          />
          <Text
            style={{
              fontSize: sizeHelper.calHp(20),
              color: AppColor.black,
              fontFamily: "Proxima Nova Bold",
              zIndex: 0,
            }}
          >
            {StringsList._84}
          </Text>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: sizeHelper.calHp(10),
              zIndex: 0,
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                zIndex: 0,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                  }}
                >
                  {StringsList._460}
                </Text>
                <CustomPicker // Time Picker
                  disableAutoScroll={true}
                  data={Array.from({ length: 41 }, (_, i) => i * 5)}
                  onSelect={setRequiredTime}
                  defaultButtonText={requiredTime}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setRequiredTime(selectedItem);
                    console.log("selectedTime", requiredTime);

                    return selectedItem + "  mins";
                  }}
                  rowTextForSelection={(item, index) => {
                    return item + "  mins";
                  }}
                  buttonStyle={{
                    height: sizeHelper.calHp(45),
                    width: sizeHelper.calWp(130),
                    backgroundColor: "#FFF",
                    // borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: AppColor.black,
                    padding: sizeHelper.calWp(10),
                    left: 15,
                  }}
                  buttonTextStyle={{
                    color: AppColor.black,
                    textAlign: "left",
                    fontFamily: "ProximaSemi-Bold",
                    fontSize: sizeHelper.calHp(18),
                  }}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <Icon3
                        name={isOpened ? "arrow-drop-up" : "arrow-drop-down"}
                        color={isOpened ? AppColor.black : AppColor.gray1}
                        size={sizeHelper.calHp(30)}
                        style={{ top: -2 }}
                      />
                    );
                  }}
                  dropdownIconPosition={I18nManager.isRTL ? "left" : "right"}
                  dropdownStyle={{ backgroundColor: "#fff" }}
                  rowStyle={{
                    backgroundColor: "#fff",
                    borderBottomColor: "#fff",
                  }}
                  rowTextStyle={{
                    color: AppColor.black,
                    textAlign: "left",
                    fontFamily: "ProximaNova-Regular",
                    fontSize: sizeHelper.calHp(20),
                  }}
                  selectedRowStyle={{ backgroundColor: "#fff" }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: sizeHelper.calHp(10),
                }}
              >
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                  }}
                >
                  {StringsList._104}
                </Text>
                <TextInput
                  style={{
                    textAlignVertical: "center",
                    paddingVertical: 0,
                    paddingStart: sizeHelper.calWp(10),
                    marginStart: sizeHelper.calWp(54),
                    width: sizeHelper.calWp(100),
                    marginEnd: sizeHelper.calWp(10),
                    height: sizeHelper.calHp(45),
                    backgroundColor: AppColor.white,
                    fontFamily: "Proxima Nova Bold",
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,
                    borderWidth: 1,
                    // textAlign: I18nManager.isRTL ? 'right' : 'left',
                  }}
                  onChangeText={(text) => onChangeText(text)}
                  value={noOfCopies}
                  placeholder={"1"}
                />
              </View>
              <CheckBoxCustom
                value={isKitchenDisplay}
                onValueChange={setIsKitchenDisplay}
                title={"Kitchen Display"}
              />
              <CheckBoxCustom
                value={isSelfBilling}
                onValueChange={setSelfBilling}
                title={StringsList._103}
              />
              <CheckBoxCustom
                value={isPrintProductFamily}
                onValueChange={setPrintProductFamily}
                title={StringsList._110}
              />
            </View>
            <View
              style={{
                alignItems: "flex-start",
                zIndex: 0,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBoxCustom
                  value={isSelfCount}
                  onValueChange={setSelfCount}
                  title={StringsList._112}
                />
                <Text
                  style={{
                    marginStart: sizeHelper.calWp(10),
                    marginTop: sizeHelper.calWp(10),
                    fontSize: sizeHelper.calHp(15),
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                  }}
                >
                  {StringsList._113}
                </Text>
                <TextInput
                  style={{
                    paddingVertical: 0,
                    textAlignVertical: "center",
                    marginTop: sizeHelper.calWp(10),
                    paddingStart: sizeHelper.calWp(5),
                    marginStart: sizeHelper.calWp(10),
                    width: sizeHelper.calWp(100),

                    height: sizeHelper.calHp(45),
                    backgroundColor: AppColor.white,
                    fontFamily: "Proxima Nova Bold",
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,

                    borderWidth: 1,
                  }}
                  onChangeText={(text) => onChangeText(text, "startFrom")}
                  value={startFrom}
                  placeholder={"1"}
                />
              </View>

              <CheckBoxCustom
                value={isBillLabeling}
                onValueChange={setBillLabeling}
                title={StringsList._111}
              />

              <CheckBoxCustom
                value={isPrintAddOns}
                onValueChange={setPrintAddOns}
                title={StringsList._400}
              />
              <CheckBoxCustom
                value={printGroupProducts}
                onValueChange={setPrintGroupProducts}
                title={"Print Group Products"}
              />
            </View>
          </View>
          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: sizeHelper.calHp(10),
            }}
          >
            <CustomButton
              containerStyle={{
                height: sizeHelper.calWp(40),
                width: sizeHelper.calWp(120),
                marginTop: sizeHelper.calHp(25),
              }}
              backgroundColor={AppColor.blue2}
              isDisabled={isPromptAlert && !terminalCode}
              title={StringsList._1}
              titleColor={AppColor.white}
              onPressButton={() => {
                updateTerminalSetting();
                onPressCancel();
              }}
            />
            <CustomButton
              containerStyle={{
                height: sizeHelper.calWp(40),
                width: sizeHelper.calWp(120),
                marginTop: sizeHelper.calHp(25),
                marginStart: sizeHelper.calHp(25),
                backgroundColor: AppColor.red1,
              }}
              backgroundColor={AppColor.red1}
              isDisabled={isPromptAlert && !terminalCode}
              title={StringsList._2}
              titleColor={AppColor.white}
              onPressButton={onPressCancel}
            />
          </View>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TerminalSetup);
