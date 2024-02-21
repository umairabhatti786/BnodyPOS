import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  I18nManager,
  Platform,
} from "react-native";
import FloorScreen from "../screens/floors";
import { getData } from "../sqliteHelper";
import { AreaListTable } from "../sqliteTables/AreasList";
import { RestTablesTable } from "../sqliteTables/RestTables";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrl, ServerCall } from "../redux/actions/asynchronousAction";
import Loading from "./Loading";
import AppColor from "../constant/AppColor";
import { list } from "../constant/global";
const BottomTabBar = (props) => {
  const navigation = useNavigation();
  // console.log('bottom nav', props);
  const [tableID, setTableID] = useState(null);
  const [tabFloors, setTabFloors] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tableRecords, setTableRecord] = useState([]);
  const [screenData, setScreenData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [storageItems, setStorageItems] = useState(null);
  const goToLogin = async (type) => {
    setLoading(true);
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    let loginUserInfo = await AsyncStorage.getItem("LOGIN_USER_INFO");
    loginUserInfo = JSON.parse(loginUserInfo);
    // console.log('access token ', loginUserInfo, JSON.parse(loginUserInfo));
    const response = await props.dispatch(
      ServerCall(token, "AuthorizeUser/SignOut", "POST", loginUserInfo)
    );
    console.log("user logout response.. ", response);
    await AsyncStorage.removeItem("ACCESS_TOKEN");
    navigation.replace("Auth");

    await AsyncStorage.removeItem("SELECTED_AGNETS");
    if (type === "terminal") await AsyncStorage.removeItem("LOGIN_USER_INFO");

    setLoading(false);
  };

  useEffect(() => {
    const unsubscri = props.props.addListener("focus", async () => {
      setLoading(true);
      let areaViewList = [];
      getData(AreaListTable, (items) => {
        // console.log('data of areas', items);
        setTabFloors(items);
        areaViewList = items;
      });
      getData(RestTablesTable, (tables) => {
        // console.log('data of table', tables);
        tables.forEach((element) => {
          element.isSelected = false;
        });
        setTableRecord(tables);
        TableByArea(0, areaViewList[0], tables);
        // setScreenData(filterData);
        // setLoading(false);
      });
    });

    return () => {
      unsubscri;
    };
  }, [props.props]);

  const onSelectTable = async (index) => {
    let token = await AsyncStorage.getItem("ACCESS_TOKEN");
    let TBL = [...screenData];
    let tableIndex = TBL[index]?.TableCodeID;
    setTableID(tableIndex);
    if (TBL[index].IsAvailable === 1) {
      setLoading(true);
      try {
        let url =
          apiUrl +
          `Table/ChangeTableStatus?tableCode=${TBL[index]?.TableCodeID}&IsAvailable=2`;
        let resp = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        let response = await resp.text();
        console.log("on Occupied Table", response);
        if (response?.message === "Unauthorized") {
          Alert.alert("Bnody Restaurant", props.StringsList._276, [
            { text: "OK", onPress: () => goToLogin() },
          ]);
          setLoading(false);
        } else {
          const newData = screenData.map((e) => {
            if (e.TableCodeID == TBL[index]?.TableCodeID) {
              return {
                ...e,
                IsAvailable: 2,
              };
            }
            return {
              ...e,
            };
          });

          setScreenData(newData);
        }
      } catch (e) {
        console.log(e, "error");
        setLoading(false);
      }
      setLoading(false);
      TBL[index].isSelected = true;
      await AsyncStorage.setItem("SELECTED_TABLE", JSON.stringify(TBL[index]));
      setScreenData(TBL);
      list.selectTableForOrder = true;
      navigation.goBack("home");
    }
  };

  const SelactTableByArea = async (index, route) => {
    setTabIndex(index);
    let filterData = tableRecords.filter(
      (x) => x.AreaCode === tabFloors[index].AreaCode
    );
    try {
      let token = await AsyncStorage.getItem("ACCESS_TOKEN");

      setLoading(true);
      let ccode = I18nManager.isRTL ? "ar-SA" : "en-US";
      const response = await props.dispatch(
        ServerCall(
          token,
          "Table/FetchTableWithAreaCode?areaCode=" +
            route?.AreaCode +
            "&CultureCode=" +
            ccode,
          "GET"
        )
      );
      console.log("Select Table by area ===> ", response);

      if (response?.message === "Unauthorized") {
        Alert.alert(props.StringsList._537, props.StringsList._276, [
          { text: "OK", onPress: () => goToLogin() },
        ]);
        setLoading(false);
      }
      if (Array.isArray(response) && response.length > 0) {
        let updatedArray = [];
        for (let i = 0; i < filterData.length; i++) {
          const element = filterData[i];
          let findTable = response.find(
            (e) => e.TableCode === element.TableCodeID
          );
          if (findTable) {
            element.IsAvailable = findTable.IsAvailable;
            element.TableStatus = findTable.TableStatus;
            updatedArray.push(element);
          }
        }
        setScreenData(updatedArray);
        setLoading(false);
      } else {
        setScreenData(null);
        setLoading(false);
      }
      // setLoading(false);
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }

    //  else {
    //     let updatedArray = [];
    //     for (let i = 0; i < filterData.length; i++) {
    //       const element = filterData[i];
    //       let findTable = response.find(
    //         (e) => e.TableCode === element.TableCodeID
    //       );
    //       if (findTable) {
    //         element.IsAvailable = findTable.IsAvailable;
    //         element.TableStatus = findTable.TableStatus;
    //         updatedArray.push(element);
    //       }
    //     }

    //     setScreenData(updatedArray);
    //     setLoading(false);
    //   }
    // } catch (e) {
    //   console.log(e, "error");
    //   setLoading(false);
    // }
  };

  const TableByArea = async (index, route, array) => {
    setTabIndex(index);
    let filterData = array.filter((x) => x.AreaCode === route.AreaCode);
    try {
      let token = await AsyncStorage.getItem("ACCESS_TOKEN");
      let ccode = I18nManager.isRTL ? "ar-SA" : "en-US";
      setLoading(true);
      const response = await props.dispatch(
        ServerCall(
          token,
          "Table/FetchTableWithAreaCode?areaCode=" +
            route?.AreaCode +
            "&CultureCode=" +
            ccode,
          "GET"
        )
      );
      console.log("console log call fetchTable on area select", response);

      if (response?.message === "Unauthorized") {
        Alert.alert(props.StringsList._537, props.StringsList._276, [
          { text: "OK", onPress: () => goToLogin() },
        ]);
        setLoading(false);
      } else if (response !== null) {
        let updatedArray = [];
        for (let i = 0; i < filterData.length; i++) {
          const element = filterData[i];
          let findTable = response.find(
            (e) => e.TableCode === element.TableCodeID
          );
          if (findTable) {
            element.IsAvailable = findTable.IsAvailable;
            element.TableStatus = findTable.TableStatus;
            updatedArray.push(element);
          }
        }

        setScreenData(updatedArray);
        setLoading(false);
      } else {
        setScreenData(null);
        setLoading(false);
      }
    } catch (e) {
      console.log(e, "error");
      setLoading(false);
    }
  };

  function MyTabBar() {
    return (
      <ScrollView
        horizontal={true}
        style={{
          maxHeight: Platform.OS === "ios" ? 55 : 45,
          backgroundColor: "#212b2d",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#212b2d",
          }}
        >
          {tabFloors.map((route, index) => {
            const onPress = async () => {
              SelactTableByArea(index, route);
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                // accessibilityState={isFocused ? {selected: true} : {}}
                onPress={onPress}
                style={{
                  //   flex: 1,
                  borderTopColor: tabIndex === index ? "#f98939" : "#212b2d",
                  borderTopWidth: 1.5,
                  padding: 10,
                  backgroundColor: "#212b2d",
                  marginHorizontal: 10,
                  // maxWidth: 150,
                }}
              >
                <Text
                  style={{
                    color: tabIndex === index ? "#f98939" : "#fff",
                    textAlign: "center",
                    fontFamily: "ProximaNova-Semibold",
                    fontSize: 16,
                    padding: 1,
                  }}
                >
                  {route.Name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FloorScreen
        screenData={screenData}
        onPress={onSelectTable}
        dispatch={props.dispatch}
        navigation={navigation}
        setScreenData={setScreenData}
        setLoading={setLoading}
        setTableID={setTableID}
        storageItems={storageItems}
        setStorageItems={setStorageItems}
        StringsList={props.StringsList}
        orderCode={props?.orderCode}
        setOrderCode={props?.setOrderCode}
      />
      {MyTabBar()}

      {isLoading && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: AppColor.popUpBackgroundColor,
            zIndex: 9999,
          }}
        >
          <Loading />
        </View>
      )}
    </View>
  );
};

export default BottomTabBar;
