import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  I18nManager,
  Modal,
  Animated,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import RemaningQuantityBox from "./RemaningQuantityBox";
import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";
import NetInfo from "@react-native-community/netinfo";
import GroupProductsModal from "./GroupProductsModal";
import DescriptionBox from "./DescriptionBox";
import { PlusIcon, MinusIcon, CloseIcon, OpenIcon } from "../assets/svg/svg";
const SelectedProductListItem = ({
  item,
  onPressIncrementDecrement,
  index,
  onChangeText,
  AgentList,
  onEndEditing,
  manuallyCount,
  setmanuallyCount,
  setLoading,
  getAddOnProducts,
  onManuallyChangePrice,
  TerminalConfiguration,
  StringsList,
  noOfProducts,
  disabled,
  getProductsIngredients,
  userConfiguration,
  productAssignSaleAgent,
  onClickIn,
  setAddProductLoader,
  props,
  onChangePrice,
  printType,
}) => {
  console.log("Value of disabled:", disabled); // Log the value of disabled prop
  const [isMore, setMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(AgentList);
  const [isFocus, setFocus] = useState(false);
  const [isFocusDA, setFocusDA] = useState(false);
  const [isFocusPDA, setFocusPDA] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isFocusPrice, setFocusPrice] = useState(false);
  const [productItems, setProductItems] = useState(false);
  const [quantityModelOpen, setQuantityModelOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  console.log("printType", printType);
  const checkInternetConnectivity = async () => {
    const netInfo = await NetInfo.fetch();
    if (netInfo?.details?.subnet) {
      setIsConnected(true);
      //console.log(netInfo.isConnected)
    } else {
      setIsConnected(false);
      //console.log(netInfo.isConnected)
    }
  };
  setInterval(checkInternetConnectivity, 500);

  const onClickSearchFunction = async (type) => {
    if (type.id === "dp") {
      item.PriceType = 3;
    } else if (type.id === "ws") {
      item.PriceType = 2;
    } else if (type.id === "rs") {
      item.PriceType = 1;
    }
    onChangePrice(item, type.value);
  };
  const onClickOtherFunction = async (type, item, index) => {
    if (type.id === "ing") {
      getProductsIngredients(item);
    } else if (type.id === "add") {
      getAddOnProducts(item, index);
    } else if (type.id === "pg") {
      setProductItems(true);
    } else if (type.id === "rq") {
      setQuantityModelOpen(true);
    } else if (type.id === "pn") {
      props.setDescriptionDetail(item?.Description ? item.Description : "");
      props.setSelectedProductsNotes(item);
      props.setDescriptionModal(true);
    }
  };

  const recieveData = (data) => {
    return setQuantityModelOpen(data);
  };

  const suitcaseArray = [
    {
      id: "dp",
      title: "Distributor Price",
      value: item?.DistributorPrice,
    },
    {
      id: "ws",
      title: "Wholesale Price",
      value: item?.WholeSalePrice,
    },
    {
      id: "rs",
      title: "Retail Price",
      value: item?.RetailPrice,
    },
  ];

  const otherOptionsArray =
    item.ProductType == 3
      ? [
          {
            id: "ing",
            title: "Ingredients",
            icon: "cutlery",
          },
          {
            id: "add",
            title: "Add-Ons",
            icon: "database",
          },
          {
            id: "pg",
            title: "Group Detail",
            icon: "cube",
          },
          {
            id: "pn",
            title: "Product Description",
            icon: "sticky-note",
          },
          // isConnected
          //   ? {
          //       id: 'rq',
          //       title: 'Remaining Quantity',
          //       icon: 'hourglass-half',
          //     }
          //   : null,
        ]
      : [
          {
            id: "ing",
            title: "Ingredients",
            icon: "cutlery",
          },
          {
            id: "add",
            title: "Add-Ons",
            icon: "database",
          },
          {
            id: "pn",
            title: "Product Description",
            icon: "sticky-note",
          },
          isConnected
            ? {
                id: "rq",
                title: "Remaining Quantity",
                icon: "hourglass-half",
              }
            : null,
        ];
  const filteredOptionsArray = otherOptionsArray.filter(
    (option) => option !== null
  );
  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;
  const TopNavigation = () => (
    <View
      pointerEvents={printType === "returnInvoice" ? "none" : "auto"}
      style={{ marginEnd: sizeHelper.calWp(10) }}
    >
      <Menu onSelect={(value, id) => onClickSearchFunction(value, id)}>
        <MenuTrigger renderTouchable={renderTouchable}>
          <View
            style={{
              backgroundColor: AppColor.green,
              width: 33,
              height: 33,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 33 / 2,
            }}
          >
            <Icon
              name={"tag"}
              size={
                sizeHelper.screenWidth > 450
                  ? sizeHelper.calWp(25)
                  : sizeHelper.calWp(30)
              }
              color={AppColor.white}
            />
          </View>
        </MenuTrigger>

        <MenuOptions
          optionsContainerStyle={{
            width: "auto",
            marginTop: sizeHelper.calWp(55),
            borderRadius: sizeHelper.calHp(10),
            paddingVertical: sizeHelper.calHp(15),
            paddingHorizontal: sizeHelper.calHp(10),
            backgroundColor: AppColor.white,
            paddingBottom: 20,
            marginEnd: I18nManager.isRTL
              ? sizeHelper.calWp(300) - sizeHelper.screenWidth
              : 0,
          }}
        >
          {suitcaseArray.map((item) => (
            <MenuOption
              style={{ marginBottom: -10 }}
              renderTouchable={renderTouchable}
              key={item.id}
              value={item}
            >
              <View
                style={{
                  alignItems: "center",

                  padding: 5,
                }}
              >
                <Text
                  style={{
                    color: AppColor.black,
                    fontFamily: "ProximaNova-Semibold",
                    fontSize: sizeHelper.calHp(20),
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );

  const OtherOptionsView = () => (
    <View
      pointerEvents={printType === "returnInvoice" ? "none" : "auto"}
      style={{ marginEnd: sizeHelper.calWp(10) }}
    >
      <Menu onSelect={(value, id) => onClickOtherFunction(value, item, index)}>
        <MenuTrigger renderTouchable={renderTouchable}>
          <View
            style={{
              backgroundColor: AppColor.green,
              width: 33,
              height: 33,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderRadius: 100,
            }}
          >
            <Icon
              name={"gear"}
              size={
                sizeHelper.screenWidth > 450
                  ? sizeHelper.calWp(25)
                  : sizeHelper.calWp(30)
              }
              color={AppColor.white}
            />
          </View>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            width: "auto",
            marginTop: sizeHelper.calWp(55),
            borderRadius: sizeHelper.calHp(10),
            paddingVertical: sizeHelper.calHp(15),
            paddingHorizontal: sizeHelper.calHp(10),
            backgroundColor: AppColor.white,
            paddingBottom: 20,
            marginEnd: I18nManager.isRTL
              ? sizeHelper.calWp(300) - sizeHelper.screenWidth
              : 0,
          }}
        >
          {filteredOptionsArray.map((item) => (
            <MenuOption
              style={{ marginBottom: -10 }}
              renderTouchable={renderTouchable}
              key={item.id}
              value={item}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  margin: 0,
                  padding: 5,
                }}
              >
                <Icon name={item.icon} size={20} color={AppColor.blue1} />
                <Text
                  style={{
                    marginLeft: 10,
                    color: AppColor.black,
                    fontFamily: "ProximaNova-Semibold",
                    fontSize: sizeHelper.calHp(20),
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
      {quantityModelOpen && (
        <RemaningQuantityBox
          openModal={quantityModelOpen}
          setModalOpen={recieveData}
          itemCode={item.ProductCode}
        />
      )}
    </View>
  );

  return (
    <View
      pointerEvents={item?.FreeProduct === true ? "none" : "auto"}
      style={[
        styles.container,
        open ? { height: sizeHelper.calHp(450) } : { height: "auto" },
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: item.IsParentAddOn
              ? AppColor.white
              : AppColor.gray2,
            height: item.IsParentAddOn
              ? sizeHelper.calHp(100)
              : sizeHelper.calHp(100),
          },
        ]}
      >
        <View
          style={{
            height: sizeHelper.calHp(100),
            width: sizeHelper.calWp(45),
            backgroundColor: item.IsParentAddOn
              ? AppColor.blue2
              : AppColor.gray2,
            borderTopLeftRadius: sizeHelper.calHp(10),
            borderBottomLeftRadius: sizeHelper.calHp(10),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.IsParentAddOn && (
            <Text
              style={[
                styles.productName,
                {
                  marginTop: sizeHelper.calHp(0),
                  color: AppColor.white,
                  fontSize: sizeHelper.calHp(30),
                },
              ]}
            >
              {noOfProducts}
            </Text>
          )}
        </View>
        <View style={{ marginStart: sizeHelper.calWp(10) }}>
          <View style={{ marginTop: sizeHelper.calHp(5) }}>
            <View
              style={{
                width: sizeHelper.calWp(600),
                alignItems: "center",
                //backgroundColor: 'green',
                flexDirection: "row",
              }}
            >
              <Text numberOfLines={1} style={styles.productName1}>
                {I18nManager.isRTL ? item.ProductName2 : item.ProductName}
              </Text>

              {item?.UOMFragment !== 0 && (
                <Text style={styles.productBox1}>
                  {I18nManager.isRTL
                    ? "  -" + item.UOMName2
                    : "  -" + item.UOMName}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: sizeHelper.calHp(5),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: sizeHelper.calWp(80),
                height: sizeHelper.calHp(40),
                justifyContent: "center",
              }}
            >
              <TextInput
                editable={
                  item.IsParentAddOn === 1 &&
                  userConfiguration.PriceChangeAllowed === 1
                }
                keyboardType="numeric"
                onChangeText={(text) => onChangeText("changePrice", text, item)}
                onEndEditing={(text) => {
                  onEndEditing("changePrice", item), setFocusPrice(false);
                }}
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[
                  styles.inputField,
                  {
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                    fontSize: sizeHelper.calHp(24),
                  },
                ]}
                onFocus={() => {
                  setFocusPrice(true);
                  setmanuallyCount(
                    item.PriceWithOutTax ? item.PriceWithOutTax : 0
                  );
                }}
                value={
                  isFocusPrice
                    ? manuallyCount
                    : item.ProductType == 3
                    ? Number(item.webperamount).toFixed(2)
                    : Number(item.PriceWithOutTax).toFixed(2)
                    ? Number(item.PriceWithOutTax).toFixed(2)
                    : undefined
                }
                placeholder="0.00"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item.IsParentAddOn ? (
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      item.Quantity <= 1 ? "#67859436" : "#1f7bed",
                    height: 30,
                    width: 30,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={item.Quantity <= 1}
                  onPressIn={async () => {}}
                  onPress={async () => {
                    onClickIn();
                    setLoading(true);
                    setAddProductLoader(true);
                    await onPressIncrementDecrement(item, "decrement", index);
                    setTimeout(() => {
                      setAddProductLoader(false), setDisabled(false);
                    }, 0);
                  }}
                >
                  <MinusIcon
                    style={{ height: 28, width: 28 }}
                    fill={item.Quantity <= 1 ? "#67859436" : "#fff"}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{ width: 26, height: 26 }} />
              )}
              <View
                style={{
                  width: sizeHelper.calWp(100),
                  height: sizeHelper.calHp(40),
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: 'green',
                }}
              >
                <TextInput
                  editable={item.IsParentAddOn === 1}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    onChangeText("manuallyCount", text, item)
                  }
                  onEndEditing={(text) => {
                    onEndEditing("manuallyCount", item), setFocus(false);
                  }}
                  style={[
                    styles.inputField,
                    { textAlign: "center", width: sizeHelper.calWp(80) },
                  ]}
                  onFocus={() => {
                    setFocus(true);
                    setmanuallyCount(item.Quantity);
                  }}
                  value={
                    isFocus
                      ? manuallyCount
                      : item.IsParentAddOn
                      ? String(item.Quantity.toFixed(2))
                      : String(
                          (item.Quantity * item.OrignalQuantity).toFixed(2)
                        )
                  }
                  placeholder="0.00"
                />
              </View>
              {item.IsParentAddOn ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#1f7bed",
                    height: 30,
                    width: 30,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={isDisabled}
                  onPress={async () => {
                    setDisabled(true);
                    onClickIn();
                    setLoading(true);
                    setAddProductLoader(true);
                    await onPressIncrementDecrement(item, "increment", index);
                    setTimeout(() => {
                      setDisabled(false);
                      setAddProductLoader(false);
                    }, 0);
                  }}
                >
                  <PlusIcon style={{ height: 28, width: 28 }} />
                </TouchableOpacity>
              ) : (
                <View style={{ width: 26, height: 26 }} />
              )}
            </View>
            <View
              style={{
                backgroundColor: AppColor.yellowColor,
                width: sizeHelper.calWp(120),
                marginLeft: sizeHelper.calWp(20),
                marginRight: sizeHelper.calHp(10),
                height: sizeHelper.calHp(40),
                justifyContent: "center",
                borderRadius: sizeHelper.calWp(5),
              }}
            >
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.amount}
              >
                {/* {item.SellingPrice * item.Quantity +
                item.tax * item.Quantity -
                (item.DiscountAmount ? item.DiscountAmount : 0)} */}
                {item.GrandAmount.toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )}
              </Text>
            </View>
            {item.IsParentAddOn && item.ProductType !== 3 ? (
              <TopNavigation />
            ) : (
              <></>
            )}

            {item.IsParentAddOn && <OtherOptionsView />}
            {/* <TouchableOpacity
              style={{ marginEnd: sizeHelper.calWp(10) }}
              disabled={disabled}
              onPress={() => {
                getProductsIngredients(item);
              }}>
              <View
                style={{
                  backgroundColor: AppColor.yellow1,
                  width: 33,
                  height: 33,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 33 / 2,
                }}>
                <Icon name="life-saver" size={20} color={AppColor.green} />
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={{ marginEnd: sizeHelper.calWp(10) }}
              disabled={
                !item.IsParentAddOn || item.AddOnGroupCode === '' || disabled
              }
              onPress={() => {
                getAddOnProducts(item, index);
              }}>
              {!item.IsParentAddOn ? (
                <View style={{ height: 33, width: 33 }} />
              ) : item.AddOnGroupCode === '' ? (
                <View style={{ height: 33, width: 33 }} />
              ) : (
                <View
                  style={{
                    backgroundColor: AppColor.green,
                    width: 33,
                    height: 33,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 33 / 2,
                  }}>
                  <Icon name="life-saver" size={20} color={AppColor.yellow1} />
                </View>
              )}
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{
                backgroundColor: AppColor.white,
                height: 30,
                width: 30,

                justifyContent: "center",
                alignItems: "center",
                borderColor: AppColor.blue2,
                borderWidth: 1,
                borderRadius: 100,
              }}
              onPress={() => {
                setMore(!isMore);
                if (isMore) {
                  setOpen(false);
                }
              }}
            >
              {isMore ? (
                <CloseIcon style={{ height: 25, width: 25 }} />
              ) : (
                <OpenIcon style={{ height: 25, width: 25 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isMore && (
        <View
          style={[
            styles.innerContainer,
            {
              backgroundColor: AppColor.white1,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: sizeHelper.calWp(20),
              paddingVertical:
                sizeHelper.screenWidth > 450
                  ? sizeHelper.calHp(25)
                  : sizeHelper.calHp(25),
            },
          ]}
        >
          <View>
            <Text style={styles.productName}>{StringsList._13}</Text>
            <Text style={styles.productBox}>{Number(item.tax).toFixed(2)}</Text>
          </View>
          {item.IsParentAddOn && (
            <View>
              <Text style={styles.productName}>{StringsList._7}</Text>
              <TextInput
                editable={
                  item.IsParentAddOn === 1 &&
                  TerminalConfiguration.IsDiscountOnSalesProduct !== "true"
                    ? false
                    : item.IsParentAddOn === 1 &&
                      userConfiguration.DiscountAllowed === 1
                    ? true
                    : false
                }
                keyboardType="numeric"
                adjustsFontSizeToFit
                numberOfLines={1}
                onChangeText={(text) =>
                  onChangeText("DiscountRate", text, item)
                }
                onEndEditing={(text) => {
                  onEndEditing("DiscountRate", item), setFocusPDA(false);
                }}
                style={styles.inputField}
                onFocus={() => {
                  setFocusPDA(true);
                  setmanuallyCount(item.DiscountRate ? item.DiscountRate : 0);
                }}
                value={
                  isFocusPDA
                    ? manuallyCount
                    : item.DiscountRate
                    ? String(item.DiscountRate)
                    : undefined
                }
                placeholder="0.00"
              />
              <View style={[styles.dashedLine]}>
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: 1,
                    backgroundColor: AppColor.white1,
                    zIndex: 1,
                  }}
                />
              </View>
            </View>
          )}

          {item.IsParentAddOn && (
            <View>
              <Text style={styles.productName}>{StringsList._8}</Text>
              <TextInput
                editable={
                  item.IsParentAddOn === 1 &&
                  (item.DiscountRate > 0 ||
                    TerminalConfiguration.IsDiscountOnSalesProduct !== "true")
                    ? false
                    : item.IsParentAddOn === 1 &&
                      userConfiguration.DiscountAllowed === 1
                    ? true
                    : false
                }
                keyboardType="numeric"
                adjustsFontSizeToFit
                numberOfLines={1}
                onChangeText={(text) =>
                  onChangeText("DiscountAmount", text, item)
                }
                onEndEditing={(text) => {
                  onEndEditing("DiscountAmount", item), setFocusDA(false);
                }}
                style={styles.inputField}
                onFocus={() => {
                  setFocusDA(true);
                  setmanuallyCount(
                    item.DiscountAmount ? item.DiscountAmount : 0
                  );
                }}
                value={
                  isFocusDA
                    ? manuallyCount
                    : item.DiscountAmount
                    ? String(item.DiscountAmount)
                    : item.DiscountRate
                    ? String(item.DiscountRate * item.Quantity)
                    : undefined
                }
                placeholder="0.00"
              />

              <View style={[styles.dashedLine]}>
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: 1,
                    backgroundColor: AppColor.white1,
                    zIndex: 1,
                  }}
                />
              </View>
            </View>
          )}

          {props.userConfiguration?.AssignSalesAgentAgainstServices === 1 &&
            item?.IsParentAddOn && (
              <View
                style={{
                  height: sizeHelper.calHp(80),
                  marginEnd: sizeHelper.calWp(120),
                  //backgroundColor: 'green',
                }}
              >
                <Text style={styles.productName}>{StringsList._171}</Text>
              </View>
            )}
        </View>
      )}
      {isMore &&
        item?.IsParentAddOn &&
        props.userConfiguration?.AssignSalesAgentAgainstServices === 1 && (
          <View
            style={[
              styles.dropDownStyle,
              { bottom: open ? sizeHelper.calHp(270) : sizeHelper.calHp(35) },
            ]}
          >
            <DropDownPicker
              listMode="SCROLLVIEW"
              disabled={!item.IsParentAddOn || disabled}
              nestedScrollEnabled={true}
              open={open}
              value={item.value ? item.value : value}
              items={items}
              onChangeValue={(value) => {
                productAssignSaleAgent(items, value, item);
              }}
              style={{
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(200)
                    : sizeHelper.calWp(250),
                paddingEnd: 0,
                margin: 0,
                borderRadius: 0,
                borderWidth: 0,
                borderRadius: sizeHelper.calWp(25),
                height: sizeHelper.calHp(40),
                marginTop: sizeHelper.calHp(10),
              }}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={`${StringsList._368}`}
              //style={styles.dropDownStyle}
              placeholderStyle={{
                color: AppColor.gray1,
                fontWeight: "bold",
                alignSelf: "center",
                marginStart: sizeHelper.calWp(10),
              }}
              dropDownMaxHeight={sizeHelper.calHp(100)}
              dropDownContainerStyle={{
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(200)
                    : sizeHelper.calWp(250),
                marginTop: sizeHelper.calHp(15),
                borderWidth: 0,
                height: sizeHelper.calHp(250),
              }}
              arrowIconContainerStyle={{
                height: sizeHelper.calHp(40),
                width: sizeHelper.calWp(35),
                borderTopEndRadius: sizeHelper.calWp(15),
                borderBottomRightRadius: sizeHelper.calWp(15),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: AppColor.blue1,
                marginEnd: 0,
              }}
              arrowIconStyle={{
                width: sizeHelper.calWp(20),
                height: sizeHelper.calHp(20),
                tintColor: AppColor.white,
              }}
              listItemContainerStyle={
                {
                  //paddingStart: sizeHelper.calWp(20),
                  //height: sizeHelper.calHp(100),
                }
              }
              containerStyle={{
                height: sizeHelper.calHp(40),
                borderRadius: sizeHelper.calWp(15),
                padding: 0,
                margin: 0,
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(200)
                    : sizeHelper.calWp(250),
              }}
              tickIconStyle={{
                width: sizeHelper.calWp(20),
                height: sizeHelper.calHp(20),
                tintColor: AppColor.white,
              }}
            />
          </View>
        )}

      <>
        <DescriptionBox
          descriptionDetail={props.descriptionDetail}
          setDescriptionDetail={props.setDescriptionDetail}
          descriptionModal={props.descriptionModal}
          setDescriptionModal={props.setDescriptionModal}
          selectedProductNotes={props.selectedProductNotes}
          onSaveNotes={props.onSaveNotes}
          StringsList={StringsList}
        />
      </>

      <>
        {productItems && item?.IsParentAddOn && item?.ProductType === 3 && (
          <GroupProductsModal
            data={item?.innerProductsArray ? item.innerProductsArray : null}
            productItems={productItems}
            setProductItems={setProductItems}
            StringsList={StringsList}
          />
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    borderRadius: sizeHelper.calHp(10),
    flexDirection: "row",
    backgroundColor: AppColor.white,
    paddingRight: sizeHelper.calWp(24),
    paddingVertical:
      sizeHelper.screenWidth > 450 ? sizeHelper.calHp(0) : sizeHelper.calHp(25),
  },
  productName1: {
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    fontFamily: "ProximaNova-Semibold",
    fontWeight: "bold",
  },
  productName: {
    marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    fontFamily: "ProximaNova-Semibold",
    fontWeight: "bold",
  },
  productBox1: {
    fontSize: sizeHelper.calHp(16),
    color: AppColor.blue1,
    fontFamily: "Proxima Nova Bold",
  },
  productBox: {
    height: sizeHelper.calHp(28),
    marginTop: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(16),
    color: AppColor.gray1,
    fontFamily: "ProximaNova-Regular",
  },
  amount: {
    textAlign: "center",

    fontSize: sizeHelper.calHp(24),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",

    marginEnd: sizeHelper.calWp(2),
    marginStart: sizeHelper.calWp(2),
  },
  quantity: {
    fontSize: sizeHelper.calHp(16),
    color: AppColor.black,
    fontFamily: "ProximaNova-Regular",
  },
  inputField: {
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(40),

    fontFamily: "ProximaNova-Regular",
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  dashedLine: {
    width: sizeHelper.calWp(100),
    borderColor: AppColor.gray1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  dropDownStyle: {
    position: "absolute",
    right: sizeHelper.calWp(24),
  },
  textInput: {
    height: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    borderColor: "red",
    backgroundColor: AppColor.backColor,
    borderColor: AppColor.gray,
    justifyContent: "center",
    alignItems: "center",
    top: -10,
  },
});

export default SelectedProductListItem;
