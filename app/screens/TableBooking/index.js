import React, { useState } from "react";
import { Alert, I18nManager } from "react-native";
import { useEffect } from "react";
import { connect } from "react-redux";
import Design from "./design";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServerCall } from "../../redux/actions/asynchronousAction";
import DBTable from "../../constant/UpdateDB";
import errorMessages from "../../constant/errorMessages";
import ResetDrawerSetup from "../../constant/ResetDrawerSetup";
import { getData } from "../../sqliteHelper";
import { TerminalConfigurationTable } from "../../sqliteTables/TerminalConfiguration";
import { list } from "../../constant/global";
const TableBookingScreen = (props) => {
  const [tableList, setTableList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [storageItems, setStorageItems] = useState(null);
  const [orderType, setOrderType] = useState({ id: 0, value: "Select Type" });
  const [TerminalConfiguration, setTerminalConfiguration] = useState({});
  const [orderCode, setOrderCode] = useState(true);
  const [companyVATRegistor, setCompanyVATRegistor] = useState(false);
  const onSelectTable = (index) => {
    let TBL = [...tableList];
    TBL[index].isSelected = true;
    console.log("onSelectTable", tableList);
    setTableList(TBL);
  };
  const onClickLogoutFunction = () => {
    Alert.alert(props.StringsList._537, props.StringsList._443, [
      {
        text: "yes",
        onPress: async () => {
          ResetDrawerSetup();
          goToLogin();
        },
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);
  };
  const goToLogin = async (type) => {
    setLoading(true);
    if (storageItems) {
      changeTableStatus();
    }
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    let loginUserInfo = await AsyncStorage.getItem("LOGIN_USER_INFO");
    loginUserInfo = JSON.parse(loginUserInfo);
    // console.log('access token ', loginUserInfo, JSON.parse(loginUserInfo));
    const response = await props.dispatch(
      ServerCall(token, "AuthorizeUser/SignOut", "POST", loginUserInfo)
    );
    console.log("user logout response.. ", response);
    props.navigation.replace("Auth");
    await AsyncStorage.removeItem("ACCESS_TOKEN");
    await AsyncStorage.removeItem("SELECTED_AGNETS");

    if (type === "terminal") {
      await AsyncStorage.removeItem("LOGIN_USER_INFO");
      ResetDrawerSetup();
    }

    setLoading(false);
  };
  const changeTableStatus = async () => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");

    try {
      const response = await props.dispatch(
        ServerCall(
          token,
          `Table/ChangeTableStatus?tableCode=${storageItems?.TableCodeID}
             &IsAvailable=1`,
          "GET"
        )
      );
      console.log("onFreeTable", response);

      if (response) {
        let table = await AsyncStorage.getItem("SELECTED_TABLE");
        if (table) {
          await AsyncStorage.removeItem("SELECTED_TABLE");
          console.log("Table Removed=================>", storageItems);
        }
        setStorageItems(null);
      }
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }
  };
  const getStorageItem = async () => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    if (tableData) {
      let result = JSON.parse(tableData);
      console.log("tabledata=========>", result);
      setStorageItems(result);
      setOrderType({ id: 1, value: "Dine In" });
      list.ordID = 1;
    } else {
      setStorageItems(null);
    }
  };
  useEffect(async () => {
    getStorageItem();

    await getData(TerminalConfigurationTable, async (TC) => {
      setTerminalConfiguration(TC[0]);
      let isnum = /^\d+$/.test(TC[0].ValueAddedTaxNumber);

      let isZero = TC[0].ValueAddedTaxNumber === "000000000000000";

      if (TC[0].ValueAddedTaxNumber.length === 15 && isnum && !isZero)
        setCompanyVATRegistor(true);
    });
  }, []);
  return (
    <Design
      navigation={props.navigation}
      TableArray={tableList}
      onSelectTable={onSelectTable}
      dispatch={props.dispatch}
      isLoading={isLoading}
      StringsList={props.StringsList}
      onClickLogoutFunction={onClickLogoutFunction}
      TerminalConfiguration={TerminalConfiguration}
      setTerminalConfiguration={setTerminalConfiguration}
      orderCode={orderCode}
      setOrderCode={setOrderCode}
    />
  );
};
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

export default connect(mapStateToProps, mapDispatchToProps)(TableBookingScreen);
