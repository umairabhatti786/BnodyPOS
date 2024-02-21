import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  I18nManager,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewShot, { captureScreen } from "react-native-view-shot";
import moment from "moment";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import DrawerPrint from "../../components/DrawerPrint";
import CustomModal from "../../components/CustomModal";
import SwipeButton from "../../components/SwipeButton";
import sizeHelper from "../../helpers/sizeHelper";
import AppColor from "../../constant/AppColor";

import styles from "./style";
import Header from "../../components/Header";

import ProductItem from "../../components/ProductItem";
import Search from "../../components/Search";
import AllCategories from "../../components/AllCategories";
import SelectedProductListItem from "../../components/SelectedProductListItem";
import SelectedProductListItemMobile from "../../components/SelectedProductListItemMobile";
import CustomButton from "../../components/CustomButton";
import CustomPicker from "../../components/CustomPicker";
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
import BillingType from "../../components/BillingType";
import { list } from "../../constant/global";
import BottomSheet from "../../components/Bottomsheet";

const Design = (props) => {
  const [isCashPaidFocus, setisCashPaidFocus] = useState(false);
  const [globleDiscountFocus, setGlobleDiscountFocus] = useState(false);
  const [globleDiscountPFocus, setGlobleDiscountPFocus] = useState(false);

  const screenSize = Dimensions.get("window");
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
          margin: sizeHelper.calWp(5),
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
          isLoading={props.isLoading}
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
          setSelectedProducts={props.setSelectedProducts}
          notesModal={props.notesModal}
          setNotesModal={props.setNotesModal}
          notesDetail={props.notesDetail}
          setNotesDetail={props.setNotesDetail}
          onOpenModal={props.onOpenModal}
          onCloseNotesModal={props.onCloseNotesModal}
        />
      </View>
    ) : (
      <View
        style={{
          margin: sizeHelper.calWp(4),
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
          isLoading={props.isLoading}
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
          selectedProductNotes={props.selectedProductNotes}
          setSelectedProductsNotes={props.setSelectedProductsNotes}
          notesModal={props.notesModal}
          setNotesModal={props.setNotesModal}
          notesDetail={props.notesDetail}
          setNotesDetail={props.setNotesDetail}
          onOpenModal={props.onOpenModal}
          onCloseNotesModal={props.onCloseNotesModal}
        />
      </View>
    );
  };
  const amountDetails = [
    { id: "subTotal:", title: `${props.StringsList._19}:`, value: "0" },
    { id: "discountP:", title: `${props.StringsList._7}:`, value: "0" },
    { id: "discount:", title: `${props.StringsList._20}:`, value: "0" },
    { id: "VAT:", title: `${props.StringsList._180}:`, value: "0" },
    { id: "total:", title: `${props.StringsList._23}:`, value: "0" },
    { id: "paidAmount:", title: `${props.StringsList._15}:`, value: "0" },
  ];

  const InoviceAmountDetails = [
    {
      id: "subTotal",
      title: `${props.StringsList._19}:`,
      value: (
        props.subPrice -
        // props.sumOfProductDiscount -
        props.sumOfProductTax
      ).toFixed(props.TerminalConfiguration.DecimalsInAmount),
    },
    {
      id: "Tax",
      title: `${props.StringsList._13}:`,
      value: (props.globalTax + props.sumOfProductTax).toFixed(
        props.TerminalConfiguration.DecimalsInAmount
      ),
    },
    {
      id: "Discount",
      title: `${props.StringsList._20}:`,
      value: (props.globalDiscountAmount + props.sumOfProductDiscount).toFixed(
        props.TerminalConfiguration.DecimalsInAmount
      ),
    },
    {
      id: "Total",
      title: `${props.StringsList._23}:`,
      value: props.totalPrice.toFixed(
        props.TerminalConfiguration.DecimalsInAmount
      ),
    },
  ];

  const renderHiddenItem = ({ item, index }) =>
    !props.returnInvoiceNumber ? (
      <View
        style={[
          styles.hiddenItemContainer,
          {
            height: item.IsParentAddOn
              ? sizeHelper.calHp(100)
              : sizeHelper.calHp(80),
            marginHorizontal: 10,
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
  const amountDetailsFun = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flex: 1,
            paddingStart: sizeHelper.calWp(5),
            paddingHorizontal: sizeHelper.calWp(22),
            paddingVertical: sizeHelper.calWp(15),
            backgroundColor: AppColor.grey4,
            borderRadius: sizeHelper.calWp(5),
            overflow: "hidden",
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
                      fontSize:
                        item.id === "total:"
                          ? sizeHelper.calHp(35)
                          : sizeHelper.calHp(25),
                    },
                  ]}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
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
                                props.TerminalConfiguration.DecimalsInAmount
                              )
                            )
                          : item.id === "discountP:"
                          ? String(
                              props.globalDiscountRate?.toFixed(
                                props.TerminalConfiguration.DecimalsInAmount
                              )
                            )
                          : props.advancePaidInCash
                          ? String(
                              props.advancePaidInCash?.toFixed(
                                props.TerminalConfiguration.DecimalsInAmount
                              )
                            )
                          : String(
                              props.totalPrice?.toFixed(
                                props.TerminalConfiguration.DecimalsInAmount
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
                            fontSize:
                              item.id === "total:"
                                ? sizeHelper.calHp(35)
                                : sizeHelper.calHp(25),
                          },
                        ]}
                      >
                        {item.id === "subTotal:"
                          ? props.subPrice?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount
                            )
                          : item.id === "discount:"
                          ? props.globalDiscountAmount?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount
                            )
                          : item.id === "discountP:"
                          ? props.globalDiscountAmount?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount
                            )
                          : item.id === "total:"
                          ? props.totalPrice?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount
                            )
                          : item.id === "paidAmount:"
                          ? props.advancePaidInCash
                            ? String(
                                props.advancePaidInCash?.toFixed(
                                  props.TerminalConfiguration.DecimalsInAmount
                                )
                              )
                            : String(
                                props.totalPrice?.toFixed(
                                  props.TerminalConfiguration.DecimalsInAmount
                                )
                              )
                          : item.id === "due:"
                          ? props.dueAmount?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount
                            )
                          : item.id === "VAT:"
                          ? props.globalTax?.toFixed(
                              props.TerminalConfiguration.DecimalsInAmount
                            )
                          : item?.value}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {item.id === "discount:" && (
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
  return props.orderCode === true ? (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <View style={{ position: "absolute", top: -400 }}>
            {<props.QR />}
          </View>

          <StatusBar hidden={true} />

          <Header props={props} isSearch={props.isSearch} />

          {!props.isToggle ? (
            <View>
              {props.noFamilyFound ? null : !props.isToggle ? (
                <AllCategories
                  data={props.allCategoreis}
                  focus={props.focus}
                  storageItems={props.storageItems}
                  disabled={props.returnInvoiceNumber ? true : false}
                  onPressItem={props.getSelectedCategoryProducts}
                  flatListRef={props.flatListRef}
                  onInvoiceClick={props.onInvoiceClick}
                  StringsList={props.StringsList}
                  TerminalConfiguration={props.TerminalConfiguration}
                  orderNumber={
                    props.returnInvoiceNumber
                      ? props.returnInvoiceNumber
                      : props.orderNumber
                  }
                  children={
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: sizeHelper.calWp(20),
                            fontFamily: "ProximaNova-Regular",
                            color: AppColor.white,
                          }}
                        >
                          {props.StringsList._484}
                          {props.storageItems?.TableCodeID
                            ? props.storageItems.TableCodeID
                            : ""}
                        </Text>
                      </View>
                    </>
                  }
                />
              ) : null}

              <View
                style={{
                  paddingHorizontal: sizeHelper.calWp(20),
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: props.allCategoreis.length > 0 ? "85%" : "98%",
                  }}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    numColumns={sizeHelper.screenWidth > 450 ? 4 : 3}
                    nestedScrollEnabled
                    contentContainerStyle={{
                      paddingBottom: 20,
                    }}
                    data={props.categoryProducts}
                    extraData={props.categoryProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) =>
                      "_" + item.ProductBarCode.toString()
                    }
                    key={(item) => "_" + item.ProductBarCode.toString()}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, marginHorizontal: sizeHelper.calWp(20) }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: sizeHelper.calWp(10),
                  // paddingHorizontal: sizeHelper.calWp(40),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: sizeHelper.calHp(10),
                    alignItems: "center",
                    // paddingHorizontal: sizeHelper.calWp(40),
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginLeft: sizeHelper.calWp(10),
                      borderRadius: sizeHelper.calWp(5),
                      paddingVertical: sizeHelper.calWp(3),
                      backgroundColor: AppColor.blue,
                      paddingHorizontal: sizeHelper.calWp(10),
                    }}
                    onPress={() => props.toggleFun()}
                  >
                    <Icon
                      name="angle-left"
                      color={AppColor.white}
                      size={sizeHelper.calWp(40)}
                      style={{
                        paddingLeft: sizeHelper.calWp(8),
                        paddingRight: sizeHelper.calWp(8),
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={true}
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: sizeHelper.calWp(10),
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                    // onPress={() => {
                    //   props.setOpenModal(true);
                    // }}
                  >
                    <Text
                      style={{
                        fontSize:
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calWp(25)
                            : sizeHelper.calWp(28),
                        fontFamily: "ProximaNova-Regular",
                        color:
                          list.ordID === 0 && props.storageItems === null
                            ? AppColor.backColor
                            : props.storageItems !== null && list.ordID === 1
                            ? AppColor.black3
                            : AppColor.backColor,
                      }}
                    >
                      {props.StringsList._447}
                    </Text>

                    {props.storageItems?.TableCodeID && (
                      <Text
                        style={{
                          marginHorizontal: sizeHelper.calHp(10),
                          fontSize:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(25)
                              : sizeHelper.calWp(28),

                          fontFamily: "ProximaNova-Regular",
                          color:
                            list.ordID === 0
                              ? AppColor.backColor
                              : props.storageItems !== null && list.ordID === 1
                              ? AppColor.white
                              : AppColor.backColor,

                          backgroundColor:
                            list.ordID === 0
                              ? AppColor.backColor
                              : props.storageItems !== null && list.ordID === 1
                              ? AppColor.green
                              : AppColor.backColor,
                          padding: sizeHelper.calHp(6),
                          paddingHorizontal: sizeHelper.calHp(10),
                          borderRadius: sizeHelper.calHp(5),
                        }}
                      >
                        {/* {I18nManager.isRTL ? 'التصنيفات' : 'Categories'} */}
                        {props.storageItems?.TableCodeID
                          ? "#" + props.storageItems?.TableCodeID
                          : ""}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: sizeHelper.calHp(10),
                    alignItems: "center",
                    marginLeft: -sizeHelper.calWp(40),
                  }}
                >
                  <Text
                    style={{
                      fontSize:
                        sizeHelper.screenWidth > 450
                          ? sizeHelper.calWp(25)
                          : sizeHelper.calWp(28),
                      fontFamily: "Proxima Nova Bold",
                      color: AppColor.black,
                    }}
                  >
                    {props.orderNumber
                      ? props.StringsList._450
                      : props.StringsList._504}
                    {props.orderNumber
                      ? props.orderNumber
                      : props.returnInvoiceNumber}
                  </Text>
                </View>

                <TouchableOpacity
                  disabled={true}
                  style={{
                    flexDirection: "row",

                    alignItems: "center",
                    marginTop: sizeHelper.calHp(10),
                  }}
                >
                  <Icon
                    name="user"
                    size={sizeHelper.calHp(30)}
                    color={
                      list.ordID === 0
                        ? AppColor.backColor
                        : props.storageItems !== null && list.ordID === 1
                        ? AppColor.green
                        : AppColor.backColor
                    }
                  />
                  <Text
                    style={{
                      paddingTop: sizeHelper.calHp(3),
                      color:
                        list.ordID === 1 ? AppColor.black3 : AppColor.backColor,
                      paddingLeft: sizeHelper.calHp(5),
                      fontSize:
                        sizeHelper.screenWidth > 450
                          ? sizeHelper.calWp(25)
                          : sizeHelper.calWp(28),
                      fontFamily: "ProximaNova-Regular",
                    }}
                  >
                    {props.storageItems?.TotalCapacity
                      ? props.storageItems?.TotalCapacity
                      : ""}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.selectedProductListContainer,
                  {
                    flex: 4,
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
                  keyExtractor={(item) => item.SalesInvoiceDetailsID}
                />
              </View>
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

              {!props.returnInvoiceNumber && (
                <View
                  style={{
                    marginTop: sizeHelper.calWp(22),
                    paddingStart: sizeHelper.calWp(5),
                    paddingHorizontal: sizeHelper.calWp(22),
                    paddingVertical: sizeHelper.calWp(15),
                    backgroundColor: AppColor.gray,
                    borderRadius: sizeHelper.calWp(5),
                    borderWidth: 1,
                    borderColor: AppColor.gray2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {props.orderTaker.length > 0 && (
                      <View>
                        <Text
                          style={{
                            // paddingTop: sizeHelper.calHp(3),
                            color: AppColor.black3,
                            paddingLeft: sizeHelper.calHp(5),
                            fontFamily: "Proxima Nova Bold",
                            fontSize:
                              sizeHelper.screenWidth > 450
                                ? sizeHelper.calHp(22)
                                : sizeHelper.calHp(18),
                          }}
                        >
                          {props.StringsList._457}
                        </Text>
                      </View>
                    )}
                    {props.orderTaker.length > 0 && (
                      <View style={{ marginLeft: 5 }}>
                        <CustomPicker
                          dropDownDirection={"TOP"}
                          data={props.orderTaker}
                          onSelect={(selectedItem, index) => {
                            props.setOrderTakerType(selectedItem);
                          }}
                          defaultButtonText={
                            props.orderTakerType?.OrderTakerName
                          }
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem?.OrderTakerName;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item?.OrderTakerName;
                          }}
                          buttonStyle={styles.dropdownSmall}
                          buttonTextStyle={styles.dropdownBtnTxtSmall}
                          renderDropdownIcon={(isOpened) => {
                            return (
                              <Icon3
                                name={
                                  isOpened ? "arrow-drop-up" : "arrow-drop-down"
                                }
                                color={
                                  isOpened ? AppColor.black : AppColor.gray1
                                }
                                size={sizeHelper.calHp(40)}
                              />
                            );
                          }}
                          dropdownIconPosition={
                            I18nManager.isRTL ? "left" : "right"
                          }
                          dropdownStyle={styles.dropdownDropdownStyleSmall}
                          rowStyle={
                            props.orderTaker.length > 1
                              ? [styles.dropdownRowStyleSmall, { height: 30 }]
                              : {
                                  backgroundColor: "#fff",
                                  borderBottomColor: "#fff",
                                }
                          }
                          rowTextStyle={styles.dropdownRowTxtStyleSmall}
                          selectedRowStyle={
                            styles.dropdownSelectedRowStyleSmall
                          }
                        />
                      </View>
                    )}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      <Text
                        style={{
                          color: AppColor.black3,
                          paddingLeft: sizeHelper.calHp(5),
                          fontFamily: "Proxima Nova Bold",
                          fontSize:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calHp(22)
                              : sizeHelper.calHp(18),
                        }}
                      >
                        {props.StringsList._455}
                      </Text>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                      <CustomPicker
                        data={props.orderItems}
                        defaultValueByIndex={props.selectedOrderType}
                        onSelect={(selectedItem, index) => {
                          console.log(
                            "order Type is : ",
                            selectedItem,
                            " && index is : ",
                            index
                          );
                          props.setOrderType(selectedItem);
                          list.ordID = selectedItem.id;
                          if (selectedItem.value == "Dine In") {
                            if (props.storageItems?.TableCodeID) {
                            } else {
                              props.navigation.navigate("TableBook");
                            }
                          } else {
                          }
                          props.setOrderType(selectedItem);
                          props.setSelectedOrderType(selectedItem.id);
                          return selectedItem?.value;
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem.value;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item.value;
                        }}
                        buttonStyle={styles.dropdownSmall}
                        buttonTextStyle={styles.dropdownBtnTxtSmall}
                        renderDropdownIcon={(isOpened) => {
                          return (
                            <Icon3
                              name={
                                isOpened ? "arrow-drop-up" : "arrow-drop-down"
                              }
                              color={isOpened ? AppColor.black : AppColor.gray1}
                              size={sizeHelper.calHp(40)}
                            />
                          );
                        }}
                        dropdownIconPosition={
                          I18nManager.isRTL ? "left" : "right"
                        }
                        dropdownStyle={styles.dropdownDropdownStyleSmall}
                        rowStyle={styles.dropdownRowStyleSmall}
                        rowTextStyle={styles.dropdownRowTxtStyleSmall}
                        selectedRowStyle={styles.dropdownSelectedRowStyleSmall}
                      />
                    </View>
                  </View>
                </View>
              )}

              {!props.returnInvoiceNumber && (
                <View
                  style={{
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      bottom: Platform.OS === "ios" ? 5 : 0,
                    }}
                  >
                    <View style={styles.swipeContainer}>
                      <SwipeButton
                        title={props.StringsList._519}
                        titleColor={AppColor.white}
                        titleFontSize={12}
                        titleStyles={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                        containerStyles={styles.swipeButtonContainer}
                        disableResetOnTap
                        width={"100%"}
                        height={sizeHelper.calHp(60)}
                        disabled={
                          props.selectedProducts.length < 1
                            ? true
                            : props.orderType.id === 0
                            ? true
                            : props.orderType.id === 1 &&
                              props.storageItems === null
                            ? true
                            : false
                        }
                        disabledRailBackgroundColor={AppColor.gray2}
                        disabledThumbIconBackgroundColor={AppColor.gray1}
                        disabledThumbIconBorderColor={AppColor.gray1}
                        railBackgroundColor={
                          props.railStart === true
                            ? AppColor.green
                            : AppColor.blue2
                        }
                        railFillBackgroundColor={AppColor.green}
                        railBorderColor={AppColor.white}
                        thumbIconStyles={{
                          borderRadius: 40,
                          borderColor: AppColor.green,
                        }}
                        enableReverseSwipe={false}
                        railFillBorderColor={AppColor.green}
                        railStyles={{
                          borderRadius: 50,
                          // borderColor: AppColor.blue1,
                        }}
                        resetAfterSuccessAnimDelay={300}
                        resetAfterSuccessAnimDuration={300}
                        shouldResetAfterSuccess={true}
                        thumbIconBackgroundColor={AppColor.green}
                        thumbIconBorderColor={AppColor.green}
                        thumbIconComponent={props.DineInOrder}
                        thumbIconWidth={
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calWp(55)
                            : sizeHelper.calWp(60)
                        }
                        onSwipeSuccess={() => props.setPaymentView(true)}
                        onSwipeFail={() => {
                          props.setRailStart(false);
                        }}
                        onSwipeStart={() => {
                          props.setRailStart(true);
                        }}
                        swipeSuccessThreshold={60}
                      />
                    </View>
                  </View>
                </View>
              )}

              {!props.returnInvoiceNumber ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: sizeHelper.calHp(20),

                    alignItems: "center",
                    bottom: Platform.OS === "ios" ? 10 : 0,
                  }}
                >
                  <CustomButton
                    leftIcon={
                      <Icon
                        name="pause"
                        size={
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calWp(22)
                            : sizeHelper.calWp(30)
                        }
                        color="white"
                      />
                    }
                    leftIconStyle={{ marginRight: sizeHelper.calHp(-15) }}
                    backgroundColor={AppColor.yellowColor}
                    onPressButton={props.holdBillFunction}
                    isDisabled={props.selectedProducts.length < 1}
                    containerStyle={[
                      styles.buttonStyle,
                      {
                        flex: 1,
                        marginHorizontal: sizeHelper.calHp(5),
                      },
                    ]}
                  />
                  <CustomButton
                    leftIcon={
                      <Icon
                        name="user-o"
                        size={
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calWp(22)
                            : sizeHelper.calWp(30)
                        }
                        color="white"
                      />
                    }
                    leftIconStyle={{ marginRight: sizeHelper.calHp(-15) }}
                    isDisabled={props.selectedProducts.length < 1}
                    backgroundColor={AppColor.blue2}
                    onPressButton={() => props.setisBuyer(true)}
                    containerStyle={[
                      styles.buttonStyle,
                      {
                        flex: 1,
                        marginHorizontal: sizeHelper.calHp(5),
                      },
                    ]}
                  />
                  {sizeHelper.screenWidth > 450 ? (
                    <CustomButton
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          // backgroundColor: AppColor.red1,
                          flex: 1,
                          marginHorizontal: sizeHelper.calHp(5),
                        },
                      ]}
                      title={props.StringsList._451}
                      isDisabled={
                        props.selectedProducts.length < 1
                          ? true
                          : props.orderType.id === 0
                          ? true
                          : props.orderType.id === 1 &&
                            props.storageItems === null
                          ? true
                          : false
                      }
                      backgroundColor={AppColor.blue2}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      onPressButton={props.placeOrderWithoutPay}
                    />
                  ) : (
                    <CustomButton
                      leftIcon={
                        <Icon
                          name="cart-arrow-down"
                          size={
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(22)
                              : sizeHelper.calWp(30)
                          }
                          color={
                            props.selectedProducts.length < 1
                              ? AppColor.grayColor
                              : props.orderType.id === 1 &&
                                props.storageItems === null
                              ? AppColor.grayColor
                              : AppColor.white
                          }
                        />
                      }
                      isDisabled={
                        props.selectedProducts.length < 1
                          ? true
                          : props.orderType.id === 0
                          ? true
                          : props.orderType.id === 1 &&
                            props.storageItems === null
                          ? true
                          : false
                      }
                      leftIconStyle={{ marginRight: sizeHelper.calHp(-15) }}
                      backgroundColor={AppColor.blue2}
                      onPressButton={props.placeOrderWithoutPay}
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          flex: 1,
                          marginHorizontal: sizeHelper.calHp(5),
                        },
                      ]}
                    />
                  )}

                  {sizeHelper.screenWidth > 450 ? (
                    <CustomButton
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          backgroundColor: AppColor.red1,
                          flex: 1,
                          marginHorizontal: sizeHelper.calHp(5),
                        },
                      ]}
                      title={props.StringsList._43}
                      backgroundColor={AppColor.blue2}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      onPressButton={() => props.setCustomerNotesOpen(true)}
                      isDisabled={props.selectedProducts.length < 1}
                    />
                  ) : (
                    <CustomButton
                      // containerStyle={styles.invoiceButtonStyle}
                      // title={I18nManager.isRTL ? "لقطة شاشة" : "Screenshot"}
                      leftIcon={
                        <Icon
                          name="sticky-note-o"
                          size={
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(22)
                              : sizeHelper.calWp(30)
                          }
                          color="white"
                        />
                      }
                      leftIconStyle={{ marginRight: sizeHelper.calHp(-15) }}
                      backgroundColor={AppColor.blue2}
                      isDisabled={props.selectedProducts.length < 1}
                      onPressButton={() => props.setCustomerNotesOpen(true)}
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          flex: 1,
                          marginHorizontal: sizeHelper.calHp(5),
                        },
                      ]}
                    />
                  )}

                  {props.paymentsValue == null && !props.paymentsOpen ? (
                    <TouchableOpacity
                      style={{
                        width: sizeHelper.calWp(130),
                        flexDirection: "row",
                      }}
                      disabled={
                        props.selectedProducts.length < 1
                          ? true
                          : props.orderType.id === 0
                          ? true
                          : props.orderType.id === 1 &&
                            props.storageItems === null
                          ? true
                          : false
                      }
                      onPress={() => {
                        props.setPaymentsOpen(true);
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          bottom: -1,
                        }}
                      >
                        <CustomDropDown
                          dropDownWidth={sizeHelper.calWp(130)} //payments
                          dropDownHeight={
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calHp(57)
                              : sizeHelper.calWp(80)
                          }
                          items={props.payments}
                          setItems={props.setPayments}
                          placeholderTitle={props.StringsList._153}
                          setValue={props.setPaymentsValue}
                          value={props.paymentsValue}
                          disabled={
                            props.selectedProducts.length < 1
                              ? true
                              : props.orderType.id === 0
                              ? true
                              : props.orderType.id === 1 &&
                                props.storageItems === null
                              ? true
                              : false
                          }
                          open={props.paymentsOpen}
                          setOpen={props.setPaymentsOpen}
                          dropDownDirection={"TOP"}
                          placeholderNewStyle={{
                            fontSize: sizeHelper.calHp(20),
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: sizeHelper.calWp(130),
                          backgroundColor:
                            props.selectedProducts.length < 1 ||
                            props.orderType.id === 0
                              ? AppColor.disableColor
                              : props.orderType.id === 1 &&
                                props.storageItems === null
                              ? AppColor.disableColor
                              : // : props.selectedProducts.length < 1
                                // ? AppColor.disableColor
                                AppColor.blue2,

                          zIndex: 99999999999999999,
                          height:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(50)
                              : sizeHelper.calWp(72),
                          borderRadius: sizeHelper.calWp(5),
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          borderRadius: sizeHelper.calWp(5),
                          flexDirection: "row",
                          // elevation: sizeHelper.screenWidth > 450 ? 0 : 3,
                          flexDirection: "row",
                        }}
                      >
                        <Icon
                          name="credit-card"
                          size={
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(22)
                              : sizeHelper.calWp(30)
                          }
                          color={
                            props.selectedProducts.length < 1 ||
                            props.orderType.id === 0
                              ? AppColor.grayColor
                              : props.orderType.id === 1 &&
                                props.storageItems === null
                              ? AppColor.grayColor
                              : AppColor.white
                          }
                        />
                        <Icon
                          name="sort-down"
                          size={
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(22)
                              : sizeHelper.calWp(30)
                          }
                          color={
                            props.selectedProducts.length < 1 ||
                            props.orderType.id === 0
                              ? AppColor.grayColor
                              : props.orderType.id === 1 &&
                                props.storageItems === null
                              ? AppColor.grayColor
                              : // ? AppColor.grayColor
                                AppColor.white
                          }
                          style={{ bottom: 3 }}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <CustomDropDown
                      dropDownWidth={sizeHelper.calWp(130)} //payments
                      dropDownHeight={
                        sizeHelper.screenWidth > 450
                          ? sizeHelper.calHp(57)
                          : sizeHelper.calWp(80)
                      }
                      items={props.payments}
                      setItems={props.setPayments}
                      placeholderTitle={props.StringsList._153}
                      setValue={props.setPaymentsValue}
                      value={props.paymentsValue}
                      disabled={
                        props.selectedProducts.length < 1
                          ? true
                          : props.orderType.id === 0
                          ? true
                          : props.orderType.id === 1 &&
                            props.storageItems === null
                          ? true
                          : false
                      }
                      open={props.paymentsOpen}
                      setOpen={props.setPaymentsOpen}
                      dropDownDirection={"TOP"}
                    />
                  )}

                  {sizeHelper.screenWidth > 450 ? (
                    <CustomButton
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          backgroundColor: AppColor.red1,
                          flex: 1,
                          marginHorizontal: sizeHelper.calHp(5),
                        },
                      ]}
                      title={props.StringsList._44}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      backgroundColor={
                        props.orderNumber ? AppColor.red1 : AppColor.blue2
                      }
                      onPressButton={async () => {
                        let tableData = await AsyncStorage.getItem(
                          "SELECTED_TABLE"
                        );
                        let table = JSON.parse(tableData);
                        if (table) {
                          props.changeTableStatus(table?.TableCodeID);
                          props.onClickCancel();
                        } else {
                          props.onClickCancel();
                        }

                        // if (props.storageItems) {
                        //   props.changeTableStatus();
                        // }
                      }}
                    />
                  ) : (
                    <CustomButton
                      // containerStyle={styles.invoiceButtonStyle}
                      // title={I18nManager.isRTL ? "لقطة شاشة" : "Screenshot"}
                      leftIcon={
                        <Icon
                          name="remove"
                          size={
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(22)
                              : sizeHelper.calWp(30)
                          }
                          color="white"
                        />
                      }
                      leftIconStyle={{ marginRight: sizeHelper.calHp(-15) }}
                      backgroundColor={AppColor.red1}
                      onPressButton={async () => {
                        let tableData = await AsyncStorage.getItem(
                          "SELECTED_TABLE"
                        );
                        let table = JSON.parse(tableData);
                        console.log("table", table?.TableCodeID);
                        if (table) {
                          props.changeTableStatus(table?.TableCodeID);
                          props.onClickCancel();
                        } else {
                          props.onClickCancel();
                        }
                      }}
                      containerStyle={[
                        styles.buttonStyle,
                        {
                          flex: 1,
                          marginHorizontal: sizeHelper.calHp(5),
                        },
                      ]}
                    />
                  )}
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: sizeHelper.calHp(20),

                    alignItems: "center",
                  }}
                >
                  {props.buyerInfo ? (
                    <>
                      <CustomDropDown
                        dropDownWidth={sizeHelper.calWp(350)} //refund payments
                        dropDownHeight={
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calHp(50)
                            : sizeHelper.calWp(60)
                        }
                        items={
                          !props.returnInvoiceNumber
                            ? props.payments
                            : props.refundPayments
                        }
                        setItems={props.setPayments}
                        placeholderTitle={props.StringsList._153}
                        setValue={props.setPaymentsValue}
                        value={props.paymentsValue}
                        disabled={props.selectedProducts.length < 1}
                        open={props.paymentsOpen}
                        setOpen={props.setPaymentsOpen}
                        dropDownDirection={"TOP"}
                      />
                    </>
                  ) : (
                    <>
                      <CustomButton
                        isDisabled={props.selectedProducts.length < 1}
                        containerStyle={[
                          styles.buttonStyle,
                          {
                            height:
                              sizeHelper.screenWidth > 450
                                ? sizeHelper.calWp(50)
                                : sizeHelper.calWp(60),
                          },
                          {
                            // backgroundColor: AppColor.red1,
                            flex: 1,
                            marginHorizontal: sizeHelper.calHp(5),
                          },
                        ]}
                        title={props.StringsList._153}
                        backgroundColor={AppColor.blue2}
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        onPressButton={() => {
                          props.setPaymentsValue("1");
                        }}
                      />
                    </>
                  )}

                  <CustomButton
                    containerStyle={[
                      styles.buttonStyle,
                      {
                        backgroundColor: AppColor.red1,
                        flex: 1,
                        marginHorizontal: sizeHelper.calHp(5),
                        height:
                          sizeHelper.screenWidth > 450
                            ? sizeHelper.calWp(50)
                            : sizeHelper.calWp(60),
                      },
                    ]}
                    title={props.StringsList._44}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    backgroundColor={AppColor.red1}
                    onPressButton={() => {
                      props.restState();
                      list.isOrderPlaced = false;
                      props.navigation.navigate("home", { id: undefined });
                    }}
                  />
                </View>
              )}
            </View>
          )}
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
          {/* Unpaid Invoice Design */}
          {props.shortInvoice && (
            <View style={styles.popupContainer}>
              <View style={styles.invoiceContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView
                    disableScrollViewPanResponder={true}
                    persistentScrollbar={true}
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
                          <Text
                            style={[
                              {
                                marginTop: 10,
                                letterSpacing: 2,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                                // fontSize: sizeHelper.calHp(30),
                                color: AppColor.black,
                                fontFamily: "Proxima Nova Bold",
                                marginBottom: 10,
                              },
                            ]}
                          >
                            {currentDate}
                          </Text>

                          <View style={styles.divider} />

                          <View
                            style={{
                              backgroundColor: AppColor.white,
                              marginBottom: sizeHelper.calWp(10),
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: sizeHelper.calWp(10),
                              }}
                            >
                              <View style={{ alignItems: "center" }}>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: sizeHelper.calWp(30),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props.StringsList._455}
                                </Text>
                              </View>
                              <View style={{ alignItems: "center" }}>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: sizeHelper.calWp(30),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props?.orderType?.id === 1
                                    ? props.StringsList._329
                                    : props?.orderType?.id === 2
                                    ? props.StringsList._328
                                    : props?.orderType?.id === 3
                                    ? props.StringsList._26
                                    : ""}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              backgroundColor: AppColor.white,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: sizeHelper.calWp(10),
                              }}
                            >
                              <View>
                                {props.storageItems?.AreaName &&
                                  props?.orderType?.id === 1 && (
                                    <>
                                      <Text
                                        style={{
                                          paddingTop: sizeHelper.calHp(3),
                                          color: AppColor.black3,
                                          paddingLeft: sizeHelper.calHp(5),
                                          fontSize: sizeHelper.calWp(30),
                                          fontFamily: "Proxima Nova Bold",
                                          textAlign: "left",
                                        }}
                                      >
                                        {props.StringsList._446}
                                      </Text>
                                      <Text
                                        style={{
                                          paddingTop: sizeHelper.calHp(3),
                                          color: AppColor.black3,
                                          paddingLeft: sizeHelper.calHp(5),
                                          fontSize: sizeHelper.calWp(26),
                                          fontFamily: "Proxima Nova Bold",
                                        }}
                                      >
                                        {props.storageItems?.AreaName
                                          ? props.storageItems.AreaName
                                          : ""}
                                      </Text>
                                    </>
                                  )}
                              </View>

                              <View style={{ alignItems: "center" }}>
                                {props.storageItems?.TableCodeID &&
                                  props?.orderType?.id === 1 && (
                                    <>
                                      <Text
                                        style={{
                                          paddingTop: sizeHelper.calHp(3),
                                          color: AppColor.black3,
                                          paddingLeft: sizeHelper.calHp(5),
                                          fontSize: sizeHelper.calWp(30),
                                          fontFamily: "Proxima Nova Bold",
                                        }}
                                      >
                                        {props.StringsList._447}
                                      </Text>
                                      <Text
                                        style={{
                                          paddingTop: sizeHelper.calHp(3),
                                          color: AppColor.black3,
                                          paddingLeft: sizeHelper.calHp(5),
                                          fontSize: sizeHelper.calWp(26),
                                          fontFamily: "Proxima Nova Bold",
                                        }}
                                      >
                                        {props.storageItems?.TableCodeID
                                          ? props.storageItems.TableCodeID
                                          : ""}
                                      </Text>
                                    </>
                                  )}
                              </View>
                              {props.orderTakerType?.SalesAgentCode !== 0 && (
                                <View style={{ alignItems: "center" }}>
                                  <Text
                                    style={{
                                      paddingTop: sizeHelper.calHp(3),
                                      color: AppColor.black3,
                                      paddingLeft: sizeHelper.calHp(5),
                                      fontSize: sizeHelper.calWp(30),
                                      fontFamily: "Proxima Nova Bold",
                                    }}
                                  >
                                    {props.StringsList._457}
                                  </Text>
                                  <Text
                                    style={{
                                      paddingTop: sizeHelper.calHp(3),
                                      color: AppColor.black3,
                                      paddingLeft: sizeHelper.calHp(5),
                                      fontSize: sizeHelper.calWp(26),
                                      fontFamily: "Proxima Nova Bold",
                                    }}
                                  >
                                    {props.orderTakerType?.OrderTakerName
                                      ? props.orderTakerType.OrderTakerName
                                      : ""}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>

                          <Text
                            style={{
                              marginBottom: 5,
                              letterSpacing: 8,
                              fontSize: sizeHelper.calHp(30),
                              alignSelf: "center",
                              fontSize: sizeHelper.calHp(30),
                              color: AppColor.black,
                              fontFamily: "Proxima Nova Bold",
                            }}
                          >
                            {props.orderNumber}
                          </Text>
                          <Barcode
                            format="CODE128"
                            value={props.orderNumber}
                            text={props.orderNumber}
                            style={{ marginBottom: 20 }}
                            maxWidth={Dimensions.get("window").width / 2}
                            height={50}
                            textStyle={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 18,
                                fontSize: sizeHelper.calHp(20),
                                alignSelf: "center",
                              },
                            ]}
                          />

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

                          <View
                            style={[
                              styles.divider,
                              { marginBottom: sizeHelper.calHp(15) },
                            ]}
                          />
                          {props.selectedProducts.map((item, index) => {
                            return (
                              <View
                                id={index}
                                style={styles.invoiceListContainer}
                              >
                                <View style={{ width: "40%" }}>
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
                                    {I18nManager.isRTL
                                      ? item.ProductName2
                                      : item.ProductName}
                                  </Text>
                                  <View>
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
                                      {item?.notes
                                        ? item?.notes
                                        : item?.ProductNote}
                                    </Text>
                                  </View>
                                  {item?.IngredientNames !== "" && (
                                    <View>
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
                                        {item.IngredientNames}
                                      </Text>
                                    </View>
                                  )}
                                </View>

                                <View
                                  style={{
                                    width: "20%",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-start",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.PriceWithOutTax.toFixed(
                                      props.TerminalConfiguration
                                        .DecimalsInAmount
                                    )}
                                  </Text>
                                </View>
                                <View style={{ width: "15%" }}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "center",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "25%",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-end",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.FreeProduct
                                      ? "0.00"
                                      : item.GrandAmount.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount
                                        )}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}

                          {/* Customer Notes */}
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
                            </View>
                          )}
                        </View>
                      </ViewShot>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
            </View>
          )}
          {props.isInvoice && (
            <View style={styles.popupContainer}>
              <View style={styles.invoiceContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView
                    persistentScrollbar={true}
                    disableScrollViewPanResponder={true}
                    overScrollMode={"never"}
                    contentContainerStyle={{ flexGrow: 1, zIndex: 9999999 }}
                    style={{
                      flexGrow: 1,

                      paddingVertical: 2,
                    }}
                    showsVerticalScrollIndicator={true}
                  >
                    <View style={{ flex: 1 }}>
                      <ViewShot
                        style={[
                          styles.viewShotStyle,
                          {
                            paddingHorizontal: props.isInnerPrinter
                              ? sizeHelper.calHp(5)
                              : sizeHelper.calHp(25),
                          },
                        ]}
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
                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                fontSize: sizeHelper.calHp(5),
                              },
                            ]}
                          >
                            {"aa"}
                          </Text>
                          {/* Sales Refund */}
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
                              {props.StringsList._526}
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
                              {props.billingType?.name}
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

                          <View
                            style={{
                              backgroundColor: AppColor.white,
                              marginBottom: sizeHelper.calWp(10),
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // marginHorizontal: sizeHelper.calWp(10),
                              }}
                            >
                              <View>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: props.isInnerPrinter
                                      ? sizeHelper.calWp(32)
                                      : sizeHelper.calWp(28),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {list.isOrderPlaced ? props?.orderNumber : ""}
                                </Text>
                              </View>
                              <View style={{ alignItems: "center" }}>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: props.isInnerPrinter
                                      ? sizeHelper.calWp(32)
                                      : sizeHelper.calWp(28),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props?.orderType?.id === 1
                                    ? props.StringsList._329
                                    : props?.orderType?.id === 2
                                    ? props.StringsList._328
                                    : props?.orderType?.id === 3
                                    ? props.StringsList._26
                                    : ""}
                                </Text>
                              </View>
                            </View>
                          </View>
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
                            format="CODE128"
                            value={
                              props.returnInvoiceNumber
                                ? props.returnInvoiceNumber
                                : props?.invoiceNumber
                            }
                            text={
                              props.returnInvoiceNumber
                                ? props.returnInvoiceNumber
                                : props?.invoiceNumber
                            }
                            style={{ marginBottom: sizeHelper.calHp(15) }}
                            maxWidth={Dimensions.get("window").width / 2}
                            height={50}
                            textStyle={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 18,
                                fontSize: props.isInnerPrinter
                                  ? sizeHelper.calHp(22)
                                  : sizeHelper.calHp(20),
                                alignSelf: "center",
                              },
                            ]}
                          />
                          {props.invoiceDates && (
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
                              {props.invoiceDates}
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

                          {props?.billingStyleId === 2 && (
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
                              <View
                                style={{
                                  width: screenSize?.scale >= 2 ? "28%" : "25%",
                                }}
                              >
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
                              { marginBottom: sizeHelper.calHp(15) },
                            ]}
                          />
                          {props.selectedProducts.map((item, index) => {
                            return props?.billingStyleId === 2 ? (
                              <View
                                id={index}
                                style={styles.invoiceListContainer}
                              >
                                <View style={{ width: "42%" }}>
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
                                                fontFamily:
                                                  "ProximaNova-Regular",
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
                                  {item?.IngredientNames !== "" && (
                                    <View>
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
                                        {item.IngredientNames}
                                      </Text>
                                    </View>
                                  )}
                                </View>

                                <View
                                  style={{
                                    width: "20%",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-start",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.PriceWithOutTax.toFixed(
                                      props.TerminalConfiguration
                                        .DecimalsInAmount
                                    )}
                                  </Text>
                                </View>
                                <View style={{ width: "15%" }}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "center",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
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
                                                fontFamily:
                                                  "ProximaNova-Regular",
                                                textAlign: "center",
                                                marginVertical: 2,
                                              }}
                                            >
                                              {product.Quantity}
                                            </Text>
                                          </View>
                                        );
                                      }
                                    )}
                                </View>

                                <View
                                  style={{
                                    width: "25%",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-end",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.FreeProduct
                                      ? "0.00"
                                      : item.GrandAmount.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount
                                        )}
                                  </Text>
                                </View>
                              </View>
                            ) : (
                              <View
                                id={index}
                                style={styles.invoiceListContainer}
                              >
                                <View style={{ width: "65%" }}>
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
                                    {I18nManager.isRTL
                                      ? item.ProductName2
                                      : item.ProductName}
                                    {item?.UOMFragment !== 0 &&
                                      (I18nManager.isRTL
                                        ? " - " + item.UOMName2
                                        : " - " + item.UOMName)}
                                  </Text>
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
                                    {"@ " +
                                      item.PriceWithOutTax.toFixed(
                                        props.TerminalConfiguration
                                          .DecimalsInAmount
                                      ) +
                                      " X "}
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>

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
                                          <View
                                          // style={{
                                          //   borderBottomWidth:
                                          //     index ===
                                          //     item.innerProductsArray.length -
                                          //       1
                                          //       ? 0.5
                                          //       : 0,
                                          // }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: props.isInnerPrinter
                                                  ? sizeHelper.calHp(28)
                                                  : sizeHelper.calHp(25),
                                                color: AppColor.black,
                                                fontFamily:
                                                  "ProximaNova-Regular",
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
                                        {
                                          fontSize: props.isInnerPrinter
                                            ? sizeHelper.calHp(28)
                                            : sizeHelper.calHp(25),
                                        },
                                      ]}
                                    >
                                      {item.IngredientNames}
                                    </Text>
                                  )}
                                </View>
                                <View
                                  style={{
                                    width: "35%",
                                    // backgroundColor: 'red',
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-end",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.FreeProduct
                                      ? "0.00"
                                      : item.GrandAmount.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount
                                        )}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                          <View
                            style={[
                              styles.divider,
                              {
                                marginTop:
                                  props?.printType === "reprint" &&
                                  screenSize?.scale >= 2
                                    ? sizeHelper.calHp(5)
                                    : sizeHelper.calHp(15),
                              },
                            ]}
                          />
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
                                      ? [
                                          styles.invoiceHeaderText,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
                                      : [
                                          styles.titleValueStyle,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
                                  }
                                >
                                  {item.title}
                                </Text>
                                <Text
                                  style={
                                    item.id === "Total"
                                      ? [
                                          styles.invoiceHeaderText,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
                                      : [
                                          styles.titleValueStyle,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
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
                                  {props.StringsList._166}
                                </Text>
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
                                  {(
                                    props.totalPrice - props.advancePaidInCash
                                  ).toFixed(
                                    props.TerminalConfiguration.DecimalsInAmount
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
                                  {props.StringsList._167}
                                </Text>
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
                                  {props.advancePaidInCash.toFixed(
                                    props.TerminalConfiguration.DecimalsInAmount
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
                                  ? props.selectedPyamentMethod
                                      ?.PaymentTypeName2
                                  : props.selectedPyamentMethod
                                      ?.PaymentTypeName}
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
                                  <View style={{ width: "41%" }}>
                                    <Text style={styles.invoiceHeaderText}>
                                      {props.StringsList._140}
                                    </Text>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.buyerInfo?.ValueAddedTaxNumber}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.CCRNumber && (
                                  <View style={{ width: "72%" }}>
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
                            marginVertical: sizeHelper.calHp(20),
                            marginBottom: sizeHelper.calHp(60),
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
                    title={props.StringsList._510}
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
            StringsList={props.StringsList}
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
          {props.isReturnInvoice && (
            <View style={[styles.popupContainer]}>
              <ReturnInvoice
                onPressCancel={() => props.setisReturnInvoice(false)}
                reacallFunc={props.checkReturnProductAddons}
                data={props.retunProducts}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                TerminalConfiguration={props.TerminalConfiguration}
                selectedAllProducts={props.selectedAllProducts}
                selectedProducts={props.selectedProducts}
                restState={props.restState}
                setToggle={props.setToggle}
                printType={props.printType}
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
          {/* OrderTime Popup */}
          {/* <>
            <CustomModal
              title={props.StringsList._460}
              displayModal={props.orderPopup}
              onModalShow={props.setOrderPopup}
              setisPromptModal={() => {}}
              isPromptModal={false}
              children={
                <>
                  <View
                    style={{
                      // flexDirection: "row",
                      alignItems: 'center',

                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          // padding: sizeHelper.calHp(15),
                          fontFamily: 'Proxima Nova Bold',
                          fontSize:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calHp(22)
                              : sizeHelper.calHp(14),
                          color: AppColor.black,
                        }}>
                        {props.StringsList._462}
                      </Text>
                      <View
                        style={{
                          // paddingHorizontal: sizeHelper.calWp(10),
                          margin: sizeHelper.calHp(20),
                        }}>
                        <CustomPicker // Time Picker
                          disableAutoScroll={true}
                          data={Array.from({length: 41}, (_, i) => i * 5)}
                          onSelect={props.setRequiredTime}
                          defaultButtonText={props.requiredTime}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            props.setSelectedArea(selectedItem);
                            console.log('selectedTime', props.requiredTime);

                            return selectedItem + '  mins';
                          }}
                          rowTextForSelection={(item, index) => {
                            return item + '  mins';
                          }}
                          buttonStyle={styles.dropdown2BtnStyle}
                          buttonTextStyle={styles.dropdown2BtnTxtStyle}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Icon
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={
                                  isOpened ? AppColor.black : AppColor.gray1
                                }
                                size={sizeHelper.calWp(18)}
                              />
                            );
                          }}
                          dropdownIconPosition={
                            I18nManager.isRTL ? 'left' : 'right'
                          }
                          dropdownStyle={styles.dropdown2DropdownStyle}
                          rowStyle={styles.dropdown2RowStyle}
                          rowTextStyle={styles.dropdown2RowTxtStyle}
                          selectedRowStyle={styles.dropdown2SelectedRowStyle}
                          // renderCustomizedRowChild={renderArea}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: '100%',
                      alignItems: 'center',
                      // height: 40,
                      paddingVertical: 5,
                      backgroundColor: AppColor.backColor,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 5,
                      }}>
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
                        onPressButton={props.onPressSaveTime}
                      />
                    </View>
                  </View>
                </>
              }
            />
          </> */}
          {/* Customer Notes Popup */}
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
                          onPressButton={() =>
                            props.setCustomerNotesOpen(false)
                          }
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
                          onPressButton={() =>
                            props.setCustomerNotesOpen(false)
                          }
                        />
                      </View>
                    </View>
                  </View>
                </>
              }
            />
          </>

          {props.isBillingType && (
            <View style={[styles.popupContainer]}>
              <BillingType
                onPressCancel={() => props.setisBillingType(false)}
                reacallFunc={props.PrinterFunc}
                selectBillingType={props.selectBillingType}
                data={props.billingTypeData}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                type={"bill"}
                setBillingTypeData={props.setBillingTypeData}
                setSaleBilType={props.setSaleBilType}
              />
            </View>
          )}
          {props.isSaleBilType && (
            <View style={[styles.popupContainer]}>
              <BillingType
                onPressCancel={() => props.setIsSaleBilType(false)}
                reacallFunc={props.PrinterFunc}
                data={props.saleBilData}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                selectBillingType={props.selectSaleBilType}
                setBillingTypeData={props.setSaleBilData}
                type={"invoice"}
                setSaleBilType={props.setSaleBilType}
              />
            </View>
          )}
          {(props.isLoading || props.AddProductLoader) && (
            <View style={[styles.popupContainer, { zIndex: 99999 }]}>
              <Loading />
            </View>
          )}
          {props.isSearch && <Search props={props} />}
          {props.orderNumber && !props.isToggle && (
            <TouchableOpacity
              disabled={!props.orderNumber}
              onPress={() => props.onInvoiceClick()}
              style={{
                // margin: sizeHelper.calWp(20),
                // marginHorizontal: sizeHelper.calWp(24),
                backgroundColor: AppColor.blue5,
                borderRadius: sizeHelper.calWp(10),
                position: "absolute",
                alignSelf: "center",
                width:
                  Platform.OS === "android"
                    ? sizeHelper.screenWidth - sizeHelper.calWp(24)
                    : 350,

                height: sizeHelper.calWp(80),
                bottom:
                  Platform.OS === "ios"
                    ? sizeHelper.calWp(35)
                    : sizeHelper.calWp(20),
                paddingLeft: sizeHelper.calWp(20),
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                shadowColor: AppColor.blue5,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: sizeHelper.calWp(22),
                    color: AppColor.white,
                    fontFamily: "ProximaNova-Regular",
                    marginRight: sizeHelper.calWp(10),
                  }}
                >
                  {props.StringsList._170}
                </Text>
                <View
                  style={{
                    backgroundColor: AppColor.orange,
                    borderRadius: sizeHelper.calWp(5),
                    paddingHorizontal: sizeHelper.calWp(15),
                    paddingVertical: sizeHelper.calWp(5),
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingVertical: sizeHelper.calWp(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizeHelper.calWp(18),
                      color: AppColor.white,
                      fontFamily: "ProximaNova-Regular",
                    }}
                  >
                    {props.selectedProducts.length}
                  </Text>
                </View>
              </View>

              <View
                // onPress={onInvoiceClick}
                style={{
                  borderRadius: sizeHelper.calHp(5),
                  paddingVertical: sizeHelper.calHp(5),
                  paddingHorizontal: sizeHelper.calHp(20),
                  backgroundColor: AppColor.green,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: sizeHelper.calWp(20),
                    color: AppColor.white,
                    fontFamily: "ProximaNova-Regular",
                  }}
                >
                  {props.orderNumber}
                </Text>
              </View>

              <View
                // onPress={onInvoiceClick}
                style={{
                  borderRadius: sizeHelper.calHp(5),
                  paddingVertical: sizeHelper.calHp(5),
                  paddingHorizontal: sizeHelper.calHp(40),
                  backgroundColor: AppColor.blue1,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name={I18nManager.isRTL ? "angle-left" : "angle-right"}
                  size={sizeHelper.calWp(35)}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          )}
          {props.paymentView && (
            <View style={styles.footer}>
              <BottomSheet
                data={props.payments}
                setPaymentsValue={props.setPaymentsValue}
                setPaymentView={props.setPaymentView}
                placewithpay={props.placewithpay}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  ) : (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <View style={{ position: "absolute", top: -400 }}>
            {<props.QR />}
          </View>

          <StatusBar hidden={true} />

          <Header props={props} isSearch={props.isSearch} />

          {!props.isToggle ? (
            <View>
              {props.noFamilyFound ? null : !props.isToggle ? (
                <AllCategories
                  data={props.allCategoreis}
                  focus={props.focus}
                  orderDetails={props.orderDetails}
                  disabled={props.returnInvoiceNumber ? true : false}
                  onPressItem={props.getSelectedCategoryProducts}
                  flatListRef={props.flatListRef}
                  onInvoiceClick={props.onInvoiceClick}
                  StringsList={props.StringsList}
                  orderNumber={
                    props.returnInvoiceNumber
                      ? props.returnInvoiceNumber
                      : props.orderNumber
                  }
                  children={
                    <>
                      {props?.orderDetails?.OrderType === 1 &&
                      props?.orderDetails?.TableCode !== "" ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={{
                              fontSize: sizeHelper.calWp(20),
                              fontFamily: "ProximaNova-Regular",
                              color: AppColor.white,
                            }}
                          >
                            {props.StringsList._484}
                            {props?.orderDetails?.TableCode
                              ? props.orderDetails?.TableCode
                              : ""}
                          </Text>
                        </View>
                      ) : props.orderDetails?.OrderType === 2 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={{
                              fontSize: sizeHelper.calWp(20),
                              fontFamily: "ProximaNova-Regular",
                              color: AppColor.white,
                            }}
                          >
                            {props.StringsList._328 +
                              props.StringsList._450 +
                              props.orderDetails?.OrderCode}
                          </Text>
                        </View>
                      ) : props.orderDetails?.OrderType === 3 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={{
                              fontSize: sizeHelper.calWp(20),
                              fontFamily: "ProximaNova-Regular",
                              color: AppColor.white,
                            }}
                          >
                            {props.StringsList._26 +
                              props.StringsList._450 +
                              props.orderDetails?.OrderCode}
                          </Text>
                        </View>
                      ) : null}
                    </>
                  }
                />
              ) : null}

              <View style={{ paddingHorizontal: sizeHelper.calWp(24) }}>
                <View style={{ width: "100%", height: "85%" }}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                      width: "100%",
                      height: "85%",
                    }}
                    numColumns={sizeHelper.screenWidth > 450 ? 4 : 3}
                    nestedScrollEnabled
                    contentContainerStyle={{
                      paddingBottom: 20,
                    }}
                    data={props.categoryProducts}
                    extraData={props.categoryProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) =>
                      "_" + item.ProductBarCode.toString()
                    }
                    key={(item) => "_" + item.ProductBarCode.toString()}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, marginHorizontal: sizeHelper.calWp(20) }}>
              {/* Disbale check starts here */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: sizeHelper.calWp(10),
                }}
              >
                <View
                  pointerEvents={
                    props?.orderValue === 0 || props?.orderValue === null
                      ? "none"
                      : "auto"
                  }
                  style={{
                    flexDirection: "row",
                    marginTop: sizeHelper.calHp(10),
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    disabled={props.orderDetails?.Status == 4 ? true : false}
                    style={{
                      marginHorizontal: sizeHelper.calWp(10),
                      borderRadius: sizeHelper.calWp(5),
                      paddingVertical: sizeHelper.calWp(3),
                      backgroundColor: AppColor.blue,

                      paddingHorizontal: sizeHelper.calWp(10),
                    }}
                    onPress={() => {
                      props.navigation.navigate("home", { id: undefined });
                      props.setToggle(false);
                    }}
                  >
                    <Icon
                      name="angle-left"
                      color={AppColor.white}
                      size={sizeHelper.calWp(40)}
                      style={{
                        paddingLeft: sizeHelper.calWp(8),
                        paddingRight: sizeHelper.calWp(8),
                      }}
                      // size={
                      //   sizeHelper.screenWidth > 450
                      //     ? sizeHelper.calWp(30)
                      //     : sizeHelper.calWp(40)
                      // }
                      // style={{
                      //   paddingLeft:
                      //     sizeHelper.screenWidth > 450
                      //       ? sizeHelper.calWp(5)
                      //       : sizeHelper.calWp(8),
                      //   paddingRight:
                      //     sizeHelper.screenWidth > 450
                      //       ? sizeHelper.calWp(5)
                      //       : sizeHelper.calWp(8),
                      // }}
                    />
                  </TouchableOpacity>
                  {props.orderDetails?.TableCode !== "" && (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: sizeHelper.calWp(10),
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(25)
                              : sizeHelper.calWp(28),
                          fontFamily: "ProximaNova-Regular",
                          color:
                            props.orderDetails?.OrderType === 1
                              ? AppColor.black3
                              : AppColor.backColor,
                        }}
                      >
                        {props.StringsList._447}
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: sizeHelper.calHp(10),
                          fontSize:
                            sizeHelper.screenWidth > 450
                              ? sizeHelper.calWp(25)
                              : sizeHelper.calWp(28),

                          fontFamily: "ProximaNova-Regular",
                          color:
                            props.orderDetails?.OrderType === 1
                              ? AppColor.white
                              : AppColor.backColor,

                          backgroundColor:
                            props.orderDetails?.OrderType === 1
                              ? AppColor.green
                              : AppColor.backColor,
                          padding: sizeHelper.calHp(6),
                          paddingHorizontal: sizeHelper.calHp(10),
                          borderRadius: sizeHelper.calHp(5),
                        }}
                      >
                        {props.orderDetails?.TableCode
                          ? "#" + props.orderDetails.TableCode
                          : ""}
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  disabled={true}
                  style={{
                    marginTop: sizeHelper.calHp(10),
                    alignItems: "center",
                    marginLeft: sizeHelper.calWp(20),
                  }}
                >
                  <Text
                    style={{
                      fontSize:
                        sizeHelper.screenWidth > 450
                          ? sizeHelper.calWp(25)
                          : sizeHelper.calWp(28),
                      fontFamily: "Proxima Nova Bold",
                      color: AppColor.black,
                    }}
                  >
                    Order # {props.orderDetails?.OrderCode}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    marginHorizontal: sizeHelper.calWp(10),
                    borderRadius: sizeHelper.calWp(5),
                    paddingVertical: sizeHelper.calWp(3),
                    backgroundColor: AppColor.backColor,
                    paddingHorizontal: sizeHelper.calWp(5),
                  }}
                  onPress={() => {
                    props.onClickCancel();
                    list.isOrderPlaced = false;
                    props.navigation.navigate("home", { id: undefined });
                  }}
                >
                  {/* <Icon
                    name="home"
                    color={AppColor.white}
                    size={sizeHelper.calWp(40)}
                    style={{
                      paddingLeft: sizeHelper.calWp(8),
                      paddingRight: sizeHelper.calWp(8),
                    }}
                    // size={
                    //   sizeHelper.screenWidth > 450
                    //     ? sizeHelper.calWp(30)
                    //     : sizeHelper.calWp(40)
                    // }
                    // style={{
                    //   paddingLeft:
                    //     sizeHelper.screenWidth > 450
                    //       ? sizeHelper.calWp(5)
                    //       : sizeHelper.calWp(8),
                    //   paddingRight:
                    //     sizeHelper.screenWidth > 450
                    //       ? sizeHelper.calWp(5)
                    //       : sizeHelper.calWp(8),
                    // }}
                  /> */}
                </TouchableOpacity>
              </View>
              <View
                pointerEvents={
                  props?.orderValue === 0 || props?.orderValue === null
                    ? "none"
                    : "auto"
                }
                style={[
                  styles.selectedProductListContainer,
                  {
                    flex: 4,
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
                  keyExtractor={(item) => item.SalesInvoiceDetailsID}
                />
              </View>
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

              <View
                style={{
                  marginTop: sizeHelper.calWp(22),
                  paddingStart: sizeHelper.calWp(5),
                  paddingHorizontal: sizeHelper.calWp(22),
                  paddingVertical: sizeHelper.calWp(15),
                  backgroundColor: AppColor.gray,
                  borderRadius: sizeHelper.calWp(15),
                  borderWidth: 1,
                  borderColor: AppColor.gray2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <View
                      style={[
                        styles.dropdownSmallView,
                        { justifyContent: "center", alignItems: "center" },
                      ]}
                    >
                      <Text
                        style={{
                          paddingTop: sizeHelper.calHp(3),
                          color: AppColor.black3,
                          paddingLeft: sizeHelper.calHp(5),
                          fontSize: sizeHelper.calWp(22),
                          fontFamily: "ProximaNova-Regular",
                        }}
                      >
                        {props?.orderDetails?.OrderTaker
                          ? props?.orderDetails?.OrderTaker
                          : ""}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ marginLeft: 5 }}>
                    <View
                      style={[
                        styles.dropdownSmallView,
                        { justifyContent: "center", alignItems: "center" },
                      ]}
                    >
                      <Text
                        style={{
                          paddingTop: sizeHelper.calHp(3),
                          color: AppColor.black3,
                          paddingLeft: sizeHelper.calHp(5),
                          fontSize: sizeHelper.calWp(22),
                          fontFamily: "ProximaNova-Regular",
                        }}
                      >
                        {props.orderDetails?.OrderType === 1
                          ? props.StringsList._329
                          : props.orderDetails?.OrderType === 2
                          ? props.StringsList._328
                          : props.orderDetails?.OrderType === 3
                          ? props.StringsList._26
                          : ""}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* </KeyboardAvoidingView> */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: sizeHelper.calHp(20),

                  alignItems: "center",
                }}
              >
                <CustomDropDown
                  dropDownWidth={sizeHelper.calWp(240)} //payments
                  dropDownHeight={
                    sizeHelper.screenWidth > 450
                      ? sizeHelper.calWp(50)
                      : sizeHelper.calWp(80)
                  }
                  items={props.payments}
                  setItems={props.setPayments}
                  placeholderTitle={props.StringsList._153}
                  setValue={props.setPaymentsValue}
                  value={props.paymentsValue}
                  disabled={
                    props.selectedProducts.length < 1
                      ? true
                      : props.orderDetails?.Status == 4
                      ? true
                      : props?.isLoading === true
                      ? true
                      : false
                  }
                  open={props.paymentsOpen}
                  setOpen={props.setPaymentsOpen}
                />

                <CustomButton
                  leftIcon={
                    <Icon
                      name="user-o"
                      size={
                        sizeHelper.screenWidth > 450
                          ? sizeHelper.calWp(22)
                          : sizeHelper.calWp(30)
                      }
                      color="white"
                    />
                  }
                  leftIconStyle={{ marginRight: sizeHelper.calHp(-15) }}
                  backgroundColor={AppColor.blue2}
                  onPressButton={() => props.setisBuyer(true)}
                  containerStyle={[
                    styles.buttonStyle,
                    {
                      flex: 1,
                      marginHorizontal: sizeHelper.calHp(5),
                    },
                  ]}
                  isDisabled={
                    props.selectedProducts.length < 1
                      ? true
                      : props.orderDetails?.Status == 4
                      ? true
                      : props?.isLoading === true
                      ? true
                      : false
                  }
                />
                {/*Order Update picker  */}

                {!props.showButton && (
                  <CustomDropDown
                    dropDownWidth={sizeHelper.calWp(240)} //Update Order Picker
                    dropDownHeight={
                      sizeHelper.screenWidth > 450
                        ? sizeHelper.calWp(50)
                        : sizeHelper.calWp(80)
                    }
                    items={props.orderUpdate}
                    setItems={props.setOrderUpdate}
                    placeholderTitle={props.StringsList._500}
                    value={props.orderValue}
                    setValue={props.setOrderValue}
                    open={props.orderPickerOpen}
                    setOpen={props.setOrderPickerOpen}
                    disabled={
                      props.selectedProducts.length < 1
                        ? true
                        : props.orderDetails?.Status == 4
                        ? true
                        : props?.isLoading === true
                        ? true
                        : false
                    }
                  />
                )}

                {props.showButton === true && (
                  <CustomButton
                    containerStyle={[
                      styles.buttonStyle,
                      {
                        backgroundColor: AppColor.red1,
                        flex: 1,
                        marginHorizontal: sizeHelper.calHp(5),
                      },
                    ]}
                    title={props.StringsList._520}
                    backgroundColor={AppColor.yellowColor}
                    onPressButton={props.UpdateOrder}
                    isDisabled={
                      props.selectedProducts.length < 1
                        ? true
                        : props.orderDetails?.Status == 4
                        ? true
                        : props?.isLoading === true
                        ? true
                        : false
                    }
                  />
                )}

                <CustomButton
                  containerStyle={[
                    styles.buttonStyle,
                    {
                      backgroundColor: AppColor.red1,
                      flex: 1,
                      marginHorizontal: sizeHelper.calHp(5),
                    },
                  ]}
                  title={props.StringsList._44}
                  backgroundColor={AppColor.red1}
                  onPressButton={props.CancelOrder}
                  isDisabled={
                    // props.orderDetails?.IsPaid === true
                    //   ? true
                    //   :
                    props.selectedProducts.length < 1
                      ? true
                      : props.orderDetails?.Status == 4
                      ? true
                      : props?.isLoading === true
                      ? true
                      : false
                  }
                />
              </View>
            </View>
          )}

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
          {/* Unpaid Invoice Design */}
          {props.shortInvoice && (
            <View style={styles.popupContainer}>
              <View style={styles.invoiceContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView
                    disableScrollViewPanResponder={true}
                    persistentScrollbar={true}
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
                          <Text
                            style={[
                              {
                                marginTop: 10,
                                letterSpacing: 2,
                                fontSize: sizeHelper.calHp(35),
                                alignSelf: "center",
                                // fontSize: sizeHelper.calHp(30),
                                color: AppColor.black,
                                fontFamily: "Proxima Nova Bold",
                                marginBottom: 10,
                              },
                            ]}
                          >
                            {currentDate}
                          </Text>

                          <View style={styles.divider} />

                          <View
                            style={{
                              backgroundColor: AppColor.white,
                              marginBottom: sizeHelper.calWp(10),
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: sizeHelper.calWp(10),
                              }}
                            >
                              <View style={{ alignItems: "center" }}>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: sizeHelper.calWp(30),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props.StringsList._455}
                                </Text>
                              </View>
                              <View style={{ alignItems: "center" }}>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: sizeHelper.calWp(30),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props?.orderDetails?.OrderType === 1
                                    ? props.StringsList._329
                                    : props?.orderDetails?.OrderType === 2
                                    ? props.StringsList._328
                                    : props?.orderDetails?.OrderType === 3
                                    ? props.StringsList._26
                                    : ""}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              backgroundColor: AppColor.white,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: sizeHelper.calWp(10),
                              }}
                            >
                              <View>
                                {props.orderDetails?.AreaName !== "" && (
                                  <>
                                    <Text
                                      style={{
                                        paddingTop: sizeHelper.calHp(3),
                                        color: AppColor.black3,
                                        paddingLeft: sizeHelper.calHp(5),
                                        fontSize: sizeHelper.calWp(30),
                                        fontFamily: "Proxima Nova Bold",
                                        textAlign: "left",
                                      }}
                                    >
                                      {props.StringsList._446}
                                    </Text>
                                    <Text
                                      style={{
                                        paddingTop: sizeHelper.calHp(3),
                                        color: AppColor.black3,
                                        paddingLeft: sizeHelper.calHp(5),
                                        fontSize: sizeHelper.calWp(26),
                                        fontFamily: "Proxima Nova Bold",
                                      }}
                                    >
                                      {props?.orderDetails?.AreaName
                                        ? props.orderDetails.AreaName
                                        : ""}
                                    </Text>
                                  </>
                                )}
                              </View>

                              <View style={{ alignItems: "center" }}>
                                {props?.orderDetails?.TableCode !== "" && (
                                  <>
                                    <Text
                                      style={{
                                        paddingTop: sizeHelper.calHp(3),
                                        color: AppColor.black3,
                                        paddingLeft: sizeHelper.calHp(5),
                                        fontSize: sizeHelper.calWp(30),
                                        fontFamily: "Proxima Nova Bold",
                                      }}
                                    >
                                      {props.StringsList._447}
                                    </Text>
                                    <Text
                                      style={{
                                        paddingTop: sizeHelper.calHp(3),
                                        color: AppColor.black3,
                                        paddingLeft: sizeHelper.calHp(5),
                                        fontSize: sizeHelper.calWp(26),
                                        fontFamily: "Proxima Nova Bold",
                                      }}
                                    >
                                      {props?.orderDetails?.TableCode
                                        ? props.orderDetails?.TableCode
                                        : ""}
                                    </Text>
                                  </>
                                )}
                              </View>
                              <View style={{ alignItems: "center" }}>
                                {props.orderDetails?.OrderTaker !== "" && (
                                  <Text
                                    style={{
                                      paddingTop: sizeHelper.calHp(3),
                                      color: AppColor.black3,
                                      paddingLeft: sizeHelper.calHp(5),
                                      fontSize: sizeHelper.calWp(30),
                                      fontFamily: "Proxima Nova Bold",
                                    }}
                                  >
                                    {props.StringsList._457}
                                  </Text>
                                )}
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: sizeHelper.calWp(26),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props.orderDetails?.OrderTaker
                                    ? props.orderDetails?.OrderTaker
                                    : ""}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <Text
                            style={{
                              marginBottom: 5,
                              letterSpacing: 8,
                              fontSize: sizeHelper.calHp(30),
                              alignSelf: "center",
                              fontSize: sizeHelper.calHp(30),
                              color: AppColor.black,
                              fontFamily: "Proxima Nova Bold",
                            }}
                          >
                            {props.orderNumber}
                          </Text>
                          <Barcode
                            format="CODE128"
                            value={props.orderNumber}
                            text={props.orderNumber}
                            style={{ marginBottom: 20 }}
                            maxWidth={Dimensions.get("window").width / 2}
                            height={50}
                            textStyle={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 18,
                                fontSize: sizeHelper.calHp(20),
                                alignSelf: "center",
                              },
                            ]}
                          />

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

                          <View
                            style={[
                              styles.divider,
                              { marginBottom: sizeHelper.calHp(15) },
                            ]}
                          />

                          {props.selectedProducts.map((item, index) => {
                            return (
                              <View
                                id={index}
                                style={styles.invoiceListContainer}
                              >
                                <View style={{ width: "40%" }}>
                                  {item?.IsUpdated ? (
                                    <View
                                      style={{
                                        // backgroundColor: 'red',
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <View>
                                        <Icon
                                          name="arrow-up"
                                          size={sizeHelper.calHp(35)}
                                          color={AppColor.black}
                                        />
                                      </View>
                                      <View>
                                        <Text
                                          style={{
                                            fontSize: sizeHelper.calHp(25),
                                            color: AppColor.black,
                                            fontFamily: "Proxima Nova Bold",
                                            textAlign: "left",
                                            marginHorizontal: 5,
                                          }}
                                        >
                                          {I18nManager.isRTL
                                            ? item.ProductName2
                                            : item.ProductName}
                                        </Text>
                                      </View>
                                    </View>
                                  ) : (
                                    <>
                                      <Text style={[styles.titleValueStyle]}>
                                        {I18nManager.isRTL
                                          ? item.ProductName2
                                          : item.ProductName}
                                      </Text>
                                    </>
                                  )}

                                  <View>
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
                                      {item?.notes
                                        ? item?.notes
                                        : item?.ProductNote}
                                    </Text>
                                  </View>
                                  {item?.IngredientNames !== "" && (
                                    <View>
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
                                        {item.IngredientNames}
                                      </Text>
                                    </View>
                                  )}
                                </View>

                                <View
                                  style={{
                                    width: "20%",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-start",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.PriceWithOutTax.toFixed(
                                      props.TerminalConfiguration
                                        .DecimalsInAmount
                                    )}
                                  </Text>
                                </View>
                                <View style={{ width: "15%" }}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "center",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "25%",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-end",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.FreeProduct
                                      ? "0.00"
                                      : item.GrandAmount.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount
                                        )}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}

                          {/* Customer Notes */}
                          {props?.orderDetails?.CustomerNote !== "" && (
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
                                  {props?.orderDetails?.CustomerNote}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </ViewShot>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
            </View>
          )}
          {props.isInvoice && (
            <View style={styles.popupContainer}>
              <View style={styles.invoiceContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView
                    disableScrollViewPanResponder={true}
                    persistentScrollbar={true}
                    overScrollMode={"never"}
                    contentContainerStyle={{ flexGrow: 1, zIndex: 9999999 }}
                    style={{
                      flexGrow: 1,

                      paddingVertical: 2,
                    }}
                    showsVerticalScrollIndicator={true}
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

                          <Text
                            style={[
                              styles.invoiceHeaderText,
                              {
                                fontSize: sizeHelper.calHp(5),
                              },
                            ]}
                          >
                            {"aa"}
                          </Text>
                          {/* Sales Refund */}
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
                              {props.StringsList._526}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.invoiceHeaderText,
                                {
                                  marginVertical: sizeHelper.calHp(5),
                                  fontSize: sizeHelper.calHp(35),
                                  alignSelf: "center",
                                },
                              ]}
                            >
                              {props.billingType?.name}
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

                          <View
                            style={{
                              backgroundColor: AppColor.white,
                              marginBottom: sizeHelper.calWp(10),
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // marginHorizontal: sizeHelper.calWp(10),
                              }}
                            >
                              <View style={{ alignItems: "center" }}>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: sizeHelper.calWp(22),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props.orderDetails?.OrderCode}
                                </Text>
                              </View>
                              <View style={{ alignItems: "center" }}>
                                <Text
                                  style={{
                                    paddingTop: sizeHelper.calHp(3),
                                    color: AppColor.black3,
                                    paddingLeft: sizeHelper.calHp(5),
                                    fontSize: sizeHelper.calWp(22),
                                    fontFamily: "Proxima Nova Bold",
                                  }}
                                >
                                  {props.orderDetails?.OrderType === 1
                                    ? props.StringsList._329
                                    : props.orderDetails?.OrderType === 2
                                    ? props.StringsList._328
                                    : props.orderDetails?.OrderType === 3
                                    ? props.StringsList._26
                                    : ""}
                                </Text>
                              </View>
                            </View>
                          </View>
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
                            format="CODE128"
                            value={
                              props.returnInvoiceNumber
                                ? String(props.returnInvoiceNumber)
                                : String(props.invoiceNumber)
                            }
                            text={
                              props.returnInvoiceNumber
                                ? props.returnInvoiceNumber
                                : props.invoiceNumber
                            }
                            style={{ marginBottom: 20 }}
                            maxWidth={Dimensions.get("window").width / 2}
                            height={50}
                            textStyle={[
                              styles.invoiceHeaderText,
                              {
                                letterSpacing: 18,
                                fontSize: sizeHelper.calHp(20),
                                alignSelf: "center",
                              },
                            ]}
                          />
                          {props.invoiceDates && (
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
                              {props.invoiceDates}
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
                          {props?.billingStyleId === 2 && (
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
                              <View
                                style={{
                                  width: screenSize?.scale >= 2 ? "28%" : "25%",
                                }}
                              >
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
                              { marginBottom: sizeHelper.calHp(15) },
                            ]}
                          />
                          {props.selectedProducts.map((item, index) => {
                            return props?.billingStyleId === 2 ? (
                              <View
                                id={index}
                                style={styles.invoiceListContainer}
                              >
                                <View style={{ width: "42%" }}>
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
                                          <View
                                          // style={{
                                          //   borderTopWidth:
                                          //     index === 0 ? 0.5 : 0,
                                          //   borderBottomWidth:
                                          //     index ===
                                          //     item.innerProductsArray.length -
                                          //       1
                                          //       ? 0.5
                                          //       : 0,
                                          // }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: props.isInnerPrinter
                                                  ? sizeHelper.calHp(28)
                                                  : sizeHelper.calHp(22),
                                                color: AppColor.black,
                                                fontFamily:
                                                  "ProximaNova-Regular",
                                                textAlign: "left",
                                                marginVertical: 2,
                                              }}
                                            >
                                              {I18nManager.isRTL
                                                ? product.ProductName2
                                                : product.ProductName}
                                              {product?.UOMFragment !== 0 &&
                                              I18nManager.isRTL
                                                ? " - " + product.UOMName2
                                                : " - " + product.UOMName}
                                            </Text>
                                          </View>
                                        );
                                      }
                                    )}
                                  {item?.IngredientNames !== "" && (
                                    <View>
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
                                        {item.IngredientNames}
                                      </Text>
                                    </View>
                                  )}
                                </View>

                                <View
                                  style={{
                                    width: "20%",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-start",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.PriceWithOutTax.toFixed(
                                      props.TerminalConfiguration
                                        .DecimalsInAmount
                                    )}
                                  </Text>
                                </View>
                                <View style={{ width: "15%" }}>
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "center",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
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
                                                  : sizeHelper.calHp(25),
                                                color: AppColor.black,
                                                fontFamily:
                                                  "ProximaNova-Regular",
                                                textAlign: "center",
                                                marginVertical: 2,
                                              }}
                                            >
                                              {product.Quantity}
                                            </Text>
                                          </View>
                                        );
                                      }
                                    )}
                                </View>

                                <View
                                  style={{
                                    width: "25%",
                                    // backgroundColor: 'red',
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-end",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.FreeProduct
                                      ? "0.00"
                                      : item.GrandAmount.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount
                                        )}
                                  </Text>
                                </View>
                              </View>
                            ) : (
                              <View
                                id={index}
                                style={styles.invoiceListContainer}
                              >
                                <View style={{ width: "65%" }}>
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
                                    {I18nManager.isRTL
                                      ? item.ProductName2
                                      : item.ProductName}
                                    {item?.UOMFragment !== 0 &&
                                      (I18nManager.isRTL
                                        ? " - " + item.UOMName2
                                        : " - " + item.UOMName)}
                                  </Text>
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
                                    {"@ " +
                                      item.PriceWithOutTax.toFixed(
                                        props.TerminalConfiguration
                                          .DecimalsInAmount
                                      ) +
                                      " X "}
                                    {item.IsParentAddOn
                                      ? item.Quantity
                                      : item.Quantity * item.OrignalQuantity}
                                  </Text>
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
                                          <View
                                          // style={{
                                          //   borderBottomWidth:
                                          //     index ===
                                          //     item.innerProductsArray.length -
                                          //       1
                                          //       ? 0.5
                                          //       : 0,
                                          // }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: props.isInnerPrinter
                                                  ? sizeHelper.calHp(28)
                                                  : sizeHelper.calHp(22),
                                                color: AppColor.black,
                                                fontFamily:
                                                  "ProximaNova-Regular",
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
                                        {
                                          fontSize: props.isInnerPrinter
                                            ? sizeHelper.calHp(28)
                                            : sizeHelper.calHp(25),
                                        },
                                      ]}
                                    >
                                      {item.IngredientNames}
                                    </Text>
                                  )}
                                </View>
                                <View
                                  style={{
                                    width: "35%",
                                    // backgroundColor: 'red',
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.titleValueStyle,
                                      {
                                        alignSelf: "flex-end",
                                        fontSize: props.isInnerPrinter
                                          ? sizeHelper.calHp(28)
                                          : sizeHelper.calHp(25),
                                      },
                                    ]}
                                  >
                                    {item.FreeProduct
                                      ? "0.00"
                                      : item.GrandAmount.toFixed(
                                          props.TerminalConfiguration
                                            .DecimalsInAmount
                                        )}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                          <View style={styles.divider} />

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
                                      ? [
                                          styles.invoiceHeaderText,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
                                      : [
                                          styles.titleValueStyle,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
                                  }
                                >
                                  {item.title}
                                </Text>
                                <Text
                                  style={
                                    item.id === "Total"
                                      ? [
                                          styles.invoiceHeaderText,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
                                      : [
                                          styles.titleValueStyle,
                                          {
                                            fontSize: props.isInnerPrinter
                                              ? sizeHelper.calHp(28)
                                              : sizeHelper.calHp(25),
                                          },
                                        ]
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
                                    props.TerminalConfiguration.DecimalsInAmount
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
                                    props.TerminalConfiguration.DecimalsInAmount
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
                                  ? props.selectedPyamentMethod
                                      ?.PaymentTypeName2
                                  : props.selectedPyamentMethod
                                      ?.PaymentTypeName}
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
                                  <View style={{ width: "41%" }}>
                                    <Text style={styles.invoiceHeaderText}>
                                      {props.StringsList._140}
                                    </Text>
                                    <Text style={[styles.invoiceHeaderText]}>
                                      {props.buyerInfo?.ValueAddedTaxNumber}
                                    </Text>
                                  </View>
                                )}
                                {!!props.buyerInfo?.CCRNumber && (
                                  <View style={{ width: "72%" }}>
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
                            marginVertical: sizeHelper.calHp(20),
                            marginBottom: sizeHelper.calHp(60),
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
            StringsList={props.StringsList}
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
          {props.isReturnInvoice && (
            <View style={[styles.popupContainer]}>
              <ReturnInvoice
                onPressCancel={() => props.setisReturnInvoice(false)}
                reacallFunc={props.checkReturnProductAddons}
                data={props.retunProducts}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                TerminalConfiguration={props.TerminalConfiguration}
                selectedAllProducts={props.selectedAllProducts}
                selectedProducts={props.selectedProducts}
                restState={props.restState}
                setToggle={props.setToggle}
                printType={props.printType}
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

          {props.isBillingType && (
            <View style={[styles.popupContainer]}>
              <BillingType
                onPressCancel={() => props.setisBillingType(false)}
                reacallFunc={props.PrinterFunc}
                selectBillingType={props.selectBillingType}
                data={props.billingTypeData}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                type={"bill"}
                setBillingTypeData={props.setBillingTypeData}
              />
            </View>
          )}
          {props.isSaleBilType && (
            <View style={[styles.popupContainer]}>
              <BillingType
                onPressCancel={() => props.setIsSaleBilType(false)}
                reacallFunc={props.PrinterFunc}
                data={props.saleBilData}
                StringsList={props.StringsList}
                isLoading={props.isLoading}
                selectBillingType={props.selectSaleBilType}
                setBillingTypeData={props.setSaleBilData}
                type={"invoice"}
              />
            </View>
          )}

          {(props.isLoading || props.AddProductLoader) && (
            <View style={[styles.popupContainer, { zIndex: 99999 }]}>
              <Loading />
            </View>
          )}
          {props.isSearch && <Search props={props} />}

          {props.orderNumber && !props.isToggle && (
            <TouchableOpacity
              disabled={!props.orderNumber}
              onPress={() => props.onInvoiceClick()}
              style={{
                // margin: sizeHelper.calWp(20),
                // marginHorizontal: sizeHelper.calWp(24),
                backgroundColor: AppColor.blue5,
                borderRadius: sizeHelper.calWp(10),
                position: "absolute",
                alignSelf: "center",
                width:
                  Platform.OS === "android"
                    ? sizeHelper.screenWidth - sizeHelper.calWp(24)
                    : 350,
                height: sizeHelper.calWp(80),
                bottom:
                  Platform.OS === "ios"
                    ? sizeHelper.calWp(35)
                    : sizeHelper.calWp(20),

                paddingLeft: sizeHelper.calWp(20),
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                shadowColor: AppColor.blue5,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: sizeHelper.calWp(22),
                    color: AppColor.white,
                    fontFamily: "ProximaNova-Regular",
                    marginRight: sizeHelper.calWp(10),
                  }}
                >
                  {props.StringsList._170}
                </Text>
                <View
                  style={{
                    backgroundColor: AppColor.orange,
                    borderRadius: sizeHelper.calWp(5),
                    paddingHorizontal: sizeHelper.calWp(15),
                    paddingVertical: sizeHelper.calWp(5),
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingVertical: sizeHelper.calWp(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizeHelper.calWp(18),
                      color: AppColor.white,
                      fontFamily: "ProximaNova-Regular",
                    }}
                  >
                    {props.selectedProducts.length}
                  </Text>
                </View>
              </View>

              <View
                // onPress={onInvoiceClick}
                style={{
                  borderRadius: sizeHelper.calHp(5),
                  paddingVertical: sizeHelper.calHp(5),
                  paddingHorizontal: sizeHelper.calHp(20),
                  backgroundColor: AppColor.green,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: sizeHelper.calWp(20),
                    color: AppColor.white,
                    fontFamily: "ProximaNova-Regular",
                  }}
                >
                  {props.orderNumber}
                </Text>
              </View>

              <View
                // onPress={onInvoiceClick}
                style={{
                  borderRadius: sizeHelper.calHp(5),
                  paddingVertical: sizeHelper.calHp(5),
                  paddingHorizontal: sizeHelper.calHp(40),
                  backgroundColor: AppColor.blue1,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name={I18nManager.isRTL ? "angle-left" : "angle-right"}
                  size={sizeHelper.calWp(35)}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Design;
