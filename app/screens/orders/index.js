import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Alert, I18nManager } from "react-native";
import { ServerCall } from "../../redux/actions/asynchronousAction";
import { getData } from "../../sqliteHelper";
import { TerminalConfigurationTable } from "../../sqliteTables/TerminalConfiguration";
import Design from "./design";
import { UserConfigurationTable } from "../../sqliteTables/UserConfiguration";
import ResetDrawerSetup from "../../constant/ResetDrawerSetup";
const PendingOrdersScreen = (props) => {
  const [TerminalConfiguration, setTerminalConfiguration] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [userConfiguration, setUserConfiguration] = useState({});
  const viewref = useRef(null);
  const [pendingOrders, setPendingOrders] = useState(null);
  const [counters, setCounters] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState();
  const [storageItems, setStorageItems] = useState(null);
  useEffect(async () => {
    setLoading(true);
    getStorageItem();
    getPendingsOrder("");
    getCounters();
    console.log("selectedCounter", selectedCounter);
    await getData(TerminalConfigurationTable, async (TC) => {
      setTerminalConfiguration(TC[0]);
    });
    await getData(UserConfigurationTable, async (TC) => {
      setUserConfiguration(TC[0]);
    });
  }, []);
  const filterOrders = (counter) => {
    if (counter === "All") counter = "";
    getPendingsOrder(counter);
  };

  const getCounters = async () => {
    let allCounter = [];
    let counters = await AsyncStorage.getItem("COUNTER_LIST");
    if (counters) {
      let finalData = JSON.parse(counters);
      for (let i = 0; i < finalData.length; i++) {
        const element = finalData[i];
        allCounter.push(element);
      }
      allCounter.unshift("All");
      setCounters(allCounter);
      console.log("all counters ====>", allCounter);
    }
  };

  const getPendingsOrder = async (counter) => {
    setSelectedCounter(counter);
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    setLoading(true);
    let ccode = I18nManager.isRTL ? "ar-SA" : "en-US";
    try {
      const response = await props.dispatch(
        ServerCall(
          token,
          `Order/FetchAllPendingOrders?skip=1&next=100&CultureCode=${ccode}&counterCode=${counter}`,
          "GET"
        )
      );
      console.log("order Details responce", response);

      if (response?.message === "Unauthorized") {
        Alert.alert(props.StringsList._537, props.StringsList._276, [
          { text: "OK", onPress: () => goToLogin() },
        ]);
        setLoading(false);
      }
      if (Array.isArray(response) && response.length > 0) {
        let newArray = [];
        for (let i = 0; i < response.length; i++) {
          newArray.push(response[i]);
        }
        setPendingOrders(newArray);
        setLoading(false);
      } else {
        setPendingOrders(null);
        setLoading(false);
      }
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }
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
    // setLoading(true);

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
        // setLoading(false);
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
  return (
    <Design
      navigation={props.navigation}
      isLoading={isLoading}
      viewref={viewref}
      StringsList={props.StringsList}
      dispatch={props.dispatch}
      pendingOrders={pendingOrders}
      TerminalConfiguration={TerminalConfiguration}
      userConfiguration={userConfiguration}
      counters={counters}
      setCounters={setCounters}
      selectedCounter={selectedCounter}
      setSelectedCounter={setSelectedCounter}
      filterOrders={filterOrders}
      onClickLogoutFunction={onClickLogoutFunction}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingOrdersScreen);
