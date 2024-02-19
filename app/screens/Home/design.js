import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  I18nManager,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from "react-native-swipe-list-view";
import ViewShot, { captureScreen } from "react-native-view-shot";
import moment from "moment";
import Barcode from "react-native-barcode-builder";
import sizeHelper from "../../helpers/sizeHelper";
import AppColor from "../../constant/AppColor";
import styles from "./style";
import Header from "../../components/Header";
import ProductItem from "../../components/ProductItem";
import AllCategories from "../../components/AllCategories";
import SelectedProductListItem from "../../components/SelectedProductListItem";
import CustomButton from "../../components/CustomButton";
import CustomDropDown from "../../components/CustomDropDown";
import DrawerPopUp from "../../components/DrawerPopUP";
import CreditInfoPopUP from "../../components/CreditInfoPopUp";
import TerminalSetup from "../../components/TerminalSetup";
import PairPrinterFamily from "../../components/PairPrinterFamily";
import Loading from "../../components/Loading";
import AlertModel from "../../components/AlertModel";
import HoldInvoices from "../../components/HoldInvoices";
import QRCodeScannerScreen from "../../components/BarCodeScanner";
import ReturnInvoice from "../../components/ReturnInvoice";
import AddSearchBuyer from "../../components/AddSearchBuyer";
import LoyaltyCard from "../../components/LoyaltyCard";
import GlobalTaxList from "../../components/GlobalTaxList";
import AddonsList from "../../components/AddonsList";
import IngredientsList from "../../components/IngredientsList";
import SelectedProductListItemMobile from "../../components/SelectedProductListItemMobile";
import DrawerPrint from "../../components/DrawerPrint";
import BillingType from "../../components/BillingType";
import CashPaidPopUp from "../../components/CashPaidPopUp";
import CustomModal from "../../components/CustomModal";
import CustomerNotes from "../../components/CustomerNotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScopedStorage from "react-native-scoped-storage";
const Design = (props) => {
  // const createFolderAndFile = async () => {
  //   try {
  //     // Open document tree and request permission
  //     const dir = await ScopedStorage.openDocumentTree();
  //     const bnodyDir = await ScopedStorage.createDirectory(
  //       dir.uri,
  //       "POS Bnody"
  //     );
  //     const invoicesFilePath = `${bnodyDir.uri}/invoices.txt`;

  //     // Write content to "invoices.txt" file
  // const isWrite = await ScopedStorage.writeFile(
  //   bnodyDir.uri,
  //   "",
  //   "invoices.txt",
  //   "text/plain",
  //   "utf8"
  // );
  // await AsyncStorage.setItem("invoicesFileUri", isWrite);
  // console.log("isWrite", isWrite);
  // readFileContent();
  // console.log("Folder and file created successfully.");
  //   } catch (error) {
  //     console.error("Error creating folder and file:", error);
  //   }
  // };
  // const readFileContent = async () => {
  //   try {
  //     // Retrieve the directory path from AsyncStorage
  //     const storedDir = await AsyncStorage.getItem("invoicesFileUri");
  //     console.log("File content:", storedDir);
  //     if (!storedDir) {
  //       console.error("Directory path not found in AsyncStorage.");
  //       return;
  //     }
  //     const content = await ScopedStorage.readFile(storedDir, "utf8");

  //     console.log("File content:", content);
  //   } catch (error) {
  //     console.error("Error reading file content:", error);
  //   }
  // };

  const [isCashPaidFocus, setisCashPaidFocus] = useState(false);
  const [globleDiscountFocus, setGlobleDiscountFocus] = useState(false);
  const [globleDiscountPFocus, setGlobleDiscountPFocus] = useState(false);
  const renderProductItem = ({ item, index }) => {
    return (
      <View style={styles.productItemContainer}>
        <ProductItem
          item={item}
          onSelectProduct={props.onSelectProduct}
          TerminalConfiguration={props.TerminalConfiguration}
          index={index}
        />
      </View>
    );
  };

  const renderSelectProduct = ({ item, index }) => {
    return sizeHelper.screenWidth > 450 ? (
      <View
        style={{
          margin: sizeHelper.calWp(7),
        }}
      >
        <SelectedProductListItem
          item={item}
          TerminalConfiguration={props.TerminalConfiguration}
          onPressIncrementDecrement={props.addProductToList}
          onChangeText={props.onChangeText}
          manuallyCount={props.manuallyCount}
          onEndEditing={props.onEndEditing}
          AgentList={props.AgentList}
          setmanuallyCount={props.setmanuallyCount}
          setLoading={props.setLoading}
          index={index}
          userConfiguration={props.userConfiguration}
          noOfProducts={item.srNo}
          getAddOnProducts={props.getAddOnProducts}
          onManuallyChangePrice={props.onManuallyChangePrice}
          onChangePrice={props.onChangePrice}
          StringsList={props.StringsList}
          disabled={props.returnInvoiceNumber ? true : false}
          getProductsIngredients={props.getProductsIngredients}
          productAssignSaleAgent={props.productAssignSaleAgent}
          onClickIn={props.onClickIn}
          setAddProductLoader={props.setAddProductLoader}
          props={props}
          printType={props.printType}
          descriptionModal={props.descriptionModal}
          setDescriptionModal={props.setDescriptionModal}
          descriptionDetail={props.descriptionDetail}
          setDescriptionDetail={props.setDescriptionDetail}
          selectedProductNotes={props.selectedProductNotes}
          setSelectedProductsNotes={props.setSelectedProductsNotes}
          onSaveNotes={props.onSaveNotes}
        />
      </View>
    ) : (
      <View
        style={{
          margin: sizeHelper.calWp(7),
          //  backgroundColor: "green"
        }}
      >
        <SelectedProductListItemMobile
          item={item}
          TerminalConfiguration={props.TerminalConfiguration}
          onPressIncrementDecrement={props.addProductToList}
          onChangeText={props.onChangeText}
          manuallyCount={props.manuallyCount}
          onEndEditing={props.onEndEditing}
          AgentList={props.AgentList}
          setmanuallyCount={props.setmanuallyCount}
          setLoading={props.setLoading}
          index={index}
          userConfiguration={props.userConfiguration}
          noOfProducts={item.srNo}
          getAddOnProducts={props.getAddOnProducts}
          onManuallyChangePrice={props.onManuallyChangePrice}
          StringsList={props.StringsList}
          disabled={props.returnInvoiceNumber ? true : false}
          getProductsIngredients={props.getProductsIngredients}
          productAssignSaleAgent={props.productAssignSaleAgent}
          onClickIn={props.onClickIn}
          setAddProductLoader={props.setAddProductLoader}
          props={props}
          onChangePrice={props.onChangePrice}
          printType={props.printType}
          descriptionModal={props.descriptionModal}
          setDescriptionModal={props.setDescriptionModal}
          descriptionDetail={props.descriptionDetail}
          setDescriptionDetail={props.setDescriptionDetail}
          selectedProductNotes={props.selectedProductNotes}
          setSelectedProductsNotes={props.setSelectedProductsNotes}
          onSaveNotes={props.onSaveNotes}
        />
      </View>
    );
  };

  const amountDetails = [
    { id: "subTotal:", title: `${props.StringsList._19}:`, value: "0" },
    { id: "VAT:", title: `${props.StringsList._180}:`, value: "0" },
    { id: "discountP:", title: `${props.StringsList._7}:`, value: "0" },
    { id: "discount:", title: `${props.StringsList._20}:`, value: "0" },
    { id: "total:", title: `${props.StringsList._23}:`, value: "0" },
    { id: "paidAmount:", title: `${props.StringsList._15}:`, value: "0" },
  ];

  const InoviceAmountDetails = [
    {
      id: "subTotal",
      title: `${props.StringsList._19}:`,
      value: (props.subPrice - props.sumOfProductTax).toFixed(
        props.TerminalConfiguration?.DecimalsInAmount
      ),
    },
    {
      id: "Tax",
      title: `${props.StringsList._13}:`,
      value: (props.globalTax + props.sumOfProductTax).toFixed(
        props.TerminalConfiguration?.DecimalsInAmount
      ),
    },
    {
      id: "Discount",
      title: `${props.StringsList._20}:`,
      value: (props.globalDiscountAmount + props.sumOfProductDiscount).toFixed(
        props.TerminalConfiguration?.DecimalsInAmount
      ),
    },
    {
      id: "Total",
      title: `${props.StringsList._23}:`,
      value: props.totalPrice.toFixed(
        props.TerminalConfiguration?.DecimalsInAmount
      ),
    },
  ];

  const renderHiddenItem = ({ item, index }) => {
    !props.returnInvoiceNumber ? (
      <View
        style={[
          styles.hiddenItemContainer,
          {
            height: item.IsParentAddOn
              ? sizeHelper.calHp(100)
              : sizeHelper.calHp(80),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => props.deleteItem(item, index)}
        >
          <Icon name="trash-o" size={20} color={AppColor.white} />
        </TouchableOpacity>
      </View>
    ) : item.IsParentAddOn && props.returnInvoiceNumber ? (
      <View
        style={[
          styles.hiddenItemContainer,
          {
            height: item.IsParentAddOn
              ? sizeHelper.calHp(100)
              : sizeHelper.calHp(80),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => props.deleteItem(item, index)}
        >
          <Icon name="trash-o" size={24} color={AppColor.white} />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const amountDetailsFun = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          maxHeight: sizeHelper.calHp(400),
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 1,
            marginStart: sizeHelper.calWp(5),
            paddingHorizontal: sizeHelper.calWp(22),
            paddingVertical: sizeHelper.calWp(15),
            backgroundColor: AppColor.white,
            borderRadius: sizeHelper.calWp(15),
          }}
        >
          {amountDetails.map((item) => {
            return (
              <View key={item.title} style={styles.titleValueContainer}>
                <Text
                  style={[
                    styles.titleValueStyle,
                    {
                      color:
                        item.id === "discount:" || item.id === "discountP:"
                          ? AppColor.red
                          : item.id === "paidAmount:"
                          ? AppColor.blue2
                          : AppColor.black,
                    },
                  ]}
                >
                  {item.title}
                </Text>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  {item.id === "discount:" || item.id === "discountP:" ? (
                    <TextInput
                      keyboardType="decimal-pad"
                      onChangeText={(text) =>
                        props.onChangeText("globalDiscount", text, item)
                      }
                      onEndEditing={(text) => {
                        if (item.id === "discount:") {
                          setGlobleDiscountFocus(false);
                          props.onEndEditing("globalDiscount", item);
                        } else if (item.id === "discountP:") {
                          setGlobleDiscountPFocus(false);
                          props.onEndEditing("globalDiscountP", item);
                        } else {
                          setisCashPaidFocus(false);
                          props.onEndEditing("cashPaid", item);
                        }
                      }}
                      editable={
                        (item.id === "discount:" || item.id === "discountP:") &&
                        props?.TerminalConfiguration
                          ?.IsDiscountOnSalesInvoice === "true" &&
                        props.selectedProducts.length > 0 &&
                        !props.isInvoice &&
                        !props.returnInvoiceNumber &&
                        props?.userConfiguration?.DiscountAllowed === 1
                      }
                      placeholderTextColor={
                        item.id === "discount:" || item.id === "discountP:"
                          ? AppColor.red
                          : item.id === "paidAmount:"
                          ? AppColor.blue2
                          : AppColor.black
                      }
                      style={[
                        styles.inputField,
                        {
                          color: globleDiscountFocus
                            ? AppColor.black
                            : item.id === "discount:" ||
                              item.id === "discountP:"
                            ? AppColor.red
                            : item.id === "paidAmount:"
                            ? AppColor.blue2
                            : AppColor.black,
                        },
                      ]}
                      onFocus={() => {
                        if (item.id === "discount:") {
                          setGlobleDiscountFocus(true);
                          props.setmanuallyCount(props.globalDiscountAmount);
                        } else if (item.id === "discountP:") {
                          setGlobleDiscountPFocus(true);
                          props.setmanuallyCount(props.globalDiscountRate);
                        } else {
                          setisCashPaidFocus(true);
                          props.setmanuallyCount(props.advancePaidInCash);
                        }
                      }}
                      value={
                        globleDiscountFocus && item.id === "discount:"
                          ? undefined
                          : globleDiscountPFocus && item.id === "discountP:"
                          ? undefined
                          : isCashPaidFocus && item.id === "paidAmount:"
                          ? undefined
                          : item.id === "discount:"
                          ? String(
                              props.globalDiscountAmount?.toFixed(
                                props.TerminalConfiguration?.DecimalsInAmount
                              )
                            )
                          : item.id === "discountP:"
                          ? String(
                              props.globalDiscountRate?.toFixed(
                                props.TerminalConfiguration?.DecimalsInAmount
                              )
                            )
                          : props.advancePaidInCash
                          ? String(
                              props.advancePaidInCash?.toFixed(
                                props.TerminalConfiguration?.DecimalsInAmount
                              )
                            )
                          : String(
                              props.totalPrice?.toFixed(
                                props.TerminalConfiguration?.DecimalsInAmount
                              )
                            )
                      }
                      placeholder="0.00"
                    />
                  ) : (
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      disabled={
                        props.selectedProducts?.length === 0 ||
                        item.id !== "VAT:" ||
                        props.TerminalConfiguration?.IsTaxOnSalesInvoice !==
                          "true" ||
                        props.isInvoice ||
                        props.returnInvoiceNumber
                      }
                      onPress={() => {
                        props.setIsGlobalTax(true);
                      }}
                    >
                      {item.id === "VAT:" && (
                        <Icon
                          name={"angle-down"}
                          size={sizeHelper.calWp(25)}
                          color={AppColor.black}
                          style={{ marginEnd: sizeHelper.calWp(10) }}
                        />
                      )}
                      <Text
                        style={[
                          styles.titleValueStyle2,
                          {
                            color:
                              item.id === "discount:" ||
                              item.id === "discountP:"
                                ? AppColor.red
                                : item.id === "paidAmount:"
                                ? AppColor.blue2
                                : AppColor.black,
                          },
                        ]}
                      >
                        {item.id === "subTotal:"
                          ? props.subPrice?.toFixed(
                              props.TerminalConfiguration?.DecimalsInAmount
                            )
                          : item.id === "discount:"
                          ? props.globalDiscountAmount?.toFixed(
                              props.TerminalConfiguration?.DecimalsInAmount
                            )
                          : item.id === "discountP:"
                          ? props.globalDiscountAmount?.toFixed(
                              props.TerminalConfiguration?.DecimalsInAmount
                            )
                          : item.id === "total:"
                          ? props.totalPrice?.toFixed(
                              props.TerminalConfiguration?.DecimalsInAmount
                            )
                          : item.id === "paidAmount:"
                          ? props.advancePaidInCash
                            ? String(
                                props.advancePaidInCash?.toFixed(
                                  props.TerminalConfiguration?.DecimalsInAmount
                                )
                              )
                            : String(
                                props.totalPrice?.toFixed(
                                  props.TerminalConfiguration?.DecimalsInAmount
                                )
                              )
                          : item.id === "due:"
                          ? props.dueAmount?.toFixed(
                              props.TerminalConfiguration?.DecimalsInAmount
                            )
                          : item.id === "VAT:"
                          ? props.globalTax?.toFixed(
                              props.TerminalConfiguration?.DecimalsInAmount
                            )
                          : item?.value}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {(item.id === "discount:" || item.id === "paidAmount:") && (
                    <View
                      style={[
                        styles.dashedLine,
                        {
                          borderColor:
                            item.id === "discount:"
                              ? AppColor.red
                              : item.id === "paidAmount:"
                              ? AppColor.blue2
                              : AppColor.black,
                        },
                      ]}
                    >
                      <View
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          width: "100%",
                          height: 1,
                          backgroundColor: AppColor.white,
                          zIndex: 1,
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  let currentDate = moment().format("DD/MM/YYYY HH:mm:ss");
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.setoptionsOpen(false);
        props.setPaymentsOpen(false);
      }}
    >
      <View style={styles.mainContainer}>
        <View style={{ position: "absolute", top: -400 }}>{<props.QR />}</View>

        <StatusBar hidden={true} />

        <Header props={props} />
        {props.noFamilyFound ? null : !props.isToggle ? (
          <AllCategories
            data={props.allCategoreis}
            focus={props.focus}
            disabled={props.returnInvoiceNumber ? true : false}
            onPressItem={props.getSelectedCategoryProducts}
            flatListRef={props.flatListRef}
          />
        ) : null}

        <View style={{ paddingHorizontal: sizeHelper.calWp(24) }}>
          {!props.isToggle ? (
            <View
              style={[
                styles.productListContainer,
                {
                  height:
                    sizeHelper.screenWidth < 450 && props.noFamilyFound
                      ? sizeHelper.calHp(620)
                      : sizeHelper.screenWidth < 450
                      ? sizeHelper.calHp(450)
                      : props.noFamilyFound
                      ? sizeHelper.calHp(740)
                      : sizeHelper.calHp(480),
                },
              ]}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                  width: "100%",
                }}
                numColumns={sizeHelper.screenWidth > 450 ? 4 : 3}
                nestedScrollEnabled
                contentContainerStyle={{
                  paddingBottom: 20,
                  // marginStart: sizeHelper.calWp(-4),
                  // marginEnd: sizeHelper.calWp(-4)
                }}
                data={props.categoryProducts.filter((product) =>
                  product?.ProductName.includes(props.searchText)
                )}
                extraData={props.categoryProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => "_" + item.ProductBarCode}
                key={"_"}
              />
            </View>
          ) : (
            <View
              style={[
                styles.selectedProductListContainer,
                {
                  height:
                    sizeHelper.screenWidth < 450
                      ? sizeHelper.calHp(680)
                      : props.noFamilyFound || props.isToggle
                      ? sizeHelper.calHp(750)
                      : sizeHelper.calHp(750),
                },
              ]}
            >
              <SwipeListView
                showsVerticalScrollIndicator={false}
                disableRightSwipe={I18nManager.isRTL ? false : true}
                disableLeftSwipe={I18nManager.isRTL ? true : false}
                data={props.selectedProducts}
                extraData={props.selectedProducts}
                renderItem={renderSelectProduct}
                renderHiddenItem={(data, index, rowMap) =>
                  renderHiddenItem(data, index)
                }
                rightOpenValue={sizeHelper.calWp(-100)}
                leftOpenValue={sizeHelper.calWp(100)}
                keyExtractor={(item) => item.SalesBillDetailsID.toString()}
                key={"_"}
              />
            </View>
          )}
          <KeyboardAvoidingView
            behavior={
              globleDiscountFocus || globleDiscountPFocus
                ? "position"
                : "padding"
            }
            style={styles.amountDetailsContianer}
          >
            {amountDetailsFun()}
          </KeyboardAvoidingView>
          {sizeHelper.screenWidth > 450 ? (
            <View style={styles.buttonsContainer}>
              <View style={{ zIndex: 0 }}>
                <CustomButton
                  containerStyle={{
                    height: sizeHelper.calWp(50),
                    width:
                      props.terminalSetup?.DeliveryNotes === "true"
                        ? sizeHelper.calWp(150)
                        : sizeHelper.calWp(166.66),
                  }} //new
                  title={props.StringsList._4}
                  onPressButton={props.onNewInvoice}
                  // onPressButton={createFolderAndFile}
                  isDisabled={props.invoiceNumber !== null ? true : false}
                  backgroundColor={AppColor.blue2}
                />
              </View>

              <CustomDropDown
                dropDownWidth={
                  props.terminalSetup?.DeliveryNotes === "true"
                    ? sizeHelper.calWp(150)
                    : sizeHelper.calWp(166.66)
                } //option
                dropDownHeight={sizeHelper.calWp(46)}
                items={props.options}
                setItems={props.setOptions}
                placeholderTitle={props.StringsList._309}
                setValue={props.setOptionsValue}
                value={props.optionsValue}
                disabled={props.returnInvoiceNumber === null ? true : false}
                onChangeValue={props.onChangeText}
                open={props.optionsOpen}
                setOpen={props.setoptionsOpen}
              />

              {props.returnInvoiceNumber ? (
                <View>
                  {props.buyerInfo ? (
                    <CustomDropDown
                      dropDownWidth={sizeHelper.calWp(150)} //payments
                      dropDownHeight={sizeHelper.calWp(46)}
                      // items={props.payments}
                      items={
                        !props.returnInvoiceNumber
                          ? props.payments
                          : props.refundPayments
                      }
                      setItems={props.setPayments}
                      placeholderTitle={props.StringsList._435}
                      setValue={props.setPaymentsValue}
                      value={props.paymentsValue}
                      disabled={
                        props.selectedProducts.length < 1 ? true : false
                      }
                      open={props.paymentsOpen}
                      setOpen={props.setPaymentsOpen}
                    />
                  ) : (
                    <CustomButton
                      containerStyle={[
                        {
                          height: sizeHelper.calWp(50),
                          width:
                            props.terminalSetup?.DeliveryNotes === "true"
                              ? sizeHelper.calWp(150)
                              : sizeHelper.calWp(166.66),
                        },
                        { backgroundColor: AppColor.red1 },
                      ]}
                      isDisabled={
                        props.selectedProducts.length < 1 ? true : false
                      }
                      title={props.StringsList._153}
                      backgroundColor={AppColor.blue2}
                      onPressButton={() => {
                        props.setPaymentsValue("1");
                      }}
                    />
                  )}
                </View>
              ) : (
                <CustomDropDown
                  dropDownWidth={sizeHelper.calWp(150)} //payments
                  dropDownHeight={sizeHelper.calWp(46)}
                  items={props.payments}
                  setItems={props.setPayments}
                  placeholderTitle={props.StringsList._435}
                  setValue={props.setPaymentsValue}
                  value={props.paymentsValue}
                  disabled={props.selectedProducts.length < 1 ? true : false}
                  open={props.paymentsOpen}
                  setOpen={props.setPaymentsOpen}
                />
              )}
              <View style={{ zIndex: 0 }}>
                <CustomButton
                  containerStyle={[
                    {
                      height: sizeHelper.calWp(50),
                      width:
                        props.terminalSetup?.DeliveryNotes === "true"
                          ? sizeHelper.calWp(150)
                          : sizeHelper.calWp(166.66),
                    },
                    { backgroundColor: AppColor.red1 },
                  ]}
                  title={
                    props.invoiceNumber
                      ? props.StringsList._2
                      : props.StringsList._438
                  }
                  backgroundColor={
                    props.invoiceNumber ? AppColor.red1 : AppColor.blue2
                  }
                  onPressButton={props.onClickCancel}
                />
              </View>
              {props.terminalSetup?.DeliveryNotes === "true" &&
                !props.returnInvoiceNumber && (
                  <TouchableOpacity
                    onPress={() => props.setCustomerNotesOpen(true)}
                    style={{
                      zIndex: 0,
                      backgroundColor: AppColor.blue2,
                      height: 40,
                      width: 40,
                      borderRadius: sizeHelper.calWp(5),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="sticky-note-o"
                      size={sizeHelper.calWp(22)}
                      color="white"
                    />
                  </TouchableOpacity>
                )}
            </View>
          ) : (
            // Small Devices Only
            <View style={styles.buttonsContainerV2}>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View style={{ zIndex: 0 }}>
                  <CustomButton
                    containerStyle={[
                      {
                        height: sizeHelper.calWp(50),
                        width:
                          props.terminalSetup?.DeliveryNotes === "true"
                            ? sizeHelper.calWp(280)
                            : sizeHelper.calWp(310),
                      },
                    ]} //new
                    title={props.StringsList._4}
                    onPressButton={props.onNewInvoice}
                    isDisabled={props.invoiceNumber}
                    backgroundColor={AppColor.blue2}
                  />
                </View>
                <CustomDropDown
                  dropDownWidth={
                    props.terminalSetup?.DeliveryNotes === "true"
                      ? sizeHelper.calWp(280)
                      : sizeHelper.calWp(310)
                  } //payments
                  dropDownHeight={sizeHelper.calWp(50)}
                  items={props.payments}
                  setItems={props.setPayments}
                  placeholderTitle={props.StringsList._435}
                  setValue={props.setPaymentsValue}
                  value={props.paymentsValue}
                  disabled={props.selectedProducts.length < 1}
                  open={props.paymentsOpen}
                  setOpen={props.setPaymentsOpen}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: sizeHelper.calHp(14),
                }}
              >
                {props.returnInvoiceNumber ? (
                  <View>
                    {props.buyerInfo ? (
                      <CustomDropDown
                        dropDownWidth={
                          props.terminalSetup?.DeliveryNotes === "true"
                            ? sizeHelper.calWp(280)
                            : sizeHelper.calWp(310)
                        } //payments
                        dropDownHeight={sizeHelper.calWp(50)}
                        // items={props.payments}
                        items={
                          !props.returnInvoiceNumber
                            ? props.payments
                            : props.refundPayments
                        }
                        setItems={props.setPayments}
                        placeholderTitle={props.StringsList._435}
                        setValue={props.setPaymentsValue}
                        value={props.paymentsValue}
                        disabled={props.selectedProducts.length < 1}
                        open={props.paymentsOpen}
                        setOpen={props.setPaymentsOpen}
                      />
                    ) : (
                      <CustomButton
                        isDisabled={props.selectedProducts.length < 1}
                        containerStyle={[
                          {
                            height: sizeHelper.calWp(50),
                            width:
                              props.terminalSetup?.DeliveryNotes === "true"
                                ? sizeHelper.calWp(280)
                                : sizeHelper.calWp(310),
                          },
                          {
                            backgroundColor: AppColor.red1,

                            // marginTop: sizeHelper.calHp(10),
                          },
                        ]}
                        title={props.StringsList._153}
                        backgroundColor={AppColor.blue2}
                        onPressButton={() => {
                          props.setPaymentsValue("1");
                        }}
                      />
                    )}
                  </View>
                ) : (
                  <CustomDropDown
                    dropDownWidth={
                      props.terminalSetup?.DeliveryNotes === "true"
                        ? sizeHelper.calWp(280)
                        : sizeHelper.calWp(310)
                    } //option
                    dropDownHeight={sizeHelper.calWp(50)}
                    items={props.options}
                    setItems={props.setOptions}
                    placeholderTitle={props.StringsList._309}
                    setValue={props.setOptionsValue}
                    value={props.optionsValue}
                    disabled={props.returnInvoiceNumber}
                    onChangeValue={props.onChangeText}
                    open={props.optionsOpen}
                    setOpen={props.setoptionsOpen}
                  />
                )}

                <View style={{ zIndex: 0 }}>
                  <CustomButton //cancel
                    containerStyle={[
                      {
                        height: sizeHelper.calWp(50),
                        width:
                          props.terminalSetup?.DeliveryNotes === "true"
                            ? sizeHelper.calWp(280)
                            : sizeHelper.calWp(310),
                      },
                      {
                        backgroundColor: AppColor.red1,

                        // marginTop: sizeHelper.calHp(10),
                      },
                    ]}
                    title={
                      props.invoiceNumber
                        ? props.StringsList._2
                        : props.StringsList._438
                    }
                    backgroundColor={
                      props.invoiceNumber ? AppColor.red1 : AppColor.blue2
                    }
                    onPressButton={props.onClickCancel}
                  />
                </View>
                {props.terminalSetup?.DeliveryNotes === "true" &&
                  !props.returnInvoiceNumber && (
                    <TouchableOpacity
                      onPress={() => props.setCustomerNotesOpen(true)}
                      style={{
                        zIndex: 0,
                        backgroundColor: AppColor.blue2,
                        height: 25,
                        width: 25,
                        borderRadius: sizeHelper.calWp(5),
                        justifyContent: "center",
                        alignItems: "center",
                        // marginTop: sizeHelper.calHp(10),
                      }}
                    >
                      <Icon
                        name="sticky-note-o"
                        size={sizeHelper.calWp(30)}
                        color="white"
                      />
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          )}
        </View>
        {props.isDrawar && (
          <View style={styles.popupContainer}>
            <DrawerPopUp
              StringsList={props.StringsList}
              userConfiguration={props.userConfiguration}
              TerminalConfiguration={props.TerminalConfiguration}
              cancel={() => {
                props.drawerRef.current?.fadeOutRight().then(() => {
                  props.setIsDrawar(!props.isDrawar);
                  props.getDrawerSetting();
                });
              }}
              onsave={() => props.setIsDrawar(!props.isDrawar)}
              viewref={props.drawerRef}
            />
          </View>
        )}
        {props.isIngredient && (
          <View style={[styles.popupContainer]}>
            <IngredientsList
              onPressCancel={() => props.setIsIngredient(false)}
              reacallFunc={props.onSelectIngredintes}
              data={
                props.isIngredientSearch
                  ? props.searchIngredient
                  : props.ingredientsData
              }
              StringsList={props.StringsList}
              isLoading={props.isLoading}
              onPressAddIntgredient={props.onPressAddIntgredient}
              onChangeText={props.searchIngredientFun}
              isGlobal
            />
          </View>
        )}

        {props.isPopup && (
          <View style={styles.popupContainer}>
            <KeyboardAvoidingView
              behavior="padding"
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CreditInfoPopUP
                StringsList={props.StringsList}
                cancel={props.paymentMethodSelect}
                viewref={props.viewref}
                totalPrice={props.totalPrice}
                isCredit={props.paymentsValue === "2"}
                cashPaidAmountFun={props.cashPaidAmountFun}
                buyerInfo={props.buyerInfo}
                setCashAmount={props.setCashAmount}
              />
            </KeyboardAvoidingView>
          </View>
        )}
        {props.isBuyer && (
          <View style={styles.popupContainer}>
            <KeyboardAvoidingView
              behavior="padding"
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <AddSearchBuyer
                StringsList={props.StringsList}
                cancel={props.otherOptions}
                buyerViewRef={props.buyerViewRef}
                loyaltyList={props.loyaltyList}
                setBuyerInfo={props.setBuyerInfo}
                buyerInfo={props.buyerInfo}
                TerminalConfiguration={props.TerminalConfiguration}
                props={props}
              />
            </KeyboardAvoidingView>
          </View>
        )}
        {props.isLoyaltyCard && (
          <View style={styles.popupContainer}>
            <KeyboardAvoidingView
              behavior="padding"
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <LoyaltyCard
                StringsList={props.StringsList}
                cancel={props.otherOptions}
                loyaltyCardViewRef={props.loyaltyCardViewRef}
                setRedeemPoints={props.setRedeemPoints}
                redeemPoints={props.redeemPoints}
                buyerInfo={props.buyerInfo}
              />
            </KeyboardAvoidingView>
          </View>
        )}

        {props.isInvoice && (
          <View style={styles.popupContainer}>
            <View style={styles.invoiceContainer}>
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                  overScrollMode={"never"}
                  contentContainerStyle={{ flexGrow: 1, zIndex: 9999999 }}
                  style={{
                    flexGrow: 1,

                    paddingVertical: 2,
                  }}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ flex: 1 }}>
                    <ViewShot
                      style={styles.viewShotStyle}
                      ref={props.qrRef2}
                      onCapture={props.onQRImage}
                      // ref={props.viewShotRef}
                      // onCapture={props.onCapture}

                      captureMode="mount"
                    >
                      <View>
                        {props.TerminalConfiguration?.IsGodownInfo === "true"
                          ? !!props?.TerminalConfiguration?.GoDownLogo && (
                              <Image
                                source={{
                                  uri:
                                    props?.TerminalConfiguration
                                      ?.GoDownLogoType +
                                    "," +
                                    props?.TerminalConfiguration?.GoDownLogo,
                                }}
                                style={{
                                  // backgroundColor: "green",
                                  height: sizeHelper.calHp(150),
                                  width: sizeHelper.calWp(155),
                                  resizeMode: "contain",
                                  alignSelf: "center",
                                  alignItems: "center",
                                }}
                              />
                            )
                          : !!props?.TerminalConfiguration?.CompanyLogo && (
                              <Image
                                source={{
                                  uri:
                                    props?.TerminalConfiguration
                                      ?.CompanyLogoType +
                                    "," +
                                    props?.TerminalConfiguration?.CompanyLogo,
                                }}
                                style={{
                                  //   backgroundColor: "green",
                                  height: sizeHelper.calHp(150),
                                  width: sizeHelper.calWp(155),
                                  resizeMode: "contain",
                                  alignSelf: "center",
                                  alignItems: "center",
                                }}
                              />
                            )}
                        {/* {(!props.companyVATRegistor) ?
                          <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(35), alignSelf: "center" }]}>
                            {I18nManager.isRTL ? "فاتورة مبيعات عادية" : " Ordinary sales invoice"}
                          </Text>
                          : props.totalPrice < 1000 ?
                            <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(35), alignSelf: "center" }]}>
                              {I18nManager.isRTL ? "فاتورة ضريبية مبسطة" : "Simplified tax invoice"}
                            </Text> :
                            <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(35), alignSelf: "center" }]}>
                              {I18nManager.isRTL ? "فاتورة ضريبية" : "Tax invoice"}
                            </Text>} */}

                        {props.returnInvoiceNumber ? (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                // marginBottom: 3,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {I18nManager.isRTL
                              ? "استرداد المبيعات"
                              : "Sales Refund"}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                // marginBottom: 3,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.billingType.name}
                          </Text>
                        )}

                        {!!props.TerminalConfiguration?.Heading1 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                // marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading1}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Heading2 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                // marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading2}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Heading3 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading3}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Heading4 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                // marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading4}
                          </Text>
                        )}
                        {props.TerminalConfiguration?.IsGodownInfo === "true"
                          ? !!props.TerminalConfiguration?.GoDownName && (
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    // marginBottom: 10,
                                    fontSize: sizeHelper.calHp(35),
                                    alignSelf: "center",
                                  },
                                ]}
                              >
                                {props.TerminalConfiguration.GoDownName}
                              </Text>
                            )
                          : !!props.TerminalConfiguration?.CompanyName && (
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    // marginBottom: 10,
                                    fontSize: sizeHelper.calHp(35),
                                    alignSelf: "center",
                                  },
                                ]}
                              >
                                {props.TerminalConfiguration.CompanyName}
                              </Text>
                            )}
                        {props.totalReprintCount !== null ? (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    // marginBottom: sizeHelper.calHp(5),
                                    alignSelf: "flex-start",
                                  },
                                ]}
                              >
                                Reprint :{" " + props.totalReprintCount}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    letterSpacing: 2,
                                    fontSize: sizeHelper.calHp(35),
                                    alignSelf: "center",
                                  },
                                ]}
                              >
                                {currentDate}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  letterSpacing: 2,
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: "center",
                                },
                              ]}
                            >
                              {currentDate}
                            </Text>
                          </View>
                        )}

                        <View style={styles.divider} />
                        <Text
                          style={[
                            styles.invoiceHeaderText,
                            {
                              // marginBottom: sizeHelper.calHp(5),
                              alignSelf: "flex-start",
                            },
                          ]}
                        >
                          {props.terminalSetup?.StartFrom}
                        </Text>

                        <Text
                          style={[
                            styles.invoiceHeaderText,
                            {
                              alignSelf: "center",
                              fontSize: sizeHelper.calHp(35),
                            },
                          ]}
                        >
                          {props.StringsList._180}
                          {" : "}
                          {props.TerminalConfiguration?.ValueAddedTaxNumber}
                        </Text>

                        <Barcode
                          value={
                            props.returnInvoiceNumber
                              ? props.returnInvoiceNumber
                              : props.invoiceNumber
                          }
                          format={"CODE128"}
                          height={70}
                        />

                        <Text
                          style={{
                            marginTop: -5,
                            color: "black",
                            letterSpacing: 18,
                            fontSize: sizeHelper.calHp(20),
                            alignSelf: "center",
                          }}
                        >
                          {props.returnInvoiceNumber
                            ? props.returnInvoiceNumber
                            : props.invoiceNumber}
                        </Text>

                        {props.billDates && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 2,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.billDates}
                          </Text>
                        )}
                        <Text
                          style={[
                            styles.invoiceHeaderText,
                            {
                              marginBottom: 10,
                              letterSpacing: 8,
                              fontSize: sizeHelper.calHp(40),
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {props.returnInvoiceNumber
                            ? props.returnInvoiceNumber
                            : props.invoiceNumber}
                        </Text>
                        {props.returnInvoiceNumber && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 10,
                                letterSpacing: 8,
                                fontSize: sizeHelper.calHp(40),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.invoiceNumber}
                          </Text>
                        )}
                        {props.billingStyleId === 2 && (
                          <View style={styles.invoiceHeader}>
                            <View style={{ width: "40%" }}>
                              <Text style={styles.invoiceHeaderText}>
                                {props.StringsList._76}
                              </Text>
                            </View>
                            <View style={{ width: "20%" }}>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  { alignSelf: "flex-start" },
                                ]}
                              >
                                {props.StringsList._98}
                              </Text>
                            </View>
                            <View style={{ width: "15%" }}>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  { alignSelf: "center" },
                                ]}
                              >
                                {I18nManager.isRTL
                                  ? props.StringsList._177
                                  : "QTY"}
                              </Text>
                            </View>
                            <View style={{ width: "25%" }}>
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  { alignSelf: "flex-end" },
                                ]}
                              >
                                {props.StringsList._366}
                              </Text>
                            </View>
                          </View>
                        )}
                        <View
                          style={[
                            styles.divider,
                            { marginBottom: sizeHelper.calHp(5) },
                          ]}
                        />
                        {props.selectedProducts.map((item, index) => {
                          return props.billingStyleId === 2 ? (
                            <View
                              // id={index + item}
                              style={styles.invoiceListContainer}
                            >
                              <View style={{ width: "40%" }}>
                                <Text style={[styles.titleValueStyle]}>
                                  {I18nManager.isRTL
                                    ? item.ProductName2
                                    : item.ProductName}
                                </Text>
                                {props?.terminalSetup?.printGroupProducts ===
                                  "true" &&
                                  item.innerProductsArray?.length > 0 &&
                                  item?.ProductType === 3 &&
                                  item.innerProductsArray.map(
                                    (product, index) => {
                                      return (
                                        <View>
                                          <Text
                                            style={{
                                              fontSize: props.isInnerPrinter
                                                ? sizeHelper.calHp(28)
                                                : sizeHelper.calHp(22),
                                              color: AppColor.black,
                                              fontFamily: "ProximaNova-Regular",
                                              textAlign: "left",
                                              marginVertical: 2,
                                            }}
                                          >
                                            {I18nManager.isRTL
                                              ? product.ProductName2
                                              : product.ProductName}
                                            {product?.UOMFragment !== 0 &&
                                              (I18nManager.isRTL
                                                ? " - " + product.UOMName2
                                                : " - " + product.UOMName)}
                                          </Text>
                                        </View>
                                      );
                                    }
                                  )}
                                {item?.Description !== "" && (
                                  <View
                                    style={{
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginBottom: 35,
                                    }}
                                  >
                                    <View>
                                      <Text
                                        style={{
                                          fontSize: props.isInnerPrinter
                                            ? sizeHelper.calHp(28)
                                            : sizeHelper.calHp(25),

                                          color: AppColor.black,
                                          fontFamily: "ProximaNova-Regular",
                                          textAlign: "left",
                                        }}
                                      >
                                        {item?.Description}
                                      </Text>
                                    </View>
                                  </View>
                                )}
                                {item.IngredientNames !== "" && (
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      { fontSize: sizeHelper.calHp(25) },
                                    ]}
                                  >
                                    {item.IngredientNames}
                                  </Text>
                                )}
                              </View>
                              <View style={{ width: "20%" }}>
                                <Text
                                  style={[
                                    styles.titleValueStyle,
                                    { alignSelf: "flex-start" },
                                  ]}
                                >
                                  {item.PriceWithOutTax}
                                </Text>
                              </View>
                              <View style={{ width: "15%" }}>
                                <Text
                                  style={[
                                    styles.titleValueStyle,
                                    { alignSelf: "center" },
                                  ]}
                                >
                                  {item.IsParentAddOn
                                    ? item.Quantity
                                    : item.Quantity * item.OrignalQuantity}
                                </Text>
                              </View>
                              <View style={{ width: "25%" }}>
                                <Text
                                  style={[
                                    styles.titleValueStyle,
                                    { alignSelf: "flex-end" },
                                  ]}
                                >
                                  {item.FreeProduct
                                    ? "0.00"
                                    : item.PriceOriginal.toFixed(
                                        props.TerminalConfiguration
                                          .DecimalsInAmount
                                      ) * item.Quantity}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <View
                              // id={index + item}
                              style={styles.invoiceListContainer}
                            >
                              <View style={{ width: "65%" }}>
                                <Text style={[styles.titleValueStyle]}>
                                  {I18nManager.isRTL
                                    ? item.ProductName2
                                    : item.ProductName}
                                  {item?.UOMFragment !== 0 &&
                                    (I18nManager.isRTL
                                      ? " - " + item.UOMName2
                                      : " - " + item.UOMName)}
                                </Text>
                                <Text style={styles.titleValueStyle}>
                                  {"@ " + item.PriceWithOutTax + " X "}
                                  {item.IsParentAddOn
                                    ? item.Quantity
                                    : item.Quantity * item.OrignalQuantity}
                                </Text>
                                {item?.Description !== "" && (
                                  <View
                                    style={{
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginBottom: 35,
                                    }}
                                  >
                                    <View>
                                      <Text
                                        style={{
                                          fontSize: props.isInnerPrinter
                                            ? sizeHelper.calHp(28)
                                            : sizeHelper.calHp(25),

                                          color: AppColor.black,
                                          fontFamily: "ProximaNova-Regular",
                                          textAlign: "left",
                                        }}
                                      >
                                        {item?.Description}
                                      </Text>
                                    </View>
                                  </View>
                                )}
                                {props?.terminalSetup?.printGroupProducts ===
                                  "true" &&
                                  item.innerProductsArray?.length > 0 &&
                                  item?.ProductType === 3 &&
                                  item.innerProductsArray.map(
                                    (product, index) => {
                                      let pName = I18nManager.isRTL
                                        ? product.ProductName2
                                        : product.ProductName;
                                      let uom =
                                        product?.UOMFragment !== 0 &&
                                        I18nManager.isRTL
                                          ? " - " + product.UOMName2
                                          : " - " + product.UOMName;

                                      let pQuantity = product.Quantity;

                                      return (
                                        <View>
                                          <Text
                                            style={{
                                              fontSize: props.isInnerPrinter
                                                ? sizeHelper.calHp(28)
                                                : sizeHelper.calHp(25),
                                              color: AppColor.black,
                                              fontFamily: "ProximaNova-Regular",
                                              textAlign: "left",
                                              marginVertical: 2,
                                            }}
                                          >
                                            {pName + uom + " * " + pQuantity}
                                          </Text>
                                        </View>
                                      );
                                    }
                                  )}
                                {item.IngredientNames !== "" && (
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      { fontSize: sizeHelper.calHp(25) },
                                    ]}
                                  >
                                    {item.IngredientNames}
                                  </Text>
                                )}
                              </View>

                              <View style={{ width: "35%" }}>
                                <Text
                                  style={[
                                    styles.titleValueStyle,
                                    { alignSelf: "flex-end" },
                                  ]}
                                >
                                  {item.FreeProduct
                                    ? "0.00"
                                    : item.PriceOriginal.toFixed(
                                        props.TerminalConfiguration
                                          .DecimalsInAmount
                                      ) * item.Quantity}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                        <View style={styles.divider} />
                        {props?.customerNotes !== "" && (
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 35,
                            }}
                          >
                            <Text
                              style={[
                                styles.titleValueStyle,
                                {
                                  fontSize: props.isInnerPrinter
                                    ? sizeHelper.calHp(28)
                                    : sizeHelper.calHp(25),
                                },
                              ]}
                            >
                              {I18nManager?.isRTL
                                ? "ملاحظات الزبون"
                                : "Customer Notes"}
                            </Text>

                            <View>
                              <Text
                                style={{
                                  fontSize: props.isInnerPrinter
                                    ? sizeHelper.calHp(28)
                                    : sizeHelper.calHp(25),

                                  color: AppColor.black,
                                  fontFamily: "ProximaNova-Regular",
                                  textAlign: "left",
                                }}
                              >
                                {props.customerNotes}
                              </Text>
                            </View>
                            <View style={styles.divider} />
                          </View>
                        )}

                        {props.productTaxes.map((item, index) => {
                          return (
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={
                                  item.taxName
                                    ? styles.invoiceHeaderText
                                    : styles.titleValueStyle
                                }
                              >
                                {item.taxName}
                              </Text>
                              <Text
                                style={
                                  item.tax
                                    ? styles.invoiceHeaderText
                                    : styles.titleValueStyle
                                }
                              >
                                {item.tax}
                              </Text>
                            </View>
                          );
                        })}
                        {InoviceAmountDetails.map((item, index) => {
                          return (
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={
                                  item.id === "Total"
                                    ? styles.invoiceHeaderText
                                    : styles.titleValueStyle
                                }
                              >
                                {item.title}
                              </Text>
                              <Text
                                style={
                                  item.id === "Total"
                                    ? styles.invoiceHeaderText
                                    : styles.titleValueStyle
                                }
                              >
                                {item.value}
                              </Text>
                            </View>
                          );
                        })}
                        {!!props.advancePaidInCash && (
                          <View>
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={styles.titleValueStyle}>
                                {props.StringsList._166}
                              </Text>
                              <Text style={styles.titleValueStyle}>
                                {(
                                  props.totalPrice - props.advancePaidInCash
                                ).toFixed(
                                  props.TerminalConfiguration?.DecimalsInAmount
                                )}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={styles.titleValueStyle}>
                                {props.StringsList._167}
                              </Text>
                              <Text style={styles.titleValueStyle}>
                                {props.advancePaidInCash.toFixed(
                                  props.TerminalConfiguration?.DecimalsInAmount
                                )}
                              </Text>
                            </View>
                          </View>
                        )}
                        <View style={styles.divider} />
                        <View style={styles.invoiceHeader}>
                          <View>
                            <Text style={styles.invoiceHeaderText}>
                              {props.StringsList._174}
                            </Text>
                            <Text style={[styles.invoiceHeaderText]}>
                              {I18nManager.isRTL
                                ? props.selectedPyamentMethod?.PaymentTypeName2
                                : props.selectedPyamentMethod?.PaymentTypeName}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.StringsList._171}
                            </Text>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.selectedAgent?.SalesAgentName
                                ? props.selectedAgent?.SalesAgentName
                                : props.TerminalConfiguration?.SalesAgentName}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.StringsList._172}
                            </Text>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.TerminalConfiguration?.TerminalCode}
                            </Text>
                          </View>
                        </View>
                        {!!props.buyerInfo && (
                          <View>
                            <View style={styles.divider} />
                            <Text style={styles.invoiceHeaderText}>
                              {props.StringsList._77 + ":-"}
                            </Text>
                            <View style={styles.invoiceHeader}>
                              {!!props.buyerInfo?.BuyerName && (
                                <View>
                                  <Text style={styles.invoiceHeaderText}>
                                    {props.StringsList._76}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.BuyerName}
                                  </Text>
                                </View>
                              )}
                              {!!props.buyerInfo?.BuyerCode && (
                                <View>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.StringsList._141}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.BuyerCode}
                                  </Text>
                                </View>
                              )}
                              {!!props.buyerInfo?.PrimaryPhone && (
                                <View>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.StringsList._138}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.PrimaryPhone}
                                  </Text>
                                </View>
                              )}
                            </View>

                            <View style={styles.invoiceHeader}>
                              {!!props.buyerInfo?.ValueAddedTaxNumber && (
                                <View
                                  style={{
                                    width: "41%",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <Text style={styles.invoiceHeaderText}>
                                    {props.StringsList._140}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.ValueAddedTaxNumber}
                                  </Text>
                                </View>
                              )}
                              {!!props.buyerInfo?.CCRNumber && (
                                <View
                                  style={{
                                    width: "50%",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.StringsList._139}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.CCRNumber}
                                  </Text>
                                </View>
                              )}
                            </View>
                            {!!props.buyerInfo?.BuyerAddress && (
                              <View>
                                <Text style={[styles.invoiceHeaderText]}>
                                  {props.StringsList._383}
                                </Text>
                                <Text style={[styles.invoiceHeaderText]}>
                                  {props.buyerInfo?.BuyerAddress}
                                </Text>
                              </View>
                            )}
                          </View>
                        )}

                        <View style={styles.divider} />
                        {!!props.TerminalConfiguration?.Footer1 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer1}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer2 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer2}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer3 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer3}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer4 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer4}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer5 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer5}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer6 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer6}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer7 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer7}
                          </Text>
                        )}
                        {props.TerminalConfiguration?.IsGodownInfo ===
                        "true" ? (
                          <Text style={styles.invoiceHeaderText}>
                            {props.TerminalConfiguration.GoDownAddress}
                          </Text>
                        ) : (
                          <Text style={styles.invoiceHeaderText}>
                            {props.TerminalConfiguration.CompanyAddress}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          alignSelf: "center",
                          marginVertical: sizeHelper.calHp(30),
                          marginBottom: sizeHelper.calHp(50),
                        }}
                      >
                        {<props.QR />}
                      </View>
                    </ViewShot>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <View style={styles.invoiceButtonContainer}>
                <CustomButton
                  containerStyle={styles.invoiceButtonStyle}
                  title={I18nManager.isRTL ? "لقطة شاشة" : "Screenshot"}
                  backgroundColor={AppColor.blue2}
                  onPressButton={() => props.onSaveInvoice("save")}
                />
                <CustomButton
                  containerStyle={[
                    styles.invoiceButtonStyle,
                    {
                      marginEnd: sizeHelper.calHp(0),
                      backgroundColor: AppColor.red1,
                    },
                  ]}
                  title={props.StringsList._2}
                  backgroundColor={AppColor.red1}
                  onPressButton={props.onSaveInvoice}
                />
              </View>
            </View>
          </View>
        )}
        <>
          {props.customerNotesOpen && (
            <CustomerNotes
              StringsList={props.StringsList}
              customerNotes={props.customerNotes}
              setCustomerNotes={props.setCustomerNotes}
              customerNotesOpen={props.customerNotesOpen}
              setCustomerNotesOpen={props.setCustomerNotesOpen}
            />
          )}
        </>
        {props.clientCustomInvoice && (
          <View style={styles.popupContainer}>
            <View style={styles.invoiceContainer}>
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                  overScrollMode={"never"}
                  contentContainerStyle={{ flexGrow: 1, zIndex: 9999999 }}
                  style={{
                    flexGrow: 1,

                    paddingVertical: 2,
                  }}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ flex: 1 }}>
                    <ViewShot
                      style={styles.viewShotStyle}
                      ref={props.qrRef2}
                      onCapture={props.onQRImage}
                      // ref={props.viewShotRef}
                      // onCapture={props.onCapture}

                      captureMode="mount"
                    >
                      <View>
                        {props.TerminalConfiguration?.IsGodownInfo === "true"
                          ? !!props?.TerminalConfiguration?.GoDownLogo && (
                              <Image
                                source={{
                                  uri:
                                    props?.TerminalConfiguration
                                      ?.GoDownLogoType +
                                    "," +
                                    props?.TerminalConfiguration?.GoDownLogo,
                                }}
                                style={{
                                  // backgroundColor: "green",
                                  height: sizeHelper.calHp(150),
                                  width: sizeHelper.calWp(155),
                                  resizeMode: "contain",
                                  alignSelf: "center",
                                  alignItems: "center",
                                }}
                              />
                            )
                          : !!props?.TerminalConfiguration?.CompanyLogo && (
                              <Image
                                source={{
                                  uri:
                                    props?.TerminalConfiguration
                                      ?.CompanyLogoType +
                                    "," +
                                    props?.TerminalConfiguration?.CompanyLogo,
                                }}
                                style={{
                                  //   backgroundColor: "green",
                                  height: sizeHelper.calHp(150),
                                  width: sizeHelper.calWp(155),
                                  resizeMode: "contain",
                                  alignSelf: "center",
                                  alignItems: "center",
                                }}
                              />
                            )}
                        {/* {(!props.companyVATRegistor) ?
                          <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(35), alignSelf: "center" }]}>
                            {I18nManager.isRTL ? "فاتورة مبيعات عادية" : " Ordinary sales invoice"}
                          </Text>
                          : props.totalPrice < 1000 ?
                            <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(35), alignSelf: "center" }]}>
                              {I18nManager.isRTL ? "فاتورة ضريبية مبسطة" : "Simplified tax invoice"}
                            </Text> :
                            <Text style={[styles.invoiceHeaderText, { marginBottom: 3, fontSize: sizeHelper.calHp(35), alignSelf: "center" }]}>
                              {I18nManager.isRTL ? "فاتورة ضريبية" : "Tax invoice"}
                            </Text>} */}

                        {props.returnInvoiceNumber ? (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {I18nManager.isRTL
                              ? "استرداد المبيعات"
                              : "Sales Refund"}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.billingType.name}
                          </Text>
                        )}

                        {!!props.TerminalConfiguration?.Heading1 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading1}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Heading2 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading2}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Heading3 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading3}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Heading4 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Heading4}
                          </Text>
                        )}
                        {props.TerminalConfiguration?.IsGodownInfo === "true"
                          ? !!props.TerminalConfiguration?.GoDownName && (
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    marginBottom: 10,
                                    fontSize: sizeHelper.calHp(35),
                                    alignSelf: "center",
                                  },
                                ]}
                              >
                                {props.TerminalConfiguration.GoDownName}
                              </Text>
                            )
                          : !!props.TerminalConfiguration?.CompanyName && (
                              <Text
                                style={[
                                  styles.invoiceHeaderText,
                                  {
                                    marginBottom: 10,
                                    fontSize: sizeHelper.calHp(35),
                                    alignSelf: "center",
                                  },
                                ]}
                              >
                                {props.TerminalConfiguration.CompanyName}
                              </Text>
                            )}

                        <Text
                          style={[
                            styles.invoiceHeaderText,
                            {
                              letterSpacing: 2,
                              fontSize: sizeHelper.calHp(35),
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {currentDate}
                        </Text>

                        <View style={styles.divider} />
                        <Text
                          style={[
                            styles.invoiceHeaderText,
                            {
                              marginBottom: sizeHelper.calHp(5),
                              alignSelf: "flex-start",
                            },
                          ]}
                        >
                          {props.terminalSetup?.StartFrom}
                        </Text>

                        <Text
                          style={[
                            styles.invoiceHeaderText,
                            {
                              alignSelf: "center",
                              fontSize: sizeHelper.calHp(35),
                            },
                          ]}
                        >
                          {props.StringsList._180}
                          {" : "}
                          {props.TerminalConfiguration?.ValueAddedTaxNumber}
                        </Text>

                        <Barcode
                          value={
                            props.returnInvoiceNumber
                              ? props.returnInvoiceNumber
                              : props.invoiceNumber
                          }
                          format={"CODE128"}
                          height={70}
                        />

                        {props.billDates && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 2,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.billDates}
                          </Text>
                        )}
                        <Text
                          style={[
                            styles.invoiceHeaderText,
                            {
                              marginBottom: 20,
                              letterSpacing: 8,
                              fontSize: sizeHelper.calHp(40),
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {props.returnInvoiceNumber
                            ? props.returnInvoiceNumber
                            : props.invoiceNumber}
                        </Text>
                        {props.returnInvoiceNumber && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 20,
                                letterSpacing: 8,
                                fontSize: sizeHelper.calHp(40),
                                alignSelf: "center",
                              },
                            ]}
                          >
                            {props.invoiceNumber}
                          </Text>
                        )}
                        {/* {props.billingStyleId === 2 && ( */}
                        <View style={styles.invoiceHeader}>
                          <View style={{ width: "40%" }}>
                            <Text style={styles.invoiceHeaderText}>
                              {props.StringsList._76}
                            </Text>
                          </View>
                          <View style={{ width: "20%" }}>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "flex-start" },
                              ]}
                            >
                              {props.StringsList._98}
                            </Text>
                          </View>
                          <View style={{ width: "15%" }}>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {I18nManager.isRTL
                                ? props.StringsList._177
                                : "QTY"}
                            </Text>
                          </View>
                          <View style={{ width: "25%" }}>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "flex-end" },
                              ]}
                            >
                              {props.StringsList._366}
                            </Text>
                          </View>
                        </View>
                        {/* )} */}
                        <View
                          style={[
                            styles.divider,
                            { marginBottom: sizeHelper.calHp(15) },
                          ]}
                        />
                        {props.selectedProducts.map((item, index) => {
                          return (
                            <View>
                              <View
                                id={index + item}
                                style={styles.invoiceListContainer}
                              >
                                <View
                                  style={{
                                    width: "40%",
                                    // backgroundColor: 'green',
                                  }}
                                >
                                  <Text style={[styles.titleValueStyle]}>
                                    {I18nManager.isRTL
                                      ? item.ProductBarCode
                                      : item.ProductBarCode}
                                  </Text>
                                  {item.IngredientNames !== "" && (
                                    <Text
                                      style={[
                                        styles.titleValueStyle,
                                        { fontSize: sizeHelper.calHp(25) },
                                      ]}
                                    >
                                      {item.IngredientNames}
                                    </Text>
                                  )}
                                </View>
                                <View style={{ width: "20%" }}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      { alignSelf: "flex-start" },
                                    ]}
                                  >
                                    {item.PriceWithOutTax}
                                  </Text>
                                </View>
                                <View style={{ width: "15%" }}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      { alignSelf: "center" },
                                    ]}
                                  >
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
                                </View>
                                <View style={{ width: "25%" }}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      { alignSelf: "flex-end" },
                                    ]}
                                  >
                                    {item.FreeProduct
                                      ? "0.00"
                                      : Number(
                                          Number(item.PriceOriginal) *
                                            Number(item.Quantity)
                                        ).toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount
                                        )}
                                  </Text>
                                </View>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <Text
                                  style={[
                                    styles.titleValueStyle,
                                    {
                                      marginRight: 5,
                                      fontSize: sizeHelper.calHp(25),
                                    },
                                  ]}
                                >
                                  {I18nManager.isRTL
                                    ? item.UOMName
                                    : item.UOMName}
                                </Text>
                                <Text
                                  style={[
                                    styles.titleValueStyle,
                                    { fontSize: sizeHelper.calHp(25) },
                                  ]}
                                >
                                  {I18nManager.isRTL
                                    ? item.ProductName2
                                    : item.ProductName}
                                </Text>
                              </View>
                              <View style={styles.divider} />
                            </View>
                          );
                        })}
                        {/* ß<View style={styles.divider} /> */}

                        {InoviceAmountDetails.map((item, index) => {
                          return (
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={
                                  item.id === "Total"
                                    ? styles.invoiceHeaderText
                                    : styles.titleValueStyle
                                }
                              >
                                {item.title}
                              </Text>
                              <Text
                                style={
                                  item.id === "Total"
                                    ? styles.invoiceHeaderText
                                    : styles.titleValueStyle
                                }
                              >
                                {item.value}
                              </Text>
                            </View>
                          );
                        })}

                        {!!props.advancePaidInCash ? (
                          <View>
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={styles.titleValueStyle}>
                                {props.StringsList._166}
                              </Text>
                              <Text style={styles.titleValueStyle}>
                                {(
                                  props.totalPrice - props.advancePaidInCash
                                ).toFixed(
                                  props.TerminalConfiguration?.DecimalsInAmount
                                )}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={styles.titleValueStyle}>
                                {props.StringsList._167}
                              </Text>
                              <Text style={styles.titleValueStyle}>
                                {props.advancePaidInCash.toFixed(
                                  props.TerminalConfiguration?.DecimalsInAmount
                                )}
                              </Text>
                            </View>
                            <View style={styles.divider} />
                            {props.alertType === "reprint" ||
                            props.alertType === "returnInvoice" ? null : (
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.titleValueStyle}>
                                  {props.StringsList._446}
                                </Text>
                                <Text style={styles.titleValueStyle}>
                                  {Number(props.cashAmount).toFixed(
                                    props.TerminalConfiguration.DecimalsInAmount
                                  )}
                                </Text>
                              </View>
                            )}
                            {/* <View
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.titleValueStyle}>{'Net'}</Text>
                            <Text style={styles.titleValueStyle}>
                              {props.totalPrice.toFixed(
                                props.TerminalConfiguration?.DecimalsInAmount,
                              )}s
                            </Text>
                          </View> */}
                            {props.alertType === "reprint" ||
                            props.alertType === "returnInvoice" ? null : (
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.titleValueStyle}>
                                  {props.StringsList._448}
                                </Text>
                                <Text style={styles.titleValueStyle}>
                                  {(
                                    Number(props.cashAmount) -
                                    Number(props.advancePaidInCash)
                                  ).toFixed(
                                    props.TerminalConfiguration.DecimalsInAmount
                                  )}
                                </Text>
                              </View>
                            )}
                            {/* </View> */}
                          </View>
                        ) : props.alertType === "reprint" ||
                          props.alertType === "returnInvoice" ? null : (
                          <>
                            <View style={styles.divider} />
                            {/* {!!props.advancePaidInCash && ( */}
                            <View>
                              {/* Total Paid Amount View */}
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.titleValueStyle}>
                                  {props.StringsList._446}
                                </Text>
                                <Text style={styles.titleValueStyle}>
                                  {Number(props.cashAmount).toFixed(
                                    props.TerminalConfiguration.DecimalsInAmount
                                  )}
                                </Text>
                              </View>
                              {/* Net Amount View */}
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.titleValueStyle}>
                                  {props.selectedPyamentMethod?.label ===
                                  "Credit"
                                    ? props.StringsList._166
                                    : props.StringsList._447}
                                </Text>
                                <Text style={styles.titleValueStyle}>
                                  {props.totalPrice.toFixed(
                                    props.TerminalConfiguration.DecimalsInAmount
                                  )}
                                </Text>
                              </View>
                              {/* Remaining Amount View */}
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.titleValueStyle}>
                                  {props.StringsList._448}
                                </Text>
                                {/* <Text style={styles.titleValueStyle}>
                                  {(
                                    Number(props.cashAmount) -
                                    Number(props.totalPrice)
                                  ).toFixed(
                                    props.TerminalConfiguration
                                      .DecimalsInAmount,
                                  )}
                                </Text> */}
                                {props?.cashAmount !== 0 &&
                                props.advancePaidInCash !== 0 ? (
                                  <Text style={styles.titleValueStyle}>
                                    0.00
                                  </Text>
                                ) : props?.cashAmount === "" &&
                                  props.advancePaidInCash == 0 ? (
                                  <Text style={styles.titleValueStyle}>
                                    0.00
                                  </Text>
                                ) : (
                                  <Text style={styles.titleValueStyle}>
                                    {(
                                      Number(props.cashAmount) -
                                      Number(props.totalPrice)
                                    ).toFixed(
                                      props.TerminalConfiguration
                                        .DecimalsInAmount
                                    )}
                                  </Text>
                                )}
                              </View>
                            </View>
                          </>
                        )}
                        {/* )} */}

                        <View style={styles.divider} />

                        {props.selectedProducts.length > 0 && (
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <Text style={styles.titleValueStyle}>
                                {props.StringsList._449}
                              </Text>
                            </View>
                            <View>
                              <Text style={styles.titleValueStyle}>
                                {Number(props.selectedProducts.length)}
                              </Text>
                            </View>
                          </View>
                        )}
                        <View style={styles.divider} />

                        <View style={styles.invoiceHeader}>
                          <View>
                            <Text style={styles.invoiceHeaderText}>
                              {props.StringsList._174}
                            </Text>
                            <Text style={[styles.invoiceHeaderText]}>
                              {I18nManager.isRTL
                                ? props.selectedPyamentMethod?.PaymentTypeName2
                                : props.selectedPyamentMethod?.PaymentTypeName}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.StringsList._171}
                            </Text>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.selectedAgent?.SalesAgentName
                                ? props.selectedAgent?.SalesAgentName
                                : props.TerminalConfiguration?.SalesAgentName}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.StringsList._172}
                            </Text>
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                { alignSelf: "center" },
                              ]}
                            >
                              {props.TerminalConfiguration?.TerminalCode}
                            </Text>
                          </View>
                        </View>
                        {/* style={[styles.invoiceHeaderText, {textAlign: 'left'}]} */}
                        {!!props.buyerInfo && (
                          <View>
                            <View style={styles.divider} />
                            <Text style={styles.invoiceHeaderText}>
                              {props.StringsList._77 + ":-"}
                            </Text>
                            <View style={styles.invoiceHeader}>
                              {!!props.buyerInfo?.BuyerName && (
                                <View>
                                  <Text style={styles.invoiceHeaderText}>
                                    {props.StringsList._76}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.BuyerName}
                                  </Text>
                                </View>
                              )}
                              {!!props.buyerInfo?.BuyerCode && (
                                <View>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.StringsList._141}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.BuyerCode}
                                  </Text>
                                </View>
                              )}
                              {!!props.buyerInfo?.PrimaryPhone && (
                                <View>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.StringsList._138}
                                  </Text>
                                  <Text style={[styles.invoiceHeaderText]}>
                                    {props.buyerInfo?.PrimaryPhone}
                                  </Text>
                                </View>
                              )}
                            </View>

                            <View style={styles.invoiceHeader}>
                              {!!props.buyerInfo?.ValueAddedTaxNumber && (
                                <View style={{ width: "41%" }}>
                                  <Text
                                    style={[
                                      styles.invoiceHeaderText,
                                      { textAlign: "left" },
                                    ]}
                                  >
                                    {props.StringsList._140}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.invoiceHeaderText,
                                      { textAlign: "left" },
                                    ]}
                                  >
                                    {props.buyerInfo?.ValueAddedTaxNumber}
                                  </Text>
                                </View>
                              )}
                              {!!props.buyerInfo?.CCRNumber && (
                                <View style={{ width: "40%" }}>
                                  <Text
                                    style={[
                                      styles.invoiceHeaderText,
                                      { textAlign: "right" },
                                    ]}
                                  >
                                    {props.StringsList._139}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.invoiceHeaderText,
                                      { textAlign: "right" },
                                    ]}
                                  >
                                    {props.buyerInfo?.CCRNumber}
                                  </Text>
                                </View>
                              )}
                            </View>
                            {!!props.buyerInfo?.BuyerAddress && (
                              <View>
                                <Text style={[styles.invoiceHeaderText]}>
                                  {props.StringsList._383}
                                </Text>
                                <Text style={[styles.invoiceHeaderText]}>
                                  {props.buyerInfo?.BuyerAddress}
                                </Text>
                              </View>
                            )}
                          </View>
                        )}

                        <View style={styles.divider} />
                        {!!props.TerminalConfiguration?.Footer1 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer1}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer2 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer2}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer3 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer3}
                          </Text>
                        )}
                        {!!props.TerminalConfiguration?.Footer4 && (
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                marginBottom: 3,
                                fontSize: sizeHelper.calHp(25),
                              },
                            ]}
                          >
                            {props.TerminalConfiguration.Footer4}
                          </Text>
                        )}
                        {props.TerminalConfiguration?.IsGodownInfo ===
                        "true" ? (
                          <Text style={styles.invoiceHeaderText}>
                            {props.TerminalConfiguration.GoDownAddress}
                          </Text>
                        ) : (
                          <Text style={styles.invoiceHeaderText}>
                            {props.TerminalConfiguration.CompanyAddress}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          alignSelf: "center",
                          marginVertical: sizeHelper.calHp(30),
                          marginBottom: sizeHelper.calHp(50),
                        }}
                      >
                        {<props.QR />}
                      </View>
                    </ViewShot>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <View style={styles.invoiceButtonContainer}>
                <CustomButton
                  containerStyle={styles.invoiceButtonStyle}
                  title={I18nManager.isRTL ? "لقطة شاشة" : "Screenshot"}
                  backgroundColor={AppColor.blue2}
                  onPressButton={() => props.onSaveInvoice("save")}
                />
                <CustomButton
                  containerStyle={[
                    styles.invoiceButtonStyle,
                    {
                      marginEnd: sizeHelper.calHp(0),
                      backgroundColor: AppColor.red1,
                    },
                  ]}
                  title={props.StringsList._2}
                  backgroundColor={AppColor.red1}
                  onPressButton={props.onSaveInvoice}
                />
              </View>
            </View>
          </View>
        )}

        {props.isTerminalSetup && (
          <View style={styles.popupContainer}>
            <TerminalSetup
              onPressCancel={() => props.setTerminalSetup(false)}
            />
          </View>
        )}

        {props.isPairPrinterFamily && (
          <View style={styles.popupContainer}>
            <PairPrinterFamily
              onPressCancel={() => props.setPairPrinterFamily(false)}
            />
          </View>
        )}

        {props.isLogout && (
          <View style={styles.popupContainer}>
            <DrawerPrint
              StringsList={props.StringsList}
              TerminalConfiguration={props.TerminalConfiguration}
            />
          </View>
        )}
        {props.isHoldInvoices && (
          <View style={styles.popupContainer}>
            <HoldInvoices
              onPressCancel={() => props.setisHoldInvoices(false)}
              reacallFunc={props.getHoldInvoiveFun}
              deleteHoldedInvoice={props.deleteHoldedInvoice}
            />
          </View>
        )}

        {props.isPaidCash && (
          <View style={[styles.popupContainer]}>
            <CashPaidPopUp
              cashAmount={props.cashAmount}
              setCashAmount={props.setCashAmount}
              displayAlert={props.isPaidCash}
              setIsPaidCash={props.setIsPaidCash}
              reacallFunc={props.reacallFunc}
              StringsList={props.StringsList}
              netAmount={Number(props.totalPrice).toFixed(3)}
            />
          </View>
        )}

        <AlertModel
          displayAlert={props.displayAlert}
          onAlertShow={props.setDisplayAlert}
          setisPromptAlert={props.setisPromptAlert}
          isPromptAlert={props.isPromptAlert}
          message={props.message}
          value={props.alertValue}
          onChangeText={props.onChangeText}
          reacallFunc={props.reacallFunc}
          placeholderText={props.message}
          type={props.alertType}
        />
        {props.isScanner && (
          <View style={styles.popupContainer}>
            <QRCodeScannerScreen
              closeScanner={() => {
                props.setScanner(false);
              }}
              onSuccess={props.onSuccessScan}
            />
          </View>
        )}
        {props.isBillingType && (
          <View style={[styles.popupContainer]}>
            <BillingType
              onPressCancel={() => props.setisBillingType(false)}
              reacallFunc={props.reacallFunc}
              data={props.billingTypeData}
              StringsList={props.StringsList}
              isLoading={props.isLoading}
              selectBillingType={props.selectBillingType}
            />
          </View>
        )}
        {props.isReturnInvoice && (
          <View style={[styles.popupContainer]}>
            <ReturnInvoice
              onPressCancel={() => props.setisReturnInvoice(false)}
              reacallFunc={props.checkReturnProductAddons}
              data={props.retunProducts}
              StringsList={props.StringsList}
              isLoading={props.isLoading}
              selectedAllProducts={props.selectedAllProducts}
            />
          </View>
        )}
        {props.isAddon && (
          <View style={[styles.popupContainer]}>
            <AddonsList
              onPressCancel={() => props.setisAddon(false)}
              reacallFunc={props.addProductToList}
              data={props.retunProducts}
              StringsList={props.StringsList}
              isLoading={props.isLoading}
              isAddon
            />
          </View>
        )}
        {props.isGlobalTax && (
          <View style={[styles.popupContainer]}>
            <GlobalTaxList
              onPressCancel={() => props.setIsGlobalTax(false)}
              reacallFunc={props.globalTaxFun}
              data={props.globalTaxList}
              StringsList={props.StringsList}
              isLoading={props.isLoading}
              isGlobal
            />
          </View>
        )}
        <>
          <CustomModal
            title={props.StringsList._43}
            displayModal={props.customerNotesOpen}
            onModalShow={() => props.setCustomerNotesOpen(false)}
            setisPromptModal={() => {}}
            isPromptModal={false}
            children={
              <>
                <View
                  style={{
                    // top: -20,
                    zIndex: 1000,
                    // backgroundColor: 'red',
                  }}
                >
                  <View
                    style={{
                      width:
                        sizeHelper.screenWidth > 450
                          ? sizeHelper.calWp(530)
                          : sizeHelper.calHp(500),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.textInput}
                      placeholder={props.StringsList._456}
                      placeholderTextColor={AppColor.black3}
                      value={props.customerNotes}
                      onChangeText={props.setCustomerNotes}
                      keyboardType="default"
                      autoCorrect={true}
                      editable={true}
                      enablesReturnKeyAutomatically={true}
                      maxLength={99}
                      multiline={true}
                      numberOfLines={2}
                      spellCheck={true}
                      textAlign={"left"}
                      textAlignVertical={"top"}
                      adjustsFontSizeToFit
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row-reverse",
                      width:
                        sizeHelper.screenWidth > 450
                          ? sizeHelper.calWp(510)
                          : sizeHelper.calHp(500),
                      alignItems: "center",
                      // height: 40,
                      // paddingVertical: 8,
                      // backgroundColor: AppColor.backColor,
                      left: sizeHelper.screenWidth > 450 ? 5 : -5,
                      top: sizeHelper.screenWidth > 450 ? 0 : -5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        // marginHorizontal: 8,
                      }}
                    >
                      <CustomButton
                        containerStyle={{
                          height: sizeHelper.calWp(45),
                          width: sizeHelper.calWp(120),
                          //   marginTop: sizeHelper.calHp(25),
                        }}
                        // isDisabled={isPromptModal && !value}
                        title={props.StringsList._2}
                        backgroundColor={AppColor.red}
                        titleColor={AppColor.white}
                        onPressButton={() => props.setCustomerNotesOpen(false)}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 5,
                      }}
                    >
                      <CustomButton
                        containerStyle={{
                          height: sizeHelper.calWp(45),
                          width: sizeHelper.calWp(120),
                          //   marginTop: sizeHelper.calHp(25),
                        }}
                        // isDisabled={isPromptModal && !value}
                        title={props.StringsList._1}
                        backgroundColor={AppColor.blue2}
                        titleColor={AppColor.white}
                        onPressButton={() => props.setCustomerNotesOpen(false)}
                      />
                    </View>
                  </View>
                </View>
              </>
            }
          />
        </>
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
