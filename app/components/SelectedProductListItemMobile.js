import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  I18nManager,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";
import Entypo from "react-native-vector-icons/Entypo";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  PlusIcon,
  MinusIcon,
  DownIcon,
  UpIcon,
  SettingIcon,
} from "../assets/svg/svg";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";
import CustomModal from "../components/CustomModal";
import CustomButton from "./CustomButton";
import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";
import IncrementButton from "../assets/svg/incrementButtonMobile";
import DecrementButton from "../assets/svg/decrementButtonMobile";
import DecrementButtonDisable from "../assets/svg/decrementButtonDisableMobile";
import RemaningQuantityBox from "./RemaningQuantityBox";
import GroupProductsModal from "./GroupProductsModal";
const SelectedProductListItemMobile = ({
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
}) => {
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
  const zIndex = 5000 - 1000 * index;
  const zIndexInverse = 1000 + 1000 * index;
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

  const onClickOtherFunction = async (type, item, index) => {
    // console.log('values of options', type, index, index);
    if (type.id === "ing") {
      getProductsIngredients(item);
    } else if (type.id === "add") {
      getAddOnProducts(item, index);
    } else if (type.id === "pg") {
      setProductItems(true);
    } else if (type.id === "pn") {
      props.setNotesDetail(item?.notes ? item.notes : item?.ProductNote);
      props.setSelectedProductsNotes(item);
      props.onOpenModal();
    } else if (type.id === "rq") {
      setQuantityModelOpen(true);
    }
    // console.log('the value of object is in second menu', item);
  };

  const recieveData = (data) => {
    return setQuantityModelOpen(data);
  };

  const otherOptionsArray =
    item.ProductType === 3
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
            title: "Product Notes",
            icon: "sticky-note",
          },
          isConnected
            ? {
                id: "rq",
                title: "Remaining Quantity",
                icon: "hourglass-half",
              }
            : null,
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
            title: "Product Notes",
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

  const OtherOptionsView = () => (
    <View
      pointerEvents={props?.printType === "returnInvoice" ? "none" : "auto"}
      style={{
        // marginEnd: sizeHelper.calWp(10),
        // position: 'absolute',
        // marginLeft: sizeHelper.calWp(555),
        // marginTop: sizeHelper.calHp(30),
        marginHorizontal: 8,
        // backgroundColor: 'red',
        left: 7,
      }}
    >
      <Menu onSelect={(value, id) => onClickOtherFunction(value, item, index)}>
        <MenuTrigger
          renderTouchable={() =>
            setTimeout(() => {
              renderTouchable();
            }, 200)
          }
        >
          <View
            style={{
              backgroundColor: AppColor.green,
              width: 24,
              height: 24,
              // marginTop: 5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <SettingIcon
              style={{
                height: sizeHelper.calWp(30),

                width: sizeHelper.calWp(30),
              }}
            />
          </View>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            width: "auto",
            marginTop: sizeHelper.calWp(55),
            borderRadius: sizeHelper.calHp(10),
            paddingVertical: sizeHelper.calHp(5),
            paddingHorizontal: sizeHelper.calHp(10),
            backgroundColor: AppColor.white,
            // paddingBottom: 20,
            marginEnd: I18nManager.isRTL
              ? sizeHelper.calWp(300) - sizeHelper.screenWidth
              : 0,
          }}
        >
          {filteredOptionsArray.map((item) => (
            <MenuOption
              renderTouchable={renderTouchable}
              key={item.id}
              value={item}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginVertical: 5,
                }}
              >
                <Icon name={item.icon} size={20} color={AppColor.blue1} />
                <Text
                  style={{
                    marginLeft: 10,
                    color: AppColor.black,
                    fontFamily: "ProximaNova-Semibold",
                    fontSize: sizeHelper.calHp(25),
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
          itemCode={item.ProductBarCode}
          TerminalConfiguration={TerminalConfiguration}
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
              ? sizeHelper.calHp(120)
              : sizeHelper.calHp(120),
            // backgroundColor: "green"
          },
        ]}
      >
        {/* <View style={{
          height: "100%",
          width: sizeHelper.calWp(45),
          backgroundColor: item.IsParentAddOn ? AppColor.blue2 : AppColor.gray2,
          borderTopLeftRadius: sizeHelper.calHp(10),
          borderBottomLeftRadius: sizeHelper.calHp(10),
          justifyContent: "center",
          alignItems: "center"
        }}>
          {item.IsParentAddOn &&
            <Text style={[styles.productName, { marginTop: sizeHelper.calHp(0), color: AppColor.white, fontSize: sizeHelper.calHp(24) }]}>{noOfProducts}</Text>}
        </View> */}
        <View style={{ marginStart: sizeHelper.calWp(10) }}>
          <View
            style={{ marginTop: sizeHelper.calHp(5), flexDirection: "row" }}
          >
            <View
              style={{
                width: sizeHelper.calWp(550),
                alignItems: "center",
                // backgroundColor: 'green',
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
                    : "  -  " + item.UOMName}
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
              // backgroundColor: 'green',
              // width: '100%',
            }}
          >
            <View
              style={{
                width: sizeHelper.calWp(200),
                height: sizeHelper.calHp(40),
                justifyContent: "center",
                // alignItems: 'center',
                // backgroundColor: 'green',
              }}
            >
              <TextInput
                editable={
                  item.IsParentAddOn &&
                  userConfiguration.PriceChangeAllowed === 1 &&
                  props?.returnInvoiceNumber === null
                }
                keyboardType="numeric"
                onChangeText={(text) => onChangeText("changePrice", text, item)}
                onEndEditing={(text) => {
                  onEndEditing("changePrice", item), setFocusPrice(false);
                }}
                style={[
                  styles.inputField,
                  {
                    color: AppColor.black,
                    fontFamily: "Proxima Nova Bold",
                    fontSize: sizeHelper.calHp(20),
                    textAlign: "left",
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
                    : // : item?.ProductType === 3
                    // ? String(
                    //     item?.webperamount.toFixed(
                    //       TerminalConfiguration.DecimalsInAmount,
                    //     ),
                    //   )
                    item.PriceWithOutTax
                    ? String(
                        item.PriceWithOutTax.toFixed(
                          TerminalConfiguration.DecimalsInAmount
                        )
                      )
                    : undefined
                }
                placeholder="0.00"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginStart: 10,
              }}
            >
              {item.IsParentAddOn ? (
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      item.Quantity <= 1 ? "#67859436" : "#1f7bed",
                    height: 23,
                    width: 23,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    left: 20,
                  }}
                  disabled={
                    item.Quantity <= 1 || props?.isLoading === true
                      ? true
                      : false
                  }
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
                    style={{
                      height: sizeHelper.calWp(35),
                      width: sizeHelper.calWp(35),
                    }}
                    fill={item.Quantity <= 1 ? "#67859436" : "#fff"}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{ width: 30, height: 30 }} />
              )}
              <View
                style={{
                  width: sizeHelper.calWp(100),
                  height: 24,
                  justifyContent: "center",
                  alignItems: "center",
                  left: 20,
                  // backgroundColor: "green",
                }}
              >
                <TextInput
                  editable={
                    item.IsParentAddOn && props.returnInvoiceNumber === null
                  }
                  inputMode="numeric"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    onChangeText("manuallyCount", text, item)
                  }
                  onEndEditing={(text) => {
                    onEndEditing("manuallyCount", item), setFocus(false);
                  }}
                  style={[
                    styles.inputField,
                    {
                      paddingVertical: 0,
                      height: 24,
                      textAlign: "center",
                      width: sizeHelper.calWp(80),
                    },
                  ]}
                  onFocus={() => {
                    setFocus(true);
                    setmanuallyCount(item.Quantity);
                  }}
                  value={
                    isFocus
                      ? manuallyCount
                      : item.IsParentAddOn
                      ? String(item.Quantity)
                      : String(item.Quantity * item.OrignalQuantity)
                  }
                  placeholder={"0.00"}
                />
              </View>

              {item.IsParentAddOn ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#1f7bed",
                    height: 23,
                    width: 23,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    left: 20,
                  }}
                  disabled={
                    props?.printType === "returnInvoice" &&
                    item?.Quantity === item.maxQuantity
                      ? true || isLoading === true
                      : false
                  }
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
                  <PlusIcon
                    style={{
                      height: sizeHelper.calWp(35),
                      width: sizeHelper.calWp(35),
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    left: 2,
                  }}
                />
              )}
            </View>
            <View
              style={{
                backgroundColor: AppColor.yellowColor,
                width: sizeHelper.calWp(120),
                marginHorizontal: sizeHelper.calWp(20),
                height: sizeHelper.calHp(35),
                justifyContent: "center",
                borderRadius: sizeHelper.calWp(5),
                left: 20,
              }}
            >
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.amount}
              >
                {item.GrandAmount.toFixed(
                  TerminalConfiguration.DecimalsInAmount
                )}
              </Text>
            </View>

            {item.IsParentAddOn && <OtherOptionsView />}
            <TouchableOpacity
              style={{
                backgroundColor: AppColor.white,
                height: 23,
                width: 23,

                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setMore(!isMore);
                if (isMore) {
                  setOpen(false);
                }
              }}
            >
              {isMore ? (
                <UpIcon style={{ height: 22, width: 22 }} />
              ) : (
                <DownIcon style={{ height: 22, width: 22 }} />
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
              paddingVertical: sizeHelper.calHp(25),
            },
          ]}
        >
          <View style={{ left: -5 }}>
            <Text style={styles.productName}>{StringsList._13}</Text>
            <Text style={styles.productBox}>
              {item.tax.toFixed(TerminalConfiguration.DecimalsInAmount)}
            </Text>
          </View>
          {item.IsParentAddOn && (
            <View
              style={{ left: 20 }}
              pointerEvents={
                props?.returnInvoiceNumber !== null ? "none" : "auto"
              }
            >
              <Text style={styles.productName}>{StringsList._7}</Text>
              <TextInput
                editable={
                  item.IsParentAddOn &&
                  props.returnInvoiceNumber === null &&
                  TerminalConfiguration.IsDiscountOnSalesProduct !== "true"
                    ? false
                    : item.IsParentAddOn &&
                      userConfiguration.DiscountAllowed === 1
                    ? true
                    : false
                }
                keyboardType="number-pad"
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
            <View
              style={{ left: 10 }}
              pointerEvents={
                props?.returnInvoiceNumber !== null ? "none" : "auto"
              }
            >
              <Text style={styles.productName}>{StringsList._8}</Text>
              <TextInput
                editable={
                  item.IsParentAddOn &&
                  props.returnInvoiceNumber === null &&
                  (item.DiscountRate > 0 ||
                    TerminalConfiguration.IsDiscountOnSalesProduct !== "true")
                    ? false
                    : item.IsParentAddOn &&
                      userConfiguration.DiscountAllowed === 1
                    ? true
                    : false
                }
                keyboardType="number-pad"
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
            item.IsParentAddOn && (
              <View
                style={{
                  height: sizeHelper.calHp(80),
                  marginEnd: sizeHelper.calWp(120),
                  // backgroundColor: 'green',
                }}
              >
                <Text style={styles.productName}>{StringsList._171}</Text>
              </View>
            )}
        </View>
      )}
      {isMore &&
        item.IsParentAddOn &&
        props.userConfiguration?.AssignSalesAgentAgainstServices === 1 &&
        item.IsParentAddOn && (
          <View
            style={[
              styles.dropDownStyle,
              { bottom: open ? sizeHelper.calHp(240) : sizeHelper.calHp(35) },
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
        <CustomModal
          title={props.StringsList._43}
          displayModal={props.notesModal}
          onModalShow={props.setNotesModal}
          setisPromptModal={() => {}}
          isPromptModal={false}
          children={
            <>
              <View>
                <View
                  style={{
                    width: sizeHelper.calHp(485),
                    justifyContent: "center",
                    alignItems: "center",
                    left: 4,
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder={props.StringsList._529}
                    placeholderTextColor={AppColor.black3}
                    value={props.notesDetail}
                    onChangeText={props.setNotesDetail}
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
                <View>
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      width: sizeHelper.calHp(500),
                      alignItems: "center",
                      // height: 40,
                      // paddingVertical: 8,
                      // backgroundColor: AppColor.backColor,
                      left: 5,
                      top: -2,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 8,
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
                        onPressButton={props.setNotesModal}
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
                          props.onSaveNotes(props.selectedProductNotes)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
            </>
          }
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
  container: {
    alignItems: "center",
    borderRadius: sizeHelper.calHp(10),
  },
  innerContainer: {
    borderRadius: sizeHelper.calHp(10),
    flexDirection: "row",
    backgroundColor: AppColor.white,
    paddingHorizontal: sizeHelper.calWp(15),
    paddingVertical:
      sizeHelper.screenWidth > 450 ? sizeHelper.calHp(0) : sizeHelper.calHp(0),
  },
  productName1: {
    fontSize: sizeHelper.calHp(25),
    color: AppColor.black,
    fontFamily: "ProximaNova-Semibold",
  },
  productName: {
    marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    fontFamily: "ProximaNova-Semibold",
  },
  productBox1: {
    fontSize: sizeHelper.calHp(16),
    color: AppColor.blue,
    fontFamily: "Proxima Nova Bold",
  },
  productBox: {
    height: sizeHelper.calHp(28),
    marginTop: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(18),
    color: AppColor.gray1,
    fontFamily: "ProximaNova-Regular",
  },
  amount: {
    textAlign: "center",
    fontSize: sizeHelper.calHp(24),
    color: AppColor.white,
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
    width: sizeHelper.calWp(200),
    height: sizeHelper.calHp(40),

    fontFamily: "ProximaNova-Regular",
    fontSize: sizeHelper.calHp(25),
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
    right: sizeHelper.calWp(25),
  },
  textInput: {
    height: 180,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    borderColor: "red",
    backgroundColor: AppColor.backColor,
    borderColor: AppColor.gray,
    justifyContent: "center",
    alignItems: "center",
    top: -10,
  },
});

export default SelectedProductListItemMobile;
