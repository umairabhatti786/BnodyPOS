import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  I18nManager,
  BackHandler,
  Platform,
  NativeModules,
  Alert,
  PermissionsAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import * as ScopedStorage from "react-native-scoped-storage";
import Toast from "react-native-root-toast";
import Design from "./design";
import { getData, getDataById, updateColunm } from "../../sqliteHelper";
import { SaleBillDetailsTable } from "../../sqliteTables/SaleBillDetails";
import { ServerCall } from "../../redux/actions/asynchronousAction";
import { SaleBillsTable } from "../../sqliteTables/SaleBills";
import { DrawerSetupTable } from "../../sqliteTables/DrawerSetup";
import { TerminalConfigurationTable } from "../../sqliteTables/TerminalConfiguration";
import DBTable from "../../constant/UpdateDB";
import errorMessages from "../../constant/errorMessages";
import { SalesAgentsTable } from "../../sqliteTables/SalesAgents";
import { UserConfigurationTable } from "../../sqliteTables/UserConfiguration";
import ResetDrawerSetup from "../../constant/ResetDrawerSetup";
import { useRoute } from "@react-navigation/native";
import { list } from "../../constant/global";
const DashboardScreen = (props) => {
  const PermissionFile = NativeModules.PermissionFile;
  const route = useRoute();
  const [isPopup, setPopup] = useState(false);
  const [isTerminalSetup, setTerminalSetup] = useState(false);
  const [isPairPrinterFamily, setPairPrinterFamily] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [isBillNeedPost, setBillNeedPost] = useState(false);
  const [drawerSetupArr, setDrawerSetupArr] = useState({});
  const viewref = useRef(null);
  const [TerminalConfiguration, setTerminalConfiguration] = useState({});
  const [message, setMessage] = useState("");
  const [isRequriedLogin, setIsRequriedLogin] = useState(false);
  const [salesAgentsList, setSalesAgentsList] = useState([]);
  const [isSaleAgents, setIsSaleAgents] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [userConfiguration, setUserConfiguration] = useState({});
  const [isLogout, setisLogout] = useState(false);
  const [isBillingType, setisBillingType] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [isPromptAlert, setisPromptAlert] = useState(false);
  const [alertValue, setAlertValue] = useState(null);
  const [printType, setPrintType] = useState(null);
  const [billingTypeData, setBillingTypeData] = useState([
    { id: 1, name: "A4 Billing", name2: "A4 الفواتير", isSelected: false },
    { id: 2, name: "Thermal 2", name2: "الحرارية 2", isSelected: false },
    { id: 3, name: "Thermal 1", name2: "الحرارية 1", isSelected: false },
  ]);
  const [saleBilType, setSaleBilType] = useState();
  const [isSaleBilType, setISSaleBilType] = useState(false);
  const [saleBilData, setSaleBilData] = useState([
    {
      id: 1,
      name: "Ordinary Sales Bill",
      name2: "فاتورة مبيعات عادية",
      isSelected: false,
    },
    {
      id: 2,
      name: "Simplified Tax Bill",
      name2: "فاتورة ضريبية مبسطة",
      isSelected: false,
    },
    { id: 3, name: "Tax Invoice", name2: "فاتورة ضريبية", isSelected: false },
  ]);
  const [billingStyleId, setBillingStyleId] = useState(2);
  const [billingType, setBillingType] = useState();

  const drawerRef = useRef(null);
  const [storageItems, setStorageItems] = useState(null);
  const { PrinterNativeModule } = NativeModules;
  const [isDrawar, setIsDrawar] = useState(false);

  useEffect(async () => {
    setLoading(true);
    getStorageItem();

    // await getData(SalesAgentsTable, cb => {
    //   setSalesAgentsList(cb);
    // });
    await getData(UserConfigurationTable, (cb) => {
      setUserConfiguration(cb[0]);
    });
    let saleAgent = await AsyncStorage.getItem("SELECTED_AGNETS");
    if (saleAgent) {
      saleAgent = JSON.parse(saleAgent);
      setSelectedAgent(saleAgent);
    }
    await getData(TerminalConfigurationTable, (cb) => {
      setTerminalConfiguration(cb[0]);
    });
    await getData(SaleBillsTable, async (cb) => {
      for (let i = 0; i < cb.length; i++) {
        if (
          (cb[i].isUploaded == "false" || !cb[i].isUploaded) &&
          (cb[i].isProcessed == "false" || !cb[i].isProcessed)
        ) {
          setBillNeedPost(true);
        } else {
          setBillNeedPost(false);
        }
      }
    });
    getDrawerSetting();
    let bilT = await AsyncStorage.getItem("SaleBIL_STYLE");
    if (bilT) {
      let billTypeSe = await JSON.parse(bilT);
      if (billTypeSe) {
        // console.log('bill type is ', billTypeSe);
        setSaleBilType(billTypeSe);
        let TArry = [...saleBilData];
        TArry.forEach((e) => {
          if (e.id === billTypeSe.id) {
            e.isSelected = true;
          }
        });
        setSaleBilData(TArry);
      }
    } else {
      let TArry = [...saleBilData];
      TArry.forEach((e) => {
        if (e.id === 3) {
          e.isSelected = true;
        }
      });
      setSaleBilData(TArry);
      setSaleBilType({
        id: 3,
        name: "Tax Invoice",
        name2: "فاتورة ضريبية",
        isSelected: true,
      });
    }

    let BT = await AsyncStorage.getItem("BILLING_STYLE");
    if (BT) {
      let BTSe = await JSON.parse(BT);
      if (BTSe) {
        // console.log('thermal ', BTSe);
        setBillingType(BTSe);
        let BArry = [...billingTypeData];
        BArry.forEach((e) => {
          if (e.id === BTSe.id) {
            e.isSelected = true;
          }
        });
        setBillingTypeData(BArry);
      }
    } else {
      let BArry = [...billingTypeData];
      BArry.forEach((e) => {
        if (e.id === 2) {
          e.isSelected = true;
        }
      });
      setBillingTypeData(BArry);
      setBillingType({
        id: 2,
        name: "Thermal 2",
        name2: "الحرارية 2",
        isSelected: true,
      });
    }

    setLoading(false);
  }, []);

  const PrinterFunc = async (type, index) => {
    if (type === "billingType") {
      let d = [...billingTypeData];

      d.forEach(async (e) => {
        if (e.isSelected) {
          await AsyncStorage.setItem("BILLING_STYLE", JSON.stringify(e));
        }
      });
      setisBillingType(false);
    } else if (type === "saleBilType") {
      let d = [...saleBilData];

      d.forEach(async (e) => {
        if (e.isSelected) {
          await AsyncStorage.setItem("SaleBIL_STYLE", JSON.stringify(e));
        }
      });
      setISSaleBilType(false);
    } else {
      alert("error");
    }
  };

  const selectSaleBilType = (item) => {
    let d = [...saleBilData];
    console.log("billingType...", item);
    d.forEach((e) => {
      if (item.name === e.name) {
        e.isSelected = true;
      } else {
        e.isSelected = false;
      }
    });
    if (item.name !== "Set") {
      setSaleBilType(item);
    }
    setSaleBilData(d);
  };

  const selectBillingType = (item) => {
    let d = [...billingTypeData];
    console.log("billingType...", item);
    let bid = "";
    d.forEach((e) => {
      if (item.name === e.name) {
        e.isSelected = true;
        bid = e.id;
      } else {
        e.isSelected = false;
      }
    });
    setBillingStyleId(bid);
    if (item.name !== "Set") {
      setBillingType(item);
    }
    setBillingTypeData(d);
  };
  const onClickSetting = async (type) => {
    switch (type) {
      case "billingType":
        setisBillingType(true);
        break;
      case "saleBilType":
        setISSaleBilType(true);

        break;
      case "terminalSetup":
        setTerminalSetup(true);
        break;
      case "pairPrinter":
        PrinterNativeModule.initData();

        break;
      default:
        break;
    }
  };

  const getLastInvoiceNumber = async () => {
    let number = "";
    await getData(TerminalConfigurationTable, (cb) => {
      // console.log('TerminalConfigurationTable', cb[0]?.LastBillNumber);

      let preZero = "0000000";
      let silceNumber =
        Number(cb[0]?.LastBillNumber) >= 100000
          ? preZero.length - 5
          : Number(cb[0]?.LastBillNumber) >= 10000
          ? preZero.length - 4
          : Number(cb[0]?.LastBillNumber) >= 1000
          ? preZero.length - 3
          : Number(cb[0]?.LastBillNumber) >= 100
          ? preZero.length - 2
          : Number(cb[0]?.LastBillNumber) >= 10
          ? preZero.length - 1
          : preZero.length;

      let invoiceNumber =
        Number(cb[0]?.LastBillNumber) >= 999999
          ? cb[0].BillPrefix + "-" + Number(cb[0].LastBillNumber)
          : cb[0].BillPrefix +
            "-" +
            preZero.slice(1 - silceNumber) +
            Number(cb[0].LastBillNumber);
      number = invoiceNumber;
    });
    return number;
  };

  const getStorageItem = async () => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    if (tableData) {
      let result = JSON.parse(tableData);
      console.log("tabledata=========>", result);
      setStorageItems(result);
    } else {
      setStorageItems(null);
    }
  };
  const changeTableStatus = async (TableCodeID) => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    try {
      const response = await props.dispatch(
        ServerCall(
          token,
          `Table/ChangeTableStatus?tableCode=${TableCodeID}
             &IsAvailable=1`,
          "GET"
        )
      );
      console.log("onFreeTable", response);

      if (response) {
        let table = await AsyncStorage.getItem("SELECTED_TABLE");
        if (table) {
          await AsyncStorage.removeItem("SELECTED_TABLE");
        }
        setStorageItems(null);
        // setLoading(false);
      }
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }
  };

  const getDrawerSetting = () => {
    getData(DrawerSetupTable, (cb) => {
      setDrawerSetupArr(cb[0]);
    });
  };
  const onPressItem = async (type) => {
    let num = await getLastInvoiceNumber();
    switch (type) {
      case "new":
        if (drawerSetupArr?.isInitialCashSet === "false") {
          viewref.current?.slideInRight(280);
          setIsDrawar(!isDrawar);
        } else {
          props.navigation.navigate("home", { id: undefined });
        }
        break;
      case "postBills":
        postBills();
        break;
      case "return":
        setAlertType("returnInvoice");
        setMessage(props.StringsList._63);
        setAlertValue(num);
        setDisplayAlert(true);
        setisPromptAlert(true);
        setPrintType(null);
        break;
      case "drawer":
        if (!isPopup) {
          viewref.current?.slideInRight(280);
          setPopup(!isPopup);
        } else {
          viewref.current?.fadeOutRight().then(() => setPopup(!isPopup));
          getDrawerSetting();
        }
        break;
      case "pendingOrders":
        props.navigation.navigate("PendingOrders");
        setPrintType(null);
        break;
      case "reprint":
        setPrintType("reprint");
        setMessage(props.StringsList._63);
        setAlertValue(num);
        setAlertType("reprint");
        setDisplayAlert(true);
        setisPromptAlert(true);

        break;
    }
  };

  const postBills = async () => {
    setLoading(true);

    let newBillList = [];
    await getData(SaleBillsTable, async (cb) => {
      for (let i = 0; i < cb.length; i++) {
        cb[i].OrderType = Number(cb[i].OrderType);
        if (
          (cb[i].isUploaded == "false" || !cb[i].isUploaded) &&
          (cb[i].isProcessed == "false" || !cb[i].isProcessed)
        ) {
          await getDataById(
            SaleBillDetailsTable,
            "salesInvoiceID",
            cb[i].salesInvoiceID,
            (billProducts) => {
              billProducts.forEach((element) => {
                element.IsTax1IncludedInPrice =
                  element.IsTax1IncludedInPrice === 0 ? false : true;
                element.IsTax2IncludedInPrice =
                  element.IsTax2IncludedInPrice === 0 ? false : true;
                element.IsParentAddOn =
                  element.IsParentAddOn === 0 ||
                  element.IsParentAddOn === "false"
                    ? false
                    : true;
                element.DeliveryStatus = false;
              });
              (cb[i].isProcessed = false), (cb[i].isUploaded = true);
              cb[i].BillDetails = billProducts;
              (cb[i].isGlobalTax1IncludedInPrice =
                cb[i].isGlobalTax1IncludedInPrice === "false" ? false : true),
                (cb[i].isGlobalTax2IncludedInPrice =
                  cb[i].isGlobalTax2IncludedInPrice === "false" ? false : true),
                (cb[i].isLoyaltyInvoice =
                  cb[i].isLoyaltyInvoice === "false" ? false : true);

              newBillList.push(cb[i]);
            }
          );
        }
      }
      console.log("New Bill list ...", newBillList);
      if (newBillList.length > 0) {
        let UserLogin = await AsyncStorage.getItem("ACCESS_TOKEN");

        const response1 = await props.dispatch(
          ServerCall(UserLogin, "SalesBill/CreateSalesBill", newBillList)
        );

        console.log("bill posting response", response1);
        if (response1 === "success") {
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: "Permissions for read access",
                message: "Give permission to your storage to read a file",
                buttonPositive: "ok",
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              const OsVer = Platform.constants["Release"];
              console.log("android version", OsVer);

              let path = "/storage/emulated/0/Documents/Bnody POS/Invoices.txt";
              const isDeleted = await ScopedStorage.deleteFile(path).then(
                () => {
                  Toast.show("Invoice File Deleted after posting", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                  });
                }
              );
              if (isDeleted) {
                await AsyncStorage.removeItem("FILE_URI");
              }
            }
            // else {
            //   let path = "/storage/emulated/0/Documents/Bnody POS/Invoices.txt";
            //   await ScopedStorage.deleteFile(path).then(() => {
            //     Toast.show("Invoice File Deleted after posting", {
            //       duration: Toast.durations.LONG,
            //       position: Toast.positions.BOTTOM,
            //       shadow: true,
            //       animation: true,
            //       hideOnPress: true,
            //       delay: 0,
            //     });
            //   });
            // }
          } catch (err) {
            console.warn(err);
            return;
          }
        } else if (response1 === "False") {
          let msg = errorMessages.GetCounterMessage(
            "PostSettingTaxorDiscounttoRemove",
            props.StringsList
          );
          setMessage(props.StringsList._298);

          setDisplayAlert(true);
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: "Permissions for read access",
                message: "Give permission to your storage to read a file",
                buttonPositive: "ok",
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              let path = "/storage/emulated/0/Documents/Bnody POS/Invoices.txt";
              const isDeleted = await ScopedStorage.deleteFile(path).then(
                () => {
                  Toast.show("Invoice File Deleted after posting", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                  });
                }
              );
              if (isDeleted) {
                await AsyncStorage.removeItem("FILE_URI");
              }
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        } else {
          setMessage(props.StringsList._228);

          setDisplayAlert(true);
        }
      }
      setLoading(false);
    });
  };

  const updatePostedIvoice = (array) => {
    for (let i = 0; i < array.length; i++) {
      let columnName = ["isUploaded", "isProcessed"];
      let columnValue = [true, false];
      updateColunm(
        SaleBillsTable,
        columnName,
        "salesInvoiceID",
        array[i].salesInvoiceID,
        columnValue
      );
    }
  };
  const goToLogin = async () => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    let table = JSON.parse(tableData);
    if (table) {
      changeTableStatus(table?.TableCodeID);
    }
    if (drawerSetupArr.isInitialCashSet === "true") {
      // setisLogout(true);
    }
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    let loginUserInfo = await AsyncStorage.getItem("LOGIN_USER_INFO");
    loginUserInfo = JSON.parse(loginUserInfo);
    setTimeout(async () => {
      const response = await props.dispatch(
        ServerCall(token, "AuthorizeUser/SignOut", "POST", loginUserInfo)
      );
      setisLogout(false);
      ResetDrawerSetup();
      props.navigation.replace("Auth");
      await AsyncStorage.removeItem("ACCESS_TOKEN");
      setLoading(false);
    }, 1000);
  };

  const reacallFunc = async (type, num) => {
    if (type === "holdInvoice") {
      holdInvoiceFun();
    } else if (type === "returnInvoice" || type === "reprint") {
      list.isRefundReturnedCall = true;
      props.navigation?.navigate("home", { type: type, id: num });
    } else if (type === "ingredient") {
      addIngredientFun();
    } else if (type === "rebootTerminal") {
      goToLogin("terminal");
    } else if (type === "billingType") {
      let d = [...billingTypeData];

      d.forEach(async (e) => {
        if (e.isSelected) {
          await AsyncStorage.setItem("BILLING_STYLE", JSON.stringify(e));
        }
      });
      setisBillingType(false);
    } else if (type === "saleBilType") {
      let d = [...saleBilData];

      d.forEach(async (e) => {
        if (e.isSelected) {
          await AsyncStorage.setItem("SaleBIL_STYLE", JSON.stringify(e));
        }
      });
      setISSaleBilType(false);
    }
  };

  const onClickLogoutFunction = () => {
    Alert.alert("Bnody Restaurant", props.StringsList._443, [
      {
        text: "yes",
        onPress: async () => {
          // if (drawerSetupArr.isInitialCashSet === 'true') {
          //   setisLogout(true);
          // }
          setTimeout(() => {
            ResetDrawerSetup();
            goToLogin();
            setisLogout(false);
          }, 1000);
        },
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);
  };
  const rebootTerminalFunction = async (type) => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    let table = JSON.parse(tableData);
    console.log("table", table?.TableCodeID);
    if (isBillNeedPost) {
      console.log(isBillNeedPost);
      let msg = errorMessages.GetCounterMessage(
        "PendingInvoices",
        props.StringsList
      );
      setMessage(msg);
      setDisplayAlert(true);
    } else {
      setLoading(true);

      setIsRequriedLogin(true);

      if (table) {
        changeTableStatus(table?.TableCodeID);
      }

      let accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      console.log("accessToken", accessToken);
      let res = await DBTable.AddDataInDb(props, "rebootTerminal", accessToken);

      await AsyncStorage.removeItem("SELECTED_AGNETS");

      setLoading(false);
      if (!res) {
        let msg = errorMessages.GetCounterMessage(
          "OfflineCounterNotAuthorizedMessage",
          props.StringsList
        );
        setMessage(msg);
        setDisplayAlert(true);
        setAlertType("rebootTerminal");
      }
    }
  };
  const onChangeText = (type, text, item) => {
    if (type === "holdInvoice") {
      setHoldInvoiceName(text);
      setAlertValue(text);
    } else if (type === "returnInvoice" || type === "reprint") {
      setAlertValue(text);
    } else if (type === "searchText") {
      setSearchText(text);
    } else if (type === "ingredient") {
      setIngredientText(text);
      setAlertValue(text);
    } else {
      try {
        if (Number(text) > 0) {
          setmanuallyCount(Number(text));
        } else {
          setmanuallyCount(0);
        }
      } catch (error) {
        console.log("onChangeText Error", error);
      }
    }
  };
  return (
    <Design
      navigation={props.navigation}
      onPressItem={onPressItem}
      isPopup={isPopup}
      viewref={viewref}
      TerminalConfiguration={TerminalConfiguration}
      StringsList={props.StringsList}
      isTerminalSetup={isTerminalSetup}
      setTerminalSetup={setTerminalSetup}
      isPairPrinterFamily={isPairPrinterFamily}
      setPairPrinterFamily={setPairPrinterFamily}
      isLoading={isLoading}
      onClickSetting={onClickSetting}
      displayAlert={displayAlert}
      setDisplayAlert={setDisplayAlert}
      message={message}
      isBillNeedPost={isBillNeedPost}
      drawerSetupArr={drawerSetupArr}
      setMessage={setMessage}
      isRequriedLogin={isRequriedLogin}
      goToLogin={goToLogin}
      // isSaleAgents={isSaleAgents}
      // salesAgentsList={salesAgentsList}
      // setIsSaleAgents={setIsSaleAgents}
      // selectedSaleAgentsFun={selectedSaleAgentsFun}
      selectedAgent={selectedAgent}
      userConfiguration={userConfiguration}
      onClickLogoutFunction={onClickLogoutFunction}
      isLogout={isLogout}
      rebootTerminalFunction={rebootTerminalFunction}
      isDrawar={isDrawar}
      setIsDrawar={setIsDrawar}
      alertType={alertType}
      setisPromptAlert={setisPromptAlert}
      isPromptAlert={isPromptAlert}
      printType={printType}
      setPrintType={setPrintType}
      alertValue={alertValue}
      reacallFunc={reacallFunc}
      drawerRef={drawerRef}
      getDrawerSetting={getDrawerSetting}
      PrinterFunc={PrinterFunc}
      isBillingType={isBillingType}
      setisBillingType={setisBillingType}
      billingTypeData={billingTypeData}
      setBillingTypeData={setBillingTypeData}
      saleBilType={saleBilType}
      setSaleBilType={setSaleBilType}
      isSaleBilType={isSaleBilType}
      setISSaleBilType={setISSaleBilType}
      saleBilData={saleBilData}
      setSaleBilData={setSaleBilData}
      selectSaleBilType={selectSaleBilType}
      selectBillingType={selectBillingType}
      billingStyleId={billingStyleId}
      billingType={billingType}
      onChangeText={onChangeText}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
