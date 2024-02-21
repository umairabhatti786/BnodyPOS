import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import * as ScopedStorage from "react-native-scoped-storage";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import uuid from "react-native-uuid";
import { captureRef } from "react-native-view-shot";
import { connect } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import RNFS from "react-native-fs";
import { Invoice } from "@axenda/zatca";
import ResetDrawerSetup from "../../constant/ResetDrawerSetup";
// import {
//   BluetoothEscposPrinter,
//   BluetoothManager
// } from 'react-native-bluetooth-escpos-printer'
import {
  Alert,
  PermissionsAndroid,
  NativeEventEmitter,
  NativeAppEventEmitter,
  I18nManager,
  Platform,
  NativeModules,
  Vibration,
  Keyboard,
  View,
  Text,
  SafeAreaView,
  BackHandler,
  PixelRatio,
  Image,
} from "react-native";

// import EscPosPrinter, {
//   getPrinterSeriesByName,
//   IPrinter,
// } from 'react-native-esc-pos-printer';
// import Encoder from 'esc-pos-encoder';
import Toast from "react-native-root-toast";
import { ServerCall } from "../../redux/actions/asynchronousAction";
import {
  DeleteColumnById,
  getData,
  getDataById,
  getDataByMultipaleID,
  getDataJoinById,
  updateColunm,
} from "../../sqliteHelper";
import { CategoriesListTable } from "../../sqliteTables/CategoriesList";
import { DrawerSetupTable } from "../../sqliteTables/DrawerSetup";
import {
  HoldInvoiceTable,
  InsertHoldInvoice,
} from "../../sqliteTables/HoldInvoice";
import { ProductCardAddOnGroupListTable } from "../../sqliteTables/ProductCardAddOnGroupList";

import { SalesFamilySummaryListTable } from "../../sqliteTables/SalesFamilySummaryList";
import { ProductListTable } from "../../sqliteTables/ProductList";
import {
  InsertSaleBillDetails,
  SaleBillDetailsTable,
} from "../../sqliteTables/SaleBillDetails";
import { InsertSaleBills, SaleBillsTable } from "../../sqliteTables/SaleBills";
import { SalesAgentsTable } from "../../sqliteTables/SalesAgents";
import { TaxRateParentListTable } from "../../sqliteTables/TaxRateParentList";
import { TerminalConfigurationTable } from "../../sqliteTables/TerminalConfiguration";
import { TerminalSetupTable } from "../../sqliteTables/TerminalSetup";
import { UpdateProductDetailListTable } from "../../sqliteTables/UpdateProductDetailList";
import Design from "./design";

import calculateTaxeGroups from "../../helpers/TaxCalculationHelper";
import { LoyaltyRewardsListTable } from "../../sqliteTables/LoyaltyRewardsList";
import { LoyaltyListTable } from "../../sqliteTables/LoyaltyList";
import { LoyaltyDetailListTable } from "../../sqliteTables/LoyaltyDetailList";
import errorMessages from "../../constant/errorMessages";
import { SalesPostingConfigurationListTable } from "../../sqliteTables/SalesPostingConfigurationList";
import DBTable from "../../constant/UpdateDB";
import { ProductCardAddOnEquivalentProductsListTable } from "../../sqliteTables/ProductCardAddOnEquivalentProductsList";
import {
  InsertProductCardIngredientsList,
  ProductCardIngredientsListTable,
} from "../../sqliteTables/ProductCardIngredientsList";
import sizeHelper from "../../helpers/sizeHelper";
import { UserConfigurationTable } from "../../sqliteTables/UserConfiguration";
import styles from "./style";
import { A4PrintStylesTable } from "../../sqliteTables/A4PrintStyles";
import { AreaListTable } from "../../sqliteTables/AreasList";
import { OrderTackerList } from "../../sqliteTables/OrderTackers";
import { object } from "yup";
import { RestTablesTable } from "../../sqliteTables/RestTables";
import AppColor from "../../constant/AppColor";
var Sound = require("react-native-sound");
import { list } from "../../constant/global";
import RNPrint from "react-native-print";
import NetInfo from "@react-native-community/netinfo";
const { PrinterNativeModule } = NativeModules;
const numberToWord = require("number-to-words");
const numberToArb = require("tafgeetjs");
const HomeScreen = (props) => {
  const PermissionFile = NativeModules.PermissionFile;
  const [options, setOptions] = useState([
    { label: props.StringsList._373, value: "holdInvoice" },
    { label: props.StringsList._436, value: "scanner" },
    { label: props.StringsList._30, value: "buyer" },
    { label: props.StringsList._437, value: "loyaltyCard" },
  ]);
  const [payments, setPayments] = useState([
    { label: props.StringsList._314, value: 1 },
    { label: props.StringsList._55, value: 2 },
    { label: props.StringsList._325, value: 3 },
  ]);
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [paymentsValue, setPaymentsValue] = useState(null);
  const [refundPayments, setRefundPayments] = useState([
    { label: props.StringsList._314, value: "1" },
    { label: "on Account", value: "2" },
  ]);
  const [refundPaymentsOpen, setRefundPaymentsOpen] = useState(false);
  const [refundPaymentsValue, setRefundPaymentsValue] = useState(null);
  const [orderUpdate, setOrderUpdate] = useState([
    { label: props.StringsList._522, value: 1 },
    { label: props.StringsList._523, value: 2 },
  ]);
  const [printType, setPrintType] = useState(null);
  const [orderPickerOpen, setOrderPickerOpen] = useState(false);
  const [orderValue, setOrderValue] = useState(0);
  const [isLogout, setisLogout] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);
  const [isInnerPrinter, setInnerPrinter] = useState(false);
  const [isToggle, setToggle] = useState(false);
  const [allCategoreis, setAllCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subPrice, setsubPrice] = useState(0);
  const [focus, setfocus] = useState(0);
  const [isFocusSearch, setFocusSearch] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const [AgentList, setAgentList] = useState([]);
  const [TerminalConfiguration, setTerminalConfiguration] = useState({});
  const [optionsValue, seOptionsValue] = useState(null);
  const [uriImage, setUriImage] = useState(null);
  const [isInvoice, setInvoice] = useState(false);
  const [shortInvoice, setShortInvoice] = useState(false);
  const [isTerminalSetup, setTerminalSetup] = useState(false);
  const [isPairPrinterFamily, setPairPrinterFamily] = useState(false);
  const [manuallyCount, setmanuallyCount] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [returnInvoiceNumber, setReturnInvoiceNumber] = useState(null);
  const [salesBillID, setSalesBillID] = useState(null);
  const [creditAmount, setCreditAmount] = useState(0);
  const [advancePaidInCash, setAdvancePaidInCash] = useState(0);
  const [globalDiscountAmount, setglobalDiscountAmount] = useState(0);
  const [globalDiscountRate, setGlobalDiscountRate] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isPromptAlert, setisPromptAlert] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [isHoldInvoices, setisHoldInvoices] = useState(false);
  const [message, setMessage] = useState("");
  const [beepSound, setBeepSound] = useState(null);
  const [terminalSetup, setTerminalSetupObj] = useState(null);
  const [drawerSetupArr, setDrawerSetupArr] = useState({});
  const [holdInvoiceName, setHoldInvoiceName] = useState("");
  const [isScanner, setScanner] = useState(false);
  const [alertValue, setAlertValue] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [retunProducts, setReturnProducts] = useState([]);
  const [isReturnInvoice, setisReturnInvoice] = useState(false);
  const [isAddon, setisAddon] = useState(false);
  const [isStateUpdate, setStateUpdate] = useState(false);
  const [globalTaxList, setGlobalTaxList] = useState([]);
  const [isGlobalTax, setIsGlobalTax] = useState(false);
  const [globalTax, setGlobalTax] = useState(0);
  const [isBuyer, setisBuyer] = useState(false);
  const [loyaltyList, setLoyaltyList] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [isLoyaltyCard, setIsLoyaltyCard] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [checkLoyalityReward, setCheckLoyalityReward] = useState(false);
  const [loyaltyDetailList, setLoyaltyDetailList] = useState([]);
  const [loyaltyRewardsList, setLoyaltyRewardsList] = useState([]);
  const [saleBillObj, setSaleBillObj] = useState({});
  const [globalTaxObj, setGlobalTaxObj] = useState({});
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [status, setStatus] = useState(0);
  const [rewardType, setRewardType] = useState(0);
  const [selectedGlobalTaxObj, setSelectedGlobalTaxObj] = useState(null);
  const [selectedPyamentMethod, setSelectedPyamentMethod] = useState(null);
  const [printerStatus, setPrinterStatus] = useState(false);
  const [noFamilyFound, setNoFamilyFound] = useState(false);
  const [returnBill, setReturnBill] = useState([]);
  const [EarnPointPArry, setEarnPointPArry] = useState([]);
  const [EarnPointCArry, setEarnPointCArry] = useState([]);
  const [EarnPointIArry, setEarnPointIArry] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [totalTaxOfInvoice, setTotalTaxOfInvoice] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isDrawar, setIsDrawar] = useState(false);
  const [isIngredient, setIsIngredient] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [sumOfProductTax, setSumOfProductsTax] = useState(0);
  const [sumOfProductDiscount, setSumOfProductsDiscount] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [searchIngredient, setSearchIngredient] = useState("");
  const [ingredientProductCode, setIngredientProductCode] = useState("");
  const [ingredientText, setIngredientText] = useState("");
  const [isIngredientSearch, setIsIngredientSearch] = useState(false);
  const [printerMacAddress, setPrinterMacAddress] = useState(null);
  const [printerName, setPrinterName] = useState(null);
  const [userConfiguration, setUserConfiguration] = useState({});
  const [userDiscountLimit, setUserDiscountLimit] = useState(0);
  const [selectedcat, setSelectedcat] = useState({});
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [lastBillNumber, setLastBillNumber] = useState(null);
  const [lastOrderNumber, setLastOrderNumber] = useState(null);
  const [addProductLoader, setAddProductLoader] = useState(false);
  const [companyVATRegistor, setCompanyVATRegistor] = useState(false);
  const [barCode, setBarCode] = useState(true);
  const [barCodeText, setbarCodeText] = useState("");
  const [billFormatType, setBillFormatType] = useState(1);
  const [displayModal, setDisplayModal] = useState(false);
  const viewref = useRef(null);
  const viewShotRef = useRef(null);
  const flatListRef = useRef(null);
  const buyerViewRef = useRef(null);
  const loyaltyCardViewRef = useRef(null);
  const qrRef = useRef(null);
  const drawerRef = useRef(null);
  const qrRef2 = useRef(null);
  const ref_searchBar = useRef(null);
  const [isdisabled, setisDisabled] = useState(false);
  const [guestItem, setGuestItem] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState("");
  const [areaItem, setAreaItem] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [tableItem, setTableItem] = useState([]);
  const [masterTableItems, setMasterTableItems] = useState([]);
  const [areas, setAreas] = useState([]);
  const [optionType, setOptionType] = useState("productSearch");
  const [notesModal, setNotesModal] = useState(false);
  const [notesDetail, setNotesDetail] = useState();
  const [storageItems, setStorageItems] = useState(null);
  const [enableTBut, setEnableTbut] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [orderItems, setOrderItems] = useState([
    { id: 0, value: "Select Type" },
    { id: 1, value: props.StringsList._329 },
    { id: 2, value: props.StringsList._328 },
    { id: 3, value: props.StringsList._26 },
  ]);
  const [orderType, setOrderType] = useState({ id: 0, value: "Select Type" });
  const [orderTaker, setOrderTaker] = useState([]);
  const [orderTakerType, setOrderTakerType] = useState({
    DiscountLimit: 0,
    Phone: "",
    Email: "",
    OrderTakerName: I18nManager?.isRTL ? "يختار" : "Select",
    SalesAgentCode: 0,
  });
  const [disable, setDisable] = useState(false);
  const [isRequriedLogin, setIsRequriedLogin] = useState(false);
  const [isBillNeedPost, setBillNeedPost] = useState(false);
  const [orderCode, setOrderCode] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [placeholder, setPlaceHolder] = useState("Please Select Option");
  const [billingStyleId, setBillingStyleId] = useState(2);
  const [billingType, setBillingType] = useState();
  const [isBillingType, setisBillingType] = useState(false);
  const [billingTypeData, setBillingTypeData] = useState([
    { id: 1, name: "A4 Billing", name2: "A4 الفواتير", isSelected: false },
    { id: 2, name: "Thermal 2", name2: "الحرارية 2", isSelected: false },
    { id: 3, name: "Thermal 1", name2: "الحرارية 1", isSelected: false },
  ]);
  const [invoiceDates, setInvoiceDate] = useState(null);
  const [saleBilType, setSaleBilType] = useState();
  const [isSaleBilType, setISSaleBilType] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [placedwithPay, setPlaceWithPay] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [payemntAdded, setPaymentAdded] = useState(false);
  const [productIndex, setProductIndex] = useState(null);
  const [paymentView, setPaymentView] = useState(false);
  const [railStart, setRailStart] = useState(false);
  const [selectedProductNotes, setSelectedProductsNotes] = useState();
  const [selectedOrderType, setSelectedOrderType] = useState(0);
  const [customerNotes, setCustomerNotes] = useState("");
  const [customerNotesOpen, setCustomerNotesOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [refORderNumber, setRefOrderNumber] = useState(null);
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

  // const [connectionStatus, setConnectionStatus] = useState(false);
  // const [connectionType, setConnectionType] = useState(null);
  // const handleNetworkChange = state => {
  //   setConnectionStatus(state.isConnected);
  //   setConnectionType(state?.type);
  // };
  // useEffect(() => {
  //   const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);
  //   return () => {
  //     alert(`ConnectionStatus ${connectionStatus}`);
  //     netInfoSubscription && netInfoSubscription();
  //   };
  // }, []);
  const getNetInfo = async () => {
    let networkState = false;
    await NetInfo.fetch().then((state) => {
      networkState = state.isConnected;
    });
    return networkState;
  };
  let productGroupList = [];
  let mins = 15 * 60 * 1000;
  useEffect(() => {
    setInterval(async () => {
      let status = await getNetInfo();
      if (status === true) {
        console.log("Connected calling", status);
        postBillsbyInterval();
      } else {
        console.log("Not connected", status);
      }
    }, mins);
  }, []);

  const postBillsbyInterval = async () => {
    let uri = await AsyncStorage.getItem("FILE_URI");
    console.log("Folder uri", uri);
    const path = "/storage/emulated/0/Documents/Bnody POS/Invoices.txt";
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
          ServerCall(
            UserLogin,
            "SalesBill/CreateSalesBill",
            "POST",
            newBillList
          )
        );
        console.log("bill posting response by interval", response1);
        if (response1 === "success") {
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          if (Platform.OS === "android") {
            const isDeleted = await ScopedStorage.deleteFile(path).then(() => {
              Toast.show("Invoice File Deleted after posting", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            });
            if (isDeleted) {
              await AsyncStorage.removeItem("FILE_URI");
            }
          } else {
            try {
              const folderName = "Bnody Restaurant";
              const fileName = "invoices.txt";

              const libraryDirectoryPath = RNFS.LibraryDirectoryPath;

              const folderPath = `${libraryDirectoryPath}/${folderName}`;
              const filePath = `${folderPath}/${fileName}`;

              const fileExists = await RNFS.exists(filePath);
              if (fileExists) {
                await RNFS.unlink(filePath);
                console.log("File deleted successfully:", filePath);
              }

              await RNFS.writeFile(filePath, "", "utf8");
              console.log("File created successfully:", filePath);
            } catch (error) {
              console.error("Error creating folder and file:", error);
            }
          }

          // let msg = errorMessages.GetCounterMessage(
          //   "PostSettingTaxorDiscounttoRemove",
          //   props.StringsList
          // );
          setMessage(props.StringsList._298);
          setDisplayAlert(true);
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);

          if (Platform.OS === "android") {
            const isDeleted = await ScopedStorage.deleteFile(path).then(() => {
              Toast.show("Invoice File Deleted after posting", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            });
            if (isDeleted) {
              await AsyncStorage.removeItem("FILE_URI");
            }
          } else {
            try {
              const folderName = "Bnody Restaurant";
              const fileName = "invoices.txt";

              const libraryDirectoryPath = RNFS.LibraryDirectoryPath;

              const folderPath = `${libraryDirectoryPath}/${folderName}`;
              const filePath = `${folderPath}/${fileName}`;

              const fileExists = await RNFS.exists(filePath);
              if (fileExists) {
                await RNFS.unlink(filePath);
                console.log("File deleted successfully:", filePath);
              }

              await RNFS.writeFile(filePath, "", "utf8");
              console.log("File created successfully:", filePath);
            } catch (error) {
              console.error("Error creating folder and file:", error);
            }
          }
        } else {
          setMessage(props.StringsList._228);
          setDisplayAlert(true);
        }
      }
    });
  };

  useEffect(async () => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    let table = JSON.parse(tableData);
    // console.log('connectionStatus', connectionStatus);
    if (table) {
      changeTableStatus(table?.TableCodeID);
    }
    setLoading(true);
    getStorageItem();
    let ConnectedBluetoothInfo = await AsyncStorage.getItem(
      "ConnectedBluetoothInfo"
    );
    if (ConnectedBluetoothInfo) {
      console.log("ConnectedBluetoothInfo", ConnectedBluetoothInfo);
      let printAdress = ConnectedBluetoothInfo?.split("|");
      setPrinterMacAddress(printAdress[1]);
      setPrinterName(printAdress[0]);
      if (printAdress[0] === "InnerPrinter") {
        setInnerPrinter(true);
      } else {
        setInnerPrinter(false);
      }
    }

    getLastOrderNumber();
    tableInfoData();
    getAllCategories();

    let agentArray = [],
      loyaltyArray = [],
      paymentArray = [];
    getData(LoyaltyListTable, (cb) => {
      cb.forEach((element) => {
        loyaltyArray.push({
          label: element?.LoyaltyName,
          value: element?.LoyaltyName,
          ...element,
        });
      });
    });
    setLoyaltyList(loyaltyArray);
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
    getData(SalesAgentsTable, (sa) => {
      sa.forEach((element) => {
        agentArray.push({
          label: element?.SalesAgentName,
          value: element?.UserCode,
          ...element,
        });
      });
    });

    await getData(A4PrintStylesTable, (A4) => {}),
      await getData(TerminalSetupTable, (cb) => {
        console.log("TerminalSetupTable", cb[0]);
        setTerminalSetupObj(cb[0]);
      });

    await getData(TerminalConfigurationTable, async (TC) => {
      setTerminalConfiguration(TC[0]);
      let isnum = /^\d+$/.test(TC[0].ValueAddedTaxNumber);

      let isZero = TC[0].ValueAddedTaxNumber === "000000000000000";

      if (TC[0].ValueAddedTaxNumber.length === 15 && isnum && !isZero)
        setCompanyVATRegistor(true);
    });

    let saleAgent = [];
    await getData(SalesAgentsTable, (cb) => {
      saleAgent = cb;
    });

    await getData(UserConfigurationTable, async (TC) => {
      setUserConfiguration(TC[0]);
      setUserDiscountLimit(TC[0]?.DiscountLimit);
      let sAgent = saleAgent.find(
        (x) => x.SalesAgentCode === TC[0].SalesAgentCode
      );
      if (sAgent) {
        setSelectedAgent(sAgent);
      } else {
        let obj = {
          SalesAgentCode: TC[0].SalesAgentCode,
          SalesAgentName: TC[0].SalesAgentName,
        };
        setSelectedAgent(obj);
      }

      if (TC[0].SalesRefundAllowed === 0) {
        setOptions([
          { label: props.StringsList._32, value: "getHoldInvoice" },
          { label: props.StringsList._30, value: "buyer" },
          { label: props.StringsList._437, value: "loyaltyCard" },
        ]);
      }
      await getData(SalesPostingConfigurationListTable, (cb) => {
        cb.forEach((element) => {
          if (element?.PaymentTypeName === "Credit") {
            if (TC[0]?.AllowCreditSale === "true") {
              paymentArray.push({
                label: I18nManager.isRTL
                  ? element?.PaymentTypeName2
                  : element?.PaymentTypeName,
                value: element?.PaymentType,
                ...element,
              });
            }
          } else {
            paymentArray.push({
              label: I18nManager.isRTL
                ? element?.PaymentTypeName2
                : element?.PaymentTypeName,
              value: element?.PaymentType,
              ...element,
            });
          }
        });
      });
    });
    setPayments(paymentArray);
    setAgentList(agentArray);

    let DefaultGTax = await AsyncStorage.getItem("DEFAULT_GTAX");
    console.log("DefaultGTax ===============>", DefaultGTax);
    await getData(TaxRateParentListTable, (cb) => {
      let t = cb.filter((t) => t.TaxLevel === 2);

      t.unshift({ TaxFamilyName: "None", TaxFamilyCode: "None" });
      if (Array.isArray(t) && t.length > 0) {
        let defaultT = t.find((t) => t.TaxFamilyCode === DefaultGTax);
        if (defaultT) {
          initialglobalTaxFun(defaultT, "", "");
        }
      }
      setGlobalTaxList(t);
    });

    soundLoading();
    getData(DrawerSetupTable, (cb) => {
      setDrawerSetupArr(cb[0]);
    });
  }, []);
  useEffect(() => {
    let id = props?.route?.params?.id;
    let type = props?.route?.params?.type;
    setPrintType(type);
    if (id !== undefined && orderCode === true && type !== "") {
      if (list.isRefundReturnedCall === true) {
        try {
          console.log("Refund research hit");
          setFocusSearch(false);
          setPrintType(null);
          getReturnInvoice(type, id);
          list.isRefundReturnedCall = false;
        } catch (error) {
          console.log(error);
        }
      }
    } else if (id === undefined && orderCode === true && type === "holdInvoice")
      if (list.isHoldedInvoiceOpened === true) {
        try {
          setTimeout(() => {
            setFocusSearch(false);
            setPrintType(null);
            setisHoldInvoices(true);
          }, 100);
        } catch (error) {
          console.log(error);
        }
      }
  });
  useEffect(() => {
    const unsubscri = props.navigation.addListener("focus", async () => {
      await getData(TerminalSetupTable, (cb) => {
        console.log("TerminalSetupTable", cb[0]);
        setTerminalSetupObj(cb[0]);
      });
      let bilT = await AsyncStorage.getItem("SaleBIL_STYLE");
      if (bilT) {
        let billTypeSe = await JSON.parse(bilT);
        console.log("bill type is =======>", billTypeSe);
        setBillingType(billTypeSe);
      } else {
        setBillingType({
          id: 3,
          name: "Tax Invoice",
          name2: "فاتورة ضريبية",
          isSelected: true,
        });
      }
      let BT = await AsyncStorage.getItem("BILLING_STYLE");
      BT = BT ? JSON.parse(BT) : 2;
      console.log(" BT is =======>", BT.id);
      setBillingStyleId(BT.id);
      // let tableData = await AsyncStorage.getItem('SELECTED_TABLE');
      if (list.billHasOrder === true) {
        setOrderCode(false);
      } else {
        setOrderCode(true);
      }
      // if (tableData && list?.products?.length > 0) {
      //   setToggle(true);
      // } else {
      //   setToggle(false);
      // }
      getStorageItem();
      getLastOrderNumber();
    });

    return () => {
      unsubscri;
    };
  }, [props.navigation]);

  useEffect(async () => {
    if (
      orderDetails &&
      productIndex < orderDetails?.ResOrderDetailList.length
    ) {
      let array = [];

      let parntProducts = orderDetails?.ResOrderDetailList.filter(
        (x) => x.IsParentAddOn === true
      );
      let addonnProducts = orderDetails?.ResOrderDetailList.filter(
        (x) => x.IsParentAddOn === false
      );
      for (let index = 0; index < parntProducts.length; index++) {
        const element = parntProducts[index];
        if (array.length === 0 && element.IsParentAddOn === true) {
          array.push(element);
          let Addonsofthis = addonnProducts.filter(
            (x) => x.AddOnParentOrderDetailCode === element.OrderDetailCode
          );
          if (Addonsofthis) {
            for (let x = 0; x < Addonsofthis.length; x++) {
              const y = Addonsofthis[x];
              array.push(y);
            }
          }
        } else {
          let itemAddons = addonnProducts.filter(
            (x) => x.AddOnParentOrderDetailCode === element.OrderDetailCode
          );
          if (itemAddons) {
            array.push(element);
            for (let x = 0; x < itemAddons.length; x++) {
              const y = itemAddons[x];
              array.push(y);
            }
          } else {
            array.push(element);
          }
        }
      }
      let i = productIndex;
      const element = array[i];
      let findProduct;
      if (element.IsParentAddOn) {
        await getData(UpdateProductDetailListTable, (productsDetail) => {
          findProduct = productsDetail.find(
            (e) => e.ProductBarCode === element.ProductBarCode
          );
          if (findProduct) {
            let finalPrice = element.Price.toFixed(
              TerminalConfiguration.DecimalsInAmount
            );
            findProduct.AddOnGroupCode = element.AddOnGroupCode;
            findProduct.AddOnGroupDetailCode = element.AddOnGroupDetailCode;
            findProduct.AddOnParentSalesInvoiceDetailsID =
              element.AddOnParentOrderDetailCode;
            findProduct.AddOnParentOrderDetailCode =
              element.AddOnParentOrderDetailCode;
            findProduct.ParentInvoiceDetailsID =
              element.AddOnParentOrderDetailCode;
            findProduct.DiscountAmount = element.DiscountAmount;
            findProduct.DiscountRate = element.DiscountRate;
            findProduct.Ingredients = element.Ingredients;
            findProduct.IsParentAddOn = element.IsParentAddOn;
            findProduct.OrderCode = element.OrderCode;
            findProduct.OrderDetailCode = element.OrderDetailCode;
            findProduct.Price = Number(element.Price);
            findProduct.ProductBarCode = element.ProductBarCode;
            findProduct.ProductCode = element.ProductCode;
            findProduct.ProductNote = element.ProductNote;
            findProduct.ProductName = element.ProductName;
            findProduct.ProductType = element.ProductType;
            findProduct.Quantity = element.Quantity;
            findProduct.SerialNumber = element.SerialNumber;
            findProduct.UnitCode = element.UnitCode;
            findProduct.UnitFragment = element.UnitFragment;
            findProduct.UnitType = element.UnitType;
            findProduct.UOMName = element.UOMName;
            findProduct.PriceOriginal = Number(element.Price);
            findProduct.SalesInvoiceDetailsID = element.OrderDetailCode;
            findProduct.OrignalQuantity = element.Quantity;
            findProduct.ProductNote = element.ProductNote;
          }
          if (findProduct && findProduct.IsParentAddOn === true) {
            onSelectUpdatedProduct(findProduct, [], "increment");
          }
        });
      } else if (!element.IsParentAddOn) {
        const element = array[i];
        await getDataJoinById(
          ProductCardAddOnGroupListTable,
          UpdateProductDetailListTable,
          "AddOnGroupCode",
          element.AddOnGroupCode,
          async (addonProducts) => {
            let findAddonProduct = addonProducts.find(
              (e) => e.ProductBarCode === element.ProductBarCode
            );
            console.log("fetch AddonProduct...", findAddonProduct);
            if (findAddonProduct) {
              let finalPrice = element.Price.toFixed(
                TerminalConfiguration.DecimalsInAmount
              );

              findAddonProduct.AddOnGroupCode = element.AddOnGroupCode;
              findAddonProduct.AddOnGroupDetailCode =
                element.AddOnGroupDetailCode;
              findAddonProduct.AddOnParentSalesInvoiceDetailsID =
                element.AddOnParentOrderDetailCode;
              findAddonProduct.AddOnParentOrderDetailCode =
                element.AddOnParentOrderDetailCode;
              findAddonProduct.ParentInvoiceDetailsID =
                element.AddOnParentOrderDetailCode;
              findAddonProduct.DiscountAmount = element.DiscountAmount;
              findAddonProduct.DiscountRate = element.DiscountRate;
              findAddonProduct.Ingredients = element.Ingredients;
              findAddonProduct.IsParentAddOn = element.IsParentAddOn;
              findAddonProduct.OrderCode = element.OrderCode;
              findAddonProduct.OrderDetailCode = element.OrderDetailCode;
              findAddonProduct.Price = Number(element.Price);
              findAddonProduct.ProductBarCode = element.ProductBarCode;
              findAddonProduct.ProductCode = element.ProductCode;
              findAddonProduct.ProductNote = element.ProductNote;
              findAddonProduct.ProductName = element.ProductName;
              findAddonProduct.ProductType = element.ProductType;
              findAddonProduct.Quantity = element.Quantity;
              findAddonProduct.SerialNumber = element.SerialNumber;
              findAddonProduct.UnitCode = element.UnitCode;
              findAddonProduct.UnitFragment = element.UnitFragment;
              findAddonProduct.UnitType = element.UnitType;
              findAddonProduct.UOMName = element.UOMName;
              findAddonProduct.PriceOriginal = Number(element.Price);
              findAddonProduct.SalesInvoiceDetailsID = element.OrderDetailCode;
              findAddonProduct.OrignalQuantity = findAddonProduct.Quantity;
              findAddonProduct.GrandAmount = 0;
            }
            let parentItem = parntProducts.find(
              (parentProduct) =>
                parentProduct.OrderDetailCode ===
                findAddonProduct.AddOnParentOrderDetailCode
            );
            findAddonProduct.OrignalQuantity =
              element.Quantity / parentItem.Quantity;
            findAddonProduct.parentQuantity = parentItem.Quantity;
            findAddonProduct.parentIndex = productIndex;

            onSelectUpdatedProduct(findAddonProduct, [], "returnInvoice");
          }
        );
      }
    } else {
      // This Metthod is use to re-arrange all the items with their addOns

      // Find out the Parent Product
      let parntProducts = selectedProducts.filter(
        (x) => x.IsParentAddOn === true
      );
      let productsArray = []; // Final array
      // Find out the addOns Product
      let addonnProducts = selectedProducts.filter(
        (x) => x.IsParentAddOn === false
      );
      for (let index = 0; index < parntProducts.length; index++) {
        const element = parntProducts[index];
        if (productsArray.length === 0 && element.IsParentAddOn === true) {
          productsArray.push(element);
          let Addonsofthis = addonnProducts.filter(
            (x) => x.AddOnParentOrderDetailCode === element.OrderDetailCode
          );
          if (Addonsofthis) {
            for (let x = 0; x < Addonsofthis.length; x++) {
              const y = Addonsofthis[x];
              productsArray.push(y);
            }
          }
        } else {
          let itemAddons = addonnProducts.filter(
            (x) => x.AddOnParentOrderDetailCode === element.OrderDetailCode
          );
          if (itemAddons) {
            productsArray.push(element);
            for (let x = 0; x < itemAddons.length; x++) {
              const y = itemAddons[x];
              productsArray.push(y);
            }
          } else {
            productsArray.push(element);
          }
        }
      }
      setSelectedProducts(productsArray);
      setLoading(false);
    }
  }, [productIndex]);

  useEffect(() => {
    let orderId = props?.route?.params?.id;
    let type = props?.route?.params?.type;
    if (orderId !== undefined && orderCode === true && type === undefined) {
      getOrderDetails(orderId);
    }
  });

  useEffect(() => {
    orderStatus();
  }, [orderValue]);
  const orderStatus = () => {
    if (orderValue === 1 && orderCode === false) {
      updateState();
      onNewInvoice();
    } else if (orderValue === 2 && orderCode === false) {
      setShowButton(true);
      setRefOrderNumber(null);
    }
  };
  const onSaveNotes = (item) => {
    let notesArray = [...selectedProducts];
    let newArray = notesArray.map((p) => {
      var temp = Object.assign({}, p);
      if (temp.ProductBarCode === item.ProductBarCode) {
        temp.notes = notesDetail;
      }
      return temp;
    });
    setSelectedProducts(newArray);
    setNotesModal(false);
  };

  const getOrderBySearch = () => {
    if (selectedProducts.length > 0 && orderCode === true) {
      Alert.alert(props.StringsList._537, props.StringsList._475, [
        { text: "OK", onPress: () => getOrder() },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Presed");
          },
          style: "cancel",
        },
      ]);
    } else if (
      selectedProducts.length > 0 &&
      orderCode === false &&
      showButton === true
    ) {
      Alert.alert(props.StringsList._537, props.StringsList._475, [
        { text: "OK", onPress: () => getOrder() },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Presed");
          },
          style: "cancel",
        },
      ]);
    } else {
      console.log("Searching order... ");
      getOrder();
    }
  };
  const getOrder = async () => {
    if (isFocusSearch === true) {
      setIsSearch(false);
      setRefOrderNumber(searchText);
      // console.log("setOrder number is ===> : " + searchText);
      let token = await AsyncStorage.getItem("ACCESS_TOKEN");
      list.billHasOrder = true;
      setLoading(true);
      let caltureCode = I18nManager.isRTL ? "ar-SA" : "en-US";
      try {
        const response = await props.dispatch(
          ServerCall(
            token,
            `Order/FetchOrder?orderCode=${searchText}&CultureCode=${caltureCode}`,
            "GET"
          )
        );
        console.log("order Details responce=====>", response);

        if (response?.message === "Unauthorized") {
          Alert.alert(props.StringsList._537, props.StringsList._276, [
            { text: "OK", onPress: () => onClickPowerOff() },
          ]);
          setIsSearch(false);
          setLoading(false);
        } else if (!response?.ResOrderDetailList) {
          Alert.alert(props.StringsList._537, props.StringsList._474, [
            {
              text: "OK",
              onPress: () => {
                setIsSearch(false);
                setToggle(false);
                setOrderCode(true);
                restState();
                setLoading(false);
              },
            },
          ]);
        } else if (response?.IsPaid) {
          Alert.alert(
            props.StringsList._537,
            response?.OrderCode + " : " + props.StringsList._505,
            [
              {
                text: "OK",
                onPress: () => {
                  setIsSearch(false);
                  setToggle(false);
                  setOrderCode(true);
                  restState();
                  setLoading(false);
                },
              },
            ]
          );
        } else if (
          response?.Status === 4 &&
          response.StatusName === "Cancelled"
        ) {
          Alert.alert(
            props.StringsList._537,
            response?.OrderCode + " : " + props.StringsList._2,
            [
              {
                text: "OK",
                onPress: () => {
                  setIsSearch(false);
                  setToggle(false);
                  setOrderCode(true);
                  restState();
                  setLoading(false);
                },
              },
            ]
          );
        } else {
          createNewInvoiceNumber();
          setShowButton(false);
          setsubPrice(0);
          setTotalPrice(0);
          setSelectedProducts([]);
          setOrderNumber(response?.OrderCode);
          setCustomerNotes(response?.CustomerNote);
          setSalesBillID(uuid.v4());

          setOrderValue(0);
          list.ordID = response?.OrderType;
          let details = response?.ResOrderDetailList;
          setToggle(true);
          setOrderCode(false);
          list.isOrderPlaced = true;

          setOrderDetails(response);
          setProductIndex(0);
        }
      } catch (e) {
        console.log(e, "error");
        setLoading(false);
      }
    } else {
      setSearchText("");
    }
  };
  const getOrderDetails = async (orderId) => {
    setIsSearch(false);
    setRefOrderNumber(orderId);

    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    list.billHasOrder = true;
    setLoading(true);
    try {
      const response = await props.dispatch(
        ServerCall(token, "Order/FetchOrder?orderCode=" + orderId, "GET")
      );
      console.log("order Details responce", response);

      if (response?.message === "Unauthorized") {
        Alert.alert(props.StringsList._537, props.StringsList._276, [
          { text: "OK", onPress: () => onClickPowerOff() },
        ]);
        setIsSearch(false);
        setLoading(false);
      } else if (!response?.ResOrderDetailList) {
        Alert.alert(props.StringsList._537, props.StringsList._474, [
          {
            text: "OK",
            onPress: () => {
              setToggle(false);
              setOrderCode(true);
              setIsSearch(false);
            },
          },
        ]);
        setLoading(false);
      } else if (response?.IsPaid) {
        Alert.alert(
          props.StringsList._537,
          response?.OrderCode + " : " + " is " + props.StringsList._505,
          [
            {
              text: "OK",
              onPress: () => {
                setIsSearch(false);
                setToggle(false);
                setOrderCode(true);
                restState();
                setLoading(false);
              },
            },
          ]
        );
      } else if (
        response?.Status === 4 &&
        response.StatusName === "Cancelled"
      ) {
        Alert.alert(
          props.StringsList._537,
          response?.OrderCode + " : " + props.StringsList._2,
          [
            {
              text: "OK",
              onPress: () => {
                setIsSearch(false);
                setToggle(false);
                setOrderCode(true);
                restState();
                setLoading(false);
              },
            },
          ]
        );
      } else {
        setIsSearch(false);
        createNewInvoiceNumber();
        setSelectedProducts([]);
        setTotalPrice(0);
        setsubPrice(0);
        setSalesBillID(uuid.v4());
        setOrderNumber(response?.OrderCode);
        setCustomerNotes(response?.CustomerNote);
        list.ordID = response?.OrderType;
        let details = response?.ResOrderDetailList;
        setToggle(true);
        setOrderCode(false);
        list.isOrderPlaced = true;

        setOrderDetails(response);
        setProductIndex(0);
      }
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }
  };

  const placewithpay = (val) => {
    if (val === "1") {
      setPaymentsValue(val);
      setPlaceWithPay(true);
      setPaymentView(true);
    } else if (val === "2") {
      if (buyerInfo) {
        if (payemntAdded) {
          setPaymentsValue(val);
          setPlaceWithPay(true);
          setPaymentView(true);
        } else {
        }
      }
    } else if (val === "4" || val === "5") {
      if (payemntAdded) {
        setPaymentsValue(val);
        setPlaceWithPay(true);
        setPaymentView(true);
      } else {
        setRailStart(false);
      }
    }
  };

  const checkJSonValidity = async (isJson) => {
    try {
      let jsonParsing = await JSON.parse(isJson);
      if (jsonParsing.message === "Unauthorized") {
        return true;
      }
    } catch (error) {
      console.log("response is string and not converted to json", error);

      return false;
    }
  };

  const placeOrderWithPay = async (key) => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    let table = JSON.parse(tableData);
    setPlaceWithPay(false);
    let productfinalArray = [];
    let isProductHasZaroPrice = false;

    for (let i = 0; i < selectedProducts.length; i++) {
      if (
        Number(selectedProducts[i].PriceOriginal) == 0 &&
        Number(selectedProducts[i].PriceWithOutTax) == 0 &&
        selectedProducts[i]?.IsParentAddOn
      ) {
        isProductHasZaroPrice = true;
      }

      let obj = {
        OrderDetailCode: selectedProducts[i]?.SalesInvoiceDetailsID,
        OrderCode: String(orderNumber),
        AddOnGroupCode: selectedProducts[i]?.AddOnGroupCode,
        AddOnParentOrderDetailCode: selectedProducts[i]?.ParentInvoiceDetailsID
          ? selectedProducts[i]?.ParentInvoiceDetailsID
          : "",
        DiscountRate: selectedProducts[i]?.DiscountRate,
        DiscountAmount: Number(selectedProducts[i]?.DiscountAmount),
        Ingredients: String(selectedProducts[i]?.Ingredients),
        IsParentAddOn:
          selectedProducts[i]?.IsParentAddOn === 1 ||
          selectedProducts[i]?.IsParentAddOn === true
            ? true
            : false,
        Price: Number(
          (selectedProducts[i]?.PriceOriginal).toFixed(
            TerminalConfiguration.DecimalsInAmount
          )
        ),
        PriceType: selectedProducts[i]?.PriceType,
        ProductBarCode: selectedProducts[i]?.ProductBarCode,
        ProductCode: selectedProducts[i]?.ProductCode,
        ProductNote: selectedProducts[i]?.notes,
        ProductType: selectedProducts[i]?.ProductType,
        Quantity:
          selectedProducts[i]?.IsParentAddOn === false
            ? selectedProducts[i]?.Quantity *
              selectedProducts[i]?.OrignalQuantity
            : selectedProducts[i]?.Quantity,
        SerialNumber: selectedProducts[i]?.SerialNumber,
        UnitCode: selectedProducts[i]?.UOMCode,
        UnitFragment: selectedProducts[i]?.UOMFragment
          ? selectedProducts[i]?.UOMFragment
          : 0,
        UnitType: selectedProducts[i]?.UOMType
          ? selectedProducts[i]?.UOMType
          : 0,
      };

      productfinalArray.push(obj);
    }
    let CurrentDate = moment().format();
    let date = String(CurrentDate).split("T");
    let yourDate = date[0];
    let time = date[1].split("+");
    let recordstamp = yourDate + " " + time[0];
    console.log(yourDate, " <== date time==> ", time[0]);
    if (!isProductHasZaroPrice) {
      try {
        let placeOrderJson = [
          {
            OrderCode: String(orderNumber),
            RefOrderNumber: refORderNumber ? refORderNumber : "",
            TableCode: String(
              list.ordID === 1 ? storageItems?.TableCodeID : ""
            ),
            CustomerNote: customerNotes,
            ResUserID: Number(TerminalConfiguration?.UserCode),
            TimeRequired: Number(terminalSetup?.requiredTime),
            OrderType: Number(list.ordID),
            Status: 1,
            OrderTime: time[0],
            CompletionTime: "",
            RecordTimeStamp: recordstamp,
            OperationMode: "INSERT",
            RestaurantSalesAgentCode: orderTakerType?.SalesAgentCode
              ? String(orderTakerType?.SalesAgentCode)
              : "",
            CounterCode: TerminalConfiguration?.TerminalCode,
            ResOrderDetailList: productfinalArray,
            IsPaid: true,
          },
        ];

        let token = await AsyncStorage.getItem("ACCESS_TOKEN");

        console.log("orderPlaceJson", placeOrderJson);

        setLoading(true);
        const response = await props.dispatch(
          ServerCall(token, "Order/CreateOrder", "POST", placeOrderJson)
        );
        console.log("Place order api request responce =====>", response);
        // let jsonResponse;
        let isJson = await checkJSonValidity(response);

        // if (response) {
        if (response === "success") {
          let columnName = ["LastOrderNumber"];
          let columnValue = [Number(TerminalConfiguration.LastOrderNumber) + 1];
          console.log("bill number is", columnValue);
          updateColunm(
            TerminalConfigurationTable,
            columnName,
            "UserCode",
            TerminalConfiguration?.UserCode,
            columnValue
          );
          list.isOrderPlaced = true;
          if (list.ordID === 1 && table) {
            emptyAsyncTableObj();
          } else if (list.ordID !== 1 && table) {
            changeTableStatus(table?.TableCodeID);
          }

          setLoading(false);
          Toast.show(
            I18nManager.isRTL
              ? "تم تقديم الطلب مع الفاتورة بنجاح "
              : "Order Has been Placed with Invoice Successfully",
            Toast.LONG
          );
          return true;
        } else if (isJson) {
          try {
            let jsonParsing = await JSON.parse(response);
            if (jsonParsing.message === "Unauthorized") {
              Alert.alert(props.StringsList._537, props.StringsList._276, [
                { text: "OK", onPress: () => onClickPowerOff() },
                setLoading(false),
              ]);
              setLoading(false);
            }
          } catch (error) {
            console.log("response is string and not converted to json", error);
          }
          // setLoading(true);

          return false;
        } else {
          setToggled(false);
          setToggle(true);
          if (table) {
            changeTableStatus(table?.TableCodeID);
          }
          setLoading(false);
          return false;
        }
      } catch (e) {
        console.log("ordder place error", e);
        setLoading(false);
        return false;
      }
    } else {
      setPaymentsValue(null);
      setMessage(props.StringsList._270);
      setDisplayAlert(true);
      setRailStart(false);
      return false;
    }
  };

  const placeOrderWithoutPay = async (key) => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    let table = JSON.parse(tableData);
    console.log("table id", table?.TableCodeID);
    let productfinalArray = [];
    let isProductHasZaroPrice = false;
    for (let i = 0; i < selectedProducts.length; i++) {
      if (
        Number(selectedProducts[i].PriceOriginal) == 0 &&
        Number(selectedProducts[i].PriceWithOutTax) == 0 &&
        selectedProducts[i]?.IsParentAddOn
      ) {
        isProductHasZaroPrice = true;
      }

      let obj = {
        OrderDetailCode: selectedProducts[i]?.SalesInvoiceDetailsID,
        OrderCode: orderNumber,
        AddOnGroupCode: selectedProducts[i]?.AddOnGroupCode,
        AddOnParentOrderDetailCode: selectedProducts[i].ParentInvoiceDetailsID
          ? selectedProducts[i]?.ParentInvoiceDetailsID
          : "",
        DiscountRate: selectedProducts[i]?.DiscountRate,
        DiscountAmount: Number(selectedProducts[i]?.DiscountAmount),
        Ingredients: String(selectedProducts[i]?.Ingredients),
        IsParentAddOn:
          selectedProducts[i]?.IsParentAddOn === 1 ||
          selectedProducts[i]?.IsParentAddOn === true
            ? true
            : false,
        Price: Number(
          (selectedProducts[i]?.PriceOriginal).toFixed(
            TerminalConfiguration.DecimalsInAmount
          )
        ),
        PriceType: selectedProducts[i]?.PriceType,
        ProductBarCode: selectedProducts[i]?.ProductBarCode,
        ProductNote: selectedProducts[i]?.notes,
        ProductCode: selectedProducts[i]?.ProductCode,
        ProductType: selectedProducts[i]?.ProductType,
        OrignalQuantity: selectedProducts[i]?.OrignalQuantity
          ? selectedProducts[i]?.OrignalQuantity
          : selectedProducts[i]?.Quantity,
        Quantity:
          selectedProducts[i]?.IsParentAddOn === false
            ? selectedProducts[i]?.Quantity *
              selectedProducts[i]?.OrignalQuantity
            : selectedProducts[i]?.Quantity,
        SerialNumber: selectedProducts[i]?.SerialNumber,
        UnitCode: selectedProducts[i]?.UOMCode,
        UnitFragment: selectedProducts[i]?.UOMFragment
          ? selectedProducts[i]?.UOMFragment
          : 0,
        UnitType: selectedProducts[i]?.UOMType
          ? selectedProducts[i]?.UOMType
          : 0,
      };
      productfinalArray.push(obj);
    }
    let CurrentDate = moment().format();
    let date = String(CurrentDate).split("T");
    let yourDate = date[0];
    let time = date[1].split("+");
    let recordstamp = yourDate + " " + time[0];
    console.log(yourDate, " <== date time==> ", time[0]);

    if (!isProductHasZaroPrice) {
      try {
        let placeOrderJson = [
          {
            OrderCode: orderNumber,
            RefOrderNumber: refORderNumber ? refORderNumber : "",
            TableCode: String(
              list.ordID === 1 ? storageItems?.TableCodeID : ""
            ),
            CustomerNote: customerNotes,
            ResUserID: Number(TerminalConfiguration?.UserCode),
            TimeRequired: Number(terminalSetup?.requiredTime),
            OrderType: Number(list.ordID),
            Status: terminalSetup?.IsKitchenDisplay === "false" ? 3 : 1,
            OrderTime: time[0],
            CompletionTime: "",
            RecordTimeStamp: recordstamp,
            OperationMode: "INSERT",
            RestaurantSalesAgentCode: String(
              orderTakerType?.SalesAgentCode
                ? orderTakerType?.SalesAgentCode
                : ""
            ),
            CounterCode: TerminalConfiguration?.TerminalCode,
            ResOrderDetailList: productfinalArray,
            IsPaid: false,
          },
        ];

        let token = await AsyncStorage.getItem("ACCESS_TOKEN");

        console.log("orderPlaceJson", placeOrderJson);
        setLoading(true);

        const response = await props.dispatch(
          ServerCall(token, "Order/CreateOrder", "POST", placeOrderJson)
        );
        console.log("Place order api request responce =====>", response);
        let isJson = await checkJSonValidity(response);

        if (response === "success") {
          setShortInvoice(true);

          let columnName = ["LastOrderNumber"];
          let columnValue = [Number(TerminalConfiguration.LastOrderNumber) + 1];
          console.log("bill number is", columnValue);
          updateColunm(
            TerminalConfigurationTable,
            columnName,
            "UserCode",
            TerminalConfiguration?.UserCode,
            columnValue
          );

          captureRef(qrRef2.current, {
            format: "png",
            quality: 1.0,
          }).then(
            async (urii) => {
              console.log("uri======>", urii);
              let ConnectedBluetoothInfo = await AsyncStorage.getItem(
                "ConnectedBluetoothInfo"
              );
              let printAdress = ConnectedBluetoothInfo?.split("|");
              if (
                Array.isArray(printAdress) &&
                printAdress !== undefined &&
                printAdress[1]
              ) {
                let invoiceInfoObj = [
                  {
                    printerMacAddress: printAdress[1],
                    printerName: printAdress[0],
                    ar: I18nManager.isRTL ? "ar" : "en",
                  },
                ];
                console.log("invoice information object", printAdress[1], urii);
                setTimeout(() => {
                  PrinterNativeModule.printing(
                    JSON.stringify(invoiceInfoObj),
                    urii,
                    "[]"
                  );

                  invoiceInfoObj = [];
                  getData(TerminalSetupTable, (cb) => {
                    setTerminalSetupObj(cb[0]);
                  });
                  Toast.show(
                    I18nManager.isRTL
                      ? "تم تقديم الطلب بنجاح "
                      : "Order Has been Placed Successfully",
                    Toast.LONG
                  );

                  if (list.ordID === 1 && table) {
                    emptyAsyncTableObj();
                  } else if (list.ordID !== 1 && table) {
                    changeTableStatus(table?.TableCodeID);
                  }
                  setShortInvoice(false);
                  restState();
                });
              } else {
                getData(
                  TerminalSetupTable,
                  (cb) => {
                    setTerminalSetupObj(cb[0]);
                  },

                  0
                );

                if (list.ordID === 1 && storageItems) {
                  emptyAsyncTableObj();
                } else if (list.ordID !== 1 && table) {
                  changeTableStatus(table?.TableCodeID);
                }
                setShortInvoice(false);
                restState();
              }
            },
            (error) => console.error("Oops, snapshot failed", error)
          );
        } else if (isJson) {
          try {
            let jsonParse = await JSON.parse(response);
            if (jsonParse.message === "Unauthorized") {
              Alert.alert(props.StringsList._537, props.StringsList._276, [
                { text: "OK", onPress: () => onClickPowerOff() },
                setLoading(false),
              ]);
            }
          } catch (error) {
            console.log("response is string and not converted to json", error);
          }
          return false;
        } else {
          if (table) {
            changeTableStatus(table?.TableCodeID);
          }
          console.log("Error order Not Placed");
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log(e, "error");
      }
    } else {
      setPaymentsValue(null);
      setMessage(props.StringsList._270);
      setDisplayAlert(true);
      setRailStart(false);
      return false;
    }
  };

  const UpdateOrderWithPaidStatus = async (key) => {
    let productfinalArray = [];
    let isProductHasZaroPrice = false;
    for (let i = 0; i < selectedProducts.length; i++) {
      if (
        Number(selectedProducts[i].PriceOriginal) == 0 &&
        Number(selectedProducts[i].PriceWithOutTax) == 0 &&
        selectedProducts[i]?.IsParentAddOn
      ) {
        isProductHasZaroPrice = true;
      }

      let obj = {
        OrderDetailCode: selectedProducts[i]?.OrderDetailCode
          ? selectedProducts[i]?.OrderDetailCode
          : selectedProducts[i]?.SalesInvoiceDetailsID,
        OrderCode: orderDetails?.OrderCode,
        AddOnGroupCode: selectedProducts[i]?.AddOnGroupCode,
        AddOnParentOrderDetailCode: selectedProducts[i]
          ?.AddOnParentOrderDetailCode
          ? selectedProducts[i]?.AddOnParentOrderDetailCode
          : selectedProducts[i]?.AddOnParentSalesInvoiceDetailsID,
        DiscountRate: selectedProducts[i]?.DiscountRate,
        DiscountAmount: Number(selectedProducts[i]?.DiscountAmount),
        Ingredients: String(selectedProducts[i]?.Ingredients),
        IsParentAddOn:
          selectedProducts[i]?.IsParentAddOn === true ||
          selectedProducts[i]?.IsParentAddOn === 1
            ? true
            : false,
        Price: Number(
          (selectedProducts[i]?.PriceOriginal).toFixed(
            TerminalConfiguration.DecimalsInAmount
          )
        ),
        PriceType: selectedProducts[i]?.PriceType,
        ProductBarCode: selectedProducts[i]?.ProductBarCode,
        ProductCode: selectedProducts[i]?.ProductCode,
        ProductNote: selectedProducts[i]?.ProductNote
          ? selectedProducts[i]?.ProductNote
          : selectedProducts[i]?.notes,
        ProductType: selectedProducts[i]?.ProductType,
        Quantity:
          selectedProducts[i]?.IsParentAddOn === false
            ? selectedProducts[i]?.Quantity *
              selectedProducts[i]?.OrignalQuantity
            : selectedProducts[i]?.Quantity,
        SerialNumber: selectedProducts[i]?.SerialNumber,
        UnitCode: selectedProducts[i]?.UOMCode,
        UnitFragment: selectedProducts[i]?.UOMFragment
          ? selectedProducts[i]?.UOMFragment
          : 0,
        UnitType: selectedProducts[i]?.UOMType
          ? selectedProducts[i]?.UOMType
          : 0,
        IsUpdated: selectedProducts[i]?.IsUpdated,
      };

      productfinalArray.push(obj);
    }
    let CurrentDate = moment().format();
    let date = String(CurrentDate).split("T");
    let yourDate = date[0];
    let time = date[1].split("+");
    let recordstamp = yourDate + " " + time[0];
    console.log(yourDate, " <== date time==> ", time[0]);
    if (!isProductHasZaroPrice) {
      try {
        let placeOrderJson = [
          {
            OrderCode: orderDetails?.OrderCode,
            TableCode: orderDetails?.TableCode,
            CustomerNote: customerNotes,
            ResUserID: orderDetails?.ResUserID,
            TimeRequired: orderDetails?.TimeRequired,
            OrderType: orderDetails?.OrderType,
            Status: orderDetails?.Status,
            OrderTime: orderDetails?.OrderTime,
            UpdationTime: recordstamp,
            CompletionTime: "",
            RecordTimeStamp: orderDetails?.RecordTimeStamp.substring(11),
            OperationMode: "UPDATE",
            RestaurantSalesAgentCode: orderDetails?.RestaurantSalesAgentCode,
            CounterCode: orderDetails?.CounterCode,
            ResOrderDetailList: productfinalArray,
            IsPaid: true,
          },
        ];

        let token = await AsyncStorage.getItem("ACCESS_TOKEN");

        console.log("orderPlaceJson", placeOrderJson);
        setLoading(true);

        const response = await props.dispatch(
          ServerCall(token, "Order/CreateOrder", "POST", placeOrderJson)
        );
        console.log("Update Order With Paid Status responce =====>", response);
        let isJson = await checkJSonValidity(response);

        if (response === "success") {
          // let columnName = ['LastOrderNumber'];
          // let columnValue = [Number(TerminalConfiguration.LastOrderNumber) + 1];
          // console.log('bill number is', columnValue);
          // updateColunm(
          //   TerminalConfigurationTable,
          //   columnName,
          //   'UserCode',
          //   TerminalConfiguration?.UserCode,
          //   columnValue,
          // );
          setLoading(false);
        } else if (isJson) {
          try {
            let jsonParse = await JSON.parse(response);
            if (jsonParse.message === "Unauthorized") {
              Alert.alert(props.StringsList._537, props.StringsList._276, [
                { text: "OK", onPress: () => onClickPowerOff() },
                setLoading(false),
              ]);
            }
          } catch (error) {
            console.log("response is string and not converted to json", error);
          }
          return false;
        } else {
          console.log("Error order Not Placed");
        }
        // }
        setLoading(false);
      } catch (e) {
        console.log(e, "error");
      }
    } else {
      setPaymentsValue(null);
      setMessage(props.StringsList._270);
      setDisplayAlert(true);
      setRailStart(false);
      setLoading(false);
    }
  };

  const UpdateOrder = async (key) => {
    let productfinalArray = [];
    let isProductHasZaroPrice = false;
    for (let i = 0; i < selectedProducts.length; i++) {
      if (
        Number(selectedProducts[i].PriceOriginal) == 0 &&
        Number(selectedProducts[i].PriceWithOutTax) == 0 &&
        selectedProducts[i]?.IsParentAddOn
      ) {
        isProductHasZaroPrice = true;
      }
      let obj = {
        OrderDetailCode: selectedProducts[i]?.OrderDetailCode
          ? selectedProducts[i]?.OrderDetailCode
          : selectedProducts[i]?.SalesInvoiceDetailsID,
        OrderCode: orderDetails?.OrderCode,
        AddOnGroupCode: selectedProducts[i]?.AddOnGroupCode,
        AddOnParentOrderDetailCode: selectedProducts[i]
          ?.AddOnParentOrderDetailCode
          ? selectedProducts[i]?.AddOnParentOrderDetailCode
          : selectedProducts[i]?.AddOnParentSalesInvoiceDetailsID,
        DiscountRate: selectedProducts[i]?.DiscountRate,
        DiscountAmount: Number(selectedProducts[i]?.DiscountAmount),
        Ingredients: String(selectedProducts[i]?.Ingredients),
        IsParentAddOn:
          selectedProducts[i]?.IsParentAddOn === true ||
          selectedProducts[i]?.IsParentAddOn === 1
            ? true
            : false,
        Price: Number(
          selectedProducts[i]?.PriceOriginal.toFixed(
            TerminalConfiguration.DecimalsInAmount
          )
        ),
        PriceType: selectedProducts[i]?.PriceType,
        ProductBarCode: selectedProducts[i]?.ProductBarCode,
        ProductCode: selectedProducts[i]?.ProductCode,
        ProductNote: selectedProducts[i]?.ProductNote
          ? selectedProducts[i]?.ProductNote
          : selectedProducts[i]?.notes,
        ProductType: selectedProducts[i]?.ProductType,
        Quantity:
          selectedProducts[i]?.IsParentAddOn === false
            ? selectedProducts[i]?.Quantity *
              selectedProducts[i]?.OrignalQuantity
            : selectedProducts[i]?.Quantity,
        SerialNumber: selectedProducts[i]?.SerialNumber,
        UnitCode: selectedProducts[i]?.UOMCode,
        UnitFragment: selectedProducts[i]?.UOMFragment
          ? selectedProducts[i]?.UOMFragment
          : 0,
        UnitType: selectedProducts[i]?.UOMType
          ? selectedProducts[i]?.UOMType
          : 0,
        IsUpdated: selectedProducts[i]?.IsUpdated,
      };

      productfinalArray.push(obj);
    }
    let CurrentDate = moment().format();
    let date = String(CurrentDate).split("T");
    let yourDate = date[0];
    let time = date[1].split("+");
    let recordstamp = yourDate + " " + time[0];
    console.log(yourDate, " <== date time==> ", time[0]);
    if (!isProductHasZaroPrice) {
      try {
        let placeOrderJson = [
          {
            OrderCode: orderDetails?.OrderCode,
            TableCode: orderDetails?.TableCode,
            CustomerNote: customerNotes,
            ResUserID: orderDetails?.ResUserID,
            TimeRequired: orderDetails?.TimeRequired,
            OrderType: orderDetails?.OrderType,
            Status:
              terminalSetup?.IsKitchenDisplay === "false"
                ? 3
                : orderDetails?.Status,
            OrderTime: orderDetails?.OrderTime,
            CompletionTime: "",
            UpdationTime: recordstamp,
            RecordTimeStamp: orderDetails?.RecordTimeStamp.substring(11),
            OperationMode: "UPDATE",
            RestaurantSalesAgentCode: orderDetails?.RestaurantSalesAgentCode,
            CounterCode: orderDetails?.CounterCode,
            ResOrderDetailList: productfinalArray,
          },
        ];

        let token = await AsyncStorage.getItem("ACCESS_TOKEN");

        console.log("updatePlaceJson", placeOrderJson);
        setLoading(true);

        const response = await props.dispatch(
          ServerCall(token, "Order/CreateOrder", "POST", placeOrderJson)
        );
        console.log("Update order api request responce =====>", response);
        let isJson = await checkJSonValidity(response);
        if (response) {
          if (response === "success") {
            let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
            let table = JSON.parse(tableData);
            console.log("table id", table?.TableCodeID);
            setShortInvoice(true);
            captureRef(qrRef2.current, {
              format: "png",
              quality: 1.0,
            }).then(
              async (urii) => {
                console.log("uri======>", urii);
                let ConnectedBluetoothInfo = await AsyncStorage.getItem(
                  "ConnectedBluetoothInfo"
                );
                let printAdress = ConnectedBluetoothInfo?.split("|");

                if (
                  Array.isArray(printAdress) &&
                  printAdress !== undefined &&
                  printAdress[1]
                ) {
                  let invoiceInfoObj = [
                    {
                      printerMacAddress: printAdress[1],
                      printerName: printAdress[0],
                      ar: I18nManager.isRTL ? "ar" : "en",
                    },
                  ];
                  console.log(
                    "invoice information object",
                    printAdress[1],
                    urii
                  );
                  setTimeout(() => {
                    PrinterNativeModule.printing(
                      JSON.stringify(invoiceInfoObj),
                      urii,
                      "[]"
                    );

                    invoiceInfoObj = [];
                    getData(TerminalSetupTable, (cb) => {
                      setTerminalSetupObj(cb[0]);
                    });
                    Toast.show(
                      I18nManager.isRTL
                        ? "تم تحديث الطلب بنجاح "
                        : "Order Has been Update Successfully",
                      Toast.LONG
                    );
                    if (list.ordID === 1 && table) {
                      emptyAsyncTableObj();
                    } else if (list.ordID !== 1 && table) {
                      changeTableStatus(table?.TableCodeID);
                    }
                    setShortInvoice(false);
                    setOrderValue(0);
                    setShowButton(false);
                    restState();
                  });
                } else {
                  getData(
                    TerminalSetupTable,
                    (cb) => {
                      setTerminalSetupObj(cb[0]);
                    },

                    0
                  );
                  if (list.ordID === 1 && table) {
                    emptyAsyncTableObj();
                  } else if (list.ordID !== 1 && table) {
                    changeTableStatus(table?.TableCodeID);
                  }
                  setShortInvoice(false);
                  setOrderValue(0);
                  setShowButton(false);
                  restState();
                }
              },
              (error) => console.error("Oops, snapshot failed", error)
            );
          } else if (isJson) {
            try {
              let jsonParse = await JSON.parse(response);
              if (jsonParse.message === "Unauthorized") {
                Alert.alert(props.StringsList._537, props.StringsList._276, [
                  { text: "OK", onPress: () => onClickPowerOff() },
                  setLoading(false),
                ]);
              }
            } catch (error) {
              console.log(
                "response is string and not converted to json",
                error
              );
            }
            return false;
          } else {
            console.log("Error order Not Placed");
          }
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e, "error");
      }
    } else {
      setPaymentsValue(null);
      setMessage(props.StringsList._270);
      setDisplayAlert(true);
      setRailStart(false);
      setLoading(false);
    }
  };

  const CancelOrder = async (key) => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    setLoading(true);
    try {
      let CancelorderJson = [
        {
          OrderCode: orderDetails?.OrderCode,
          TableCode: orderDetails?.TableCodeID,
          CustomerNote: orderDetails?.CustomerNote,
          ResUserID: orderDetails?.ResUserID,
          TimeRequired: orderDetails?.TimeRequired,
          OrderType: orderDetails?.orderType?.id,
          Status: 4,
          OrderTime: orderDetails?.OrderTime,
          CompletionTime: "",
          RecordTimeStamp: orderDetails?.RecordTimeStamp.substring(11),
          OperationMode: "UPDATE",
          RestaurantSalesAgentCode: orderDetails?.RestaurantSalesAgentCode,
          CounterCode: orderDetails?.CounterCode,
          ResOrderDetailList: orderDetails?.ResOrderDetailList,
        },
      ];

      console.log("CancelorderJson", CancelorderJson);
      const response = await props.dispatch(
        ServerCall(token, "Order/CreateOrder", "POST", CancelorderJson)
      );
      console.log("Cancel order api request responce", response);

      if (response) {
        if (response === "success") {
          let table = await AsyncStorage.getItem("SELECTED_TABLE");

          console.log("here", JSON.parse(table));
          await AsyncStorage.removeItem("SELECTED_TABLE");

          restState();
          console.log("Table Removed");

          await getData(TerminalSetupTable, (cb) => {
            setTerminalSetupObj(cb[0]);
          });
          setLoading(false);
          Toast.show(
            I18nManager.isRTL
              ? "تم إلغاء الطلب بنجاح"
              : "Order Has been Cancelled Successfully",
            Toast.LONG
          );
        } else if (response === "Unauthorized") {
          setLoading(true);
          Alert.alert(props.StringsList._537, props.StringsList._276, [
            { text: "OK", onPress: () => onClickPowerOff() },
            setLoading(false),
          ]);
        } else {
          console.log("Error");
        }
      }
      setLoading(false);
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }
  };
  const onPressSave = () => {
    setOpenModal(false);
  };
  const onPressSaveTime = () => {
    setOrderPopup(false);
  };
  const holdBillFunction = () => {
    setMessage(props.StringsList._78);
    setAlertType("holdInvoice");
    setDisplayAlert(true);
    setisPromptAlert(true);
  };
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

  const onOpenModal = () => {
    setNotesModal(true);
  };

  const onCloseTimeModal = () => {
    setNotesModal(false);
  };
  const onSelect = (selectedItem, index) => {
    let filterAreas = areas.find((x) => x.Name === selectedItem);

    if (filterAreas) {
      let filterTables = masterTableItems.filter(
        (x) =>
          filterAreas.Name === x.AreaName &&
          // x.TotalCapacity >= selectedGuest &&
          x.IsAvailable === 1
      );
      console.log("=========>", filterTables);
      setTableItem(filterTables);
    } else {
      console.log("Error: Data not found");
    }
  };

  const tableInfoData = () => {
    let array = Array.from({ length: 30 }, (_, i) => i + 1);
    setGuestItem(array);

    getData(AreaListTable, (arealist) => {
      let myArray = [];
      setAreas(arealist);
      for (let i = 0; i < arealist.length; i++) {
        myArray.push(arealist[i].Name);
      }
      setAreaItem(myArray);
    });
    getData(RestTablesTable, (tablesRecord) => {
      let tableArray = [];
      for (let i = 0; i < tablesRecord.length; i++) {
        tableArray.push(tablesRecord[i]);
      }
      setMasterTableItems(tableArray);
    });
    getData(OrderTackerList, (taker) => {
      let orderTakerArray = [];
      for (let i = 0; i < taker.length; i++) {
        orderTakerArray.push(taker[i]);
      }
      orderTakerArray.unshift({
        DiscountLimit: 0,
        Phone: "",
        Email: "",
        OrderTakerName: "---Select---",
        SalesAgentCode: 0,
      });
      setOrderTaker(orderTakerArray);
    });
  };

  const DineInOrder = () => {
    return (
      <SafeAreaView
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              orderType.id === 0 ? AppColor.gray1 : AppColor.green,
          },
        ]}
      >
        <View style={[styles.iconView]}>
          <Image
            style={[styles.icon]}
            source={require("../../assets/images/order.png")}
          />
          {/* <Icon
          name={I18nManager.isRTL ? 'angle-double-left' : 'angle-double-right'}
          // size={sizeHelper.calHp(30)}
          style={{height: sizeHelper.calHp(30)}}
          color={orderType.id === 0 ? AppColor.black : AppColor.yellowColor}
        /> */}
        </View>
      </SafeAreaView>
    );
  };
  // All other functions for Menu
  const rebootAlert = () => {
    Alert.alert(props.StringsList._537, props.StringsList._249, [
      {
        text: "yes",
        onPress: async () => {
          rebootTerminalFunction();
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
  const onClickLogoutFunction = () => {
    Alert.alert(props.StringsList._537, props.StringsList._443, [
      {
        text: "yes",
        onPress: async () => {
          ResetDrawerSetup();
          onClickPowerOff();
        },
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);
  };
  const onClickPowerOff = async () => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    let table = JSON.parse(tableData);
    console.log("table", table?.TableCodeID);
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
          ServerCall(
            UserLogin,
            "SalesBill/CreateSalesBill",
            "POST",
            newBillList
          )
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

              let path =
                "/storage/emulated/0/Documents/Bnody Restaurant/Invoices.txt";
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
              let path =
                "/storage/emulated/0/Documents/Bnody Restaurant/Invoices.txt";
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

  useEffect(() => {
    setTimeout(() => {
      checkLocalDBBills();
    }, 5000);
  }, []);

  const checkLocalDBBills = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permissions for write access",
          message: "Give permission to your storage to write a file",
          buttonPositive: "ok",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getData(DrawerSetupTable, async (cb) => {
          if (cb[0]?.isInitialLogin === "true") {
            updateColunm(
              DrawerSetupTable,
              ["isInitialLogin"],
              "id",
              "D12345678",
              "false"
            );
            const OsVer = Platform.constants["Release"];

            if (OsVer >= 11) {
              let path =
                "/storage/emulated/0/Documents/Restaurant/Invoices.txt";
              if (await RNFS.exists(path)) {
                let uri = await AsyncStorage.getItem("FILE_URI");
                console.log("Folder uri android 11 and above", uri);
                let Data = await PermissionFile.getInvoices(uri);
                let newBillList = Data;
                let bills = await JSON.parse(newBillList);
                if (bills.length > 0) {
                  //
                  let maxOrderCode = null;
                  const lastObject = bills[bills.length - 1];
                  const lastBillNumber =
                    lastObject.BillDetails[0].InvoiceNumber;

                  let lastBill = lastBillNumber.split("-");
                  const numericPartInvoice = lastBill[
                    lastBill.length - 1
                  ].replace(/^0+/, "");
                  console.log("Last Bill Number =====>", numericPartInvoice);
                  bills.forEach((item) => {
                    if (item.OrderCode) {
                      const orderCodeParts = item.OrderCode.split("-");
                      if (orderCodeParts.length > 1) {
                        const orderCodeValue = parseInt(orderCodeParts[1], 10);
                        if (
                          !isNaN(orderCodeValue) &&
                          (maxOrderCode === null ||
                            orderCodeValue > maxOrderCode)
                        ) {
                          maxOrderCode = orderCodeValue;
                        }
                      }
                    }
                  });

                  console.log("The maximum OrderCode value is:", maxOrderCode);
                  //
                  let status = await getNetInfo();
                  console.log("Net Status =====>", status);
                  if (status === true) {
                    postingBill(newBillList);
                  } else {
                    Alert.alert(
                      "Panding Bills",
                      "Some of Your bills are pending to post kindly connect to your internet connection to post bills",
                      [
                        {
                          text: "OKAY",
                          onPress: async () => {
                            let columnNameInvoice = ["LastBillNumber"];
                            let columnValueInvoice = [
                              Number(numericPartInvoice),
                            ];
                            let columnNameOrder = ["LastOrderNumber"];
                            let columnValueOrder = [Number(maxOrderCode)];
                            await getData(
                              TerminalConfigurationTable,
                              async (TC) => {
                                if (TC[0]?.UserCode) {
                                  updateColunm(
                                    TerminalConfigurationTable,
                                    columnNameInvoice,
                                    "UserCode",
                                    TC[0]?.UserCode,
                                    columnValueInvoice
                                  );
                                  updateColunm(
                                    TerminalConfigurationTable,
                                    columnNameOrder,
                                    "UserCode",
                                    TC[0]?.UserCode,
                                    columnValueOrder
                                  );
                                }
                              }
                            );

                            console.log("Press OK");
                          },
                        },
                      ]
                    );
                  }
                }
              }
            } else {
              let path =
                "/storage/emulated/0/Downloads/Restaurant/Invoices.txt";
              if (RNFS.exists(path)) {
                let uri = await AsyncStorage.getItem("FILE_URI");
                console.log("Folder uri android 10 ", uri);
                let Data = await PermissionFile.getInvoices(uri);
                let newBillList = Data;
                let bills = await JSON.parse(newBillList);
                if (bills.length > 0) {
                  let maxOrderCode = null;
                  const lastObject = bills[bills.length - 1];
                  const lastBillNumber =
                    lastObject.BillDetails[0].InvoiceNumber;

                  let lastBill = lastBillNumber.split("-");
                  const numericPartInvoice = lastBill[
                    lastBill.length - 1
                  ].replace(/^0+/, "");
                  console.log("Last Bill Number =====>", numericPartInvoice);
                  bills.forEach((item) => {
                    if (item.OrderCode) {
                      const orderCodeParts = item.OrderCode.split("-");
                      if (orderCodeParts.length > 1) {
                        const orderCodeValue = parseInt(orderCodeParts[1], 10);
                        if (
                          !isNaN(orderCodeValue) &&
                          (maxOrderCode === null ||
                            orderCodeValue > maxOrderCode)
                        ) {
                          maxOrderCode = orderCodeValue;
                        }
                      }
                    }
                  });

                  console.log("The maximum OrderCode value is:", maxOrderCode);
                  //
                  let status = await getNetInfo();
                  console.log("Net Status =====>", status);
                  if (status === true) {
                    postingBill(newBillList);
                  } else {
                    Alert.alert(
                      "Panding Bills",
                      "Some of Your bills are pending to post kindly connect to your internet connection to post bills",
                      [
                        {
                          text: "OKAY",
                          onPress: async () => {
                            let columnNameInvoice = ["LastBillNumber"];
                            let columnValueInvoice = [
                              Number(numericPartInvoice),
                            ];
                            let columnNameOrder = ["LastOrderNumber"];
                            let columnValueOrder = [Number(maxOrderCode)];
                            await getData(
                              TerminalConfigurationTable,
                              async (TC) => {
                                if (TC[0]?.UserCode) {
                                  updateColunm(
                                    TerminalConfigurationTable,
                                    columnNameInvoice,
                                    "UserCode",
                                    TC[0]?.UserCode,
                                    columnValueInvoice
                                  );
                                  updateColunm(
                                    TerminalConfigurationTable,
                                    columnNameOrder,
                                    "UserCode",
                                    TC[0]?.UserCode,
                                    columnValueOrder
                                  );
                                }
                              }
                            );

                            console.log("Press OK");
                          },
                        },
                      ]
                    );
                  }
                }
              }
            }
          }
        });
      } else {
        console.log("permission denied");
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };
  const postingBill = async (newBillList) => {
    setLoading(true);
    setPrintType(null);
    let path = "/storage/emulated/0/Documents/Bnody Restaurant/Invoices.txt";
    let uri = await AsyncStorage.getItem("FILE_URI");
    console.log("Folder uri android 11 and above", uri);
    let UserLogin = await AsyncStorage.getItem("ACCESS_TOKEN");
    let bill = await JSON.parse(newBillList);
    bill.forEach((elem) => {
      elem.BillDetails.forEach((element) => {
        element.IsTax1IncludedInPrice =
          element.IsTax1IncludedInPrice === 0 ? false : true;
        element.IsTax2IncludedInPrice =
          element.IsTax2IncludedInPrice === 0 ? false : true;
        element.IsParentAddOn = element.IsParentAddOn === 0 ? false : true;
        element.DeliveryStatus = false;
      });
    });
    const response1 = await props.dispatch(
      ServerCall(UserLogin, "SalesBill/CreateSalesBill", "POST", bill)
    );
    if (response1 === "success") {
      setLoading(true);
      if (Platform.OS === "android") {
        const isDeleted = await ScopedStorage.deleteFile(path).then(() => {
          Toast.show("Invoice File Deleted after posting", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        });
        if (isDeleted) {
          await AsyncStorage.removeItem("FILE_URI");
        }
      } else {
        try {
          const folderName = "Bnody Restaurant";
          const fileName = "invoices.txt";

          const libraryDirectoryPath = RNFS.LibraryDirectoryPath;

          const folderPath = `${libraryDirectoryPath}/${folderName}`;
          const filePath = `${folderPath}/${fileName}`;

          const fileExists = await RNFS.exists(filePath);
          if (fileExists) {
            await RNFS.unlink(filePath);
            console.log("File deleted successfully:", filePath);
          }

          await RNFS.writeFile(filePath, "", "utf8");
          console.log("File created successfully:", filePath);
        } catch (error) {
          console.error("Error creating folder and file:", error);
        }
      }
      let accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      let res = await DBTable.AddDataInDb(props, "rebootTerminal", accessToken);
      await AsyncStorage.removeItem("SELECTED_AGNETS");
      setLoading(false);
    } else {
      Alert.alert("Issue Bill", props.StringsList._298, [
        {
          text: "Try Again",
          onPress: () => {
            postingBill(newBillList);
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
      ]);

      setLoading(false);
    }

    setLoading(false);
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
    console.log("last bill number", number);
    return number;
  };
  const onClickMenuFunction = async (type) => {
    setFocusSearch(false);
    switch (type) {
      case "holdInvoice":
        setisHoldInvoices(true);
        setPrintType(null);
        break;

      case "orderTime":
        setFocusSearch(false);
        setOrderPopup(true);
        setPrintType(null);
        break;

      default:
        break;
    }
  };

  const addProductToList = async (itm, type, index, proArray, SP, TP) => {
    setLoading(true);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    setPrintType(null);
    let executeCalculation = true;
    let localIndex;
    let addonFinalQuantity = 0,
      groupType = "";
    if (returnInvoiceNumber) {
      setPrintType("returnInvoice");
    } else {
      setPrintType(null);
    }
    let IsUpdated = false;
    if (showButton === true && orderCode === false && printType === null) {
      IsUpdated = true;
    }

    itm.IsUpdated = IsUpdated;
    let notes = "";
    itm.notes = notes;
    itm.IsParentAddOn =
      itm.IsParentAddOn === 1 || itm.IsParentAddOn === true ? true : false;
    if (!returnInvoiceNumber && !invoiceNumber) {
      onNewInvoice();
    }
    let item = { ...itm },
      selectedProduct = [...selectedProducts],
      sPrice = subPrice,
      tPrice = totalPrice;
    if (terminalSetup?.BeepSound === "true") {
      SoundPlay();
    }
    if (retunProducts.length > 0 && !itm.IsParentAddOn) {
      let retp = [...retunProducts];
      // console.log("Retun Products...", retp)
      retp.splice(index, 1);
      setReturnProducts(retp);
    }
    let isAlredySelected = false;
    localIndex = index;

    if (selectedProducts.length > 0) {
      let isProductHaveChange = selectedProducts.find(
        (x) => x.SalesInvoiceDetailsID === item?.ParentInvoiceDetailsID
      );

      if (
        isProductHaveChange !== undefined &&
        isProductHaveChange &&
        showButton
      ) {
        isProductHaveChange.IsUpdated = true;
      }

      let newQuantity;

      let isProductExist = selectedProducts.find(
        (x) =>
          x?.ProductBarCode === item?.ProductBarCode &&
          x?.PriceOriginal === item?.PriceOriginal &&
          x.haveAddon == true &&
          x.IsParentAddOn === item?.IsParentAddOn
      );

      if (isProductExist && !isToggle) {
        let sameProductWithoutAddon = selectedProducts.findIndex(
          (x) =>
            x?.ProductBarCode === item?.ProductBarCode &&
            x?.PriceOriginal === item?.PriceOriginal &&
            x.haveAddon == undefined &&
            x.IsParentAddOn === item?.IsParentAddOn
        );
        if (sameProductWithoutAddon) {
          item.addAsNew = false;
          localIndex = sameProductWithoutAddon;
        } else {
          item.addAsNew = true;
        }
      } else if (
        isProductExist === undefined &&
        isToggle &&
        !item?.IsParentAddOn
      ) {
        item.addAsNew = true;
      } else {
        item.addAsNew = false;
      }
      if (item.addAsNew === false) {
        for (let i = 0; i < selectedProduct.length; i++) {
          let product = selectedProduct[i];

          let ind;
          if (localIndex == undefined) {
            ind = i;
          } else {
            ind = localIndex;
          }
          if (
            i === ind ||
            (product?.AddOnParentSalesInvoiceDetailsID ===
              item.SalesInvoiceDetailsID &&
              type !== "returnInvoice")
          ) {
            if (
              product?.ProductBarCode === item?.ProductBarCode &&
              product?.PriceOriginal === item?.PriceOriginal
            ) {
              newQuantity =
                type !== "increment"
                  ? product.Quantity - 1
                  : product.Quantity + 1;
            }
            if (
              (product?.ProductBarCode === item?.ProductBarCode &&
                product?.PriceOriginal === item?.PriceOriginal) ||
              (product?.AddOnParentSalesInvoiceDetailsID ===
                item.SalesInvoiceDetailsID &&
                type !== "returnInvoice")
            ) {
              if (
                product?.AddOnParentSalesInvoiceDetailsID ===
                item.SalesInvoiceDetailsID
              ) {
                groupType = "addon";
              }
              let discount = 0;
              isAlredySelected = true;
              let Amount = Number(product.PriceOriginal * newQuantity),
                pd = product.DiscountAmount ? product.DiscountAmount : 0,
                dr = product.DiscountRate ? product.DiscountRate : 0;
              if (pd >= Amount && printType === null && dr === 0) {
                pd = 0;
              }

              product.DiscountAmount = pd;

              if (product.ProductType === 3) {
                if (printType === "returnInvoice") {
                  if (newQuantity <= product.maxQuantity) {
                    let totalQuantity = item.totalQuantity;

                    let discountAfterDivision = Number(
                      (item.originalDiscount / totalQuantity) * newQuantity
                    );

                    if (
                      product.DiscountRate > 0 &&
                      printType === "returnInvoice"
                    ) {
                      pd = product.DiscountAmount;
                    } else {
                      pd = discountAfterDivision;
                    }
                  }
                }
                executeCalculation = false;
                if (groupType === "addon") {
                  if (!product?.IsParentAddOn) {
                    addonFinalQuantity = newQuantity * product.OrignalQuantity;
                    pd = 0;
                  }
                  changeProductGroupAddon(
                    itm,
                    product,
                    type,
                    addonFinalQuantity,
                    Number(dr),
                    Number(pd),
                    printType
                  );
                } else {
                  changeProductGroupItem(
                    itm,
                    type,
                    newQuantity,
                    Number(dr),
                    Number(pd)
                  );
                }
              } else {
                if (printType === "returnInvoice") {
                  let totalQuantity = item.totalQuantity;
                  let discountAfterDivision = Number(
                    (item.originalDiscount / totalQuantity) * newQuantity
                  );
                  if (product.IsParentAddOn) {
                    if (product.DiscountRate > 0) {
                      pd = Number(product.DiscountAmount);
                    } else {
                      pd = Number(discountAfterDivision);
                    }
                  }
                }
                if (!product?.IsParentAddOn) {
                  addonFinalQuantity = newQuantity * product.OrignalQuantity;
                  pd = 0;
                  dr = 0;
                }
                let taxAmt = await calculateTaxeGroups(
                  product.IsParentAddOn ? newQuantity : addonFinalQuantity,
                  Amount,
                  pd,
                  product.TaxGroupID,
                  1,
                  null,
                  0,
                  TerminalConfiguration,
                  product.PriceOriginal,
                  dr
                );
                console.log("Amount.....taxAmt", taxAmt);
                product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
                  (product.Tax1Rate = taxAmt.Tax1Percentage
                    ? taxAmt.Tax1Percentage
                    : 0);

                if (product.Tax1Fragment == 2 || product.Tax2Fragment == 2) {
                  taxAmt.Tax1Amount = product.IsParentAddOn
                    ? taxAmt.Tax1Amount * newQuantity
                    : taxAmt.Tax1Amount * addonFinalQuantity;
                  taxAmt.DiscountAmount = product.DiscountRate
                    ? (product.PriceWithOutTax *
                        newQuantity *
                        product.DiscountRate) /
                      100
                    : pd;
                } else {
                  taxAmt.DiscountAmount = product.DiscountRate
                    ? (product.PriceWithOutTax *
                        newQuantity *
                        product.DiscountRate) /
                      100
                    : pd;
                }
                product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;

                (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
                  (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
                  (product.Tax2Rate = taxAmt?.Tax2Percentage
                    ? taxAmt?.Tax2Percentage
                    : 0);

                product.Tax2Amount = taxAmt?.Tax2Amount
                  ? taxAmt?.Tax2Amount
                  : 0;

                if (type === "increment") {
                  if (taxAmt) {
                    let proQ;

                    if (!product.IsParentAddOn) {
                      proQ =
                        type === "increment"
                          ? (newQuantity - 1) * product.OrignalQuantity
                          : newQuantity * product.OrignalQuantity;
                    } else {
                      proQ =
                        type === "increment" ? newQuantity - 1 : newQuantity;
                    }
                    // console.log("proQ !== product.maxQuantity...", proQ, newQuantity, product)
                    if (
                      proQ === product.maxQuantity &&
                      printType === "returnInvoice"
                    ) {
                      product.Tax1Amount = product.tax;
                    }

                    if (proQ !== product.maxQuantity) {
                      let totalQuantity = product.totalQuantity;
                      product.Quantity = newQuantity;
                      let discountAfterDivision = Number(
                        (product.originalDiscount / totalQuantity) * newQuantity
                      );
                      if (
                        printType === "returnInvoice" &&
                        product.IsParentAddOn &&
                        product.DiscountRate === 0
                      ) {
                        discount = discountAfterDivision;
                      } else if (dr > 0) {
                        discount = taxAmt.DiscountAmount
                          ? taxAmt.DiscountAmount
                          : parseFloat(
                              (dr *
                                (product.PriceWithOutTax * newQuantity +
                                  taxAmt.Tax1Amount)) /
                                100
                            );
                      } else {
                        discount = product.DiscountAmount;
                      }
                      let GAmount = 0;
                      if (
                        taxAmt.calculationId === 9 ||
                        taxAmt.calculationId === 1
                      ) {
                        GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
                      } else {
                        GAmount = !product.IsTax1IncludedInPrice
                          ? Number(
                              product.PriceOriginal * product.Quantity -
                                discount +
                                taxAmt.Tax1Amount
                            )
                          : Number(
                              product.PriceOriginal * product.Quantity -
                                discount
                            );
                      }

                      product.GrandAmount = Number(
                        GAmount.toFixed(TerminalConfiguration.DecimalsInAmount)
                      );
                      discount = Number(discount);
                      product.DiscountAmount = Number(
                        discount.toFixed(TerminalConfiguration.DecimalsInAmount)
                      );
                      product.tax = product.Tax1Amount + product.Tax2Amount;
                      executeCalculation = true;
                    } else {
                      setMessage(props.StringsList._230);
                      setDisplayAlert(true);
                      setLoading(false);
                    }
                  }
                } else if (type === "decrement") {
                  let totalQuantity = product.totalQuantity;
                  product.Quantity = newQuantity;
                  let discountAfterDivision = Number(
                    (product.originalDiscount / totalQuantity) * newQuantity
                  );
                  if (
                    printType === "returnInvoice" &&
                    product.IsParentAddOn &&
                    product.DiscountRate === 0
                  ) {
                    discount = discountAfterDivision;
                  } else {
                    discount = taxAmt.DiscountAmount
                      ? taxAmt.DiscountAmount
                      : parseFloat(
                          (dr *
                            (product.PriceWithOutTax * newQuantity +
                              taxAmt.Tax1Amount)) /
                            100
                        );
                  }
                  let GAmount = 0;
                  if (
                    taxAmt.calculationId === 9 ||
                    taxAmt.calculationId === 1
                  ) {
                    GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
                  } else {
                    GAmount = !product.IsTax1IncludedInPrice
                      ? Number(
                          product.PriceOriginal * product.Quantity -
                            discount +
                            taxAmt.Tax1Amount
                        )
                      : Number(
                          product.PriceOriginal * product.Quantity - discount
                        );
                  }
                  product.GrandAmount = Number(
                    GAmount.toFixed(TerminalConfiguration.DecimalsInAmount)
                  );
                  if (printType === "returnInvoice" && !product.IsParentAddOn) {
                    discount = Number(0);
                  } else {
                    discount = Number(discount);
                  }

                  product.DiscountAmount = discount.toFixed(
                    TerminalConfiguration.DecimalsInAmount
                  );
                  product.tax = product.Tax1Amount + product.Tax2Amount;
                  executeCalculation = true;
                }
              }
            }
          }
        }
      }
    } else {
      let time = moment().format("HH:mm:ss");
      setStartTime(time);
    }
    if (!isAlredySelected) {
      if (!isReturnInvoice) {
        if (item.parentQuantity > 0) {
          item.Quantity = item.parentQuantity;
        } else {
          item.Quantity = 1;
        }

        let Amount = Number(item.PriceOriginal) * item.Quantity;

        if (item.ProductType === 3) {
          if (item?.ProductType === 3 && !item?.IsParentAddOn) {
            let taxAmountIncludedInPrice = 0;

            let tax1AmountTotal = 0,
              tax1ActualAmountTotal = 0,
              tax2AmountTotal = 0,
              tax2ActualAmountTotal = 0;
            let listOfPG;
            item.Pricefortax = item.PriceOriginal;

            let rr = await getData(SalesFamilySummaryListTable, async (cb) => {
              let groupTaxCodes = cb.filter(
                (x) => x.SalesFamilyCode === item.ProductCode
              );
              listOfPG = groupTaxCodes;
              let totaltax1 = 0;
              let totaltax2 = 0;
              let myArray = [];
              let colloctivePrice = 0,
                inclusiveTax = 0;

              await listOfPG.forEach(async (element, index) => {
                let percentageDiscountAmount = 0;
                let taxGroupID = "";
                let itemQty = 0,
                  itemAmount = 0,
                  itemProposedSalesAmount = 0,
                  itemDiscountAmount = 0,
                  netQty = 0;
                if (item.DiscountAmount > item.Quantity * item.PriceOriginal) {
                  item.DiscountAmount = 0;
                }
                if (item.DiscountRate > 0) {
                  percentageDiscountAmount =
                    (item.PriceOriginal * item.Quantity * item.DiscountRate) /
                    100;
                } else {
                  percentageDiscountAmount = item.DiscountAmount;
                }
                let amountBeforeDiscount = item.PriceOriginal * item.Quantity;
                taxGroupID = element.SaleTaxFamilyCode;
                itemQty = element.Quantity;
                itemAmount = element.Price;
                netQty = item.Quantity * itemQty;
                itemProposedSalesAmount =
                  (itemAmount * amountBeforeDiscount) / item.Pricefortax;
                if (amountBeforeDiscount > 0)
                  itemDiscountAmount =
                    (itemProposedSalesAmount * percentageDiscountAmount) /
                    amountBeforeDiscount;
                let taxAmt = await calculateTaxeGroups(
                  netQty,
                  itemProposedSalesAmount,
                  itemDiscountAmount,
                  taxGroupID,
                  1,
                  null,
                  0,
                  TerminalConfiguration,
                  item.PriceOriginal,
                  item.DiscountRate
                );
                let productGroupTaxInfoObj = {
                  ProductBarCode: element?.ProductBarCode,
                  newTaxAmount: taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0 + taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0,
                  isFixedTax:
                    taxAmt?.Tax1Fragment === 2 || taxAmt?.Tax2Fragment === 2
                      ? true
                      : false,
                  unitPrice: taxAmt.IsTax1IncludedInPrice
                    ? taxAmt.Price
                    : element.Price,
                  proposedPrice: element.Price,
                  taxRate: taxAmt?.Tax1Percentage ? taxAmt.Tax1Percentage : 0,
                  isInclusiveTax:
                    taxAmt?.IsTax1IncludedInPrice === true ||
                    taxAmt?.taxAmt?.IsTax2IncludedInPrice === true
                      ? true
                      : false,
                };
                colloctivePrice += element?.Price;
                myArray.push(productGroupTaxInfoObj);
                if (taxAmt.IsTax1IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                }
                if (taxAmt.IsTax2IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
                }

                if (!item?.IsParentAddOn) {
                  addonFinalQuantity = item.Quantity * item.OrignalQuantity;
                }
                if (taxAmt.Tax1Fragment == 2 || taxAmt.Tax2Fragment == 2) {
                  taxAmt.Tax1Amount = taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount * item?.OrignalQuantity
                    : 0;
                  taxAmt.Tax2Amount = taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount * item?.OrignalQuantity
                    : 0;
                }
                (item.Tax1Fragment = taxAmt?.Tax1Fragment
                  ? taxAmt.Tax1Fragment
                  : ""),
                  (item.Tax2Fragment = taxAmt?.Tax2Fragment
                    ? taxAmt.Tax2Fragment
                    : "");
                item.IsTax1IncludedInPrice = taxAmt.IsTax1IncludedInPrice
                  ? taxAmt.IsTax1IncludedInPrice
                  : 0;
                item.IsTax2IncludedInPrice = taxAmt.IsTax2IncludedInPrice
                  ? taxAmt.IsTax2IncludedInPrice
                  : 0;
                item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : "";
                item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : "";
                item.Tax2Name = taxAmt.Tax2Name ? taxAmt.Tax2Name : "";

                item.Price = item.Price;
                if (!taxAmt.IsTax1IncludedInPrice)
                  tax1ActualAmountTotal += taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0;
                else
                  taxAmountIncludedInPrice += taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0;
                if (!taxAmt.IsTax2IncludedInPrice)
                  tax2ActualAmountTotal += taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0;
                else
                  taxAmountIncludedInPrice += taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0;

                tax1AmountTotal += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                tax2AmountTotal += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
                if (
                  taxAmountIncludedInPrice > 0 ||
                  taxAmt.Tax1Amount > 0 ||
                  taxAmt.Tax2Amount > 0
                ) {
                  let amountAfterTax =
                    amountBeforeDiscount - taxAmountIncludedInPrice;

                  if (amountAfterTax > 0)
                    taxAmt.Price = amountAfterTax / (item.Quantity * 1);
                  else taxAmt.Price = 0; //we will not allow to proceed if price is zero
                } else if (taxAmt.Tax1Amount == 0 && taxAmt.Tax2Amount == 0) {
                  //It means All the group items dont have tax group id
                  if (amountBeforeDiscount > 0)
                    taxAmt.Price = amountBeforeDiscount / (item.Quantity * 1);
                  else taxAmt.Price = 0; //we will not allow to proceed if price is zero
                }
                item.Price = taxAmt.Price;
                item.Tax1Amount = tax1AmountTotal ? tax1AmountTotal : 0;
                item.Tax2Amount = tax2AmountTotal ? tax2AmountTotal : 0;
                tax1AmountTotal = Number(tax1AmountTotal);
                tax2AmountTotal = Number(tax2AmountTotal);
                //
                totaltax1 = taxAmt.Tax1Amount
                  ? totaltax1 + taxAmt.Tax1Amount
                  : totaltax1 + 0;
                totaltax2 = taxAmt.Tax2Amount
                  ? totaltax2 + taxAmt.Tax2Amount
                  : totaltax2 + 0;
                //
                let tax = totaltax1 + totaltax2;
                item.Tax1Code = taxAmt.Tax1Code;
                (item.Tax1Rate = taxAmt.Tax1Percentage
                  ? taxAmt.Tax1Percentage
                  : 0),
                  (item.Tax1Amount = totaltax1),
                  (item.Tax2Rate = taxAmt.Tax2Percentage
                    ? taxAmt.Tax2Percentage
                    : 0),
                  (item.Tax2Amount = totaltax2);
                item.Price = Number(item.PriceOriginal);

                item.PriceWithOutTax = Number(
                  item.Price - inclusiveTax / item?.Quantity
                );
                item.PriceUnitlesstax = Number(item.PriceWithOutTax);
                item.IngredientsArray = [];
                item.IngredientNames = "";
                item.tax = Number(tax);
                if (index == 0) {
                  var amount = amountBeforeDiscount - percentageDiscountAmount;
                } else {
                  amount = item?.GrandAmount;
                }
                // var amount = amountBeforeDiscount - percentageDiscountAmount;
                if (
                  taxAmt.IsTax1IncludedInPrice == false ||
                  taxAmt.IsTax2IncludedInPrice == false
                ) {
                  amount = amount + taxAmt?.Tax1Amount; // txAmts.Tax1Amount;
                }

                item.GrandAmount = Number(amount);
                item.webperamount = Number(item?.PriceWithOutTax);
                sPrice = Number(item?.GrandAmount);
                tPrice = Number(item?.GrandAmount);
                item.SalesInvoiceDetailsID = uuid.v4();
                item.productGroupTaxInfoObj = myArray;
                item.colloctivePrice = colloctivePrice;
              });

              if (item.IsParentAddOn) {
                selectedProduct.push(item);
              } else {
                selectedProduct[item.parentIndex - 1].haveAddon = true;
                selectedProduct.splice(item.parentIndex, 0, item);
              }
              item.groupTaxCodes = groupTaxCodes;
            });
          } else {
            let taxAmountIncludedInPrice = 0;

            let tax1AmountTotal = 0,
              tax1ActualAmountTotal = 0,
              tax2AmountTotal = 0,
              tax2ActualAmountTotal = 0;
            let listOfPG;
            item.Pricefortax = item.PriceOriginal;

            let rr = await getData(SalesFamilySummaryListTable, async (cb) => {
              let groupTaxCodes = cb.filter(
                (x) => x.SalesFamilyCode === item.ProductCode
              );
              listOfPG = groupTaxCodes;
              let totaltax1 = 0;
              let totaltax2 = 0;
              let myArray = [],
                innerProductsArray = [];
              let colloctivePrice = 0,
                inclusiveTax = 0;

              await listOfPG.forEach(async (element, index) => {
                let percentageDiscountAmount = 0;
                let taxGroupID = "";
                let itemQty = 0,
                  itemAmount = 0,
                  itemProposedSalesAmount = 0,
                  itemDiscountAmount = 0,
                  netQty = 0;
                if (item.DiscountAmount > item.Quantity * item.PriceOriginal) {
                  item.DiscountAmount = 0;
                }
                if (item.DiscountRate > 0) {
                  percentageDiscountAmount =
                    (item.PriceOriginal * item.Quantity * item.DiscountRate) /
                    100;
                } else {
                  percentageDiscountAmount = item.DiscountAmount;
                }
                let amountBeforeDiscount = item.PriceOriginal * item.Quantity;
                taxGroupID = element.SaleTaxFamilyCode;
                itemQty = element.Quantity;
                itemAmount = element.Price;
                netQty = item.Quantity * itemQty;
                itemProposedSalesAmount =
                  (itemAmount * amountBeforeDiscount) / item.Pricefortax;
                if (amountBeforeDiscount > 0)
                  itemDiscountAmount =
                    (itemProposedSalesAmount * percentageDiscountAmount) /
                    amountBeforeDiscount;
                let taxAmt = await calculateTaxeGroups(
                  netQty,
                  itemProposedSalesAmount,
                  itemDiscountAmount,
                  taxGroupID,
                  1,
                  null,
                  0,
                  TerminalConfiguration,
                  item.PriceOriginal,
                  item.DiscountRate
                );
                let productGroupTaxInfoObj = {
                  ProductBarCode: element?.ProductBarCode,
                  newTaxAmount: taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0 + taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0,
                  isFixedTax:
                    taxAmt?.Tax1Fragment === 2 || taxAmt?.Tax2Fragment === 2
                      ? true
                      : false,
                  unitPrice: taxAmt.IsTax1IncludedInPrice
                    ? taxAmt.Price
                    : element.Price,
                  proposedPrice: element.Price,
                  taxRate: taxAmt?.Tax1Percentage ? taxAmt.Tax1Percentage : 0,
                  isInclusiveTax:
                    taxAmt?.IsTax1IncludedInPrice === true ||
                    taxAmt?.taxAmt?.IsTax2IncludedInPrice === true
                      ? true
                      : false,
                };
                if (productGroupTaxInfoObj) {
                  colloctivePrice += element?.Price;
                  myArray.push(productGroupTaxInfoObj);
                }
                if (index === listOfPG.length - 1) {
                  for (let i = 0; i < listOfPG.length; i++) {
                    const element = listOfPG[i];
                    await getData(
                      UpdateProductDetailListTable,
                      (productsDetail) => {
                        let findProduct = productsDetail.find(
                          (e) => e.ProductBarCode === element.ProductBarCode
                        );

                        if (findProduct) {
                          let isMatch = listOfPG.find(
                            (e) =>
                              e.ProductBarCode === findProduct.ProductBarCode
                          );
                          let netQuantity =
                            isMatch?.Quantity * element?.Quantity;
                          findProduct.Quantity = netQuantity;
                          findProduct.Price = element?.Price;
                          findProduct.SalesInvoiceDetailsID = uuid.v4();
                          innerProductsArray.push(findProduct);
                        }
                      }
                    );
                  }
                  if (innerProductsArray) {
                    item.innerProductsArray = innerProductsArray;
                  }
                }
                if (taxAmt.IsTax1IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                }
                if (taxAmt.IsTax2IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
                }

                if (!item?.IsParentAddOn) {
                  addonFinalQuantity = item.Quantity * item.OrignalQuantity;
                }
                if (taxAmt.Tax1Fragment == 2 || taxAmt.Tax2Fragment == 2) {
                  taxAmt.Tax1Amount = taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount * item?.Quantity
                    : 0;
                  taxAmt.Tax2Amount = taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount * item?.Quantity
                    : 0;
                }
                (item.Tax1Fragment = taxAmt?.Tax1Fragment
                  ? taxAmt.Tax1Fragment
                  : ""),
                  (item.Tax2Fragment = taxAmt?.Tax2Fragment
                    ? taxAmt.Tax2Fragment
                    : "");
                item.IsTax1IncludedInPrice = taxAmt.IsTax1IncludedInPrice
                  ? taxAmt.IsTax1IncludedInPrice
                  : 0;
                item.IsTax2IncludedInPrice = taxAmt.IsTax2IncludedInPrice
                  ? taxAmt.IsTax2IncludedInPrice
                  : 0;
                item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : "";
                item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : "";
                item.Tax2Name = taxAmt.Tax2Name ? taxAmt.Tax2Name : "";
                item.Price = item.Price;
                if (!taxAmt.IsTax1IncludedInPrice)
                  tax1ActualAmountTotal += taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0;
                else
                  taxAmountIncludedInPrice += taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0;
                if (!taxAmt.IsTax2IncludedInPrice)
                  tax2ActualAmountTotal += taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0;
                else
                  taxAmountIncludedInPrice += taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0;

                tax1AmountTotal += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                tax2AmountTotal += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
                if (
                  taxAmountIncludedInPrice > 0 ||
                  taxAmt.Tax1Amount > 0 ||
                  taxAmt.Tax2Amount > 0
                ) {
                  let amountAfterTax =
                    amountBeforeDiscount - taxAmountIncludedInPrice;

                  if (amountAfterTax > 0)
                    taxAmt.Price = amountAfterTax / (item.Quantity * 1);
                  else taxAmt.Price = 0; //we will not allow to proceed if price is zero
                } else if (taxAmt.Tax1Amount == 0 && taxAmt.Tax2Amount == 0) {
                  //It means All the group items dont have tax group id
                  if (amountBeforeDiscount > 0)
                    taxAmt.Price = amountBeforeDiscount / (item.Quantity * 1);
                  else taxAmt.Price = 0; //we will not allow to proceed if price is zero
                }
                item.Price = taxAmt.Price;
                item.Tax1Amount = tax1AmountTotal ? tax1AmountTotal : 0;
                item.Tax2Amount = tax2AmountTotal ? tax2AmountTotal : 0;
                tax1AmountTotal = Number(tax1AmountTotal);
                tax2AmountTotal = Number(tax2AmountTotal);
                //
                totaltax1 = taxAmt.Tax1Amount
                  ? totaltax1 + taxAmt.Tax1Amount
                  : totaltax1 + 0;
                totaltax2 = taxAmt.Tax2Amount
                  ? totaltax2 + taxAmt.Tax2Amount
                  : totaltax2 + 0;
                //
                let tax = totaltax1 + totaltax2;
                item.Tax1Code = taxAmt.Tax1Code;
                (item.Tax1Rate = taxAmt.Tax1Percentage
                  ? taxAmt.Tax1Percentage
                  : 0),
                  (item.Tax1Amount = totaltax1),
                  (item.Tax2Rate = taxAmt.Tax2Percentage
                    ? taxAmt.Tax2Percentage
                    : 0),
                  (item.Tax2Amount = totaltax2);
                //
                item.Price = Number(item.PriceOriginal);

                item.PriceWithOutTax = Number(
                  item.Price - inclusiveTax / item?.Quantity
                );
                item.PriceUnitlesstax = Number(item.PriceWithOutTax);
                item.IngredientsArray = [];
                item.IngredientNames = "";
                item.tax = Number(tax);
                var amount =
                  item.GrandAmount !== 0
                    ? item.GrandAmount
                    : amountBeforeDiscount - percentageDiscountAmount;
                if (
                  taxAmt.IsTax1IncludedInPrice == false ||
                  taxAmt.IsTax2IncludedInPrice == false
                ) {
                  amount = amount + taxAmt?.Tax1Amount; // txAmts.Tax1Amount;
                  // item.webperamount = item.PriceOriginal;
                }
                // if (taxAmt.IsTax2IncludedInPrice == false) {
                //   amount = amount + item?.tax; //txAmts.Tax2Amount;
                //   // item.webperamount = item.PriceOriginal;
                // }
                // if (taxAmt.IsTax2IncludedInPrice == true) {
                //   // item.webperamount =
                //   //   item.PriceOriginal - totaltax2 / item.Quantity;
                // }
                // if (
                //   taxAmt.IsTax1IncludedInPrice == true &&
                //   item.PriceOriginal !== 0
                // ) {
                //   item.webperamount =
                //     item.PriceOriginal - tax1AmountTotal / item.Quantity;
                // }

                item.GrandAmount = Number(amount);
                item.webperamount = Number(item?.PriceWithOutTax);

                sPrice = Number(item?.GrandAmount);
                tPrice = Number(item?.GrandAmount);

                item.SalesInvoiceDetailsID = uuid.v4();
                item.productGroupTaxInfoObj = myArray;
                item.colloctivePrice = colloctivePrice;
              });

              if (item.IsParentAddOn) {
                selectedProduct.push(item);
              } else {
                selectedProduct[item.parentIndex - 1].haveAddon = true;
                selectedProduct.splice(item.parentIndex, 0, item);
              }
              item.groupTaxCodes = groupTaxCodes;
            });
          }
        } else {
          let taxAmt = await calculateTaxeGroups(
            item.Quantity,
            Amount,
            item.DiscountAmount,
            item.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            item.PriceOriginal,
            item.DiscountRate
          );
          console.log("calculateTaxeGroups...", taxAmt, item);
          //  Tax 1 details
          item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
          (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
            (item.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
            (item.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (item.Tax1Fragment = taxAmt.Tax1Fragment
              ? taxAmt.Tax1Fragment
              : "");
          (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
            //  Tax 2 details
            (item.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
            (item.Tax2Rate = taxAmt?.Tax2Percentage
              ? taxAmt?.Tax2Percentage
              : 0),
            (item.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
          item.Tax2Fragment = taxAmt.Tax2Fragment ? taxAmt.Tax2Fragment : "";

          if (
            (!item?.IsParentAddOn && item.Tax1Fragment == 2) ||
            item?.Tax2Fragment === 2
          ) {
            addonFinalQuantity = item.Quantity * item.OrignalQuantity;
          }
          if (
            (!item?.IsParentAddOn && item.Tax1Fragment == 2) ||
            item?.Tax2Fragment === 2
          ) {
            item.Tax1Amount = item.Tax1Amount * addonFinalQuantity;
            item.Tax2Amount = item.Tax2Amount * addonFinalQuantity;
          }
          let tax = item.Tax1Amount + item.Tax2Amount;
          item.Price = Number(taxAmt.Price + tax);
          item.PriceWithOutTax = Number(taxAmt.Price);
          item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice
            ? true
            : false;
          item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice
            ? true
            : false;
          item.IngredientsArray = [];
          item.IngredientNames = "";
          item.tax = Number(tax);
          item.GrandAmount =
            Number(taxAmt.Price * item.Quantity) + tax - item.DiscountAmount;
          item.SalesInvoiceDetailsID = uuid.v4();
          sPrice = Number(subPrice + taxAmt.Price * item.Quantity + tax);
          tPrice = Number(totalPrice + taxAmt.Price * item.Quantity + tax);
          if (item.IsParentAddOn) {
            selectedProduct.push(item);
          } else {
            selectedProduct[item.parentIndex - 1].haveAddon = true;
            selectedProduct.splice(item.parentIndex, 0, item);
          }
        }
      } else {
        if (type === "addnos") {
          sPrice = Number(subPrice + SP);
          tPrice = Number(totalPrice + TP);
          selectedProduct = selectedProduct.concat(proArray);
        } else {
          sPrice = Number(subPrice + item.GrandAmount - item.DiscountAmount);
          tPrice = Number(totalPrice + item.GrandAmount - item.DiscountAmount);

          if (item.IsParentAddOn) {
            selectedProduct.push(item);
          } else {
            if (!isReturnInvoice) {
              selectedProduct[item.parentIndex - 1].haveAddon = true;
              selectedProduct.splice(item.parentIndex, 0, item);
            } else {
              selectedProduct.push(item);
            }
          }
        }
      }
    }
    if (executeCalculation) {
      localIndex = undefined;
      setTimeout(() => {
        setStateUpdate(true);
        let p = [...selectedProduct];
        // list.products = p;
        finalCalculation(p);
        let srNo = 1;
        selectedProduct.forEach((e) => {
          if (e.IsParentAddOn) {
            e.srNo = srNo++;
          } else {
            e.srNo = 0;
          }
        });
        setSelectedProducts(selectedProduct);
        console.log("selected products", selectedProduct);
      }, 200);
    }
  };

  const updateProductToList = async (itm, type, index, proArray, SP, TP) => {
    setLoading(true);
    setPrintType(null);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let executeCalculation = true;
    let addonFinalQuantity = 0;
    let localIndex;
    let groupType = "";
    let item = { ...itm },
      selectedProduct = [...selectedProducts],
      sPrice = subPrice,
      tPrice = totalPrice;
    item.ProductNote = itm?.ProductNote;
    if (terminalSetup?.BeepSound === "true") {
      SoundPlay();
    }
    if (retunProducts.length > 0 && !itm.IsParentAddOn) {
      let retp = [...retunProducts];
      retp.splice(index, 1);
      setReturnProducts(retp);
    }
    let isAlredySelected = false;
    localIndex = index;
    if (selectedProducts.length > 0) {
      let newQuantity;

      let isProductExist = selectedProducts.find(
        (x) =>
          x?.ProductBarCode === item?.ProductBarCode &&
          x?.PriceOriginal === item?.PriceOriginal &&
          x.haveAddon == true
      );

      if (isProductExist && !isToggle) {
        let sameProductWithoutAddon = selectedProducts.findIndex(
          (x) =>
            x?.ProductBarCode === item?.ProductBarCode &&
            x?.PriceOriginal === item?.PriceOriginal &&
            x.haveAddon == undefined
        );
        if (sameProductWithoutAddon) {
          item.addAsNew = false;
          localIndex = sameProductWithoutAddon;
        } else {
          item.addAsNew = true;
        }
      } else {
        item.addAsNew = false;
      }
      if (
        item.addAsNew === false &&
        selectedProduct?.Price &&
        item?.PriceOriginal
      ) {
        for (let i = 0; i < selectedProduct.length; i++) {
          let product = selectedProduct[i];

          let ind;
          if (localIndex == undefined) {
            ind = i;
          } else {
            ind = localIndex;
          }

          if (
            i === ind ||
            (product?.AddOnParentSalesInvoiceDetailsID ===
              item.SalesInvoiceDetailsID &&
              type !== "returnInvoice")
          ) {
            if (
              product?.ProductBarCode === item?.ProductBarCode &&
              product?.PriceOriginal === item?.PriceOriginal
            ) {
              newQuantity =
                type !== "increment"
                  ? product.Quantity - 1
                  : product.Quantity + 1;
            }

            if (
              ((product?.ProductBarCode === item?.ProductBarCode &&
                product?.PriceOriginal === item?.PriceOriginal) ||
                product?.AddOnParentSalesInvoiceDetailsID ===
                  item.SalesInvoiceDetailsID ||
                item.OrderDetailCode ===
                  product.AddOnParentSalesInvoiceDetailsID) &&
              type !== "returnInvoice"
            ) {
              if (
                product?.AddOnParentSalesInvoiceDetailsID ===
                item.SalesInvoiceDetailsID
              ) {
                groupType = "addon";
              }
              let discount = 0;
              isAlredySelected = true;
              let Amount = Number(product.PriceOriginal * newQuantity),
                pd = product.DiscountAmount ? product.DiscountAmount : 0,
                dr = product.DiscountRate ? product.DiscountRate : 0;
              if (pd >= Amount && printType === null) {
                pd = 0;
              }

              product.DiscountAmount = pd;
              // console.log("Amount.....", newQuantity, Amount, product.DiscountAmount, product.TaxGroupID, 1, null, 0, product.PriceOriginal, product.DiscountRate, product.ProductName)
              let taxAmt;

              if (product.ProductType === 3) {
                if (printType === "returnInvoice") {
                  let totalQuantity =
                    product?.Quantity + product?.ReturnedQuantity;
                  let discountAfterDivision = Number(
                    (item.DiscountAmount / totalQuantity) * newQuantity
                  );
                  if (product.DiscountRate > 0) {
                    pd = product.DiscountAmount;
                  } else {
                    pd = discountAfterDivision;
                  }
                }
                executeCalculation = false;
                if (groupType === "addon") {
                  if (!product?.IsParentAddOn) {
                    addonFinalQuantity = newQuantity * product.OrignalQuantity;
                    pd = 0;
                  }
                  changeProductGroupAddon(
                    itm,
                    product,
                    type,
                    addonFinalQuantity,
                    Number(dr),
                    Number(pd),
                    printType
                  );
                } else {
                  changeProductGroupItem(itm, type, newQuantity, dr, pd);
                }
              } else {
                if (printType === "returnInvoice") {
                  let totalQuantity =
                    product?.Quantity + product?.ReturnedQuantity;
                  let discountAfterDivision = Number(
                    (item.DiscountAmount / totalQuantity) * newQuantity
                  );
                  if (product.DiscountRate > 0) {
                    pd = product.DiscountAmount;
                  } else {
                    pd = discountAfterDivision;
                  }
                }
                if (!product?.IsParentAddOn) {
                  addonFinalQuantity = newQuantity * product.OrignalQuantity;
                  pd = 0;
                }

                taxAmt = await calculateTaxeGroups(
                  product.IsParentAddOn ? newQuantity : addonFinalQuantity,
                  Amount,
                  pd,
                  product.TaxGroupID,
                  1,
                  null,
                  0,
                  TerminalConfiguration,
                  product.PriceOriginal,
                  dr
                );

                console.log("Amount.....taxAmt", taxAmt);
                product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
                  (product.Tax1Rate = taxAmt.Tax1Percentage
                    ? taxAmt.Tax1Percentage
                    : 0);

                if (product.Tax1Fragment == 2 || product.Tax2Fragment == 2) {
                  taxAmt.Tax1Amount = product.IsParentAddOn
                    ? taxAmt.Tax1Amount * newQuantity
                    : taxAmt.Tax1Amount * addonFinalQuantity;
                  taxAmt.DiscountAmount = product.DiscountRate
                    ? (product.PriceOriginal *
                        newQuantity *
                        product.DiscountRate) /
                      100
                    : pd;
                } else {
                  taxAmt.DiscountAmount = product.DiscountRate
                    ? (product.PriceOriginal *
                        newQuantity *
                        product.DiscountRate) /
                      100
                    : pd;
                }
                product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;

                (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
                  (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
                  (product.Tax2Rate = taxAmt?.Tax2Percentage
                    ? taxAmt?.Tax2Percentage
                    : 0);

                product.Tax2Amount = taxAmt?.Tax2Amount
                  ? taxAmt?.Tax2Amount
                  : 0;

                if (type === "increment") {
                  if (taxAmt) {
                    let proQ;

                    if (!product.IsParentAddOn) {
                      proQ =
                        type === "increment"
                          ? (newQuantity - 1) * product.OrignalQuantity
                          : newQuantity * product.OrignalQuantity;
                    } else {
                      proQ =
                        type === "increment" ? newQuantity - 1 : newQuantity;
                    }
                    // console.log("proQ !== product.maxQuantity...", proQ, newQuantity, product)
                    if (
                      proQ === product.maxQuantity &&
                      printType === "returnInvoice"
                    ) {
                      product.Tax1Amount = product.tax;
                    }
                    if (proQ !== product.maxQuantity) {
                      let totalQuantity =
                        product?.Quantity + product?.ReturnedQuantity;
                      product.Quantity = newQuantity;
                      let discountAfterDivision = Number(
                        (item.DiscountAmount / totalQuantity) * newQuantity
                      );
                      if (
                        printType === "returnInvoice" &&
                        product.IsParentAddOn &&
                        product.DiscountRate === 0
                      ) {
                        discount = discountAfterDivision;
                      } else if (dr > 0) {
                        discount = taxAmt.DiscountAmount
                          ? taxAmt.DiscountAmount
                          : parseFloat(
                              (dr *
                                (product.PriceWithOutTax * newQuantity +
                                  taxAmt.Tax1Amount)) /
                                100
                            );
                      } else {
                        discount = product.DiscountAmount;
                      }
                      let GAmount = 0;
                      if (
                        taxAmt.calculationId === 9 ||
                        taxAmt.calculationId === 1
                      ) {
                        GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
                      } else {
                        GAmount = !product.IsTax1IncludedInPrice
                          ? Number(
                              product.PriceOriginal * product.Quantity -
                                discount +
                                taxAmt.Tax1Amount
                            )
                          : Number(
                              product.PriceOriginal * product.Quantity -
                                discount
                            );
                      }
                      product.GrandAmount = Number(GAmount);
                      discount = Number(discount);
                      product.DiscountAmount = discount.toFixed(2);
                      product.tax = product.Tax1Amount + product.Tax2Amount;
                      executeCalculation = true;
                    } else {
                      setMessage(props.StringsList._230);
                      setDisplayAlert(true);
                      setLoading(false);
                    }
                  }
                } else if (type === "decrement") {
                  let totalQuantity =
                    product?.Quantity + product?.ReturnedQuantity;
                  product.Quantity = newQuantity;
                  let discountAfterDivision = Number(
                    (item.DiscountAmount / totalQuantity) * newQuantity
                  );
                  if (
                    printType === "returnInvoice" &&
                    product.IsParentAddOn &&
                    product.DiscountRate === 0
                  ) {
                    discount = discountAfterDivision;
                  } else {
                    discount = taxAmt.DiscountAmount
                      ? taxAmt.DiscountAmount
                      : parseFloat(
                          (dr *
                            (product.PriceWithOutTax * newQuantity +
                              taxAmt.Tax1Amount)) /
                            100
                        );
                  }
                  let GAmount = 0;
                  if (
                    taxAmt.calculationId === 9 ||
                    taxAmt.calculationId === 1
                  ) {
                    GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
                  } else {
                    GAmount = !product.IsTax1IncludedInPrice
                      ? Number(
                          product.PriceOriginal * product.Quantity -
                            discount +
                            taxAmt.Tax1Amount
                        )
                      : Number(
                          product.PriceOriginal * product.Quantity - discount
                        );
                  }
                  product.GrandAmount = Number(GAmount);
                  if (printType === "returnInvoice" && !product.IsParentAddOn) {
                    discount = Number(0);
                  } else {
                    discount = Number(discount);
                  }

                  product.DiscountAmount = discount.toFixed(2);
                  product.tax = product.Tax1Amount + product.Tax2Amount;
                  executeCalculation = true;
                }
              }
            }
          }
        }
      }
    } else {
      let time = moment().format("HH:mm:ss");
      setStartTime(time);
    }
    if (!isAlredySelected) {
      if (!isReturnInvoice) {
        if (item.parentQuantity > 0) {
          item.Quantity = item.parentQuantity;
        } else {
          item.Quantity = item.Quantity;
        }

        if (item.ProductType === 3) {
          if (!item?.IsParentAddOn) {
            let listOfPG;
            item.Pricefortax = item.PriceOriginal;

            let rr = await getData(SalesFamilySummaryListTable, async (cb) => {
              let groupTaxCodes = cb.filter(
                (x) => x.SalesFamilyCode === item.ProductCode
              );
              listOfPG = groupTaxCodes;

              let totaltax1 = 0;
              let totaltax2 = 0;
              let myArray = [];
              let colloctivePrice = 0,
                inclusiveTax = 0;

              await listOfPG.forEach(async (element, index) => {
                let isUpdatedGroup = false;
                let percentageDiscountAmount = 0;
                let taxGroupID = "";
                let itemQty = 0,
                  itemAmount = 0,
                  itemProposedSalesAmount = 0,
                  itemDiscountAmount = 0,
                  netQty = 0,
                  tamount = 0,
                  totalTax = 0,
                  totalPrice = 0,
                  totalInclusiveTax = 0,
                  totalDiscount = 0;

                if (item.DiscountRate > 0) {
                  item.DiscountRate = item.DiscountRate;
                  percentageDiscountAmount = item.DiscountAmount;
                  item.DiscountAmount = percentageDiscountAmount;
                } else {
                  percentageDiscountAmount = item.DiscountAmount;
                  item.DiscountAmount = percentageDiscountAmount;
                }

                let amountBeforeDiscount = item.PriceOriginal * item.Quantity;
                taxGroupID = element.SaleTaxFamilyCode;
                itemQty = element.Quantity;
                itemAmount = element.Price;
                netQty = item.Quantity * itemQty;
                itemProposedSalesAmount =
                  (itemAmount * amountBeforeDiscount) / item.Pricefortax;
                if (amountBeforeDiscount > 0) {
                  itemDiscountAmount =
                    (itemProposedSalesAmount * percentageDiscountAmount) /
                    amountBeforeDiscount;
                }

                let taxAmt = await calculateTaxeGroups(
                  netQty,
                  itemProposedSalesAmount,
                  itemDiscountAmount,
                  taxGroupID,
                  1,
                  null,
                  0,
                  TerminalConfiguration,
                  item.PriceOriginal,
                  item.DiscountRate
                );
                let productGroupTaxInfoObj = {
                  ProductBarCode: element?.ProductBarCode,
                  newTaxAmount: taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0 + taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0,
                  isFixedTax:
                    taxAmt?.Tax1Fragment === 2 || taxAmt?.Tax2Fragment === 2
                      ? true
                      : false,
                  unitPrice: taxAmt.IsTax1IncludedInPrice
                    ? taxAmt.Price
                    : element.Price,
                  proposedPrice: element.Price,
                  taxRate: taxAmt?.Tax1Percentage ? taxAmt.Tax1Percentage : 0,
                  isInclusiveTax:
                    taxAmt?.IsTax1IncludedInPrice === true ||
                    taxAmt?.taxAmt?.IsTax2IncludedInPrice === true
                      ? true
                      : false,
                };
                if (productGroupTaxInfoObj) {
                  colloctivePrice += element?.Price;
                  myArray.push(productGroupTaxInfoObj);
                  item.productGroupTaxInfoObj = myArray;
                  item.colloctivePrice = colloctivePrice;
                }

                if (taxAmt.IsTax1IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                }
                if (taxAmt.IsTax2IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
                }

                if (taxAmt.Tax1Fragment == 2 || taxAmt.Tax2Fragment == 2) {
                  taxAmt.Tax1Amount = taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount * item?.Quantity
                    : 0;
                  taxAmt.Tax2Amount = taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount * item?.Quantity
                    : 0;
                }

                // tax 1 details
                item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : "";
                item.Tax1Amount = totalTax;
                item.Tax1Rate = taxAmt.Tax1Percentage
                  ? taxAmt.Tax1Percentage
                  : 0;
                item.IsTax1IncludedInPrice =
                  taxAmt.IsTax1IncludedInPrice === true ||
                  taxAmt.IsTax1IncludedInPrice === 1
                    ? true
                    : false;
                item.Tax1Fragment = taxAmt?.Tax1Fragment
                  ? taxAmt.Tax1Fragment
                  : "";
                // tax 2 details
                item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : "";
                item.Tax2Name = taxAmt.Tax2Name ? taxAmt.Tax2Name : "";

                item.Tax2Fragment = taxAmt?.Tax2Fragment
                  ? taxAmt.Tax2Fragment
                  : "";

                item.IsTax12ncludedInPrice =
                  taxAmt.IsTax2IncludedInPrice === true ||
                  taxAmt.IsTax2IncludedInPrice === 1
                    ? true
                    : false;
                item.Tax2Rate = taxAmt.Tax2Percentage
                  ? taxAmt.Tax2Percentage
                  : 0;
                item.Tax2Amount = totaltax2;

                totaltax1 = taxAmt.Tax1Amount
                  ? totaltax1 + taxAmt.Tax1Amount
                  : totaltax1 + 0;
                totaltax2 = taxAmt.Tax2Amount
                  ? totaltax2 + taxAmt.Tax2Amount
                  : totaltax2 + 0;
                //
                let tax = totaltax1 + totaltax2;
                console.log(tax);
                //
                item.Price = Number(item.PriceOriginal);

                item.IngredientsArray = [];
                item.IngredientNames = "";

                if (item.productGroupTaxInfoObj.length === listOfPG.length) {
                  isUpdatedGroup = true;
                }

                if (isUpdatedGroup) {
                  item.productGroupTaxInfoObj.forEach((element) => {
                    let itemProposedAmount =
                      ((element.proposedPrice * item.Quantity) /
                        (item.Pricefortax * item.Quantity)) *
                      (item.PriceOriginal * item.Quantity);
                    //  let itemDiscountAmount = (element.proposedPrice / itemDetails.SellingPrice) * psalesInvoiceDetail.DiscountAmount;
                    let itemDiscountWeight =
                      (itemProposedAmount /
                        (item.PriceOriginal * item.Quantity)) *
                      percentageDiscountAmount;
                    totalDiscount += Number(itemDiscountWeight);
                    let afterDiscountAmount = 0;
                    if (element.isInclusiveTax) {
                      let inclTax =
                        (itemProposedAmount / (100 + element.taxRate)) *
                        element.taxRate;
                      totalInclusiveTax += Number(
                        inclTax /
                          item?.Quantity.toFixed(
                            TerminalConfiguration.DecimalsInAmount
                          )
                      );
                      let pureAmount = itemProposedAmount - inclTax;
                      afterDiscountAmount = pureAmount - itemDiscountWeight;
                    } else {
                      afterDiscountAmount =
                        itemProposedAmount - itemDiscountWeight;
                    }
                    if (!element.isFixedTax) {
                      let taxPrice =
                        (element.taxRate / 100) * afterDiscountAmount;
                      totalPrice += afterDiscountAmount + taxPrice;
                      totalTax += taxPrice;
                    }
                    if (element.isFixedTax) {
                      let fixtax = element.newTaxAmount * item.Quantity;
                      totalPrice += fixtax + afterDiscountAmount;
                      totalTax = totalTax + fixtax;
                    }
                    item.Tax1Amount = totalTax;
                    tamount += element?.unitPrice;
                    item.tax = Number(totalTax);
                  });
                  // }
                  if (item?.IsTax1IncludedInPrice) {
                    item.PriceWithOutTax = Number(
                      item?.PriceOriginal - totalInclusiveTax
                    );
                  } else {
                    item.PriceWithOutTax = Number(
                      item?.PriceOriginal - totalInclusiveTax
                    );
                    // item.PriceWithOutTax = Number(tamount);
                  }

                  item.PriceUnitlesstax = Number(item.PriceWithOutTax);
                  item.webperamount = Number(item?.PriceWithOutTax);
                  item.GrandAmount = Number(totalPrice);
                  sPrice = Number(item?.GrandAmount);
                  tPrice = Number(item?.GrandAmount);
                }
              });

              if (item.IsParentAddOn) {
                selectedProduct.push(item);
              } else {
                selectedProduct[item.parentIndex - 1].haveAddon = true;
                selectedProduct.splice(item.parentIndex, 0, item);
              }
              item.groupTaxCodes = groupTaxCodes;
            });
          } else {
            let listOfPG;
            let rr = await getData(SalesFamilySummaryListTable, async (cb) => {
              let groupTaxCodes = cb.filter(
                (x) => x.SalesFamilyCode === item.ProductCode
              );
              await getData(UpdateProductDetailListTable, (productsDetail) => {
                let findProduct = productsDetail.find(
                  (e) => e.ProductBarCode === item.ProductBarCode
                );
                if (findProduct) {
                  item.Pricefortax = findProduct.PriceOriginal;
                }
              });
              listOfPG = groupTaxCodes;

              let totaltax1 = 0;
              let totaltax2 = 0;
              let myArray = [],
                innerProductsArray = [];
              let colloctivePrice = 0,
                inclusiveTax = 0;

              await listOfPG.forEach(async (element, index) => {
                let isUpdatedGroup = false;
                let percentageDiscountAmount = 0;
                let taxGroupID = "";
                let itemQty = 0,
                  itemAmount = 0,
                  itemProposedSalesAmount = 0,
                  itemDiscountAmount = 0,
                  netQty = 0,
                  tamount = 0,
                  totalTax = 0,
                  totalPrice = 0,
                  totalInclusiveTax = 0,
                  totalDiscount = 0;

                if (item.DiscountRate > 0) {
                  item.DiscountRate = item.DiscountRate;
                  percentageDiscountAmount = item.DiscountAmount;
                  item.DiscountAmount = percentageDiscountAmount;
                } else {
                  percentageDiscountAmount = item.DiscountAmount;
                  item.DiscountAmount = percentageDiscountAmount;
                }

                let amountBeforeDiscount = item.PriceOriginal * item.Quantity;
                taxGroupID = element.SaleTaxFamilyCode;
                itemQty = element.Quantity;
                itemAmount = element.Price;
                netQty = item.Quantity * itemQty;
                itemProposedSalesAmount =
                  (itemAmount * amountBeforeDiscount) / item.Pricefortax;
                if (amountBeforeDiscount > 0) {
                  itemDiscountAmount =
                    (itemProposedSalesAmount * percentageDiscountAmount) /
                    amountBeforeDiscount;
                }

                let taxAmt = await calculateTaxeGroups(
                  netQty,
                  itemProposedSalesAmount,
                  itemDiscountAmount,
                  taxGroupID,
                  1,
                  null,
                  0,
                  TerminalConfiguration,
                  item.PriceOriginal,
                  item.DiscountRate
                );
                let productGroupTaxInfoObj = {
                  ProductBarCode: element?.ProductBarCode,
                  newTaxAmount: taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0 + taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0,
                  isFixedTax:
                    taxAmt?.Tax1Fragment === 2 || taxAmt?.Tax2Fragment === 2
                      ? true
                      : false,
                  unitPrice: taxAmt.IsTax1IncludedInPrice
                    ? taxAmt.Price
                    : element.Price,
                  proposedPrice: element.Price,
                  taxRate: taxAmt?.Tax1Percentage ? taxAmt.Tax1Percentage : 0,
                  isInclusiveTax:
                    taxAmt?.IsTax1IncludedInPrice === true ||
                    taxAmt?.taxAmt?.IsTax2IncludedInPrice === true
                      ? true
                      : false,
                };

                if (productGroupTaxInfoObj) {
                  colloctivePrice += element?.Price;
                  myArray.push(productGroupTaxInfoObj);
                  item.productGroupTaxInfoObj = myArray;
                  item.colloctivePrice = colloctivePrice;
                }
                if (index === listOfPG.length - 1) {
                  for (let i = 0; i < listOfPG.length; i++) {
                    const element = listOfPG[i];
                    await getData(
                      UpdateProductDetailListTable,
                      (productsDetail) => {
                        let findProduct = productsDetail.find(
                          (e) => e.ProductBarCode === element.ProductBarCode
                        );

                        if (findProduct) {
                          let isMatch = listOfPG.find(
                            (e) =>
                              e.ProductBarCode === findProduct.ProductBarCode
                          );
                          let netQuantity =
                            isMatch?.Quantity * element?.Quantity;
                          findProduct.Quantity = netQuantity;
                          findProduct.Price = element?.Price;
                          findProduct.SalesInvoiceDetailsID = uuid.v4();
                          innerProductsArray.push(findProduct);
                        }
                      }
                    );
                  }
                  if (innerProductsArray) {
                    item.innerProductsArray = innerProductsArray;
                  }
                }
                if (taxAmt.IsTax1IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                }
                if (taxAmt.IsTax2IncludedInPrice === true) {
                  inclusiveTax += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
                }

                if (taxAmt.Tax1Fragment == 2 || taxAmt.Tax2Fragment == 2) {
                  taxAmt.Tax1Amount = taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount * item?.Quantity
                    : 0;
                  taxAmt.Tax2Amount = taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount * item?.Quantity
                    : 0;
                }

                // tax 1 details
                item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : "";
                item.Tax1Amount = totalTax;
                item.Tax1Rate = taxAmt.Tax1Percentage
                  ? taxAmt.Tax1Percentage
                  : 0;
                item.IsTax1IncludedInPrice =
                  taxAmt.IsTax1IncludedInPrice === true ||
                  taxAmt.IsTax1IncludedInPrice === 1
                    ? true
                    : false;
                item.Tax1Fragment = taxAmt?.Tax1Fragment
                  ? taxAmt.Tax1Fragment
                  : "";
                // tax 2 details
                item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : "";
                item.Tax2Name = taxAmt.Tax2Name ? taxAmt.Tax2Name : "";

                item.Tax2Fragment = taxAmt?.Tax2Fragment
                  ? taxAmt.Tax2Fragment
                  : "";

                item.IsTax12ncludedInPrice =
                  taxAmt.IsTax2IncludedInPrice === true ||
                  taxAmt.IsTax2IncludedInPrice === 1
                    ? true
                    : false;
                item.Tax2Rate = taxAmt.Tax2Percentage
                  ? taxAmt.Tax2Percentage
                  : 0;
                item.Tax2Amount = totaltax2;

                totaltax1 = taxAmt.Tax1Amount
                  ? totaltax1 + taxAmt.Tax1Amount
                  : totaltax1 + 0;
                totaltax2 = taxAmt.Tax2Amount
                  ? totaltax2 + taxAmt.Tax2Amount
                  : totaltax2 + 0;
                //
                let tax = totaltax1 + totaltax2;
                console.log(tax);
                //
                item.Price = Number(item.PriceOriginal);

                item.IngredientsArray = [];
                item.IngredientNames = "";

                if (item.productGroupTaxInfoObj.length === listOfPG.length) {
                  isUpdatedGroup = true;
                }

                if (isUpdatedGroup) {
                  item.productGroupTaxInfoObj.forEach((element) => {
                    let itemProposedAmount =
                      ((element.proposedPrice * item.Quantity) /
                        (item.Pricefortax * item.Quantity)) *
                      (item.PriceOriginal * item.Quantity);
                    let itemDiscountWeight =
                      (itemProposedAmount /
                        (item.PriceOriginal * item.Quantity)) *
                      item?.DiscountAmount;
                    totalDiscount += Number(itemDiscountWeight);
                    let afterDiscountAmount = 0;
                    if (element.isInclusiveTax) {
                      let inclTax =
                        (itemProposedAmount / (100 + element.taxRate)) *
                        element.taxRate;
                      totalInclusiveTax += Number(
                        inclTax /
                          item?.Quantity.toFixed(
                            TerminalConfiguration.DecimalsInAmount
                          )
                      );
                      let pureAmount = itemProposedAmount - inclTax;
                      afterDiscountAmount = pureAmount - itemDiscountWeight;
                    } else {
                      afterDiscountAmount =
                        itemProposedAmount - itemDiscountWeight;
                    }
                    if (!element.isFixedTax) {
                      let taxPrice =
                        (element.taxRate / 100) * afterDiscountAmount;
                      totalPrice += afterDiscountAmount + taxPrice;
                      totalTax += taxPrice;
                    }
                    if (element.isFixedTax) {
                      let fixtax = element.newTaxAmount * item.Quantity;
                      totalPrice += fixtax + afterDiscountAmount;
                      totalTax = totalTax + fixtax;
                    }
                    item.Tax1Amount = totalTax;
                    tamount += element?.unitPrice;
                    item.tax = Number(totalTax);
                  });
                  // }
                  if (item?.IsTax1IncludedInPrice) {
                    item.PriceWithOutTax = Number(
                      item?.PriceOriginal - totalInclusiveTax
                    );
                  } else {
                    item.PriceWithOutTax = Number(
                      item?.PriceOriginal - totalInclusiveTax
                    );
                  }

                  item.PriceUnitlesstax = Number(item.PriceWithOutTax);
                  item.webperamount = Number(item?.PriceWithOutTax);
                  item.GrandAmount = Number(totalPrice);
                  sPrice = Number(item?.GrandAmount);
                  tPrice = Number(item?.GrandAmount);
                }
              });

              if (item.IsParentAddOn) {
                selectedProduct.push(item);
              } else {
                selectedProduct[item.parentIndex - 1].haveAddon = true;
                selectedProduct.splice(item.parentIndex, 0, item);
              }
              item.groupTaxCodes = groupTaxCodes;
            });
          }
        } else {
          let Amount = Number(item.PriceOriginal) * item.Quantity;
          item.TaxGroupID = !item?.IsParentAddOn
            ? item.SaleTaxGroupCode
            : item.TaxGroupID;
          let taxAmt = await calculateTaxeGroups(
            item.Quantity,
            Amount,
            item.DiscountAmount,
            item.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            item.PriceOriginal,
            item.DiscountRate
          );

          console.log("calculateTaxeGroups...", taxAmt);

          //  Tax 1 details
          item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
          (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
            (item.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
            (item.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (item.Tax1Fragment = taxAmt.Tax1Fragment
              ? taxAmt.Tax1Fragment
              : "");
          (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
            //  Tax 2 details
            (item.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
            (item.Tax2Rate = taxAmt?.Tax2Percentage
              ? taxAmt?.Tax2Percentage
              : 0),
            (item.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
          item.Tax2Fragment = taxAmt.Tax2Fragment ? taxAmt.Tax2Fragment : "";

          if (
            (!item?.IsParentAddOn && item.Tax1Fragment == 2) ||
            item?.Tax2Fragment === 2
          ) {
            addonFinalQuantity = item.Quantity * item.OrignalQuantity;
          }
          if (
            (!item?.IsParentAddOn && item.Tax1Fragment == 2) ||
            item?.Tax2Fragment === 2
          ) {
            item.Tax1Amount = item.Tax1Amount * addonFinalQuantity;
            item.Tax2Amount = item.Tax2Amount * addonFinalQuantity;
          } else if (
            (item?.IsParentAddOn && item?.Tax1Fragment == 2) ||
            item?.Tax2Fragment === 2
          ) {
            item.Tax1Amount = item.Tax1Amount * item?.Quantity;
            item.Tax2Amount = item.Tax2Amount * item?.Quantity;
          }
          let tax = item.Tax1Amount + item.Tax2Amount;
          item.Price = Number(taxAmt.Price + tax);
          item.PriceWithOutTax = Number(taxAmt.Price);
          item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice
            ? true
            : false;
          item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice
            ? true
            : false;
          item.IngredientsArray = [];
          item.IngredientNames = "";
          item.tax = Number(tax);
          item.GrandAmount =
            Number(taxAmt.Price * item.Quantity) + tax - item.DiscountAmount;

          sPrice = Number(subPrice + taxAmt.Price * item.Quantity + tax);
          tPrice = Number(totalPrice + taxAmt.Price * item.Quantity + tax);
          if (item.IsParentAddOn) {
            selectedProduct.push(item);
          } else {
            selectedProduct[item.parentIndex - 1].haveAddon = true;
            selectedProduct.splice(item.parentIndex, 0, item);
          }
        }
      } else {
        if (type === "addnos") {
          sPrice = Number(subPrice + SP);
          tPrice = Number(totalPrice + TP);
          selectedProduct = selectedProduct.concat(proArray);
        } else {
          sPrice = Number(subPrice + item.GrandAmount - item.DiscountAmount);
          tPrice = Number(totalPrice + item.GrandAmount - item.DiscountAmount);

          if (item.IsParentAddOn) {
            selectedProduct.push(item);
          } else {
            if (!isReturnInvoice) {
              selectedProduct[item.parentIndex - 1].haveAddon = true;
              selectedProduct.splice(item?.parentIndex, 0, item);
            } else {
              selectedProduct.push(item);
            }
          }
        }
      }
    }
    if (executeCalculation) {
      setTimeout(() => {
        setStateUpdate(true);
        let p = [...selectedProduct];
        finalUpdatedCalculation(p);
        setSelectedProducts(selectedProduct);
        setTimeout(() => {
          setProductIndex(productIndex + 1);
        }, 1000);
        console.log("Fetch order products", selectedProduct);
      }, 2000);
    }
  };
  const onManuallyAddDiscount = async (item, type) => {
    let IsUpdated = false;
    if (showButton === true && orderCode === false && printType === null) {
      IsUpdated = true;
    }

    item.IsUpdated = IsUpdated;
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let pDiscount;
    item.DiscountAmount = Number(item.DiscountAmount);
    let dP = 0; //item.DiscountRate
    let dA = 0; //item.DiscountAmount
    let amtDisP = 0,
      pAmtP = 0;
    let percentageDiscountAmount = 0,
      amount = 0;
    pGL = item.groupTaxCodes;
    amount = Number(item?.PriceWithOutTax * item?.Quantity);

    if (type === "DiscountRate") {
      dA = manuallyCount === 0 ? manuallyCount : item.DiscountAmount;
      dP = manuallyCount;
      percentageDiscountAmount =
        (item.webperamount * item.Quantity * manuallyCount) / 100;
    } else {
      dA = manuallyCount > amount ? 0 : manuallyCount;
      dP = 0;
      percentageDiscountAmount = dA;
    }
    if (item.ProductType === 3) {
      let totalTax = 0,
        totalPrice = 0;
      item.productGroupTaxInfoObj.forEach((element) => {
        let itemProposedAmount =
          ((element.proposedPrice * item.Quantity) /
            (item.Pricefortax * item.Quantity)) *
          (item.PriceOriginal * item.Quantity);
        let itemDiscountWeight =
          (itemProposedAmount / (item.PriceOriginal * item.Quantity)) *
          percentageDiscountAmount;
        let afterDiscountAmount = 0;
        if (element.isInclusiveTax) {
          let inclTax =
            (itemProposedAmount / (100 + element.taxRate)) * element.taxRate;
          let pureAmount = itemProposedAmount - inclTax;
          afterDiscountAmount = pureAmount - itemDiscountWeight;
        } else {
          afterDiscountAmount = itemProposedAmount - itemDiscountWeight;
        }
        if (!element.isFixedTax) {
          let taxPrice = (element.taxRate / 100) * afterDiscountAmount;
          totalPrice += afterDiscountAmount + taxPrice;
          totalTax += taxPrice;
        }
        if (element.isFixedTax) {
          let fixtax = element.newTaxAmount * item.Quantity;
          totalPrice += fixtax + afterDiscountAmount;
          totalTax = totalTax + fixtax;
        }
      });
      let taxAmt = {
        IsTax2InclusiveInPrice: item.IsTax2InclusiveInPrice
          ? item.IsTax2InclusiveInPrice
          : 0,
        Tax2Value: item.Tax2Amount == 0 ? item.Tax2Amount : totalTax,
        Tax2Fragment: item.Tax2Fragment ? item.Tax2Fragment : "",
        Tax2Name: item.Tax2Name ? item.Tax2Name : "",
        Tax2Code: item.Tax2Code ? item.Tax2Code : "",
        IsTax1InclusiveInPrice: item.IsTax1InclusiveInPrice
          ? item.IsTax1InclusiveInPrice
          : 0,
        Tax1Value: item.Tax1Amount == 0 ? item.Tax1Amount : totalTax,
        Tax1Fragment: item.Tax1Fragment ? item.Tax1Fragment : "",
        Tax1Name: item.Tax1Name ? item.Tax1Name : "",
        Tax1Code: item.Tax1Code ? item.Tax1Code : "",
      };
      let tax = totalTax;

      if (tax >= 0) {
        if (type === "DiscountRate") {
          pDiscount =
            manuallyCount === 0
              ? 0
              : taxAmt?.DiscountAmount
              ? taxAmt.DiscountAmount
              : parseFloat(
                  (manuallyCount *
                    (item.PriceWithOutTax * item.Quantity + tax)) /
                    100
                );
        } else {
          amtDisP =
            manuallyCount === 0
              ? 0
              : (manuallyCount / (item.GrandAmount + item.DiscountAmount)) *
                100;
          pAmtP =
            manuallyCount === 0
              ? 0
              : (item.DiscountAmount /
                  (item.GrandAmount + item.DiscountAmount)) *
                100;

          if (manuallyCount >= item.GrandAmount + item.DiscountAmount) {
            setMessage(props.StringsList._440);
            setDisplayAlert(true);
            setLoading(false);
            return;
          }
        }
        if (
          (dP <= userDiscountLimit && type === "DiscountRate" && dP < 100) ||
          (amtDisP <= userDiscountLimit &&
            type !== "DiscountRate" &&
            manuallyCount < amount)
        ) {
          if (manuallyCount === 0 && type === "DiscountRate") {
          } else {
            let p = 0;
            if (item.DiscountAmount > 0) {
              p =
                (item.DiscountAmount /
                  (item.GrandAmount + item.DiscountAmount)) *
                100;
            }
          }
          if (selectedProduct.length > 0 && manuallyCount !== 0) {
            selectedProduct.forEach(async (product) => {
              if (
                product.SalesInvoiceDetailsID === item?.SalesInvoiceDetailsID
              ) {
                if (type === "DiscountRate") {
                  product.DiscountRate =
                    manuallyCount === 0 ? 0 : manuallyCount;

                  product.DiscountAmount =
                    manuallyCount === 0
                      ? 0
                      : percentageDiscountAmount.toFixed(
                          TerminalConfiguration.DecimalsInAmount
                        );

                  item.GrandAmount = totalPrice;
                  product.tax = tax;
                  product.Tax1Amount = tax;
                } else if (type === "DiscountAmount") {
                  item.GrandAmount = totalPrice;
                  product.DiscountAmount = Number(manuallyCount);

                  product.tax = tax;
                  product.Tax1Amount = tax;

                  product.DiscountAmountP = 0;
                }
              }
            });
          } else {
            item.GrandAmount = totalPrice;
            item.DiscountRate = 0;
            item.DiscountAmount = 0;
            item.tax = totalTax;
          }
          let p = [...selectedProduct];
          finalCalculation(p);
          setSelectedProducts(selectedProduct);
        } else {
          setMessage(props.StringsList._267);
          setDisplayAlert(true);
          setLoading(false);
        }
      } else {
        setMessage(props.StringsList._267);
        setDisplayAlert(true);
        setLoading(false);
      }
    } else {
      let taxAmt = await calculateTaxeGroups(
        item.Quantity,
        item.PriceOriginal * item.Quantity,
        dA,
        item.TaxGroupID,
        1,
        null,
        0,
        TerminalConfiguration,
        item.PriceWithOutTax,
        dP
      );

      if (item.Tax1Fragment == 2) {
        taxAmt.Tax1Amount = taxAmt.Tax1Amount * item.Quantity;
        taxAmt.DiscountAmount =
          (manuallyCount * (item.PriceWithOutTax * item.Quantity)) / 100;
      } else {
        taxAmt.Tax1Amount = taxAmt.Tax1Amount;
      }

      let tax = taxAmt?.Tax1Amount ? taxAmt?.Tax1Amount : 0;
      if (tax >= 0) {
        if (type === "DiscountRate") {
          pDiscount =
            manuallyCount === 0
              ? 0
              : taxAmt?.DiscountAmount
              ? taxAmt.DiscountAmount
              : parseFloat(
                  (manuallyCount *
                    (item.PriceWithOutTax * item.Quantity + tax)) /
                    100
                );
        } else {
          amtDisP =
            manuallyCount === 0
              ? 0
              : (manuallyCount / (item.GrandAmount + item.DiscountAmount)) *
                100;
          pAmtP =
            manuallyCount === 0
              ? 0
              : (item.DiscountAmount /
                  (item.GrandAmount + item.DiscountAmount)) *
                100;

          if (manuallyCount >= item.GrandAmount + item.DiscountAmount) {
            setMessage(props.StringsList._440);
            setDisplayAlert(true);
            setLoading(false);
            return;
          }
        }
        if (
          (dP <= userDiscountLimit && type === "DiscountRate" && dP < 100) ||
          (amtDisP <= userDiscountLimit &&
            type !== "DiscountRate" &&
            manuallyCount < amount)
        ) {
          if (manuallyCount === 0 && type === "DiscountRate") {
          } else {
            let p = 0;
            if (item.DiscountAmount > 0) {
              p =
                (item.DiscountAmount /
                  (item.GrandAmount + item.DiscountAmount)) *
                100;
            }
          }
          if (selectedProduct.length > 0 && manuallyCount !== 0) {
            selectedProduct.forEach(async (product) => {
              if (
                product.SalesInvoiceDetailsID === item?.SalesInvoiceDetailsID
              ) {
                if (type === "DiscountRate") {
                  if (
                    taxAmt.calculationId === 9 ||
                    taxAmt.calculationId === 1
                  ) {
                    product.GrandAmount = Number(
                      taxAmt.amount + taxAmt.Tax1Amount
                    );
                  } else {
                    product.GrandAmount = Number(
                      product.IsTax1IncludedInPrice == 0
                        ? item.PriceOriginal * item.Quantity - pDiscount + tax
                        : item.PriceOriginal * item.Quantity - pDiscount
                    );
                  }
                  product.DiscountRate =
                    manuallyCount === 0 ? 0 : manuallyCount;

                  product.DiscountAmount =
                    manuallyCount === 0
                      ? 0
                      : taxAmt.DiscountAmount
                      ? taxAmt.DiscountAmount.toFixed(
                          TerminalConfiguration.DecimalsInAmount
                        )
                      : pDiscount.toFixed(
                          TerminalConfiguration.DecimalsInAmount
                        );

                  product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                  (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
                    (product.Tax1Rate = taxAmt.Tax1Percentage
                      ? taxAmt.Tax1Percentage
                      : 0),
                    (product.Tax1Amount = taxAmt.Tax1Amount
                      ? taxAmt.Tax1Amount
                      : 0),
                    (product.Tax2Code = taxAmt?.Tax2Code
                      ? taxAmt.Tax2Code
                      : ""),
                    (product.Tax2Name = taxAmt?.Tax2Name
                      ? taxAmt?.Tax2Name
                      : ""),
                    (product.Tax2Rate = taxAmt?.Tax2Percentage
                      ? taxAmt?.Tax2Percentage
                      : 0),
                    (product.Tax2Amount = taxAmt?.Tax2Amount
                      ? taxAmt?.Tax2Amount
                      : 0);
                  product.tax = product.Tax1Amount + product.Tax2Amount;
                } else {
                  product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                  (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
                    (product.Tax1Rate = taxAmt.Tax1Percentage
                      ? taxAmt.Tax1Percentage
                      : 0),
                    (product.Tax1Amount = taxAmt.Tax1Amount
                      ? taxAmt.Tax1Amount
                      : 0),
                    (product.Tax2Code = taxAmt?.Tax2Code
                      ? taxAmt.Tax2Code
                      : ""),
                    (product.Tax2Name = taxAmt?.Tax2Name
                      ? taxAmt?.Tax2Name
                      : ""),
                    (product.Tax2Rate = taxAmt?.Tax2Percentage
                      ? taxAmt?.Tax2Percentage
                      : 0),
                    (product.Tax2Amount = taxAmt?.Tax2Amount
                      ? taxAmt?.Tax2Amount
                      : 0);

                  let GA = item.PriceOriginal * item.Quantity;
                  let tax = product.Tax1Amount + product.Tax2Amount;
                  let GAmount = 0;
                  if (
                    taxAmt.calculationId === 9 ||
                    taxAmt.calculationId === 1
                  ) {
                    GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
                  } else {
                    GAmount = !product.IsTax1IncludedInPrice
                      ? Number(GA + tax) - Number(manuallyCount)
                      : Number(GA) - Number(manuallyCount);
                  }

                  product.DiscountAmount = Number(manuallyCount);
                  product.GrandAmount = GAmount;
                  product.tax = tax;
                  product.DiscountAmountP = 0;
                }
                setmanuallyCount(0);
              }
            });
          } else {
            item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
            (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
              (item.Tax1Rate = taxAmt.Tax1Percentage
                ? taxAmt.Tax1Percentage
                : 0),
              (item.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
              (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
              (item.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
              (item.Tax2Rate = taxAmt?.Tax2Percentage
                ? taxAmt?.Tax2Percentage
                : 0),
              (item.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
            let GA = item.PriceOriginal * item.Quantity;
            let tax = item.Tax1Amount + item.Tax2Amount;

            if (taxAmt.IsTax1IncludedInPrice) {
              item.GrandAmount = Number(GA);
            } else {
              item.GrandAmount = Number(GA + tax);
            }
            item.DiscountRate = 0;
            item.DiscountAmount = 0;
            item.tax = tax;
          }
          let p = [...selectedProduct];
          finalCalculation(p);
          setSelectedProducts(selectedProduct);
        } else {
          setMessage(props.StringsList._267);
          setDisplayAlert(true);
          setLoading(false);
        }
      } else {
        setMessage(props.StringsList._267);
        setDisplayAlert(true);
        setLoading(false);
      }
    }
  };

  const onManuallyAddCount = async (item) => {
    let IsUpdated = false;
    if (showButton === true && orderCode === false && printType === null) {
      IsUpdated = true;
    }
    item.IsUpdated = IsUpdated;
    setoptionsOpen(false);
    setPaymentsOpen(false);

    let selectedProduct = [...selectedProducts];
    let addonFinalQuantity, newQuantity;

    if (selectedProduct.length > 0 && manuallyCount >= 1) {
      for (let i = 0; i < selectedProduct.length; i++) {
        let product = selectedProduct[i];
        newQuantity = manuallyCount;
        if (product.ProductType === 3) {
          product.IsParentAddOn =
            product.IsParentAddOn === 1 || product.IsParentAddOn == true
              ? true
              : false;
          let Amount = Number(product.PriceOriginal * newQuantity);
          if (!product?.IsParentAddOn) {
            addonFinalQuantity = newQuantity * product.OrignalQuantity;
          } else {
            newQuantity = manuallyCount;
          }
          if (product.DiscountRate > 0) {
          } else if (product.DiscountAmount >= Amount) {
            product.DiscountAmount = 0;
          } else {
            product.DiscountAmount = product.DiscountAmount;
          }
          if (newQuantity !== product.Quantity) {
            let type =
              newQuantity > product.Quantity ? "increment" : "decrement";
            if (product.IsParentAddOn) {
              let isProductFind =
                product?.SalesInvoiceDetailsID ===
                  item?.SalesInvoiceDetailsID &&
                product?.PriceOriginal === item?.PriceOriginal &&
                product?.ProductBarCode === item?.ProductBarCode;
              if (isProductFind) {
                changeProductGroupItem(
                  product,
                  type,
                  newQuantity,
                  Number(product.DiscountRate),
                  Number(product.DiscountAmount)
                );
              }
            } else if (!product.IsParentAddOn) {
              let isAddonFind =
                product?.AddOnParentSalesInvoiceDetailsID ===
                  item?.SalesInvoiceDetailsID &&
                product?.ParentInvoiceDetailsID === item?.SalesInvoiceDetailsID;
              if (isAddonFind) {
                changeProductGroupAddon(
                  item,
                  product,
                  type,
                  addonFinalQuantity,
                  Number(product.DiscountRate),
                  Number(product.DiscountAmount),
                  printType
                );
              }
            }
          }
        } else {
          newQuantity = manuallyCount;

          if (
            product.SalesInvoiceDetailsID === item?.SalesInvoiceDetailsID ||
            product?.ParentInvoiceDetailsID === item.SalesInvoiceDetailsID
          ) {
            setLoading(true);
            if (!product?.IsParentAddOn) {
              addonFinalQuantity = newQuantity * product.OrignalQuantity;
            } else {
              newQuantity = manuallyCount;
            }
            let Amount = Number(product.PriceOriginal * newQuantity);
            if (product.DiscountAmount >= Amount) {
              product.DiscountAmount = 0;
            } else {
              product.DiscountAmount = product.DiscountAmount;
            }
            let taxAmt = await calculateTaxeGroups(
              product?.IsParentAddOn ? newQuantity : addonFinalQuantity,
              Amount,
              product.DiscountAmount,
              product.TaxGroupID,
              1,
              null,
              0,
              TerminalConfiguration,
              product.PriceOriginal,
              product.DiscountRate
            );
            console.log("ManuallyAddCount Tax Calculation", taxAmt);
            let proQ,
              discount = 0;
            product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
            (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
              (product.Tax1Rate = taxAmt.Tax1Percentage
                ? taxAmt.Tax1Percentage
                : 0);
            if (product.Tax1Fragment == 2) {
              product.Tax1Amount = product?.IsParentAddOn
                ? taxAmt.Tax1Amount * newQuantity
                : taxAmt.Tax1Amount * addonFinalQuantity;
              taxAmt.Tax1Amount = product.Tax1Amount;
            } else {
              product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
            }
            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
              (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
              (product.Tax2Rate = taxAmt?.Tax2Percentage
                ? taxAmt?.Tax2Percentage
                : 0),
              (product.Tax2Amount = taxAmt?.Tax2Amount
                ? taxAmt?.Tax2Amount
                : 0);

            if (!product.IsParentAddOn) {
              proQ =
                (product.maxQuantity > 0 ? newQuantity - 1 : newQuantity) *
                product.OrignalQuantity;
            } else {
              proQ = product.maxQuantity > 0 ? newQuantity - 1 : newQuantity;
            }
            if (proQ !== product.maxQuantity) {
              product.Quantity = newQuantity;
              taxAmt.DiscountAmount = product.DiscountRate
                ? (product.PriceWithOutTax *
                    newQuantity *
                    product.DiscountRate) /
                  100
                : product.DiscountAmount;

              if (product.DiscountRate > 0) {
                discount = taxAmt.DiscountAmount
                  ? taxAmt.DiscountAmount
                  : parseFloat(
                      (product.DiscountRate *
                        (product.PriceOriginal * newQuantity +
                          product.Tax1Amount)) /
                        100
                    );
              } else {
                discount = product.DiscountAmount;
              }
              let GAmount = 0;

              if (taxAmt.calculationId === 9 || taxAmt.calculationId === 1) {
                GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
              } else {
                GAmount = product.IsTax1IncludedInPrice
                  ? Number(product.PriceOriginal * newQuantity - discount)
                  : Number(
                      product.PriceOriginal * newQuantity -
                        discount +
                        taxAmt.Tax1Amount
                    );
              }
              product.GrandAmount = Number(GAmount);
              discount = Number(discount);
              //;
              product.DiscountAmount = discount.toFixed(2);
              product.tax = product.Tax1Amount + product.Tax2Amount;
            } else {
              setMessage(props.StringsList._230);
              setDisplayAlert(true);
              setLoading(false);
            }
            let p = [...selectedProduct];
            finalCalculation(p);
            setmanuallyCount(0);
            setSelectedProducts(selectedProduct);
            setLoading(false);
          }
        }
      }
    }
  };

  const onManuallyChangePrice = async (item) => {
    let IsUpdated = false;
    if (showButton === true && orderCode === false && printType === null) {
      IsUpdated = true;
    }

    item.IsUpdated = IsUpdated;
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let includedTax = 0,
      manualCount = 0;
    // pGL = item.groupTaxCodes;
    manualCount = manuallyCount.toFixed(TerminalConfiguration.DecimalsInAmount);
    setmanuallyCount(manualCount);
    if (selectedProduct.length > 0) {
      if (item.ProductType === 3) {
        let newQuantity = item.Quantity;

        for (let i = 0; i < selectedProduct.length; i++) {
          let product = selectedProduct[i];
          if (
            product.SalesInvoiceDetailsID === item?.SalesInvoiceDetailsID &&
            manuallyCount !== item.PriceWithOutTax
          ) {
            let Amount =
              manuallyCount === item.PriceWithOutTax
                ? Number(item.PriceOriginal * item.Quantity)
                : Number(manuallyCount * item.Quantity);
            Amount = Number(
              Amount.toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            if (
              product.DiscountAmount >= Amount &&
              product.DiscountRate === 0
            ) {
              product.DiscountAmount = 0;
            } else {
              product.DiscountAmount = product.DiscountAmount;
            }

            if (product.groupTaxCodes) {
              let totaltax1 = 0,
                totaltax2 = 0,
                executeCal = true,
                percentageDiscountAmount = 0,
                totalTax = 0,
                totalPrice = 0;

              if (item.DiscountAmount > 0) {
                if (item.DiscountRate > 0) {
                  let AmountWithOutTax = 0;
                  item.productGroupTaxInfoObj.forEach((element, position) => {
                    let itemProposedAmount =
                      (element.proposedPrice / item.Pricefortax) *
                      manuallyCount;

                    if (element.isInclusiveTax) {
                      let inclTax =
                        (itemProposedAmount / (100 + element.taxRate)) *
                        element.taxRate;
                      AmountWithOutTax += itemProposedAmount - inclTax;
                    } else {
                      AmountWithOutTax += itemProposedAmount;
                    }
                    if (position === item.productGroupTaxInfoObj.length - 1) {
                      item.PriceOriginal = manuallyCount.toFixed(
                        TerminalConfiguration.DecimalsInAmount
                      );
                      item.PriceOriginal = Number(item.PriceOriginal);
                      executeCal = false;
                      item.PriceWithOutTax = AmountWithOutTax;
                      handleDiscount(item, "DiscountRate");
                    }
                  });
                } else {
                  let AmountWithOutTax = 0;
                  item.productGroupTaxInfoObj.forEach((element, position) => {
                    let itemProposedAmount =
                      (element.proposedPrice / item.Pricefortax) *
                      manuallyCount;

                    if (element.isInclusiveTax) {
                      let inclTax =
                        (itemProposedAmount / (100 + element.taxRate)) *
                        element.taxRate;
                      AmountWithOutTax += itemProposedAmount - inclTax;
                    } else {
                      AmountWithOutTax += itemProposedAmount;
                    }
                    if (position === item.productGroupTaxInfoObj.length - 1) {
                      item.PriceOriginal = manuallyCount.toFixed(
                        TerminalConfiguration.DecimalsInAmount
                      );
                      item.PriceOriginal = Number(item.PriceOriginal);
                      executeCal = false;
                      item.PriceWithOutTax = AmountWithOutTax;
                      handleDiscount(item, undefined);
                    }
                  });
                }
              }

              if (executeCal)
                await product.groupTaxCodes.forEach(async (element, index) => {
                  let amountBeforeDiscount = Amount;
                  let taxGroupID = "";
                  let itemQty = 0,
                    itemAmount = 0,
                    itemProposedSalesAmount = 0,
                    itemDiscountAmount = 0,
                    netQty = 0;

                  taxGroupID = element.SaleTaxFamilyCode;
                  itemQty = element.Quantity;
                  itemAmount = element.Price;

                  netQty = item.Quantity * itemQty;

                  itemProposedSalesAmount =
                    (itemAmount * amountBeforeDiscount) / item.Pricefortax;

                  if (amountBeforeDiscount > 0)
                    itemDiscountAmount =
                      (itemProposedSalesAmount * percentageDiscountAmount) /
                      amountBeforeDiscount;

                  let taxAmt = await calculateTaxeGroups(
                    netQty,
                    itemProposedSalesAmount,
                    itemDiscountAmount,
                    taxGroupID,
                    1,
                    null,
                    0,
                    TerminalConfiguration,
                    manuallyCount,
                    item.DiscountRate
                  );

                  if (taxAmt.Tax1Fragment == 2) {
                    let taxtPerGroup = taxAmt.Tax1Amount * newQuantity;
                    let taxPerItem = taxtPerGroup;
                    totaltax1 += taxPerItem;
                  } else {
                    totaltax1 = taxAmt.Tax1Amount
                      ? totaltax1 + taxAmt.Tax1Amount
                      : totaltax1 + 0;
                  }
                  if (taxAmt.Tax2Fragment == 2) {
                    let taxtPrGroup = taxAmt.Tax2Amount * newQuantity;
                    let taxPrItem = taxtPrGroup;
                    totaltax2 += taxPrItem;
                  } else {
                    totaltax2 = taxAmt.Tax2Amount
                      ? totaltax2 + taxAmt.Tax2Amount
                      : totaltax2 + 0;
                  }

                  let tax = totaltax1 + totaltax2;

                  console.log(
                    "calculateTaxeGroups for Product type 3...",
                    taxAmt
                  );
                  let proQ,
                    discount = 0;
                  // Tax 1 details
                  product.Tax1Fragment = taxAmt?.Tax1Fragment
                    ? taxAmt.Tax1Fragment
                    : "";
                  product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                  (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
                    (product.Tax1Rate = taxAmt.Tax1Percentage
                      ? taxAmt.Tax1Percentage
                      : 0),
                    (product.Tax1Amount = totaltax1),
                    // Tax 1 details
                    (product.Tax2Code = taxAmt?.Tax2Code
                      ? taxAmt.Tax2Code
                      : ""),
                    (product.Tax2Fragment = taxAmt?.Tax2Fragment
                      ? taxAmt.Tax2Fragment
                      : "");
                  (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
                    (product.Tax2Rate = taxAmt?.Tax2Percentage
                      ? taxAmt?.Tax2Percentage
                      : 0),
                    (product.Tax2Amount = totaltax2);
                  if (taxAmt?.IsTax1IncludedInPrice) {
                    includedTax += taxAmt.Tax1Amount;
                  }
                  if (taxAmt.IsTax2IncludedInPrice) {
                    includedTax += taxAmt.Tax2Amount;
                  }
                  product.PriceWithOutTax =
                    manuallyCount - includedTax / newQuantity;
                  product.PriceWithOutTax = product?.PriceWithOutTax.toFixed(
                    TerminalConfiguration.DecimalsInAmount
                  );
                  product.PriceWithOutTax = Number(product.PriceWithOutTax);
                  product.PriceUnitlesstax = product.PriceWithOutTax;
                  item.PriceOriginal = manuallyCount.toFixed(
                    TerminalConfiguration.DecimalsInAmount
                  );
                  item.PriceOriginal = Number(item.PriceOriginal);
                  if (!product.IsParentAddOn) {
                    proQ =
                      (product.maxQuantity > 0
                        ? newQuantity - 1
                        : newQuantity) * product.OrignalQuantity;
                  } else {
                    proQ =
                      product.maxQuantity > 0 ? newQuantity - 1 : newQuantity;
                  }
                  if (proQ !== product.maxQuantity) {
                    product.Quantity = newQuantity;

                    if (product.DiscountRate > 0) {
                      discount = product.DiscountAmount
                        ? percentageDiscountAmount
                        : parseFloat(
                            (product.DiscountRate *
                              (product.PriceWithOutTax * newQuantity +
                                taxAmt.Tax1Amount)) /
                              100
                          );
                    } else {
                      discount = product.DiscountAmount;
                    }

                    let GAmount = 0;

                    GAmount = tax + product.PriceWithOutTax * product.Quantity;
                    product.GrandAmount = Number(GAmount);
                    product.webperamount = product.PriceWithOutTax;
                    //;
                    product.DiscountAmount = Number(discount).toFixed(
                      TerminalConfiguration.DecimalsInAmount
                    );

                    product.tax = totaltax1 + totaltax2;
                    if (index === product.groupTaxCodes.length - 1) {
                      setTimeout(() => {
                        let p = [...selectedProduct];
                        finalCalculation(p);
                        setmanuallyCount(1);

                        setSelectedProducts(selectedProduct);
                        manualCount = 0;
                      }, 1000);
                    }
                  } else {
                    setMessage(props.StringsList._230);
                    setDisplayAlert(true);
                    setLoading(false);
                  }
                });
            } else {
              let taxAmt = await calculateTaxeGroups(
                newQuantity,
                Amount,
                0,
                product.TaxGroupID,
                1,
                null,
                0,
                TerminalConfiguration,
                manuallyCount,
                product.DiscountRate
              );
              let proQ,
                discount = 0;
              product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
              (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
                (product.Tax1Rate = taxAmt.Tax1Percentage
                  ? taxAmt.Tax1Percentage
                  : 0),
                (product.Tax1Amount = taxAmt.Tax1Amount
                  ? taxAmt.Tax1Amount
                  : 0),
                (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
                (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
                (product.Tax2Rate = taxAmt?.Tax2Percentage
                  ? taxAmt?.Tax2Percentage
                  : 0),
                (product.Tax2Amount = taxAmt?.Tax2Amount
                  ? taxAmt?.Tax2Amount
                  : 0);
              item.PriceWithOutTax = taxAmt?.Price.toFixed(
                TerminalConfiguration.DecimalsInAmount
              );
              item.PriceWithOutTax = Number(item.PriceWithOutTax);
              item.PriceOriginal = manuallyCount.toFixed(
                TerminalConfiguration.DecimalsInAmount
              );
              item.PriceOriginal = Number(item.PriceOriginal);
              if (!product.IsParentAddOn) {
                proQ =
                  (product.maxQuantity > 0 ? newQuantity - 1 : newQuantity) *
                  product.OrignalQuantity;
              } else {
                proQ = product.maxQuantity > 0 ? newQuantity - 1 : newQuantity;
              }
              if (proQ !== product.maxQuantity) {
                product.Quantity = newQuantity;

                if (product.DiscountRate > 0) {
                  discount = taxAmt.DiscountAmount
                    ? taxAmt.DiscountAmount
                    : parseFloat(
                        (product.DiscountRate *
                          (product.PriceWithOutTax * newQuantity +
                            taxAmt.Tax1Amount)) /
                          100
                      );
                }

                let GAmount = 0;

                if (taxAmt.calculationId === 9 || taxAmt.calculationId === 1) {
                  GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
                } else {
                  GAmount = product.IsTax1IncludedInPrice
                    ? Number(product.PriceOriginal * newQuantity - discount)
                    : Number(
                        product.PriceOriginal * newQuantity -
                          discount +
                          taxAmt.Tax1Amount
                      );
                }
                product.GrandAmount = Number(GAmount);

                //;
                discount = Number(discount);
                product.DiscountAmount = discount.toFixed(
                  TerminalConfiguration.DecimalsInAmount
                );

                product.tax = product.Tax1Amount + product.Tax2Amount;
              } else {
                setMessage(props.StringsList._230);
                setDisplayAlert(true);
                setLoading(false);
              }
              let p = [...selectedProduct];
              finalCalculation(p);
              setmanuallyCount(1);
              setSelectedProducts(selectedProduct);
              manualCount = 0;
            }
          } else {
          }
        }
      } else {
        let newQuantity = item.Quantity;
        let inclusiveProductPrice = 0;
        for (let i = 0; i < selectedProduct.length; i++) {
          let product = selectedProduct[i];
          if (
            product.SalesInvoiceDetailsID === item?.SalesInvoiceDetailsID &&
            manuallyCount !== item.PriceWithOutTax
          ) {
            let Amount =
              manuallyCount === item.PriceWithOutTax
                ? Number(item.PriceOriginal * item.Quantity)
                : Number(manuallyCount * item.Quantity);

            Amount = Number(
              Amount.toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            let inclTax = (Amount / (100 + item.Tax1Rate)) * item.Tax1Rate;
            if (
              product.IsTax1IncludedInPrice ||
              product.IsTax2IncludedInPrice
            ) {
              inclusiveProductPrice = manuallyCount - inclTax;
            }

            product.DiscountAmount =
              product.DiscountAmount >= Amount ? 0 : product.DiscountAmount;
            let taxAmt = await calculateTaxeGroups(
              newQuantity,
              Amount,
              product.DiscountAmount,
              product.TaxGroupID,
              1,
              null,
              0,
              TerminalConfiguration,
              product.IsTax1IncludedInPrice
                ? inclusiveProductPrice
                : manuallyCount,
              product.DiscountRate
            );
            console.log("calculateTaxeGroups...", taxAmt);
            let proQ,
              discount = 0;
            product.Tax1Fragment = taxAmt?.Tax1Fragment
              ? taxAmt.Tax1Fragment
              : "";
            product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
            (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
              (product.Tax1Rate = taxAmt.Tax1Percentage
                ? taxAmt.Tax1Percentage
                : 0);
            if (product.Tax1Fragment == 2) {
              taxAmt.Tax1Amount = taxAmt.Tax1Amount * newQuantity;
            } else {
              product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
            }
            product.Tax2Fragment = taxAmt?.Tax2Fragment
              ? taxAmt.Tax2Fragment
              : "";
            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
              (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
              (product.Tax2Rate = taxAmt?.Tax2Percentage
                ? taxAmt?.Tax2Percentage
                : 0),
              (product.Tax2Amount = taxAmt?.Tax2Amount
                ? taxAmt?.Tax2Amount
                : 0);
            item.PriceWithOutTax = taxAmt?.Price.toFixed(
              TerminalConfiguration.DecimalsInAmount
            );
            item.PriceWithOutTax = Number(item.PriceWithOutTax);
            item.PriceOriginal = manuallyCount.toFixed(
              TerminalConfiguration.DecimalsInAmount
            );
            item.PriceOriginal = Number(item.PriceOriginal);
            if (!product.IsParentAddOn) {
              proQ =
                (product.maxQuantity > 0 ? newQuantity - 1 : newQuantity) *
                product.OrignalQuantity;
            } else {
              proQ = product.maxQuantity > 0 ? newQuantity - 1 : newQuantity;
            }
            if (proQ !== product.maxQuantity) {
              product.Quantity = newQuantity;
              if (product.DiscountRate > 0) {
                discount =
                  (product.PriceWithOutTax *
                    product.Quantity *
                    product.DiscountRate) /
                  100;
              } else {
                discount = product.DiscountAmount;
              }

              let GAmount = 0;

              if (taxAmt.calculationId === 9 || taxAmt.calculationId === 1) {
                GAmount = Number(taxAmt.amount + taxAmt.Tax1Amount);
              } else {
                GAmount = product.IsTax1IncludedInPrice
                  ? Number(product.PriceOriginal * newQuantity - discount)
                  : Number(
                      product.PriceOriginal * newQuantity -
                        discount +
                        taxAmt.Tax1Amount
                    );
              }
              product.GrandAmount = Number(GAmount);

              discount = Number(discount);
              product.DiscountAmount = discount.toFixed(
                TerminalConfiguration.DecimalsInAmount
              );

              product.tax = product.Tax1Amount + product.Tax2Amount;
            } else {
              setMessage(props.StringsList._230);
              setDisplayAlert(true);
              setLoading(false);
            }
            let p = [...selectedProduct];
            finalCalculation(p);
            // setmanuallyCount(1);
            manualCount = 0;
            setSelectedProducts(selectedProduct);
          } else {
          }
        }
      }
    }
  };

  const handleDiscount = async (item, type) => {
    let IsUpdated = false;
    if (showButton === true && orderCode === false && printType === null) {
      IsUpdated = true;
    }

    item.IsUpdated = IsUpdated;
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let pDiscount;
    item.DiscountAmount = Number(item.DiscountAmount);
    let dP = 0; //item.DiscountRate
    let dA = 0; //item.DiscountAmount
    let percentageDiscountAmount = 0;
    pGL = item.groupTaxCodes;
    let tax1AmountTotal = 0;
    if (type === "DiscountRate") {
      dP = item.DiscountRate;
      percentageDiscountAmount =
        (item.PriceWithOutTax * item.Quantity * dP) / 100;
      dA = percentageDiscountAmount;
    } else {
      dA = item.DiscountAmount;

      dP = 0;
      percentageDiscountAmount = dA;
    }
    let totalTax = 0,
      totalPrice = 0;
    item.productGroupTaxInfoObj.forEach((element) => {
      let itemProposedAmount =
        ((element.proposedPrice * item.Quantity) /
          (item.Pricefortax * item.Quantity)) *
        (item.PriceOriginal * item.Quantity);
      let itemDiscountWeight =
        (itemProposedAmount / (item.PriceOriginal * item.Quantity)) *
        percentageDiscountAmount;
      let afterDiscountAmount = 0;
      if (element.isInclusiveTax) {
        let inclTax =
          (itemProposedAmount / (100 + element.taxRate)) * element.taxRate;
        let pureAmount = itemProposedAmount - inclTax;
        afterDiscountAmount = pureAmount - itemDiscountWeight;
      } else {
        afterDiscountAmount = itemProposedAmount - itemDiscountWeight;
      }
      if (!element.isFixedTax) {
        let taxPrice = (element.taxRate / 100) * afterDiscountAmount;
        totalPrice += afterDiscountAmount + taxPrice;
        totalTax += taxPrice;
      }
      if (element.isFixedTax) {
        let fixtax = element.newTaxAmount * item.Quantity;
        totalPrice += fixtax + afterDiscountAmount;
        totalTax = totalTax + fixtax;
      }
    });
    let tax = totalTax;
    if (tax >= 0) {
      if (selectedProduct.length > 0 && (dP !== 0 || dA !== 0)) {
        selectedProduct.forEach(async (product) => {
          if (product.SalesInvoiceDetailsID === item?.SalesInvoiceDetailsID) {
            if (type === "DiscountRate") {
              product.DiscountRate = product.DiscountRate;
              product.DiscountAmount = percentageDiscountAmount;

              product.GrandAmount = Number(totalPrice);
              // product.webperamount =
              //   (totalPrice - totalTax + Number(product.DiscountAmount)) /
              //   item.Quantity;
              product.webperamount = Number(product.PriceWithOutTax);
              product.PriceWithOutTax = Number(item.webperamount);
              product.tax = tax;
              product.Tax1Amount = tax;
              product.DiscountAmount = Number(
                product.DiscountAmount.toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )
              );
            } else {
              product.DiscountAmount = Number(
                percentageDiscountAmount.toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )
              );
              product.GrandAmount = Number(totalPrice);
              product.tax = tax;
              product.Tax1Amount = tax;
              // product.DiscountAmountP = 0;
              // product.webperamount =
              //   (totalPrice - totalTax + Number(product.DiscountAmount)) /
              //   item.Quantity;
              product.webperamount = Number(product.PriceWithOutTax);
              product.PriceWithOutTax = Number(product.webperamount);
            }
          }
        });
      } else {
        product.GrandAmount = Number(totalPrice);
        product.DiscountRate = 0;
        product.DiscountAmount = 0;
        product.tax = Number(
          totalTax.toFixed(TerminalConfiguration.DecimalsInAmount)
        );
      }
      setTimeout(() => {
        let p = [...selectedProduct];
        finalCalculation(p);
        setSelectedProducts(selectedProduct);
      }, 1000);
    } else {
      setMessage(props.StringsList._267);
      setDisplayAlert(true);
      setLoading(false);
    }
  };

  const changeProductGroupItem = async (
    item,
    type,
    newQuantity,
    dr,
    discount
  ) => {
    let IsUpdated = false;
    if (showButton === true && orderCode === false && printType === null) {
      IsUpdated = true;
    }
    item.IsUpdated = IsUpdated;
    let pq = type === "increment" ? item.Quantity + 1 : item.Quantity - 1;
    item.maxQuantity =
      returnInvoiceNumber !== null
        ? item.maxQuantity
        : 100000000000 + item.Quantity;
    item.DiscountAmount = discount;
    item.DiscountRate = dr;
    // console.log('return product quanttoty check', item.maxQuantity >= pq)
    if (item.maxQuantity >= pq) {
      let rr = await getData(SalesFamilySummaryListTable, async (cb) => {
        // console.log(' SalesFamilySummaryListTable are', cb);
        let groupTaxCodes = cb.filter(
          (x) => x.SalesFamilyCode === item.ProductCode
        );
        productGroupList = groupTaxCodes;
        // console.log(' our group is', productGroupList);
        let totaltax1 = 0;
        let totaltax2 = 0;
        let finaltaxObj;
        let tamout = 0;

        let taxAmountIncludedInPrice = 0;
        let tax1AmountTotal = 0,
          tax1ActualAmountTotal = 0,
          tax2AmountTotal = 0,
          tax2ActualAmountTotal = 0;
        let percentageDiscountAmount = 0;

        if (
          item.DiscountAmount > newQuantity * item.PriceWithOutTax &&
          item.DiscountRate === 0
        ) {
          item.DiscountAmount = 0;
        }
        let executeCal = true;
        if (item.DiscountAmount > 0) {
          if (item.DiscountRate > 0) {
            percentageDiscountAmount =
              (item.webperamount * newQuantity * item.DiscountRate) / 100;
            if (type === "increment" || type === "decrement") {
              // item.Quantity = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1
              item.Quantity = newQuantity;

              executeCal = false;
              handleDiscount(item, "DiscountRate");
            }
          } else {
            percentageDiscountAmount = item.DiscountAmount;

            if (type === "increment" || type === "decrement") {
              // item.Quantity = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1
              item.Quantity = newQuantity;
              executeCal = false;
              handleDiscount(item, "DiscountAmount");
            }
          }
        }
        if (executeCal == true) {
          await productGroupList.forEach(async (element, index) => {
            let amountBeforeDiscount = item.PriceOriginal * newQuantity;
            let taxGroupID = "";
            let itemQty = 0,
              itemAmount = 0,
              itemProposedSalesAmount = 0,
              itemDiscountAmount = 0,
              netQty = 0;

            taxGroupID = element.SaleTaxFamilyCode;
            itemQty = element.Quantity;
            itemAmount = element.Price;

            netQty = newQuantity * itemQty;

            itemProposedSalesAmount =
              (itemAmount * amountBeforeDiscount) / item.Pricefortax;

            if (amountBeforeDiscount > 0)
              itemDiscountAmount =
                (itemProposedSalesAmount * percentageDiscountAmount) /
                amountBeforeDiscount;

            let taxAmt = await calculateTaxeGroups(
              netQty,
              itemProposedSalesAmount,
              itemDiscountAmount,
              taxGroupID,
              1,
              null,
              0,
              TerminalConfiguration,
              item.PriceOriginal,
              dr
            );

            console.log("taxamount is", taxAmt);
            // let tax = item.Tax1Amount + item.Tax2Amount;

            if (taxAmt.Tax1Fragment == 2) {
              let taxtPerGroup = taxAmt.Tax1Amount * newQuantity;
              let taxPerItem = taxtPerGroup;
              totaltax1 += taxPerItem;
            } else {
              totaltax1 = taxAmt.Tax1Amount
                ? totaltax1 + taxAmt.Tax1Amount
                : totaltax1 + 0;
            }
            if (taxAmt.Tax2Fragment == 2) {
              let taxtPrGroup = taxAmt.Tax2Amount * newQuantity;
              let taxPrItem = taxtPrGroup;
              totaltax2 += taxPrItem;
            } else {
              totaltax2 = taxAmt.Tax2Amount
                ? totaltax2 + taxAmt.Tax2Amount
                : totaltax2 + 0;
            }

            tamout += taxAmt.amount;
            finaltaxObj = taxAmt;

            if (!taxAmt.IsTax1IncludedInPrice)
              tax1ActualAmountTotal += taxAmt.Tax1Amount
                ? taxAmt.Tax1Amount
                : 0;
            else
              taxAmountIncludedInPrice += taxAmt.Tax1Amount
                ? taxAmt.Tax1Amount
                : 0;
            if (!taxAmt.IsTax2IncludedInPrice)
              tax2ActualAmountTotal += taxAmt.Tax2Amount
                ? taxAmt.Tax2Amount
                : 0;
            else
              taxAmountIncludedInPrice += taxAmt.Tax2Amount
                ? taxAmt.Tax2Amount
                : 0;

            tax1AmountTotal += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
            tax2AmountTotal += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;

            if (
              taxAmountIncludedInPrice > 0 ||
              taxAmt.Tax1Amount > 0 ||
              taxAmt.Tax2Amount > 0
            ) {
              let amountAfterTax =
                amountBeforeDiscount - taxAmountIncludedInPrice;

              if (amountAfterTax > 0) {
                taxAmt.Price = amountAfterTax / (item.Quantity * 1);
              } else {
                taxAmt.Price = 0;
              } //we will not allow to proceed if price is zero
            } else if (taxAmt.Tax1Amount == 0 && taxAmt.Tax2Amount == 0) {
              //It means All the group items dont have tax group id
              if (amountBeforeDiscount > 0) {
                taxAmt.Price = amountBeforeDiscount / (item.Quantity * 1);
              } else {
                taxAmt.Price = 0;
              } //we will not allow to proceed if price is zero
            }
            item.Tax1Amount = tax1AmountTotal ? tax1AmountTotal : 0;
            item.Tax2Amount = tax2AmountTotal ? tax2AmountTotal : 0;
            item.Price = Number(item.PriceOriginal);
            item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice ? 1 : 0;
            item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice ? 1 : 0;
            item.IngredientsArray = [];
            item.IngredientNames = "";

            item.Tax1Code = taxAmt.Tax1Code;
            (item.Tax1Name = ""),
              (item.Tax1Rate = taxAmt.Tax1Percentage),
              (item.Tax1Amount = totaltax1),
              (item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : ""),
              (item.Tax2Name = ""),
              (item.Tax2Rate = taxAmt.Tax2Percentage
                ? taxAmt.Tax2Percentage
                : 0),
              (item.Tax2Amount = totaltax2);
            let tax = totaltax1 + totaltax2;

            let product = item;
            if (type === "increment") {
              if (taxAmt) {
                let proQ;

                if (!product.IsParentAddOn) {
                  proQ =
                    type === "increment"
                      ? (newQuantity - 1) * product.OrignalQuantity
                      : newQuantity * product.OrignalQuantity;
                } else {
                  proQ = type === "increment" ? newQuantity - 1 : newQuantity;
                }
                if (proQ !== product.maxQuantity) {
                  product.Quantity = newQuantity;
                  if (dr > 0) {
                    discount = product.DiscountAmount
                      ? percentageDiscountAmount
                      : parseFloat(
                          (dr * product.webperamount * newQuantity) / 100
                        );
                    discount = Number(discount);
                  } else {
                    discount = product.DiscountAmount
                      ? product.DiscountAmount
                      : 0;
                    discount = Number(discount);
                  }

                  var amount = 0;
                  if (index == 0) {
                    amount = amountBeforeDiscount - percentageDiscountAmount;
                  } else {
                    amount = product.GrandAmount;
                  }
                  if (taxAmt.IsTax1IncludedInPrice == false) {
                    if (taxAmt.Tax1Fragment == 2) {
                      amount =
                        amount + taxAmt.Tax1Amount * item.Quantity - discount;
                    } else {
                      amount = amount + taxAmt.Tax1Amount - discount; // txAmts.Tax1Amount;
                    }
                  }
                  if (taxAmt.IsTax2IncludedInPrice == false) {
                    amount = amount + taxAmt.Tax2Amount - discount; //txAmts.Tax2Amount;
                  }
                  product.GrandAmount = amount;
                  if (discount > item.PriceOriginal * newQuantity) {
                    discount = Number(discount);
                    discount = 0;
                  }
                  item.PriceWithOutTax = Number(item.PriceUnitlesstax);
                  discount = Number(discount);

                  product.DiscountAmount = Number(
                    discount.toFixed(TerminalConfiguration.DecimalsInAmount)
                  );
                  product.tax = tax;
                  // console.log("Tax is ", tax)

                  product.tax = product.Tax1Amount + product.Tax2Amount;
                  // console.log("Tax is ", product.tax)
                } else {
                  setMessage(props.StringsList._230);
                  setDisplayAlert(true);
                  setLoading(false);
                }
              }
            } else if (type === "decrement") {
              product.Quantity = newQuantity;
              if (dr > 0) {
                discount = product.DiscountAmount
                  ? percentageDiscountAmount
                  : parseFloat((dr * product.webperamount * newQuantity) / 100);
              } else {
                discount = product.DiscountAmount ? product.DiscountAmount : 0;
              }
              if (discount > product.PriceOriginal * newQuantity) {
                discount = 0;
              }
              item.PriceWithOutTax = Number(item.PriceUnitlesstax);
              var amount = 0;
              if (index == 0) {
                amount = amountBeforeDiscount - percentageDiscountAmount;
              } else {
                amount = product.GrandAmount;
              }
              if (taxAmt.IsTax1IncludedInPrice == false) {
                if (taxAmt.Tax1Fragment == 2) {
                  amount =
                    amount + taxAmt.Tax1Amount * item.Quantity - discount;
                } else {
                  amount = amount + taxAmt.Tax1Amount - discount; // txAmts.Tax1Amount;
                }
              }
              if (taxAmt.IsTax2IncludedInPrice == false) {
                amount = amount + taxAmt.Tax2Amount - discount; //txAmts.Tax2Amount;
              }
              product.GrandAmount = amount;
              product.DiscountAmount = Number(
                discount.toFixed(TerminalConfiguration.DecimalsInAmount)
              );
              product.tax = tax;
              product.tax = product.Tax1Amount + product.Tax2Amount;
            }

            if (index === productGroupList.length - 1) {
              let p = [...selectedProducts];
              for (let i = 0; i < p.length; i++) {
                let prod = p[i];

                if (
                  ((prod?.ProductBarCode === item?.ProductBarCode &&
                    prod?.PriceOriginal === item?.PriceOriginal) ||
                    prod?.AddOnParentSalesInvoiceDetailsID ===
                      item.SalesInvoiceDetailsID) &&
                  type !== "returnInvoice"
                ) {
                  prod = item;
                }
              }
              setTimeout(() => {
                finalCalculation(p);
                setSelectedProducts(p);
              }, 1000);
            }
          });
        }
      });
    } else {
      setMessage(props.StringsList._230);
      setDisplayAlert(true);
      setLoading(false);
    }
  };
  const changeProductGroupAddon = async (
    parentItem,
    item,
    type,
    newQuantity,
    dr,
    discount,
    printType
  ) => {
    let IsUpdated = false;
    if (showButton === true && orderCode === false && printType === null) {
      IsUpdated = true;
    }
    item.IsUpdated = IsUpdated;
    let pq = type === "increment" ? item.Quantity + 1 : item.Quantity - 1;
    item.maxQuantity =
      returnInvoiceNumber !== null
        ? item.maxQuantity
        : 100000000000 + item.Quantity;
    item.DiscountAmount = discount;
    if (newQuantity) {
      newQuantity = newQuantity / item.OrignalQuantity;
    }
    newQuantity = Number(newQuantity);
    if (item.maxQuantity >= pq) {
      let rr = await getData(SalesFamilySummaryListTable, async (cb) => {
        let groupTaxCodes = cb.filter(
          (x) => x.SalesFamilyCode === item.ProductCode
        );
        productGroupList = groupTaxCodes;
        let totaltax1 = 0;
        let totaltax2 = 0;
        let finaltaxObj;
        let tamout = 0;

        let taxAmountIncludedInPrice = 0;
        let tax1AmountTotal = 0,
          tax1ActualAmountTotal = 0,
          tax2AmountTotal = 0,
          tax2ActualAmountTotal = 0;
        let percentageDiscountAmount = 0;

        if (item.DiscountAmount > newQuantity * item.PriceOriginal) {
          item.DiscountAmount = 0;
        }
        let executeCal = true;

        if (executeCal == true) {
          await productGroupList.forEach(async (element, index) => {
            console.log("Element", element);
            let amountBeforeDiscount = item.PriceOriginal * newQuantity;
            let taxGroupID = "";
            let itemQty = 0,
              itemAmount = 0,
              itemProposedSalesAmount = 0,
              itemDiscountAmount = 0,
              netQty = 0;

            taxGroupID = element.SaleTaxFamilyCode;
            itemQty = element.Quantity;
            itemAmount = element.Price;

            netQty = newQuantity * itemQty;

            itemProposedSalesAmount =
              (itemAmount * amountBeforeDiscount) / item.Pricefortax;

            if (amountBeforeDiscount > 0)
              itemDiscountAmount =
                (itemProposedSalesAmount * percentageDiscountAmount) /
                amountBeforeDiscount;

            let taxAmt = await calculateTaxeGroups(
              netQty,
              itemProposedSalesAmount,
              itemDiscountAmount,
              taxGroupID,
              1,
              null,
              0,
              TerminalConfiguration,
              item.PriceOriginal,
              dr
            );

            console.log("taxamount is", taxAmt);
            // let tax = item.Tax1Amount + item.Tax2Amount;

            if (taxAmt.Tax1Fragment == 2) {
              let taxtPerGroup = taxAmt.Tax1Amount * newQuantity;
              let taxPerItem = taxtPerGroup;
              totaltax1 += taxPerItem;
            } else {
              totaltax1 = taxAmt.Tax1Amount
                ? totaltax1 + taxAmt.Tax1Amount
                : totaltax1 + 0;
            }
            if (taxAmt.Tax2Fragment == 2) {
              let taxtPrGroup = taxAmt.Tax2Amount * newQuantity;
              let taxPrItem = taxtPrGroup;
              totaltax2 += taxPrItem;
            } else {
              totaltax2 = taxAmt.Tax2Amount
                ? totaltax2 + taxAmt.Tax2Amount
                : totaltax2 + 0;
            }

            tamout += taxAmt.amount;
            finaltaxObj = taxAmt;

            if (!taxAmt.IsTax1IncludedInPrice)
              tax1ActualAmountTotal += taxAmt.Tax1Amount
                ? taxAmt.Tax1Amount
                : 0;
            else
              taxAmountIncludedInPrice += taxAmt.Tax1Amount
                ? taxAmt.Tax1Amount
                : 0;
            if (!taxAmt.IsTax2IncludedInPrice)
              tax2ActualAmountTotal += taxAmt.Tax2Amount
                ? taxAmt.Tax2Amount
                : 0;
            else
              taxAmountIncludedInPrice += taxAmt.Tax2Amount
                ? taxAmt.Tax2Amount
                : 0;

            tax1AmountTotal += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
            tax2AmountTotal += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;

            if (
              taxAmountIncludedInPrice > 0 ||
              taxAmt.Tax1Amount > 0 ||
              taxAmt.Tax2Amount > 0
            ) {
              let amountAfterTax =
                amountBeforeDiscount - taxAmountIncludedInPrice;

              if (amountAfterTax > 0) {
                taxAmt.Price = amountAfterTax / (item.Quantity * 1);
              } else {
                taxAmt.Price = 0;
              } //we will not allow to proceed if price is zero
            } else if (taxAmt.Tax1Amount == 0 && taxAmt.Tax2Amount == 0) {
              //It means All the group items dont have tax group id
              if (amountBeforeDiscount > 0) {
                taxAmt.Price = amountBeforeDiscount / (item.Quantity * 1);
              } else {
                taxAmt.Price = 0;
              } //we will not allow to proceed if price is zero
            }
            item.Tax1Amount = tax1AmountTotal ? tax1AmountTotal : 0;
            item.Tax2Amount = tax2AmountTotal ? tax2AmountTotal : 0;
            item.Price = Number(item.PriceOriginal);
            item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice ? 1 : 0;
            item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice ? 1 : 0;
            item.IngredientsArray = [];
            item.IngredientNames = "";

            item.Tax1Code = taxAmt.Tax1Code;
            (item.Tax1Name = ""),
              (item.Tax1Rate = taxAmt.Tax1Percentage),
              (item.Tax1Amount = totaltax1),
              (item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : ""),
              (item.Tax2Name = ""),
              (item.Tax2Rate = taxAmt.Tax2Percentage
                ? taxAmt.Tax2Percentage
                : 0),
              (item.Tax2Amount = totaltax2);
            let tax = totaltax1 + totaltax2;

            let product = item;
            if (type === "increment") {
              if (taxAmt) {
                let proQ;

                if (!product.IsParentAddOn) {
                  proQ =
                    type === "increment"
                      ? (newQuantity - 1) * product.OrignalQuantity
                      : newQuantity * product.OrignalQuantity;
                } else {
                  proQ = type === "increment" ? newQuantity - 1 : newQuantity;
                }
                if (proQ !== product.maxQuantity) {
                  product.Quantity = newQuantity;
                  if (dr > 0) {
                    discount = product.DiscountAmount
                      ? percentageDiscountAmount
                      : parseFloat(
                          (dr * product.webperamount * newQuantity) / 100
                        );
                    discount = Number(discount);
                  } else {
                    discount = product.DiscountAmount
                      ? product.DiscountAmount
                      : 0;
                    discount = Number(discount);
                  }

                  var amount = 0;
                  if (index == 0) {
                    amount = amountBeforeDiscount - percentageDiscountAmount;
                  } else {
                    amount = product.GrandAmount;
                  }
                  if (taxAmt.IsTax1IncludedInPrice == false) {
                    if (taxAmt.Tax1Fragment == 2) {
                      amount =
                        amount + taxAmt.Tax1Amount * item.Quantity - discount;
                    } else {
                      amount = amount + taxAmt.Tax1Amount - discount; // txAmts.Tax1Amount;
                    }
                  }
                  if (taxAmt.IsTax2IncludedInPrice == false) {
                    amount = amount + taxAmt.Tax2Amount - discount; //txAmts.Tax2Amount;
                  }
                  product.GrandAmount = amount;
                  if (discount > item.PriceOriginal * newQuantity) {
                    discount = Number(discount);
                    discount = 0;
                  }
                  item.PriceWithOutTax = Number(item.PriceUnitlesstax);
                  discount = Number(discount);

                  product.DiscountAmount = Number(discount).toFixed(2);
                  product.tax = tax;
                  // console.log("Tax is ", tax)

                  product.tax = product.Tax1Amount + product.Tax2Amount;
                  // console.log("Tax is ", product.tax)
                } else {
                  setMessage(props.StringsList._230);
                  setDisplayAlert(true);
                  setLoading(false);
                }
              }
            } else if (type === "decrement") {
              product.Quantity = newQuantity;
              if (dr > 0) {
                discount = product.DiscountAmount
                  ? percentageDiscountAmount
                  : parseFloat((dr * product.webperamount * newQuantity) / 100);
              } else {
                discount = product.DiscountAmount ? product.DiscountAmount : 0;
              }
              if (discount > product.PriceOriginal * newQuantity) {
                discount = 0;
              }
              item.PriceWithOutTax = Number(item.PriceUnitlesstax);
              var amount = 0;
              if (index == 0) {
                amount = amountBeforeDiscount - percentageDiscountAmount;
              } else {
                amount = product.GrandAmount;
              }
              if (taxAmt.IsTax1IncludedInPrice == false) {
                if (taxAmt.Tax1Fragment == 2) {
                  amount =
                    amount + taxAmt.Tax1Amount * item.Quantity - discount;
                } else {
                  amount = amount + taxAmt.Tax1Amount - discount; // txAmts.Tax1Amount;
                }
              }
              if (taxAmt.IsTax2IncludedInPrice == false) {
                amount = amount + taxAmt.Tax2Amount - discount; //txAmts.Tax2Amount;
              }
              product.GrandAmount = amount;
              product.DiscountAmount = Number(discount).toFixed(2);
              product.tax = tax;
              product.tax = product.Tax1Amount + product.Tax2Amount;
            }
            // setLoading(false)
            if (index === productGroupList.length - 1) {
              let p = [...selectedProducts];
              for (let i = 0; i < p.length; i++) {
                let prod = p[i];

                if (
                  ((prod?.ProductBarCode === item?.ProductBarCode &&
                    prod?.PriceOriginal === item?.PriceOriginal) ||
                    prod?.AddOnParentSalesInvoiceDetailsID ===
                      item.SalesInvoiceDetailsID) &&
                  type !== "returnInvoice"
                ) {
                  prod = item;
                }
              }

              finalCalculation(p);
              setSelectedProducts(p);
            }
          });
        }
      });
    } else {
      setMessage(props.StringsList._230);
      setDisplayAlert(true);
      setLoading(false);
    }
  };

  const finalCalculation = (selectedProduct) => {
    // console.log('1 finalCalculation.....', selectedProduct);
    let products =
      selectedProduct.length > 0 ? selectedProduct : selectedProducts;
    let subTotal = 0,
      total = 0;
    products.forEach((p) => {
      subTotal = subTotal + p.GrandAmount;
    });
    total = subTotal;

    if (selectedGlobalTaxObj || globalDiscountRate > 0) {
      if (globalDiscountRate > 0) {
        globalDiscountAmountFun("", subTotal, total, "recalling");
      } else if (globalDiscountAmount > 0) {
        globalDiscountAmountFun("globalDiscount", subTotal, total, "recalling");
      } else if (selectedGlobalTaxObj) {
        globalTaxFun(selectedGlobalTaxObj, subTotal, "", total);
      }
    } else {
      setLoading(false);
      setTotalPrice(total);
      setsubPrice(subTotal);
    }
  };
  const finalUpdatedCalculation = (selectedProduct) => {
    // console.log("finalCalculation.....", selectedProduct)
    let products =
      selectedProduct.length > 0 ? selectedProduct : selectedProducts;
    let subTotal = 0,
      total = 0;
    products.forEach((p) => {
      subTotal = subTotal + p.GrandAmount;
    });
    total = subTotal;

    if (selectedGlobalTaxObj || globalDiscountRate > 0) {
      if (globalDiscountRate > 0) {
        globalDiscountAmountFun("", subTotal, total, "recalling");
      } else if (globalDiscountAmount > 0) {
        globalDiscountAmountFun("globalDiscount", subTotal, total, "recalling");
      } else if (selectedGlobalTaxObj) {
        globalTaxFun(selectedGlobalTaxObj, subTotal, "", total);
      }
    } else {
      setTotalPrice(total);
    }
    setsubPrice(subTotal);
  };

  const getLastOrderNumber = async () => {
    let number = "";
    await getData(TerminalConfigurationTable, (cb) => {
      // console.log("CB ======>", cb);
      let preZero = "0000000";
      let silceNumber =
        Number(cb[0]?.LastOrderNumber) >= 99999
          ? preZero.length - 5
          : Number(cb[0]?.LastOrderNumber) >= 9999
          ? preZero.length - 4
          : Number(cb[0]?.LastOrderNumber) >= 999
          ? preZero.length - 3
          : Number(cb[0]?.LastOrderNumber) >= 99
          ? preZero.length - 2
          : Number(cb[0]?.LastOrderNumber) >= 9
          ? preZero.length - 1
          : preZero.length;
      let orderNumber =
        Number(cb[0]?.LastOrderNumber) >= 999999
          ? cb[0].OrderPrefix + "-" + Number(cb[0].LastOrderNumber)
          : cb[0].OrderPrefix +
            "-" +
            preZero.slice(1 - silceNumber) +
            Number(cb[0].LastOrderNumber);
      number = orderNumber;

      setLastOrderNumber(number);
    });
    return number;
  };

  const emptyAsyncTableObj = async () => {
    try {
      let table = await AsyncStorage.getItem("SELECTED_TABLE");
      console.log(JSON.stringify(table));
      await AsyncStorage.removeItem("SELECTED_TABLE");
      console.log("Table Removed");
      setEnableTbut(true);
      setStorageItems(null);
    } catch (e) {
      console.log(e, "error");
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
      list.isOrderTypeSelected = true;
      if (result && list?.products?.length > 0) {
        setToggle(true);
      }
    } else {
      setStorageItems(null);
    }
  };
  const createNewInvoiceNumber = async () => {
    let number = "";
    await getData(TerminalConfigurationTable, (cb) => {
      // console.log("cb======>", cb);
      let preZero = "0000000";
      let silceNumber =
        Number(cb[0]?.LastBillNumber) >= 99999
          ? preZero.length - 5
          : Number(cb[0]?.LastBillNumber) >= 9999
          ? preZero.length - 4
          : Number(cb[0]?.LastBillNumber) >= 999
          ? preZero.length - 3
          : Number(cb[0]?.LastBillNumber) >= 99
          ? preZero.length - 2
          : Number(cb[0]?.LastBillNumber) >= 9
          ? preZero.length - 1
          : preZero.length;
      let invoiceNumber =
        Number(cb[0]?.LastBillNumber) >= 999999
          ? cb[0].BillPrefix + "-" + (Number(cb[0].LastBillNumber) + 1)
          : cb[0].BillPrefix +
            "-" +
            preZero.slice(1 - silceNumber) +
            (Number(cb[0].LastBillNumber) + 1);
      number = invoiceNumber;
      setInvoiceNumber(number);
      setTerminalConfiguration(cb[0]);
    });
    return number;
  };
  const initialglobalTaxFun = async (itm, type, n, totalAmount, disAmount) => {
    // setLoading(true);
    if (itm.TaxFamilyCode !== "None") {
      let tPrice = totalAmount ? totalAmount : totalPrice;
      let subPr = type === "returnInvoice" ? subPrice : type;
      let disA =
        disAmount || disAmount === 0 ? disAmount : globalDiscountAmount;
      setSelectedGlobalTaxObj(itm);
      let taxAmt = await calculateTaxeGroups(
        0,
        subPr,
        disA,
        itm.TaxFamilyCode,
        1,
        null,
        0,
        TerminalConfiguration,
        0,
        0,
        true
      );
      taxAmt.globalTaxGroupID = itm.TaxFamilyCode;
      taxAmt.globalTaxGroupName = itm.TaxFamilyName;

      let tax = taxAmt.Tax2Amount
        ? taxAmt.Tax1Amount + taxAmt.Tax2Amount
        : taxAmt.Tax1Amount
        ? taxAmt.Tax1Amount
        : 0;
      let diA = taxAmt.DiscountAmount ? taxAmt.DiscountAmount : 0;

      if (tax > 0) {
        tPrice = subPr + tax - diA;

        setTotalPrice(tPrice);
      } else {
        tPrice = subPr - disA;

        setTotalPrice(tPrice);
      }
      setGlobalTaxObj(taxAmt);
      setGlobalTax(tax);
      setLoading(false);
    } else {
      let tPrice = totalPrice - globalTax;
      setTotalPrice(tPrice);
      setSelectedGlobalTaxObj(null);
      setGlobalTaxObj(null);
      setGlobalTax(0);
    }
  };

  const convertArabicNumbersToEnglish = (arabicText) => {
    let arabic_numbers = "٠١٢٣٤٥٦٧٨٩".split("");
    let n = "";
    let englishNumber = false;

    for (let i = 0; i < arabicText?.length; i++) {
      var number = arabic_numbers.find((x) => x == arabicText[i]);
      if (number) {
        englishNumber = false;
      } else {
        englishNumber = true;
        return arabicText;
      }

      if (!englishNumber) {
        let state = arabic_numbers.indexOf(arabicText[i]);
        n += state;
      }
    }
    return n;
  };
  const QR = forwardRef(() => {
    var tax = globalTax,
      proTax = 0,
      proDiscount = 0;
    for (let i = 0; i < selectedProducts?.length; i++) {
      let pro = selectedProducts[i];
      tax = tax + pro.tax;
      proTax = proTax + pro.tax;
      proDiscount = pro?.DiscountAmount
        ? proDiscount + Number(pro.DiscountAmount)
        : proDiscount + 0;
    }
    setSumOfProductsTax(Number(proTax));
    setSumOfProductsDiscount(Number(proDiscount));
    let VAT = TerminalConfiguration?.ValueAddedTaxNumber
      ? TerminalConfiguration?.ValueAddedTaxNumber
      : "000000000000000";
    const currentDateISO = new Date().toISOString();
    let invoiceTotal = totalPrice.toFixed(
      TerminalConfiguration.DecimalsInAmount
    );
    let invoiceVatTotal = tax.toFixed(TerminalConfiguration.DecimalsInAmount);

    const invoice = new Invoice({
      sellerName: TerminalConfiguration.CompanyName,
      vatRegistrationNumber: convertArabicNumbersToEnglish(VAT),
      invoiceTimestamp: currentDateISO,
      invoiceTotal: invoiceTotal,
      invoiceVatTotal: invoiceVatTotal,
    });
    let imageData = invoice.toBase64();
    if (imageData !== null) {
      qrRef.current = imageData;
      return (
        <QRCode ref={qrRef} size={sizeHelper.calWp(300)} value={imageData} />
      );
    }
  });

  const soundLoading = () => {
    let sound = new Sound(
      require("../../assets/sounds/beep01.mp3"),
      (error) => {
        if (error) {
          console.log("failed to load the sound", error);
        }
      }
    );
    setBeepSound(sound);
  };

  const SoundPlay = () => {
    beepSound.play((success) => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
  };

  const updateTerminalConfiguration = () => {
    let columnName = ["LastBillNumber"];
    let columnValue = [Number(TerminalConfiguration.LastBillNumber) + 1];
    updateColunm(
      TerminalConfigurationTable,
      columnName,
      "UserCode",
      TerminalConfiguration.UserCode,
      columnValue
    );
    let StartFromValue = [Number(terminalSetup.StartFrom) + 1];
    updateColunm(
      TerminalSetupTable,
      ["StartFrom"],
      "id",
      "12345678",
      StartFromValue
    );

    if (paymentsValue === "1") {
      let estimatedAmountinDrawer =
        Number(drawerSetupArr.estimatedAmountinDrawer) + Number(totalPrice);
      if (estimatedAmountinDrawer > 0) {
        let salePrice = Number(drawerSetupArr.CashSales) + Number(totalPrice);
        let columnNameDrawer = ["CashSales", "estimatedAmountinDrawer"];

        let columnValueDrawer = [salePrice, estimatedAmountinDrawer];
        updateColunm(
          DrawerSetupTable,
          columnNameDrawer,
          "id",
          "D12345678",
          columnValueDrawer
        );
      }
    } else {
      let estimatedAmountinDrawer =
        Number(drawerSetupArr.estimatedAmountinDrawer) + Number(totalPrice);
      if (estimatedAmountinDrawer > 0) {
        let creditSales =
          Number(drawerSetupArr.creditSales) + Number(totalPrice);
        let columnNameDrawer = ["creditSales", "estimatedAmountinDrawer"];
        let columnValueDrawer = [creditSales, estimatedAmountinDrawer];
        updateColunm(
          DrawerSetupTable,
          columnNameDrawer,
          "id",
          "D12345678",
          columnValueDrawer
        );
      }
    }
  };
  const updateReturnTerminalConfiguration = () => {
    let columnName = ["LastReturnBillNumber"];
    let columnValue = [Number(TerminalConfiguration.LastReturnBillNumber) + 1];
    updateColunm(
      TerminalConfigurationTable,
      columnName,
      "UserCode",
      TerminalConfiguration.UserCode,
      columnValue
    );

    let estimatedAmountinDrawer =
      Number(drawerSetupArr.estimatedAmountinDrawer) - Number(totalPrice);
    if (estimatedAmountinDrawer > 0) {
      let salePrice = Number(drawerSetupArr.CashRefund) + Number(totalPrice);
      let columnNameDrawer = ["CashRefund", "estimatedAmountinDrawer"];
      let columnValueDrawer = [salePrice, estimatedAmountinDrawer];
      updateColunm(
        DrawerSetupTable,
        columnNameDrawer,
        "id",
        "D12345678",
        columnValueDrawer
      );
    }
  };

  const getAllCategories = async (type) => {
    getData(CategoriesListTable, async (categories) => {
      setAllCategories(categories);
      if (categories.length > 0) {
        getSelectedCategoryProducts(categories[0]);
      } else {
        setNoFamilyFound(true);
        getData(UpdateProductDetailListTable, (productsDetail) => {
          console.log("getAllCategories logs", productsDetail);
          if (type !== "isRestState") {
            onSelectProduct(null, productsDetail);
          } else {
            setCategoryProducts(productsDetail);
          }
          setLoading(false);
        });
      }
    });
  };

  const getAddOnProducts = async (item, index) => {
    let selectedProduct = [...selectedProducts];
    setLoading(true);
    await getDataJoinById(
      ProductCardAddOnGroupListTable,
      UpdateProductDetailListTable,
      "AddOnGroupCode",
      item.AddOnGroupCode,
      async (addonProducts) => {
        console.log("Product Card Add On Group List Table...", addonProducts);
        if (addonProducts.length > 0) {
          let products = [];

          for (let i = 0; i < addonProducts.length; i++) {
            let isFind;
            if (addonProducts[i].ProductType === 3) {
              if (
                addonProducts[i].ProductType === 3 &&
                orderCode === true &&
                showButton === false
              ) {
                isFind = selectedProduct.find(
                  (x) =>
                    (x.AddOnGroupCode === addonProducts[i].AddOnGroupCode ||
                      x.EquiProductCode === addonProducts[i].ProductCode) &&
                    x.AddOnParentSalesInvoiceDetailsID ===
                      item.SalesInvoiceDetailsID &&
                    x.ProductCode === addonProducts[i].ProductCode
                );
              } else if (
                addonProducts[i].ProductType === 3 &&
                orderCode === false &&
                showButton === true
              ) {
                if (item?.isSelected === true) {
                  isFind = selectedProduct.find(
                    (x) =>
                      (x.AddOnGroupCode === addonProducts[i].AddOnGroupCode ||
                        x.EquiProductCode === addonProducts[i].ProductCode) &&
                      x.AddOnParentSalesInvoiceDetailsID ===
                        item.SalesInvoiceDetailsID &&
                      x.ProductCode === addonProducts[i].ProductCode
                  );
                } else if (item?.isSelected === undefined) {
                  isFind = selectedProduct.find(
                    (x) =>
                      (x.AddOnGroupCode === addonProducts[i].AddOnGroupCode ||
                        x.EquiProductCode === addonProducts[i].ProductCode) &&
                      x.AddOnParentSalesInvoiceDetailsID ===
                        item.SalesInvoiceDetailsID &&
                      x.ProductCode === addonProducts[i].ProductCode
                  );
                }
              }

              await getDataJoinById(
                ProductCardAddOnEquivalentProductsListTable,
                UpdateProductDetailListTable,
                "EquiProductCode",
                addonProducts[i].ProductCode,
                (EquivalentProduct) => {
                  console.log("addon equivaletnt Products", EquivalentProduct);
                  let EqP = [];
                  for (let j = 0; j < EquivalentProduct.length; j++) {
                    let pro = {
                      SalesInvoiceDetailsID: uuid.v4(),
                      SalesBillID: null,
                      BillNumber: null,
                      FiscalSpanID: 0,
                      BillType: addonProducts[i].BillType,
                      SerialNumber: 1,
                      ProductCode: EquivalentProduct[j].ProductCode,
                      ProductName: EquivalentProduct[j].Name,
                      ProductName2: EquivalentProduct[j].Name2,
                      ProductType: EquivalentProduct[j].ProductType,
                      Quantity: addonProducts[i].Quantity,
                      UOMType: EquivalentProduct[j].UOMType,
                      UOMCode: EquivalentProduct[j].UOMCode,
                      UOMFragment: EquivalentProduct[j].UOMFragment,
                      UOMCode: EquivalentProduct[j].UOMCode,
                      UOMName: EquivalentProduct[j].UOMName,
                      Price: 0,
                      PriceOriginal: addonProducts[i].Price,
                      PriceType: item.PriceType,
                      DiscountRate: addonProducts[i].DiscountRate
                        ? addonProducts[i].DiscountRate
                        : 0,
                      DiscountAmount: 0,
                      TaxGroupID: EquivalentProduct[0].SaleTaxGroupCode,
                      IsTax1IncludedInPrice: false,
                      IsTax2IncludedInPrice: false,
                      Tax1Code: "",
                      Tax1Name: "",
                      Tax1Rate: 0,
                      Tax1Amount: 0,
                      Tax2Code: "",
                      Tax2Name: "",
                      Tax2Rate: 0,
                      Tax2Amount: 0,
                      GrandAmount: addonProducts[i].Price,
                      GroupDataID: "",
                      ProductBarCode: EquivalentProduct[j].ProductBarCode,
                      ReturnSalesBillDetailID: "",
                      DeliveryStatus: "",
                      DeliveryDate: "",
                      DeliveryTime: "",
                      DeliveryNote: "",
                      DeliveredDate: "",
                      DeliveredTime: "",
                      Remarks: "",
                      SalesAgentCode: null,
                      IsParentAddOn: false,
                      AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                      ParentInvoiceDetailsID: item.SalesInvoiceDetailsID,
                      OrignalQuantity: addonProducts[i].Quantity,
                      AddonProductDetailcode:
                        addonProducts[i].AddOnGroupDetailCode,
                      Ingredients: 0,
                      EarnedPoints: 0,
                      RedeemPoints: Number(0),
                      Status: 0,
                      ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                      MediaContentType: addonProducts[i].MediaContentType,
                      MediaContents: addonProducts[i].MediaContents,
                      HoldFromSale: EquivalentProduct[j].HoldFromSale,
                      parentIndex: index + 1,
                      parentQuantity: item.Quantity,
                      AddOnParentSalesInvoiceDetailsID:
                        item.SalesInvoiceDetailsID,
                      EquiProductCode: EquivalentProduct[j].EquiProductCode,
                    };
                    EqP.push(pro);
                  }

                  if (!isFind) {
                    let pro = {
                      SalesInvoiceDetailsID: uuid.v4(),
                      SalesBillID: null,
                      BillNumber: null,
                      FiscalSpanID: 0,
                      BillType: addonProducts[i].BillType,
                      SerialNumber: 1,
                      ProductCode: addonProducts[i].ProductCode,
                      ProductName: addonProducts[i].Name,
                      ProductName2: addonProducts[i].Name2,
                      ProductType: addonProducts[i].ProductType,
                      Quantity: addonProducts[i].Quantity,
                      UOMType: addonProducts[i].UOMType,
                      UOMCode: addonProducts[i].UOMCode,
                      UOMFragment: addonProducts[i].UOMFragment,
                      UOMCode: addonProducts[i].UOMCode,
                      UOMName: addonProducts[i].UOMName,
                      Price: 0,
                      PriceOriginal: addonProducts[i].Price,

                      PriceType: item.PriceType,
                      DiscountRate: addonProducts[i].DiscountRate
                        ? addonProducts[i].DiscountRate
                        : 0,
                      DiscountAmount: 0,
                      TaxGroupID: addonProducts[i].SaleTaxGroupCode,
                      IsTax1IncludedInPrice: false,
                      IsTax2IncludedInPrice: false,
                      Tax1Code: "",
                      Tax1Name: "",
                      Tax1Rate: 0,
                      Tax1Amount: 0,
                      Tax2Code: "",
                      Tax2Name: "",
                      Tax2Rate: 0,
                      Tax2Amount: 0,
                      GrandAmount: addonProducts[i].Price,
                      GroupDataID: "",
                      ProductBarCode: addonProducts[i].ProductBarCode,
                      ReturnSalesBillDetailID: "",
                      DeliveryStatus: "",
                      DeliveryDate: "",
                      DeliveryTime: "",
                      DeliveryNote: "",
                      DeliveredDate: "",
                      DeliveredTime: "",
                      Remarks: "",
                      SalesAgentCode: null,
                      IsParentAddOn: false,
                      AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                      ParentInvoiceDetailsID: item.SalesInvoiceDetailsID,
                      OrignalQuantity: addonProducts[i].Quantity,
                      AddonProductDetailcode:
                        addonProducts[i].AddOnGroupDetailCode,
                      Ingredients: 0,
                      EarnedPoints: 0,
                      RedeemPoints: Number(0),
                      Status: 0,
                      ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                      MediaContentType: addonProducts[i].MediaContentType,
                      MediaContents: addonProducts[i].MediaContents,
                      HoldFromSale: addonProducts[i].HoldFromSale,
                      parentIndex: index + 1,
                      parentQuantity: item.Quantity,
                      AddOnParentSalesInvoiceDetailsID:
                        item.SalesInvoiceDetailsID,
                      EquivalentProducts: EqP,
                    };
                    products.push(pro);
                  }
                }
              );
              if (Array.isArray(products) && products !== undefined) {
                setReturnProducts(products);
                setTimeout(() => {
                  setisAddon(true);
                  setLoading(false);
                }, 500);
              }
            } else {
              if (
                addonProducts[i].ProductType === 1 &&
                orderCode === true &&
                showButton === false
              ) {
                isFind = selectedProduct.find(
                  (x) =>
                    (x.ProductBarCode === addonProducts[i].ProductBarCode ||
                      x.EquiProductCode === addonProducts[i].ProductCode) &&
                    x.AddOnParentSalesInvoiceDetailsID ===
                      item.SalesInvoiceDetailsID
                );
              } else if (
                addonProducts[i].ProductType === 1 &&
                orderCode === false &&
                showButton === true
              ) {
                if (item?.isSelected === true) {
                  isFind = selectedProduct.find(
                    (x) =>
                      (x.ProductBarCode === addonProducts[i].ProductBarCode ||
                        x.EquiProductCode === addonProducts[i].ProductCode) &&
                      x.AddOnParentSalesInvoiceDetailsID ===
                        item.SalesInvoiceDetailsID
                  );
                } else if (item?.isSelected === undefined) {
                  isFind = selectedProduct.find(
                    (x) =>
                      (x.ProductBarCode === addonProducts[i].ProductBarCode ||
                        x.EquiProductCode === addonProducts[i].ProductCode) &&
                      x.AddOnParentSalesInvoiceDetailsID ===
                        item.SalesInvoiceDetailsID
                  );
                }
              }

              await getDataJoinById(
                ProductCardAddOnEquivalentProductsListTable,
                UpdateProductDetailListTable,
                "EquiProductCode",
                addonProducts[i].ProductCode,
                (EquivalentProduct) => {
                  console.log("addon equivaletnt Products", EquivalentProduct);
                  let EqP = [];
                  for (let j = 0; j < EquivalentProduct.length; j++) {
                    let pro = {
                      SalesInvoiceDetailsID: uuid.v4(),
                      SalesBillID: null,
                      BillNumber: null,
                      FiscalSpanID: 0,
                      BillType: addonProducts[i].BillType
                        ? addonProducts[i].BillType
                        : "",
                      SerialNumber: 1,
                      ProductCode: EquivalentProduct[j].ProductCode,
                      ProductName: EquivalentProduct[j].Name,
                      ProductName2: EquivalentProduct[j].Name2,
                      ProductType: EquivalentProduct[j].ProductType,
                      Quantity: addonProducts[i].Quantity,
                      UOMType: EquivalentProduct[j].UOMType,
                      UOMCode: EquivalentProduct[j].UOMCode,
                      UOMFragment: EquivalentProduct[j].UOMFragment,
                      UOMCode: EquivalentProduct[j].UOMCode,
                      UOMName: EquivalentProduct[j].UOMName,
                      Price: 0,
                      PriceOriginal: addonProducts[i].Price,
                      PriceType: item.PriceType,
                      DiscountRate: addonProducts[i].DiscountRate
                        ? addonProducts[i].DiscountRate
                        : 0,
                      DiscountAmount: 0,
                      TaxGroupID: EquivalentProduct[0].SaleTaxGroupCode,
                      IsTax1IncludedInPrice: false,
                      IsTax2IncludedInPrice: false,
                      Tax1Code: "",
                      Tax1Name: "",
                      Tax1Rate: 0,
                      Tax1Amount: 0,
                      Tax2Code: "",
                      Tax2Name: "",
                      Tax2Rate: 0,
                      Tax2Amount: 0,
                      GrandAmount: addonProducts[i].Price,
                      GroupDataID: "",
                      ProductBarCode: EquivalentProduct[j].ProductBarCode,
                      ReturnSalesBillDetailID: "",
                      DeliveryStatus: "",
                      DeliveryDate: "",
                      DeliveryTime: "",
                      DeliveryNote: "",
                      DeliveredDate: "",
                      DeliveredTime: "",
                      Remarks: "",
                      SalesAgentCode: null,
                      IsParentAddOn: false,
                      AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                      ParentInvoiceDetailsID: item.SalesInvoiceDetailsID,
                      OrignalQuantity: addonProducts[i].Quantity,
                      AddonProductDetailcode:
                        addonProducts[i].AddOnGroupDetailCode,
                      Ingredients: 0,
                      EarnedPoints: 0,
                      RedeemPoints: Number(0),
                      Status: 0,
                      ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                      MediaContentType: addonProducts[i].MediaContentType,
                      MediaContents: addonProducts[i].MediaContents,
                      HoldFromSale: EquivalentProduct[j].HoldFromSale,
                      parentIndex: index + 1,
                      parentQuantity: item.Quantity,
                      AddOnParentSalesInvoiceDetailsID:
                        item.SalesInvoiceDetailsID,
                      EquiProductCode: EquivalentProduct[j].EquiProductCode,
                    };
                    EqP.push(pro);
                  }

                  if (!isFind && addonProducts[i].ProductType !== 3) {
                    let pro = {
                      SalesInvoiceDetailsID: uuid.v4(),
                      SalesBillID: null,
                      BillNumber: null,
                      FiscalSpanID: 0,
                      BillType: addonProducts[i].BillType,
                      SerialNumber: 1,
                      ProductCode: addonProducts[i].ProductCode,
                      ProductName: addonProducts[i].Name,
                      ProductName2: addonProducts[i].Name2,
                      ProductType: addonProducts[i].ProductType,
                      Quantity: addonProducts[i].Quantity,
                      UOMType: addonProducts[i].UOMType,
                      UOMCode: addonProducts[i].UOMCode,
                      UOMFragment: addonProducts[i].UOMFragment,
                      UOMCode: addonProducts[i].UOMCode,
                      UOMName: addonProducts[i].UOMName,
                      Price: 0,
                      PriceOriginal: addonProducts[i].Price,

                      PriceType: item.PriceType,
                      DiscountRate: addonProducts[i].DiscountRate
                        ? addonProducts[i].DiscountRate
                        : 0,
                      DiscountAmount: 0,
                      TaxGroupID: addonProducts[i].SaleTaxGroupCode,
                      IsTax1IncludedInPrice: false,
                      IsTax2IncludedInPrice: false,
                      Tax1Code: "",
                      Tax1Name: "",
                      Tax1Rate: 0,
                      Tax1Amount: 0,
                      Tax2Code: "",
                      Tax2Name: "",
                      Tax2Rate: 0,
                      Tax2Amount: 0,
                      GrandAmount: addonProducts[i].Price,
                      GroupDataID: "",
                      ProductBarCode: addonProducts[i].ProductBarCode,
                      ReturnSalesBillDetailID: "",
                      DeliveryStatus: "",
                      DeliveryDate: "",
                      DeliveryTime: "",
                      DeliveryNote: "",
                      DeliveredDate: "",
                      DeliveredTime: "",
                      Remarks: "",
                      SalesAgentCode: null,
                      IsParentAddOn: false,
                      AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                      ParentInvoiceDetailsID: item.SalesInvoiceDetailsID,
                      OrignalQuantity: addonProducts[i].Quantity,
                      AddonProductDetailcode:
                        addonProducts[i].AddOnGroupDetailCode,
                      Ingredients: 0,
                      EarnedPoints: 0,
                      RedeemPoints: Number(0),
                      Status: 0,
                      ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                      MediaContentType: addonProducts[i].MediaContentType,
                      MediaContents: addonProducts[i].MediaContents,
                      HoldFromSale: addonProducts[i].HoldFromSale,
                      parentIndex: index + 1,
                      parentQuantity: item.Quantity,
                      AddOnParentSalesInvoiceDetailsID:
                        item.SalesInvoiceDetailsID,
                      EquivalentProducts: EqP,
                    };
                    products.push(pro);
                  }
                }
              );
              if (Array.isArray(products) && products !== undefined) {
                setReturnProducts(products);
                setTimeout(() => {
                  setisAddon(true);
                  setLoading(false);
                }, 500);
              }
            }
          }
        } else {
          Alert.alert(
            "Bnody Restaurant",
            "Please attach Addons then try again",
            [
              {
                text: "OK",
                onPress: () => {
                  setisAddon(false);
                  setLoading(false);
                },
              },
            ]
          );
        }
      }
    );
  };

  const getProductsIngredients = async (item) => {
    setLoading(true);
    let selectedProduct = [...selectedProducts];
    await getDataById(
      ProductCardIngredientsListTable,
      "ProductBarCode",
      item.ProductBarCode,
      (ingredients) => {
        // console.log(
        //   'ingredients.....',
        //   ingredients,
        //   'item?.ingredients',
        //   item?.ingredients,
        // );
        setIsIngredient(true);
        setIngredientsData(ingredients);
        setIngredientProductCode(item.ProductBarCode);
        setLoading(false);
      }
    );
  };
  const searchIngredientFun = (text) => {
    setLoading(true);

    let filteredName = [];

    if (text || text !== "") {
      ingredientsData.filter((item) => {
        if (
          item?.IngredientName?.toLowerCase().match(text?.toLowerCase()) ||
          item?.IngredientName1?.toLowerCase().match(text?.toLowerCase())
        ) {
          filteredName.push(item);
        }
      });
      setSearchIngredient(filteredName);
      setIsIngredientSearch(true);
      setLoading(false);
    } else {
      setSearchIngredient([]);
      setIsIngredientSearch(false);
      setLoading(false);
    }
  };
  const onSelectIngredintes = (item, ingredintItem, index) => {
    let ingredient = [...ingredientsData];
    let selectpro = [...selectedProducts];
    ingredient[index].isSelected = !item.isSelected;
    selectpro.forEach((pro) => {
      if (pro.ProductBarCode === item.ProductBarCode) {
        // console.log('select item run', item);
        if (ingredient[index].isSelected) {
          pro.IngredientsArray.push(item);
          pro.Ingredients =
            String(pro.Ingredients) + String(item.CategoryIngredientCode) + ",";
          pro.IngredientNames =
            String(pro.IngredientNames) + String(item.IngredientName) + ",";
        } else {
          const index = pro.IngredientsArray.findIndex(
            (res) => res.Id === item.Id
          );
          console.log("onSelectIngredintes ", index, pro.IngredientsArray);
          if (index > -1) {
            pro.IngredientsArray.splice(index, 1);
            pro.Ingredients = String(pro.Ingredients).replace(
              `${item.CategoryIngredientCode},`,
              ""
            );
            pro.IngredientNames = String(pro.IngredientNames).replace(
              `${item.IngredientName},`,
              ""
            );
            console.log(
              "pro.Ingredients.replace",
              pro.Ingredients,
              `${item.CategoryIngredientCode},`
            );
          }
        }
      }
    });

    setSelectedProducts(selectpro);
    setIngredientsData(ingredient);
  };

  const addIngredientFun = async () => {
    let UserLogin = await AsyncStorage.getItem("ACCESS_TOKEN");
    let ingredientName = ingredientText,
      cultureCode = I18nManager.isRTL ? "ar-SA" : "en-US",
      productBarCode = ingredientProductCode;

    const response1 = await props.dispatch(
      ServerCall(
        UserLogin,
        `Products/CreateProductIngredient?ingredientName=${ingredientName}&cultureCode=${cultureCode}&productBarCode=${productBarCode}`,
        "GET"
      )
    );

    // console.log('add new integredient', response1);
    let ing = [];
    ing.push(response1);
    InsertProductCardIngredientsList(ing);
  };
  const onPressAddIntgredient = () => {
    setMessage(props.StringsList._407);
    setAlertType("ingredient");
    setDisplayAlert(true);
    setisPromptAlert(true);
  };
  const getDetailofProduct = async (items) => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let filterCategoryProducts = [];

    for (let i = 0; i < items.length; i++) {
      var product = items[i];

      await getDataById(
        UpdateProductDetailListTable,
        "ProductBarCode",
        product?.ProductCode,
        async (productDeltail) => {
          if (productDeltail.length > 0) {
            filterCategoryProducts.push(productDeltail[0]);
          }
        }
      );
    }
    return filterCategoryProducts;
  };
  const getSelectedCategoryProducts = async (item, index) => {
    setLoading(true);
    let itemId = item
      ? item.ProductFamilyCode
      : allCategoreis[0].ProductFamilyCode;
    let selectCat = item ? item : allCategoreis[0];

    setSelectedcat(selectCat);
    setSelectedCatIndex(index);
    setToggle(false);

    setfocus(index ? index : 0);

    let catProducts = [];
    let filterCategoryProducts;

    await getDataById(
      ProductListTable,
      "ProductFamilyCode",
      itemId,
      (products) => {
        catProducts = products;
      }
    );
    filterCategoryProducts = await getDetailofProduct(catProducts);
    setLoading(false);
    setCategoryProducts(filterCategoryProducts);
    if (item) {
      onSelectProduct(null, filterCategoryProducts);
    }
    setLoading(false);
  };
  const toggleFun = () => {
    if (returnInvoiceNumber !== null && selectedProducts.length > 0) {
      restState();
    } else {
      setToggle(!isToggle);
    }
  };
  const onInvoiceClick = () => {
    let srNo = 1;
    selectedProducts.forEach((e) => {
      if (e.IsParentAddOn) {
        e.srNo = srNo++;
      } else {
        e.srNo = 0;
      }
    });
    if (storageItems && orderType.id === 1) {
      setSelectedOrderType(1);
    } else if (storageItems === null && orderType.id !== 1) {
      setSelectedOrderType(orderType.id);
    }
    setoptionsOpen(false);
    setPaymentsOpen(false);
    if (returnInvoiceNumber) {
      setisReturnInvoice(true);
    }
    setToggle(true);
  };

  const onSelectProduct = (item, filterCategoryProducts) => {
    console.log("Drawer check ", drawerSetupArr.isInitialCashSet);
    if (drawerSetupArr?.isInitialCashSet === "false") {
      onNewInvoice();
    } else {
      // onNewInvoice();
      let newArray = [];
      let categoryProduct = item
        ? [...categoryProducts]
        : filterCategoryProducts;

      if (item) {
        categoryProduct.forEach((product) => {
          if (product?.ProductBarCode === item?.ProductBarCode) {
            product.isSelected = true;
            product.Quantity = item?.Quantity ? item.Quantity : 1;
            newArray.push(product);
          } else {
            newArray.push(product);
          }
        });
        addProductToList(item, "increment");
      } else {
        if (selectedProducts.length > 0) {
          categoryProduct.forEach((product) => {
            let cartItems = selectedProducts.find(
              (x) => x.ProductBarCode === product.ProductBarCode
            );
            if (cartItems) {
              product.isSelected = true;
              product.Quantity = item?.Quantity ? item.Quantity : 1;
              newArray.push(product);
            } else {
              product.isSelected = false;
              newArray.push(product);
            }
          });
        }
      }
      setCategoryProducts(
        newArray.length > 0 ? newArray : filterCategoryProducts
      );
    }
  };
  const onSelectUpdatedProduct = (item, filterCategoryProducts, type) => {
    let newArray = [];
    let categoryProduct = item ? [...categoryProducts] : filterCategoryProducts;

    if (item) {
      categoryProduct.forEach((product) => {
        if (product?.ProductBarCode === item?.ProductBarCode) {
          product.isSelected = true;
          product.Quantity = item?.Quantity ? item.Quantity : 1;
          newArray.push(product);
        } else {
          newArray.push(product);
        }
      });
      updateProductToList(item, type);
    } else {
      if (selectedProducts.length > 0) {
        categoryProduct.forEach((product) => {
          let cartItems = selectedProducts.find(
            (x) => x.ProductBarCode === product.ProductBarCode
          );
          if (cartItems) {
            product.isSelected = true;
            product.Quantity = item?.Quantity ? item.Quantity : 1;
            newArray.push(product);
          } else {
            product.isSelected = false;
            newArray.push(product);
          }
        });
      }
    }
    setCategoryProducts(
      newArray.length > 0 ? newArray : filterCategoryProducts
    );
  };
  const deleteItem = (item, index) => {
    let sPrice = subPrice,
      tPrice = totalPrice;

    let remainProduct = [...selectedProducts];
    let addOn = remainProduct.filter((itm) => {
      if (itm.ParentInvoiceDetailsID === item.SalesInvoiceDetailsID) {
        sPrice = sPrice - itm.GrandAmount;
        tPrice = tPrice - itm.GrandAmount;
        return itm;
      }
    });
    remainProduct[index].isSelected = false;
    sPrice = sPrice - item.GrandAmount;
    tPrice = tPrice - item.GrandAmount;
    remainProduct.splice(index, addOn.length + 1);
    let srNo = 1;
    setNumberOfItems(srNo);
    let p = [...remainProduct];
    finalCalculation(p, "delete");
    remainProduct.forEach((e) => {
      if (e.IsParentAddOn) {
        e.srNo = srNo++;
      } else {
        e.srNo = 0;
      }
    });

    setSelectedProducts(remainProduct);
    let number = remainProduct.filter(
      (w) => w.IsParentAddOn === 1 || w.IsParentAddOn === true
    ).length;
    setNumberOfItems(number);
  };
  const numberToEngArbWords = (val, isEnglish) => {
    let value = Number(val);
    let words = "";
    if (isEnglish) {
      words = numberToWord.toWords(value);
    } else {
      words = new numberToArb(value, "SAR").parse();
    }
    return words;
  };
  const createNewOrderNumber = () => {
    getData(DrawerSetupTable, (cb) => {
      setDrawerSetupArr(cb[0]);
    });
    getData(TerminalConfigurationTable, (cb) => {
      let preZero = "0000000";
      let silceNumber =
        Number(cb[0]?.LastOrderNumber) >= 99999
          ? preZero.length - 5
          : Number(cb[0]?.LastOrderNumber) >= 9999
          ? preZero.length - 4
          : Number(cb[0]?.LastOrderNumber) >= 999
          ? preZero.length - 3
          : Number(cb[0]?.LastOrderNumber) >= 99
          ? preZero.length - 2
          : Number(cb[0]?.LastOrderNumber) >= 9
          ? preZero.length - 1
          : preZero.length;
      let newOrderNumber =
        Number(cb[0]?.LastOrderNumber) >= 999999
          ? cb[0].OrderPrefix + "-" + (Number(cb[0].LastOrderNumber) + 1)
          : cb[0].OrderPrefix +
            "-" +
            preZero.slice(1 - silceNumber) +
            (Number(cb[0].LastOrderNumber) + 1);

      setOrderNumber(newOrderNumber);
      createNewInvoiceNumber();
      setTerminalConfiguration(cb[0]);
      setSalesBillID(uuid.v4());
    });
  };
  const createReturnInvoiceNumber = () => {
    getData(DrawerSetupTable, (cb) => {
      setDrawerSetupArr(cb[0]);
    });
    getData(TerminalConfigurationTable, (cb) => {
      let preZero = "0000000";
      let silceNumber =
        Number(cb[0]?.LastReturnBillNumber) >= 99999
          ? preZero.length - 5
          : Number(cb[0]?.LastReturnBillNumber) >= 9999
          ? preZero.length - 4
          : Number(cb[0]?.LastReturnBillNumber) >= 999
          ? preZero.length - 3
          : Number(cb[0]?.LastReturnBillNumber) >= 99
          ? preZero.length - 2
          : Number(cb[0]?.LastReturnBillNumber) >= 9
          ? preZero.length - 1
          : preZero.length;
      let invoiceNumber =
        Number(cb[0]?.LastReturnBillNumber) >= 999999
          ? cb[0].BillReturnPrefix +
            "-" +
            (Number(cb[0].LastReturnBillNumber) + 1)
          : cb[0].BillReturnPrefix +
            "-" +
            preZero.slice(1 - silceNumber) +
            (Number(cb[0].LastReturnBillNumber) + 1);
      setReturnInvoiceNumber(invoiceNumber);
      setSalesBillID(uuid.v4());
      setTerminalConfiguration(cb[0]);
    });
  };
  const onPressBackCat = () => {
    if (noFamilyFound) {
      setToggle(false);
    } else {
      setToggle(false);
    }
  };
  const updateState = async () => {
    setLoading(true);
    setIsSearch(false);
    setPaymentAdded(false);
    setPrintType(null);
    props.navigation.navigate("home", { id: undefined });
    setOrderCode(true);
    setToggle(false);
    setSearchText("");
    setShowButton(false);
    selectedProducts.forEach((item) => {
      item.isSelected = false;
    });
    list.isOrderPlaced = false;

    setFocusSearch(false);
    setOrderValue(0);
    setCustomerNotes("");
    setSelectedOrderType(0);
    setSelectedProducts([]);
    setsubPrice(0);
    setOrderDetails(null);
    setProductIndex(null);
    setNotesModal(false);
    setglobalDiscountAmount(0);
    setTotalPrice(0);
    setRailStart(false);
    setNumberOfItems(0);
    setAdvancePaidInCash(0);
    setIngredientsData([]);
    setDueAmount(0);
    setPaymentsValue(null);
    setToggle(false);
    setPopup(false);
    seOptionsValue(null);
    setUriImage(null);
    setInvoice(false);
    setShortInvoice(false);
    setTerminalSetup(false);
    setPairPrinterFamily(false);
    setInvoiceNumber(null);
    setReturnInvoiceNumber(null);
    setSalesBillID(null);
    setCreditAmount(0);
    setGlobalDiscountRate(0);
    setStartTime(null);
    setisPromptAlert(false);
    setDisplayAlert(false);
    setisHoldInvoices(false);
    setMessage("");
    setHoldInvoiceName("");
    setScanner(false);
    setAlertValue(null);
    setAlertType(null);
    setReturnProducts([]);
    setisReturnInvoice(false);
    setGlobalTax(0);
    setEarnPointCArry([]);
    setEarnPointPArry([]);
    setEarnPointIArry([]);
    setBuyerInfo(null);
    setRedeemPoints(0);
    setCheckLoyalityReward(false);
    setStatus(0);
    setGlobalTaxObj(null);
    setSelectedGlobalTaxObj(null);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    setOrderType({ id: 0, value: "Select Type" });
    setPlaceWithPay(false);
    list.ordID = 0;
    list.billHasOrder = false;

    if (!noFamilyFound) {
      getSelectedCategoryProducts();
    } else {
      getAllCategories("isRestState");
    }
    setUserDiscountLimit(userConfiguration.DiscountLimit);
    setInvoiceDate(null);
    setLoading(false);
  };
  const restState = async () => {
    setLoading(true);

    setIsSearch(false);
    setPrintType(null);
    setPaymentAdded(false);
    props.navigation.navigate("home", { id: undefined });
    selectedProducts.forEach((item) => {
      item.isSelected = false;
    });
    list.isRefundReturnedCall = false;
    setFocusSearch(false);
    setCustomerNotes("");
    setOrderValue(0);
    list.isOrderPlaced = false;
    setSelectedOrderType(0);
    setRefOrderNumber(null);
    setSelectedProducts([]);
    setsubPrice(0);
    setOrderDetails(null);
    setProductIndex(null);
    setNotesModal(false);
    setglobalDiscountAmount(0);
    setTotalPrice(0);
    setRailStart(false);
    setNumberOfItems(0);
    setSearchText("");
    setAdvancePaidInCash(0);
    setIngredientsData([]);
    setDueAmount(0);
    setPaymentsValue(null);
    setToggle(false);
    setPopup(false);
    seOptionsValue(null);
    setUriImage(null);
    setInvoice(false);
    setShortInvoice(false);
    setTerminalSetup(false);
    setPairPrinterFamily(false);
    setInvoiceNumber(null);
    setOrderNumber(null);
    setReturnInvoiceNumber(null);
    setSalesBillID(null);
    setCreditAmount(0);
    setGlobalDiscountRate(0);
    setStartTime(null);
    setisPromptAlert(false);
    setDisplayAlert(false);
    setisHoldInvoices(false);
    setMessage("");
    setHoldInvoiceName("");
    setScanner(false);
    setAlertValue(null);
    setAlertType(null);
    setReturnProducts([]);
    setisReturnInvoice(false);
    setOrderCode(true);
    setToggle(false);
    setGlobalTax(0);
    setEarnPointCArry([]);
    setEarnPointPArry([]);
    setEarnPointIArry([]);
    setBuyerInfo(null);
    setRedeemPoints(0);
    setCheckLoyalityReward(false);
    setStatus(0);
    setGlobalTaxObj(null);
    setSelectedGlobalTaxObj(null);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    setOrderValue(0);
    setOrderType({ id: 0, value: "Select Type" });
    setPlaceWithPay(false);
    list.ordID = 0;
    list.billHasOrder = false;
    setShowButton(false);
    if (!noFamilyFound) {
      getSelectedCategoryProducts();
    } else {
      getAllCategories("isRestState");
    }
    setUserDiscountLimit(userConfiguration.DiscountLimit);
    setInvoiceDate(null);
    setLoading(false);
  };
  const getDrawerSetting = () => {
    getData(DrawerSetupTable, (cb) => {
      setDrawerSetupArr(cb[0]);
    });
  };
  const onNewInvoice = async (isCreateInvoice) => {
    if (drawerSetupArr.isInitialCashSet === "false") {
      viewref.current?.slideInRight(280);
      setIsDrawar(!isDrawar);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES
      );
      setPrintType(null);
      createNewOrderNumber();
      // ref_searchBar.current.focus();
    }
  };
  const changeTableStatus = async (TableCodeID) => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    // setLoading(true);

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
          // console.log('Table Removed=================>', storageItems);
        }
        setStorageItems(null);
        // setLoading(false);
      }
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }
  };
  const onClickCancel = async () => {
    if (orderNumber) {
      restState();
    }
  };

  const paymentMethodSelect = async (item) => {
    if (billingType || returnInvoiceNumber) {
      if (selectedProducts.length > 0 && paymentsValue) {
        let checkZeroPrice = selectedProducts.some(
          (p) =>
            p.PriceOriginal === 0 &&
            (p.IsParentAddOn === 1 || p.IsParentAddOn === true)
        );

        if (checkZeroPrice || totalPrice === 0) {
          setPaymentsValue(null);
          setMessage(props.StringsList._270);
          setRailStart(false);
          setDisplayAlert(true);
        } else {
          let selP = payments.filter((e) => e.PaymentType === paymentsValue);
          console.log("setSelectedPyamentMethod", selP[0]);
          setSelectedPyamentMethod(selP[0]);
          if (
            buyerInfo?.LoyaltyCard &&
            !checkLoyalityReward &&
            redeemPoints > 0
          ) {
            checkLoyalitRewardsFun();
            setCheckLoyalityReward(true);
          } else {
            if (paymentsValue === "2") {
              if (buyerInfo) {
                if (!isPopup) {
                  viewref.current?.slideInRight(280);
                  setPopup(!isPopup);
                } else {
                  setPaymentsValue(null);
                  viewref.current
                    ?.fadeOutRight()
                    .then(() => setPopup(!isPopup));
                  setRailStart(false);
                }
              } else {
                // setSelectedPyamentMethod(null)
                setPaymentsValue(null);
                setMessage(props.StringsList._367);
                setDisplayAlert(true);

                setRailStart(false);
              }
            } else if (paymentsValue === "4" || paymentsValue === "5") {
              if (!isPopup) {
                viewref.current?.slideInRight(280);
                setPopup(!isPopup);
              } else {
                setPaymentsValue(null);
                viewref.current?.fadeOutRight().then(() => setPopup(!isPopup));
                setRailStart(false);
              }

              // setLoading(false);
            } else {
              paymentProcess(null, selP[0]);
            }
          }
        }
      } else {
        if (paymentsValue) {
        }

        setPaymentsValue(null);
      }
    } else {
      if (selectedProducts.length > 0) setInvoice(true);
    }
  };

  const GetDecimalpart = (value) => {
    //let value = 1234
    let s = value.toString();
    let parts = s.split(".");
    let i1 = parseInt(parts[0]);
    let i2 = parseInt(parts[1]);
    // console.log("GetDecimalpart", i1, i2)
    return i2;
  };

  const A4RePrinterStyle = async (currentDate, qrUrl) => {
    console.log(
      "billingType A4PrinterStyle..",
      saleBilType,
      " terminal ",
      currentDate,
      invoiceDates,
      "product are",
      lastBillDetail.BillDetails
    );
    let pageId = returnInvoiceNumber
      ? "403007"
      : saleBilType?.id === 2
      ? "4030061"
      : "403006";

    // console.log("pageId....", pageId)
    setLoading(true);
    await getDataByMultipaleID(
      A4PrintStylesTable,
      "PageID",
      pageId,
      "UseDefault",
      "true",
      async (A4style) => {
        //  console.log("A4style", A4style)
        if (A4style.length === 0) {
          setLoading(false);
          alert("There is no A4 printing style available");
        } else {
          let updateStyle = "",
            updateHeader = A4style[0].ReportHeader,
            updateBody = "",
            updateFooter = A4style[0].ReportFooter;

          updateHeader = updateHeader.replace(
            "{{logo}}",
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration?.GoDownLogoType +
                  "," +
                  TerminalConfiguration?.GoDownLogo
              : TerminalConfiguration?.CompanyLogoType +
                  "," +
                  TerminalConfiguration?.CompanyLogo
          );
          updateHeader = updateHeader.replace(
            /{{companyName}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownName
              : TerminalConfiguration.CompanyName
          );
          updateHeader = updateHeader.replace(
            /{{ccrNumber}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GodownCCRNumber
              : TerminalConfiguration.CCRNumber
          );
          updateHeader = updateHeader.replace(
            /{{CompanyAddress}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownAddress
              : TerminalConfiguration.CompanyAddress
          );
          // updateHeader = updateHeader.replace(/1060/g, "1100")
          //updateHeader = updateHeader.replace(/20/g, "20")
          updateHeader = updateHeader.replace(
            /{{vatNumber}}/g,
            TerminalConfiguration?.ValueAddedTaxNumber
          );

          updateHeader = updateHeader.replace(
            "{{InvoiceTitleArabic}}",
            returnInvoiceNumber ? "استرداد المبيعات" : saleBilType?.name2
          );
          updateHeader = updateHeader.replace(
            "{{InvoiceTitleEnglish}}",
            returnInvoiceNumber ? "Sales Refund" : saleBilType?.name
          );
          updateHeader = updateHeader.replace("{{PDate}}", currentDate);
          updateHeader = updateHeader.replace(
            "{{dateDays}}",
            currentDate.split("/")[0]
          );
          updateHeader = updateHeader.replace(
            "{{dateMonth}}",
            currentDate.split("/")[1]
          );
          updateHeader = updateHeader.replace(
            "{{dateYear}}",
            currentDate.split(/[/" "]/)[2]
          );
          updateHeader = updateHeader.replace(
            /{{record_number}}/g,
            lastBillDetail.BillNumber
          );
          updateHeader = updateHeader.replace(
            /{{ReturnedBillNumber}}/g,
            returnInvoiceNumber
          );
          updateHeader = updateHeader.replace(
            /{{InvoiceDate}}/g,
            invoiceDates ? invoiceDates : currentDate.split(" ")[0]
          );
          updateHeader = updateHeader.replace(
            "{{BuyerName}}",
            lastBillDetail.BuyerName
          );
          updateHeader = updateHeader.replace(
            "{{BuyerCode}}",
            lastBillDetail.BuyerCode
          );
          updateHeader = updateHeader.replace(
            "{{BuyerVat}}",
            buyerInfo?.ValueAddedTaxNumber ? buyerInfo.ValueAddedTaxNumber : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerCCR}}",
            buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerPhone}}",
            buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerAddress}}",
            buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : ""
          );

          let tQ = 0;

          lastBillDetail.BillDetails.forEach((p, index) => {
            tQ = tQ + p.Quantity;
            //  console.log("A4style[0].ReportHeader......", A4style[0].ReportHeader)
            let body = A4style[0].ReportBody;
            body = body.replace("{{SerialNumber}}", index + 1);
            body = body.replace("{{ProductCode}}", p.ProductCode);
            body = body.replace("{{Description}}", p.ProductName);
            body = body.replace("{{ProductName}}", p.ProductName);
            body = body.replace("{{Quantity}}", Number(p.Quantity).toFixed(2));
            body = body.replace(
              "{{ProductTax}}",
              Number(p.tax).toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            body = body.replace("{{UnitName}}", p.UOMName);
            body = body.replace(
              "{{Price}}",
              Number(p.PriceWithOutTax).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{PriceSIG}}", parseInt(p.PriceWithOutTax));
            body = body.replace(
              "{{PricePoints}}",
              GetDecimalpart(
                Number(p.PriceWithOutTax).toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )
              )
            );
            body = body.replace(
              "{{PriceQuantity}}",
              Number(p.PriceWithOutTax * p.Quantity).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace(
              "{{GrandAmount}}",
              Number(p.GrandAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{GrandAmountSIG}}", parseInt(p.GrandAmount));
            body = body.replace(
              "{{GrandAmountPoints}}",
              GetDecimalpart(
                Number(p.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )
              )
            );
            body = body.replace(
              "{{Tax1Rate}}",
              Number(p.Tax1Rate).toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            body = body.replace(
              "{{Tax2Rate}}",
              Number(p.Tax2Rate).toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            body = body.replace(
              "{{Tax1Amount}}",
              Number(p.Tax1Amount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace(
              "{{Tax2Amount}}",
              Number(p.Tax2Amount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{Tax1Name}}", p.Tax1Name);
            body = body.replace("{{Tax2Name}}", p.Tax2Name);
            body = body.replace(
              "{{Discount}}",
              Number(p.DiscountAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{ProductDescription}}", p.IngredientNames);
            body = body.replace("{{ProductBarCode}}", p.ProductBarCode);

            updateBody = updateBody + body;
          });
          // updateFooter = updateFooter.replace(/1060/g, "1100")
          //updateFooter = updateFooter.replace(/30%/g, "20%")
          updateFooter = updateFooter.replace(
            "{{QRImage}}",
            "data:image/png;base64," + qrUrl
          );
          updateFooter = updateFooter.replace(
            "{{AmountWithOutTax}}",
            Number(lastBillDetail.GrandAmount).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{GrandAmountSIG}}",
            parseInt(lastBillDetail.GrandAmount)
          );
          updateFooter = updateFooter.replace(
            "{{grandAmountPoints}}",
            GetDecimalpart(
              Number(lastBillDetail.GrandAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            )
          );
          updateFooter = updateFooter.replace(
            "{{GlobalDiscountAmount}}",
            Number(lastBillDetail.GlobalDiscountAmount).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupAmount}}",
            Number(
              lastBillDetail.GlobalTax1Amount + lastBillDetail.GlobalTax2Amount
            ).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          // updateFooter = updateFooter.replace(
          //   '{{TaxGroupNames}}',
          //   globalTaxObj?.globalTaxGroupName
          //     ? globalTaxObj.globalTaxGroupName
          //     : 'Global Tax',
          // );
          updateFooter = updateFooter.replace(
            "{{Roundoff}}",
            (0).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{CashAdvance}}",
            Number(lastBillDetail.AdvancePaidInCash).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{AdvanceAmount}}",
            Number(lastBillDetail.AdvancePaidInCash).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{CashPaid}}",
            Number(
              lastBillDetail.AdvancePaidInCash
                ? lastBillDetail.NetAmount - lastBillDetail.AdvancePaidInCash
                : lastBillDetail.NetAmount
            ).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{PaymentMethod}}",
            selectedPyamentMethod?.PaymentTypeName
          );
          updateFooter = updateFooter.replace("{{companyCurrency}}", "");
          updateFooter = updateFooter.replace(
            "{{NetAmount}}",
            Number(lastBillDetail.NetAmount).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{NetAmountSIG}}",
            parseInt(lastBillDetail.NetAmount)
          );
          updateFooter = updateFooter.replace(
            "{{netAmountPoints}}",
            GetDecimalpart(
              Number(lastBillDetail.NetAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            )
          );
          updateFooter = updateFooter.replace(
            "{{TotalQty}}",
            Number(tQ).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{TotalItems}}",
            lastBillDetail.BillDetails.length
          );
          updateFooter = updateFooter.replace(
            "{{NetAmountAR}}",
            numberToEngArbWords(
              Number(lastBillDetail.NetAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{GrandAmountEN}}",
            numberToEngArbWords(
              Number(lastBillDetail.GrandAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{GrandAmountAR}}",
            numberToEngArbWords(
              Number(lastBillDetail.GrandAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{AmountWithOutTaxEN}}",
            numberToEngArbWords(
              Number(lastBillDetail.GrandAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{AmountWithOutTaxAR}}",
            numberToEngArbWords(
              Number(lastBillDetail.GrandAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{GlobalDiscountAmountEN}}",
            numberToEngArbWords(
              Number(lastBillDetail.GlobalDiscountAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{GlobalDiscountAmountAR}}",
            numberToEngArbWords(
              Number(lastBillDetail.GlobalDiscountAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{NetAmountEN}}",
            numberToEngArbWords(
              Number(lastBillDetail.NetAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupAmount}}",
            Number(
              lastBillDetail.GlobalTax1Amount + lastBillDetail.GlobalTax2Amount
            ).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupNames}}",
            globalTaxObj?.globalTaxGroupName
              ? globalTaxObj.globalTaxGroupName
              : "ضريبة القيمة المضافة %15 "
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupAmountSIG}}",
            parseInt(
              lastBillDetail.GlobalTax1Amount + lastBillDetail.GlobalTax2Amount
            )
          );
          updateFooter = updateFooter.replace(
            "{{taxGroupPoints}}",
            GetDecimalpart(
              Number(
                lastBillDetail.GlobalTax1Amount +
                  lastBillDetail.GlobalTax2Amount
              ).toFixed(TerminalConfiguration.DecimalsInAmount)
            )
          );
          updateFooter = updateFooter.replace("{{TaxGroupsAR}}", "");
          updateFooter = updateFooter.replace("{{TaxGroupsEN}}", "");
          updateFooter = updateFooter.replace(
            /{{CompanyAddress}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownAddress
              : TerminalConfiguration.CompanyAddress
          );
          updateFooter = updateFooter.replace(
            /{{SalesAgentName}}/g,
            selectedAgent?.SalesAgentName
              ? selectedAgent?.SalesAgentName
              : TerminalConfiguration?.SalesAgentName
          );

          updateFooter = updateFooter.replace(
            /{{companyName}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownName
              : TerminalConfiguration.CompanyName
          );
          updateFooter = updateFooter.replace(
            /{{ccrNumber}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GodownCCRNumber
              : TerminalConfiguration.CCRNumber
          );

          updateFooter = updateFooter.replace(
            /{{vatNumber}}/g,
            TerminalConfiguration?.ValueAddedTaxNumber
          );

          updateFooter = updateFooter.replace("{{PDate}}", currentDate);
          updateFooter = updateFooter.replace(
            "{{dateDays}}",
            currentDate.split("/")[0]
          );
          updateFooter = updateFooter.replace(
            "{{dateMonth}}",
            currentDate.split("/")[1]
          );
          updateFooter = updateFooter.replace(
            "{{dateYear}}",
            currentDate.split(/[/" "]/)[2]
          );
          updateFooter = updateFooter.replace(
            /{{record_number}}/g,
            lastBillDetail.BillNumber
          );
          updateFooter = updateFooter.replace(
            /{{ReturnedBillNumber}}/g,
            returnInvoiceNumber
          );
          updateFooter = updateFooter.replace(
            /{{InvoiceDate}}/g,
            invoiceDates ? invoiceDates : currentDate
          );
          updateFooter = updateFooter.replace(
            "{{BuyerName}}",
            buyerInfo?.BuyerName ? buyerInfo.BuyerName : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerCode}}",
            buyerInfo?.BuyerCode ? buyerInfo.BuyerCode : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerVat}}",
            buyerInfo?.ValueAddedTaxNumber ? buyerInfo.ValueAddedTaxNumber : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerCCR}}",
            buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerPhone}}",
            buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerAddress}}",
            buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : ""
          );
          //  updateFooter = updateFooter.replace(/{{CompanyAddress}}/g, saleAgent)
          //console.log("updateStyleupdateStyleupdateStyle", updateHeader)
          updateStyle = updateHeader + updateBody + updateFooter;
          console.log("updateStyleupdateStyleupdateStyle", updateStyle);
          await RNPrint.print({
            html: updateStyle,
          });
        }
        setLoading(false);
        onSaveInvoice();
        lastBillDetail = null;
      }
    );
  };

  const A4PrinterStyle = async (currentDate, qrUrl) => {
    console.log(
      "billingType A4PrinterStyle..",
      saleBilType,
      " terminal ",
      currentDate,
      invoiceDates,
      "product are",
      selectedProducts
    );
    let pageId = returnInvoiceNumber
      ? "403007"
      : saleBilType?.id === 2
      ? "4030061"
      : "403006";

    // console.log("pageId....", pageId)
    setLoading(true);
    await getDataByMultipaleID(
      A4PrintStylesTable,
      "PageID",
      pageId,
      "UseDefault",
      "true",
      async (A4style) => {
        //  console.log("A4style", A4style)
        if (A4style.length === 0) {
          setLoading(false);
          alert("There is no A4 printing style available");
        } else {
          let updateStyle = "",
            updateHeader = A4style[0].ReportHeader,
            updateBody = "",
            updateFooter = A4style[0].ReportFooter;

          updateHeader = updateHeader.replace(
            "{{logo}}",
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration?.GoDownLogoType +
                  "," +
                  TerminalConfiguration?.GoDownLogo
              : TerminalConfiguration?.CompanyLogoType +
                  "," +
                  TerminalConfiguration?.CompanyLogo
          );
          updateHeader = updateHeader.replace(
            /{{companyName}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownName
              : TerminalConfiguration.CompanyName
          );
          updateHeader = updateHeader.replace(
            /{{ccrNumber}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GodownCCRNumber
              : TerminalConfiguration.CCRNumber
          );
          updateHeader = updateHeader.replace(
            /{{CompanyAddress}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownAddress
              : TerminalConfiguration.CompanyAddress
          );
          // updateHeader = updateHeader.replace(/1060/g, "1100")
          //updateHeader = updateHeader.replace(/20/g, "20")
          updateHeader = updateHeader.replace(
            /{{vatNumber}}/g,
            TerminalConfiguration?.ValueAddedTaxNumber
          );

          updateHeader = updateHeader.replace(
            "{{InvoiceTitleArabic}}",
            returnInvoiceNumber ? "استرداد المبيعات" : saleBilType?.name2
          );
          updateHeader = updateHeader.replace(
            "{{InvoiceTitleEnglish}}",
            returnInvoiceNumber ? "Sales Refund" : saleBilType?.name
          );
          updateHeader = updateHeader.replace("{{PDate}}", currentDate);
          updateHeader = updateHeader.replace(
            "{{dateDays}}",
            currentDate.split("/")[0]
          );
          updateHeader = updateHeader.replace(
            "{{dateMonth}}",
            currentDate.split("/")[1]
          );
          updateHeader = updateHeader.replace(
            "{{dateYear}}",
            currentDate.split(/[/" "]/)[2]
          );
          updateHeader = updateHeader.replace(
            /{{record_number}}/g,
            invoiceNumber
          );
          updateHeader = updateHeader.replace(
            /{{ReturnedBillNumber}}/g,
            returnInvoiceNumber
          );
          updateHeader = updateHeader.replace(
            /{{InvoiceDate}}/g,
            invoiceDates ? invoiceDates : currentDate.split(" ")[0]
          );
          updateHeader = updateHeader.replace(
            "{{BuyerName}}",
            buyerInfo?.BuyerName ? buyerInfo.BuyerName : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerCode}}",
            buyerInfo?.BuyerCode ? buyerInfo.BuyerCode : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerVat}}",
            buyerInfo?.ValueAddedTaxNumber ? buyerInfo.ValueAddedTaxNumber : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerCCR}}",
            buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerPhone}}",
            buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : ""
          );
          updateHeader = updateHeader.replace(
            "{{BuyerAddress}}",
            buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : ""
          );

          let tQ = 0;

          selectedProducts.forEach((p, index) => {
            tQ = tQ + p.Quantity;
            //  console.log("A4style[0].ReportHeader......", A4style[0].ReportHeader)
            let body = A4style[0].ReportBody;
            body = body.replace("{{SerialNumber}}", index + 1);
            body = body.replace("{{ProductCode}}", p.ProductCode);
            body = body.replace("{{Description}}", p.ProductName);
            body = body.replace("{{ProductName}}", p.ProductName);
            body = body.replace("{{Quantity}}", Number(p.Quantity).toFixed(2));
            body = body.replace(
              "{{ProductTax}}",
              Number(p.tax).toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            body = body.replace("{{UnitName}}", p.UOMName);
            body = body.replace(
              "{{Price}}",
              Number(p.PriceWithOutTax).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{PriceSIG}}", parseInt(p.PriceWithOutTax));
            body = body.replace(
              "{{PricePoints}}",
              GetDecimalpart(
                Number(p.PriceWithOutTax).toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )
              )
            );
            body = body.replace(
              "{{PriceQuantity}}",
              Number(p.PriceWithOutTax * p.Quantity).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace(
              "{{GrandAmount}}",
              Number(p.GrandAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{GrandAmountSIG}}", parseInt(p.GrandAmount));
            body = body.replace(
              "{{GrandAmountPoints}}",
              GetDecimalpart(
                Number(p.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )
              )
            );
            body = body.replace(
              "{{Tax1Rate}}",
              Number(p.Tax1Rate).toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            body = body.replace(
              "{{Tax2Rate}}",
              Number(p.Tax2Rate).toFixed(TerminalConfiguration.DecimalsInAmount)
            );
            body = body.replace(
              "{{Tax1Amount}}",
              Number(p.Tax1Amount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace(
              "{{Tax2Amount}}",
              Number(p.Tax2Amount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{Tax1Name}}", p.Tax1Name);
            body = body.replace("{{Tax2Name}}", p.Tax2Name);
            body = body.replace(
              "{{Discount}}",
              Number(p.DiscountAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              )
            );
            body = body.replace("{{ProductDescription}}", p.IngredientNames);
            body = body.replace("{{ProductBarCode}}", p.ProductBarCode);

            updateBody = updateBody + body;
          });
          // updateFooter = updateFooter.replace(/1060/g, "1100")
          //updateFooter = updateFooter.replace(/30%/g, "20%")
          updateFooter = updateFooter.replace(
            "{{QRImage}}",
            "data:image/png;base64," + qrUrl
          );
          updateFooter = updateFooter.replace(
            "{{AmountWithOutTax}}",
            Number(subPrice).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{GrandAmountSIG}}",
            parseInt(subPrice)
          );
          updateFooter = updateFooter.replace(
            "{{grandAmountPoints}}",
            GetDecimalpart(
              Number(subPrice).toFixed(TerminalConfiguration.DecimalsInAmount)
            )
          );
          updateFooter = updateFooter.replace(
            "{{GlobalDiscountAmount}}",
            Number(globalDiscountAmount).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupAmount}}",
            Number(globalTax).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupNames}}",
            globalTaxObj?.globalTaxGroupName
              ? globalTaxObj.globalTaxGroupName
              : "Global Tax"
          );
          updateFooter = updateFooter.replace(
            "{{Roundoff}}",
            (0).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{CashAdvance}}",
            Number(advancePaidInCash).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{AdvanceAmount}}",
            Number(advancePaidInCash).toFixed(
              TerminalConfiguration.DecimalsInAmount
            )
          );
          updateFooter = updateFooter.replace(
            "{{CashPaid}}",
            Number(
              advancePaidInCash ? totalPrice - advancePaidInCash : totalPrice
            ).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{PaymentMethod}}",
            selectedPyamentMethod?.PaymentTypeName
          );
          updateFooter = updateFooter.replace("{{companyCurrency}}", "");
          updateFooter = updateFooter.replace(
            "{{NetAmount}}",
            Number(totalPrice).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{NetAmountSIG}}",
            parseInt(totalPrice)
          );
          updateFooter = updateFooter.replace(
            "{{netAmountPoints}}",
            GetDecimalpart(
              Number(totalPrice).toFixed(TerminalConfiguration.DecimalsInAmount)
            )
          );
          updateFooter = updateFooter.replace(
            "{{TotalQty}}",
            Number(tQ).toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{TotalItems}}",
            selectedProducts.length
          );
          updateFooter = updateFooter.replace(
            "{{NetAmountAR}}",
            numberToEngArbWords(
              Number(totalPrice).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{GrandAmountEN}}",
            numberToEngArbWords(
              Number(subPrice).toFixed(TerminalConfiguration.DecimalsInAmount),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{GrandAmountAR}}",
            numberToEngArbWords(
              Number(subPrice).toFixed(TerminalConfiguration.DecimalsInAmount),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{AmountWithOutTaxEN}}",
            numberToEngArbWords(
              Number(subPrice).toFixed(TerminalConfiguration.DecimalsInAmount),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{AmountWithOutTaxAR}}",
            numberToEngArbWords(
              Number(subPrice).toFixed(TerminalConfiguration.DecimalsInAmount),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{GlobalDiscountAmountEN}}",
            numberToEngArbWords(
              Number(globalDiscountAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{GlobalDiscountAmountAR}}",
            numberToEngArbWords(
              Number(globalDiscountAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              false
            )
          );
          updateFooter = updateFooter.replace(
            "{{NetAmountEN}}",
            numberToEngArbWords(
              Number(totalPrice).toFixed(
                TerminalConfiguration.DecimalsInAmount
              ),
              true
            )
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupAmount}}",
            globalTax.toFixed(TerminalConfiguration.DecimalsInAmount)
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupNames}}",
            globalTaxObj?.globalTaxGroupName
              ? globalTaxObj.globalTaxGroupName
              : "ضريبة القيمة المضافة %15 "
          );
          updateFooter = updateFooter.replace(
            "{{TaxGroupAmountSIG}}",
            parseInt(globalTax)
          );
          updateFooter = updateFooter.replace(
            "{{taxGroupPoints}}",
            GetDecimalpart(
              Number(globalTax).toFixed(TerminalConfiguration.DecimalsInAmount)
            )
          );
          updateFooter = updateFooter.replace("{{TaxGroupsAR}}", "");
          updateFooter = updateFooter.replace("{{TaxGroupsEN}}", "");
          updateFooter = updateFooter.replace(
            /{{CompanyAddress}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownAddress
              : TerminalConfiguration.CompanyAddress
          );
          updateFooter = updateFooter.replace(
            /{{SalesAgentName}}/g,
            selectedAgent?.SalesAgentName
              ? selectedAgent?.SalesAgentName
              : TerminalConfiguration?.SalesAgentName
          );

          updateFooter = updateFooter.replace(
            /{{companyName}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GoDownName
              : TerminalConfiguration.CompanyName
          );
          updateFooter = updateFooter.replace(
            /{{ccrNumber}}/g,
            TerminalConfiguration?.IsGodownInfo === "true"
              ? TerminalConfiguration.GodownCCRNumber
              : TerminalConfiguration.CCRNumber
          );

          updateFooter = updateFooter.replace(
            /{{vatNumber}}/g,
            TerminalConfiguration?.ValueAddedTaxNumber
          );

          updateFooter = updateFooter.replace("{{PDate}}", currentDate);
          updateFooter = updateFooter.replace(
            "{{dateDays}}",
            currentDate.split("/")[0]
          );
          updateFooter = updateFooter.replace(
            "{{dateMonth}}",
            currentDate.split("/")[1]
          );
          updateFooter = updateFooter.replace(
            "{{dateYear}}",
            currentDate.split(/[/" "]/)[2]
          );
          updateFooter = updateFooter.replace(
            /{{record_number}}/g,
            invoiceNumber
          );
          updateFooter = updateFooter.replace(
            /{{ReturnedBillNumber}}/g,
            returnInvoiceNumber
          );
          updateFooter = updateFooter.replace(
            /{{InvoiceDate}}/g,
            invoiceDates ? invoiceDates : currentDate
          );
          updateFooter = updateFooter.replace(
            "{{BuyerName}}",
            buyerInfo?.BuyerName ? buyerInfo.BuyerName : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerCode}}",
            buyerInfo?.BuyerCode ? buyerInfo.BuyerCode : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerVat}}",
            buyerInfo?.ValueAddedTaxNumber ? buyerInfo.ValueAddedTaxNumber : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerCCR}}",
            buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerPhone}}",
            buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : ""
          );
          updateFooter = updateFooter.replace(
            "{{BuyerAddress}}",
            buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : ""
          );
          //  updateFooter = updateFooter.replace(/{{CompanyAddress}}/g, saleAgent)
          //console.log("updateStyleupdateStyleupdateStyle", updateHeader)
          updateStyle = updateHeader + updateBody + updateFooter;
          console.log("updateStyle", updateStyle);
          await RNPrint.print({
            html: updateStyle,
          });
        }
        setLoading(false);
        onSaveInvoice();
      }
    );
  };

  const printerSelection = (invoiceInfoObj, urii) => {
    let currentDate = moment().format("DD/MM/YYYY HH:mm:ss");
    if (billingStyleId === 1) {
      qrRef.current.toDataURL((qrUrl) => {
        A4PrinterStyle(currentDate, qrUrl);
      });
    } else if (printerMacAddress) {
      PrinterNativeModule.printing(JSON.stringify(invoiceInfoObj), urii, "[]");
    }
  };

  const ReprinterSelection = (invoiceInfoObj, urii) => {
    let currentDate = moment().format("DD/MM/YYYY HH:mm:ss");
    if (billingStyleId === 1) {
      qrRef.current.toDataURL((qrUrl) => {
        A4RePrinterStyle(currentDate, qrUrl);
      });
    } else if (printerMacAddress) {
      PrinterNativeModule.printing(JSON.stringify(invoiceInfoObj), urii, "[]");
    }
  };

  const paymentProcess = async (ADamount, selP, type) => {
    let ConnectedBluetoothInfo = await AsyncStorage.getItem(
      "ConnectedBluetoothInfo"
    );

    if (ConnectedBluetoothInfo) {
      console.log("ConnectedBluetoothInfo", ConnectedBluetoothInfo);
      let printAdress = ConnectedBluetoothInfo?.split("|");
      setPrinterMacAddress(printAdress[1]);
      setPrinterName(printAdress[0]);
    }

    setLoading(true);

    //getDataURL()

    setUriImage(null);
    if (type !== "reprint") {
      setTimeout(() => {
        selectedProductUpdate();
        saleBill(ADamount, selP);
        if (returnInvoiceNumber) {
          updateReturnTerminalConfiguration();
          postBills();
          Toast.show("Return Invoice Posted Successfully");
        } else {
          updateTerminalConfiguration(ADamount);
        }
        if (billingStyleId !== 1) {
          setInvoice(true);
        } else {
          printerSelection();
        }
        setLoading(false);
      }, 0);
    } else {
      setTimeout(() => {
        // console.log('reprint bill advancePaidInCash', ADamount, billingStyleId);
        // updateTerminalConfiguration(ADamount);
        if (billingStyleId !== 1) {
          setTimeout(() => {
            setInvoice(true);
            setLoading(false);
          }, 5000);
        } else {
          // console.log('printer are', selectedProducts);
          ReprinterSelection();
          // printerSelection();
        }
        // setLoading(false);
      }, 1500);
    }
  };
  useMemo(async () => {
    if (placedwithPay) {
      let isOrderPlaced = await placeOrderWithPay();
      if (isOrderPlaced) paymentMethodSelect();
    } else {
      paymentMethodSelect();
    }
  }, [paymentsValue]);

  const otherOptions = () => {
    if (optionsValue === "holdInvoice") {
      if (selectedProducts.length > 0) {
        setMessage(props.StringsList._78);
        setAlertType("holdInvoice");
        setDisplayAlert(true);
        setisPromptAlert(true);
        // holdInvoiceFun();
      } else {
        let msg = errorMessages.GetCounterMessage(
          "noItemUnableHold",
          props.StringsList
        );
        setMessage(msg);
        setDisplayAlert(true);
        seOptionsValue(null);
      }
    } else if (optionsValue === "getHoldInvoice") {
      setisHoldInvoices(true);
      seOptionsValue(null);
      // getHoldInvoiveFun();
    } else if (optionsValue === "scanner") {
      setScanner(true);
      seOptionsValue(null);
    } else if (optionsValue === "returnBill") {
      setMessage(props.StringsList._63);
      setAlertType("returnInvoice");
      setDisplayAlert(true);
      setisPromptAlert(true);
    } else if (optionsValue === "buyer") {
      //  console.log("paymentsValue in buyer", paymentsValue, isBuyer, buyerViewRef, viewref)
      if (!isBuyer) {
        buyerViewRef.current?.slideInRight(280);
        setisBuyer(!isBuyer);
      } else {
        // console.log("paymentsValue in buyer else")
        seOptionsValue(null);
        buyerViewRef.current?.fadeOutRight().then(() => setisBuyer(!isBuyer));
      }
    } else if (optionsValue === "loyaltyCard") {
      if (!isLoyaltyCard) {
        loyaltyCardViewRef.current?.slideInRight(280);
        setIsLoyaltyCard(!isLoyaltyCard);
      } else {
        seOptionsValue(null);
        loyaltyCardViewRef.current
          ?.fadeOutRight()
          .then(() => setIsLoyaltyCard(!isLoyaltyCard));
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
  const onEndEditing = (type, item) => {
    // console.log('onEndEditing..', type, item);
    if (type === "manuallyCount") {
      onManuallyAddCount(item);
    } else if (type === "DiscountAmount") {
      onManuallyAddDiscount(item, "DiscountAmount");
    } else if (type === "DiscountRate") {
      onManuallyAddDiscount(item, "DiscountRate");
    } else if (type === "globalDiscount") {
      globalDiscountAmountFun(type);
    } else if (type === "globalDiscountP") {
      globalDiscountAmountFun(type);
    } else if (type === "cashPaid") {
      cashPaidAmountFun();
    } else if (type === "changePrice") {
      onManuallyChangePrice(item);
    }
  };

  const searchTextFun = (e) => {
    if (isFocusSearch === true) {
      let text = searchText.toLowerCase();
      let filteredName = [];
      if (text && text !== "") {
        setbarCodeText(text);

        if (barCode) {
          setLoading(true);
          onSuccessScan(text);
          ref_searchBar.current.focus();
          setSearchText("");
        } else {
          getData(UpdateProductDetailListTable, (productsDetail) => {
            productsDetail.filter((item) => {
              if (
                item.ProductName.toLowerCase().match(text) ||
                item.ProductBarCode.toLowerCase().match(text) ||
                item.ProductName2.toLowerCase().match(text)
              ) {
                filteredName.push(item);
              }
            });
            setCategoryProducts(filteredName);
            setIsSearch(false);
            setLoading(false);
          });
        }
      } else {
        if (!barCode) {
          getAllCategories(null);
        }
        setIsSearch(false);
        setLoading(false);
      }
    } else {
      setSearchText("");
      setIsSearch(false);
    }
  };

  const toggleSearchScan = () => {
    setBarCode(!barCode);
    ref_searchBar.current.focus();
    setbarCodeText("");
  };
  const onCapture = (uri) => {
    captureRef(viewShotRef.current, {
      format: "png",
      quality: 1.0,
    }).then(
      (urii) => {
        // setUriImage(urii);
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  };

  const onQRImage = () => {
    captureRef(qrRef2.current, {
      format: "png",
      quality: 1.0,
    }).then(
      async (urii) => {
        setUriImage(urii);
        //console.log("invoice info object", globalDiscountAmount, sumOfProductDiscount)

        let invoiceTypeE = !companyVATRegistor
          ? " Ordinary sales invoice"
          : totalPrice < 1000
          ? "Simplified tax invoice"
          : "Tax invoice";
        let invoiceTypeA = !companyVATRegistor
          ? "فاتورة مبيعات عادية"
          : totalPrice < 1000
          ? "فاتورة ضريبية مبسطة"
          : "فاتورة ضريبية";
        let currentDate = moment().format("DD/MM/YYYY HH:mm:ss");

        //         let whiteSpaceName = "";
        //         if (w[w.length - 1].length < 12) {
        //           whiteSpaceName = "            "
        //           // console.log("whiteSpace before trim", whiteSpaceName.length)
        //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
        //           // console.log("whiteSpace after trim", whiteSpaceName.length)
        //         }
        let whiteSpace = "            "; // 12
        let totalAmountSpace = whiteSpace.slice(
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
          whiteSpace.length
        );
        let subPriceSpce = whiteSpace.slice(
          (subPrice - sumOfProductDiscount - sumOfProductTax).toFixed(
            TerminalConfiguration.DecimalsInAmount
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length
        );
        let taxSpace = whiteSpace.slice(
          (globalTax + sumOfProductTax).toFixed(
            TerminalConfiguration.DecimalsInAmount
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length
        );
        let discountSpace = whiteSpace.slice(
          (globalDiscountAmount + sumOfProductDiscount).toFixed(
            TerminalConfiguration.DecimalsInAmount
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length
        );
        let invoiceInfoObj = [
          {
            printerMacAddress: printerMacAddress,
            printerName: printerName,
            tagNo: terminalSetup.StartFrom,
            invoiceNumber: orderNumber,
            totalPrice: totalPrice.toFixed(
              TerminalConfiguration.DecimalsInAmount
            ),
            subPrice: (
              subPrice -
              sumOfProductDiscount -
              sumOfProductTax
            ).toFixed(TerminalConfiguration.DecimalsInAmount),
            globalDiscountAmount: globalDiscountAmount,
            salesmanName: selectedAgent?.SalesAgentName
              ? selectedAgent?.SalesAgentName
              : TerminalConfiguration?.SalesAgentName,
            TerminalCode: TerminalConfiguration?.TerminalCode,
            // sumOfProductTax:sumOfProductTax,
            totalTax: (globalTax + sumOfProductTax).toFixed(
              TerminalConfiguration.DecimalsInAmount
            ),
            totalDiscount: (
              globalDiscountAmount + sumOfProductDiscount
            ).toFixed(TerminalConfiguration.DecimalsInAmount),
            paymentType: selectedPyamentMethod?.PaymentTypeName,
            totalAmountSpace: totalAmountSpace,
            subPriceSpce: subPriceSpce,
            taxSpace: taxSpace,
            discountSpace: discountSpace,
            currentDate: currentDate,
            ar: I18nManager.isRTL ? "ar" : "en",
            ...TerminalConfiguration,
            invoiceType: I18nManager.isRTL ? invoiceTypeA : invoiceTypeE,
            companyVAT: `${props.StringsList._180} : ${TerminalConfiguration.ValueAddedTaxNumber}`,
            isBuyer: buyerInfo ? true : false,
            ...buyerInfo,
          },
        ];
        console.log("invoice info object", selectedProducts);
        if (!shortInvoice) {
          if (printerMacAddress) {
            PrinterNativeModule.printing(
              JSON.stringify(invoiceInfoObj),
              urii,
              "[]"
            );
          }
        }
        // let base64data = await RNFS.readFile(urii, 'base64').then();

        // console.log(base64data);
        // createInvoiceStyle(base64data)
        // console.log('qrRef2, snapshot qrRef2', base64data)
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  };

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = async () => {
      if (Platform.Version >= 33) {
        const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] =
          await Promise.all([
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            ),
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
            ),
          ]);
        return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = async () => {
      if (Platform.Version >= 33) {
        const statuses = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        return (
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
    };

    return await getRequestPermissionPromise();
  }
  async function saveToGallery() {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(uriImage, {
      type: "photo",
      album: "Bnody",
    });
  }
  // const saveToGallery = async () => {
  //   await CameraRoll.save(uriImage, {
  //     type: 'photo',
  //     album: 'Bnody',
  //   });
  // };

  const onSaveInvoice = (type) => {
    if (storageItems) {
      emptyAsyncTableObj();
    }
    setInvoice(false);
    if (type === "save") {
      saveToGallery();
      props.navigation.navigate("home", { id: undefined });
      setOrderCode(true);
      setToggle(false);
      setInvoiceNumber(null);
      setOrderNumber(null);
      setRefOrderNumber(null);

      restState();
    } else {
      if (storageItems) {
        emptyAsyncTableObj();
      }
      props.navigation.navigate("home", { id: undefined });
      setOrderCode(true);
      setToggle(false);
      restState();
      setInvoiceNumber(null);
      setOrderNumber(null);
      setRefOrderNumber(null);
    }
  };

  const saleBill = async (ADamount, selP) => {
    let ADPay = ADamount ? ADamount : advancePaidInCash;
    // createInvoiceStyle()
    let earnPoint = 0;
    if (buyerInfo?.LoyaltyCard) earnPoint = await invoiceEarnPoints();

    let currentDate = moment().format("YYYYMMDD");
    let time = moment().format("HH:mm:ss");
    let netAmountTest = totalPrice - ADPay;
    let roundOffAmountTest = totalPrice - ADPay;

    let obj = {
      SalesInvoiceID: salesBillID,
      InvoiceNumber: returnInvoiceNumber ? returnInvoiceNumber : invoiceNumber,
      fiscalSpanID: TerminalConfiguration?.FiscalSpanID,
      OrderCode: orderNumber ? (list.isOrderPlaced ? orderNumber : "") : "",
      TableCode: String(list.ordID === 1 ? storageItems?.TableCodeID : ""),
      OrderType: Number(list.ordID),
      InvoiceDate: currentDate,
      InvoiceType: returnInvoiceNumber ? 2 : 1,
      paymentType: selP ? selP.PaymentType : selectedPyamentMethod?.PaymentType,
      godownCode: TerminalConfiguration?.GoDownCode,

      cardDetails: "",

      salesagentCode: selectedAgent?.SalesAgentCode
        ? selectedAgent.SalesAgentCode
        : TerminalConfiguration?.SalesAgentCode,
      salesmanName: selectedAgent?.SalesAgentName
        ? selectedAgent?.SalesAgentName
        : TerminalConfiguration?.SalesAgentName,
      grandAmount: subPrice.toFixed(TerminalConfiguration.DecimalsInAmount),

      globalDiscountRate: globalDiscountRate,
      globalDiscountAmount: globalDiscountAmount,
      globalTax1Code: globalTaxObj?.Tax1Code ? globalTaxObj.Tax1Code : "",
      globalTax1Name: globalTaxObj?.Tax1Name ? globalTaxObj.Tax1Name : "",
      globalTax1Rate: globalTaxObj?.Tax1Percentage
        ? globalTaxObj.Tax1Percentage
        : 0,
      globalTax1Amount: globalTaxObj?.Tax1Amount ? globalTaxObj.Tax1Amount : 0,
      globalTax2Code: globalTaxObj?.Tax2Code ? globalTaxObj.Tax2Code : "",
      globalTax2Name: globalTaxObj?.Tax2Name ? globalTaxObj.Tax2Name : "",
      globalTax2Rate: Number(
        globalTaxObj?.Tax2Percentage ? globalTaxObj.Tax2Percentage : 0
      ),
      globalTax2Amount: globalTaxObj?.Tax2Amount ? globalTaxObj.Tax2Amount : 0,

      surplusChargesAmount: 0,

      netAmount: netAmountTest.toFixed(TerminalConfiguration.DecimalsInAmount),
      advancePaidInCash: ADPay,
      counterCode: TerminalConfiguration?.TerminalCode,
      roundOffAmount: roundOffAmountTest.toFixed(
        TerminalConfiguration.DecimalsInAmount
      ),

      roundOffDifference: 0.0,

      posUserID: TerminalConfiguration?.UserCode,
      ReturnedInvoiceNumber: returnInvoiceNumber
        ? returnBill.InvoiceNumber
        : "",
      returnedFiscalSpanID: returnInvoiceNumber
        ? TerminalConfiguration?.FiscalSpanID
        : 0,
      ReturnedInvoiceDate: returnInvoiceNumber ? currentDate : "",

      isProcessed: false,
      isUploaded: false,
      startTime: startTime,
      endTime: time,
      tagNo: terminalSetup.StartFrom,
      cashTender: 0,

      creditAmount: creditAmount,
      globalTaxGroupID: globalTaxObj?.globalTaxGroupID
        ? globalTaxObj.globalTaxGroupID
        : "",
      isGlobalTax1IncludedInPrice: globalTaxObj?.IsTax1IncludedInPrice
        ? globalTaxObj.IsTax1IncludedInPrice
        : false,
      isGlobalTax2IncludedInPrice: globalTaxObj?.IsTax2IncludedInPrice
        ? globalTaxObj.IsTax2IncludedInPrice
        : false,
      InvoiceTime: time,
      paymentTypeName: selP
        ? selP?.PaymentTypeName
        : selectedPyamentMethod?.PaymentTypeName,

      BillDetails: "",

      buyerCode: buyerInfo?.BuyerCode ? buyerInfo?.BuyerCode : "",
      buyerName: buyerInfo?.BuyerName ? buyerInfo?.BuyerName : "",
      buyerVAT: buyerInfo?.ValueAddedTaxNumber
        ? buyerInfo?.ValueAddedTaxNumber
        : "",
      buyerCCR: buyerInfo?.CCRNumber ? buyerInfo?.CCRNumber : "",
      buyerPhone: buyerInfo?.PrimaryPhone
        ? String(buyerInfo?.PrimaryPhone)
        : "",
      buyerAddress: buyerInfo?.BuyerAddress ? buyerInfo?.BuyerAddress : "",

      loyaltyCode: buyerInfo?.LoyaltyCard
        ? buyerInfo?.LoyaltyCard.LoyaltyCode
        : "",
      isLoyaltyInvoice: redeemPoints > 0 ? true : false,

      deliveryType: "",
      deliveryTypeNote: "",

      totalPTax1Name: "",
      totalTax1Amount: 0,
      totalPTax2Name: "",
      totalTax2Amount: 0,

      totalGlobalTaxAmount: globalTax,

      totalTaxAmount: 0,
      totalProductTaxAmount: 0.0,

      earnedPoints: earnPoint,
      redeemPoints: Number(redeemPoints ? redeemPoints : 0),
      status: earnPoint > 0 ? 1 : status,

      rewardType: rewardType,
    };
    if (list.billHasOrder) {
      UpdateOrderWithPaidStatus();
      list.billHasOrder = false;
    }
    console.log("sale bill object...", obj);
    InsertSaleBills(obj);
    databaseBackup();
  };

  const selectedProductUpdate = async () => {
    let updateSelectProducts = [];
    selectedProducts.filter(async (product) => {
      let EarnedPoint = 0;
      if (buyerInfo?.LoyaltyCard) EarnedPoint = await proCatEarnPoints(product);
      let price = 0;
      if (product.ProductType === 3 && product.IsParentAddOn) {
        if (Number(product.DiscountAmount) > 0) {
          price = product.webperamount;
        } else {
          price = product.webperamount;
        }
      } else if (product.ProductType === 3 && !product.IsParentAddOn) {
        price = product.PriceWithOutTax / product.OrignalQuantity;
      } else {
        price = product.IsParentAddOn
          ? product.PriceWithOutTax
          : product.PriceWithOutTax / product.OrignalQuantity;
      }
      let pro = {
        SalesInvoiceDetailsID: returnInvoiceNumber
          ? uuid.v4()
          : product.SalesInvoiceDetailsID,
        SalesInvoiceID: salesBillID,
        InvoiceNumber: returnInvoiceNumber
          ? returnInvoiceNumber
          : invoiceNumber,
        FiscalSpanID: TerminalConfiguration?.FiscalSpanID,
        InvoiceType: returnInvoiceNumber ? 2 : 1,
        SerialNumber: Number(product.SerialNumber ? product.SerialNumber : 0),
        ProductCode: product.ProductCode ? product.ProductCode : "",
        ProductName: product.ProductName ? product.ProductName : "",
        ProductName2: product.ProductName2 ? product.ProductName2 : "",
        ProductType: product.ProductType,
        Quantity: product.IsParentAddOn
          ? product.Quantity
          : product.Quantity * product.OrignalQuantity,
        UOMType: product.UOMType ? product.UOMType : 0,
        UOMCode: product.UOMCode ? product.UOMCode : "",
        UOMFragment: Number(product.UOMFragment ? product.UOMFragment : 0),
        UOMCode: product.UOMCode ? product.UOMCode : "",
        UOMName: product.UOMName,
        Price: price,
        PriceOriginal: product.IsParentAddOn
          ? product.PriceOriginal
          : product.PriceOriginal / product.OrignalQuantity,
        DiscountRate: product.DiscountRate ? product.DiscountRate : 0,
        DiscountAmount: product.DiscountAmount ? product.DiscountAmount : 0,
        TaxGroupID: product.TaxGroupID,
        IsTax1IncludedInPrice:
          product.IsTax1IncludedInPrice === 1 ||
          product.IsTax1IncludedInPrice === true
            ? true
            : false,
        IsTax2IncludedInPrice:
          product.IsTax2IncludedInPrice === 1 ||
          product.IsTax2IncludedInPrice === true
            ? true
            : false,
        Tax1Code: product.Tax1Code ? product.Tax1Code : "",
        Tax1Name: product.Tax1Name ? product.Tax1Name : "",
        Tax1Rate: product.Tax1Rate ? product.Tax1Rate : 0,
        Tax1Amount: Number(
          product.Tax1Amount
            ? product.Tax1Amount.toFixed(TerminalConfiguration.DecimalsInAmount)
            : 0
        ),
        Tax1Fragment: product.Tax1Fragment ? product.Tax1Fragment : 0,
        Tax2Code: product.Tax2Code ? product.Tax2Code : "",
        Tax2Name: product.Tax2Name ? product.Tax2Name : "",
        Tax2Rate: product.Tax2Rate ? product.Tax2Rate : 0,
        Tax2Amount: product.Tax2Amount ? product.Tax2Amount : 0,
        Tax2Fragment: product.Tax2Fragment ? product.Tax2Fragment : 0,
        GrandAmount: product.GrandAmount.toFixed(
          TerminalConfiguration.DecimalsInAmount
        ),
        GroupDataID: product.GroupDataID ? product.GroupDataID : "",
        ProductBarCode: product.ProductBarCode,
        ReturnSalesInvoiceDetailID: returnInvoiceNumber
          ? product.SalesInvoiceDetailsID
          : "",
        DeliveryStatus: false,
        DeliveryDate: "",
        DeliveryTime: "",
        DeliveryNote: "",
        DeliveredDate: "",
        DeliveredTime: "",
        Remarks: "",
        SalesAgentCode: TerminalConfiguration.SalesAgentCode
          ? TerminalConfiguration.SalesAgentCode
          : "",
        IsParentAddOn:
          product.IsParentAddOn === 1 || product.IsParentAddOn === true
            ? true
            : false,
        AddOnGroupCode: product.AddOnGroupCode ? product.AddOnGroupCode : "",
        ParentInvoiceDetailsID: product.ParentInvoiceDetailsID
          ? product.ParentInvoiceDetailsID
          : "",
        OrignalQuantity: product.IsParentAddOn ? 0 : product.Quantity,
        AddonProductDetailcode: product.AddonProductDetailcode
          ? product.AddonProductDetailcode
          : "",
        Ingredients: String(product.Ingredients ? product.Ingredients : ""),
        EarnedPoints: EarnedPoint,
        RedeemPoints: Number(product.RedeemPoints ? product.RedeemPoints : 0),
        Status: EarnedPoint > 0 ? 1 : 0,
        ProductCategoryCode: String(
          product.ProductCategoryCode ? product.ProductCategoryCode : ""
        ),
        AddOnParentSalesInvoiceDetailsID:
          product.AddOnParentSalesInvoiceDetailsID
            ? product.AddOnParentSalesInvoiceDetailsID
            : "",
        HoldFromSale: product?.HoldFromSale ? product.HoldFromSale : "",
        PriceType: Number(product.PriceType ? product.PriceType : 0),
      };
      await InsertSaleBillDetails(pro);
      updateSelectProducts.push(pro);
    });
    console.log("updateSelectProducts...", updateSelectProducts);
  };

  const onClickIn = () => {
    // console.log('onClickIn');
    setLoading(true);
  };

  const databaseBackup = async () => {
    let uri = await AsyncStorage.getItem("FILE_URI");
    console.log("FILE_URI", uri);
    let newBillList = [];
    await getData(SaleBillsTable, async (cb) => {
      for (let i = 0; i < cb.length; i++) {
        if (
          (cb[i].isUploaded == "false" || !cb[i].isUploaded) &&
          (cb[i].isProcessed == "false" || !cb[i].isProcessed)
        ) {
          //console.log('sale bills ', cb[i].isUploaded);
          await getDataById(
            SaleBillDetailsTable,
            "salesInvoiceID",
            cb[i].salesInvoiceID,
            (billProducts) => {
              // console.log("billProducts....", billProducts)
              // cb[i].BillDetails = billProducts;
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
      try {
        const OsVer = Platform.constants["Release"];
        if (OsVer >= 11) {
          let path = "/storage/emulated/0/Documents/Restaurant/Invoices.txt";
          if (await RNFS.exists(path)) {
            console.log("File already exists", RNFS.exists(path));
            PermissionFile.deleteFile(uri);
            setTimeout(() => {
              PermissionFile.overWriteAbove29(
                JSON.stringify(newBillList),
                (err) => {
                  if (err) {
                    console.log("Permission Error", err);
                  }
                },
                (success) => {
                  if (success) {
                    // You can use RN-fetch-blog to download files and storge into download Manager
                    console.log("Access granted!");
                  }
                }
              );
              setBillNeedPost(true);
            }, 1000);
          } else {
            PermissionFile.overWriteAbove29(
              JSON.stringify(newBillList),
              (err) => {
                if (err) {
                  console.log("Permission Error", err);
                }
              },
              (success) => {
                if (success) {
                  // You can use RN-fetch-blog to download files and storge into download Manager
                  console.log("Access granted!");
                }
              }
            );
            setBillNeedPost(true);
          }
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Permissions for write access",
              message: "Give permission to your storage to write a file",
              buttonPositive: "ok",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let path = "/storage/emulated/0/Downloads/Restaurant/Invoices.txt";
            if (RNFS.exists(path)) {
              console.log("File already exists", RNFS.exists(path));
              PermissionFile.deleteFile(uri);
              setTimeout(() => {
                PermissionFile.overWriteAPI29(
                  JSON.stringify(newBillList),
                  (err) => {
                    if (err) {
                      console.log("Permission Error", err);
                    }
                  },
                  (success) => {
                    if (success) {
                      // You can use RN-fetch-blog to download files and storge into download Manager
                      console.log("Access granted!");
                    }
                  }
                );
                setBillNeedPost(true);
              }, 1000);
            } else {
              PermissionFile.overWriteAPI29(
                JSON.stringify(newBillList),
                (err) => {
                  if (err) {
                    console.log("Permission Error", err);
                  }
                },
                (success) => {
                  if (success) {
                    // You can use RN-fetch-blog to download files and storge into download Manager
                    console.log("Access granted!");
                  }
                }
              );
              setBillNeedPost(true);
            }
          } else {
            console.log("permission denied");
          }
        }
      } catch (err) {
        console.warn(err);
      }
    });
  };

  const globalDiscountAmountFun = (type, sAmount, tAmount, recalling) => {
    let subA = sAmount > 0 ? sAmount : subPrice;
    let tolA = sAmount > 0 ? tAmount : totalPrice;
    let disAmt =
      sAmount > 0 && globalDiscountRate > 0
        ? globalDiscountRate
        : recalling === "recalling"
        ? 0
        : manuallyCount;
    if (type === "globalDiscount") {
      if (subA >= disAmt || recalling === "recalling") {
        let tPrice;
        tPrice = Number(tolA - disAmt + globalDiscountAmount); //;
        setglobalDiscountAmount(Number(disAmt)); //);

        setAdvancePaidInCash(0); //);
        setDueAmount(0);
        if (selectedGlobalTaxObj) {
          globalTaxFun(selectedGlobalTaxObj, subA, "", tolA, disAmt);
        } else {
          setTotalPrice(tPrice);
        }
      } else {
        setMessage(props.StringsList._440);
        setDisplayAlert(true);
      }
    } else {
      let pDiscount;
      let tPrice = subPrice;
      pDiscount = parseFloat((disAmt * subA) / 100);
      if (subA >= pDiscount) {
        tPrice = Number(subA - pDiscount); //;
        setglobalDiscountAmount(Number(pDiscount)); //);
        setGlobalDiscountRate(Number(disAmt));

        setAdvancePaidInCash(0); //);
        setDueAmount(0);
        if (selectedGlobalTaxObj) {
          globalTaxFun(selectedGlobalTaxObj, subA, "", tolA, pDiscount);
        } else {
          setTotalPrice(tPrice);
        }
      } else {
        setMessage(props.StringsList._440);
        setDisplayAlert(true);
      }
    }
    setLoading(false);
  };

  const globalTaxFun = async (itm, type, n, totalAmount, disAmount) => {
    setLoading(true);
    if (itm.TaxFamilyCode !== "None") {
      let tPrice = totalAmount ? totalAmount : totalPrice;
      let subPr = type === "returnInvoice" ? subPrice : type;
      let disA =
        disAmount || disAmount === 0 ? disAmount : globalDiscountAmount;
      setSelectedGlobalTaxObj(itm);
      // console.log("globalTaxFun calling....", itm)
      let taxAmt = await calculateTaxeGroups(
        0,
        subPr,
        disA,
        itm.TaxFamilyCode,
        1,
        null,
        0,
        TerminalConfiguration,
        0,
        0,
        true
      );
      taxAmt.globalTaxGroupID = itm.TaxFamilyCode;

      let tax = taxAmt.Tax2Amount
        ? taxAmt.Tax1Amount + taxAmt.Tax2Amount
        : taxAmt.Tax1Amount
        ? taxAmt.Tax1Amount
        : 0;
      let diA = taxAmt.DiscountAmount ? taxAmt.DiscountAmount : 0;

      if (tax > 0) {
        tPrice = subPr + tax - diA;
        setsubPrice(subPr);
        setTotalPrice(tPrice);
      } else {
        tPrice = subPr - disA;
        setsubPrice(subPr);
        setTotalPrice(tPrice);
      }
      setGlobalTaxObj(taxAmt);
      setGlobalTax(tax);
      setLoading(false);
    } else {
      let tPrice = totalPrice - globalTax;
      // console.log('globalTax else', tPrice);
      setTotalPrice(tPrice);
      setSelectedGlobalTaxObj(null);
      setGlobalTaxObj(null);
      setGlobalTax(0);
      setLoading(false);
    }
  };

  const cashPaidAmountFun = (amount) => {
    // if (amount - totalPrice >= 0) {
    let am = amount ? amount : 0;
    let duePrice;
    duePrice = Number(amount - totalPrice); //;
    setAdvancePaidInCash(Number(am)); //);
    paymentProcess(amount);
    setPaymentAdded(true);
  };
  const holdInvoiceFun = async () => {
    let tableData = await AsyncStorage.getItem("SELECTED_TABLE");
    let table = JSON.parse(tableData);
    console.log("table", table?.TableCodeID);

    if (selectedProducts.length > 0) {
      setLoading(true);
      let invoice = [
        {
          salesBillID: salesBillID,
          invoiceNumber: holdInvoiceName,
          subPrice: subPrice,
          // creditAmount: creditAmount,
          totalPrice: totalPrice,
          advancePaidInCash: advancePaidInCash,
          date: moment().format("DD/MM/YYYY"),
          selectedProducts: JSON.stringify(selectedProducts),
        },
      ];
      InsertHoldInvoice(invoice);
      setOptions(
        userConfiguration.SalesRefundAllowed === 1
          ? [
              { label: props.StringsList._32, value: "getHoldInvoice" },

              { label: props.StringsList._319, value: "returnBill" },
              { label: props.StringsList._30, value: "buyer" },
              { label: props.StringsList._437, value: "loyaltyCard" },
            ]
          : [
              { label: props.StringsList._32, value: "getHoldInvoice" },
              { label: props.StringsList._30, value: "buyer" },
              { label: props.StringsList._437, value: "loyaltyCard" },
            ]
      );
      setDisplayAlert(true);
      setOrderCode(true);
      // props.navigation.replace("home");
      if (table) {
        changeTableStatus(table?.TableCodeID);
      }
      restState();
    } else {
      setMessage(props.StringsList._238);
      setDisplayAlert(true);
    }
  };

  const getHoldInvoiveFun = async (holdInvoiceNumber) => {
    setLoading(true);
    await getDataById(
      HoldInvoiceTable,
      "invoiceNumber",
      holdInvoiceNumber,
      (cb) => {
        // console.log('holdInvoice..', cb);

        if (cb.length > 0) {
          let holdInvoice = JSON.parse(cb[0].selectedProducts);
          if (holdInvoice.length > 0) {
            setSalesBillID(cb[0]?.salesBillID);

            setsubPrice(Number(cb[0]?.subPrice));

            setTotalPrice(Number(cb[0]?.totalPrice));
            setAdvancePaidInCash(Number(cb[0]?.advancePaidInCash));
            setSelectedProducts(holdInvoice);
            setToggle(true);
            onNewInvoice();
          }
        } else {
          setMessage(props.StringsList._301);
          setDisplayAlert(true);
        }
        setLoading(false);
      },
      3
    );
    DeleteColumnById(HoldInvoiceTable, "invoiceNumber", holdInvoiceNumber);
  };

  const onSuccessScan = async (itm) => {
    setIsSearch(false);
    let productBar = itm?.data ? itm.data : itm;
    console.log(" Reward List Table outer", productBar);
    setLoading(true);
    await getDataById(
      UpdateProductDetailListTable,
      "ProductBarCode",
      productBar,
      async (pro) => {
        // console.log(' on Successfully  Scan', selectedProducts);
        if (pro.length > 0) {
          let product = selectedProducts.filter((res) => {
            if (
              pro[0]?.ProductBarCode === res?.ProductBarCode &&
              pro[0]?.PriceOriginal === res?.PriceOriginal
            ) {
              return res;
            }
          });
          // console.log('on Successfully  Scan product', pro);
          let addPro = product.length > 0 ? product[0] : pro[0];
          await addProductToList(addPro, "increment");
          setToggle(true);
          // setRewardType(1)
        } else {
          setMessage(props.StringsList._251);
          setDisplayAlert(true);
        }
        setLoading(false);
        setIsSearch(false);
      }
    );
  };

  const getReturnInvoice = async (type, id) => {
    setLoading(true);
    setPrintType(type);
    setOrderCode(true);
    setSelectedProducts([]);
    setReturnProducts([]);
    setsubPrice(0);
    setTotalPrice(0);
    setReturnInvoiceNumber(null);
    let accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");

    let caltureCode = I18nManager.isRTL ? "ar-SA" : "en-US";
    let status = await getNetInfo();
    if (status === true) {
      const response = await props.dispatch(
        ServerCall(
          accessToken,
          `SalesBill/FetchSalesBill?billNumber=${id}&CultureCode=${caltureCode}`,
          "GET"
        )
      );
      console.log("FetchSalesBill....", response);
      setAlertValue("");
      seOptionsValue(null);

      if (response) {
        setToggle(true);
        list.isRefundReturnedCall = false;
        setReturnBill(response);
        console.log("Return Bill Date....", response.InvoiceDate);
        let array = [];

        let parntProducts = response?.BillDetails?.filter(
          (x) => x.IsParentAddOn === true
        );
        let addonnProducts = response?.BillDetails?.filter(
          (x) => x.IsParentAddOn === false
        );
        for (let index = 0; index < parntProducts.length; index++) {
          const element = parntProducts[index];
          if (array.length === 0 && element.IsParentAddOn === true) {
            array.push(element);
            let Addonsofthis = addonnProducts.filter(
              (x) =>
                x.AddOnParentSalesInvoiceDetailsID ===
                element.SalesInvoiceDetailsID
            );
            if (Addonsofthis) {
              for (let x = 0; x < Addonsofthis.length; x++) {
                const y = Addonsofthis[x];
                array.push(y);
              }
            }
          } else {
            let itemAddons = addonnProducts.filter(
              (x) =>
                x.AddOnParentSalesInvoiceDetailsID ===
                element.SalesInvoiceDetailsID
            );
            if (itemAddons) {
              array.push(element);
              for (let x = 0; x < itemAddons.length; x++) {
                const y = itemAddons[x];
                array.push(y);
              }
            } else {
              array.push(element);
            }
          }
        }
        if (Array.isArray(array) && array !== undefined) {
          if (array?.length > 0) {
            let products = array.filter(async (item) => {
              let returnQ = item?.ReturnedQuantity / item?.UOMFragment;
              item.ReturnedQuantity = returnQ;
              let Quantity =
                type === "returnInvoice"
                  ? item.Quantity - item.ReturnedQuantity
                  : item.Quantity;
              if (Quantity > 0) {
                let addonPQ = array.filter(
                  (r) =>
                    r.SalesInvoiceDetailsID ===
                    item.AddOnParentSalesInvoiceDetailsID
                );
                console.log("addonPQ", addonPQ);

                // Getting Addons of Products
                if (addonPQ.length > 0) {
                  let totalQ =
                    addonPQ[0].Quantity + addonPQ[0].ReturnedQuantity;
                  let OQty = item.Quantity / totalQ;
                  if (item?.ProductType === 3 && !item?.IsParentAddOn) {
                    item.OrignalQuantity = OQty;
                    item.ParentInvoiceDetailsID =
                      addonPQ[0].SalesInvoiceDetailsID;
                    item.maxQuantity = Quantity / addonPQ[0].Quantity;
                    item.Quantity = Quantity;
                    item.totalQuantity = item.Quantity + item.ReturnedQuantity;
                    item.originalDiscount = item.DiscountAmount;
                    item.Pricefortax = item.PriceOriginal;
                    let listOfPG;
                    let rr = await getData(
                      SalesFamilySummaryListTable,
                      async (cb) => {
                        let groupTaxCodes = cb.filter(
                          (x) => x.SalesFamilyCode === item.ProductCode
                        );
                        listOfPG = groupTaxCodes;

                        let totaltax1 = 0;
                        let totaltax2 = 0;
                        let myArray = [];
                        let colloctivePrice = 0;
                        await listOfPG.forEach(async (element, index) => {
                          let isUpdatedGroup = false;
                          let percentageDiscountAmount = 0;
                          let taxGroupID = "";
                          let itemQty = 0,
                            itemAmount = 0,
                            itemProposedSalesAmount = 0,
                            itemDiscountAmount = 0,
                            netQty = 0,
                            tamount = 0,
                            totalTax = 0,
                            totalPrice = 0,
                            totalInclusiveTax = 0,
                            totalDiscount = 0,
                            discountAfterDivision = 0;

                          let totalQuantity = Quantity + item.ReturnedQuantity;

                          if (
                            index === listOfPG.length - 1 &&
                            type === "returnInvoice"
                          ) {
                            if (item.DiscountAmount > 0) {
                              discountAfterDivision = Number(
                                (item.DiscountAmount / totalQuantity) * Quantity
                              );

                              item.DiscountAmount = Number(
                                discountAfterDivision.toFixed(
                                  TerminalConfiguration.DecimalsInAmount
                                )
                              );
                              percentageDiscountAmount = item.DiscountAmount;
                            }
                            if (item.DiscountRate > 0) {
                              item.DiscountRate = item?.DiscountRate;
                              percentageDiscountAmount =
                                (item.Price *
                                  item.Quantity *
                                  item.DiscountRate) /
                                100;
                              item.DiscountAmount = Number(
                                percentageDiscountAmount.toFixed(
                                  TerminalConfiguration.DecimalsInAmount
                                )
                              );
                              percentageDiscountAmount = item.DiscountAmount;
                            }
                          } else {
                            item.DiscountAmount = Number(
                              item?.DiscountAmount.toFixed(
                                TerminalConfiguration.DecimalsInAmount
                              )
                            );
                          }

                          let amountBeforeDiscount =
                            item.PriceOriginal * item.Quantity;
                          taxGroupID = element.SaleTaxFamilyCode;
                          itemQty = element.Quantity;
                          itemAmount = element.Price;
                          netQty = item.Quantity * itemQty;
                          itemProposedSalesAmount =
                            (itemAmount * amountBeforeDiscount) /
                            item.Pricefortax;

                          if (amountBeforeDiscount > 0) {
                            itemDiscountAmount =
                              (itemProposedSalesAmount *
                                percentageDiscountAmount) /
                              amountBeforeDiscount;
                          }

                          let taxAmt = await calculateTaxeGroups(
                            netQty,
                            itemProposedSalesAmount,
                            itemDiscountAmount,
                            taxGroupID,
                            1,
                            null,
                            0,
                            TerminalConfiguration,
                            item.PriceOriginal,
                            item.DiscountRate
                          );
                          let productGroupTaxInfoObj = {
                            ProductBarCode: element?.ProductBarCode,
                            newTaxAmount: taxAmt.Tax1Amount
                              ? taxAmt.Tax1Amount
                              : 0 + taxAmt.Tax2Amount
                              ? taxAmt.Tax2Amount
                              : 0,
                            isFixedTax:
                              taxAmt?.Tax1Fragment === 2 ||
                              taxAmt?.Tax2Fragment === 2
                                ? true
                                : false,
                            unitPrice: taxAmt.IsTax1IncludedInPrice
                              ? taxAmt.Price
                              : element.Price,
                            proposedPrice: element.Price,
                            taxRate: taxAmt?.Tax1Percentage
                              ? taxAmt.Tax1Percentage
                              : 0,
                            isInclusiveTax:
                              taxAmt?.IsTax1IncludedInPrice === true ||
                              taxAmt?.taxAmt?.IsTax2IncludedInPrice === true
                                ? true
                                : false,
                          };
                          if (productGroupTaxInfoObj) {
                            colloctivePrice += element?.Price;
                            myArray.push(productGroupTaxInfoObj);
                            item.productGroupTaxInfoObj = myArray;
                            item.colloctivePrice = colloctivePrice;
                          }

                          if (
                            taxAmt.Tax1Fragment == 2 ||
                            taxAmt.Tax2Fragment == 2
                          ) {
                            taxAmt.Tax1Amount = taxAmt.Tax1Amount
                              ? taxAmt.Tax1Amount * item?.Quantity
                              : 0;
                            taxAmt.Tax2Amount = taxAmt.Tax2Amount
                              ? taxAmt.Tax2Amount * item?.Quantity
                              : 0;
                          }

                          // tax 1 details
                          item.Tax1Code = taxAmt.Tax1Code
                            ? taxAmt.Tax1Code
                            : "";
                          item.Tax1Name = taxAmt.Tax1Name
                            ? taxAmt.Tax1Name
                            : "";
                          item.Tax1Amount = totalTax;
                          item.Tax1Rate = taxAmt.Tax1Percentage
                            ? taxAmt.Tax1Percentage
                            : 0;
                          item.IsTax1IncludedInPrice =
                            taxAmt.IsTax1IncludedInPrice === true ||
                            taxAmt.IsTax1IncludedInPrice === 1
                              ? true
                              : false;
                          item.Tax1Fragment = taxAmt?.Tax1Fragment
                            ? taxAmt.Tax1Fragment
                            : "";
                          // tax 2 details
                          item.Tax2Code = taxAmt.Tax2Code
                            ? taxAmt.Tax2Code
                            : "";
                          item.Tax2Name = taxAmt.Tax2Name
                            ? taxAmt.Tax2Name
                            : "";

                          item.Tax2Fragment = taxAmt?.Tax2Fragment
                            ? taxAmt.Tax2Fragment
                            : "";

                          item.IsTax2ncludedInPrice =
                            taxAmt.IsTax2IncludedInPrice === true ||
                            taxAmt.IsTax2IncludedInPrice === 1
                              ? true
                              : false;
                          item.Tax2Rate = taxAmt.Tax2Percentage
                            ? taxAmt.Tax2Percentage
                            : 0;
                          item.Tax2Amount = totaltax2;

                          totaltax1 = taxAmt.Tax1Amount
                            ? totaltax1 + taxAmt.Tax1Amount
                            : totaltax1 + 0;
                          totaltax2 = taxAmt.Tax2Amount
                            ? totaltax2 + taxAmt.Tax2Amount
                            : totaltax2 + 0;

                          let tax = totaltax1 + totaltax2;

                          item.IngredientsArray = [];
                          item.IngredientNames = "";

                          if (
                            item.productGroupTaxInfoObj.length ===
                            listOfPG.length
                          ) {
                            isUpdatedGroup = true;
                          }

                          if (isUpdatedGroup) {
                            item.productGroupTaxInfoObj.forEach((element) => {
                              let itemProposedAmount =
                                ((element.proposedPrice * item.Quantity) /
                                  (item.Pricefortax * item.Quantity)) *
                                (item.PriceOriginal * item.Quantity);
                              let itemDiscountWeight =
                                (itemProposedAmount /
                                  (item.PriceOriginal * item.Quantity)) *
                                item?.DiscountAmount;
                              totalDiscount += Number(itemDiscountWeight);
                              let afterDiscountAmount = 0;
                              if (element.isInclusiveTax) {
                                let inclTax =
                                  (itemProposedAmount /
                                    (100 + element.taxRate)) *
                                  element.taxRate;
                                totalInclusiveTax += Number(
                                  inclTax /
                                    item?.Quantity.toFixed(
                                      TerminalConfiguration.DecimalsInAmount
                                    )
                                );
                                let pureAmount = itemProposedAmount - inclTax;
                                afterDiscountAmount =
                                  pureAmount - itemDiscountWeight;
                              } else {
                                afterDiscountAmount =
                                  itemProposedAmount - itemDiscountWeight;
                              }
                              if (!element.isFixedTax) {
                                let taxPrice =
                                  (element.taxRate / 100) * afterDiscountAmount;
                                totalPrice += afterDiscountAmount + taxPrice;
                                totalTax += taxPrice;
                              }
                              if (element.isFixedTax) {
                                let fixtax =
                                  element.newTaxAmount * item.Quantity;
                                totalPrice += fixtax + afterDiscountAmount;
                                totalTax = totalTax + fixtax;
                              }
                              item.Tax1Amount = totalTax;
                              tamount += element?.unitPrice;
                              item.tax = Number(totalTax);
                            });
                            item.PriceWithOutTax = Number(item?.Price);
                            item.PriceUnitlesstax = Number(
                              item.PriceWithOutTax
                            );
                            item.webperamount = Number(item?.PriceWithOutTax);
                            item.GrandAmount =
                              type === "reprint"
                                ? item.GrandAmount
                                : Number(totalPrice);
                          }
                        });
                      }
                    );
                  } else {
                    let Amount = Number(item.PriceOriginal) * Quantity;
                    item.OrignalQuantity = OQty;
                    item.originalDiscount = item.DiscountAmount;
                    item.ParentInvoiceDetailsID =
                      addonPQ[0].SalesInvoiceDetailsID;
                    item.maxQuantity = Quantity;
                    let taxAmt = await calculateTaxeGroups(
                      Quantity,
                      Amount,
                      0,
                      item.TaxGroupID,
                      1,
                      null,
                      0,
                      TerminalConfiguration,
                      item.PriceOriginal,
                      0
                    );

                    console.log("calculateTaxeGroups...", taxAmt, item);
                    // Tax 1 details
                    item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                    (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
                      (item.Tax1Rate = taxAmt.Tax1Percentage
                        ? taxAmt.Tax1Percentage
                        : 0),
                      (item.Tax1Amount = taxAmt.Tax1Amount
                        ? taxAmt.Tax1Amount
                        : 0),
                      (item.Tax1Fragment = taxAmt.Tax1Fragment
                        ? taxAmt.Tax1Fragment
                        : "");
                    // Tax 2 details
                    (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
                      (item.Tax2Name = taxAmt?.Tax2Name
                        ? taxAmt?.Tax2Name
                        : ""),
                      (item.Tax2Rate = taxAmt?.Tax2Percentage
                        ? taxAmt?.Tax2Percentage
                        : 0),
                      (item.Tax2Amount = taxAmt?.Tax2Amount
                        ? taxAmt?.Tax2Amount
                        : 0);
                    item.Tax2Fragment = taxAmt.Tax2Fragment
                      ? taxAmt.Tax2Fragment
                      : "";
                    // calculate actual quantity
                    if (
                      (!item?.IsParentAddOn && item.Tax1Fragment == 2) ||
                      item?.Tax2Fragment === 2
                    ) {
                      addonFinalQuantity = Quantity * item.OrignalQuantity;
                    }
                    if (
                      (!item?.IsParentAddOn && item.Tax1Fragment == 2) ||
                      item?.Tax2Fragment === 2
                    ) {
                      item.Tax1Amount = item.Tax1Amount * addonFinalQuantity;
                      item.Tax2Amount = item.Tax2Amount * addonFinalQuantity;
                    }
                    let tax = item.Tax1Amount + item.Tax2Amount;

                    item.PriceWithOutTax = Number(item?.Price);
                    item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice
                      ? true
                      : false;
                    item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice
                      ? true
                      : false;

                    item.tax = Number(tax);
                    item.DiscountAmount = Number(
                      item?.DiscountAmount.toFixed(
                        TerminalConfiguration.DecimalsInAmount
                      )
                    );
                    item.webperamount = Number(item.PriceWithOutTax);
                    item.PriceOriginal = Number(item.PriceOriginal * OQty);
                    item.GrandAmount = Number(
                      item.Price * Quantity + tax - item?.DiscountAmount
                    );
                    item.GrandAmount = item.GrandAmount;
                    item.ReturnedQuantity = returnQ;
                    item.Quantity = Quantity / OQty;
                    item.IsAddedInReturnList = false;
                  }
                }
                // Getting Products
                else if (item.ProductType === 3) {
                  item.maxQuantity = item.Quantity - item.ReturnedQuantity;
                  item.Quantity = Quantity;
                  item.totalQuantity = item.Quantity + item.ReturnedQuantity;
                  item.originalDiscount = item.DiscountAmount;
                  let listOfPG;
                  let rr = await getData(
                    SalesFamilySummaryListTable,
                    async (cb) => {
                      let groupTaxCodes = cb.filter(
                        (x) => x.SalesFamilyCode === item.ProductCode
                      );

                      await getData(
                        UpdateProductDetailListTable,
                        (productsDetail) => {
                          let findProduct = productsDetail.find(
                            (e) => e.ProductBarCode === item.ProductBarCode
                          );
                          if (findProduct) {
                            item.Pricefortax = findProduct.PriceOriginal;
                          }
                        }
                      );
                      listOfPG = groupTaxCodes;

                      let totaltax1 = 0;
                      let totaltax2 = 0;
                      let myArray = [];
                      let colloctivePrice = 0;
                      await listOfPG.forEach(async (element, index) => {
                        let isUpdatedGroup = false;
                        let percentageDiscountAmount = 0;
                        let taxGroupID = "";
                        let itemQty = 0,
                          itemAmount = 0,
                          itemProposedSalesAmount = 0,
                          itemDiscountAmount = 0,
                          netQty = 0,
                          tamount = 0,
                          totalTax = 0,
                          totalPrice = 0,
                          totalInclusiveTax = 0,
                          totalDiscount = 0,
                          discountAfterDivision = 0,
                          innerProductsArray = [];

                        let totalQuantity = Quantity + item.ReturnedQuantity;

                        if (
                          index === listOfPG.length - 1 &&
                          type === "returnInvoice"
                        ) {
                          if (item.DiscountAmount > 0) {
                            discountAfterDivision = Number(
                              (item.DiscountAmount / totalQuantity) * Quantity
                            );

                            item.DiscountAmount = Number(
                              discountAfterDivision.toFixed(
                                TerminalConfiguration.DecimalsInAmount
                              )
                            );
                            percentageDiscountAmount = item.DiscountAmount;
                          }
                          if (item.DiscountRate > 0) {
                            item.DiscountRate = item?.DiscountRate;
                            percentageDiscountAmount =
                              (item.Price * item.Quantity * item.DiscountRate) /
                              100;
                            item.DiscountAmount = Number(
                              percentageDiscountAmount.toFixed(
                                TerminalConfiguration.DecimalsInAmount
                              )
                            );
                            percentageDiscountAmount = item.DiscountAmount;
                          }
                        } else {
                          item.DiscountAmount = Number(
                            item?.DiscountAmount.toFixed(
                              TerminalConfiguration.DecimalsInAmount
                            )
                          );
                        }

                        let amountBeforeDiscount =
                          item.PriceOriginal * item.Quantity;
                        taxGroupID = element.SaleTaxFamilyCode;
                        itemQty = element.Quantity;
                        itemAmount = element.Price;
                        netQty = item.Quantity * itemQty;
                        itemProposedSalesAmount =
                          (itemAmount * amountBeforeDiscount) /
                          item.Pricefortax;

                        if (amountBeforeDiscount > 0) {
                          itemDiscountAmount =
                            (itemProposedSalesAmount *
                              percentageDiscountAmount) /
                            amountBeforeDiscount;
                        }

                        let taxAmt = await calculateTaxeGroups(
                          netQty,
                          itemProposedSalesAmount,
                          itemDiscountAmount,
                          taxGroupID,
                          1,
                          null,
                          0,
                          TerminalConfiguration,
                          item.PriceOriginal,
                          item.DiscountRate
                        );
                        let productGroupTaxInfoObj = {
                          ProductBarCode: element?.ProductBarCode,
                          newTaxAmount: taxAmt.Tax1Amount
                            ? taxAmt.Tax1Amount
                            : 0 + taxAmt.Tax2Amount
                            ? taxAmt.Tax2Amount
                            : 0,
                          isFixedTax:
                            taxAmt?.Tax1Fragment === 2 ||
                            taxAmt?.Tax2Fragment === 2
                              ? true
                              : false,
                          unitPrice: taxAmt.IsTax1IncludedInPrice
                            ? taxAmt.Price
                            : element.Price,
                          proposedPrice: element.Price,
                          taxRate: taxAmt?.Tax1Percentage
                            ? taxAmt.Tax1Percentage
                            : 0,
                          isInclusiveTax:
                            taxAmt?.IsTax1IncludedInPrice === true ||
                            taxAmt?.taxAmt?.IsTax2IncludedInPrice === true
                              ? true
                              : false,
                        };
                        if (productGroupTaxInfoObj) {
                          colloctivePrice += element?.Price;
                          myArray.push(productGroupTaxInfoObj);
                          item.productGroupTaxInfoObj = myArray;
                          item.colloctivePrice = colloctivePrice;
                        }

                        if (
                          taxAmt.Tax1Fragment == 2 ||
                          taxAmt.Tax2Fragment == 2
                        ) {
                          taxAmt.Tax1Amount = taxAmt.Tax1Amount
                            ? taxAmt.Tax1Amount * item?.Quantity
                            : 0;
                          taxAmt.Tax2Amount = taxAmt.Tax2Amount
                            ? taxAmt.Tax2Amount * item?.Quantity
                            : 0;
                        }

                        // tax 1 details
                        item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
                        item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : "";
                        item.Tax1Amount = totalTax;
                        item.Tax1Rate = taxAmt.Tax1Percentage
                          ? taxAmt.Tax1Percentage
                          : 0;
                        item.IsTax1IncludedInPrice =
                          taxAmt.IsTax1IncludedInPrice === true ||
                          taxAmt.IsTax1IncludedInPrice === 1
                            ? true
                            : false;
                        item.Tax1Fragment = taxAmt?.Tax1Fragment
                          ? taxAmt.Tax1Fragment
                          : "";
                        // tax 2 details
                        item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : "";
                        item.Tax2Name = taxAmt.Tax2Name ? taxAmt.Tax2Name : "";

                        item.Tax2Fragment = taxAmt?.Tax2Fragment
                          ? taxAmt.Tax2Fragment
                          : "";

                        item.IsTax2ncludedInPrice =
                          taxAmt.IsTax2IncludedInPrice === true ||
                          taxAmt.IsTax2IncludedInPrice === 1
                            ? true
                            : false;
                        item.Tax2Rate = taxAmt.Tax2Percentage
                          ? taxAmt.Tax2Percentage
                          : 0;
                        item.Tax2Amount = totaltax2;

                        totaltax1 = taxAmt.Tax1Amount
                          ? totaltax1 + taxAmt.Tax1Amount
                          : totaltax1 + 0;
                        totaltax2 = taxAmt.Tax2Amount
                          ? totaltax2 + taxAmt.Tax2Amount
                          : totaltax2 + 0;
                        //
                        let tax = totaltax1 + totaltax2;

                        //
                        // item.Price = Number(item.PriceOriginal);

                        item.IngredientsArray = [];
                        item.IngredientNames = "";
                        if (index === listOfPG.length - 1) {
                          for (let i = 0; i < listOfPG.length; i++) {
                            const element = listOfPG[i];
                            await getData(
                              UpdateProductDetailListTable,
                              (productsDetail) => {
                                let findProduct = productsDetail.find(
                                  (e) =>
                                    e.ProductBarCode === element.ProductBarCode
                                );

                                if (findProduct) {
                                  let isMatch = listOfPG.find(
                                    (e) =>
                                      e.ProductBarCode ===
                                      findProduct.ProductBarCode
                                  );
                                  let netQuantity =
                                    isMatch?.Quantity * element?.Quantity;
                                  findProduct.Quantity = netQuantity;
                                  findProduct.Price = element?.Price;
                                  findProduct.SalesInvoiceDetailsID = uuid.v4();
                                  innerProductsArray.push(findProduct);
                                }
                              }
                            );
                          }
                          if (innerProductsArray) {
                            item.innerProductsArray = innerProductsArray;
                          }
                        }
                        if (
                          item.productGroupTaxInfoObj.length === listOfPG.length
                        ) {
                          isUpdatedGroup = true;
                        }

                        if (isUpdatedGroup) {
                          item.productGroupTaxInfoObj.forEach((element) => {
                            let itemProposedAmount =
                              ((element.proposedPrice * item.Quantity) /
                                (item.Pricefortax * item.Quantity)) *
                              (item.PriceOriginal * item.Quantity);
                            let itemDiscountWeight =
                              (itemProposedAmount /
                                (item.PriceOriginal * item.Quantity)) *
                              item?.DiscountAmount;
                            totalDiscount += Number(itemDiscountWeight);
                            let afterDiscountAmount = 0;
                            if (element.isInclusiveTax) {
                              let inclTax =
                                (itemProposedAmount / (100 + element.taxRate)) *
                                element.taxRate;
                              totalInclusiveTax += Number(
                                inclTax /
                                  item?.Quantity.toFixed(
                                    TerminalConfiguration.DecimalsInAmount
                                  )
                              );
                              let pureAmount = itemProposedAmount - inclTax;
                              afterDiscountAmount =
                                pureAmount - itemDiscountWeight;
                            } else {
                              afterDiscountAmount =
                                itemProposedAmount - itemDiscountWeight;
                            }
                            if (!element.isFixedTax) {
                              let taxPrice =
                                (element.taxRate / 100) * afterDiscountAmount;
                              totalPrice += afterDiscountAmount + taxPrice;
                              totalTax += taxPrice;
                            }
                            if (element.isFixedTax) {
                              let fixtax = element.newTaxAmount * item.Quantity;
                              totalPrice += fixtax + afterDiscountAmount;
                              totalTax = totalTax + fixtax;
                            }
                            item.Tax1Amount = totalTax;
                            tamount += element?.unitPrice;
                            item.tax = Number(totalTax);
                          });

                          item.PriceWithOutTax = Number(item?.Price);
                          item.PriceUnitlesstax = Number(item.PriceWithOutTax);
                          item.webperamount = Number(item?.PriceWithOutTax);
                          item.GrandAmount =
                            type === "reprint"
                              ? item.GrandAmount
                              : Number(totalPrice);
                        }
                      });
                    }
                  );
                } else {
                  let taxAmt;
                  item.originalDiscount = item.DiscountAmount;
                  item.maxQuantity = Quantity;
                  item.Quantity = Quantity;
                  item.totalQuantity = item.Quantity + item.ReturnedQuantity;
                  item.ReturnedQuantity = returnQ;
                  item.DiscountAmount = Number(
                    item.DiscountAmount.toFixed(
                      TerminalConfiguration.DecimalsInAmount
                    )
                  );
                  let Amount = Number(item.PriceOriginal) * Quantity;
                  let totalQuantity = Quantity + item.ReturnedQuantity;
                  let discountAfterDivision = Number(
                    (item.DiscountAmount / totalQuantity) * Quantity
                  );
                  discountAfterDivision = Number(
                    discountAfterDivision.toFixed(
                      TerminalConfiguration.DecimalsInAmount
                    )
                  );
                  if (type === "reprint") {
                    taxAmt = await calculateTaxeGroups(
                      Quantity,
                      Amount,
                      item.DiscountAmount,
                      item.TaxGroupID,
                      1,
                      null,
                      0,
                      TerminalConfiguration,
                      item.PriceOriginal,
                      item.DiscountRate
                    );
                    item.DiscountAmount = Number(
                      item.DiscountAmount.toFixed(
                        TerminalConfiguration.DecimalsInAmount
                      )
                    );
                  } else {
                    taxAmt = await calculateTaxeGroups(
                      Quantity,
                      Amount,
                      discountAfterDivision,
                      item.TaxGroupID,
                      1,
                      null,
                      0,
                      TerminalConfiguration,
                      item.PriceOriginal,
                      item.DiscountRate
                    );
                    item.DiscountAmount = Number(
                      discountAfterDivision.toFixed(
                        TerminalConfiguration.DecimalsInAmount
                      )
                    );
                  }
                  console.log("calculating tax amount", taxAmt);
                  item.Tax1Fragment = taxAmt.Tax1Fragment
                    ? taxAmt.Tax1Fragment
                    : "";
                  item.Tax2Fragment = taxAmt.Tax2Fragment
                    ? taxAmt.Tax2Fragment
                    : "";
                  item.OrignalQuantity = 1;
                  item.IsTax1IncludedInPrice =
                    taxAmt?.IsTax1IncludedInPrice === true ? true : false;
                  item.IsTax2IncludedInPrice =
                    taxAmt?.IsTax2IncludedInPrice === true ? true : false;
                  if (item.Tax1Fragment == 2 || item.Tax2Fragment == 2) {
                    taxAmt.Tax1Amount = taxAmt.Tax1Amount * item.Quantity;
                  }
                  let tax = taxAmt.Tax1Amount
                    ? taxAmt.Tax1Amount
                    : 0 + taxAmt.Tax2Amount
                    ? taxAmt.Tax2Amount
                    : 0;
                  item.GrandAmount = Number(
                    taxAmt.Price * item.Quantity + tax - item?.DiscountAmount
                  );
                  item.GrandAmount = Number(item.GrandAmount);
                  item.PriceWithOutTax = Number(item.Price);
                  item.tax = Number(tax);
                  item.webperamount = Number(item.Price);
                  item.Tax1Amount = Number(tax);
                  item.IsAddedInReturnList = false;
                }
                item.IsParentAddOn = item.AddOnParentSalesInvoiceDetailsID
                  ? false
                  : true;
                return item;
              }
            });

            if (response.GlobalDiscountRate > 0) {
              console.log(
                "response.GlobalDiscountRate ",
                response.GlobalDiscountRate
              );
              setGlobalDiscountRate(response.GlobalDiscountRate);
            } else if (response.GlobalDiscountAmount > 0) {
              setglobalDiscountAmount(response.GlobalDiscountAmount);
            }

            if (products.length > 0) {
              let GT = globalTaxList.filter(
                (e) => response.GlobalTaxGroupID === e.TaxFamilyCode
              );
              // console.log('GTGTGTGT', GT);
              setSelectedGlobalTaxObj(GT[0]);
              setInvoiceNumber(response.InvoiceNumber);

              if (response.BuyerCode) {
                const current = new Date();
                let date, month, year;
                date = current.getDate();
                month = current.getMonth() + 1;
                year = current.getFullYear();

                const currentDate = `${year}${
                  month < 10 ? "0" + month : month + 1
                }${date < 10 ? "0" + date : date}`;

                let UserLogin = await AsyncStorage.getItem("ACCESS_TOKEN");

                let body = {
                  BuyerName: "",
                  ReturnCode: 0,
                  BuyerCode: null,
                  PrimaryPhone: response.BuyerCode,
                  CCRNumber: "",
                  ValueAddedTaxNumber: "",
                  BuyerAddress: "",
                  Operation: "search",
                  CurrentDate: currentDate,
                  LoyaltyCard: null,
                  CaltureCode: caltureCode,
                };

                const response1 = await props.dispatch(
                  ServerCall(UserLogin, "Buyer/CreateBuyer", "POST", body)
                );
                const res = JSON.parse(response1);
                if (res !== undefined) {
                  setBuyerInfo(res);
                }
              }

              if (type === "reprint") {
                setAdvancePaidInCash(Number(response.AdvancePaidInCash)); //);
                let selP = payments.filter(
                  (e) => e.PaymentType === String(response.PaymentType)
                );
                setSelectedPyamentMethod(selP[0]);

                let date, month, year;
                year = response.InvoiceDate.slice(0, 4);
                month = response.InvoiceDate.slice(4, 6);
                date = response.InvoiceDate.slice(6, 8);
                let InvoiceTime =
                  date + "/" + month + "/" + year + "  " + response.InvoiceTime;
                setInvoiceDate(InvoiceTime);

                selectedAllProducts(products, response, GT[0], type);
              }
              if (type === "returnInvoice") {
                setisReturnInvoice(true);
                createReturnInvoiceNumber();
                setReturnProducts(products);
                // setToggle(true);
              }
            } else {
              setMessage(props.StringsList._301);
              setDisplayAlert(true);
              seOptionsValue(null);
              setLoading(false);
            }
            setLoading(false);
          }
        }
      } else {
        list.isRefundReturnedCall = false;
        setMessage(props.StringsList._301);
        setDisplayAlert(true);
        setLoading(false);
      }
    } else {
      Alert.alert(
        "Bnody Restaurant",
        "Internet Connect Not Available Please Connected to internet and try again",
        [
          {
            text: "OKAY",
            onPress: () => {
              restState();
            },
          },
        ]
      );
    }
  };

  const reacallFunc = (type) => {
    if (type === "holdInvoice") {
      holdInvoiceFun();
    }
    // else if (type === 'returnInvoice' || type === 'reprint') {
    //   getReturnInvoice(type);
    // }
    else if (type === "ingredient") {
      addIngredientFun();
    } else if (type === "rebootTerminal") {
      onClickPowerOff("terminal");
    }
  };
  const checkReturnProductAddons = async (itm, type, index) => {
    let proArray = [],
      sPrice = Number(itm.GrandAmount - itm.DiscountAmount),
      tPrice = Number(itm.GrandAmount - itm.DiscountAmount);
    proArray.push(itm);

    let addons = retunProducts.filter(async (pro) => {
      if (itm.SalesInvoiceDetailsID === pro.AddOnParentSalesInvoiceDetailsID) {
        // console.log('pro Quantitypro', pro.Quantity, itm.Quantity);

        sPrice = Number(sPrice + pro.GrandAmount - pro.DiscountAmount);
        tPrice = Number(tPrice + pro.GrandAmount - pro.DiscountAmount);

        proArray.push(pro);

        return pro;
      }
    });
    if (addons.length > 0) {
      await addProductToList(itm, "addnos", index, proArray, sPrice, tPrice);
    } else {
      await addProductToList(itm, type, index);
    }
  };

  useEffect(async () => {
    if (buyerInfo?.LoyaltyCard) {
      let pArry = [],
        cArry = [],
        iArry = [];
      await getDataById(
        LoyaltyDetailListTable,
        "LoyaltyCode",
        buyerInfo.LoyaltyCard.LoyaltyCode,
        (loyalty) => {
          loyalty.forEach((e) => {
            if (e.CalculationType === 1) {
              pArry.push(e);
            } else if (e.CalculationType === 2) {
              iArry.push(e);
            } else if (e.CalculationType === 3) {
              cArry.push(e);
            }
          });
          setEarnPointPArry(pArry);
          setEarnPointIArry(iArry);
          setEarnPointCArry(cArry);
          setLoyaltyDetailList(loyalty);
        }
      );
      await getDataById(
        LoyaltyRewardsListTable,
        "LoyaltyCode",
        buyerInfo.LoyaltyCard.LoyaltyCode,
        (loyalty) => {
          setLoyaltyRewardsList(loyalty);
        }
      );
    }
  }, [buyerInfo]);
  async function checkLoyalitRewardsFun() {
    if (loyaltyRewardsList?.length > 0 && redeemPoints > 0) {
      let rewards = loyaltyRewardsList.filter(
        (res) =>
          redeemPoints >= res.RewardCostFrom && redeemPoints <= res.RewardCostTo
      );
      // console.log("rewards..........", rewards)
      let excludeProSum = 0;
      let excludeProducts = loyaltyRewardsList.filter((res) => {
        selectedProducts.forEach((s) => {
          if (res.ExcludeProductBarCode === s.ProductBarCode) {
            excludeProSum = excludeProSum + s.GrandAmount;
            // console.log("exclude Product sum..55.", excludeProSum)
          }
        });
      });
      // console.log("exclude Product sum...", excludeProSum)
      setStatus(2);
      if (Array.isArray(rewards) && rewards.length > 0) {
        if (rewards.length > 1) {
          Alert.alert("Loyalty Inovice", "Please select open option", [
            {
              text: "Free Product",
              onPress: () => {
                let reward = rewards.filter((res) => res.ProductBarCode !== "");
                // console.log("free product ", reward)
                freeProductReward(reward);
              },
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Invoice Discount",
              onPress: () => {
                let reward = rewards.filter((res) => res.ProductBarCode === "");
                invoiceDiscountReward(reward[0], excludeProSum);
                // console.log("Invoice Discount ", reward)
              },
            },
          ]);

          // invoiceDiscountReward(rewards)
        } else {
          if (rewards[0].ProductBarCode !== "") {
            let PReward = rewards.filter((res) => res.ProductBarCode !== "");
            freeProductReward(PReward);
          } else {
            invoiceDiscountReward(rewards[0], excludeProSum);
          }
        }
      } else {
        Alert.alert("Loyalty Info", "No Reward Available");
      }
    }
  }
  const freeProductReward = async (rewards) => {
    let selectedP = [...selectedProducts];
    setToggle(true);
    for (let i = 0; i < rewards.length; i++) {
      let e = rewards[i];
      await getDataById(
        UpdateProductDetailListTable,
        "ProductBarCode",
        e.ProductBarCode,
        async (pro) => {
          let P = pro[0];
          let taxAmt = await calculateTaxeGroups(
            1,
            P.PriceOriginal,
            P.DiscountAmount,
            P.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            P.PriceOriginal,
            P.DiscountRate
          );
          P.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : "";
          (P.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ""),
            (P.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
            (P.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (P.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ""),
            (P.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ""),
            (P.Tax2Rate = taxAmt?.Tax2Percentage ? taxAmt?.Tax2Percentage : 0),
            (P.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
          P.GrandAmount = 0;
          P.tax = P.Tax1Amount + P.Tax2Amount;
          P.PriceWithOutTax = taxAmt.Price;
          P.Quantity = 1;
          P.FreeProduct = true;
          P.DiscountRate = 100;
          P.DiscountAmount = P.PriceOriginal;

          selectedP.push(P);
          setRewardType(1);
        }
      );
    }
    setSelectedProducts(selectedP);
  };
  const invoiceDiscountReward = (rewards, excludeProSum) => {
    let tAmount = totalPrice,
      amountGD = globalDiscountAmount,
      tax = globalTax;
    if (
      rewards.IsDiscountIncluded === "true" &&
      rewards.IsTaxIncluded === "true"
    ) {
      if (totalPrice - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === "false" &&
      rewards.IsTaxIncluded === "true"
    ) {
      if (totalPrice - amountGD - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === "true" &&
      rewards.IsTaxIncluded === "false"
    ) {
      if (totalPrice - tax - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === "false" &&
      rewards.IsTaxIncluded === "false"
    ) {
      if (subPrice - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else {
      alert("invoice amount must be greater then Reward minimum amount");
    }
  };
  const invoiceEarnPoints = async (cb) => {
    let tAmount = totalPrice,
      amountGD = globalDiscountAmount,
      tax = globalTax;
    let invEP = EarnPointIArry.find(
      (e) =>
        totalPrice >= e.InvoiceAmountFrom && totalPrice <= e.InvoiceAmountTo
    );
    if (!invEP) {
      return 0;
    }

    if (invEP.IsDiscountIncluded === "true" && invEP.IsTaxIncluded === "true") {
      if (
        totalPrice >= invEP.InvoiceAmountFrom &&
        totalPrice <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else if (
      invEP.IsDiscountIncluded === "false" &&
      invEP.IsTaxIncluded === "true"
    ) {
      if (
        totalPrice - amountGD >= invEP.InvoiceAmountFrom &&
        totalPrice - amountGD <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else if (
      invEP.IsDiscountIncluded === "true" &&
      invEP.IsTaxIncluded === "false"
    ) {
      if (
        totalPrice - tax >= invEP.InvoiceAmountFrom &&
        totalPrice - tax <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else if (
      invEP.IsDiscountIncluded === "false" &&
      invEP.IsTaxIncluded === "false"
    ) {
      if (
        subPrice >= invEP.InvoiceAmountFrom &&
        subPrice <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const proCatEarnPoints = async (pro) => {
    let catMatch = EarnPointCArry.find(
      (e) => e.CategoryCode === pro.ProductCategoryCode
    );
    let proMatch = EarnPointPArry.find(
      (e) =>
        e.ProductBarCode === pro.ProductBarCode && e.Quantity === pro.Quantity
    );
    let erP;
    if (proMatch && catMatch) {
      erP = proMatch.PointsEarned + catMatch.PointsEarned;
      return erP;
    } else if (catMatch) {
      erP = catMatch.PointsEarned;
      return erP;
    } else if (proMatch) {
      erP = proMatch.PointsEarned;
      return erP;
    } else {
      erP = 0;
      return erP;
    }
  };

  const selectedAllProducts = (products, response, tax, type) => {
    let tPrice = 0,
      sPrice = 0,
      allpro = [];
    let retunProduct = products ? products : retunProducts;
    let returnBills = response ? response : returnBill;
    let selectedGlobalTax = tax ? tax : selectedGlobalTaxObj;
    console.log("return billsssssss", returnBills);
    retunProduct.forEach((pro) => {
      tPrice = tPrice + pro.GrandAmount;
      sPrice = sPrice + pro.GrandAmount;
    });
    //  console.log("retunProducts...", selectedGlobalTaxObj)
    if (type === "reprint") {
      setsubPrice(returnBills.GrandAmount);
      setTotalPrice(returnBills.RoundOffAmount + response.AdvancePaidInCash);
      setglobalDiscountAmount(returnBills.GlobalDiscountAmount);
      setGlobalTax(returnBills.GlobalTax1Amount);
      returnBills.BillDetails = retunProduct;
      setSelectedProducts(retunProduct);
      setInvoiceNumber(returnBills.InvoiceNumber);
      setLoading(true);
      // let number = retunProduct.filter(
      //   w => w.IsParentAddOn === 1 || w.IsParentAddOn === true,
      // ).length;
      // setNumberOfItems(number);
      setisReturnInvoice(false);

      paymentProcess("", "", type);

      // paymentProcess(returnBill.AdvancePaidInCash, '', 'reprint');
    } else {
      // setToggle(true);
      if (
        returnBills.GlobalTax1Amount > 0 ||
        returnBills.GlobalDiscountRate > 0
      ) {
        if (returnBills.GlobalDiscountRate > 0) {
          console.log("GlobalDiscountRate");
          globalDiscountAmountFun("", sPrice, tPrice, "recalling");
        } else if (returnBills.GlobalDiscountAmount > 0) {
          console.log("GlobalDiscountAmount");
          globalDiscountAmountFun(
            "globalDiscount",
            sPrice,
            tPrice,
            "recalling"
          );
        } else if (returnBills.GlobalTax1Amount > 0) {
          globalTaxFun(selectedGlobalTax, sPrice, "", tPrice);
        }
        setsubPrice(sPrice);
      } else {
        setTotalPrice(tPrice);
        setsubPrice(sPrice);
      }

      let array = [];

      let parntProducts = retunProduct.filter((x) => x.IsParentAddOn === true);
      let addonnProducts = retunProduct.filter(
        (x) => x.IsParentAddOn === false
      );
      for (let index = 0; index < parntProducts.length; index++) {
        const element = parntProducts[index];
        if (array.length === 0 && element.IsParentAddOn === true) {
          array.push(element);
          let Addonsofthis = addonnProducts.filter(
            (x) =>
              x.AddOnParentSalesInvoiceDetailsID ===
              element.SalesInvoiceDetailsID
          );
          if (Addonsofthis) {
            for (let x = 0; x < Addonsofthis.length; x++) {
              const y = Addonsofthis[x];
              array.push(y);
            }
          }
        } else {
          let itemAddons = addonnProducts.filter(
            (x) =>
              x.AddOnParentSalesInvoiceDetailsID ===
              element.SalesInvoiceDetailsID
          );
          if (itemAddons) {
            array.push(element);
            for (let x = 0; x < itemAddons.length; x++) {
              const y = itemAddons[x];
              array.push(y);
            }
          } else {
            array.push(element);
          }
        }
      }

      setSelectedProducts(array);

      // setSelectedProducts(retunProduct);
      let number = retunProduct.filter(
        (w) => w.IsParentAddOn === 1 || w.IsParentAddOn === true
      ).length;
      setNumberOfItems(number);
      setisReturnInvoice(false);
    }
  };
  const deleteHoldedInvoice = (holdInvoiceNumber) => {
    DeleteColumnById(HoldInvoiceTable, "invoiceNumber", holdInvoiceNumber);
  };

  const productAssignSaleAgent = (items, value, item) => {
    // console.log('productAssignSaleAgent', items, value, item);
    let selectedAgent = items.filter((res) => res.value === value);
    // console.log('selectedAgent', selectedAgent);
    let selectedPro = [...selectedProducts];
    selectedPro.forEach((pro) => {
      if (pro.SalesInvoiceDetailsID === item.SalesInvoiceDetailsID) {
        pro.SalesAgentCode = selectedAgent[0].SalesAgentCode;
        pro.value = value;
      }
    });
    setSelectedProducts(selectedPro);
  };

  return (
    <Design
      navigation={props.navigation}
      options={options}
      setOptions={setOptions}
      payments={payments}
      setPayments={setPayments}
      paymentsValue={paymentsValue}
      setPaymentsValue={setPaymentsValue}
      paymentsOpen={paymentsOpen}
      setPaymentsOpen={setPaymentsOpen}
      refundPayments={refundPayments}
      setRefundPayments={setRefundPayments}
      refundPaymentsOpen={refundPaymentsOpen}
      setRefundPaymentsOpen={setRefundPaymentsOpen}
      refundPaymentsValue={refundPaymentsValue}
      setRefundPaymentsValue={setRefundPaymentsValue}
      isToggle={isToggle}
      toggleFun={toggleFun}
      onInvoiceClick={onInvoiceClick}
      allCategoreis={allCategoreis}
      categoryProducts={categoryProducts}
      getSelectedCategoryProducts={getSelectedCategoryProducts}
      onSelectProduct={onSelectProduct}
      selectedProducts={selectedProducts}
      addProductToList={addProductToList}
      updateProductToList={updateProductToList}
      totalPrice={totalPrice}
      subPrice={subPrice}
      globalDiscountAmount={globalDiscountAmount}
      deleteItem={deleteItem}
      onClickCancel={onClickCancel}
      onNewInvoice={onNewInvoice}
      name={props.name}
      paymentMethodSelect={paymentMethodSelect}
      onChangeText={onChangeText}
      isPopup={isPopup}
      viewref={viewref}
      focus={focus}
      setfocus={setfocus}
      TerminalConfiguration={TerminalConfiguration}
      AgentList={AgentList}
      searchTextFun={searchTextFun}
      searchText={searchText}
      setSearchText={setSearchText}
      StringsList={props.StringsList}
      flatListRef={flatListRef}
      optionsValue={optionsValue}
      setOptionsValue={seOptionsValue}
      viewShotRef={viewShotRef}
      onCapture={onCapture}
      uriImage={uriImage}
      onSaveInvoice={onSaveInvoice}
      isInvoice={isInvoice}
      isTerminalSetup={isTerminalSetup}
      setTerminalSetup={setTerminalSetup}
      isPairPrinterFamily={isPairPrinterFamily}
      setPairPrinterFamily={setPairPrinterFamily}
      onEndEditing={onEndEditing}
      manuallyCount={manuallyCount}
      setmanuallyCount={setmanuallyCount}
      isLoading={isLoading}
      invoiceNumber={invoiceNumber}
      orderNumber={orderNumber}
      setOrderNumber={setOrderNumber}
      setLoading={setLoading}
      dueAmount={dueAmount}
      advancePaidInCash={advancePaidInCash}
      displayAlert={displayAlert}
      setDisplayAlert={setDisplayAlert}
      setisPromptAlert={setisPromptAlert}
      isPromptAlert={isPromptAlert}
      getHoldInvoiveFun={getHoldInvoiveFun}
      message={message}
      isHoldInvoices={isHoldInvoices}
      setisHoldInvoices={setisHoldInvoices}
      holdInvoiceFun={holdInvoiceFun}
      holdInvoiceName={holdInvoiceName}
      isScanner={isScanner}
      onSuccessScan={onSuccessScan}
      setScanner={setScanner}
      returnInvoiceNumber={returnInvoiceNumber}
      alertValue={alertValue}
      alertType={alertType}
      reacallFunc={reacallFunc}
      retunProducts={retunProducts}
      isReturnInvoice={isReturnInvoice}
      setisReturnInvoice={setisReturnInvoice}
      getAddOnProducts={getAddOnProducts}
      isAddon={isAddon}
      setisAddon={setisAddon}
      props={props}
      States={useState}
      checkReturnProductAddons={checkReturnProductAddons}
      isGlobalTax={isGlobalTax}
      setIsGlobalTax={setIsGlobalTax}
      globalTaxList={globalTaxList}
      setGlobalTaxList={setGlobalTaxList}
      globalTaxFun={globalTaxFun}
      globalTax={globalTax}
      buyerViewRef={buyerViewRef}
      isBuyer={isBuyer}
      setisBuyer={setisBuyer}
      loyaltyList={loyaltyList}
      setBuyerInfo={setBuyerInfo}
      buyerInfo={buyerInfo}
      loyaltyCardViewRef={loyaltyCardViewRef}
      isLoyaltyCard={isLoyaltyCard}
      setIsLoyaltyCard={setIsLoyaltyCard}
      otherOptions={otherOptions}
      setRedeemPoints={setRedeemPoints}
      redeemPoints={redeemPoints}
      optionsOpen={optionsOpen}
      setoptionsOpen={setoptionsOpen}
      globalDiscountRate={globalDiscountRate}
      cashPaidAmountFun={cashPaidAmountFun}
      noFamilyFound={noFamilyFound}
      selectedAllProducts={selectedAllProducts}
      onManuallyChangePrice={onManuallyChangePrice}
      setToggle={setToggle}
      deleteHoldedInvoice={deleteHoldedInvoice}
      QR={QR}
      setIsDrawar={setIsDrawar}
      drawerRef={drawerRef}
      isDrawar={isDrawar}
      getDrawerSetting={getDrawerSetting}
      isIngredient={isIngredient}
      setIsIngredient={setIsIngredient}
      ingredientsData={ingredientsData}
      setIngredientsData={setIngredientsData}
      onSelectIngredintes={onSelectIngredintes}
      sumOfProductTax={sumOfProductTax}
      numberOfItems={numberOfItems}
      qrRef2={qrRef2}
      onQRImage={onQRImage}
      areaItem={areaItem}
      setAreaItem={setAreaItem}
      tableItem={tableItem}
      setTableItem={setTableItem}
      getProductsIngredients={getProductsIngredients}
      searchIngredient={searchIngredient}
      searchIngredientFun={searchIngredientFun}
      onPressAddIntgredient={onPressAddIntgredient}
      isIngredientSearch={isIngredientSearch}
      sumOfProductDiscount={sumOfProductDiscount}
      selectedAgent={selectedAgent}
      selectedPyamentMethod={selectedPyamentMethod}
      terminalSetup={terminalSetup}
      userConfiguration={userConfiguration}
      productAssignSaleAgent={productAssignSaleAgent}
      onPressBackCat={onPressBackCat}
      onClickIn={onClickIn}
      setAddProductLoader={setAddProductLoader}
      AddProductLoader={addProductLoader}
      companyVATRegistor={companyVATRegistor}
      dispatch={props.dispatch}
      toggleSearchScan={toggleSearchScan}
      barCode={barCode}
      ref_searchBar={ref_searchBar}
      barCodeText={barCodeText}
      displayModal={displayModal}
      setDisplayModal={setDisplayModal}
      guestItem={guestItem}
      setGuestItem={setGuestItem}
      notesModal={notesModal}
      setNotesModal={setNotesModal}
      notesDetail={notesDetail}
      setNotesDetail={setNotesDetail}
      onOpenModal={onOpenModal}
      selectedGuest={selectedGuest}
      setSelectedGuest={setSelectedGuest}
      selectedArea={selectedArea}
      setSelectedArea={setSelectedArea}
      areas={areas}
      setAreas={setAreas}
      onSelect={onSelect}
      isdisabled={isdisabled}
      setisDisabled={setisDisabled}
      DineInOrder={DineInOrder}
      orderTaker={orderTaker}
      orderTakerType={orderTakerType}
      setOrderTakerType={setOrderTakerType}
      setOrderTaker={setOrderTaker}
      placeOrderWithPay={placeOrderWithPay}
      placeOrderWithoutPay={placeOrderWithoutPay}
      getStorageItem={getStorageItem}
      storageItems={storageItems}
      setStorageItems={setStorageItems}
      enableTBut={enableTBut}
      setEnableTbut={setEnableTbut}
      openModal={openModal}
      setOpenModal={setOpenModal}
      orderType={orderType}
      setOrderType={setOrderType}
      orderItems={orderItems}
      setOrderItems={setOrderItems}
      disable={disable}
      setDisable={setDisable}
      onPressSave={onPressSave}
      onPressSaveTime={onPressSaveTime}
      rebootTerminalFunction={rebootTerminalFunction}
      onClickLogoutFunction={onClickLogoutFunction}
      onClickMenuFunction={onClickMenuFunction}
      getLastOrderNumber={getLastOrderNumber}
      rebootAlert={rebootAlert}
      orderCode={orderCode}
      setOrderCode={setOrderCode}
      orderDetails={orderDetails}
      setOrderDetails={setOrderDetails}
      getOrderDetails={getOrderDetails}
      CancelOrder={CancelOrder}
      isSearch={isSearch}
      setIsSearch={setIsSearch}
      placeholder={placeholder}
      setPlaceHolder={setPlaceHolder}
      getOrder={getOrder}
      getOrderBySearch={getOrderBySearch}
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
      UpdateOrder={UpdateOrder}
      holdBillFunction={holdBillFunction}
      shortInvoice={shortInvoice}
      setShortInvoice={setShortInvoice}
      lastOrderNumber={lastOrderNumber}
      setLastOrderNumber={setLastOrderNumber}
      billingStyleId={billingStyleId}
      isInnerPrinter={isInnerPrinter}
      setInnerPrinter={setInnerPrinter}
      invoiceDates={invoiceDates}
      restState={restState}
      toggled={toggled}
      setToggled={setToggled}
      placewithpay={placewithpay}
      paymentView={paymentView}
      setPaymentView={setPaymentView}
      orderPopup={orderPopup}
      setOrderPopup={setOrderPopup}
      // requiredTime={requiredTime}
      // setRequiredTime={setRequiredTime}
      onCloseTimeModal={onCloseTimeModal}
      railStart={railStart}
      setRailStart={setRailStart}
      selectedOrderType={selectedOrderType}
      setSelectedOrderType={setSelectedOrderType}
      placedwithPay={placedwithPay}
      setMessage={setMessage}
      billingType={billingType}
      selectedProductNotes={selectedProductNotes}
      setSelectedProductsNotes={setSelectedProductsNotes}
      onSaveNotes={onSaveNotes}
      orderUpdate={orderUpdate}
      setOrderUpdate={setOrderUpdate}
      orderPickerOpen={orderPickerOpen}
      setOrderPickerOpen={setOrderPickerOpen}
      orderValue={orderValue}
      setOrderValue={setOrderValue}
      showButton={showButton}
      setShowButton={setShowButton}
      customerNotes={customerNotes}
      setCustomerNotes={setCustomerNotes}
      customerNotesOpen={customerNotesOpen}
      setCustomerNotesOpen={setCustomerNotesOpen}
      changeTableStatus={changeTableStatus}
      printType={printType}
      isLogout={isLogout}
      setisLogout={setisLogout}
      optionType={optionType}
      setOptionType={setOptionType}
      isFocusSearch={isFocusSearch}
      setFocusSearch={setFocusSearch}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
