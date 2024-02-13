import AsyncStorage from '@react-native-async-storage/async-storage';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import moment from 'moment';
import React, {useEffect, useRef, useState, useMemo} from 'react';
import uuid from 'react-native-uuid';
import {captureRef} from 'react-native-view-shot';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import {
  Alert,
  PermissionsAndroid,
  NativeEventEmitter,
  I18nManager,
  Platform,
  NativeModules,
  Keyboard,
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import Toast from 'react-native-root-toast';
// import ImageEditor from '@react-native-community/image-editor';
// import EscPosPrinter, {
//   getPrinterSeriesByName,
//   IPrinter,
// } from 'react-native-esc-pos-printer';
// import Encoder from 'esc-pos-encoder';

import {Invoice} from '@axenda/zatca';
import RNPrint from 'react-native-print';
import {ServerCall} from '../../redux/actions/asynchronousAction';
import {
  DeleteColumnById,
  getData,
  getDataById,
  getDataByMultipaleID,
  getDataJoinById,
  updateColunm,
} from '../../sqliteHelper';
import {CategoriesListTable} from '../../sqliteTables/CategoriesList';
import {DrawerSetupTable} from '../../sqliteTables/DrawerSetup';
import {
  HoldInvoiceTable,
  InsertHoldInvoice,
} from '../../sqliteTables/HoldInvoice';
import {ProductCardAddOnGroupListTable} from '../../sqliteTables/ProductCardAddOnGroupList';
import {SalesFamilySummaryListTable} from '../../sqliteTables/SalesFamilySummaryList';
import {ProductListTable} from '../../sqliteTables/ProductList';
import {
  InsertSaleBillDetails,
  SaleBillDetailsTable,
} from '../../sqliteTables/SaleBillDetails';
import {InsertSaleBills, SaleBillsTable} from '../../sqliteTables/SaleBills';
import {SalesAgentsTable} from '../../sqliteTables/SalesAgents';
import {TaxRateParentListTable} from '../../sqliteTables/TaxRateParentList';
import {TerminalConfigurationTable} from '../../sqliteTables/TerminalConfiguration';
import {TerminalSetupTable} from '../../sqliteTables/TerminalSetup';
import {UpdateProductDetailListTable} from '../../sqliteTables/UpdateProductDetailList';
import Design from './design';
import calculateTaxeGroups from '../../helpers/TaxCalculationHelper';
import {LoyaltyRewardsListTable} from '../../sqliteTables/LoyaltyRewardsList';
import {LoyaltyListTable} from '../../sqliteTables/LoyaltyList';
import {LoyaltyDetailListTable} from '../../sqliteTables/LoyaltyDetailList';
import errorMessages from '../../constant/errorMessages';
import {SalesPostingConfigurationListTable} from '../../sqliteTables/SalesPostingConfigurationList';
import DBTable from '../../constant/UpdateDB';
import {ProductCardAddOnEquivalentProductsListTable} from '../../sqliteTables/ProductCardAddOnEquivalentProductsList';
import {
  InsertProductCardIngredientsList,
  ProductCardIngredientsListTable,
} from '../../sqliteTables/ProductCardIngredientsList';
import sizeHelper from '../../helpers/sizeHelper';
import {UserConfigurationTable} from '../../sqliteTables/UserConfiguration';
import {A4PrintStylesTable} from '../../sqliteTables/A4PrintStyles';
import ResetDrawerSetup from '../../constant/ResetDrawerSetup';
import {PaymentMethodTable} from '../../sqliteTables/PaymentMethods';
import base64 from 'react-native-base64';
var Sound = require('react-native-sound');
const numberToWord = require('number-to-words');
const numberToArb = require('tafgeetjs');
import NetInfo from '@react-native-community/netinfo';
const {PrinterNativeModule} = NativeModules;
const PermissionFile = NativeModules.PermissionFile;
const eventEmitter = new NativeEventEmitter(PrinterNativeModule);
const HomeScreen = props => {
  const [options, setOptions] = useState([
    {label: props.StringsList._32, value: 'getHoldInvoice'},
    {label: props.StringsList._105, value: 'reprint'},
    {label: props.StringsList._319, value: 'returnBill'},
    {label: props.StringsList._30, value: 'buyer'},
    {label: props.StringsList._437, value: 'loyaltyCard'},
  ]);
  const [payments, setPayments] = useState([
    {label: props.StringsList._314, value: '1'},
    {label: props.StringsList._55, value: '2'},
    {label: props.StringsList._325, value: '3'},
  ]);
  const [printType, setPrintType] = useState(null);
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);
  const [isToggle, setToggle] = useState(false);
  const [allCategoreis, setAllCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subPrice, setsubPrice] = useState(0);
  const [focus, setfocus] = useState(0);
  const [isPopup, setPopup] = useState(false);
  const [AgentList, setAgentList] = useState([]);
  const [TerminalConfiguration, setTerminalConfiguration] = useState({});
  const [paymentsValue, setPaymentsValue] = useState(null);
  const [optionsValue, seOptionsValue] = useState(null);
  const [uriImage, setUriImage] = useState(null);
  const [isInvoice, setInvoice] = useState(false);
  const [isTerminalSetup, setTerminalSetup] = useState(false);
  const [isPairPrinterFamily, setPairPrinterFamily] = useState(false);
  const [manuallyCount, setmanuallyCount] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
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
  const [message, setMessage] = useState('');
  const [beepSound, setBeepSound] = useState(null);
  const [terminalSetup, setTerminalSetupObj] = useState(null);
  const [drawerSetupArr, setDrawerSetupArr] = useState({});
  const [holdInvoiceName, setHoldInvoiceName] = useState('');
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
  const [searchText, setSearchText] = useState('');
  const [isDrawar, setIsDrawar] = useState(false);
  const [isIngredient, setIsIngredient] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [sumOfProductTax, setSumOfProductsTax] = useState(0);
  const [sumOfProductDiscount, setSumOfProductsDiscount] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [ingredientProductCode, setIngredientProductCode] = useState('');
  const [ingredientText, setIngredientText] = useState('');
  const [isIngredientSearch, setIsIngredientSearch] = useState(false);
  const [printerMacAddress, setPrinterMacAddress] = useState(null);
  const [printerName, setPrinterName] = useState(null);
  const [userConfiguration, setUserConfiguration] = useState({});
  const [userDiscountLimit, setUserDiscountLimit] = useState(0);
  const [selectedcat, setSelectedcat] = useState({});
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [lastBillNumber, setLastBillNumber] = useState(null);
  const [addProductLoader, setAddProductLoader] = useState(false);
  const [companyVATRegistor, setCompanyVATRegistor] = useState(false);
  const [barCode, setBarCode] = useState(true);
  const [barCodeText, setbarCodeText] = useState('');
  const [billFormatType, setBillFormatType] = useState(1);
  const [billDates, setBillDate] = useState(null);
  const [isLogout, setisLogout] = useState(false);
  const [billingType, setBillingType] = useState(null);
  const [isBillingType, setisBillingType] = useState(false);
  const [clientCustomInvoice, setClientCustomInvoice] = useState(false);
  const [isCustomInvoice, setIsCustomInvoice] = useState(false);
  const [isPaidCash, setIsPaidCash] = useState(false);
  const [cashAmount, setCashAmount] = useState('');
  const [productTaxes, setProductTaxes] = useState([]);
  const [customerNotes, setCustomerNotes] = useState('');
  const [customerNotesOpen, setCustomerNotesOpen] = useState(false);
  const [billingTypeData, setBillingTypeData] = useState([
    {
      id: 1,
      name: 'Ordinary Sales Bill',
      name2: 'فاتورة مبيعات عادية',
      isSelected: false,
    },
    {
      id: 2,
      name: 'Simplified Tax Bill',
      name2: 'فاتورة ضريبية مبسطة',
      isSelected: false,
    },
    {id: 3, name: 'Tax Invoice', name2: 'فاتورة ضريبية', isSelected: false},
  ]);
  const [billingStyleId, setBillingStyleId] = useState(2);
  const [isInnerPrinter, setInnerPrinter] = useState(false);
  const [isBillNeedPost, setBillNeedPost] = useState(false);
  const [refundPayments, setRefundPayments] = useState([
    {label: props.StringsList._314, value: '1'},
    {label: 'on Account', value: '2'},
  ]);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [descriptionDetail, setDescriptionDetail] = useState();
  const [selectedProductNotes, setSelectedProductsNotes] = useState();
  const [totalReprintCount, setTotalReprintCount] = useState(null);

  const viewref = useRef(null);
  const viewShotRef = useRef(null);
  const flatListRef = useRef(null);
  const buyerViewRef = useRef(null);
  const loyaltyCardViewRef = useRef(null);
  const qrRef = useRef(null);
  const drawerRef = useRef(null);
  const qrRef2 = useRef(null);
  const ref_searchBar = useRef(null);
  let lastBillDetail = null;
  let productGroupList = [];
  let pGL = [],
    localIndex;
  let mins = 15 * 60 * 1000;

  useEffect(() => {
    setInterval(async () => {
      let status = await getNetInfo();
      if (status === true) {
        console.log('Connected calling', status);
        postBillsbyInterval();
      } else {
        console.log('Not connected', status);
      }
    }, mins);
  }, []);
  const onSaveNotes = item => {
    let notesArray = [...selectedProducts];
    let newArray = notesArray.map(p => {
      var temp = Object.assign({}, p);
      if (temp.ProductBarCode === item.ProductBarCode) {
        temp.Description = descriptionDetail;
      }
      return temp;
    });
    setSelectedProducts(newArray);
    setDescriptionModal(false);
  };

  useEffect(async () => {
    const OsVer = Platform.constants['Release'];
    console.log('android version', OsVer);
    const unsubscri = props.navigation.addListener('focus', async () => {
      setLoading(true);
      // console.log(
      //   'getBrand',
      //   getDeviceType(),
      //   getBrand(),
      //   getBundleId(),
      //   getDeviceId(),
      // );

      let ConnectedBluetoothInfo = await AsyncStorage.getItem(
        'ConnectedBluetoothInfo',
      );
      if (ConnectedBluetoothInfo) {
        console.log('ConnectedBluetoothInfo', ConnectedBluetoothInfo);
        let printAdress = ConnectedBluetoothInfo?.split('|');
        setPrinterMacAddress(printAdress[1]);
        setPrinterName(printAdress[0]);
        if (printAdress[0] === 'InnerPrinter') {
          setInnerPrinter(true);
        } else {
          setInnerPrinter(false);
        }
      }
      let bilT = await AsyncStorage.getItem('SaleBIL_STYLE');
      if (bilT) {
        let billTypeSe = await JSON.parse(bilT);
        console.log('bill type is ', billTypeSe);
        setBillingType(billTypeSe);
      } else {
        setBillingType({
          id: 3,
          name: 'Tax Invoice',
          name2: 'فاتورة ضريبية',
          isSelected: true,
        });
      }
      let BT = await AsyncStorage.getItem('BILLING_STYLE');
      BT = BT ? JSON.parse(BT) : 2;
      setBillingStyleId(BT.id);
      getAllCategories();
      let agentArray = [],
        loyaltyArray = [],
        paymentArray = [];
      getData(LoyaltyListTable, cb => {
        // console.log("LoyaltyListTable..", cb)

        cb.forEach(element => {
          loyaltyArray.push({
            label: element?.LoyaltyName,
            value: element?.LoyaltyName,
            ...element,
          });
        });
      });
      setLoyaltyList(loyaltyArray);
      getData(SalesAgentsTable, sa => {
        sa.forEach(element => {
          agentArray.push({
            label: element?.SalesAgentName,
            value: element?.UserCode,
            ...element,
          });
        });
      });

      let cashalert = await AsyncStorage.getItem('CASH_PAID_ALERT');

      // createInvoiceNumber();
      await getData(TerminalSetupTable, cb => {
        setTerminalSetupObj(cb[0]);
        // console.log("TerminalSetupTable...", cb)
      });
      let companyCode = '';
      await getData(TerminalConfigurationTable, async TC => {
        setTerminalConfiguration(TC[0]);
        // reduceImageSizes(TC[0].CompanyLogoType +
        //   ',' + TC[0].CompanyLogo);
        companyCode = TC[0].CompanyCode;
        let isnum = /^\d+$/.test(TC[0].ValueAddedTaxNumber);
        //let isCherector = /^[a-z]+$/i.test("a")
        // numberCher = /^[a-z0-9]+$/i.test("1245566555")
        let isZero = TC[0].ValueAddedTaxNumber === '000000000000000';
        // console.log('TerminalConfigurationTable...', TC);
        if (TC[0].ValueAddedTaxNumber.length === 15 && isnum && !isZero)
          setCompanyVATRegistor(true);
        //  console.table("TerminalConfigurationTable...", TC[0])
      });
      if (cashalert === 'true') {
        setIsCustomInvoice(true);
      }
      await getData(UserConfigurationTable, async TC => {
        setUserConfiguration(TC[0]);
        setUserDiscountLimit(TC[0]?.DiscountLimit);
        //console.log("UserConfigurationTable...", TC)
        if (TC[0].SalesRefundAllowed === 0) {
          setOptions([
            {label: props.StringsList._32, value: 'getHoldInvoice'},
            {label: props.StringsList._30, value: 'buyer'},
            {label: props.StringsList._437, value: 'loyaltyCard'},
          ]);
        }
        await getData(SalesPostingConfigurationListTable, cb => {
          cb.forEach(element => {
            if (element?.PaymentTypeName === 'Credit') {
              if (TC[0]?.AllowCreditSale === 'true') {
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
      // console.log('UserPaymentmethods...', paymentArray);
      setPayments(paymentArray);
      setAgentList(agentArray);

      let DefaultGTax = await AsyncStorage.getItem('DEFAULT_GTAX');
      await getData(TaxRateParentListTable, cb => {
        let t = cb.filter(t => t.TaxLevel === 2);
        t.unshift({TaxFamilyName: 'None', TaxFamilyCode: 'None'});
        if (Array.isArray(t) && t.length > 0) {
          let defaultT = t.find(t => t.TaxFamilyCode === DefaultGTax);
          if (defaultT) {
            initialglobalTaxFun(defaultT, '', '');
          }
        }
        setGlobalTaxList(t);
        // setTerminalSetupObj(cb[0]);
      });

      // getPrinterList()
      soundLoading();
      getData(DrawerSetupTable, cb => {
        // console.log(' DrawerSetupTable', cb);
        setDrawerSetupArr(cb[0]);
      });

      let saleAgent = await AsyncStorage.getItem('SELECTED_AGNETS');
      if (saleAgent) {
        // console.log('SaleAgent', saleAgent);
        saleAgent = JSON.parse(saleAgent);

        setSelectedAgent(saleAgent);
      }
    });
    return () => {
      unsubscri;
    };
  }, [props.navigation]);
  const postBillsbyInterval = async () => {
    let uri = await AsyncStorage.getItem('FILE_URI');
    console.log('Folder uri', uri);

    let newBillList = [];
    await getData(SaleBillsTable, async cb => {
      for (let i = 0; i < cb.length; i++) {
        if (
          (cb[i].isUploaded == 'false' || !cb[i].isUploaded) &&
          (cb[i].isProcessed == 'false' || !cb[i].isProcessed)
        ) {
          await getDataById(
            SaleBillDetailsTable,
            'salesBillID',
            cb[i].salesBillID,
            billProducts => {
              (cb[i].isProcessed = false), (cb[i].isUploaded = true);
              cb[i].BillDetails = billProducts;
              (cb[i].isGlobalTax1IncludedInPrice =
                cb[i].isGlobalTax1IncludedInPrice === 'false' ? false : true),
                (cb[i].isGlobalTax2IncludedInPrice =
                  cb[i].isGlobalTax2IncludedInPrice === 'false' ? false : true),
                (cb[i].isLoyaltyInvoice =
                  cb[i].isLoyaltyInvoice === 'false' ? false : true);

              newBillList.push(cb[i]);
            },
          );
        }
      }
      console.log('New Bill list ...', newBillList);
      if (newBillList.length > 0) {
        let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
        const response1 = await props.dispatch(
          ServerCall(UserLogin, 'SalesBill/CreateSalesBill', newBillList),
        );
        console.log('bill posting response by interval', response1);
        if (response1 === 'success') {
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          PermissionFile.deleteFile(uri);
        } else if (response1 === 'False') {
          let msg = errorMessages.GetCounterMessage(
            'PostSettingTaxorDiscounttoRemove',
            props.StringsList,
          );
          setMessage(props.StringsList._298);
          setDisplayAlert(true);
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          PermissionFile.deleteFile(uri);
        } else {
          setMessage(props.StringsList._228);
          setDisplayAlert(true);
        }
      }
    });
  };
  // const reduceImageSizes = async path => {
  //   console.log('our image is', path);
  //   let cropData = {
  //     offset: {x: 0, y: 0},
  //     size: {width: 100, height: 100},
  //     displaySize: {width: 100, height: 100},
  //     resizeMode: 'contain',
  //   };
  //   ImageEditor.cropImage(path, cropData).then(url => {
  //     console.log('Cropped image uri', url);
  //   });
  // };

  const initialglobalTaxFun = async (itm, type, n, totalAmount, disAmount) => {
    if (itm.TaxFamilyCode !== 'None') {
      let tPrice = totalAmount ? totalAmount : totalPrice;
      let subPr = type === 'returnInvoice' ? subPrice : type;
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
        true,
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
      console.log('globalTax else', tPrice);
      setTotalPrice(tPrice);
      setSelectedGlobalTaxObj(null);
      setGlobalTaxObj(null);
      setGlobalTax(0);
      // setLoading(false);
    }
  };
  const getNetInfo = async () => {
    let networkState = false;
    await NetInfo.fetch().then(state => {
      networkState = state.isConnected;
    });
    return networkState;
  };
  useEffect(() => {
    setTimeout(() => {
      checkLocalDBBills();
    }, 5000);
  }, []);

  const checkLocalDBBills = async () => {
    setPrintType(null);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getData(DrawerSetupTable, async cb => {
          console.log('isInitialLogin ', cb[0]?.isInitialLogin === 'true');
          if (cb[0]?.isInitialLogin === 'true') {
            updateColunm(
              DrawerSetupTable,
              ['isInitialLogin'],
              'id',
              'D12345678',
              'false',
            );
            const OsVer = Platform.constants['Release'];

            if (OsVer >= 11) {
              let path = '/storage/emulated/0/Documents/Bnody POS/Invoices.txt';
              if (await RNFS.exists(path)) {
                let uri = await AsyncStorage.getItem('FILE_URI');
                console.log('Folder uri android 11 and above', uri);
                let Data = await PermissionFile.getInvoices(uri);
                // console.log('Data =================>', Data);
                let newBillList = Data;
                let bills = await JSON.parse(newBillList);
                if (bills.length > 0) {
                  //
                  const lastObject = bills[bills.length - 1];
                  const lastBillNumber = lastObject.BillDetails[0].BillNumber;
                  let lastBill = lastBillNumber.split('-');
                  const numericPart = lastBill[lastBill.length - 1].replace(
                    /^0+/,
                    '',
                  );
                  console.log('Last Bill Number:=====>', numericPart);
                  //
                  let status = await getNetInfo();
                  console.log('Net Status =====>', status);
                  if (status === true) {
                    postingBill(newBillList);
                  } else {
                    Alert.alert(
                      'Panding Bills',
                      'Some of Your bills are pending to post kindly connect to your internet connection to post bills',
                      [
                        {
                          text: 'OKAY',
                          onPress: async () => {
                            let columnName = ['LastBillNumber'];
                            let columnValue = [Number(numericPart)];
                            await getData(
                              TerminalConfigurationTable,
                              async TC => {
                                if (TC[0]?.UserCode) {
                                  updateColunm(
                                    TerminalConfigurationTable,
                                    columnName,
                                    'UserCode',
                                    TC[0]?.UserCode,
                                    columnValue,
                                  );
                                }
                              },
                            );

                            console.log('Press OK');
                          },
                        },
                      ],
                    );
                  }
                }
              }
            } else {
              let path = '/storage/emulated/0/Downloads/Bnody POS/Invoices.txt';
              if (RNFS.exists(path)) {
                let uri = await AsyncStorage.getItem('FILE_URI');
                console.log('Folder uri android 10 ', uri);
                let Data = await PermissionFile.getInvoices(uri);
                let newBillList = Data;
                let bills = await JSON.parse(newBillList);
                if (bills.length > 0) {
                  //
                  const lastObject = bills[bills.length - 1];
                  const lastBillNumber = lastObject.BillDetails[0].BillNumber;
                  let lastBill = lastBillNumber.split('-');
                  const numericPart = lastBill[lastBill.length - 1].replace(
                    /^0+/,
                    '',
                  );
                  console.log('Last Bill Number:=====>', numericPart);
                  //
                  if (status === true) {
                    postingBill(newBillList);
                  } else {
                    Alert.alert(
                      'Panding Bills',
                      'Some of Your bills are pending to post kindly connect to your internet connection to post bills',
                      [
                        {
                          text: 'OKAY',
                          onPress: async () => {
                            let columnName = ['LastBillNumber'];
                            let columnValue = [Number(numericPart)];
                            await getData(
                              TerminalConfigurationTable,
                              async TC => {
                                if (TC[0]?.UserCode) {
                                  updateColunm(
                                    TerminalConfigurationTable,
                                    columnName,
                                    'UserCode',
                                    TC[0]?.UserCode,
                                    columnValue,
                                  );
                                }
                              },
                            );

                            console.log('Press OK');
                          },
                        },
                      ],
                    );
                  }
                }
              }
            }
          }
        });
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };
  const postBills = async () => {
    setLoading(true);

    let newBillList = [];
    await getData(SaleBillsTable, async cb => {
      for (let i = 0; i < cb.length; i++) {
        if (
          (cb[i].isUploaded == 'false' || !cb[i].isUploaded) &&
          (cb[i].isProcessed == 'false' || !cb[i].isProcessed)
        ) {
          await getDataById(
            SaleBillDetailsTable,
            'salesBillID',
            cb[i].salesBillID,
            billProducts => {
              (cb[i].isProcessed = false), (cb[i].isUploaded = true);
              cb[i].BillDetails = billProducts;
              (cb[i].isGlobalTax1IncludedInPrice =
                cb[i].isGlobalTax1IncludedInPrice === 'false' ? false : true),
                (cb[i].isGlobalTax2IncludedInPrice =
                  cb[i].isGlobalTax2IncludedInPrice === 'false' ? false : true),
                (cb[i].isLoyaltyInvoice =
                  cb[i].isLoyaltyInvoice === 'false' ? false : true);

              newBillList.push(cb[i]);
            },
          );
        }
      }
      console.log('New Bill list ...', newBillList);
      if (newBillList.length > 0) {
        let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');

        const response1 = await props.dispatch(
          ServerCall(UserLogin, 'SalesBill/CreateSalesBill', newBillList),
        );

        console.log('bill posting response', response1);
        if (response1 === 'success') {
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: 'Permissions for read access',
                message: 'Give permission to your storage to read a file',
                buttonPositive: 'ok',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              const OsVer = Platform.constants['Release'];
              console.log('android version', OsVer);
              if (OsVer >= 10) {
                let path =
                  '/storage/emulated/0/Downloads/Bnody POS/Invoices.txt';
                RNFS.unlink(path).then(() => {
                  console.log('FILE DELETED');
                });
              }
            } else {
              let path = '/storage/emulated/0/Bnody POS/Invoices.txt';
              RNFS.unlink(path).then(() => {
                console.log('FILE DELETED');
              });
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        } else if (response1 === 'False') {
          let msg = errorMessages.GetCounterMessage(
            'PostSettingTaxorDiscounttoRemove',
            props.StringsList,
          );
          setMessage(props.StringsList._298);

          setDisplayAlert(true);
          updatePostedIvoice(newBillList);
          setBillNeedPost(false);
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: 'Permissions for read access',
                message: 'Give permission to your storage to read a file',
                buttonPositive: 'ok',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              let path = '/storage/emulated/0/Downloads/Bnody POS/Invoices.txt';
              RNFS.unlink(path).then(() => {
                console.log('FILE DELETED');
              });
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
  const updatePostedIvoice = array => {
    for (let i = 0; i < array.length; i++) {
      let columnName = ['isUploaded', 'isProcessed'];
      let columnValue = [true, false];
      updateColunm(
        SaleBillsTable,
        columnName,
        'salesBillID',
        array[i].salesBillID,
        columnValue,
      );
    }
  };
  const postingBill = async newBillList => {
    setLoading(true);
    setPrintType(null);
    let uri = await AsyncStorage.getItem('FILE_URI');
    console.log('Folder uri android 11 and above', uri);
    let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
    let bill = await JSON.parse(newBillList);
    const response1 = await props.dispatch(
      ServerCall(UserLogin, 'SalesBill/CreateSalesBill', bill),
    );
    if (response1 === 'success') {
      setLoading(true);
      PermissionFile.deleteFile(uri);
      let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      let res = await DBTable.AddDataInDb(props, 'rebootTerminal', accessToken);
      await AsyncStorage.removeItem('SELECTED_AGNETS');
      setLoading(false);
    } else {
      Alert.alert('Issue Bill', props.StringsList._298, [
        {
          text: 'Try Again',
          onPress: () => {
            postingBill(newBillList);
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
      ]);

      setLoading(false);
    }

    setLoading(false);
  };

  const convertArabicNumbersToEnglish = arabicText => {
    let arabic_numbers = '٠١٢٣٤٥٦٧٨٩'.split('');
    let n = '';
    let englishNumber = false;

    for (let i = 0; i < arabicText?.length; i++) {
      var number = arabic_numbers.find(x => x == arabicText[i]);
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

      //   if(state > 0){
      //        n+=state;
      //   }else{
      //        n+=arabicText[i];
      //   }
    }
    return n;
  };

  const QR = () => {
    var tax = globalTax,
      proTax = 0,
      prodis = 0;
    for (let i = 0; i < selectedProducts?.length; i++) {
      let pro = selectedProducts[i];

      tax = tax + pro.tax;
      proTax = proTax + pro.tax;
      prodis = pro?.DiscountAmount
        ? prodis + Number(pro.DiscountAmount)
        : prodis + 0;
    }
    setSumOfProductsTax(proTax);
    setSumOfProductsDiscount(prodis);
    let VAT = TerminalConfiguration?.ValueAddedTaxNumber
      ? TerminalConfiguration?.ValueAddedTaxNumber
      : '000000000000000';
    let currentDate = moment().format('YYYY-MM-DD H:mm:ss');
    let invoiceTotal = totalPrice.toFixed(
      TerminalConfiguration.DecimalsInAmount,
    );
    let invoiceVatTotal = tax.toFixed(TerminalConfiguration.DecimalsInAmount);
    // console.log("current Date", currentDate)
    // console.log("selectedProducts tax", invoiceTotal, invoiceVatTotal, currentDate, VAT)
    const invoice = new Invoice({
      sellerName: TerminalConfiguration.CompanyName,
      vatRegistrationNumber: convertArabicNumbersToEnglish(VAT),
      invoiceTimestamp: currentDate,
      invoiceTotal: invoiceTotal,
      invoiceVatTotal: invoiceVatTotal,
    });
    // console.log("imageData......imageData", TerminalConfiguration.CompanyName, VAT, currentDate, invoiceTotal, invoiceVatTotal, convertArabicNumbersToEnglish(VAT))
    let imageData = invoice.toBase64();

    if (imageData !== null) {
      return (
        <QRCode
          ref={qrRef}
          size={sizeHelper.calWp(300)}
          value={imageData}
          getRef={c => {
            if (!c?.toDataURL) return;

            c?.toDataURL(base64Image => {
              qrRef.current = base64Image;
            });
          }}
        />
      );
    }
  };

  // const callback = dataURL => {
  //   // createInvoiceStyle(dataURL)
  // };

  // const getDataURL = () => {
  //   // qrRef.current.toDataURL(callback);
  // };

  const soundLoading = () => {
    let sound = new Sound(require('../../assets/sounds/beep01.mp3'), error => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });
    setBeepSound(sound);
  };

  const SoundPlay = () => {
    beepSound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const updateTerminalConfiguration = ADamount => {
    let columnName = ['LastBillNumber'];
    let columnValue = [Number(TerminalConfiguration.LastBillNumber) + 1];
    updateColunm(
      TerminalConfigurationTable,
      columnName,
      'UserCode',
      TerminalConfiguration.UserCode,
      columnValue,
    );
    let StartFromValue = [Number(terminalSetup.StartFrom) + 1];
    updateColunm(
      TerminalSetupTable,
      ['StartFrom'],
      'id',
      '12345678',
      StartFromValue,
    );

    payments.forEach(element => {
      if (paymentsValue === '1' || Number(paymentsValue) > 5) {
        if (element.value == paymentsValue) {
          let columnNameDrawer = ['Sales'];
          getData(PaymentMethodTable, cb => {
            // console.log("LoyaltyListTable..", cb)
            let amount = cb.find(x => x.PaymentType == paymentsValue);
            let salePrice;
            if (amount) {
              salePrice = Number(amount.Sales) + Number(totalPrice);
            } else {
              salePrice = Number(totalPrice);
            }
            let columnValueDrawer = [salePrice];
            updateColunm(
              PaymentMethodTable,
              columnNameDrawer,
              'PaymentType',
              element.value,
              columnValueDrawer,
            );
          });
        }
      } else {
        if (paymentsValue == element.value) {
          let salePrice = Number(drawerSetupArr.CashSales) + Number(ADamount);
          let columnNameDrawer = ['Sales'];
          // console.log('estimatedAmountinDrawer..advancePaidInCash', ADamount);
          getData(PaymentMethodTable, cb => {
            // console.log("LoyaltyListTable..", cb)
            let amount = cb.find(x => x.PaymentType == paymentsValue);
            let creditSales;
            if (amount) {
              creditSales =
                Number(amount.Sales) + Number(totalPrice - ADamount);
            } else {
              creditSales = Number(totalPrice - ADamount);
            }
            let columnValueDrawer = [creditSales];
            updateColunm(
              PaymentMethodTable,
              columnNameDrawer,
              'PaymentType',
              element.value,
              columnValueDrawer,
            );
          });

          updateColunm(
            PaymentMethodTable,
            columnNameDrawer,
            'PaymentType',
            '1',
            [salePrice],
          );
        }
      }
    });

    if (paymentsValue === '1') {
      let estimatedAmountinDrawer =
        Number(drawerSetupArr.estimatedAmountinDrawer) + Number(totalPrice);

      let salePrice = Number(drawerSetupArr.CashSales) + Number(totalPrice);
      let columnNameDrawer = ['CashSales', 'estimatedAmountinDrawer'];

      let columnValueDrawer = [salePrice, estimatedAmountinDrawer];
      updateColunm(
        DrawerSetupTable,
        columnNameDrawer,
        'id',
        'D12345678',
        columnValueDrawer,
      );
    } else {
      let estimatedAmountinDrawer =
        Number(drawerSetupArr.estimatedAmountinDrawer) + Number(ADamount);
      let salePrice = Number(drawerSetupArr.CashSales) + Number(ADamount);

      console.log('estimatedAmountinDrawer..advancePaidInCash', ADamount);
      let creditSales =
        Number(drawerSetupArr.creditSales) + Number(totalPrice - ADamount);
      let columnNameDrawer = [
        'CashSales',
        'creditSales',
        'estimatedAmountinDrawer',
      ];
      let columnValueDrawer = [salePrice, creditSales, estimatedAmountinDrawer];
      updateColunm(
        DrawerSetupTable,
        columnNameDrawer,
        'id',
        'D12345678',
        columnValueDrawer,
      );
    }
  };

  const updateReturnTerminalConfiguration = () => {
    console.log('updateReturnTerminalConfiguration');
    let columnName = ['LastReturnBillNumber'];
    let columnValue = [Number(TerminalConfiguration.LastReturnBillNumber) + 1];
    updateColunm(
      TerminalConfigurationTable,
      columnName,
      'UserCode',
      TerminalConfiguration.UserCode,
      columnValue,
    );

    let estimatedAmountinDrawer =
      Number(drawerSetupArr.estimatedAmountinDrawer) - Number(totalPrice);
    //if (estimatedAmountinDrawer > 0) {
    let salePrice = Number(drawerSetupArr.CashRefund) + Number(totalPrice);
    let columnNameDrawer = ['CashRefund', 'estimatedAmountinDrawer'];
    let columnValueDrawer = [salePrice, estimatedAmountinDrawer];
    updateColunm(
      DrawerSetupTable,
      columnNameDrawer,
      'id',
      'D12345678',
      columnValueDrawer,
    );
  };

  const getAllCategories = async type => {
    getData(CategoriesListTable, async categories => {
      setAllCategories(categories);
      if (categories.length > 0) {
        getSelectedCategoryProducts(categories[0]);
      } else {
        setNoFamilyFound(true);
        await getData(UpdateProductDetailListTable, async productsDetail => {
          // console.log('UpdateProductDetailListTable', productsDetail);
          let proDetails = [...productsDetail];
          if (type !== 'isRestState') {
            onSelectProduct(null, proDetails);
          } else {
            setCategoryProducts(proDetails);
          }
          setLoading(false);
        });
      }
    });
    // getData(UpdateProductDetailListTable, async products => {
    //   console.log("UpdateProductDetailListTable", products)
    //   // setAllCategories(categories);
    //   // getSelectedCategoryProducts(categories[0]);
    // });
  };

  const getAddOnProducts = async (item, index) => {
    let selectedProduct = [...selectedProducts];
    setLoading(true);

    await getDataJoinById(
      ProductCardAddOnGroupListTable,
      UpdateProductDetailListTable,
      'AddOnGroupCode',
      item.AddOnGroupCode,
      async addonProducts => {
        console.log('Product Card Add On Group List Table...', addonProducts);
        let products = [];

        for (let i = 0; i < addonProducts.length; i++) {
          let isFind = selectedProduct.find(
            x =>
              (x.ProductBarCode === addonProducts[i].ProductBarCode ||
                x.EquiProductCode === addonProducts[i].ProductCode) &&
              x.AddOnParentSalesInvoiceDetailsID === item.SalesBillDetailsID,
          );
          await getDataJoinById(
            ProductCardAddOnEquivalentProductsListTable,
            UpdateProductDetailListTable,
            'EquiProductCode',
            addonProducts[i].ProductCode,
            EquivalentProduct => {
              console.log('addon equivaletnt Products', EquivalentProduct);
              let EqP = [];
              for (let j = 0; j < EquivalentProduct.length; j++) {
                let pro = {
                  SalesBillDetailsID: uuid.v4,
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
                  Tax1Code: '',
                  Tax1Name: '',
                  Tax1Rate: 0,
                  Tax1Amount: 0,
                  Tax2Code: '',
                  Tax2Name: '',
                  Tax2Rate: 0,
                  Tax2Amount: 0,
                  GrandAmount: addonProducts[i].Price,
                  GroupDataID: '',
                  ProductBarCode: EquivalentProduct[j].ProductBarCode,
                  ReturnSalesBillDetailID: '',
                  DeliveryStatus: '',
                  DeliveryDate: '',
                  DeliveryTime: '',
                  DeliveryNote: '',
                  DeliveredDate: '',
                  DeliveredTime: '',
                  Remarks: '',
                  SalesAgentCode: null,
                  IsParentAddOn: false,
                  AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                  ParentInvoiceDetailsID: item.SalesBillDetailsID,
                  OrignalQuantity: addonProducts[i].Quantity,
                  AddonProductDetailcode: addonProducts[i].AddOnGroupDetailCode,
                  Ingredients: 0,
                  EarnedPoints: 0,
                  RedeemPoints: 0,
                  Status: 0,
                  ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                  MediaContentType: addonProducts[i].MediaContentType,
                  MediaContents: addonProducts[i].MediaContents,
                  HoldFromSale: EquivalentProduct[j].HoldFromSale,
                  parentIndex: index + 1,
                  parentQuantity: item.Quantity,
                  AddOnParentSalesInvoiceDetailsID: item.SalesBillDetailsID,
                  EquiProductCode: EquivalentProduct[j].EquiProductCode,
                };
                EqP.push(pro);
              }

              if (!isFind) {
                let pro = {
                  SalesBillDetailsID: uuid.v4,
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
                  Tax1Code: '',
                  Tax1Name: '',
                  Tax1Rate: 0,
                  Tax1Amount: 0,
                  Tax2Code: '',
                  Tax2Name: '',
                  Tax2Rate: 0,
                  Tax2Amount: 0,
                  GrandAmount: addonProducts[i].Price,
                  GroupDataID: '',
                  ProductBarCode: addonProducts[i].ProductBarCode,
                  ReturnSalesBillDetailID: '',
                  DeliveryStatus: '',
                  DeliveryDate: '',
                  DeliveryTime: '',
                  DeliveryNote: '',
                  DeliveredDate: '',
                  DeliveredTime: '',
                  Remarks: '',
                  SalesAgentCode: null,
                  IsParentAddOn: false,
                  AddOnGroupCode: addonProducts[i].AddOnGroupCode,
                  ParentInvoiceDetailsID: item.SalesBillDetailsID,
                  OrignalQuantity: addonProducts[i].Quantity,
                  AddonProductDetailcode: addonProducts[i].AddOnGroupDetailCode,
                  Ingredients: 0,
                  EarnedPoints: 0,
                  RedeemPoints: 0,
                  Status: 0,
                  ProductCategoryCode: addonProducts[i].ProductCategoryCode,
                  MediaContentType: addonProducts[i].MediaContentType,
                  MediaContents: addonProducts[i].MediaContents,
                  HoldFromSale: addonProducts[i].HoldFromSale,
                  parentIndex: index + 1,
                  parentQuantity: item.Quantity,
                  AddOnParentSalesInvoiceDetailsID: item.SalesBillDetailsID,
                  EquivalentProducts: EqP,
                };
                products.push(pro);
              }
            },
          );
        }
        // console.log('update addon products......', products);
        setisAddon(true), setReturnProducts(products);
        setLoading(false);
      },
    );
  };

  const getProductsIngredients = async item => {
    setLoading(true);
    let selectedProduct = [...selectedProducts];
    await getDataById(
      ProductCardIngredientsListTable,
      'ProductBarCode',
      item.ProductBarCode,
      ingredients => {
        console.log('ingredients.....', ingredients, item);
        for (let i = 0; i < ingredients.length; i++) {
          let isFind = item?.IngredientsArray.find(
            x => x.Id === ingredients[i].Id,
          );
          if (isFind) {
            ingredients[i].isSelected = true;
          } else {
            ingredients[i].isSelected = false;
          }
        }

        setIsIngredient(true);
        setIngredientsData(ingredients);
        setIngredientProductCode(item.ProductBarCode);
        setLoading(false);
      },
    );
  };

  const searchIngredientFun = text => {
    setLoading(true);

    let filteredName = [];

    if (text || text !== '') {
      ingredientsData.filter(item => {
        if (
          item?.IngredientName?.toLowerCase().match(text?.toLowerCase()) ||
          item?.IngredientName1?.toLowerCase().match(text?.toLowerCase())
        ) {
          filteredName.push(item);
        }
      });
      // console.log('text...', text, filteredName, searchIngredient);
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
    // console.log("onSelectIngredintes", item, index)
    selectpro.forEach(pro => {
      if (pro.ProductBarCode === item.ProductBarCode) {
        console.log('select item run', item);
        if (ingredient[index].isSelected) {
          pro.IngredientsArray.push(item);
          pro.Ingredients =
            String(pro.Ingredients) + String(item.CategoryIngredientCode) + ',';
          pro.IngredientNames =
            String(pro.IngredientNames) + String(item.IngredientName) + ',';
        } else {
          const index = pro.IngredientsArray.findIndex(
            res => res.Id === item.Id,
          );
          console.log('onSelectIngredintes ', index, pro.IngredientsArray);
          if (index > -1) {
            pro.IngredientsArray.splice(index, 1);
            pro.Ingredients = String(pro.Ingredients).replace(
              `${item.CategoryIngredientCode},`,
              '',
            );
            pro.IngredientNames = String(pro.IngredientNames).replace(
              `${item.IngredientName},`,
              '',
            );
            console.log(
              'pro.Ingredients.replace',
              pro.Ingredients,
              `${item.CategoryIngredientCode},`,
            );
          }
        }
      }
    });

    setSelectedProducts(selectpro);
    setIngredientsData(ingredient);
  };

  const addIngredientFun = async () => {
    let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
    let ingredientName = ingredientText,
      cultureCode = I18nManager.isRTL ? 'ar-SA' : 'en-US',
      productBarCode = ingredientProductCode;

    const response1 = await props.dispatch(
      ServerCall(
        UserLogin,
        `Products/CreateProductIngredient?ingredientName=${ingredientName}&cultureCode=${cultureCode}&productBarCode=${productBarCode}`,
        'GET',
      ),
    );

    console.log('add new integredient', response1);
    let ing = [];
    ing.push(response1);
    InsertProductCardIngredientsList(ing);
  };

  const onPressAddIntgredient = () => {
    setMessage(props.StringsList._407);
    setAlertType('ingredient');
    setDisplayAlert(true);
    setisPromptAlert(true);
  };

  const getDetailofProduct = async items => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let filterCategoryProducts = [];

    for (let i = 0; i < items.length; i++) {
      var product = items[i];

      await getDataById(
        UpdateProductDetailListTable,
        'ProductBarCode',
        product?.ProductCode,
        async productDeltail => {
          if (productDeltail.length > 0) {
            filterCategoryProducts.push(productDeltail[0]);
          }
        },
      );
    }
    // console.log('Filter Category Products', filterCategoryProducts);
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
      'ProductFamilyCode',
      itemId,
      products => {
        catProducts = products;
      },
    );
    // console.log('catProducts', catProducts);

    filterCategoryProducts = await getDetailofProduct(catProducts);
    setLoading(false);
    setCategoryProducts(filterCategoryProducts);
    if (item) {
      //alert("df")
      onSelectProduct(null, filterCategoryProducts);
    }
    setLoading(false);
  };

  const toggleFun = () => {
    setToggle(!isToggle);
    // getSelectedCategoryProducts(allCategoreis[0])
  };

  const onPressBackCat = () => {
    console.log('onPressBackCat....');
    if (noFamilyFound) {
      getAllCategories();
      setToggle(false);
    } else {
      getSelectedCategoryProducts(selectedcat, selectedCatIndex);
      setToggle(false);
    }
  };

  // const numberToEngArbWords = (val, isEnglish) => {
  //   let value = Number(val);
  //   let words = '';
  //   if (isEnglish) {
  //     words = numberToWord.toWords(value);
  //   } else {
  //     words = new numberToArb(value, 'SAR').parse();
  //   }
  //   return words;
  // };

  const numberToEngArbWords = (val, isEnglish) => {
    let value = Number(val);
    let words = '';
    if (isEnglish) {
      let fractword = String(val).split('.');
      console.log('word of english ', fractword);
      let firstWords = Number(fractword[0]);
      words = numberToWord.toWords(firstWords);
      if (Number(fractword[1] > 0)) {
        let num = Number(fractword[1]);
        let secondWords = numberToWord.toWords(num);
        words = words + ' and ' + secondWords;
      }
      words = words + ' halala only.';
    } else {
      words = new numberToArb(value, 'SAR').parse();
    }
    return words;
  };

  const onInvoiceClick = () => {
    let srNo = 1;
    let array = [...selectedProducts];
    array.forEach(e => {
      if (e.IsParentAddOn) {
        e.srNo = srNo++;
      } else {
        e.srNo = 0;
      }
    });
    setSelectedProducts(array);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    if (returnInvoiceNumber) {
      setisReturnInvoice(true);
    }
    setToggle(!isToggle);
  };

  const onManuallyAddCount = async item => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let addonFinalQuantity, newQuantity;
    if (selectedProduct.length > 0 && manuallyCount >= 1) {
      for (let i = 0; i < selectedProduct.length; i++) {
        let product = selectedProduct[i];
        newQuantity = manuallyCount;
        if (product.ProductType === 3) {
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
              newQuantity > product.Quantity ? 'increment' : 'decrement';
            if (product.IsParentAddOn) {
              changeProductGroupItem(
                product,
                type,
                newQuantity,
                product.DiscountRate,
                Number(product.DiscountAmount),
              );
            } else {
              changeProductGroupAddon(
                product,
                type,
                addonFinalQuantity,
                product.DiscountRate,
                Number(product.DiscountAmount),
              );
            }
          }
        } else {
          newQuantity = manuallyCount;

          // for (let i = 0; i < selectedProduct.length; i++) {
          //   let product = selectedProduct[i];
          if (
            product.SalesBillDetailsID === item?.SalesBillDetailsID ||
            product?.ParentInvoiceDetailsID === item.SalesBillDetailsID
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
              product.DiscountRate,
            );
            console.log('ManuallyAddCount Tax Calculation', taxAmt);
            let proQ,
              discount = 0;
            product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
            (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
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
            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
              (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
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
                        100,
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
                        taxAmt.Tax1Amount,
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

  const onChangePrice = async (item, newprice) => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let sPrice = subPrice,
      tPrice = totalPrice,
      pd;

    if (selectedProduct.length > 0) {
      let newQuantity = item.Quantity;
      for (let i = 0; i < selectedProduct.length; i++) {
        let product = selectedProduct[i];
        if (
          product.SalesBillDetailsID === item?.SalesBillDetailsID &&
          newprice !== item.PriceWithOutTax
        ) {
          let Amount =
            newprice === item.PriceWithOutTax
              ? Number(item.PriceOriginal * item.Quantity)
              : Number(newprice * item.Quantity);

          pd = product.DiscountAmount ? product.DiscountAmount : 0;

          if (pd >= Amount) {
            pd = 0;
          }
          product.DiscountAmount = pd;
          console.log('change price type', Amount, newprice);
          let taxAmt = await calculateTaxeGroups(
            newQuantity,
            Amount,
            product.DiscountAmount,
            product.TaxGroupID,
            1,
            null,
            0,
            TerminalConfiguration,
            newprice,
            product.DiscountRate,
          );
          console.log('calculateTaxeGroups onChangePrice', taxAmt);
          let proQ,
            discount = 0;
          product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
          (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
            (product.Tax1Rate = taxAmt.Tax1Percentage
              ? taxAmt.Tax1Percentage
              : 0),
            (product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (product.Tax1Fragment = taxAmt.Tax1Fragment
              ? taxAmt.Tax1Fragment
              : ''),
            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
            (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
            (product.Tax2Rate = taxAmt?.Tax2Percentage
              ? taxAmt?.Tax2Percentage
              : 0),
            (product.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
          (product.Tax2Fragment = taxAmt.Tax2Fragment
            ? taxAmt.Tax2Fragment
            : ''),
            (product.PriceWithOutTax = taxAmt.Price);
          product.PriceOriginal = newprice;
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
              ? (product.PriceOriginal * newQuantity * product.DiscountRate) /
                100
              : product.DiscountAmount;
            if (product.DiscountRate > 0) {
              discount = taxAmt.DiscountAmount
                ? taxAmt.DiscountAmount
                : parseFloat(
                    (product.DiscountRate *
                      (product.PriceOriginal * newQuantity +
                        taxAmt.Tax1Amount)) /
                      100,
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
                      taxAmt.Tax1Amount,
                  );
            }
            product.GrandAmount = Number(GAmount);

            //;
            discount = Number(discount);
            product.DiscountAmount = discount.toFixed(
              TerminalConfiguration.DecimalsInAmount,
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
        } else {
          setmanuallyCount(1);
          setSelectedProducts(selectedProduct);
          setsubPrice(sPrice);
          setTotalPrice(tPrice);
          setLoading(false);
        }
      }
    }
  };

  const onManuallyChangePrice = async item => {
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let selectedProduct = [...selectedProducts];
    let includedTax = 0,
      manualCount = 0;
    pGL = item.groupTaxCodes;
    manualCount = manuallyCount.toFixed(TerminalConfiguration.DecimalsInAmount);
    setmanuallyCount(manualCount);
    if (selectedProduct.length > 0) {
      if (item.ProductType === 3) {
        let newQuantity = item.Quantity;

        for (let i = 0; i < selectedProduct.length; i++) {
          let product = selectedProduct[i];
          if (
            product.SalesBillDetailsID === item?.SalesBillDetailsID &&
            manuallyCount !== item.PriceWithOutTax
          ) {
            let Amount =
              manuallyCount === item.PriceWithOutTax
                ? Number(item.PriceOriginal * item.Quantity)
                : Number(manuallyCount * item.Quantity);
            Amount = Number(
              Amount.toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            if (product.DiscountAmount >= Amount) {
              product.DiscountAmount = 0;
            } else {
              product.DiscountAmount = product.DiscountAmount;
            }
            console.log(
              'Amount change for product type 3',
              Amount,
              manuallyCount,
              product.DiscountAmount,
            );

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
                        TerminalConfiguration.DecimalsInAmount,
                      );
                      item.PriceOriginal = Number(item.PriceOriginal);
                      executeCal = false;
                      item.PriceWithOutTax = AmountWithOutTax;
                      handleDiscount(item, 'DiscountRate');
                    }
                  });
                } else {
                  percentageDiscountAmount = item.DiscountAmount;
                  item.PriceOriginal = manuallyCount.toFixed(
                    TerminalConfiguration.DecimalsInAmount,
                  );
                  item.PriceOriginal = Number(item.PriceOriginal);
                  executeCal = false;
                  handleDiscount(item, undefined);
                }
              }

              if (executeCal)
                await product.groupTaxCodes.forEach(async (element, index) => {
                  let amountBeforeDiscount = Amount;
                  let taxGroupID = '';
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
                    item.DiscountRate,
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

                  product.Tax1Fragment = product.Tax1Fragment;
                  product.Tax2Fragment = product.Tax2Fragment;

                  console.log(
                    'calculateTaxeGroups for Product type 3...',
                    taxAmt,
                  );
                  let proQ,
                    discount = 0;
                  product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
                  (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
                    (product.Tax1Rate = taxAmt.Tax1Percentage
                      ? taxAmt.Tax1Percentage
                      : 0),
                    (product.Tax1Amount = totaltax1),
                    (product.Tax2Code = taxAmt?.Tax2Code
                      ? taxAmt.Tax2Code
                      : ''),
                    (product.Tax2Name = taxAmt?.Tax2Name
                      ? taxAmt?.Tax2Name
                      : ''),
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
                    TerminalConfiguration.DecimalsInAmount,
                  );
                  product.PriceWithOutTax = Number(product.PriceWithOutTax);
                  product.PriceUnitlesstax = product.PriceWithOutTax;
                  item.PriceOriginal = manuallyCount.toFixed(
                    TerminalConfiguration.DecimalsInAmount,
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
                              100,
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
                      TerminalConfiguration.DecimalsInAmount,
                    );

                    product.tax = totaltax1 + totaltax2;
                    if (index === pGL.length - 1) {
                      let p = [...selectedProduct];
                      finalCalculation(p);
                      setmanuallyCount(1);

                      setSelectedProducts(selectedProduct);
                      manualCount = 0;
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
                product.DiscountRate,
              );
              console.log('calculateTaxeGroups for Product type 3...', taxAmt);
              let proQ,
                discount = 0;
              product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
              (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
                (product.Tax1Rate = taxAmt.Tax1Percentage
                  ? taxAmt.Tax1Percentage
                  : 0),
                (product.Tax1Amount = taxAmt.Tax1Amount
                  ? taxAmt.Tax1Amount
                  : 0),
                (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
                (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
                (product.Tax2Rate = taxAmt?.Tax2Percentage
                  ? taxAmt?.Tax2Percentage
                  : 0),
                (product.Tax2Amount = taxAmt?.Tax2Amount
                  ? taxAmt?.Tax2Amount
                  : 0);
              item.PriceWithOutTax = taxAmt?.Price.toFixed(
                TerminalConfiguration.DecimalsInAmount,
              );
              item.PriceWithOutTax = Number(item.PriceWithOutTax);
              // product.PriceWithOutTax = taxAmt.Price;
              item.PriceOriginal = manuallyCount.toFixed(
                TerminalConfiguration.DecimalsInAmount,
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
                          100,
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
                          taxAmt.Tax1Amount,
                      );
                }
                product.GrandAmount = Number(GAmount);

                //;
                discount = Number(discount);
                product.DiscountAmount = discount.toFixed(
                  TerminalConfiguration.DecimalsInAmount,
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

        for (let i = 0; i < selectedProduct.length; i++) {
          let product = selectedProduct[i];
          if (
            product.SalesBillDetailsID === item?.SalesBillDetailsID &&
            manuallyCount !== item.PriceWithOutTax
          ) {
            let Amount =
              manuallyCount === item.PriceWithOutTax
                ? Number(item.PriceOriginal * item.Quantity)
                : Number(manuallyCount * item.Quantity);

            Amount = Number(
              Amount.toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            console.log(
              'Amount change for product type 3',
              Amount,
              manuallyCount,
            );
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
              manuallyCount,
              product.DiscountRate,
            );
            console.log('calculateTaxeGroups...', taxAmt);
            let proQ,
              discount = 0;
            product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
            (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
              (product.Tax1Rate = taxAmt.Tax1Percentage
                ? taxAmt.Tax1Percentage
                : 0);
            if (product.Tax1Fragment == 2) {
              taxAmt.Tax1Amount = taxAmt.Tax1Amount * newQuantity;
            } else {
              product.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
            }

            (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
              (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
              (product.Tax2Rate = taxAmt?.Tax2Percentage
                ? taxAmt?.Tax2Percentage
                : 0),
              (product.Tax2Amount = taxAmt?.Tax2Amount
                ? taxAmt?.Tax2Amount
                : 0);
            product.Tax1Fragment = product.Tax1Fragment;
            product.Tax2Fragment = product.Tax2Fragment;
            item.PriceWithOutTax = taxAmt?.Price.toFixed(
              TerminalConfiguration.DecimalsInAmount,
            );
            item.PriceWithOutTax = Number(item.PriceWithOutTax);
            // product.PriceWithOutTax = taxAmt.Price;
            item.PriceOriginal = manuallyCount.toFixed(
              TerminalConfiguration.DecimalsInAmount,
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
                  (manuallyCount * product.Quantity * product.DiscountRate) /
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
                        taxAmt.Tax1Amount,
                    );
              }
              product.GrandAmount = Number(GAmount);

              discount = Number(discount);
              product.DiscountAmount = discount.toFixed(
                TerminalConfiguration.DecimalsInAmount,
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
            manualCount = 0;
            setSelectedProducts(selectedProduct);
          } else {
          }
        }
      }
    }
  };

  const handleDiscount = async (item, type) => {
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
    if (type === 'DiscountRate') {
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
    item.productGroupTaxInfoObj.forEach(element => {
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
      if (selectedProduct.length > 0 && manuallyCount !== 0) {
        tax1AmountTotal = totalTax;
        item.GrandAmount = totalPrice;
        selectedProduct.forEach(async product => {
          if (product.SalesBillDetailsID === item?.SalesBillDetailsID) {
            if (type === 'DiscountRate') {
              product.DiscountRate = product.DiscountRate;
              product.DiscountAmount =
                product.DiscountRate === 0
                  ? 0
                  : percentageDiscountAmount
                  ? percentageDiscountAmount.toFixed(2)
                  : pDiscount.toFixed(2);

              product.webperamount =
                (totalPrice - totalTax + Number(product.DiscountAmount)) /
                item.Quantity;
              product.PriceWithOutTax = product.webperamount;
              product.tax = tax;
              product.Tax1Amount = tax;
            } else {
              product.DiscountAmount = Number(product.DiscountAmount);
              product.tax = tax;
              product.Tax1Amount = tax;
              product.DiscountAmountP = 0;
              item.webperamount =
                (totalPrice - totalTax + Number(product.DiscountAmount)) /
                item.Quantity;
              item.PriceWithOutTax = item.webperamount;
            }
          }
        });
      } else {
        tax1AmountTotal = totalTax;
        item.GrandAmount = totalPrice;

        item.DiscountRate = 0;

        item.DiscountAmount = 0;
        item.tax = totalTax;
        item.DiscountAmountP = 0;
      }
      let p = [...selectedProduct];
      finalCalculation(p);
      setSelectedProducts(selectedProduct);
    } else {
      setMessage(props.StringsList._267);
      setDisplayAlert(true);
      setLoading(false);
    }
  };

  const onManuallyAddDiscount = async (item, type) => {
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

    if (type === 'DiscountRate') {
      dA = manuallyCount === 0 ? manuallyCount : item.DiscountAmount;
      dP = manuallyCount;
      percentageDiscountAmount =
        (item.webperamount * item.Quantity * manuallyCount) / 100;
    } else {
      dA = manuallyCount > amount ? 0 : manuallyCount;
      dP = 0;
      percentageDiscountAmount = manuallyCount;
    }
    if (item.ProductType === 3) {
      let totalTax = 0,
        totalPrice = 0;
      item.productGroupTaxInfoObj.forEach(element => {
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
        Tax2Fragment: item.Tax2Fragment ? item.Tax2Fragment : '',
        Tax2Name: item.Tax2Name ? item.Tax2Name : '',
        Tax2Code: item.Tax2Code ? item.Tax2Code : '',
        IsTax1InclusiveInPrice: item.IsTax1InclusiveInPrice
          ? item.IsTax1InclusiveInPrice
          : 0,
        Tax1Value: item.Tax1Amount == 0 ? item.Tax1Amount : totalTax,
        Tax1Fragment: item.Tax1Fragment ? item.Tax1Fragment : '',
        Tax1Name: item.Tax1Name ? item.Tax1Name : '',
        Tax1Code: item.Tax1Code ? item.Tax1Code : '',
      };
      let tax = totalTax;
      console.log(
        'calculateTaxeGroups...onManuallyAddDiscount',
        taxAmt,
        manuallyCount,
        userDiscountLimit,
        item.DiscountAmount,
        type,
      );
      if (tax >= 0) {
        if (type === 'DiscountRate') {
          pDiscount =
            manuallyCount === 0
              ? 0
              : taxAmt?.DiscountAmount
              ? taxAmt.DiscountAmount
              : parseFloat(
                  (manuallyCount *
                    (item.PriceWithOutTax * item.Quantity + tax)) /
                    100,
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
          (dP <= userDiscountLimit && type === 'DiscountRate' && dP < 100) ||
          (amtDisP <= userDiscountLimit &&
            type !== 'DiscountRate' &&
            manuallyCount < amount)
        ) {
          if (manuallyCount === 0 && type === 'DiscountRate') {
            let disLimt =
              userDiscountLimit - Number(manuallyCount) + item.DiscountRate;
            // setUserDiscountLimit(disLimt);
          } else {
            let p = 0;
            if (item.DiscountAmount > 0) {
              console.log('');
              p =
                (item.DiscountAmount /
                  (item.GrandAmount + item.DiscountAmount)) *
                100;
            }

            let disLimt = userDiscountLimit - amtDisP + p;
          }
          if (selectedProduct.length > 0 && manuallyCount !== 0) {
            selectedProduct.forEach(async product => {
              if (product.SalesBillDetailsID === item?.SalesBillDetailsID) {
                if (type === 'DiscountRate') {
                  let disLimt =
                    userDiscountLimit - manuallyCount + item.DiscountRate;
                  // setUserDiscountLimit(disLimt);

                  product.DiscountRate =
                    manuallyCount === 0 ? 0 : manuallyCount;

                  product.DiscountAmount =
                    manuallyCount === 0
                      ? 0
                      : percentageDiscountAmount
                      ? percentageDiscountAmount.toFixed(2)
                      : pDiscount.toFixed(2);
                  let tax1AmountTotal = totalTax;
                  item.GrandAmount = totalPrice;
                  product.tax = tax;
                  product.Tax1Amount = tax;
                } else {
                  let tax1AmountTotal = totalTax;
                  item.GrandAmount = totalPrice;
                  product.DiscountAmount = Number(manuallyCount);

                  product.tax = tax;
                  product.Tax1Amount = tax;

                  product.DiscountAmountP = 0;
                }
              }
            });
          } else {
            let tax1AmountTotal = totalTax;
            item.GrandAmount = totalPrice;

            item.DiscountRate = 0;

            item.DiscountAmount = 0;
            item.tax = totalTax;
            item.DiscountAmountP = 0;
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
        dP,
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
        if (type === 'DiscountRate') {
          pDiscount =
            manuallyCount === 0
              ? 0
              : taxAmt?.DiscountAmount
              ? taxAmt.DiscountAmount
              : parseFloat(
                  (manuallyCount *
                    (item.PriceWithOutTax * item.Quantity + tax)) /
                    100,
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
          (dP <= userDiscountLimit && type === 'DiscountRate' && dP < 100) ||
          (amtDisP <= userDiscountLimit &&
            type !== 'DiscountRate' &&
            manuallyCount < amount)
        ) {
          if (manuallyCount === 0 && type === 'DiscountRate') {
            let disLimt =
              userDiscountLimit - Number(manuallyCount) + item.DiscountRate;
            // setUserDiscountLimit(disLimt);
          } else {
            let p = 0;
            if (item.DiscountAmount > 0) {
              p =
                (item.DiscountAmount /
                  (item.GrandAmount + item.DiscountAmount)) *
                100;
            }

            let disLimt = userDiscountLimit - amtDisP + p;
            console.log(
              'manuallyCount....disLimt',
              disLimt,
              amtDisP,
              p,
              userDiscountLimit,
            );
            // setUserDiscountLimit(disLimt);
          }
          if (selectedProduct.length > 0 && manuallyCount !== 0) {
            selectedProduct.forEach(async product => {
              if (product.SalesBillDetailsID === item?.SalesBillDetailsID) {
                if (type === 'DiscountRate') {
                  let disLimt =
                    userDiscountLimit - manuallyCount + item.DiscountRate;
                  // setUserDiscountLimit(disLimt);
                  if (
                    taxAmt.calculationId === 9 ||
                    taxAmt.calculationId === 1
                  ) {
                    product.GrandAmount = Number(
                      taxAmt.amount + taxAmt.Tax1Amount,
                    );
                  } else {
                    product.GrandAmount = Number(
                      product.IsTax1IncludedInPrice == 0
                        ? item.PriceOriginal * item.Quantity - pDiscount + tax
                        : item.PriceOriginal * item.Quantity - pDiscount,
                    );
                  }
                  product.DiscountRate =
                    manuallyCount === 0 ? 0 : manuallyCount;
                  // console.log("DiscountAmount........", taxAmt.DiscountAmount, pDiscount)
                  product.DiscountAmount =
                    manuallyCount === 0
                      ? 0
                      : taxAmt.DiscountAmount
                      ? taxAmt.DiscountAmount.toFixed(2)
                      : pDiscount.toFixed(
                          TerminalConfiguration.DecimalsInAmount,
                        );

                  product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
                  (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
                    (product.Tax1Rate = taxAmt.Tax1Percentage
                      ? taxAmt.Tax1Percentage
                      : 0),
                    (product.Tax1Amount = taxAmt.Tax1Amount
                      ? taxAmt.Tax1Amount
                      : 0),
                    (product.Tax2Code = taxAmt?.Tax2Code
                      ? taxAmt.Tax2Code
                      : ''),
                    (product.Tax2Name = taxAmt?.Tax2Name
                      ? taxAmt?.Tax2Name
                      : ''),
                    (product.Tax2Rate = taxAmt?.Tax2Percentage
                      ? taxAmt?.Tax2Percentage
                      : 0),
                    (product.Tax2Amount = taxAmt?.Tax2Amount
                      ? taxAmt?.Tax2Amount
                      : 0);
                  product.tax = product.Tax1Amount + product.Tax2Amount;
                } else {
                  product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
                  (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
                    (product.Tax1Rate = taxAmt.Tax1Percentage
                      ? taxAmt.Tax1Percentage
                      : 0),
                    (product.Tax1Amount = taxAmt.Tax1Amount
                      ? taxAmt.Tax1Amount
                      : 0),
                    (product.Tax2Code = taxAmt?.Tax2Code
                      ? taxAmt.Tax2Code
                      : ''),
                    (product.Tax2Name = taxAmt?.Tax2Name
                      ? taxAmt?.Tax2Name
                      : ''),
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
            item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
            (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
              (item.Tax1Rate = taxAmt.Tax1Percentage
                ? taxAmt.Tax1Percentage
                : 0),
              (item.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
              (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
              (item.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
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

  // const SetItemTaxAmountForSalesGroup = async psalesInvoiceDetail => {
  //   let itemCode = psalesInvoiceDetail.ProductCode;
  //   let amountBeforeDiscount = (psalesInvoiceDetail.PriceOriginal * psalesInvoiceDetail.Quantity);
  //   let quantity = psalesInvoiceDetail.Quantity;
  //   let discountAmount = manuallyCount;
  //   psalesInvoiceDetail.Tax1Code = "";
  //   psalesInvoiceDetail.Tax1Name = "";
  //   psalesInvoiceDetail.Tax2Code = "";
  //   psalesInvoiceDetail.Tax2Name = "";
  //   let salesGroupCode = itemCode;
  //   let isTaxExempted = false;
  //   let additionalChargesAmount = 0;
  //   let currencyRate = 1;
  //   let txAmts = psalesInvoiceDetail.groupTaxCodes

  //   // TaxValues txAmts = new TaxValues();

  //   if (quantity == 0)
  //     quantity = 1;

  //   // txAmts.Quantity = quantity;
  //   txAmts.Price = 0;

  //   let taxAmountIncludedInPrice = 0;
  //   let itemDetails = psalesInvoiceDetail
  //   let tax1AmountTotal = 0, tax1ActualAmountTotal = 0, tax2AmountTotal = 0, tax2ActualAmountTotal = 0, tax3AmountTotal = 0, tax3ActualAmountTotal = 0, tax4AmountTotal = 0, tax4ActualAmountTotal = 0;

  //   // ProductCardSummary itemDetails = manager.ProductCardDetailManager.ProductCardDetail_SelectByProductCode(salesGroupCode, 3); // salesGroupCode is equavilent to ItemCode

  //   // DataTable dt = manager.SalesGroupDetailManager.SalesGroupDetail_SelectBySalesGroupCodeDt(salesGroupCode);

  //   // if (dt != null && dt.Rows.Count > 0)
  //   // {
  //   // foreach (DataRow salesGroupDetailRow in dt.Rows)
  //   psalesInvoiceDetail.groupTaxCodes.forEach(async element => {

  //     // {
  //     let taxGroupID = '';
  //     let itemQty = 0, itemAmount = 0, itemProposedSalesAmount = 0, itemDiscountAmount = 0, netQty = 0;

  //     taxGroupID = element.SaleTaxFamilyCode;
  //     itemQty = element.Quantity;
  //     itemAmount = element.Price;

  //     netQty = quantity * itemQty;
  //     if (TerminalConfiguration.IsTaxOnSalesProduct) {
  //       if (taxGroupID !== "") {
  //         if (isTaxExempted)
  //           taxGroupID = "0";

  //         // TaxValues taxValues = new TaxValues();
  //         if (itemDetails.GrandAmount > 0) {
  //           itemProposedSalesAmount = (itemAmount * amountBeforeDiscount) / itemDetails.GrandAmount;
  //         }
  //         if (amountBeforeDiscount > 0)
  //           itemDiscountAmount = ((itemProposedSalesAmount) * discountAmount) / (amountBeforeDiscount);

  //         // additionalChargesAmount is required for Global Tax calculation only.

  //         taxValues = await calculateTaxeGroups(netQty, itemProposedSalesAmount, itemDiscountAmount, taxGroupID, currencyRate, null, additionalChargesAmount, TerminalConfiguration, psalesInvoiceDetail.PriceOriginal, 0);

  //         psalesInvoiceDetail.IsTax1IncludedInPrice = taxValues.IsTax1IncludedInPrice;
  //         psalesInvoiceDetail.IsTax2IncludedInPrice = taxValues.IsTax2IncludedInPrice;
  //         psalesInvoiceDetail.Tax1Code = taxValues.Tax1Code;
  //         psalesInvoiceDetail.Tax1Name = taxValues.Tax1Name;
  //         psalesInvoiceDetail.Tax2Code = taxValues.Tax2Code;
  //         psalesInvoiceDetail.Tax2Name = taxValues.Tax2Name;

  //         psalesInvoiceDetail.Price = psalesInvoiceDetail.Price;

  //         if (!taxValues.IsTax1IncludedInPrice)
  //           tax1ActualAmountTotal += taxValues.Tax1Amount ? taxValues.Tax1Amount : 0;
  //         else
  //           taxAmountIncludedInPrice += taxValues.Tax1Amount ? taxValues.Tax1Amount : 0;
  //         if (!taxValues.IsTax2IncludedInPrice)
  //           tax2ActualAmountTotal += taxValues.Tax2Amount ? taxValues.Tax2Amount : 0;
  //         else
  //           taxAmountIncludedInPrice += taxValues.Tax2Amount ? taxValues.Tax2Amount : 0;

  //         tax1AmountTotal += taxValues.Tax1Amount ? taxValues.Tax1Amount : 0;
  //         tax2AmountTotal += taxValues.Tax2Amount ? taxValues.Tax2Amount : 0;

  //       }
  //     }

  //     // }

  //     txAmts.Tax1Amount = tax1AmountTotal;
  //     txAmts.Tax1Percentage = tax1ActualAmountTotal;

  //     txAmts.Tax2Amount = tax2AmountTotal;
  //     txAmts.Tax2Percentage = tax2ActualAmountTotal;

  //     if (taxAmountIncludedInPrice > 0 || isTaxExempted || (txAmts.Tax1Amount > 0 || txAmts.Tax2Amount > 0)) {
  //       let amountAfterTax = amountBeforeDiscount - taxAmountIncludedInPrice;

  //       if (amountAfterTax > 0)
  //         txAmts.Price = (amountAfterTax / (quantity * currencyRate));
  //       else
  //         txAmts.Price = 0; //we will not allow to proceed if price is zero
  //     }
  //     else if ((txAmts.Tax1Amount == 0) && (txAmts.Tax2Amount == 0)) //It means All the group items dont have tax group id
  //     {
  //       if (amountBeforeDiscount > 0)
  //         txAmts.Price = (amountBeforeDiscount / (quantity * currencyRate));
  //       else
  //         txAmts.Price = 0; //we will not allow to proceed if price is zero
  //     }

  //     psalesInvoiceDetail.IsTax1IncludedInPrice = txAmts.IsTax1IncludedInPrice;
  //     psalesInvoiceDetail.IsTax2IncludedInPrice = txAmts.IsTax2IncludedInPrice;

  //     psalesInvoiceDetail.Price = txAmts.Price;
  //     psalesInvoiceDetail.Tax1Rate = 0;
  //     psalesInvoiceDetail.Tax2Rate = 0;

  //     psalesInvoiceDetail.Tax1Amount = txAmts.Tax1Amount
  //     psalesInvoiceDetail.Tax2Amount = txAmts.Tax2Amount

  //     var amount = amountBeforeDiscount - discountAmount;

  //     if (txAmts.IsTax1IncludedInPrice == false) {
  //       amount = amount + txAmts.Tax1Percentage; // txAmts.Tax1Amount;
  //     }
  //     if (txAmts.IsTax2IncludedInPrice == false) {
  //       amount = amount + txAmts.Tax2Percentage; //txAmts.Tax2Amount;
  //     }

  //     psalesInvoiceDetail.GrandAmount = amount;
  //     psalesInvoiceDetail.GrandAmount = psalesInvoiceDetail.GrandAmount

  //   });

  // }

  const finalCalculation = (selectedProduct, type) => {
    let products =
      selectedProduct.length > 0
        ? selectedProduct
        : type === 'delete'
        ? []
        : selectedProducts;
    let subTotal = 0,
      total = 0;
    products.forEach(p => {
      subTotal = subTotal + p.GrandAmount;
    });
    total = subTotal;

    if (selectedGlobalTaxObj || globalDiscountRate > 0) {
      if (globalDiscountRate > 0) {
        globalDiscountAmountFun('', subTotal, total, 'recalling');
      } else if (globalDiscountAmount > 0) {
        globalDiscountAmountFun('globalDiscount', subTotal, total, 'recalling');
      } else if (selectedGlobalTaxObj) {
        globalTaxFun(selectedGlobalTaxObj, subTotal, '', total);
      }
    } else {
      setLoading(false);
      setTotalPrice(total);
    }
    console.log('finalCalculation.....,subTotal', subTotal);
    setsubPrice(subTotal);
    setLoading(false);
  };

  const changeProductGroupItem = async (
    item,
    type,
    newQuantity,
    dr,
    discount,
  ) => {
    let pq = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1;
    item.maxQuantity =
      returnInvoiceNumber !== null
        ? item.maxQuantity
        : 100000000000 + item.Quantity;
    item.DiscountAmount = discount;
    // console.log('return product quanttoty check', item.maxQuantity >= pq)
    if (item.maxQuantity >= pq) {
      let rr = await getData(SalesFamilySummaryListTable, async cb => {
        // console.log(' SalesFamilySummaryListTable are', cb);
        let groupTaxCodes = cb.filter(
          x => x.SalesFamilyCode === item.ProductCode,
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

        if (item.DiscountAmount > newQuantity * item.PriceOriginal) {
          item.DiscountAmount = 0;
        }
        let executeCal = true;
        if (item.DiscountAmount > 0) {
          if (item.DiscountRate > 0) {
            percentageDiscountAmount =
              (item.webperamount * newQuantity * item.DiscountRate) / 100;
            if (type === 'increment' || type === 'decrement') {
              // item.Quantity = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1
              item.Quantity = newQuantity;

              executeCal = false;
              handleDiscount(item, 'DiscountRate');
            }
          } else {
            percentageDiscountAmount = item.DiscountAmount;

            if (type === 'increment' || type === 'decrement') {
              // item.Quantity = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1
              item.Quantity = newQuantity;
              executeCal = false;
              handleDiscount(item, undefined);
            }
          }
        }
        if (executeCal == true) {
          await productGroupList.forEach(async (element, index) => {
            console.log('Element', element);
            let amountBeforeDiscount = item.PriceOriginal * newQuantity;
            let taxGroupID = '';
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
              dr,
            );

            console.log('taxamount is', taxAmt);
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

              if (amountAfterTax > 0)
                taxAmt.Price = amountAfterTax / (item.Quantity * 1);
              else taxAmt.Price = 0; //we will not allow to proceed if price is zero
            } else if (taxAmt.Tax1Amount == 0 && taxAmt.Tax2Amount == 0) {
              //It means All the group items dont have tax group id
              if (amountBeforeDiscount > 0)
                taxAmt.Price = amountBeforeDiscount / (item.Quantity * 1);
              else taxAmt.Price = 0; //we will not allow to proceed if price is zero
            }

            item.Tax1Amount = tax1AmountTotal ? tax1AmountTotal : 0;
            item.Tax2Amount = tax2AmountTotal ? tax2AmountTotal : 0;

            // console.log('total tax is', totaltax1, ' ND 2', totaltax2, finaltaxObj)

            // let tax = totaltax1 + totaltax2;
            item.Price = Number(item.PriceOriginal);
            item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice ? 1 : 0;
            item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice ? 1 : 0;
            item.IngredientsArray = [];
            item.IngredientNames = '';

            item.Tax1Code = taxAmt.Tax1Code;
            (item.Tax1Name = ''),
              (item.Tax1Rate = taxAmt.Tax1Percentage),
              (item.Tax1Amount = totaltax1),
              (item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : ''),
              (item.Tax2Name = ''),
              (item.Tax2Rate = taxAmt.Tax2Percentage
                ? taxAmt.Tax2Percentage
                : 0),
              (item.Tax2Amount = totaltax2);
            let tax = totaltax1 + totaltax2;
            // item.TaxGroupID = taxGroupID

            let product = item;
            if (type === 'increment') {
              // productIncrement(taxAmt, product)
              if (taxAmt) {
                let proQ;

                if (!product.IsParentAddOn) {
                  proQ =
                    type === 'increment'
                      ? (newQuantity - 1) * product.OrignalQuantity
                      : newQuantity * product.OrignalQuantity;
                } else {
                  proQ = type === 'increment' ? newQuantity - 1 : newQuantity;
                }
                // console.log("proQ !== product.maxQuantity...", proQ, newQuantity, product)
                if (proQ !== product.maxQuantity) {
                  product.Quantity = newQuantity;

                  if (dr > 0) {
                    discount = product.DiscountAmount
                      ? percentageDiscountAmount
                      : parseFloat(
                          (dr * product.webperamount * newQuantity) / 100,
                        );
                    discount = Number(discount);
                  } else {
                    discount = product.DiscountAmount
                      ? product.DiscountAmount
                      : 0;
                    discount = Number(discount);
                  }

                  var amount = 0;
                  if (index == 0)
                    amount = amountBeforeDiscount - percentageDiscountAmount;
                  else amount = product.GrandAmount;
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

                  // let GAmount = 0;
                  // if (taxAmt.calculationId === 9 || taxAmt.calculationId === 1) {
                  //   GAmount = Number(tamout + totaltax1);
                  // } else {
                  if (discount > item.PriceOriginal * newQuantity) {
                    discount = Number(discount);
                    discount = 0;
                  }
                  item.PriceWithOutTax = Number(item.PriceUnitlesstax);
                  discount = Number(discount);

                  product.DiscountAmount = Number(discount).toFixed(2);
                  product.tax = tax;
                  console.log('Tax is ', tax);

                  product.tax = product.Tax1Amount + product.Tax2Amount;
                  console.log('Tax is ', product.tax);
                } else {
                  // console.log("asmdfjsagjdfjsadfgj")
                  setMessage(props.StringsList._230);
                  setDisplayAlert(true);
                  setLoading(false);
                }
              }
            } else if (type === 'decrement') {
              // console.log("newQuantity", newQuantity)
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
              if (index == 0)
                amount = amountBeforeDiscount - percentageDiscountAmount;
              else amount = product.GrandAmount;
              // if (taxAmt.IsTax1IncludedInPrice == false) {
              //   amount = amount + taxAmt.Tax1Amount; // txAmts.Tax1Amount;
              // }

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
              //;
              product.DiscountAmount = Number(discount).toFixed(2);
              product.tax = tax;
              product.tax = product.Tax1Amount + product.Tax2Amount;

              // product.GrandAmount = Number(
              //   ((product.Price) * product.Quantity) - discount,
              // );
              // sPrice = Number(sPrice - product.Price + product.DiscountAmount - discount);

              // tPrice = Number(
              //   tPrice -
              //   product.Price + product.DiscountAmount - discount
              // ); //;
              // product.DiscountAmount = discount
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
                      item.SalesBillDetailsID) &&
                  type !== 'returnInvoice'
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

  const changeProductGroupAddon = async (
    parentItem,
    item,
    type,
    newQuantity,
    dr,
    discount,
  ) => {
    let pq = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1;
    item.maxQuantity =
      returnInvoiceNumber !== null
        ? item.maxQuantity
        : 100000000000 + item.Quantity;
    item.DiscountAmount = discount;
    console.log('return product quanttoty check', item.maxQuantity >= pq);
    if (item.maxQuantity >= pq) {
      let rr = await getData(SalesFamilySummaryListTable, async cb => {
        console.log(' SalesFamilySummaryListTable are', cb);
        let groupTaxCodes = cb.filter(
          x => x.SalesFamilyCode === item.ProductCode,
        );
        productGroupList = groupTaxCodes;
        console.log(' our group is', productGroupList);
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
        if (item.DiscountAmount > 0) {
          if (item.DiscountRate > 0) {
            percentageDiscountAmount =
              (item.webperamount * newQuantity * item.DiscountRate) / 100;
            if (type === 'increment' || type === 'decrement') {
              // item.Quantity = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1
              item.Quantity = newQuantity;

              executeCal = false;
              handleDiscount(item, 'DiscountRate');
            }
          } else {
            percentageDiscountAmount = item.DiscountAmount;

            if (type === 'increment' || type === 'decrement') {
              // item.Quantity = type === 'increment' ? item.Quantity + 1 : item.Quantity - 1
              item.Quantity = newQuantity;
              executeCal = false;
              handleDiscount(item, undefined);
            }
          }
        }
        if (executeCal == true) {
          await productGroupList.forEach(async (element, index) => {
            console.log('Element', element);
            let amountBeforeDiscount = item.PriceOriginal * newQuantity;
            let taxGroupID = '';
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
              dr,
            );

            console.log('taxamount is', taxAmt);

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

              if (amountAfterTax > 0)
                taxAmt.Price = amountAfterTax / (item.Quantity * 1);
              else taxAmt.Price = 0; //we will not allow to proceed if price is zero
            } else if (taxAmt.Tax1Amount == 0 && taxAmt.Tax2Amount == 0) {
              //It means All the group items dont have tax group id
              if (amountBeforeDiscount > 0)
                taxAmt.Price = amountBeforeDiscount / (item.Quantity * 1);
              else taxAmt.Price = 0; //we will not allow to proceed if price is zero
            }

            item.Tax1Amount = tax1AmountTotal ? tax1AmountTotal : 0;
            item.Tax2Amount = tax2AmountTotal ? tax2AmountTotal : 0;
            item.Price = Number(item.PriceOriginal);
            item.IsTax1IncludedInPrice = taxAmt?.IsTax1IncludedInPrice ? 1 : 0;
            item.IsTax2IncludedInPrice = taxAmt?.IsTax2IncludedInPrice ? 1 : 0;
            item.IngredientsArray = [];
            item.IngredientNames = '';

            item.Tax1Code = taxAmt.Tax1Code;
            (item.Tax1Name = ''),
              (item.Tax1Rate = taxAmt.Tax1Percentage),
              (item.Tax1Amount = totaltax1),
              (item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : ''),
              (item.Tax2Name = ''),
              (item.Tax2Rate = taxAmt.Tax2Percentage
                ? taxAmt.Tax2Percentage
                : 0),
              (item.Tax2Amount = totaltax2);
            let tax = totaltax1 + totaltax2;
            let product = item;
            if (type === 'increment') {
              if (taxAmt) {
                let proQ;
                if (!product.IsParentAddOn) {
                  proQ =
                    type === 'increment'
                      ? (newQuantity - 1) * product.OrignalQuantity
                      : newQuantity * product.OrignalQuantity;
                } else {
                  proQ = type === 'increment' ? newQuantity - 1 : newQuantity;
                }
                if (proQ !== product.maxQuantity) {
                  product.Quantity = newQuantity;

                  if (dr > 0) {
                    discount = product.DiscountAmount
                      ? percentageDiscountAmount
                      : parseFloat(
                          (dr * product.webperamount * newQuantity) / 100,
                        );
                    discount = Number(discount);
                  } else {
                    discount = product.DiscountAmount
                      ? product.DiscountAmount
                      : 0;
                    discount = Number(discount);
                  }
                  var amount = 0;
                  if (index == 0)
                    amount = amountBeforeDiscount - percentageDiscountAmount;
                  else amount = product.GrandAmount;
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
                  console.log('Tax is ', tax);

                  product.tax = product.Tax1Amount + product.Tax2Amount;
                  console.log('Tax is ', product.tax);
                } else {
                  setMessage(props.StringsList._230);
                  setDisplayAlert(true);
                  setLoading(false);
                }
              }
            } else if (type === 'decrement') {
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
              if (index == 0)
                amount = amountBeforeDiscount - percentageDiscountAmount;
              else amount = product.GrandAmount;

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
            if (index === productGroupList.length - 1) {
              let p = [...selectedProducts];
              for (let i = 0; i < p.length; i++) {
                let prod = p[i];
                if (
                  prod?.AddOnParentSalesInvoiceDetailsID ===
                    parentItem.SalesBillDetailsID &&
                  type !== 'returnInvoice'
                ) {
                  prod = item;
                } else if (
                  prod?.ProductBarCode === item?.ProductBarCode &&
                  prod?.PriceOriginal === item?.PriceOriginal
                ) {
                  prod = parentItem;
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

  const addProductToList = async (itm, type, index, proArray, SP, TP) => {
    console.log('addProductToList item', itm);
    // getProductsIngredients(itm)
    setLoading(true);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    let executeCalculation = true;
    let addonFinalQuantity = 0;
    // createInvoiceStyle()
    if (!returnInvoiceNumber && !invoiceNumber) onNewInvoice();
    let item = {...itm},
      selectedProduct = [...selectedProducts],
      sPrice = subPrice,
      tPrice = totalPrice;
    if (terminalSetup?.BeepSound === 'true') {
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
      let newQuantity;

      let isProductExist = selectedProducts.find(
        x =>
          x?.ProductBarCode === item?.ProductBarCode &&
          x?.PriceOriginal === item?.PriceOriginal &&
          x.haveAddon == true,
      );

      if (isProductExist && !isToggle) {
        let sameProductWithoutAddon = selectedProducts.findIndex(
          x =>
            x?.ProductBarCode === item?.ProductBarCode &&
            x?.PriceOriginal === item?.PriceOriginal &&
            x.haveAddon == undefined,
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
      if (item.addAsNew === false) {
        for (let i = 0; i < selectedProduct.length; i++) {
          let product = selectedProduct[i];
          console.log('index is ===>', index);

          let ind;
          if (localIndex == undefined) {
            ind = i;
          } else {
            ind = localIndex;
          }
          console.log('my index is', ind);
          if (
            (i === ind ||
              product?.AddOnParentSalesInvoiceDetailsID ===
                item.SalesBillDetailsID) &&
            type !== 'returnInvoice'
          ) {
            if (
              product?.ProductBarCode === item?.ProductBarCode &&
              product?.PriceOriginal === item?.PriceOriginal
            ) {
              newQuantity =
                type !== 'increment'
                  ? product.Quantity - 1
                  : product.Quantity + 1;
            }
            console.log(
              'add Product To List... item',
              product.Quantity,
              newQuantity,
            );

            if (
              ((product?.ProductBarCode === item?.ProductBarCode &&
                product?.PriceOriginal === item?.PriceOriginal) ||
                product?.AddOnParentSalesInvoiceDetailsID ===
                  item.SalesBillDetailsID) &&
              type !== 'returnInvoice'
            ) {
              let groupType = '';
              if (
                product?.AddOnParentSalesInvoiceDetailsID ===
                item.SalesBillDetailsID
              ) {
                groupType = 'addon';
              }
              // console.log("calculateTaxeGroups...", taxAmt)

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
                if (printType === 'returnBill') {
                  let totalQuantity =
                    product?.Quantity + product?.ReturnedQuantity;
                  let discountAfterDivision = Number(
                    (item.DiscountAmount / totalQuantity) * newQuantity,
                  );
                  if (product.DiscountRate > 0) {
                    pd = product.DiscountAmount;
                  } else {
                    pd = discountAfterDivision;
                  }
                }
                executeCalculation = false;
                if (groupType === 'addon') {
                  if (!product?.IsParentAddOn) {
                    addonFinalQuantity = newQuantity * product.OrignalQuantity;
                    pd = 0;
                  }
                  changeProductGroupAddon(
                    itm,
                    product,
                    type,
                    addonFinalQuantity,
                    dr,
                    pd,
                  );
                } else {
                  changeProductGroupItem(itm, type, newQuantity, dr, pd);
                }
              } else {
                if (printType === 'returnBill') {
                  let totalQuantity =
                    product?.Quantity + product?.ReturnedQuantity;
                  let discountAfterDivision = Number(
                    (item.DiscountAmount / totalQuantity) * newQuantity,
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
                  dr,
                );

                //  console.log("Amount.....taxAmt", taxAmt)
                product.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
                (product.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
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

                (product.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
                  (product.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
                  (product.Tax2Rate = taxAmt?.Tax2Percentage
                    ? taxAmt?.Tax2Percentage
                    : 0);

                product.Tax2Amount = taxAmt?.Tax2Amount
                  ? taxAmt?.Tax2Amount
                  : 0;

                if (type === 'increment') {
                  if (taxAmt) {
                    let proQ;

                    if (!product.IsParentAddOn) {
                      proQ =
                        type === 'increment'
                          ? (newQuantity - 1) * product.OrignalQuantity
                          : newQuantity * product.OrignalQuantity;
                    } else {
                      proQ =
                        type === 'increment' ? newQuantity - 1 : newQuantity;
                    }
                    // console.log("proQ !== product.maxQuantity...", proQ, newQuantity, product)
                    if (
                      proQ === product.maxQuantity &&
                      printType === 'returnBill'
                    ) {
                      product.Tax1Amount = product.tax;
                    }
                    if (proQ !== product.maxQuantity) {
                      let totalQuantity =
                        product?.Quantity + product?.ReturnedQuantity;
                      product.Quantity = newQuantity;
                      let discountAfterDivision = Number(
                        (item.DiscountAmount / totalQuantity) * newQuantity,
                      );
                      if (
                        printType === 'returnBill' &&
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
                                100,
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
                                taxAmt.Tax1Amount,
                            )
                          : Number(
                              product.PriceOriginal * product.Quantity -
                                discount,
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
                } else if (type === 'decrement') {
                  let totalQuantity =
                    product?.Quantity + product?.ReturnedQuantity;
                  product.Quantity = newQuantity;
                  let discountAfterDivision = Number(
                    (item.DiscountAmount / totalQuantity) * newQuantity,
                  );
                  if (
                    printType === 'returnBill' &&
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
                            100,
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
                            taxAmt.Tax1Amount,
                        )
                      : Number(
                          product.PriceOriginal * product.Quantity - discount,
                        );
                  }
                  product.GrandAmount = Number(GAmount);
                  if (printType === 'returnBill' && !product.IsParentAddOn) {
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
      let time = moment().format('HH:mm:ss');
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
          let taxAmountIncludedInPrice = 0;

          let tax1AmountTotal = 0,
            tax1ActualAmountTotal = 0,
            tax2AmountTotal = 0,
            tax2ActualAmountTotal = 0;
          let listOfPG;
          item.Pricefortax = item.PriceOriginal;

          let rr = await getData(SalesFamilySummaryListTable, async cb => {
            let groupTaxCodes = cb.filter(
              x => x.SalesFamilyCode === item.ProductCode,
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
              let taxGroupID = '';
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
                item.DiscountRate,
              );

              if (index === listOfPG.length - 1) {
                for (let i = 0; i < listOfPG.length; i++) {
                  const element = listOfPG[i];
                  await getData(
                    UpdateProductDetailListTable,
                    productsDetail => {
                      let findProduct = productsDetail.find(
                        e => e.ProductBarCode === element.ProductBarCode,
                      );

                      if (findProduct) {
                        let isMatch = listOfPG.find(
                          e => e.ProductBarCode === findProduct.ProductBarCode,
                        );
                        let netQuantity = isMatch?.Quantity * element?.Quantity;
                        findProduct.Quantity = netQuantity;
                        findProduct.Price = element?.Price;
                        findProduct.SalesInvoiceDetailsID = uuid.v4();
                        innerProductsArray.push(findProduct);
                      }
                    },
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
              let productGroupTaxInfoObj = {
                ProductBarCode: item?.ProductBarCode,
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
              colloctivePrice += element.Price;
              myArray.push(productGroupTaxInfoObj);

              if (!item?.IsParentAddOn) {
                addonFinalQuantity = item.Quantity * item.OrignalQuantity;
              }
              if (taxAmt.Tax1Fragment == 2 || taxAmt.Tax2Fragment == 2) {
                taxAmt.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                taxAmt.Tax2Amount = taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
              }
              (item.Tax1Fragment = taxAmt?.Tax1Fragment
                ? taxAmt.Tax1Fragment
                : ''),
                (item.Tax2Fragment = taxAmt?.Tax2Fragment
                  ? taxAmt.Tax2Fragment
                  : '');
              item.IsTax1IncludedInPrice = taxAmt.IsTax1IncludedInPrice
                ? taxAmt.IsTax1IncludedInPrice
                : 0;
              item.IsTax2IncludedInPrice = taxAmt.IsTax2IncludedInPrice
                ? taxAmt.IsTax2IncludedInPrice
                : 0;
              item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
              item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : '';
              item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : '';
              item.Tax2Name = taxAmt.Tax2Name ? taxAmt.Tax2Name : '';
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
              totaltax1 = taxAmt.Tax1Amount
                ? totaltax1 + taxAmt.Tax1Amount
                : totaltax1 + 0;
              totaltax2 = taxAmt.Tax2Amount
                ? totaltax2 + taxAmt.Tax2Amount
                : totaltax2 + 0;
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
                item.Price - inclusiveTax / item?.Quantity,
              );
              item.PriceUnitlesstax = item.PriceWithOutTax;
              item.IngredientsArray = [];
              item.IngredientNames = '';
              item.tax = Number(tax);
              var amount =
                item?.GrandAmount !== 0
                  ? item?.GrandAmount
                  : amountBeforeDiscount - percentageDiscountAmount;
              if (taxAmt.IsTax1IncludedInPrice == false) {
                amount = amount + taxAmt.Tax1Amount; // txAmts.Tax1Amount;
                // item.webperamount = item.PriceOriginal;
              }
              if (taxAmt.IsTax2IncludedInPrice == false) {
                amount = amount + taxAmt.Tax2Amount; //txAmts.Tax2Amount;
                // item.webperamount = item.PriceOriginal;
              }
              if (taxAmt.IsTax2IncludedInPrice == true) {
                // item.webperamount =
                //   item.PriceOriginal - totaltax2 / item.Quantity;
              }
              if (taxAmt.IsTax1IncludedInPrice == true) {
                item.webperamount =
                  item.PriceOriginal - totaltax1 / item.Quantity;
              }
              item.GrandAmount = amount;
              if (!item?.IsParentAddOn) {
                item.GrandAmount = item.GrandAmount * item?.Quantity;
              }
              item.webperamount = item.PriceWithOutTax;
              item.SalesBillDetailsID = uuid.v4();
              sPrice = Number(item?.GrandAmount);
              tPrice = Number(item?.GrandAmount);
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
            item.DiscountRate,
          );
          console.log('calculateTaxeGroups...', taxAmt, item);
          item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
          (item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
            (item.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
            (item.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (item.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
            (item.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
            (item.Tax2Rate = taxAmt?.Tax2Percentage
              ? taxAmt?.Tax2Percentage
              : 0),
            (item.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);
          item.Tax1Fragment = taxAmt.Tax1Fragment ? taxAmt.Tax1Fragment : '';
          item.Tax2Fragment = taxAmt.Tax2Fragment ? taxAmt.Tax2Fragment : '';
          item.Tax1Fragment = taxAmt.Tax1Fragment ? taxAmt.Tax1Fragment : '';
          item.Tax2Fragment = taxAmt.Tax2Fragment ? taxAmt.Tax2Fragment : '';
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
          item.IngredientNames = '';
          item.tax = Number(tax);
          item.GrandAmount = Number(taxAmt.Price * item.Quantity) + tax;
          item.SalesBillDetailsID = uuid.v4();
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
        if (type === 'addnos') {
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
        // setLoading(false)
        let p = [...selectedProduct];
        finalCalculation(p);
        let srNo = 1;
        // let array = [...selectedProducts];
        selectedProduct.forEach(e => {
          if (e.IsParentAddOn) {
            e.srNo = srNo++;
          } else {
            e.srNo = 0;
          }
        });
        // setSelectedProducts(array);
        setSelectedProducts(selectedProduct);
        console.log('after adding product', selectedProduct);
      }, 100);
    }
  };

  const onSelectProduct = (item, filterCategoryProducts) => {
    // console.log("onSelectProduct........", item)
    if (drawerSetupArr.isInitialCashSet === 'false') {
      onNewInvoice();
    } else {
      // onNewInvoice();
      let newArray = [];
      let categoryProduct = item
        ? [...categoryProducts]
        : filterCategoryProducts;

      if (item) {
        console.log('selected item is', item);
        categoryProduct.forEach(product => {
          if (product?.ProductBarCode === item?.ProductBarCode) {
            product.isSelected = true;
            product.Quantity = item?.Quantity ? item.Quantity : 1;
            newArray.push(product);
          } else {
            newArray.push(product);
          }
        });
        addProductToList(item, 'increment');
      } else {
        if (selectedProducts.length > 0) {
          categoryProduct.forEach(product => {
            let cartItems = selectedProducts.find(
              x => x.ProductBarCode === product.ProductBarCode,
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
      // console.log('categoryProduct.2..', newArray);
      setCategoryProducts(
        newArray.length > 0 ? newArray : filterCategoryProducts,
      );
    }
  };

  const deleteItem = (item, index) => {
    // console.log("deleteItem..........", item)
    let sPrice = subPrice,
      tPrice = totalPrice;

    let remainProduct = [...selectedProducts];
    let addOn = remainProduct.filter(itm => {
      if (itm.ParentInvoiceDetailsID === item.SalesBillDetailsID) {
        sPrice = sPrice - itm.GrandAmount;

        tPrice = tPrice - itm.GrandAmount;
        return itm;
      }
    });

    remainProduct[index].isSelected = false;

    // console.log('addOn', tPrice, sPrice);
    sPrice = sPrice - item.GrandAmount;

    tPrice = tPrice - item.GrandAmount;
    // console.log('addOn', tPrice, sPrice);
    remainProduct.splice(index, addOn.length + 1);
    let srNo = 1;
    let rm = [];
    // remainProduct.filter(e => {
    //   if (e.IsParentAddOn) {
    //     e.srNo = srNo++
    //   } else {
    //     e.srNo = 0
    //   }
    //   // console.log("e.srNo.......", e.srNo)
    //   rm.push(e)
    // })
    // console.log("rem.............................", rm)
    setNumberOfItems(srNo);
    let p = [...remainProduct];
    finalCalculation(p, 'delete');
    remainProduct.forEach(e => {
      if (e.IsParentAddOn) {
        e.srNo = srNo++;
      } else {
        e.srNo = 0;
      }
    });
    // setSelectedProducts(array);
    setSelectedProducts(remainProduct);

    let number = remainProduct.filter(
      w => w.IsParentAddOn === 1 || w.IsParentAddOn === true,
    ).length;

    setNumberOfItems(number);
    // if (remainProduct.length === 0) {
    //   setsubPrice(0)
    //   setTotalPrice(0)
    //   setGlobalTax(0)
    //   if (!returnInvoiceNumber) {
    //     setToggle(false)

    //     if (!noFamilyFound) {
    //       getSelectedCategoryProducts()
    //     } else {
    //       getAllCategories("isRestState")
    //     }

    //   }
    // }
  };

  const createInvoiceNumber = () => {
    getData(DrawerSetupTable, cb => {
      // console.log(' DrawerSetupTable', cb);
      setDrawerSetupArr(cb[0]);
    });
    getData(TerminalConfigurationTable, cb => {
      // console.log('TerminalConfigurationTable', cb[0]?.LastBillNumber);

      let preZero = '0000000';
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
          ? cb[0].BillPrefix + '-' + (Number(cb[0].LastBillNumber) + 1)
          : cb[0].BillPrefix +
            '-' +
            preZero.slice(1 - silceNumber) +
            (Number(cb[0].LastBillNumber) + 1);

      setInvoiceNumber(invoiceNumber);
      setTerminalConfiguration(cb[0]);
    });
    setSalesBillID(uuid.v4());
    setOptions([
      {label: props.StringsList._373, value: 'holdInvoice'},
      {label: props.StringsList._436, value: 'scanner'},
      {label: props.StringsList._30, value: 'buyer'},
      {label: props.StringsList._437, value: 'loyaltyCard'},
    ]);
  };

  const createReturnInvoiceNumber = () => {
    getData(DrawerSetupTable, cb => {
      // console.log(' DrawerSetupTable', cb);
      setDrawerSetupArr(cb[0]);
    });
    getData(TerminalConfigurationTable, cb => {
      let preZero = '0000000';
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
            '-' +
            (Number(cb[0].LastReturnBillNumber) + 1)
          : cb[0].BillReturnPrefix +
            '-' +
            preZero.slice(1 - silceNumber) +
            (Number(cb[0].LastReturnBillNumber) + 1);

      // console.log('Return invoice Number', invoiceNumber);
      setReturnInvoiceNumber(invoiceNumber);
      setSalesBillID(uuid.v4());
      setTerminalConfiguration(cb[0]);
    });
  };

  const restState = async () => {
    setOptions(
      userConfiguration.SalesRefundAllowed === 1
        ? [
            {label: props.StringsList._32, value: 'getHoldInvoice'},
            {label: props.StringsList._105, value: 'reprint'},
            {label: props.StringsList._319, value: 'returnBill'},
            {label: props.StringsList._30, value: 'buyer'},
            {label: props.StringsList._437, value: 'loyaltyCard'},
          ]
        : [
            {label: props.StringsList._32, value: 'getHoldInvoice'},
            {label: props.StringsList._30, value: 'buyer'},
            {label: props.StringsList._437, value: 'loyaltyCard'},
          ],
    );
    setTotalReprintCount(null);
    setLoading(true);
    setUserDiscountLimit(0);
    setPrintType(null);
    selectedProducts.forEach(item => {
      item.isSelected = false;
    });
    setCashAmount('');
    setSelectedProducts([]);
    setsubPrice(0);
    setglobalDiscountAmount(0);
    setTotalPrice(0);
    //  await getAllCategories();
    setNumberOfItems(0);
    setSearchText('');
    setAdvancePaidInCash(0);
    setIngredientsData([]);
    setDueAmount(0);
    setPaymentsValue(null);
    setToggle(false);
    setPopup(false);
    seOptionsValue(null);
    setUriImage(null);
    setInvoice(false);
    setClientCustomInvoice(false);
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
    setMessage('');
    setHoldInvoiceName('');
    setScanner(false);
    setAlertValue(null);
    setAlertType(null);
    setReturnProducts([]);
    setisReturnInvoice(false);
    setLoading(false);
    setGlobalTax(0);
    setEarnPointCArry([]);
    setEarnPointPArry([]);
    setEarnPointIArry([]);
    setBuyerInfo(null);
    setRedeemPoints(0);
    setCheckLoyalityReward(false);
    setStatus(0);
    // setGlobalTaxObj(null);
    // setSelectedGlobalTaxObj(null);
    setoptionsOpen(false);
    setPaymentsOpen(false);
    // setBillingType(null);
    //  console.log("flatListRef.current", flatListRef.current)
    if (!noFamilyFound) {
      getSelectedCategoryProducts();
    } else {
      getAllCategories('isRestState');
    }
    if (userConfiguration) {
      setUserDiscountLimit(userConfiguration?.DiscountLimit);
    }

    // await flatListRef.current.scrollToIndex({ index: 0 });

    setBillDate(null);
  };

  const getDrawerSetting = () => {
    getData(DrawerSetupTable, cb => {
      setDrawerSetupArr(cb[0]);
    });
  };

  const onNewInvoice = async isCreateInvoice => {
    //
    // PrinterNativeModule.readFolder();
    console.log(
      'drawerSetupArrdrawerSetupArrdrawerSetupArrdrawerSetupArr',
      drawerSetupArr,
    );

    if (drawerSetupArr.isInitialCashSet === 'false') {
      viewref.current?.slideInRight(280);
      setIsDrawar(!isDrawar);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      createInvoiceNumber();
      // ref_searchBar.current.focus();
    }
  };

  const onClickCancel = () => {
    // PrinterNativeModule.printing("react native calling....", uriImage)
    if (invoiceNumber) {
      setOptions(
        userConfiguration.SalesRefundAllowed === 1
          ? [
              {label: props.StringsList._32, value: 'getHoldInvoice'},
              {label: props.StringsList._105, value: 'reprint'},
              {label: props.StringsList._319, value: 'returnBill'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ]
          : [
              {label: props.StringsList._32, value: 'getHoldInvoice'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ],
      );

      restState();
    } else {
      // props.navigation.goBack();

      props.navigation.navigate('dashboard');
    }
  };
  const paymentMethodSelect = async item => {
    // console.log('paymentMethodSelect......', paymentsValue, billingType);
    if (billingType || returnInvoiceNumber) {
      if (selectedProducts.length > 0 && paymentsValue) {
        let checkZeroPrice = selectedProducts.some(
          p => p.PriceOriginal === 0 && p.IsParentAddOn !== false,
        );
        if (checkZeroPrice || totalPrice === 0) {
          setPaymentsValue(null);
          setMessage(props.StringsList._270);
          setDisplayAlert(true);
        } else {
          let selP = payments.filter(e => e.PaymentType === paymentsValue);
          // console.log('setSelectedPyamentMethod', selP[0]);
          setSelectedPyamentMethod(selP[0]);
          if (
            buyerInfo?.LoyaltyCard &&
            !checkLoyalityReward &&
            redeemPoints > 0
          ) {
            checkLoyalitRewardsFun();
            setCheckLoyalityReward(true);
          } else {
            if (paymentsValue === '2') {
              if (buyerInfo) {
                if (!isPopup) {
                  viewref.current?.slideInRight(280);
                  setPopup(!isPopup);
                } else {
                  setPaymentsValue(null);
                  viewref.current
                    ?.fadeOutRight()
                    .then(() => setPopup(!isPopup));
                }
              } else {
                // setSelectedPyamentMethod(null)
                setPaymentsValue(null);
                setMessage(props.StringsList._367);
                setDisplayAlert(true);
              }
              // createInvoiceStyle()
            } else if (paymentsValue === '4' || paymentsValue === '5') {
              if (!isPopup) {
                viewref.current?.slideInRight(280);
                setPopup(!isPopup);
              } else {
                setPaymentsValue(null);
                viewref.current?.fadeOutRight().then(() => setPopup(!isPopup));
              }
              // setLoading(false);
            } else {
              if (returnInvoiceNumber === null && isCustomInvoice) {
                setIsPaidCash(true);
              } else {
                paymentProcess(null, selP[0]);
              }
            }
          }
        }
      } else {
        if (paymentsValue) {
        }

        setPaymentsValue(null);
      }
    } else {
      if (selectedProducts.length > 0) setisBillingType(true);
    }
  };

  const paymentProcess = async (ADamount, selP, type) => {
    let ConnectedBluetoothInfo = await AsyncStorage.getItem(
      'ConnectedBluetoothInfo',
    );

    if (ConnectedBluetoothInfo) {
      console.log('ConnectedBluetoothInfo', ConnectedBluetoothInfo);
      let printAdress = ConnectedBluetoothInfo?.split('|');
      setPrinterMacAddress(printAdress[1]);
      setPrinterName(printAdress[0]);
    }
    console.log('paymentProcess........', type);
    setLoading(true);

    setUriImage(null);
    if (type !== 'reprint') {
      setTimeout(() => {
        console.log('paymentProcess........setTimeout', type);
        selectedProductUpdate();
        saleBill(ADamount, selP);
        if (returnInvoiceNumber) {
          updateReturnTerminalConfiguration();
          postBills();
          Toast.show('Return Invoice Posted Successfully');
        } else {
          updateTerminalConfiguration(ADamount);
        }
        if (billingStyleId !== 1) {
          // ;
          isCustomInvoice ? setClientCustomInvoice(true) : setInvoice(true);
        } else {
          printerSelection();
        }

        setLoading(false);
      }, 0);
    } else {
      setTimeout(() => {
        console.log('reprint bill style', advancePaidInCash);
        // updateTerminalConfiguration(ADamount);
        if (billingStyleId !== 1) {
          isCustomInvoice ? setClientCustomInvoice(true) : setInvoice(true);
        } else {
          // console.log('printer are', selectedProducts);
          // ReprinterSelection();
          printerSelection();
        }
        setLoading(false);
      }, 500);
    }
  };

  const GetDecimalpart = value => {
    //let value = 1234
    let s = value.toString();
    let parts = s.split('.');
    let i1 = parseInt(parts[0]);
    let i2 = parseInt(parts[1]);
    // console.log("GetDecimalpart", i1, i2)
    return i2;
  };
  function replaceValuesInRow(rowContent, dynamicValuesBody, thTags) {
    thTags.forEach((key, i) => {
      const regex = new RegExp(`<td([^>]*)>([^<]*)<\\/td>`);
      const tdMatches = rowContent.match(new RegExp(regex.source, 'g'));

      if (tdMatches && tdMatches.length > i) {
        const originalContent = tdMatches[i];
        const [, attributes, originalTdContent] = originalContent.match(regex);

        // Check if dynamicValuesBody[key] is not an empty string
        const replacementContent =
          dynamicValuesBody[key] !== ''
            ? dynamicValuesBody[key]
            : originalTdContent;

        const replacement = `<td${attributes}>${originalTdContent}${replacementContent}</td>`;
        rowContent = rowContent.replace(originalContent, replacement);
      }
    });

    return rowContent;
  }
  function getHeight(htmlStr, divId) {
    const regex = new RegExp(
      `<div[^>]*id="${divId}"[^>]*style="[^"]*height: ([^;]+)px[^"]*"[^>]*>`,
      'i',
    );
    const match = htmlStr.match(regex);

    if (match && match[1]) {
      return parseInt(match[1], 10);
    }

    return 0; // Default value if not found
  }

  const A4PrinterStyle = async (
    currentDate,
    qrUrl,
    countNumber,
    update,
    page,
  ) => {
    // console.log(
    //   'billingType A4PrinterStyle..',
    //   billingType,
    //   ' terminal ',
    //   currentDate,
    //   billDates,
    //   'product are',
    //   selectedProducts,
    // );
    console.log('printType', printType);
    let itemPerPage = 17;
    let printItems = [],
      allProducts = [];
    if (printType === 'reprint') {
      if (
        Array.isArray(lastBillDetail.BillDetails) &&
        lastBillDetail.BillDetails.length > 0
      ) {
        allProducts = lastBillDetail.BillDetails;
        printItems = lastBillDetail.BillDetails;
      } else {
        allProducts = selectedProducts;
        printItems = selectedProducts;
      }
    } else {
      allProducts = selectedProducts;
      printItems = selectedProducts;
    }

    let pageNo = page;

    let date, month, year, billDate;
    if (printType === 'reprint') {
      year = lastBillDetail.BillDate.slice(0, 4);
      month = lastBillDetail.BillDate.slice(4, 6);
      date = lastBillDetail.BillDate.slice(6, 8);
      billDate =
        date + '/' + month + '/' + year + '  ' + lastBillDetail.BillTime;
    }

    if (countNumber * itemPerPage < allProducts.length) {
      let lastIndex = countNumber * itemPerPage;
      let startingIndex = lastIndex - itemPerPage;
      printItems = allProducts.slice(startingIndex, lastIndex);
    } else {
      // let lastIndex = countNumber * 15
      let startingIndex = countNumber * itemPerPage - itemPerPage;
      printItems = allProducts.slice(startingIndex, allProducts.length);
    }

    let pageId = returnInvoiceNumber
      ? '403007'
      : billingType?.id === 2
      ? '4030061'
      : '403006';

    setLoading(true);
    await getDataByMultipaleID(
      A4PrintStylesTable,
      'PageID',
      pageId,
      'UseDefault',
      'true',
      async A4style => {
        if (A4style.length === 0) {
          setLoading(false);
          alert('There is no A4 printing style available');
        } else {
          if (pageNo !== 1 && update) {
            update = `<div style="page-break-after:always!important;">${update}</div>`;
          }
          let updateStyle = update,
            updateHeader = A4style[0].ReportHeader.replace(
              /<i\b[^>]*>.*?<\/i>/g,
              '',
            ),
            updateBody = A4style[0].ReportBody.replace(
              /<i\b[^>]*>.*?<\/i>/g,
              '',
            ),
            updateFooter = A4style[0].ReportFooter.replace(
              /<i\b[^>]*>.*?<\/i>/g,
              '',
            );

          let heightOfHeader = getHeight(updateHeader, 'dvhmain'); // 440;
          let heightOfFooter = getHeight(updateFooter, 'dvfmain'); // 760;
          let BodyHeightGiven = getHeight(updateBody, 'dvimain'); // 200;

          let IsFooterOnEveryPage =
            A4style[0].IsFooterOnEveryPage === 'true' ? true : false;
          let IsHeaderOnEveryPage =
            A4style[0].IsHeaderOnEveryPage === 'true' ? true : false;

          let findPrintStyle = A4style.findIndex(
            x => x.SerialNo > 1 && x.UseDefault === 'true',
          );
          // let bodyFinalHeight = 327;
          // if (
          //   IsFooterOnEveryPage &&
          //   IsHeaderOnEveryPage &&
          //   selectedProducts.length <= 15
          // ) {
          //   bodyFinalHeight = 327;
          // } else if (!IsFooterOnEveryPage && selectedProducts.length === 15) {
          //   bodyFinalHeight = BodyHeightGiven + heightOfFooter;
          // } else if (!IsHeaderOnEveryPage && selectedProducts.length === 15) {
          //   bodyFinalHeight = BodyHeightGiven + heightOfHeader;
          // } else {
          //   bodyFinalHeight = 327;
          // }

          if (findPrintStyle !== -1) {
            const updatedBodyWithAutoHeightAndFonts = updateBody.replace(
              /id="dvIMain" style=".*?"/,
              `id="dvIMain" style="width: 1100px; height:auto; margin-top: 11%;margin-bottom: 2%; padding: 0px; background: none rgb(255, 255, 255); font-family: 'proxima nova rg';"`,
            );

            updateBody = updatedBodyWithAutoHeightAndFonts;

            const dynamicValuesHeader = {
              // logo:
              //   TerminalConfiguration?.IsGodownInfo === 'true'
              //     ? TerminalConfiguration?.GoDownLogoType +
              //       ',' +
              //       TerminalConfiguration?.GoDownLogo
              //     : TerminalConfiguration?.CompanyLogoType +
              //       ',' +
              //       TerminalConfiguration?.CompanyLogo,
              CompanyName_profile:
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration.GoDownName
                  : TerminalConfiguration.CompanyName,

              CCRNumber_profile:
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration.GodownCCRNumber
                  : TerminalConfiguration.CCRNumber,
              VATNumber_profile: TerminalConfiguration?.ValueAddedTaxNumber,
              Page_Title_AR: returnInvoiceNumber
                ? 'استرداد المبيعات'
                : billingType?.name2,
              Page_Title_EN: returnInvoiceNumber
                ? 'استرداد المبيعات'
                : billingType?.name,
              InvoiceDate_value:
                printType === 'reprint' ? billDate : currentDate,
              CreditDateUpto_value: currentDate,
              InvoiceNumber_value:
                printType === 'reprint'
                  ? lastBillDetail.BillNumber
                  : returnInvoiceNumber !== null
                  ? returnInvoiceNumber
                  : invoiceNumber,
              BuyerName_value: buyerInfo?.BuyerName ? buyerInfo.BuyerName : '',
              BuyerCode_value: buyerInfo?.BuyerCode ? buyerInfo.BuyerCode : '',
              VATNumber_value: buyerInfo?.ValueAddedTaxNumber
                ? buyerInfo.ValueAddedTaxNumber
                : '',
              BuyerAddress_value: buyerInfo?.BuyerAddress
                ? buyerInfo.BuyerAddress
                : '',
              CCRNumber_value: buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : '',
            };
            const replacePlaceholdersHeader = (html, values) => {
              let logo =
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration?.GoDownLogo
                  : TerminalConfiguration?.CompanyLogo;
              // Use a placeholder format like {key} for dynamic values
              for (const key in values) {
                const regex = new RegExp(key, 'g');
                html = html.replace(regex, values[key]);
              }

              // Special case: Replace the content of the specific <div> with id="qrcode"
              const qrCodeDivRegex =
                /(<div class="rptImgdiv" [^>]*)style="([^"]*)"([^>]*)>/;

              const matches = html.match(qrCodeDivRegex);
              if (matches) {
                const styleAttributeContent = matches[2];
                console.log(styleAttributeContent);
              } else {
                console.log('No match found.');
              }

              if (qrCodeDivRegex.test(html)) {
                // Replace {your_image_source_here} with the actual base64-encoded qrUrl
                html = html.replace(
                  qrCodeDivRegex,
                  `$1><img src="data:image/png;base64,${logo}" />$3`,
                );
              }

              return html;
            };
            // const replacePlaceholdersHeader = (html, values) => {
            //   for (const key in values) {
            //     const regex = new RegExp(key, 'g');
            //     html = html.replace(regex, values[key]);
            //   }
            //   return html;
            // };

            updateHeader = replacePlaceholdersHeader(
              updateHeader,
              dynamicValuesHeader,
            );
            const thRegex =
              /<th[^>]*id="([^"]*)"[^>]*>(.*?)<.*?>.*?([^<>]*)<\/th>/gi;

            const thMatches = updateBody.matchAll(thRegex);

            const thTags = [];

            for (const match of thMatches) {
              const id = match[1];
              const content = match[2];
              const name = content.trim() || '';
              let finalId = Number(id);
              thTags.push(finalId);
            }
            let tQ = 0;
            let srNum = countNumber * itemPerPage - itemPerPage;
            let updatedBodyAccumulator = updateBody;

            const targetRowId = `trRow${2}`;
            const removeRowRegex = new RegExp(
              `<tr[^>]*\\sid="${targetRowId}"[^>]*>([\\s\\S]*?)<\\/tr>`,
            );
            updatedBodyAccumulator = updatedBodyAccumulator.replace(
              removeRowRegex,
              '',
            );
            // let rowHeight = bodyFinalHeight / selectedProducts.length;
            // rowHeight = Number(rowHeight % 3);
            // rowHeight = `${rowHeight}px`;
            const tdElements = thTags
              .map(tag => {
                return `
                <td
                  style="
                  font-size: 14px;
                  color: black;
                  background-color: transparent;
                  width: 90px; // Adjust width as needed
                  -webkit-print-color-adjust: exact;
                  text-align: center;
                "
              >
              </td>`;
              })
              .join('');
            printItems.forEach((p, index) => {
              srNum = srNum + 1;
              tQ = tQ + p.Quantity;
              let taxRate = Number(p.Tax1Rate + p.Tax2Rate);

              const dynamicValuesBody = {};

              thTags.forEach(id => {
                switch (id) {
                  case 12:
                    dynamicValuesBody[id] = Number(p.GrandAmount).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 16:
                    dynamicValuesBody[id] = Number(p.PriceWithOutTax).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 11:
                    dynamicValuesBody[id] = Number(p.DiscountAmount).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 28:
                    dynamicValuesBody[id] = Number(p.tax).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 22:
                    dynamicValuesBody[id] = Number(taxRate).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 6:
                    dynamicValuesBody[id] = Number(p.PriceOriginal).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 4:
                    dynamicValuesBody[id] = Number(p.Quantity).toFixed(2);
                    break;
                  case 5:
                    dynamicValuesBody[id] = I18nManager.isRTL
                      ? p.UOMName2
                      : p.UOMName;
                    break;
                  case 15:
                    dynamicValuesBody[id] = I18nManager.isRTL
                      ? p.Description
                      : p.Description;
                    break;
                  case 3:
                    dynamicValuesBody[id] = I18nManager.isRTL
                      ? p.ProductName2
                      : p.ProductName;
                    break;
                  case 2:
                    dynamicValuesBody[id] = p.ProductCode ? p.ProductCode : '';
                    break;
                  case 1:
                    dynamicValuesBody[id] = srNum;
                    break;
                  default:
                    // Handle other ids or provide a default value
                    dynamicValuesBody[id] = ''; // Default value, change as needed
                }
              });

              const targetRowIdNew = `trRow${srNum}`;

              let rowContent = `<tr id="${targetRowIdNew}">${tdElements}</tr>`;
              const lastIndex = updatedBodyAccumulator.lastIndexOf('</tr>');

              const existingRowStart = updatedBodyAccumulator.indexOf(
                `<tr id="${targetRowIdNew}"`,
              );
              const existingRowEnd = updatedBodyAccumulator.indexOf(
                '</tr>',
                existingRowStart,
              );

              if (existingRowStart !== -1 && existingRowEnd !== -1) {
                // Replace the content of the existing row
                updatedBodyAccumulator =
                  updatedBodyAccumulator.slice(0, existingRowStart) +
                  `${rowContent}` +
                  updatedBodyAccumulator.slice(existingRowEnd + '</tr>'.length);
              } else {
                // If the row doesn't exist, insert it
                if (lastIndex !== -1) {
                  updatedBodyAccumulator =
                    updatedBodyAccumulator.slice(0, lastIndex) +
                    `<tr id="${targetRowIdNew}">${rowContent}</tr>` +
                    updatedBodyAccumulator.slice(lastIndex);
                }
              }

              rowContent = replaceValuesInRow(
                rowContent,
                dynamicValuesBody,
                thTags,
              );
              const rowRegexNew = new RegExp(
                `<tr[^>]*\\sid="${targetRowIdNew}"[^>]*>([\\s\\S]*?)<\\/tr>`,
              );
              const rowMatchNew = updatedBodyAccumulator.match(rowRegexNew);
              if (rowMatchNew && rowMatchNew.length >= 2) {
                updatedBodyAccumulator = updatedBodyAccumulator.replace(
                  rowMatchNew[0],
                  `<tr id="${targetRowIdNew}">${rowContent}</tr>`,
                  // `<tr id="${targetRowIdNew}" style="height: ${rowHeight};">${rowContent}</tr>`,
                );
              }
            });

            updateBody = updatedBodyAccumulator;

            const dynamicValuesFooter = {
              GrandAmount_value: Number(subPrice).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),

              // GrandAmount_value: numberToEngArbWords(
              //   Number(subPrice).toFixed(
              //     TerminalConfiguration.DecimalsInAmount,
              //   ),
              //   false,
              // ),
              NetAmount_value: Number(totalPrice).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
              // NetAmount_value: numberToEngArbWords(
              //   Number(totalPrice).toFixed(
              //     TerminalConfiguration.DecimalsInAmount,
              //   ),
              //   true,
              // ),
              TaxGroups_value: Number(globalTax + sumOfProductTax).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
              PaymentTypeName_value: I18nManager.isRTL
                ? selectedPyamentMethod?.PaymentTypeName2
                : selectedPyamentMethod?.PaymentTypeName,
              NetAmount_words_EN: numberToEngArbWords(
                Number(totalPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
              NetAmount_words_AR: numberToEngArbWords(
                Number(totalPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
              Instructions_value: customerNotes ? customerNotes : '',
              Company_BankDetail:
                TerminalConfiguration?.CompanyBankDetail !== 'null'
                  ? TerminalConfiguration.CompanyBankDetail
                  : '',
              Company_Email: TerminalConfiguration.CompanyEmail,
              SalesAgentName_value: selectedAgent?.SalesAgentName
                ? selectedAgent?.SalesAgentName
                : TerminalConfiguration?.SalesAgentName,
              ContactNumber_profile: TerminalConfiguration.CompanyPhone
                ? TerminalConfiguration.CompanyPhone
                : '',
              Address_profile:
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration.GoDownAddress
                  : TerminalConfiguration.CompanyAddress,
            };
            // const replacePlaceholdersFooter = (html, values) => {
            //   for (const key in values) {
            //     const regex = new RegExp(key, 'g');
            //     html = html.replace(regex, values[key]);
            //   }
            //   return html;
            // };
            const replacePlaceholdersFooter = (html, values) => {
              // Use a placeholder format like {key} for dynamic values
              for (const key in values) {
                const regex = new RegExp(key, 'g');
                html = html.replace(regex, values[key]);
              }

              // Special case: Replace the content of the specific <div> with id="qrcode"
              const qrCodeDivRegex =
                /(<div class="rptImgdiv" id="qrcode"[^>]*)style="([^"]*)"([^>]*)>/;

              const matches = html.match(qrCodeDivRegex);
              if (matches) {
                const styleAttributeContent = matches[2];
                console.log(styleAttributeContent);
              } else {
                console.log('No match found.');
              }

              if (qrCodeDivRegex.test(html)) {
                // Replace {your_image_source_here} with the actual base64-encoded qrUrl
                html = html.replace(
                  qrCodeDivRegex,
                  `$1><img src="data:image/png;base64,${qrUrl}" style="$2"/>$3`,
                );
              }

              return html;
            };
            updateFooter = replacePlaceholdersFooter(
              updateFooter,
              dynamicValuesFooter,
            );
          } else {
            updateHeader = updateHeader.replace(
              '{{logo}}',
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration?.GoDownLogoType +
                    ',' +
                    TerminalConfiguration?.GoDownLogo
                : TerminalConfiguration?.CompanyLogoType +
                    ',' +
                    TerminalConfiguration?.CompanyLogo,
            );
            updateHeader = updateHeader.replace(
              /{{companyName}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownName
                : TerminalConfiguration.CompanyName,
            );
            updateHeader = updateHeader.replace(
              /{{ccrNumber}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GodownCCRNumber
                : TerminalConfiguration.CCRNumber,
            );
            updateHeader = updateHeader.replace(
              /{{CompanyAddress}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownAddress
                : TerminalConfiguration.CompanyAddress,
            );
            // updateHeader = updateHeader.replace(/1060/g, "1100")
            //updateHeader = updateHeader.replace(/20/g, "20")
            updateHeader = updateHeader.replace(
              /{{vatNumber}}/g,
              TerminalConfiguration?.ValueAddedTaxNumber,
            );

            updateHeader = updateHeader.replace(
              '{{InvoiceTitleArabic}}',
              returnInvoiceNumber ? 'استرداد المبيعات' : billingType?.name2,
            );
            updateHeader = updateHeader.replace(
              '{{InvoiceTitleEnglish}}',
              returnInvoiceNumber ? 'Sales Refund' : billingType?.name,
            );
            updateHeader = updateHeader.replace('{{PDate}}', currentDate);
            updateHeader = updateHeader.replace(
              '{{dateDays}}',
              currentDate.split('/')[0],
            );
            updateHeader = updateHeader.replace(
              '{{dateMonth}}',
              currentDate.split('/')[1],
            );
            updateHeader = updateHeader.replace(
              '{{dateYear}}',
              currentDate.split(/[/" "]/)[2],
            );
            updateHeader = updateHeader.replace(
              /{{record_number}}/g,
              invoiceNumber,
            );
            updateHeader = updateHeader.replace(
              /{{ReturnedBillNumber}}/g,
              returnInvoiceNumber,
            );
            updateHeader = updateHeader.replace(
              /{{InvoiceDate}}/g,
              billDates ? billDates : currentDate.split(' ')[0],
            );
            updateHeader = updateHeader.replace(
              '{{BuyerName}}',
              buyerInfo?.BuyerName ? buyerInfo.BuyerName : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerCode}}',
              buyerInfo?.BuyerCode ? buyerInfo.BuyerCode : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerVat}}',
              buyerInfo?.ValueAddedTaxNumber
                ? buyerInfo.ValueAddedTaxNumber
                : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerCCR}}',
              buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerPhone}}',
              buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerAddress}}',
              buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : '',
            );

            let tQ = 0;
            let srNum = countNumber * itemPerPage - itemPerPage;
            printItems.forEach((p, index) => {
              srNum = srNum + 1;
              tQ = tQ + p.Quantity;
              //  console.log("A4style[0].ReportHeader......", A4style[0].ReportHeader)
              let body = A4style[0].ReportBody;
              body = body.replace('{{SerialNumber}}', srNum);
              body = body.replace('{{ProductCode}}', p.ProductCode);
              body = body.replace(
                '{{Description}}',
                I18nManager.isRTL ? p.ProductName2 : p.ProductName,
              );
              body = body.replace(
                '{{ProductName}}',
                I18nManager.isRTL ? p.ProductName2 : p.ProductName,
              );
              body = body.replace(
                '{{Quantity}}',
                Number(p.Quantity).toFixed(2),
              );
              body = body.replace(
                '{{ProductTax}}',
                Number(p.tax).toFixed(TerminalConfiguration.DecimalsInAmount),
              );
              body = body.replace(
                '{{UnitName}}',
                I18nManager.isRTL ? p.UOMName2 : p.UOMName,
              );
              body = body.replace(
                '{{Price}}',
                Number(p.PriceWithOutTax).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace('{{PriceSIG}}', parseInt(p.PriceWithOutTax));
              body = body.replace(
                '{{PricePoints}}',
                GetDecimalpart(
                  Number(p.PriceWithOutTax).toFixed(
                    TerminalConfiguration.DecimalsInAmount,
                  ),
                ),
              );
              body = body.replace(
                '{{PriceQuantity}}',
                Number(p.PriceWithOutTax * p.Quantity).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{GrandAmount}}',
                Number(p.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{GrandAmountSIG}}',
                parseInt(p.GrandAmount),
              );
              body = body.replace(
                '{{GrandAmountPoints}}',
                GetDecimalpart(
                  Number(p.GrandAmount).toFixed(
                    TerminalConfiguration.DecimalsInAmount,
                  ),
                ),
              );
              body = body.replace(
                '{{Tax1Rate}}',
                Number(p.Tax1Rate).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{Tax2Rate}}',
                Number(p.Tax2Rate).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{Tax1Amount}}',
                Number(p.Tax1Amount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{Tax2Amount}}',
                Number(p.Tax2Amount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace('{{Tax1Name}}', p.Tax1Name);
              body = body.replace('{{Tax2Name}}', p.Tax2Name);
              body = body.replace(
                '{{Discount}}',
                Number(p.DiscountAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace('{{ProductDescription}}', p.IngredientNames);
              body = body.replace('{{ProductBarCode}}', p.ProductBarCode);

              updateBody = updateBody + body;
            });
            // updateFooter = updateFooter.replace(/1060/g, "1100")
            //updateFooter = updateFooter.replace(/30%/g, "20%")
            updateFooter = updateFooter.replace(
              '{{QRImage}}',
              'data:image/png;base64,' + qrUrl,
            );
            updateFooter = updateFooter.replace(
              '{{CompanyStamp}}',
              TerminalConfiguration.CompanyStampType +
                ',' +
                TerminalConfiguration.CompanyStamp,
            );
            updateFooter = updateFooter.replace(
              '{{AmountWithOutTax}}',
              Number(subPrice - sumOfProductTax).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GrandAmountSIG}}',
              parseInt(subPrice),
            );
            updateFooter = updateFooter.replace(
              '{{grandAmountPoints}}',
              GetDecimalpart(
                Number(subPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GlobalDiscountAmount}}',
              Number(globalDiscountAmount + sumOfProductDiscount).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{TaxGroupAmount}}',
              Number(globalTax + sumOfProductTax).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{TaxGroupNames}}',
              globalTaxObj?.globalTaxGroupName
                ? globalTaxObj.globalTaxGroupName
                : 'Global Tax',
            );
            updateFooter = updateFooter.replace(
              '{{Roundoff}}',
              (0).toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            updateFooter = updateFooter.replace(
              '{{CashAdvance}}',
              Number(advancePaidInCash).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{AdvanceAmount}}',
              Number(advancePaidInCash).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{CashPaid}}',
              Number(
                advancePaidInCash ? totalPrice - advancePaidInCash : totalPrice,
              ).toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            updateFooter = updateFooter.replace(
              '{{PaymentMethod}}',
              I18nManager.isRTL
                ? selectedPyamentMethod?.PaymentTypeName2
                : selectedPyamentMethod?.PaymentTypeName,
            );
            console.log('payment method type', selectedPyamentMethod);
            updateFooter = updateFooter.replace('{{companyCurrency}}', '');
            updateFooter = updateFooter.replace(
              '{{NetAmount}}',
              Number(totalPrice).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{CompanyEmail}}',
              TerminalConfiguration.CompanyEmail,
            );
            updateFooter = updateFooter.replace(
              '{{NetAmountSIG}}',
              parseInt(totalPrice),
            );
            updateFooter = updateFooter.replace(
              '{{netAmountPoints}}',
              GetDecimalpart(
                Number(totalPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              ),
            );
            updateFooter = updateFooter.replace(
              '{{TotalQty}}',
              Number(tQ).toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            updateFooter = updateFooter.replace(
              '{{TotalItems}}',
              selectedProducts.length,
            );
            updateFooter = updateFooter.replace(
              '{{NetAmountAR}}',
              numberToEngArbWords(
                Number(totalPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GrandAmountEN}}',
              numberToEngArbWords(
                Number(subPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GrandAmountAR}}',
              numberToEngArbWords(
                Number(subPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{AmountWithOutTaxEN}}',
              numberToEngArbWords(
                Number(subPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{AmountWithOutTaxAR}}',
              numberToEngArbWords(
                Number(subPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GlobalDiscountAmountEN}}',
              numberToEngArbWords(
                Number(globalDiscountAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GlobalDiscountAmountAR}}',
              numberToEngArbWords(
                Number(globalDiscountAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{NetAmountEN}}',
              numberToEngArbWords(
                Number(totalPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{TaxGroupAmount}}',
              Number(globalTax + sumOfProductTax).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            // updateFooter = updateFooter.replace(
            //   '{{TaxGroupAmount}}',
            //   globalTax.toFixed(TerminalConfiguration.DecimalsInAmount),
            // );
            updateFooter = updateFooter.replace(
              '{{TaxGroupNames}}',
              globalTaxObj?.globalTaxGroupName
                ? globalTaxObj.globalTaxGroupName
                : 'ضريبة القيمة المضافة %15 ',
            );
            updateFooter = updateFooter.replace(
              '{{TaxGroupAmountSIG}}',
              parseInt(globalTax),
            );
            updateFooter = updateFooter.replace(
              '{{taxGroupPoints}}',
              GetDecimalpart(
                Number(globalTax).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              ),
            );
            updateFooter = updateFooter.replace('{{TaxGroupsAR}}', '');
            updateFooter = updateFooter.replace('{{TaxGroupsEN}}', '');
            updateFooter = updateFooter.replace(
              /{{CompanyAddress}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownAddress
                : TerminalConfiguration.CompanyAddress,
            );
            updateFooter = updateFooter.replace(
              /{{SalesAgentName}}/g,
              selectedAgent?.SalesAgentName
                ? selectedAgent?.SalesAgentName
                : TerminalConfiguration?.SalesAgentName,
            );

            updateFooter = updateFooter.replace(
              /{{companyName}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownName
                : TerminalConfiguration.CompanyName,
            );
            updateFooter = updateFooter.replace(
              /{{ccrNumber}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GodownCCRNumber
                : TerminalConfiguration.CCRNumber,
            );

            updateFooter = updateFooter.replace(
              /{{vatNumber}}/g,
              TerminalConfiguration?.ValueAddedTaxNumber,
            );

            updateFooter = updateFooter.replace('{{PDate}}', currentDate);
            updateFooter = updateFooter.replace(
              '{{dateDays}}',
              currentDate.split('/')[0],
            );
            updateFooter = updateFooter.replace(
              '{{dateMonth}}',
              currentDate.split('/')[1],
            );
            updateFooter = updateFooter.replace(
              '{{dateYear}}',
              currentDate.split(/[/" "]/)[2],
            );
            updateFooter = updateFooter.replace(
              /{{record_number}}/g,
              invoiceNumber,
            );
            updateFooter = updateFooter.replace(
              /{{ReturnedBillNumber}}/g,
              returnInvoiceNumber,
            );
            updateFooter = updateFooter.replace(
              /{{InvoiceDate}}/g,
              billDates ? billDates : currentDate,
            );
            updateFooter = updateFooter.replace(
              '{{BuyerName}}',
              buyerInfo?.BuyerName ? buyerInfo.BuyerName : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerCode}}',
              buyerInfo?.BuyerCode ? buyerInfo.BuyerCode : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerVat}}',
              buyerInfo?.ValueAddedTaxNumber
                ? buyerInfo.ValueAddedTaxNumber
                : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerCCR}}',
              buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerPhone}}',
              buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerAddress}}',
              buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : '',
            );
            //  updateFooter = updateFooter.replace(/{{CompanyAddress}}/g, saleAgent)

            console.log('updateStyleupdateStyleupdateStyle', updateStyle);
          }

          let check = countNumber * itemPerPage < allProducts.length;

          if (check) {
            // if (reportStyle === 1) {
            //   updateStyle += updateHeader + updateBody + updateFooter;
            // } else if (reportStyle === 2) {
            //   updateStyle += updateBody + updateFooter;

            //   let mainDiv = `<div style="page-break-before:always!important;">${updateStyle}</div>`;

            //   updateStyle += mainDiv;
            // } else if (reportStyle === 3) {
            //   updateStyle += updateHeader + updateBody;
            //   let mainDiv = `<div style="page-break-before:always!important;">${updateStyle}</div>`;

            //   updateStyle += mainDiv;
            // } else if (reportStyle === 4) {
            //   updateStyle += updateBody;
            //   let mainDiv = `<div style="page-break-before:always!important;">${updateStyle}</div>`;

            //   updateStyle += mainDiv;
            // }

            updateStyle =
              updateStyle === ''
                ? updateHeader +
                  updateBody +
                  (IsFooterOnEveryPage === true ? updateFooter : '')
                : updateStyle +
                  updateHeader +
                  updateBody +
                  (IsFooterOnEveryPage === true ? updateFooter : '');

            let c = countNumber + 1;
            pageNo = page + 1;

            A4PrinterStyle(currentDate, qrUrl, c, updateStyle, pageNo);
          } else {
            console.log(updateStyle);
            if (pageNo !== 1) {
              updateStyle =
                updateStyle + updateHeader + updateBody + updateFooter;
            } else {
              updateStyle =
                updateStyle === ''
                  ? updateHeader + updateBody + updateFooter
                  : updateStyle + updateHeader + updateBody + updateFooter;
            }
            console.log('updateStyle1', updateStyle);
            await RNPrint.print({
              html: updateStyle,
            });
          }
        }

        setLoading(false);
        onSaveInvoice();
      },
    );
  };
  const A4RePrinterStyle = async (
    currentDate,
    qrUrl,
    countNumber,
    update,
    detail,
    page,
  ) => {
    // console.log(
    //   'billingType A4PrinterStyle..',
    //   billingType,
    //   ' terminal ',
    //   currentDate,
    //   billDates,
    //   'product are',
    //   detail,
    // );
    lastBillDetail = detail;
    let bdetail = detail;
    let itemPerPage = 17;

    let pageNo = page;
    let printItems = [];
    if (countNumber * itemPerPage < lastBillDetail?.BillDetails.length) {
      let lastIndex = countNumber * itemPerPage;
      let startingIndex = lastIndex - itemPerPage;
      printItems = lastBillDetail?.BillDetails.slice(startingIndex, lastIndex);
    } else {
      // let lastIndex = countNumber * 15
      let startingIndex = countNumber * itemPerPage - itemPerPage;
      printItems = lastBillDetail?.BillDetails.slice(
        startingIndex,
        lastBillDetail?.BillDetails?.length,
      );
    }
    console.log('printItems....', printItems);

    let pageId = returnInvoiceNumber
      ? '403007'
      : billingType?.id === 2
      ? '4030061'
      : '403006';

    // console.log("pageId....", pageId)
    setLoading(true);
    await getDataByMultipaleID(
      A4PrintStylesTable,
      'PageID',
      pageId,
      'UseDefault',
      'true',
      async A4style => {
        //  console.log("A4style", A4style)
        if (A4style.length === 0) {
          setLoading(false);
          alert('There is no A4 printing style available');
        } else {
          if (pageNo !== 1 && update) {
            update = `<div style="page-break-after:always!important;">${update}</div>`;
          }
          let updateStyle = update,
            updateHeader = A4style[0].ReportHeader.replace(
              /<i\b[^>]*>.*?<\/i>/g,
              '',
            ),
            updateBody = A4style[0].ReportBody.replace(
              /<i\b[^>]*>.*?<\/i>/g,
              '',
            ),
            updateFooter = A4style[0].ReportFooter.replace(
              /<i\b[^>]*>.*?<\/i>/g,
              '',
            );

          let heightOfHeader = getHeight(updateHeader, 'dvhmain'); // 440;
          let heightOfFooter = getHeight(updateFooter, 'dvfmain'); // 760;
          let BodyHeightGiven = getHeight(updateBody, 'dvimain'); // 200;

          let IsFooterOnEveryPage =
            A4style[0].IsFooterOnEveryPage === 'true' ? true : false;
          let IsHeaderOnEveryPage =
            A4style[0].IsHeaderOnEveryPage === 'true' ? true : false;

          let findPrintStyle = A4style.findIndex(
            x => x.SerialNo > 1 && x.UseDefault === 'true',
          );
          // let bodyFinalHeight = 510;
          // if (
          //   IsFooterOnEveryPage &&
          //   IsHeaderOnEveryPage &&
          //   selectedProducts.length <= 15
          // ) {
          //   bodyFinalHeight = 400;
          // } else if (!IsFooterOnEveryPage && selectedProducts.length === 15) {
          //   bodyFinalHeight = BodyHeightGiven + heightOfFooter;
          // } else if (!IsHeaderOnEveryPage && selectedProducts.length === 15) {
          //   bodyFinalHeight = BodyHeightGiven + heightOfHeader;
          // } else {
          //   bodyFinalHeight = 400;
          // }

          if (findPrintStyle !== -1) {
            const updatedBodyWithAutoHeightAndFonts = updateBody.replace(
              /id="dvIMain" style=".*?"/,
              `id="dvIMain" style="width: 1100px; height: auto; margin-top:80px; padding: 0px; background: none rgb(255, 255, 255); font-family: 'proxima nova rg';"`,
            );

            updateBody = updatedBodyWithAutoHeightAndFonts;

            const dynamicValuesHeader = {
              // logo:
              //   TerminalConfiguration?.IsGodownInfo === 'true'
              //     ? TerminalConfiguration?.GoDownLogoType +
              //       ',' +
              //       TerminalConfiguration?.GoDownLogo
              //     : TerminalConfiguration?.CompanyLogoType +
              //       ',' +
              //       TerminalConfiguration?.CompanyLogo,
              CompanyName_profile:
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration.GoDownName
                  : TerminalConfiguration.CompanyName,

              CCRNumber_profile:
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration.GodownCCRNumber
                  : TerminalConfiguration.CCRNumber,
              VATNumber_profile: TerminalConfiguration?.ValueAddedTaxNumber,
              Page_Title_AR: returnInvoiceNumber
                ? 'استرداد المبيعات'
                : billingType?.name2,
              Page_Title_EN: returnInvoiceNumber
                ? 'استرداد المبيعات'
                : billingType?.name,
              InvoiceDate_value: lastBillDetail.BillDate,
              CreditDateUpto_value: currentDate,
              InvoiceNumber_value: lastBillDetail.BillNumber,
              BuyerName_value: lastBillDetail?.BuyerName
                ? lastBillDetail.BuyerName
                : '',
              BuyerCode_value: lastBillDetail?.BuyerCode
                ? lastBillDetail.BuyerCode
                : '',
              VATNumber_value: lastBillDetail?.ValueAddedTaxNumber
                ? lastBillDetail.ValueAddedTaxNumber
                : '',
              BuyerAddress_value: lastBillDetail?.BuyerAddress
                ? lastBillDetail.BuyerAddress
                : '',
              CCRNumber_value: lastBillDetail?.CCRNumber
                ? lastBillDetail.CCRNumber
                : '',
            };
            const replacePlaceholdersHeader = (html, values) => {
              let logo =
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration?.GoDownLogo
                  : TerminalConfiguration?.CompanyLogo;
              // Use a placeholder format like {key} for dynamic values
              for (const key in values) {
                const regex = new RegExp(key, 'g');
                html = html.replace(regex, values[key]);
              }

              // Special case: Replace the content of the specific <div> with id="qrcode"
              const qrCodeDivRegex =
                /(<div class="rptImgdiv" [^>]*)style="([^"]*)"([^>]*)>/;

              const matches = html.match(qrCodeDivRegex);
              if (matches) {
                const styleAttributeContent = matches[2];
                console.log(styleAttributeContent);
              } else {
                console.log('No match found.');
              }

              if (qrCodeDivRegex.test(html)) {
                // Replace {your_image_source_here} with the actual base64-encoded qrUrl
                html = html.replace(
                  qrCodeDivRegex,
                  `$1><img src="data:image/png;base64,${logo}" />$3`,
                );
              }

              return html;
            };
            // const replacePlaceholdersHeader = (html, values) => {
            //   for (const key in values) {
            //     const regex = new RegExp(key, 'g');
            //     html = html.replace(regex, values[key]);
            //   }
            //   return html;
            // };

            updateHeader = replacePlaceholdersHeader(
              updateHeader,
              dynamicValuesHeader,
            );
            const thRegex =
              /<th[^>]*id="([^"]*)"[^>]*>(.*?)<.*?>.*?([^<>]*)<\/th>/gi;

            const thMatches = updateBody.matchAll(thRegex);

            const thTags = [];

            for (const match of thMatches) {
              const id = match[1];
              const content = match[2];
              const name = content.trim() || '';
              let finalId = Number(id);
              thTags.push(finalId);
            }
            let tQ = 0;
            let srNum = countNumber * itemPerPage - itemPerPage;
            let updatedBodyAccumulator = updateBody;

            const targetRowId = `trRow${2}`;
            const removeRowRegex = new RegExp(
              `<tr[^>]*\\sid="${targetRowId}"[^>]*>([\\s\\S]*?)<\\/tr>`,
            );
            updatedBodyAccumulator = updatedBodyAccumulator.replace(
              removeRowRegex,
              '',
            );
            // let rowHeight = bodyFinalHeight / selectedProducts.length;
            // rowHeight = Number(rowHeight % 3);
            // rowHeight = `${rowHeight}px`;
            const tdElements = thTags
              .map(tag => {
                return `
                <td
                  style="
                  font-size: 14px;
                  color: black;
                  background-color: transparent;
                  width: 90px; // Adjust width as needed
                  -webkit-print-color-adjust: exact;
                  text-align: center;
                "
              >
              </td>`;
              })
              .join('');
            printItems.forEach((p, index) => {
              srNum = srNum + 1;
              tQ = tQ + p.Quantity;
              let taxRate = Number(p.Tax1Rate + p.Tax2Rate);

              const dynamicValuesBody = {};

              thTags.forEach(id => {
                switch (id) {
                  case 12:
                    dynamicValuesBody[id] = Number(p.GrandAmount).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 16:
                    dynamicValuesBody[id] = Number(p.PriceWithOutTax).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 11:
                    dynamicValuesBody[id] = Number(p.DiscountAmount).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 28:
                    dynamicValuesBody[id] = Number(p.tax).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 22:
                    dynamicValuesBody[id] = Number(taxRate).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 6:
                    dynamicValuesBody[id] = Number(p.PriceOriginal).toFixed(
                      TerminalConfiguration.DecimalsInAmount,
                    );
                    break;
                  case 4:
                    dynamicValuesBody[id] = Number(p.Quantity).toFixed(2);
                    break;
                  case 5:
                    dynamicValuesBody[id] = I18nManager.isRTL
                      ? p.UOMName2
                      : p.UOMName;
                    break;
                  case 15:
                    dynamicValuesBody[id] = I18nManager.isRTL
                      ? p.Description
                      : p.Description;
                    break;
                  case 3:
                    dynamicValuesBody[id] = I18nManager.isRTL
                      ? p.ProductName2
                      : p.ProductName;
                    break;
                  case 2:
                    dynamicValuesBody[id] = p.ProductCode ? p.ProductCode : '';
                    break;
                  case 1:
                    dynamicValuesBody[id] = srNum;
                    break;
                  default:
                    // Handle other ids or provide a default value
                    dynamicValuesBody[id] = ''; // Default value, change as needed
                }
              });

              const targetRowIdNew = `trRow${srNum}`;

              let rowContent = `<tr id="${targetRowIdNew}">${tdElements}</tr>`;
              const lastIndex = updatedBodyAccumulator.lastIndexOf('</tr>');

              const existingRowStart = updatedBodyAccumulator.indexOf(
                `<tr id="${targetRowIdNew}"`,
              );
              const existingRowEnd = updatedBodyAccumulator.indexOf(
                '</tr>',
                existingRowStart,
              );

              if (existingRowStart !== -1 && existingRowEnd !== -1) {
                // Replace the content of the existing row
                updatedBodyAccumulator =
                  updatedBodyAccumulator.slice(0, existingRowStart) +
                  `${rowContent}` +
                  updatedBodyAccumulator.slice(existingRowEnd + '</tr>'.length);
              } else {
                // If the row doesn't exist, insert it
                if (lastIndex !== -1) {
                  updatedBodyAccumulator =
                    updatedBodyAccumulator.slice(0, lastIndex) +
                    `<tr id="${targetRowIdNew}">${rowContent}</tr>` +
                    updatedBodyAccumulator.slice(lastIndex);
                }
              }

              rowContent = replaceValuesInRow(
                rowContent,
                dynamicValuesBody,
                thTags,
              );
              const rowRegexNew = new RegExp(
                `<tr[^>]*\\sid="${targetRowIdNew}"[^>]*>([\\s\\S]*?)<\\/tr>`,
              );
              const rowMatchNew = updatedBodyAccumulator.match(rowRegexNew);
              if (rowMatchNew && rowMatchNew.length >= 2) {
                updatedBodyAccumulator = updatedBodyAccumulator.replace(
                  rowMatchNew[0],
                  `<tr id="${targetRowIdNew}">${rowContent}</tr>`,
                  // `<tr id="${targetRowIdNew}" style="height: ${rowHeight};">${rowContent}</tr>`,
                );
              }
            });

            updateBody = updatedBodyAccumulator;

            const dynamicValuesFooter = {
              GrandAmount_value: Number(subPrice).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),

              // GrandAmount_value: numberToEngArbWords(
              //   Number(subPrice).toFixed(
              //     TerminalConfiguration.DecimalsInAmount,
              //   ),
              //   false,
              // ),
              NetAmount_value: Number(totalPrice).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
              // NetAmount_value: numberToEngArbWords(
              //   Number(totalPrice).toFixed(
              //     TerminalConfiguration.DecimalsInAmount,
              //   ),
              //   true,
              // ),
              TaxGroups_value: Number(globalTax + sumOfProductTax).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
              PaymentTypeName_value: I18nManager.isRTL
                ? selectedPyamentMethod?.PaymentTypeName2
                : selectedPyamentMethod?.PaymentTypeName,
              NetAmount_words_EN: numberToEngArbWords(
                Number(totalPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
              NetAmount_words_AR: numberToEngArbWords(
                Number(totalPrice).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
              Instructions_value: customerNotes ? customerNotes : '',
              Company_BankDetail:
                TerminalConfiguration?.CompanyBankDetail !== 'null'
                  ? TerminalConfiguration.CompanyBankDetail
                  : '',
              Company_Email: TerminalConfiguration.CompanyEmail,
              SalesAgentName_value: selectedAgent?.SalesAgentName
                ? selectedAgent?.SalesAgentName
                : TerminalConfiguration?.SalesAgentName,
              ContactNumber_profile: TerminalConfiguration.CompanyPhone
                ? TerminalConfiguration.CompanyPhone
                : '',
              Address_profile:
                TerminalConfiguration?.IsGodownInfo === 'true'
                  ? TerminalConfiguration.GoDownAddress
                  : TerminalConfiguration.CompanyAddress,
            };
            // const replacePlaceholdersFooter = (html, values) => {
            //   for (const key in values) {
            //     const regex = new RegExp(key, 'g');
            //     html = html.replace(regex, values[key]);
            //   }
            //   return html;
            // };
            const replacePlaceholdersFooter = (html, values) => {
              // Use a placeholder format like {key} for dynamic values
              for (const key in values) {
                const regex = new RegExp(key, 'g');
                html = html.replace(regex, values[key]);
              }

              // Special case: Replace the content of the specific <div> with id="qrcode"
              const qrCodeDivRegex =
                /(<div class="rptImgdiv" id="qrcode"[^>]*)style="([^"]*)"([^>]*)>/;

              const matches = html.match(qrCodeDivRegex);
              if (matches) {
                const styleAttributeContent = matches[2];
                console.log(styleAttributeContent);
              } else {
                console.log('No match found.');
              }

              if (qrCodeDivRegex.test(html)) {
                // Replace {your_image_source_here} with the actual base64-encoded qrUrl
                html = html.replace(
                  qrCodeDivRegex,
                  `$1><img src="data:image/png;base64,${qrUrl}" style="$2"/>$3`,
                );
              }

              return html;
            };
            updateFooter = replacePlaceholdersFooter(
              updateFooter,
              dynamicValuesFooter,
            );
          } else {
            updateHeader = updateHeader.replace(
              '{{logo}}',
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration?.GoDownLogoType +
                    ',' +
                    TerminalConfiguration?.GoDownLogo
                : TerminalConfiguration?.CompanyLogoType +
                    ',' +
                    TerminalConfiguration?.CompanyLogo,
            );
            updateHeader = updateHeader.replace(
              /{{companyName}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownName
                : TerminalConfiguration.CompanyName,
            );
            updateHeader = updateHeader.replace(
              /{{ccrNumber}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GodownCCRNumber
                : TerminalConfiguration.CCRNumber,
            );
            updateHeader = updateHeader.replace(
              /{{CompanyAddress}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownAddress
                : TerminalConfiguration.CompanyAddress,
            );
            // updateHeader = updateHeader.replace(/1060/g, "1100")
            //updateHeader = updateHeader.replace(/20/g, "20")
            updateHeader = updateHeader.replace(
              /{{vatNumber}}/g,
              TerminalConfiguration?.ValueAddedTaxNumber,
            );

            updateHeader = updateHeader.replace(
              '{{InvoiceTitleArabic}}',
              returnInvoiceNumber ? 'استرداد المبيعات' : billingType?.name2,
            );
            updateHeader = updateHeader.replace(
              '{{InvoiceTitleEnglish}}',
              returnInvoiceNumber ? 'Sales Refund' : billingType?.name,
            );
            updateHeader = updateHeader.replace('{{PDate}}', currentDate);
            updateHeader = updateHeader.replace(
              '{{dateDays}}',
              currentDate.split('/')[0],
            );
            updateHeader = updateHeader.replace(
              '{{dateMonth}}',
              currentDate.split('/')[1],
            );
            updateHeader = updateHeader.replace(
              '{{dateYear}}',
              currentDate.split(/[/" "]/)[2],
            );

            updateHeader = updateHeader.replace(
              /{{record_number}}/g,
              bdetail.BillNumber,
            );
            updateHeader = updateHeader.replace(
              /{{ReturnedBillNumber}}/g,
              returnInvoiceNumber,
            );
            updateHeader = updateHeader.replace(
              /{{InvoiceDate}}/g,
              billDates ? billDates : currentDate.split(' ')[0],
            );
            updateHeader = updateHeader.replace(
              '{{BuyerName}}',
              bdetail.BuyerName,
            );
            updateHeader = updateHeader.replace(
              '{{BuyerCode}}',
              bdetail?.BuyerCode ? bdetail.BuyerCode : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerVat}}',
              bdetail?.BuyerVAT ? bdetail.BuyerVAT : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerCCR}}',
              buyerInfo?.BuyerCCR ? buyerInfo.BuyerCCR : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerPhone}}',
              buyerInfo?.BuyerPhone ? buyerInfo.BuyerPhone : '',
            );
            updateHeader = updateHeader.replace(
              '{{BuyerAddress}}',
              buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : '',
            );

            // updateHeader = updateHeader.replace(
            //   /{{record_number}}/g,
            //   lastBillDetail.BillNumber,
            // );
            // updateHeader = updateHeader.replace(
            //   /{{ReturnedBillNumber}}/g,
            //   returnInvoiceNumber,
            // );
            // updateHeader = updateHeader.replace(
            //   /{{InvoiceDate}}/g,
            //   billDates ? billDates : currentDate.split(' ')[0],
            // );
            // updateHeader = updateHeader.replace(
            //   '{{BuyerName}}',
            //   lastBillDetail.BuyerName,
            // );
            // updateHeader = updateHeader.replace(
            //   '{{BuyerCode}}',
            //   lastBillDetail.BuyerCode,
            // );
            // updateHeader = updateHeader.replace(
            //   '{{BuyerVat}}',
            //   buyerInfo?.ValueAddedTaxNumber ? buyerInfo.ValueAddedTaxNumber : '',
            // );
            // updateHeader = updateHeader.replace(
            //   '{{BuyerCCR}}',
            //   buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : '',
            // );
            // updateHeader = updateHeader.replace(
            //   '{{BuyerPhone}}',
            //   buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : '',
            // );
            // updateHeader = updateHeader.replace(
            //   '{{BuyerAddress}}',
            //   buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : '',
            // );
            let prodTax = 0;
            let prodDis = 0;
            let tQ = 0;
            let srNum = countNumber * itemPerPage - itemPerPage;
            printItems.forEach((p, index) => {
              srNum = srNum + 1;
              prodTax = prodTax + p.tax;
              prodDis = prodDis + p.DiscountAmount;
              tQ = tQ + p.Quantity;
              //  console.log("A4style[0].ReportHeader......", A4style[0].ReportHeader)
              let body = A4style[0].ReportBody;
              body = body.replace('{{SerialNumber}}', srNum);
              body = body.replace('{{ProductCode}}', p.ProductCode);
              body = body.replace(
                '{{Description}}',
                I18nManager.isRTL ? p.ProductName2 : p.ProductName,
              );
              body = body.replace(
                '{{ProductName}}',
                I18nManager.isRTL ? p.ProductName2 : p.ProductName,
              );
              body = body.replace(
                '{{Quantity}}',
                Number(p.Quantity).toFixed(2),
              );
              body = body.replace(
                '{{ProductTax}}',
                Number(p.tax).toFixed(TerminalConfiguration.DecimalsInAmount),
              );
              body = body.replace(
                '{{UnitName}}',
                I18nManager.isRTL ? p.UOMName2 : p.UOMName,
              );
              body = body.replace(
                '{{Price}}',
                Number(p.PriceWithOutTax).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace('{{PriceSIG}}', parseInt(p.PriceWithOutTax));
              body = body.replace(
                '{{PricePoints}}',
                GetDecimalpart(
                  Number(p.PriceWithOutTax).toFixed(
                    TerminalConfiguration.DecimalsInAmount,
                  ),
                ),
              );
              body = body.replace(
                '{{PriceQuantity}}',
                Number(p.PriceWithOutTax * p.Quantity).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{GrandAmount}}',
                Number(p.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{GrandAmountSIG}}',
                parseInt(p.GrandAmount),
              );
              body = body.replace(
                '{{GrandAmountPoints}}',
                GetDecimalpart(
                  Number(p.GrandAmount).toFixed(
                    TerminalConfiguration.DecimalsInAmount,
                  ),
                ),
              );
              body = body.replace(
                '{{Tax1Rate}}',
                Number(p.Tax1Rate).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{Tax2Rate}}',
                Number(p.Tax2Rate).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{Tax1Amount}}',
                Number(p.Tax1Amount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace(
                '{{Tax2Amount}}',
                Number(p.Tax2Amount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace('{{Tax1Name}}', p.Tax1Name);
              body = body.replace('{{Tax2Name}}', p.Tax2Name);
              body = body.replace(
                '{{Discount}}',
                Number(p.DiscountAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              );
              body = body.replace('{{ProductDescription}}', p.IngredientNames);
              body = body.replace('{{ProductBarCode}}', p.ProductBarCode);

              updateBody = updateBody + body;
            });
            lastBillDetail = bdetail;
            console.log('product tax of all products', prodTax);
            // updateFooter = updateFooter.replace(/1060/g, "1100")
            //updateFooter = updateFooter.replace(/30%/g, "20%")
            updateFooter = updateFooter.replace(
              '{{QRImage}}',
              'data:image/png;base64,' + qrUrl,
            );
            updateFooter = updateFooter.replace(
              '{{CompanyStamp}}',
              TerminalConfiguration.CompanyStampType +
                ',' +
                TerminalConfiguration.CompanyStamp,
            );
            lastBillDetail = bdetail;
            updateFooter = updateFooter.replace(
              '{{AmountWithOutTax}}',
              Number(lastBillDetail.GrandAmount - prodTax).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GrandAmountSIG}}',
              parseInt(lastBillDetail.GrandAmount),
            );
            updateFooter = updateFooter.replace(
              '{{grandAmountPoints}}',
              GetDecimalpart(
                Number(lastBillDetail.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GlobalDiscountAmount}}',
              Number(lastBillDetail.GlobalDiscountAmount + prodDis).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            // updateFooter = updateFooter.replace(
            //   '{{TaxGroupAmount}}',
            //   Number(
            //     lastBillDetail.GlobalTax1Amount + lastBillDetail.GlobalTax2Amount,
            //   ).toFixed(TerminalConfiguration.DecimalsInAmount),
            // );

            updateFooter = updateFooter.replace(
              '{{TaxGroupAmount}}',
              Number(
                bdetail.GlobalTax1Amount + bdetail.GlobalTax2Amount + prodTax,
              ).toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            // updateFooter = updateFooter.replace(
            //   '{{TaxGroupNames}}',
            //   globalTaxObj?.globalTaxGroupName
            //     ? globalTaxObj.globalTaxGroupName
            //     : 'Global Tax',
            // );
            updateFooter = updateFooter.replace(
              '{{Roundoff}}',
              (0).toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            updateFooter = updateFooter.replace(
              '{{CashAdvance}}',
              Number(lastBillDetail.AdvancePaidInCash).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{AdvanceAmount}}',
              Number(lastBillDetail.AdvancePaidInCash).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{CashPaid}}',
              Number(
                lastBillDetail.AdvancePaidInCash
                  ? lastBillDetail.NetAmount - lastBillDetail.AdvancePaidInCash
                  : lastBillDetail.NetAmount,
              ).toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            updateFooter = updateFooter.replace(
              '{{PaymentMethod}}',
              bdetail?.PaymentTypeName,
            );
            updateFooter = updateFooter.replace('{{companyCurrency}}', '');
            updateFooter = updateFooter.replace(
              '{{NetAmount}}',
              Number(lastBillDetail.NetAmount).toFixed(
                TerminalConfiguration.DecimalsInAmount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{NetAmountSIG}}',
              parseInt(lastBillDetail.NetAmount),
            );
            updateFooter = updateFooter.replace(
              '{{netAmountPoints}}',
              GetDecimalpart(
                Number(lastBillDetail.NetAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
              ),
            );
            updateFooter = updateFooter.replace(
              '{{TotalQty}}',
              Number(tQ).toFixed(TerminalConfiguration.DecimalsInAmount),
            );
            updateFooter = updateFooter.replace(
              '{{TotalItems}}',
              bdetail.length,
            );
            updateFooter = updateFooter.replace(
              '{{NetAmountAR}}',
              numberToEngArbWords(
                Number(bdetail.NetAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GrandAmountEN}}',
              numberToEngArbWords(
                Number(bdetail.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GrandAmountAR}}',
              numberToEngArbWords(
                Number(bdetail.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{AmountWithOutTaxEN}}',
              numberToEngArbWords(
                Number(bdetail.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{AmountWithOutTaxAR}}',
              numberToEngArbWords(
                Number(bdetail.GrandAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GlobalDiscountAmountEN}}',
              numberToEngArbWords(
                Number(bdetail.GlobalDiscountAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{GlobalDiscountAmountAR}}',
              numberToEngArbWords(
                Number(bdetail.GlobalDiscountAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                false,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{NetAmountEN}}',
              numberToEngArbWords(
                Number(bdetail.NetAmount).toFixed(
                  TerminalConfiguration.DecimalsInAmount,
                ),
                true,
              ),
            );
            // updateFooter = updateFooter.replace(
            //   '{{TaxGroupAmount}}',
            //   Number(
            //     bdetail.GlobalTax1Amount + bdetail.GlobalTax2Amount + prodTax,
            //   ).toFixed(TerminalConfiguration.DecimalsInAmount),
            // );
            lastBillDetail = bdetail;
            updateFooter = updateFooter.replace(
              '{{TaxGroupNames}}',
              globalTaxObj?.globalTaxGroupName
                ? globalTaxObj.globalTaxGroupName
                : 'ضريبة القيمة المضافة %15 ',
            );
            updateFooter = updateFooter.replace(
              '{{TaxGroupAmountSIG}}',
              parseInt(
                lastBillDetail.GlobalTax1Amount +
                  lastBillDetail.GlobalTax2Amount,
              ),
            );
            updateFooter = updateFooter.replace(
              '{{taxGroupPoints}}',
              GetDecimalpart(
                Number(
                  lastBillDetail.GlobalTax1Amount +
                    lastBillDetail.GlobalTax2Amount,
                ).toFixed(TerminalConfiguration.DecimalsInAmount),
              ),
            );
            updateFooter = updateFooter.replace('{{TaxGroupsAR}}', '');
            updateFooter = updateFooter.replace('{{TaxGroupsEN}}', '');
            updateFooter = updateFooter.replace(
              /{{CompanyAddress}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownAddress
                : TerminalConfiguration.CompanyAddress,
            );
            updateFooter = updateFooter.replace(
              /{{SalesAgentName}}/g,
              selectedAgent?.SalesAgentName
                ? selectedAgent?.SalesAgentName
                : TerminalConfiguration?.SalesAgentName,
            );

            updateFooter = updateFooter.replace(
              /{{companyName}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GoDownName
                : TerminalConfiguration.CompanyName,
            );
            updateFooter = updateFooter.replace(
              /{{ccrNumber}}/g,
              TerminalConfiguration?.IsGodownInfo === 'true'
                ? TerminalConfiguration.GodownCCRNumber
                : TerminalConfiguration.CCRNumber,
            );

            updateFooter = updateFooter.replace(
              /{{vatNumber}}/g,
              TerminalConfiguration?.ValueAddedTaxNumber,
            );

            updateFooter = updateFooter.replace('{{PDate}}', currentDate);
            updateFooter = updateFooter.replace(
              '{{dateDays}}',
              currentDate.split('/')[0],
            );
            updateFooter = updateFooter.replace(
              '{{dateMonth}}',
              currentDate.split('/')[1],
            );
            updateFooter = updateFooter.replace(
              '{{dateYear}}',
              currentDate.split(/[/" "]/)[2],
            );
            updateFooter = updateFooter.replace(
              /{{record_number}}/g,
              lastBillDetail.BillNumber,
            );
            updateFooter = updateFooter.replace(
              /{{ReturnedBillNumber}}/g,
              returnInvoiceNumber,
            );
            updateFooter = updateFooter.replace(
              /{{InvoiceDate}}/g,
              billDates ? billDates : currentDate,
            );
            updateFooter = updateFooter.replace(
              '{{BuyerName}}',
              buyerInfo?.BuyerName ? buyerInfo.BuyerName : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerCode}}',
              buyerInfo?.BuyerCode ? buyerInfo.BuyerCode : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerVat}}',
              buyerInfo?.ValueAddedTaxNumber
                ? buyerInfo.ValueAddedTaxNumber
                : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerCCR}}',
              buyerInfo?.CCRNumber ? buyerInfo.CCRNumber : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerPhone}}',
              buyerInfo?.PrimaryPhone ? buyerInfo.PrimaryPhone : '',
            );
            updateFooter = updateFooter.replace(
              '{{BuyerAddress}}',
              buyerInfo?.BuyerAddress ? buyerInfo.BuyerAddress : '',
            );
          }

          let check = countNumber * itemPerPage < printItems.length;

          if (check) {
            // if (reportStyle === 1) {
            //   updateStyle += updateHeader + updateBody + updateFooter;
            // } else if (reportStyle === 2) {
            //   updateStyle += updateBody + updateFooter;

            //   let mainDiv = `<div style="page-break-before:always!important;">${updateStyle}</div>`;

            //   updateStyle += mainDiv;
            // } else if (reportStyle === 3) {
            //   updateStyle += updateHeader + updateBody;
            //   let mainDiv = `<div style="page-break-before:always!important;">${updateStyle}</div>`;

            //   updateStyle += mainDiv;
            // } else if (reportStyle === 4) {
            //   updateStyle += updateBody;
            //   let mainDiv = `<div style="page-break-before:always!important;">${updateStyle}</div>`;

            //   updateStyle += mainDiv;
            // }

            updateStyle =
              updateStyle === ''
                ? updateHeader +
                  updateBody +
                  (IsFooterOnEveryPage === true ? updateFooter : '')
                : updateStyle +
                  updateHeader +
                  updateBody +
                  (IsFooterOnEveryPage === true ? updateFooter : '');

            let c = countNumber + 1;
            pageNo = page + 1;

            A4RePrinterStyle(
              currentDate,
              qrUrl,
              c,
              updateStyle,
              bdetail,
              pageNo,
            );
          } else {
            console.log(updateStyle);
            if (pageNo !== 1) {
              updateStyle =
                updateStyle + updateHeader + updateBody + updateFooter;
            } else {
              updateStyle =
                updateStyle === ''
                  ? updateHeader + updateBody + updateFooter
                  : updateStyle + updateHeader + updateBody + updateFooter;
            }
            console.log('updateStyle1', updateStyle);
            await RNPrint.print({
              html: updateStyle,
            });
          }

          //  updateFooter = updateFooter.replace(/{{CompanyAddress}}/g, saleAgent)
          //console.log("updateStyleupdateStyleupdateStyle", updateHeader)
          // updateStyle = updateHeader + updateBody + updateFooter;
          // console.log('updateStyleupdateStyleupdateStyle', updateStyle);
          // await RNPrint.print({
          //   html: updateStyle,
          // });
        }
        setLoading(false);
        onSaveInvoice();
        lastBillDetail = null;
      },
    );
  };
  useMemo(() => {
    paymentMethodSelect();
  }, [paymentsValue]);

  useEffect(() => {
    otherOptions();
  }, [optionsValue]);

  const otherOptions = async () => {
    // console.log("paymentsValue in buyer optionsValue", optionsValue)

    if (optionsValue === 'holdInvoice') {
      setPrintType(null);
      if (selectedProducts.length > 0) {
        setMessage(props.StringsList._78);
        setAlertType('holdInvoice');
        setDisplayAlert(true);
        setisPromptAlert(true);
        // holdInvoiceFun();
      } else {
        let msg = errorMessages.GetCounterMessage(
          'noItemUnableHold',
          props.StringsList,
        );
        setMessage(msg);
        setDisplayAlert(true);
        seOptionsValue(null);
      }
    } else if (optionsValue === 'getHoldInvoice') {
      setPrintType(null);
      setisHoldInvoices(true);
      seOptionsValue(null);
      // getHoldInvoiveFun();
    } else if (optionsValue === 'scanner') {
      setPrintType(null);
      setScanner(true);
      seOptionsValue(null);
    } else if (optionsValue === 'returnBill') {
      setPrintType('returnBill');
      setMessage(props.StringsList._63);
      setAlertType('returnInvoice');
      let num = await getLastInvoiceNumber();
      setAlertValue(num);
      setDisplayAlert(true);
      setisPromptAlert(true);
    } else if (optionsValue === 'reprint') {
      setPrintType('reprint');
      let num = await getLastInvoiceNumber();
      setAlertValue(num);
      setMessage(props.StringsList._63);
      setAlertType('reprint');
      setDisplayAlert(true);
      setisPromptAlert(true);
    } else if (optionsValue === 'buyer') {
      setPrintType(null);
      //  console.log("paymentsValue in buyer", paymentsValue, isBuyer, buyerViewRef, viewref)
      if (!isBuyer) {
        buyerViewRef.current?.slideInRight(280);
        setisBuyer(!isBuyer);
      } else {
        setPrintType(null);
        // console.log("paymentsValue in buyer else")
        seOptionsValue(null);
        buyerViewRef.current?.fadeOutRight().then(() => setisBuyer(!isBuyer));
      }
    } else if (optionsValue === 'loyaltyCard') {
      setPrintType(null);
      // console.log("paymentsValue in buyer", redeemPoints)
      if (!isLoyaltyCard) {
        loyaltyCardViewRef.current?.slideInRight(280);
        setIsLoyaltyCard(!isLoyaltyCard);
      } else {
        seOptionsValue(null);
        setPrintType(null);
        loyaltyCardViewRef.current
          ?.fadeOutRight()
          .then(() => setIsLoyaltyCard(!isLoyaltyCard));
      }
    }
  };

  const getLastInvoiceNumber = async () => {
    let number = '';
    await getData(TerminalConfigurationTable, cb => {
      // console.log('TerminalConfigurationTable', cb[0]?.LastBillNumber);

      let preZero = '0000000';
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
          ? cb[0].BillPrefix + '-' + Number(cb[0].LastBillNumber)
          : cb[0].BillPrefix +
            '-' +
            preZero.slice(1 - silceNumber) +
            Number(cb[0].LastBillNumber);
      number = invoiceNumber;
    });
    // console.log('last bill number', number);
    return number;
  };

  const onChangeText = (type, text, item) => {
    if (type === 'holdInvoice') {
      setHoldInvoiceName(text);
      setAlertValue(text);
    } else if (type === 'returnInvoice' || type === 'reprint') {
      setAlertValue(text);
    } else if (type === 'searchText') {
      setSearchText(text);
    } else if (type === 'ingredient') {
      setIngredientText(text);
      setAlertValue(text);
    } else {
      if (!isNaN(text)) {
        console.log('the value of this is', text);
        setmanuallyCount(Number(text));
      } else {
        console.log('the value of this is', text);
        setmanuallyCount(Number(0));
      }
    }
  };

  const onEndEditing = (type, item) => {
    if (type === 'manuallyCount') {
      onManuallyAddCount(item);
    } else if (type === 'DiscountAmount') {
      onManuallyAddDiscount(item, 'DiscountAmount');
    } else if (type === 'DiscountRate') {
      onManuallyAddDiscount(item, 'DiscountRate');
    } else if (type === 'globalDiscount') {
      globalDiscountAmountFun(type);
    } else if (type === 'globalDiscountP') {
      globalDiscountAmountFun(type);
    } else if (type === 'cashPaid') {
      cashPaidAmountFun();
    } else if (type === 'changePrice') {
      onManuallyChangePrice(item);
    }
  };

  const searchTextFun = e => {
    //  console.log("searchText", searchText)

    let text = searchText.toLowerCase();
    let filteredName = [];
    //console.log('text...', text || text !== '');
    if (text && text !== '') {
      //console.log("searchText..", text.length)
      setbarCodeText(text);

      if (barCode) {
        setLoading(true);
        onSuccessScan(text);
        ref_searchBar.current.focus();
        setSearchText('');
      } else {
        getData(UpdateProductDetailListTable, productsDetail => {
          // console.log('all products,  ', productsDetail);

          productsDetail.forEach(item => {
            if (
              item.ProductName.toLowerCase().includes(text) ||
              item.ProductCode.toLowerCase().includes(text) ||
              item.ProductName2.toLowerCase().includes(text)
            ) {
              filteredName.push(item);
            }
          });
          setCategoryProducts(filteredName);
          setLoading(false);
        });
      }
    } else {
      if (!barCode) {
        getAllCategories(null);
      }
      setLoading(false);
    }
  };

  const toggleSearchScan = () => {
    setBarCode(!barCode);
    ref_searchBar.current.focus();
    setbarCodeText('');
    //  Keyboard.dismiss()
  };

  const onCapture = uri => {
    captureRef(viewShotRef.current, {
      format: 'png',
      quality: 1.0,
    }).then(
      urii => {
        // setUriImage(urii);
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const onQRImage = () => {
    // console.log('invoice info object.............');
    captureRef(qrRef2.current, {
      format: 'png',
      quality: 1.0,
      height: sizeHelper.height,
      width: sizeHelper.width,
    }).then(
      async urii => {
        setUriImage(urii);
        console.log(
          'invoice info object',
          globalDiscountAmount,
          sumOfProductDiscount,
        );
        // console.log('setUriImage object.............', urii);
        let invoiceTypeE = !companyVATRegistor
          ? ' Ordinary sales invoice'
          : totalPrice < 1000
          ? 'Simplified tax invoice'
          : 'Tax invoice';
        let invoiceTypeA = !companyVATRegistor
          ? 'فاتورة مبيعات عادية'
          : totalPrice < 1000
          ? 'فاتورة ضريبية مبسطة'
          : 'فاتورة ضريبية';
        let currentDate = moment().format('DD/MM/YYYY HH:mm:ss');

        //         let whiteSpaceName = "";
        //         if (w[w.length - 1].length < 12) {
        //           whiteSpaceName = "            "
        //           // console.log("whiteSpace before trim", whiteSpaceName.length)
        //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
        //           // console.log("whiteSpace after trim", whiteSpaceName.length)
        //         }
        let whiteSpace = '            '; // 12
        let totalAmountSpace = whiteSpace.slice(
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
          whiteSpace.length,
        );
        let subPriceSpce = whiteSpace.slice(
          (subPrice - sumOfProductDiscount - sumOfProductTax).toFixed(
            TerminalConfiguration.DecimalsInAmount,
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
        );
        let taxSpace = whiteSpace.slice(
          (globalTax + sumOfProductTax).toFixed(
            TerminalConfiguration.DecimalsInAmount,
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
        );
        let discountSpace = whiteSpace.slice(
          (globalDiscountAmount + sumOfProductDiscount).toFixed(
            TerminalConfiguration.DecimalsInAmount,
          ).length,
          totalPrice.toFixed(TerminalConfiguration.DecimalsInAmount).length,
        );
        let invoiceInfoObj = [
          {
            printerMacAddress: printerMacAddress,
            printerName: printerName,
            tagNo: terminalSetup.StartFrom,
            invoiceNumber: invoiceNumber,
            totalPrice: totalPrice.toFixed(
              TerminalConfiguration.DecimalsInAmount,
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
              TerminalConfiguration.DecimalsInAmount,
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
            ar: I18nManager.isRTL ? 'ar' : 'en',
            ...TerminalConfiguration,
            invoiceType: I18nManager.isRTL ? invoiceTypeA : invoiceTypeE,
            companyVAT: `${props.StringsList._180} : ${TerminalConfiguration.ValueAddedTaxNumber}`,
            isBuyer: buyerInfo ? true : false,
            ...buyerInfo,
          },
        ];

        // console.log(
        //   'invoice info object',
        //   TerminalConfiguration.DefaultPrintStyle,
        // );
        printerSelection(invoiceInfoObj, urii);
        // let base64data = await RNFS.readFile(urii, 'base64').then();

        // console.log(base64data);
        // createInvoiceStyle(base64data)
        // console.log('qrRef2, snapshot qrRef2', base64data)
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const printerSelection = (invoiceInfoObj, urii) => {
    let currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    if (billingStyleId === 1) {
      if (qrRef.current) {
        // qrRef.current.toDataURL(qrUrl => {
        A4PrinterStyle(currentDate, qrRef.current, 1, '', 1);
      }
      // });
    } else if (printerMacAddress) {
      PrinterNativeModule.printing(JSON.stringify(invoiceInfoObj), urii, '[]');
    }
  };

  const ReprinterSelection = (invoiceInfoObj, urii) => {
    let currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    if (billingStyleId === 1) {
      if (qrRef.current) {
        A4RePrinterStyle(currentDate, qrRef.current, 1, '', lastBillDetail, 1);
      }
    } else if (printerMacAddress) {
      PrinterNativeModule.printing(JSON.stringify(invoiceInfoObj), urii, '[]');
    }
  };
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = async () => {
      if (Platform.Version >= 33) {
        const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] =
          await Promise.all([
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            ),
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ),
          ]);
        return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
    };

    return await getRequestPermissionPromise();
  }
  async function saveToGallery() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(uriImage, {
      type: 'photo',
      album: 'Bnody',
    });
  }
  // const saveToGallery = async () => {
  //   // alert("uriImage:  " + uriImage)
  //   await CameraRoll.save(uriImage, {
  //     type: 'photo',
  //     album: 'Bnody',
  //   });
  // };

  const onSaveInvoice = type => {
    console.log('onSaveInvoice');
    setClientCustomInvoice(false);
    setInvoice(false);
    if (type === 'save') {
      console.log('save on gallery');
      saveToGallery(false);
      setInvoice(false);
      setInvoiceNumber(null);
      restState();
    } else {
      restState();
      setInvoiceNumber(null);
      setInvoice(false);
    }
  };

  const onClickSetting = type => {
    //console.log(' onClickSetting ', type);
    switch (type) {
      case 'terminalSetup':
        setTerminalSetup(true);
        break;
      case 'pairPrinterFamily':
        setPairPrinterFamily(true);
        break;

      default:
        break;
    }
  };

  const saleBill = async (ADamount, selP) => {
    let ADPay = ADamount ? ADamount : advancePaidInCash;
    let earnPoint = 0;
    if (buyerInfo?.LoyaltyCard) earnPoint = await invoiceEarnPoints();
    let currentDate = moment().format('YYYYMMDD');
    let time = moment().format('HH:mm:ss');
    let obj = {
      salesBillID: salesBillID,
      billNumber: returnInvoiceNumber ? returnInvoiceNumber : invoiceNumber,
      fiscalSpanID: TerminalConfiguration?.FiscalSpanID,
      billDate: currentDate,
      billType: returnInvoiceNumber ? 2 : 1,
      paymentType: selP ? selP.PaymentType : selectedPyamentMethod?.PaymentType,
      godownCode: TerminalConfiguration?.GoDownCode,
      cardDetails: '',
      salesagentCode: selectedAgent?.SalesAgentCode
        ? selectedAgent.SalesAgentCode
        : TerminalConfiguration?.SalesAgentCode,
      salesmanName: selectedAgent?.SalesAgentName
        ? selectedAgent?.SalesAgentName
        : TerminalConfiguration?.SalesAgentName,
      grandAmount: subPrice,
      globalDiscountRate: globalDiscountRate,
      globalDiscountAmount: globalDiscountAmount,
      globalTax1Code: globalTaxObj?.Tax1Code ? globalTaxObj.Tax1Code : '',
      globalTax1Name: globalTaxObj?.Tax1Name ? globalTaxObj.Tax1Name : '',
      globalTax1Rate: globalTaxObj?.Tax1Percentage
        ? globalTaxObj.Tax1Percentage
        : '',
      globalTax1Amount: globalTaxObj?.Tax1Amount ? globalTaxObj.Tax1Amount : 0,
      globalTax2Code: globalTaxObj?.Tax2Code ? globalTaxObj.Tax2Code : '',
      globalTax2Name: globalTaxObj?.Tax2Name ? globalTaxObj.Tax2Name : '',
      globalTax2Rate: globalTaxObj?.Tax2Percentage
        ? globalTaxObj.Tax2Percentage
        : '',
      globalTax2Amount: globalTaxObj?.Tax2Amount ? globalTaxObj.Tax2Amount : 0,
      surplusChargesAmount: 0,
      netAmount: totalPrice - ADPay,
      advancePaidInCash: ADPay,
      counterCode: TerminalConfiguration?.TerminalCode,
      roundOffAmount: totalPrice - ADPay,
      roundOffDifference: 0.0,
      posUserID: TerminalConfiguration?.UserCode,
      returnedBillNumber: returnInvoiceNumber ? invoiceNumber : '',
      returnedFiscalSpanID: returnInvoiceNumber
        ? TerminalConfiguration?.FiscalSpanID
        : '',
      returnedBillDate: returnInvoiceNumber ? currentDate : '',
      isProcessed: false,
      isUploaded: false,
      startTime: startTime,
      endTime: time,
      tagNo: terminalSetup.StartFrom,
      cashTender: 0,
      creditAmount: creditAmount,
      globalTaxGroupID: globalTaxObj?.globalTaxGroupID
        ? globalTaxObj.globalTaxGroupID
        : '',
      isGlobalTax1IncludedInPrice: globalTaxObj?.IsTax1IncludedInPrice
        ? globalTaxObj.IsTax1IncludedInPrice
        : false,
      isGlobalTax2IncludedInPrice: globalTaxObj?.IsTax2IncludedInPrice
        ? globalTaxObj.IsTax2IncludedInPrice
        : false,
      billTime: time,
      paymentTypeName: selP
        ? selP?.PaymentTypeName
        : selectedPyamentMethod?.PaymentTypeName,
      BillDetails: '',
      buyerCode: buyerInfo?.BuyerCode ? buyerInfo?.BuyerCode : '',
      buyerName: buyerInfo?.BuyerName ? buyerInfo?.BuyerName : '',
      buyerVAT: buyerInfo?.ValueAddedTaxNumber
        ? buyerInfo?.ValueAddedTaxNumber
        : '',
      buyerCCR: buyerInfo?.CCRNumber ? buyerInfo?.CCRNumber : '',
      buyerPhone: buyerInfo?.PrimaryPhone ? buyerInfo?.PrimaryPhone : '',
      buyerAddress: buyerInfo?.BuyerAddress ? buyerInfo?.BuyerAddress : '',
      loyaltyCode: buyerInfo?.LoyaltyCard
        ? buyerInfo?.LoyaltyCard.LoyaltyCode
        : '',
      isLoyaltyInvoice: redeemPoints > 0 ? true : false,
      deliveryType: '',
      deliveryTypeNote: customerNotes ? customerNotes : '',
      totalPTax1Name: '',
      totalTax1Amount: 0,
      totalPTax2Name: '',
      totalTax2Amount: 0,
      totalGlobalTaxAmount: globalTax,
      totalTaxAmount: 0,
      totalProductTaxAmount: 0.0,
      earnedPoints: earnPoint,
      redeemPoints: redeemPoints,
      status: earnPoint > 0 ? 1 : status,
      rewardType: rewardType,
    };
    console.log('sale bill object...', obj);
    InsertSaleBills(obj);
    databaseBackup();
  };

  const selectedProductUpdate = async () => {
    let updateSelectProducts = [];
    let tempArray = [];
    selectedProducts.filter(async product => {
      let EarnedPoint = 0;
      if (buyerInfo?.LoyaltyCard) EarnedPoint = await proCatEarnPoints(product);

      let price = 0;
      if (product.ProductType === 3) {
        if (Number(product.DiscountAmount) > 0) {
          price = product.webperamount;
        } else {
          price = product.webperamount;
        }
      } else {
        price = product.IsParentAddOn
          ? product.PriceWithOutTax
          : product.PriceWithOutTax / product.OrignalQuantity;
      }
      if (tempArray.length == 0) {
        let obj = {};
        obj.tax = product.Tax1Amount;
        obj.taxCode = product.Tax1Code;
        obj.taxName = product.Tax1Name;
        tempArray.push(obj);
      } else {
        let isTaxNew = tempArray.findIndex(x => x.taxCode === product.Tax1Code);
        if (isTaxNew == -1) {
          let obj = {};
          obj.tax = product.Tax1Amount;
          obj.taxCode = product.Tax1Code;
          obj.taxName = product.Tax1Name;
          tempArray.push(obj);
        } else {
          tempArray[isTaxNew].tax =
            tempArray[isTaxNew].tax + product.Tax1Amount;
        }
      }
      let pro = {
        SalesBillDetailsID: returnInvoiceNumber
          ? uuid.v4()
          : product.FreeProduct
          ? uuid.v4()
          : product.SalesBillDetailsID,
        SalesBillID: salesBillID,
        BillNumber: returnInvoiceNumber ? returnInvoiceNumber : invoiceNumber,
        FiscalSpanID: TerminalConfiguration?.FiscalSpanID,
        Description: product?.Description ? product?.Description : '',
        BillType: returnInvoiceNumber ? 2 : 1,
        SerialNumber: Number(product.SerialNumber ? product.SerialNumber : 0),
        ProductCode: product.ProductCode ? product.ProductCode : '',
        ProductName: product.ProductName ? product.ProductName : '',
        ProductName2: product.ProductName2 ? product.ProductName2 : '',
        ProductType: product.ProductType,
        Quantity: product.IsParentAddOn
          ? product.Quantity
          : product.Quantity * product.OrignalQuantity,
        UOMType: product.UOMType ? product.UOMType : 0,
        UOMCode: product.UOMCode ? product.UOMCode : '',
        UOMFragment: Number(product.UOMFragment ? product.UOMFragment : 0),
        UOMCode: product.UOMCode ? product.UOMCode : '',
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
        Tax1Code: product.Tax1Code ? product.Tax1Code : '',
        Tax1Name: product.Tax1Name ? product.Tax1Name : '',
        Tax1Rate: product.Tax1Rate ? product.Tax1Rate : 0,
        Tax1Amount: Number(
          product.Tax1Amount
            ? product.Tax1Amount.toFixed(TerminalConfiguration.DecimalsInAmount)
            : 0,
        ),
        Tax1Fragment: product.Tax1Fragment ? product.Tax1Fragment : 0,
        Tax2Code: product.Tax2Code ? product.Tax2Code : '',
        Tax2Name: product.Tax2Name ? product.Tax2Name : '',
        Tax2Rate: product.Tax2Rate ? product.Tax2Rate : 0,
        Tax2Amount: product.Tax2Amount ? product.Tax2Amount : 0,
        Tax2Fragment: product.Tax2Fragment ? product.Tax2Fragment : 0,
        GrandAmount: product.GrandAmount.toFixed(
          TerminalConfiguration.DecimalsInAmount,
        ),
        GroupDataID: product.GroupDataID ? product.GroupDataID : '',
        ProductBarCode: product.ProductBarCode,
        ReturnSalesInvoiceDetailID: returnInvoiceNumber
          ? product.SalesInvoiceDetailsID
          : '',
        DeliveryStatus: false,
        DeliveryDate: '',
        DeliveryTime: '',
        DeliveryNote: '',
        DeliveredDate: '',
        DeliveredTime: '',
        Remarks: '',
        SalesAgentCode: TerminalConfiguration.SalesAgentCode
          ? TerminalConfiguration.SalesAgentCode
          : '',
        IsParentAddOn:
          product.IsParentAddOn === 1 || product.IsParentAddOn === true
            ? true
            : false,
        AddOnGroupCode: product.AddOnGroupCode ? product.AddOnGroupCode : '',
        ParentInvoiceDetailsID: product.ParentInvoiceDetailsID
          ? product.ParentInvoiceDetailsID
          : '',
        OrignalQuantity: product.IsParentAddOn ? 0 : product.Quantity,
        AddonProductDetailcode: product.AddonProductDetailcode
          ? product.AddonProductDetailcode
          : '',
        Ingredients: String(product.Ingredients ? product.Ingredients : ''),
        EarnedPoints: EarnedPoint,
        RedeemPoints: Number(product.RedeemPoints ? product.RedeemPoints : 0),
        Status: EarnedPoint > 0 ? 1 : 0,
        ProductCategoryCode: String(
          product.ProductCategoryCode ? product.ProductCategoryCode : '',
        ),
        AddOnParentSalesInvoiceDetailsID:
          product.AddOnParentSalesInvoiceDetailsID
            ? product.AddOnParentSalesInvoiceDetailsID
            : '',
        HoldFromSale: product?.HoldFromSale ? product.HoldFromSale : '',
        PriceType: Number(product.PriceType ? product.PriceType : 0),
      };

      InsertSaleBillDetails(pro);

      updateSelectProducts.push(pro);
    });
    setProductTaxes(tempArray);
    console.log('total taxes ', tempArray);
    console.log('....0003');
    // console.log('updateSelectProducts...', updateSelectProducts);
  };

  const onClickIn = () => {
    console.log('onClickIn');
    setLoading(true);
  };
  const databaseBackup = async () => {
    let newBillList = [];
    let uri = await AsyncStorage.getItem('FILE_URI');
    console.log('FILE_URI', uri);
    await getData(SaleBillsTable, async cb => {
      for (let i = 0; i < cb.length; i++) {
        if (
          (cb[i].isUploaded == 'false' || !cb[i].isUploaded) &&
          (cb[i].isProcessed == 'false' || !cb[i].isProcessed)
        ) {
          //console.log('sale bills ', cb[i].isUploaded);
          await getDataById(
            SaleBillDetailsTable,
            'salesBillID',
            cb[i].salesBillID,
            billProducts => {
              // console.log("billProducts....", billProducts)
              // cb[i].BillDetails = billProducts;
              (cb[i].isProcessed = false), (cb[i].isUploaded = true);
              cb[i].BillDetails = billProducts;
              (cb[i].isGlobalTax1IncludedInPrice =
                cb[i].isGlobalTax1IncludedInPrice === 'false' ? false : true),
                (cb[i].isGlobalTax2IncludedInPrice =
                  cb[i].isGlobalTax2IncludedInPrice === 'false' ? false : true),
                (cb[i].isLoyaltyInvoice =
                  cb[i].isLoyaltyInvoice === 'false' ? false : true);

              newBillList.push(cb[i]);
            },
          );
        }
      }
      console.log('New Bill list ...', newBillList);
      try {
        const OsVer = Platform.constants['Release'];
        if (OsVer >= 11) {
          let path = '/storage/emulated/0/Documents/Bnody POS/Invoices.txt';
          if (await RNFS.exists(path)) {
            // console.log('File already exists',await RNFS.exists(path));
            PermissionFile.deleteFile(uri);
            setTimeout(() => {
              PermissionFile.overWriteAbove29(
                JSON.stringify(newBillList),
                err => {
                  if (err) {
                    console.log('Permission Error', err);
                  }
                },
                success => {
                  if (success) {
                    console.log('Access granted!');
                  }
                },
              );
              setBillNeedPost(true);
            }, 1000);
          } else {
            PermissionFile.overWriteAbove29(
              JSON.stringify(newBillList),
              err => {
                if (err) {
                  console.log('Permission Error', err);
                }
              },
              success => {
                if (success) {
                  // You can use RN-fetch-blog to download files and storge into download Manager
                  console.log('Access granted!');
                }
              },
            );
            setBillNeedPost(true);
          }
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let path = '/storage/emulated/0/Downloads/Bnody POS/Invoices.txt';
            if (RNFS.exists(path)) {
              // console.log('File already exists',await RNFS.exists(path));
              PermissionFile.deleteFile(uri);
              setTimeout(() => {
                PermissionFile.overWriteAPI29(
                  JSON.stringify(newBillList),
                  err => {
                    if (err) {
                      console.log('Permission Error', err);
                    }
                  },
                  success => {
                    if (success) {
                      // You can use RN-fetch-blog to download files and storge into download Manager
                      console.log('Access granted!');
                    }
                  },
                );
                setBillNeedPost(true);
              }, 1000);
            } else {
              PermissionFile.overWriteAPI29(
                JSON.stringify(newBillList),
                err => {
                  if (err) {
                    console.log('Permission Error', err);
                  }
                },
                success => {
                  if (success) {
                    // You can use RN-fetch-blog to download files and storge into download Manager
                    console.log('Access granted!');
                  }
                },
              );
              setBillNeedPost(true);
            }
          } else {
            console.log('permission denied');
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
        : recalling === 'recalling'
        ? 0
        : manuallyCount;

    if (type === 'globalDiscount') {
      if (subA > disAmt || recalling === 'recalling') {
        //  console.log("disAmt..........", manuallyCount)

        let tPrice;
        tPrice = Number(tolA - disAmt + globalDiscountAmount); //;
        setglobalDiscountAmount(Number(disAmt)); //);

        setAdvancePaidInCash(0); //);
        setDueAmount(0);
        if (selectedGlobalTaxObj) {
          globalTaxFun(selectedGlobalTaxObj, subA, '', tolA, disAmt);
        } else {
          setTotalPrice(tPrice);
        }
      } else {
        setMessage(props.StringsList._267);
        setDisplayAlert(true);
      }
    } else {
      let pDiscount;
      let tPrice = subPrice;
      pDiscount = parseFloat((disAmt * subA) / 100);
      if (subA > pDiscount) {
        tPrice = Number(subA - pDiscount); //;
        setglobalDiscountAmount(Number(pDiscount)); //);
        setGlobalDiscountRate(Number(disAmt));

        setAdvancePaidInCash(0); //);
        setDueAmount(0);
        console.log(
          'globalDiscountAmountFun......',
          pDiscount,
          disAmt,
          globalDiscountRate,
        );
        if (selectedGlobalTaxObj) {
          globalTaxFun(selectedGlobalTaxObj, subA, '', tolA, pDiscount);
        } else {
          setTotalPrice(tPrice);
        }
      } else {
        setMessage(props.StringsList._267);
        setDisplayAlert(true);
      }
    }
    setLoading(false);
  };

  const globalTaxFun = async (itm, type, n, totalAmount, disAmount) => {
    // console.log('globalTaxFunglobalTaxFunglobalTaxFun', itm);
    setLoading(true);
    if (itm.TaxFamilyCode !== 'None') {
      let tPrice = totalAmount ? totalAmount : totalPrice;
      let subPr = type === 'returnInvoice' ? subPrice : type;
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
        true,
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
      console.log('globalTax else', tPrice);
      setTotalPrice(tPrice);
      setSelectedGlobalTaxObj(null);
      setGlobalTaxObj(null);
      setGlobalTax(0);
      setLoading(false);
    }
  };

  const cashPaidAmountFun = amount => {
    // if (amount - totalPrice >= 0) {
    let am = amount ? amount : 0;
    let duePrice;
    duePrice = Number(amount - totalPrice); //;
    setAdvancePaidInCash(Number(am)); //);
    paymentProcess(amount);
    //  setDueAmount(duePrice);
    // } else {
    //   setMessage(props.StringsList._234);
    //   setDisplayAlert(true);
    // }
  };

  const holdInvoiceFun = async () => {
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
          date: moment().format('DD/MM/YYYY'),
          selectedProducts: JSON.stringify(selectedProducts),
        },
      ];
      InsertHoldInvoice(invoice);
      setOptions(
        userConfiguration.SalesRefundAllowed === 1
          ? [
              {label: props.StringsList._32, value: 'getHoldInvoice'},
              {label: props.StringsList._105, value: 'reprint'},
              {label: props.StringsList._319, value: 'returnBill'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ]
          : [
              {label: props.StringsList._32, value: 'getHoldInvoice'},
              {label: props.StringsList._30, value: 'buyer'},
              {label: props.StringsList._437, value: 'loyaltyCard'},
            ],
      );
      restState();
    } else {
      setMessage(props.StringsList._238);
      setDisplayAlert(true);
    }
  };

  const getHoldInvoiveFun = async holdInvoiceNumber => {
    setLoading(true);
    await getDataById(
      HoldInvoiceTable,
      'invoiceNumber',
      holdInvoiceNumber,
      cb => {
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
      3,
    );
    DeleteColumnById(HoldInvoiceTable, 'invoiceNumber', holdInvoiceNumber);
  };

  const onSuccessScan = async itm => {
    let productBar = itm?.data ? itm.data : itm;
    console.log(' Reward List Table outer', productBar);
    setLoading(true);
    await getDataById(
      UpdateProductDetailListTable,
      'ProductBarCode',
      productBar,
      async pro => {
        console.log(' on Successfully  Scan', selectedProducts);
        if (pro.length > 0) {
          let product = selectedProducts.filter(res => {
            if (
              pro[0]?.ProductBarCode === res?.ProductBarCode &&
              pro[0]?.PriceOriginal === res?.PriceOriginal
            ) {
              return res;
            }
          });
          console.log('on Successfully  Scan product', pro);
          let addPro = product.length > 0 ? product[0] : pro[0];
          await addProductToList(addPro, 'increment');
          setToggle(true);
          // setRewardType(1)
        } else {
          setMessage(props.StringsList._251);
          setDisplayAlert(true);
        }
        setLoading(false);
      },
    );
  };

  // const createInvoiceStyle = async (url) => {

  //   // let url = qrRef.current.toDataURL();
  //   let pageSize = "42"

  //   let a = "a"
  //   const base64Image = "data:image/png;base64," + url;
  //   console.log("create Invoice Style cal..", base64Image)
  //   let proTax = 0, prodDis = 0;
  //   let printing = new EscPosPrinter.printing();
  //   const encoder = new Encoder();
  //   let currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
  //   switch (pageSize) {

  //     case "36":

  //       selectedProducts.forEach((product) => {
  //         console.log("printing............selectedProducts", product.DiscountAmount)
  //         product.DiscountAmount = product.DiscountAmount === "0.00" ? 0 : product.DiscountAmount
  //         proTax = proTax + product.tax
  //         prodDis = prodDis + product.DiscountAmount

  //         let w = product.ProductName.split(" ")

  //         let whiteSpaceName = "";
  //         if (w[w.length - 1].length < 12) {
  //           whiteSpaceName = "            "
  //           // console.log("whiteSpace before trim", whiteSpaceName.length)
  //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
  //           // console.log("whiteSpace after trim", whiteSpaceName.length)
  //         }

  //         encoder
  //           .initialize()
  //           .size(1, 2)
  //           .text(String(product.ProductName), 1)
  //           .size(1, 2)
  //           .text(whiteSpaceName + String(product.PriceOriginal),)
  //           .size(1, 2)
  //           .text("    " + String(product.Quantity),)
  //           .size(1, 2)
  //           .text("      " + String(product.FreeProduct ? "0.00" : (product.GrandAmount).toFixed(TerminalConfiguration.DecimalsInAmount)))
  //           .newline(0.5)

  //       });
  //       printing.initialize()
  //         .align('center')
  //         .size(2, 1)
  //         .line(currentDate)
  //         .smooth(false)
  //         .size(1, 1)
  //         .line("******************************************")
  //         .align('left')
  //         .bold()
  //         .line(String(terminalSetup.StartFrom))
  //         .align('center')
  //         .size(2)
  //         .bold()
  //         .underline()
  //         .line(invoiceNumber)
  //         .align('center')
  //         .barcode({
  //           value: invoiceNumber,
  //           type: 'EPOS2_BARCODE_CODE93',
  //           width: 2,
  //           height: 50,
  //           hri: 'EPOS2_HRI_BELOW',
  //         })
  //         .underline(false)
  //         .newline()
  //         .data(encoder.encode())
  //         .size(1, 1)
  //         .align("center")
  //         .line("********************")
  //         .align("left")
  //         .bold(false)
  //         .text("Sub Amount" + "                " + String(subPrice - prodDis - proTax))//15
  //         .newline(0.5)
  //         .text("Tax" + "                       " + String(globalTax + proTax))//15
  //         .newline(0.5)
  //         .text("Discount" + "                  " + String(globalDiscountAmount + prodDis))//15
  //         .newline(0.5)
  //         .bold()
  //         .text("Total Price" + "               " + String(totalPrice))//15
  //         .newline()
  //         .bold(false)
  //         .align("center")
  //         .line("********************")
  //         .newline()
  //         .align("left")
  //         .bold(false)
  //         .text("Sale type" + "   " + "Sales Agent" + "   " + "Terminal") //4
  //         .newline(0.5)
  //         .line("Cash" + "         " + String(selectedAgent?.SalesAgentName ? selectedAgent?.SalesAgentName : TerminalConfiguration?.SalesAgentName) + "       " + String(TerminalConfiguration?.TerminalCode)) //9
  //         .align('center')
  //         .line("********************")
  //         .newline(2)
  //         .align('center')
  //         .image({
  //           uri:
  //             base64Image
  //         },
  //           { width: 255, height: 255 })
  //       break;
  //     case "42":
  //       selectedProducts.forEach((product) => {

  //         product.DiscountAmount = product.DiscountAmount === "0.00" ? 0 : product.DiscountAmount
  //         proTax = proTax + product.tax
  //         prodDis = prodDis + product.DiscountAmount

  //         // console.log("printing............selectedProducts", product.ProductName.length,)

  //         let w = product.ProductName.split(" ")

  //         let whiteSpaceName = "";
  //         if (w[w.length - 1].length < 15) {
  //           whiteSpaceName = "               "
  //           // console.log("whiteSpace before trim", whiteSpaceName.length)
  //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
  //           // console.log("whiteSpace after trim", whiteSpaceName.length)
  //         }
  //         let priceSpace = "          "

  //         priceSpace = priceSpace.slice(String(product.PriceOriginal).length, priceSpace.length)
  //         let quantitySpace = "          "

  //         quantitySpace = quantitySpace.slice(String(product.Quantity).length, quantitySpace.length)

  //         console.log("printing............selectedProducts", product.PriceOriginal.length, priceSpace, product.Quantity.length, quantitySpace)
  //         encoder
  //           .initialize()
  //           .size(1, 2)
  //           .text(String(product.ProductName), 1)
  //           .size(1, 2)
  //           .text(whiteSpaceName + String(product.PriceOriginal),)
  //           .size(1, 2)
  //           .text(priceSpace + String(product.Quantity),)
  //           .size(1, 2)
  //           .text(quantitySpace + String(product.FreeProduct ? "0.00" : (product.GrandAmount).toFixed(TerminalConfiguration.DecimalsInAmount)))
  //           .newline(0.5)

  //       });
  //       printing.initialize()
  //         .align('center')
  //         .size(2, 1)
  //         .line(currentDate)
  //         .smooth(false)
  //         .size(1, 1)
  //         .line("******************************************")
  //         .align('left')
  //         .bold()
  //         .line(String(terminalSetup.StartFrom))
  //         .align('center')
  //         .size(2)
  //         .bold()
  //         .underline()
  //         .line(invoiceNumber)
  //         .align('center')
  //         .barcode({
  //           value: invoiceNumber,
  //           type: 'EPOS2_BARCODE_CODE93',
  //           width: 2,
  //           height: 50,
  //           hri: 'EPOS2_HRI_BELOW',
  //         })
  //         .underline(false)
  //         .newline()

  //         .data(encoder.encode())
  //         .size(1, 1)
  //         .align("center")
  //         .line("********************")
  //         .align("left")
  //         .bold(false)
  //         .text("Sub Amount" + "                       " + String(Number(subPrice - prodDis - proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Tax" + "                              " + String(Number(globalTax + proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Discount" + "                         " + String(Number(globalDiscountAmount + prodDis).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .bold()
  //         .text("Total Price" + "                      " + String(Number(totalPrice).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline()
  //         .bold(false)
  //         .align("center")
  //         .line("********************")
  //         .newline()
  //         .align("left")
  //         .bold(false)
  //         .text("Sale type" + "         " + "Sales Agent" + "         " + "Terminal") //9
  //         .newline(0.5)
  //         .line(selectedPyamentMethod.PaymentTypeName + "              " + String(selectedAgent?.SalesAgentName ? selectedAgent?.SalesAgentName : TerminalConfiguration?.SalesAgentName) + "           " + String(TerminalConfiguration?.TerminalCode)) //9
  //         .align('center')
  //         .line("********************")
  //         .newline(2)
  //         .align('center')
  //         .image({
  //           uri:
  //             base64Image
  //         },
  //           { width: 255, height: 255 })
  //       const status = await printing.cut().send();
  //       break;
  //     default:
  //       selectedProducts.forEach((product) => {

  //         product.DiscountAmount = product.DiscountAmount === "0.00" ? 0 : product.DiscountAmount
  //         proTax = proTax + product.tax
  //         prodDis = prodDis + product.DiscountAmount

  //         // console.log("printing............selectedProducts", product.ProductName.length,)

  //         let w = product.ProductName.split(" ")

  //         let whiteSpaceName = "";
  //         if (w[w.length - 1].length < 15) {
  //           whiteSpaceName = "               "
  //           // console.log("whiteSpace before trim", whiteSpaceName.length)
  //           whiteSpaceName = whiteSpaceName.slice(w[w.length - 1].length, whiteSpaceName.length)
  //           // console.log("whiteSpace after trim", whiteSpaceName.length)
  //         }
  //         let priceSpace = "          "

  //         priceSpace = priceSpace.slice(String(product.PriceOriginal).length, priceSpace.length)
  //         let quantitySpace = "          "

  //         quantitySpace = quantitySpace.slice(String(product.Quantity).length, quantitySpace.length)

  //         console.log("printing............selectedProducts", product.PriceOriginal.length, priceSpace, product.Quantity.length, quantitySpace)
  //         encoder
  //           .initialize()
  //           .size(1, 2)
  //           .text(String(product.ProductName), 1)
  //           .size(1, 2)
  //           .text(whiteSpaceName + String(product.PriceOriginal),)
  //           .size(1, 2)
  //           .text(priceSpace + String(product.Quantity),)
  //           .size(1, 2)
  //           .text(quantitySpace + String(product.FreeProduct ? "0.00" : (product.GrandAmount).toFixed(TerminalConfiguration.DecimalsInAmount)))
  //           .newline(0.5)

  //       });
  //       printing.initialize()
  //         .align('center')
  //         .size(2, 1)
  //         .line(currentDate)
  //         .smooth(false)
  //         .size(1, 1)
  //         .line("******************************************")
  //         .align('left')
  //         .bold()
  //         .line(String(terminalSetup.StartFrom))
  //         .align('center')
  //         .size(2)
  //         .bold()
  //         .underline()
  //         .line(invoiceNumber)
  //         .align('center')
  //         .barcode({
  //           value: invoiceNumber,
  //           type: 'EPOS2_BARCODE_CODE93',
  //           width: 2,
  //           height: 50,
  //           hri: 'EPOS2_HRI_BELOW',
  //         })
  //         .underline(false)
  //         .newline()

  //         .data(encoder.encode())
  //         .size(1, 1)
  //         .align("center")
  //         .line("********************")
  //         .align("left")
  //         .bold(false)
  //         .text("Sub Amount" + "                       " + String(Number(subPrice - prodDis - proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Tax" + "                              " + String(Number(globalTax + proTax).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .text("Discount" + "                         " + String(Number(globalDiscountAmount + prodDis).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline(0.5)
  //         .bold()
  //         .text("Total Price" + "                      " + String(Number(totalPrice).toFixed(TerminalConfiguration.DecimalsInAmount)))//25
  //         .newline()
  //         .bold(false)
  //         .align("center")
  //         .line("********************")
  //         .newline()
  //         .align("left")
  //         .bold(false)
  //         .text("Sale type" + "         " + "Sales Agent" + "         " + "Terminal") //9
  //         .newline(0.5)
  //         .line(selectedPyamentMethod.PaymentTypeName + "              " + String(selectedAgent?.SalesAgentName ? selectedAgent?.SalesAgentName : TerminalConfiguration?.SalesAgentName) + "           " + String(TerminalConfiguration?.TerminalCode)) //9
  //         .align('center')
  //         .line("********************")
  //         .newline(2)
  //         .align('center')
  //         .image({
  //           uri:
  //             base64Image
  //         },
  //           { width: 255, height: 255 })
  //       const a = await printing.cut().send();
  //       break;
  //   }
  //   console.log("kjhkashdkh", subPrice, prodDis, proTax)

  // }

  const getReturnBill = async type => {
    setLoading(true);
    setPrintType(type);
    let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');

    var localeInfo = RNLocalize.getLocales();
    var languageTag = localeInfo[0].languageTag;

    let decodeToken = base64.decode(accessToken);
    console.log('decode token', decodeToken, languageTag);
    let nw = decodeToken.substring(0, decodeToken.length - 5);
    let UpdateToken = nw + languageTag;
    let decodeUpadedToken = base64.encode(UpdateToken);
    console.log('access token ', decodeUpadedToken);

    const response = await props.dispatch(
      ServerCall(
        decodeUpadedToken,
        `SalesBill/FetchSalesBill?billNumber=${alertValue}`,
        'GET',
      ),
    );
    console.log('FetchSalesBill....', response);
    setAlertValue('');
    seOptionsValue(null);

    if (response) {
      setReturnBill(response);
      console.log('ReturnedQuantity....', response.BillDate);
      if (type === 'reprint' && response.TotalRePrintCount) {
        setTotalReprintCount(response.TotalRePrintCount);
      }

      if (response?.BillDetails?.length > 0) {
        lastBillDetail = response;
        let products = response.BillDetails.filter(async item => {
          let returnQ = item?.ReturnedQuantity / item?.UOMFragment;
          item.ReturnedQuantity = returnQ;
          let Quantity =
            type === 'returnInvoice'
              ? item.Quantity - item.ReturnedQuantity
              : item.Quantity;
          if (Quantity > 0) {
            let addonPQ = response.BillDetails.filter(
              r =>
                r.SalesBillDetailsID === item.AddOnParentSalesInvoiceDetailsID,
            );
            console.log('addonPQaddonPQaddonPQ', addonPQ);

            if (addonPQ.length > 0) {
              let OQty = item.Quantity / addonPQ[0].Quantity;
              item.OrignalQuantity = OQty;
              item.ParentInvoiceDetailsID = addonPQ[0].SalesBillDetailsID;
              item.maxQuantity = Quantity;
              let Amount = Number(item.PriceOriginal) * OQty;
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
                0,
              );
              item.Tax1Fragment = taxAmt.Tax1Fragment
                ? taxAmt.Tax1Fragment
                : '';
              item.Tax2Fragment = taxAmt.Tax2Fragment
                ? taxAmt.Tax2Fragment
                : '';
              if (item.Tax1Fragment == 2 || item.Tax2Fragment == 2) {
                taxAmt.Tax1Amount = taxAmt.Tax1Amount * Quantity;
              }
              let tax = taxAmt.Tax1Amount
                ? taxAmt.Tax1Amount
                : 0 + taxAmt.Tax2Amount
                ? taxAmt.Tax2Amount
                : 0;
              item.tax = Number(tax);
              item.PriceWithOutTax = Number(item.Price) * OQty;
              item.webperamount = item.PriceWithOutTax;
              item.PriceOriginal = item.PriceOriginal * OQty;
              item.GrandAmount = (
                Number(item.Price * Quantity) +
                tax -
                item?.DiscountAmount
              ).toFixed(2);
              item.GrandAmount = Number(item.GrandAmount);
              // item.GrandAmount = item.GrandAmount; //(item.PriceWithOutTax * addonPQ[0].Quantity) + item.tax
              item.ReturnedQuantity = returnQ;
              item.Quantity = Quantity / OQty;
            } else if (item.ProductType === 3) {
              item.maxQuantity = item.Quantity - item.ReturnedQuantity;
              item.Quantity = Quantity;
              let taxAmountIncludedInPrice = 0;
              let tax1AmountTotal = 0,
                tax1ActualAmountTotal = 0,
                tax2AmountTotal = 0,
                tax2ActualAmountTotal = 0;
              let listOfPG;
              item.Pricefortax = item.PriceOriginal;
              let rr = await getData(SalesFamilySummaryListTable, async cb => {
                let groupTaxCodes = cb.filter(
                  x => x.SalesFamilyCode === item.ProductCode,
                );
                listOfPG = groupTaxCodes;
                let totaltax1 = 0;
                let totaltax2 = 0;
                let myArray = [];
                let colloctivePrice = 0,
                  inclusiveTax = 0;
                await listOfPG.forEach(async (element, index) => {
                  let percentageDiscountAmount = 0;
                  let taxGroupID = '';
                  let itemQty = 0,
                    itemAmount = 0,
                    itemProposedSalesAmount = 0,
                    itemDiscountAmount = 0,
                    netQty = 0;
                  if (
                    item.DiscountAmount >
                    item.Quantity * item.PriceOriginal
                  ) {
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
                    item.DiscountRate,
                  );
                  if (taxAmt.IsTax1IncludedInPrice === true) {
                    inclusiveTax += taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0;
                  }
                  if (taxAmt.IsTax2IncludedInPrice === true) {
                    inclusiveTax += taxAmt.Tax2Amount ? taxAmt.Tax2Amount : 0;
                  }
                  let productGroupTaxInfoObj = {
                    ProductBarCode: item?.ProductBarCode,
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
                      taxAmt?.IsTax2IncludedInPrice === true
                        ? true
                        : false,
                  };
                  colloctivePrice += element.Price;
                  myArray.push(productGroupTaxInfoObj);
                  if (taxAmt.Tax1Fragment == 2 || taxAmt.Tax2Fragment == 2) {
                    taxAmt.Tax1Amount = taxAmt.Tax1Amount
                      ? taxAmt.Tax1Amount
                      : 0;
                    taxAmt.Tax2Amount = taxAmt.Tax2Amount
                      ? taxAmt.Tax2Amount
                      : 0;
                  }
                  (item.Tax1Fragment = taxAmt?.Tax1Fragment
                    ? taxAmt.Tax1Fragment
                    : ''),
                    (item.Tax2Fragment = taxAmt?.Tax2Fragment
                      ? taxAmt.Tax2Fragment
                      : '');
                  item.IsTax1IncludedInPrice = taxAmt.IsTax1IncludedInPrice
                    ? taxAmt.IsTax1IncludedInPrice
                    : 0;
                  item.IsTax2IncludedInPrice = taxAmt.IsTax2IncludedInPrice
                    ? taxAmt.IsTax2IncludedInPrice
                    : 0;
                  item.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
                  item.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : '';
                  item.Tax2Code = taxAmt.Tax2Code ? taxAmt.Tax2Code : '';
                  item.Tax2Name = taxAmt.Tax2Name ? taxAmt.Tax2Name : '';
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
                  item.Tax1Amount = item.Tax1Amount;
                  item.Tax2Amount = item.Tax2Amount;
                  totaltax1 = taxAmt.Tax1Amount
                    ? totaltax1 + taxAmt.Tax1Amount
                    : totaltax1 + 0;
                  totaltax2 = taxAmt.Tax2Amount
                    ? totaltax2 + taxAmt.Tax2Amount
                    : totaltax2 + 0;
                  let tax = totaltax1 + totaltax2;
                  item.Tax1Code = taxAmt.Tax1Code;
                  (item.Tax1Rate = taxAmt.Tax1Percentage
                    ? taxAmt.Tax1Percentage
                    : 0),
                    (item.Tax2Rate = taxAmt.Tax2Percentage
                      ? taxAmt.Tax2Percentage
                      : 0),
                    (item.IngredientsArray = []);
                  item.IngredientNames = '';
                  item.tax = Number(tax);
                  item.productGroupTaxInfoObj = myArray;
                  item.colloctivePrice = colloctivePrice;
                  let totalTax = 0,
                    totalPrice = 0;
                  item.productGroupTaxInfoObj.forEach(element => {
                    let itemProposedAmount =
                      ((element.proposedPrice * item.Quantity) /
                        (item.Pricefortax * item.Quantity)) *
                      (item.PriceOriginal * item.Quantity);
                    let itemDiscountWeight =
                      (itemProposedAmount /
                        (item.PriceOriginal * item.Quantity)) *
                      percentageDiscountAmount;
                    let afterDiscountAmount = 0;
                    if (element.isInclusiveTax) {
                      let inclTax =
                        (itemProposedAmount / (100 + element.taxRate)) *
                        element.taxRate;
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
                  });
                  tax1AmountTotal = totalTax;
                  if (index === item.groupTaxCodes.length - 1) {
                    let totalQuantity = Quantity + item.ReturnedQuantity;
                    item.tax =
                      ((item.Tax1Amount + item.Tax2Amount) / totalQuantity) *
                      Quantity;
                    item.GrandAmount =
                      (item.GrandAmount * Quantity) / totalQuantity; //(item.PriceWithOutTax * Quantity) + item.tax
                    item.Tax1Amount = item.tax;
                    if (item?.IsTax1IncludedInPrice) {
                      item.Price = Number(item.PriceOriginal);
                      item.PriceWithOutTax = Number(
                        item.Price - inclusiveTax / item?.Quantity,
                      );
                      item.PriceUnitlesstax = item.PriceWithOutTax;
                      item.webperamount = item.PriceWithOutTax;
                    } else {
                      item.Price = Number(item.PriceOriginal);
                      item.PriceWithOutTax = Number(item?.Price);
                      item.PriceUnitlesstax = item.PriceWithOutTax;
                      item.webperamount = item.PriceWithOutTax;
                    }
                  }
                });
                item.groupTaxCodes = groupTaxCodes;
                item.ReturnedQuantity = returnQ;
              });
            } else {
              let taxAmt;
              item.maxQuantity = Quantity;
              item.Quantity = Quantity;
              item.ReturnedQuantity = returnQ;
              item.PriceWithOutTax = Number(item.Price);
              let Amount = Number(item.PriceOriginal) * Quantity;
              let totalQuantity = Quantity + item.ReturnedQuantity;
              let discountAfterDivision = Number(
                (item.DiscountAmount / totalQuantity) * Quantity,
              );
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
                item.DiscountRate,
              );
              item.DiscountAmount = discountAfterDivision;
              // }
              item.Tax1Fragment = taxAmt.Tax1Fragment
                ? taxAmt.Tax1Fragment
                : '';
              item.Tax2Fragment = taxAmt.Tax2Fragment
                ? taxAmt.Tax2Fragment
                : '';
              item.OrignalQuantity = 1;
              if (item.Tax1Fragment == 2 || item.Tax2Fragment == 2) {
                taxAmt.Tax1Amount = taxAmt.Tax1Amount * item.Quantity;
              }
              let tax = taxAmt.Tax1Amount
                ? taxAmt.Tax1Amount
                : 0 + taxAmt.Tax2Amount
                ? taxAmt.Tax2Amount
                : 0;
              item.GrandAmount = (
                Number(taxAmt.Price * item.Quantity) +
                tax -
                item?.DiscountAmount
              ).toFixed(2);
              item.GrandAmount = Number(item.GrandAmount);
              item.tax = tax;
              item.webperamount = Number(item.Price);
              item.Tax1Amount = tax;
            }
            item.IsParentAddOn = item.AddOnParentSalesInvoiceDetailsID
              ? false
              : true;
            return item;
          }
        });

        if (response.GlobalDiscountRate > 0) {
          setGlobalDiscountRate(response.GlobalDiscountRate);
        } else if (response.GlobalDiscountAmount > 0) {
          setglobalDiscountAmount(response.GlobalDiscountAmount);
        }

        if (products.length > 0) {
          let GT = globalTaxList.filter(
            e => response.GlobalTaxGroupID === e.TaxFamilyCode,
          );
          // console.log('GTGTGTGT', GT);
          setSelectedGlobalTaxObj(GT[0]);
          setInvoiceNumber(response.BillNumber);
          setReturnProducts(products);

          if (type === 'returnInvoice') {
            setisReturnInvoice(true);
            createReturnInvoiceNumber();
            // console.log('kjsahkjfhksdhkfh', response.BillNumber);
            setToggle(true);
          }

          if (response.BuyerCode) {
            const current = new Date();
            let date, month, year;
            date = current.getDate();
            month = current.getMonth() + 1;
            year = current.getFullYear();

            const currentDate = `${year}${
              month < 10 ? '0' + month : month + 1
            }${date < 10 ? '0' + date : date}`;

            let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');

            let body = {
              BuyerName: '',
              ReturnCode: 0,
              BuyerCode: null,
              PrimaryPhone: response.BuyerCode,
              CCRNumber: '',
              ValueAddedTaxNumber: '',
              BuyerAddress: '',
              Operation: 'search',
              CurrentDate: currentDate,
              LoyaltyCard: null,
            };

            const response1 = await props.dispatch(
              ServerCall(UserLogin, 'Buyer/CreateBuyer', body),
            );
            if (response1.success) {
              setBuyerInfo(response1);
            }
          }

          if (type === 'reprint') {
            setAdvancePaidInCash(Number(response.AdvancePaidInCash)); //);
            let selP = payments.filter(
              e => e.PaymentType === String(response.PaymentType),
            );
            // console.log('setSelectedPyamentMethod', payments, selP);
            setSelectedPyamentMethod(selP[0]);

            let date, month, year;
            year = response.BillDate.slice(0, 4);
            month = response.BillDate.slice(4, 6);
            date = response.BillDate.slice(6, 8);
            let billDate =
              date + '/' + month + '/' + year + '  ' + response.BillTime;
            setBillDate(billDate);
            console.log('billDate..', billDate);
            selectedAllProducts(products, response, GT[0], type);
          }
        } else {
          setMessage(props.StringsList._301);
          setDisplayAlert(true);
          seOptionsValue(null);
        }
        setLoading(false);
      }
    } else {
      setMessage(props.StringsList._301);
      setDisplayAlert(true);
      setLoading(false);
    }
  };

  const reacallFunc = type => {
    console.log('reacallFunc', type);
    if (type === 'holdInvoice') {
      holdInvoiceFun();
    } else if (type === 'returnInvoice' || type === 'reprint') {
      getReturnBill(type);
    } else if (type === 'ingredient') {
      addIngredientFun();
    } else if (type === 'billingType') {
      if (alertType === 'reprint') {
        paymentProcess('', '', 'reprint');
      } else {
        paymentMethodSelect();
      }
      setisBillingType(false);

      selectBillingType({name: 'Set'});
    } else if ('cashpaid') {
      paymentProcess('', '');
    }
  };

  const selectBillingType = item => {
    let d = [...billingTypeData];
    console.log('billingType...', item);
    d.forEach(e => {
      if (item.name === e.name) {
        e.isSelected = true;
      } else {
        e.isSelected = false;
      }
    });
    if (item.name !== 'Set') {
      setBillingType(item);
    }
    setBillingTypeData(d);
  };

  const checkReturnProductAddons = async (itm, type, index) => {
    let proArray = [],
      sPrice = Number(itm.GrandAmount - itm.DiscountAmount),
      tPrice = Number(itm.GrandAmount - itm.DiscountAmount);
    proArray.push(itm);

    let addons = retunProducts.filter(async pro => {
      if (itm.SalesBillDetailsID === pro.AddOnParentSalesInvoiceDetailsID) {
        // console.log(
        //   'pro.Quantitypro.Quantitypro.Quantitypro.Quantity',
        //   pro.Quantity,
        //   itm.Quantity,
        // );

        sPrice = Number(sPrice + pro.GrandAmount - pro.DiscountAmount);
        tPrice = Number(tPrice + pro.GrandAmount - pro.DiscountAmount);
        // if (!pro.ParentInvoiceDetailsID) {
        //   let OQty = pro.Quantity / itm.Quantity;
        //   pro.Quantity = itm.Quantity
        //   pro.OrignalQuantity = OQty
        //   pro.ParentInvoiceDetailsID = itm.SalesBillDetailsID
        // }
        proArray.push(pro);
        // setTimeout(() => { addProductToList(pro, "addons") }, 1000)
        return pro;
      }
    });
    if (addons.length > 0) {
      await addProductToList(itm, 'addnos', index, proArray, sPrice, tPrice);
    } else {
      await addProductToList(itm, type, index);
    }
  };

  useEffect(async () => {
    // console.log("buyer Info", buyerInfo)
    if (buyerInfo?.LoyaltyCard) {
      let pArry = [],
        cArry = [],
        iArry = [];
      await getDataById(
        LoyaltyDetailListTable,
        'LoyaltyCode',
        buyerInfo.LoyaltyCard.LoyaltyCode,
        loyalty => {
          // console.log("Loyalty Detail List Table", loyalty)
          loyalty.forEach(e => {
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
        },
      );
      await getDataById(
        LoyaltyRewardsListTable,
        'LoyaltyCode',
        buyerInfo.LoyaltyCard.LoyaltyCode,
        loyalty => {
          // console.log("Loyalty Reward List Table", loyalty)
          setLoyaltyRewardsList(loyalty);
        },
      );
    }
  }, [buyerInfo]);

  async function checkLoyalitRewardsFun() {
    // console.log('ghahagga', 'hfhhfhfhfhgfghfhhfggfhfhd');
    if (loyaltyRewardsList?.length > 0 && redeemPoints > 0) {
      let rewards = loyaltyRewardsList.filter(
        res =>
          redeemPoints >= res.RewardCostFrom &&
          redeemPoints <= res.RewardCostTo,
      );
      // console.log("rewards..........", rewards)
      let excludeProSum = 0;
      let excludeProducts = loyaltyRewardsList.filter(res => {
        selectedProducts.forEach(s => {
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
          Alert.alert('Loyalty Inovice', 'Please select open option', [
            {
              text: 'Free Product',
              onPress: () => {
                let reward = rewards.filter(res => res.ProductBarCode !== '');
                // console.log("free product ", reward)
                freeProductReward(reward);
              },
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Invoice Discount',
              onPress: () => {
                let reward = rewards.filter(res => res.ProductBarCode === '');
                invoiceDiscountReward(reward[0], excludeProSum);
                // console.log("Invoice Discount ", reward)
              },
            },
          ]);

          // invoiceDiscountReward(rewards)
        } else {
          if (rewards[0].ProductBarCode !== '') {
            let PReward = rewards.filter(res => res.ProductBarCode !== '');
            freeProductReward(PReward);
          } else {
            invoiceDiscountReward(rewards[0], excludeProSum);
          }
        }
      } else {
        Alert.alert('Loyalty Info', 'No Reward Available');
      }
    }
  }

  async function freeProductReward(rewards) {
    let selectedP = [...selectedProducts];
    setToggle(true);
    for (let i = 0; i < rewards.length; i++) {
      let e = rewards[i];
      // console.log(" Reward List ProductBarCode", e)
      await getDataById(
        UpdateProductDetailListTable,
        'ProductBarCode',
        e.ProductBarCode,
        async pro => {
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
            P.DiscountRate,
          );
          P.Tax1Code = taxAmt.Tax1Code ? taxAmt.Tax1Code : '';
          (P.Tax1Name = taxAmt.Tax1Name ? taxAmt.Tax1Name : ''),
            (P.Tax1Rate = taxAmt.Tax1Percentage ? taxAmt.Tax1Percentage : 0),
            (P.Tax1Amount = taxAmt.Tax1Amount ? taxAmt.Tax1Amount : 0),
            (P.Tax2Code = taxAmt?.Tax2Code ? taxAmt.Tax2Code : ''),
            (P.Tax2Name = taxAmt?.Tax2Name ? taxAmt?.Tax2Name : ''),
            (P.Tax2Rate = taxAmt?.Tax2Percentage ? taxAmt?.Tax2Percentage : 0),
            (P.Tax2Amount = taxAmt?.Tax2Amount ? taxAmt?.Tax2Amount : 0);

          // console.log(" Reward List Table", P, taxAmt)
          // await addProductToList(pro[0], "FreeProduct")
          P.GrandAmount = 0;
          P.tax = P.Tax1Amount + P.Tax2Amount;
          P.PriceWithOutTax = taxAmt.Price;
          P.Quantity = 1;
          P.FreeProduct = true;
          P.DiscountRate = 100;
          P.DiscountAmount = P.PriceOriginal;
          selectedP.push(P);
          setRewardType(1);
        },
      );
    }
    setSelectedProducts(selectedP);
  }

  const invoiceDiscountReward = (rewards, excludeProSum) => {
    let tAmount = totalPrice,
      amountGD = globalDiscountAmount,
      tax = globalTax;
    if (
      rewards.IsDiscountIncluded === 'true' &&
      rewards.IsTaxIncluded === 'true'
    ) {
      if (totalPrice - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === 'false' &&
      rewards.IsTaxIncluded === 'true'
    ) {
      if (totalPrice - amountGD - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === 'true' &&
      rewards.IsTaxIncluded === 'false'
    ) {
      if (totalPrice - tax - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else if (
      rewards.IsDiscountIncluded === 'false' &&
      rewards.IsTaxIncluded === 'false'
    ) {
      if (subPrice - excludeProSum >= rewards.MinInvoiceAmount) {
        tAmount = tAmount - rewards.Discount;
        amountGD = amountGD + rewards.Discount;
        setglobalDiscountAmount(amountGD);
        setTotalPrice(tAmount);
        setRewardType(2);
      }
    } else {
      alert('invoice amount must be greater then Reward minimum amount');
    }
  };

  const invoiceEarnPoints = async cb => {
    let tAmount = totalPrice,
      amountGD = globalDiscountAmount,
      tax = globalTax;
    let invEP = EarnPointIArry.find(
      e => totalPrice >= e.InvoiceAmountFrom && totalPrice <= e.InvoiceAmountTo,
    );
    // console.log("invoiceEarnPointsinvoiceEarnPoints", invEP)
    if (!invEP) {
      return 0;
    }

    if (invEP.IsDiscountIncluded === 'true' && invEP.IsTaxIncluded === 'true') {
      if (
        totalPrice >= invEP.InvoiceAmountFrom &&
        totalPrice <= invEP.InvoiceAmountTo
      ) {
        return invEP.PointsEarned;
      } else {
        return 0;
      }
    } else if (
      invEP.IsDiscountIncluded === 'false' &&
      invEP.IsTaxIncluded === 'true'
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
      invEP.IsDiscountIncluded === 'true' &&
      invEP.IsTaxIncluded === 'false'
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
      invEP.IsDiscountIncluded === 'false' &&
      invEP.IsTaxIncluded === 'false'
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
      // alert("invoice amount must be greater then Reward minimum amount")
      return 0;
    }
  };

  const proCatEarnPoints = async pro => {
    let catMatch = EarnPointCArry.find(
      e => e.CategoryCode === pro.ProductCategoryCode,
    );
    let proMatch = EarnPointPArry.find(
      e =>
        e.ProductBarCode === pro.ProductBarCode && e.Quantity === pro.Quantity,
    );
    let erP;
    // console.log("product.EarnedPoints + EarnPointPArry.PointsEarned", proMatch, catMatch, pro)
    if (proMatch && catMatch) {
      erP = proMatch.PointsEarned + catMatch.PointsEarned;
      // console.log("1....", erP)
      return erP;
    } else if (catMatch) {
      erP = catMatch.PointsEarned;
      // console.log("2....", erP)
      return erP;
    } else if (proMatch) {
      erP = proMatch.PointsEarned;
      // console.log("3...", erP)
      return erP;
    } else {
      erP = 0;
      return erP;
    }
  };

  const onClickPowerOff = async () => {
    Alert.alert('Bnody POS', props.StringsList._443, [
      {
        text: 'yes',
        onPress: async () => {
          setLoading(true);
          if (drawerSetupArr.isInitialCashSet === 'true') {
            setisLogout(true);
          }
          let loginUserInfo = await AsyncStorage.getItem('LOGIN_USER_INFO');
          loginUserInfo = JSON.parse(loginUserInfo);
          // console.log('access token ', loginUserInfo);
          setTimeout(async () => {
            const response = await props.dispatch(
              ServerCall('', 'AuthorizeUser/SignOut', loginUserInfo),
            );
            setisLogout(false);
            ResetDrawerSetup();
            // console.log('user logout response.. ', response);
            // http://bnodyapi.bnody.com/api/AuthorizeUser/SignOut
            props.navigation.replace('Auth');
            await AsyncStorage.removeItem('ACCESS_TOKEN');
            setLoading(false);
          }, 1000);
        },
      },
      {
        text: 'Cancel',

        style: 'cancel',
      },
    ]);
  };

  const selectedAllProducts = (products, response, tax, type) => {
    let tPrice = 0,
      sPrice = 0,
      allpro = [];
    let retunProduct = products ? products : retunProducts;
    let returnBills = response ? response : returnBill;
    let selectedGlobalTax = tax ? tax : selectedGlobalTaxObj;
    // console.log('return billsssssss', returnBills);
    retunProduct.forEach(pro => {
      tPrice = tPrice + pro.GrandAmount;
      sPrice = sPrice + pro.GrandAmount;
    });
    //  console.log("retunProducts...", selectedGlobalTaxObj)
    if (type === 'reprint') {
      setsubPrice(returnBills.GrandAmount);
      setTotalPrice(returnBills.RoundOffAmount + response.AdvancePaidInCash);
      setglobalDiscountAmount(returnBills.GlobalDiscountAmount);
      setGlobalTax(returnBills.GlobalTax1Amount);
      lastBillDetail.BillDetails = retunProduct;
      setSelectedProducts(lastBillDetail.BillDetails);
      let number = retunProduct.filter(
        w => w.IsParentAddOn === 1 || w.IsParentAddOn === true,
      ).length;
      setNumberOfItems(number);
      setisReturnInvoice(false);

      paymentProcess(returnBill.AdvancePaidInCash, '', 'reprint');
    } else {
      if (
        returnBills.GlobalTax1Amount > 0 ||
        returnBills.GlobalDiscountRate > 0
      ) {
        if (returnBills.GlobalDiscountRate > 0) {
          console.log('GlobalDiscountRate');
          globalDiscountAmountFun('', sPrice, tPrice, 'recalling');
        } else if (returnBills.GlobalDiscountAmount > 0) {
          console.log('GlobalDiscountAmount');
          globalDiscountAmountFun(
            'globalDiscount',
            sPrice,
            tPrice,
            'recalling',
          );
        } else if (returnBills.GlobalTax1Amount > 0) {
          globalTaxFun(selectedGlobalTax, sPrice, '', tPrice);
        }
        setsubPrice(sPrice);
      } else {
        setTotalPrice(tPrice);
        setsubPrice(sPrice);
      }

      let array = [];

      let parntProducts = retunProduct.filter(x => x.IsParentAddOn === true);
      let addonnProducts = retunProduct.filter(x => x.IsParentAddOn === false);
      for (let index = 0; index < parntProducts.length; index++) {
        const element = parntProducts[index];
        if (array.length === 0 && element.IsParentAddOn === true) {
          array.push(element);
          let Addonsofthis = addonnProducts.filter(
            x =>
              x.AddOnParentSalesInvoiceDetailsID === element.SalesBillDetailsID,
          );
          if (Addonsofthis) {
            for (let x = 0; x < Addonsofthis.length; x++) {
              const y = Addonsofthis[x];
              array.push(y);
            }
          }
        } else {
          let itemAddons = addonnProducts.filter(
            x =>
              x.AddOnParentSalesInvoiceDetailsID === element.SalesBillDetailsID,
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
        w => w.IsParentAddOn === 1 || w.IsParentAddOn === true,
      ).length;
      setNumberOfItems(number);
      setisReturnInvoice(false);
    }
  };

  const deleteHoldedInvoice = holdInvoiceNumber => {
    DeleteColumnById(HoldInvoiceTable, 'invoiceNumber', holdInvoiceNumber);
  };

  const productAssignSaleAgent = (items, value, item) => {
    // console.log('productAssignSaleAgent', items, value, item);
    let selectedAgent = items.filter(res => res.value === value);
    console.log('selectedAgent', selectedAgent);
    let selectedPro = [...selectedProducts];
    selectedPro.forEach(pro => {
      if (pro.SalesBillDetailsID === item.SalesBillDetailsID) {
        pro.SalesAgentCode = selectedAgent[0].SalesAgentCode;
        pro.value = value;
      }
    });
    setSelectedProducts(selectedPro);
  };

  return (
    <Design
      onClickPowerOff={onClickPowerOff}
      options={options}
      setOptions={setOptions}
      payments={payments}
      setPayments={setPayments}
      isToggle={isToggle}
      toggleFun={toggleFun}
      onInvoiceClick={onInvoiceClick}
      allCategoreis={allCategoreis}
      categoryProducts={categoryProducts}
      getSelectedCategoryProducts={getSelectedCategoryProducts}
      onSelectProduct={onSelectProduct}
      selectedProducts={selectedProducts}
      addProductToList={addProductToList}
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
      StringsList={props.StringsList}
      flatListRef={flatListRef}
      paymentsValue={paymentsValue}
      setPaymentsValue={setPaymentsValue}
      optionsValue={optionsValue}
      setOptionsValue={seOptionsValue}
      viewShotRef={viewShotRef}
      onCapture={onCapture}
      uriImage={uriImage}
      onSaveInvoice={onSaveInvoice}
      isInvoice={isInvoice}
      isTerminalSetup={isTerminalSetup}
      onClickSetting={onClickSetting}
      setTerminalSetup={setTerminalSetup}
      isPairPrinterFamily={isPairPrinterFamily}
      setPairPrinterFamily={setPairPrinterFamily}
      onEndEditing={onEndEditing}
      manuallyCount={manuallyCount}
      setmanuallyCount={setmanuallyCount}
      isLoading={isLoading}
      invoiceNumber={invoiceNumber}
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
      loyaltyList={loyaltyList}
      setBuyerInfo={setBuyerInfo}
      buyerInfo={buyerInfo}
      loyaltyCardViewRef={loyaltyCardViewRef}
      isLoyaltyCard={isLoyaltyCard}
      setIsLoyaltyCard={setIsLoyaltyCard}
      otherOptions={otherOptions}
      setRedeemPoints={setRedeemPoints}
      redeemPoints={redeemPoints}
      paymentsOpen={paymentsOpen}
      setPaymentsOpen={setPaymentsOpen}
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
      billFormatType={billFormatType}
      billDates={billDates}
      returnBill={returnBill}
      isLogout={isLogout}
      billingType={billingType}
      isBillingType={isBillingType}
      setisBillingType={setisBillingType}
      billingTypeData={billingTypeData}
      selectBillingType={selectBillingType}
      billingStyleId={billingStyleId}
      isInnerPrinter={isInnerPrinter}
      setInnerPrinter={setInnerPrinter}
      setClientCustomInvoice={setClientCustomInvoice}
      clientCustomInvoice={clientCustomInvoice}
      isPaidCash={isPaidCash}
      setIsPaidCash={setIsPaidCash}
      cashAmount={cashAmount}
      setCashAmount={setCashAmount}
      onChangePrice={onChangePrice}
      printType={printType}
      refundPayments={refundPayments}
      setRefundPayments={setRefundPayments}
      productTaxes={productTaxes}
      descriptionModal={descriptionModal}
      setDescriptionModal={setDescriptionModal}
      descriptionDetail={descriptionDetail}
      setDescriptionDetail={setDescriptionDetail}
      selectedProductNotes={selectedProductNotes}
      setSelectedProductsNotes={setSelectedProductsNotes}
      onSaveNotes={onSaveNotes}
      customerNotes={customerNotes}
      setCustomerNotes={setCustomerNotes}
      customerNotesOpen={customerNotesOpen}
      setCustomerNotesOpen={setCustomerNotesOpen}
      totalReprintCount={totalReprintCount}
    />
  );
};

const mapStateToProps = state => {
  return {
    TerminalConfiguration: state.user.SaveAllData.TerminalConfiguration,
    ProductsInfo: state.user.SaveAllData.ProductsInfo,
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
