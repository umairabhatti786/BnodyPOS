import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  I18nManager,
  Alert,
  FlatList,
  Image,
} from "react-native";

import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServerCall } from "../redux/actions/asynchronousAction";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import Icon2 from "react-native-vector-icons/Entypo";
import { list } from "../constant/global";

const SquareTableStyle = (props) => {
  const [opened, setOpend] = useState(false);
  const [totalOrders, setTotalOrders] = useState([]);
  const getDetailScreen = (orderID) => {
    list.newOrderSearch = true;
    props.navigation.navigate("home", { id: orderID });
  };
  const [shortOrderDetail, setShortOrderDetail] = useState([]);
  const onShortOrderDetail = async () => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");

    try {
      const response = await props.dispatch(
        ServerCall(
          token,
          "Order/FetchOrderByTable?tableCode=" + props.item?.TableCodeID,
          "GET"
        )
      );

      console.log("Short Order Detail Responce ======>", response);

      if (response?.message === "Unauthorized") {
        Alert.alert("Bnody Restaurant", props.StringsList._276, [
          { text: "OK", onPress: () => props.navigation.navigate("Auth") },
        ]);
        props.setLoading(false);
      } else {
        const arr = response;
        const values = arr.map((object) => object.OrderCode);

        console.log(values);
        setTotalOrders(values);
        setShortOrderDetail(response);
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const changeTableStatus = async () => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    props.setLoading(true);

    try {
      const response = await props.dispatch(
        ServerCall(
          token,
          `Table/ChangeTableStatus?tableCode=${props.item?.TableCodeID}
             &IsAvailable=1`,
          "GET"
        )
      );
      console.log("onFreeTable", response);

      if (response?.message === "Unauthorized") {
        Alert.alert("Bnody Restaurant", props.StringsList._276, [
          { text: "OK", onPress: () => props.navigation.navigate("Auth") },
        ]);
      } else {
        const newData = props.screenData.map((e) => {
          if (e.TableCodeID === props.item?.TableCodeID) {
            return {
              ...e,
              IsAvailable: 1,
            };
          }
          return {
            ...e,
          };
        });
        let table = await AsyncStorage.getItem("SELECTED_TABLE");
        if (table) {
          await AsyncStorage.removeItem("SELECTED_TABLE");

          console.log("Table Removed=================>", JSON.parse(table));
        }
        props.setScreenData(newData);
        props.setStorageItems(null);
        // props.navigation.goBack();
        props.setTableID(null);
        props.setLoading(false);
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const selectOption = async (type) => {
    let orderID = Number(shortOrderDetail[i]?.OrderCode);
    switch (type) {
      case "viewDetail":
        getDetailScreen(orderID);
        break;

      case "free":
        changeTableStatus();
        break;

      default:
        break;
    }
  };

  return (
    <>
      {props.item?.IsAvailable !== 1 ? (
        <TouchableOpacity
          key={props?.item?.TableCodeID}
          onPress={() => {
            setOpend(true);
            onShortOrderDetail();
          }}
        >
          <Menu
            opened={opened}
            onSelect={(type) => {
              selectOption(type);
              console.log(type);
            }}
          >
            <MenuTrigger>
              <View
                style={{
                  justifyContent: "flex-end",
                  width: sizeHelper.calWp(60),
                  alignItems: "center",
                  alignSelf: "flex-end",
                }}
              ></View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                width: sizeHelper.screenWidth > 450 ? 220 : 150,
                backgroundColor: AppColor.backColor,
                marginTop: sizeHelper.calWp(80),
                elevation: 50,
                paddingHorizontal: sizeHelper.calWp(8),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 5,
                  // backgroundColor: AppColor.white,
                }}
              >
                <TouchableOpacity
                  onPress={changeTableStatus}
                  style={{
                    width: "17%",
                    height: sizeHelper.calHp(36),
                    backgroundColor: AppColor.green,
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",

                    borderRadius: sizeHelper.calHp(5),
                    zIndex: 999,
                  }}
                >
                  <Text
                    style={{
                      color: AppColor.white,
                      fontSize: sizeHelper.calHp(13),
                    }}
                  >
                    {props.StringsList._476}
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        alignSelf: "center",

                        fontSize: sizeHelper.calHp(25),
                      },
                    ]}
                  >
                    {props?.item?.TableCodeID}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setOpend(false);
                  }}
                  style={{
                    backgroundColor: "red",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Icon2
                    name="cross"
                    size={sizeHelper.calHp(30)}
                    color={AppColor.white}
                  />
                </TouchableOpacity>
              </View>
              {shortOrderDetail.length > 0 ? (
                <FlatList
                  data={shortOrderDetail}
                  extraData={shortOrderDetail}
                  keyExtractor={(item) => item?.OrderCode.toString()}
                  style={{
                    height: 200,
                  }}
                  persistentScrollbar={true}
                  showsVerticalScrollIndicator={true}
                  renderItem={({ item }) => (
                    <MenuOption>
                      <TouchableOpacity
                        onPress={() => {
                          {
                            let orderID = item?.OrderCode;
                            props.navigation.navigate("home", { id: orderID });
                          }
                        }}
                        style={{
                          paddingTop: sizeHelper.calHp(8),
                          paddingBottom: sizeHelper.calHp(8),
                          borderRadius: sizeHelper.calWp(5),
                          paddingHorizontal: sizeHelper.calWp(5),
                          // borderWidth: 0.5,

                          borderRadius: sizeHelper.calWp(5),

                          backgroundColor: AppColor.white,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.14,
                          shadowRadius: 3.32,
                          elevation: 6,
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            marginHorizontal: 5,
                          }}
                        >
                          <View>
                            {/* <Text style={styles.titleStyle}>Order Tcker</Text>
                          <Text style={styles.textStyle}>
                            {item?.OrderTaker ? item.OrderTaker : ''}
                          </Text> */}
                            <Text style={[styles.titleStyle, { left: -2 }]}>
                              {props.StringsList._450}
                            </Text>
                            <Text style={styles.textStyle}>
                              {item?.OrderCode ? item.OrderCode : ""}
                            </Text>
                            <Text style={styles.titleStyle}>
                              {props.StringsList._458}
                            </Text>
                            <Text style={styles.textStyle}>
                              {item?.TimeRequired ? item.TimeRequired : ""}
                            </Text>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.titleStyle}>
                              {props.StringsList._459}
                            </Text>
                            <Text style={styles.textStyle}>
                              {item?.StatusName ? item.StatusName : ""}
                            </Text>

                            <Text style={styles.titleStyle}>
                              {props.StringsList._460}
                            </Text>
                            <Text style={styles.textStyle}>
                              {item?.OrderTime ? item.OrderTime : ""}
                            </Text>
                            {/* <Text style={styles.titleStyle}>Order Time</Text>
                          <Text style={styles.textStyle}>
                            {item?.OrderTime ? item.OrderTime : ''}
                          </Text> */}
                          </View>
                        </View>
                        {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: sizeHelper.calHp(30),
                          marginBottom: sizeHelper.calHp(10),
                        }}>
                        <TouchableOpacity
                          style={{
                            width: '60%',
                            height: sizeHelper.calHp(36),
                            backgroundColor: AppColor.brickRed,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',

                            borderRadius: sizeHelper.calHp(5),
                            zIndex: 999,
                          }}
                          onPress={() => {
                            {
                              let orderID = item?.OrderCode;
                              props.navigation.navigate('home', {id: orderID});
                            }
                          }}>
                          <Text
                            style={{
                              color: AppColor.white,
                              fontSize: sizeHelper.calHp(13),
                            }}>
                            {props.StringsList._454}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={changeTableStatus}
                          style={{
                            width: '35%',
                            height: sizeHelper.calHp(36),
                            backgroundColor: AppColor.green,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',

                            borderRadius: sizeHelper.calHp(5),
                            zIndex: 999,
                          }}>
                          <Text
                            style={{
                              color: AppColor.white,
                              fontSize: sizeHelper.calHp(13),
                            }}>
                            {props.StringsList._476}
                          </Text>
                        </TouchableOpacity>
                      </View> */}
                      </TouchableOpacity>
                    </MenuOption>
                  )}
                />
              ) : (
                <>
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 180,
                        height: 180,
                        alignSelf: "center",
                        resizeMode: "contain",
                      }}
                      source={require("../assets/images/noFile.png")}
                    />
                  </View>
                </>
              )}
            </MenuOptions>
            <View>
              <View
                style={[
                  styles.container,

                  {
                    opacity: 1,
                    zIndex: 0,
                  },
                ]}
              >
                <View
                  style={[
                    styles.leftRightContainer,
                    {
                      backgroundColor:
                        props.item?.IsAvailable === 1
                          ? AppColor.white
                          : props.item?.IsAvailable === 2
                          ? AppColor.brickRedLight
                          : props.item?.IsAvailable === 3
                          ? AppColor.orange
                          : AppColor.white,
                    },
                  ]}
                ></View>

                <View
                  style={[
                    styles.centerContainer,
                    {
                      backgroundColor:
                        props.item?.IsAvailable === 1
                          ? AppColor.white
                          : props.item?.IsAvailable === 2
                          ? AppColor.brickRedLight
                          : props.item?.IsAvailable === 3
                          ? AppColor.orange
                          : AppColor.white,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: sizeHelper.calHp(22),
                      color: AppColor.white,
                    }}
                  >
                    {" "}
                    {props.item?.TableCodeID}
                  </Text>

                  <View
                    style={[
                      styles.sequreTable,
                      {
                        backgroundColor:
                          props.item?.IsAvailable === 1
                            ? AppColor.white
                            : props.item?.IsAvailable === 2
                            ? AppColor.red1
                            : props.item?.IsAvailable === 3
                            ? AppColor.orange
                            : AppColor.white,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: sizeHelper.calHp(13),
                        fontFamily: "ProximaNova-Regular",
                        color: AppColor.white,
                      }}
                    >
                      {props.item?.IsAvailable === 1
                        ? props.StringsList._476
                        : props.item?.IsAvailable === 2
                        ? props.StringsList._448
                        : props.item?.IsAvailable === props.StringsList._478}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.leftRightContainer,
                    {
                      backgroundColor:
                        props.item?.IsAvailable === 1
                          ? AppColor.white
                          : props.item?.IsAvailable === 2
                          ? AppColor.brickRedLight
                          : props.item?.IsAvailable === 3
                          ? AppColor.orange
                          : AppColor.white,
                    },
                  ]}
                ></View>
              </View>
            </View>
          </Menu>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            key={props?.item?.TableCodeID}
            onPress={() => {
              props.Pprop.onSelectTable(props.index);
            }}
            style={[
              styles.container,

              {
                opacity: 1,
                zIndex: 0,
              },
            ]}
          >
            <View
              style={[
                styles.leftRightContainer,
                {
                  backgroundColor:
                    props.item?.IsAvailable === 1
                      ? AppColor.white
                      : props.item?.IsAvailable === 2
                      ? AppColor.brickRedLight
                      : props.item?.IsAvailable === 3
                      ? AppColor.orange
                      : AppColor.white,
                },
              ]}
            ></View>

            <View
              style={[
                styles.centerContainer,
                {
                  backgroundColor:
                    props.item?.IsAvailable === 1
                      ? AppColor.white
                      : props.item?.IsAvailable === 2
                      ? AppColor.brickRedLight
                      : props.item?.IsAvailable === 3
                      ? AppColor.orange
                      : AppColor.white,
                },
              ]}
            >
              <Text style={{ fontSize: sizeHelper.calHp(22) }}>
                {" "}
                {props.item?.TableCodeID}
              </Text>

              <View
                style={[
                  styles.sequreTable,
                  {
                    backgroundColor:
                      props.item?.IsAvailable === 1
                        ? AppColor.white
                        : props.item?.IsAvailable === 2
                        ? AppColor.brickRedLight
                        : props.item?.IsAvailable === 3
                        ? AppColor.orange
                        : AppColor.white,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(13),
                    fontFamily: "ProximaNova-Regular",
                  }}
                >
                  {props.item?.IsAvailable === 1
                    ? props.StringsList._476
                    : props.item?.IsAvailable === 2
                    ? props.StringsList._448
                    : props.item?.IsAvailable === props.StringsList._478}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.leftRightContainer,
                {
                  backgroundColor:
                    props.item?.IsAvailable === 1
                      ? AppColor.white
                      : props.item?.IsAvailable === 2
                      ? AppColor.brickRedLight
                      : props.item?.IsAvailable === 3
                      ? AppColor.orange
                      : AppColor.white,
                },
              ]}
            ></View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftRightContainer: {
    height: sizeHelper.calHp(91),
    width: sizeHelper.calWp(6),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calWp(6) / 2,
  },
  centerContainer: {
    height: sizeHelper.calHp(141),
    width: sizeHelper.calWp(183),
    marginHorizontal: sizeHelper.calWp(8),
    backgroundColor: AppColor.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeHelper.calHp(5),
    zIndex: 0,
  },
  viewDetailContainer: {
    position: "absolute",
    height: sizeHelper.calHp(165),
    width: sizeHelper.calWp(183),
    marginHorizontal: sizeHelper.calWp(8),
    backgroundColor: AppColor.white,
    left: -130,
    borderRadius: sizeHelper.calHp(5),
    zIndex: 9999,
    transform: [{ translateY: 10 }],
  },
  viewDetailContainer2: {
    position: "absolute",
    height: sizeHelper.calHp(165),
    width: sizeHelper.calWp(183),
    marginHorizontal: sizeHelper.calWp(8),
    backgroundColor: AppColor.white,
    right: -130,
    borderRadius: sizeHelper.calHp(5),
    top: sizeHelper.calHp(15),
  },
  talkBubble: {
    backgroundColor: "transparent",
  },
  talkBubbleSquare: {
    position: "absolute",
    height: sizeHelper.calHp(370),
    width: sizeHelper.calWp(200),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(10),
    zIndex: 999,
    padding: sizeHelper.calHp(10),
  },
  talkBubbleTriangle: {
    position: "absolute",
    right: sizeHelper.calHp(-38),
    top: sizeHelper.calHp(0),
    width: 0,
    height: 0,
    transform: [{ rotate: "180deg" }],
    borderTopColor: "transparent",
    borderTopWidth: sizeHelper.calHp(15),
    borderRightWidth: sizeHelper.calHp(20),
    borderRightColor: AppColor.white,
    borderBottomWidth: sizeHelper.calHp(15),
    borderBottomColor: "transparent",
    elevation: sizeHelper.calHp(15),
  },
  talkBubbleTriangle2: {
    position: "absolute",
    left: sizeHelper.calHp(-20),
    top: sizeHelper.calHp(0),
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderTopWidth: sizeHelper.calHp(15),
    borderRightWidth: sizeHelper.calHp(20),
    borderRightColor: AppColor.white,
    borderBottomWidth: sizeHelper.calHp(15),
    borderBottomColor: "transparent",
    elevation: sizeHelper.calHp(15),
  },
  titleStyle: {
    fontSize: sizeHelper.calHp(17),
    color: AppColor.black3,
    fontFamily: "ProximaNova-Regular",
    marginTop: sizeHelper.calHp(10),
  },
  textStyle: {
    fontSize: sizeHelper.calHp(17),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
  },
  sequreTable: {
    position: "absolute",
    bottom: 0,
    height: sizeHelper.calHp(36),
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: sizeHelper.calHp(5),
    borderBottomEndRadius: sizeHelper.calHp(5),
  },
});

export default React.memo(SquareTableStyle);
