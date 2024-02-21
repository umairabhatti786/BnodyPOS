import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  View,
  Alert,
  StatusBar,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  NativeModules,
  PermissionsAndroid,
  Platform,
  NativeEventEmitter,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScopedStorage from "react-native-scoped-storage";
import Toast from "react-native-root-toast";
import { connect } from "react-redux";
import {
  SaveAllData,
  ServerCall,
} from "../../redux/actions/asynchronousAction";
import NetInfo from "@react-native-community/netinfo";
import RNFS from "react-native-fs";

import { createStackNavigator } from "@react-navigation/stack";
import * as Animatable from "react-native-animatable";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  CreateTable,
  DeleteDatatbase,
  DeleteTable,
  getData,
  InsertData,
} from "../../sqliteHelper";

import {
  StringsListTable,
  StringsListCoulumns,
} from "../../sqliteTables/StringsList";

const Stack = createStackNavigator();
import Design from "./design";
import sizeHelper from "../../helpers/sizeHelper";
import styles from "./style";
import AppColor from "../../constant/AppColor";

const SplashScreen = (props) => {
  const [count, setCount] = useState(0);
  const { navigation } = props;
  const [loading, setloading] = useState(true);
  const [showRealApp, setRealApp] = useState(true);
  // const viewref = useRef(null);
  // const createFile = NativeModules.PermissionFile;
  // const PermissionFile = NativeModules.PrinterNativeModule;
  // const eventEmitter = new NativeEventEmitter(PermissionFile);

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     const OsVer = Platform.constants['Release'];
  //     if (OsVer >= 10) {
  //       const newDevice = eventEmitter.addListener(
  //         'DeviceFound',
  //         async deviceDiscovered => {
  //           let uri = deviceDiscovered;
  //           console.log('Device discovered uri is: ' + uri);
  //           AsyncStorage.setItem('FILE_URI', uri, err => {
  //             if (err) {
  //               console.log('an error');
  //               throw err;
  //             }
  //             console.log('success');
  //           }).catch(err => {
  //             console.log('error is: ' + err);
  //           });
  //         },
  //       );

  //       return () => newDevice.remove();
  //     }
  //   }
  // });

  // useEffect(async () => {
  //   if (Platform.OS === 'android') {
  //     const OsVer = Platform.constants['Release'];
  //     if (OsVer >= 11) {
  //       let path = '/storage/emulated/0/Documents/Restaurant/Invoices.txt';
  //       if (await RNFS.exists(path)) {
  //         console.log(
  //           'File already exists',
  //           RNFS.exists(path) + 'OS version',
  //           OsVer,
  //         );
  //       } else {
  //         console.log('File creation', +'OS version', OsVer);
  //         createFile.overWriteAbove29(
  //           '',
  //           err => {
  //             if (err) {
  //               console.log('Permission Error', err);
  //             }
  //           },
  //           success => {
  //             if (success) {
  //               // You can use RN-fetch-blog to download files and storge into download Manager
  //               // RNFS.unlink(path);
  //               console.log('Folder created with empty file', success);
  //             }
  //           },
  //         );
  //       }
  //     } else {
  //       let path = '/storage/emulated/0/Downloads/Restaurant/Invoices.txt';
  //       if (RNFS.exists(path)) {
  //         console.log(
  //           'File already exists',
  //           RNFS.exists(path) + 'OS version',
  //           OsVer,
  //         );
  //       } else {
  //         console.log('File creation', +'OS version', OsVer);
  //         createFile.overWriteAPI29(
  //           '',
  //           err => {
  //             if (err) {
  //               console.log('Permission Error', err);
  //             }
  //           },
  //           success => {
  //             if (success) {
  //               // You can use RN-fetch-blog to download files and storge into download Manager
  //               // RNFS.unlink(path);
  //               console.log('Folder created with empty file', success);
  //             }
  //           },
  //         );
  //       }
  //     }
  //   }
  // }, []);
  useEffect(async () => {
    if (Platform.OS === "android") {
      try {
        const folderPath = "/storage/emulated/0/Documents/Bnody Restaurant";
        const filePath = `${folderPath}/Invoices.txt`;
        const folderExists = await RNFS.exists(folderPath);
        const folderFileExists = await RNFS.exists(filePath);
        if (!folderExists && !folderFileExists) {
          try {
            console.log("Folder and File not found");
            await AsyncStorage.removeItem("FOLDER_PATH");
            await AsyncStorage.removeItem("FILE_URI");
            const dir = await ScopedStorage.openDocumentTree(true);
            const bnodyDir = await ScopedStorage.createDirectory(
              dir.uri,
              "Bnody Restaurant"
            );
            await AsyncStorage.setItem("FOLDER_PATH", bnodyDir.uri);
            const filePath = await ScopedStorage.writeFile(
              bnodyDir.uri,
              "",
              "invoices.txt",
              "text/plain",
              "utf8"
            );
            console.log("filePath", filePath);
            await AsyncStorage.setItem("FILE_URI", filePath);
            console.log("Folder & File created successfully:", bnodyDir);
            await AsyncStorage.setItem("FOLDER_URI", bnodyDir.uri);
            Toast.show("Folder & Invoice File Created", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          } catch (error) {
            console.error("Folder and File not created", error);
          }
        } else if (folderExists && !folderFileExists) {
          await AsyncStorage.removeItem("FILE_URI");
          try {
            console.log("folder already exists file not found");
            const bnodyDir = await AsyncStorage.getItem("FOLDER_PATH");
            console.log("bnodyDir", bnodyDir);
            const filePath = await ScopedStorage.writeFile(
              bnodyDir,
              "",
              "invoices.txt",
              "text/plain",
              "utf8"
            );
            console.log("filePath", filePath);
            await AsyncStorage.setItem("FILE_URI", filePath);
            Toast.show("Invoice File Created", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          } catch (error) {
            console.error("folder already exists file creation error", error);
          }
        } else {
          Toast.show("Folder & Invoice File Exits", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      try {
        const folderName = "Bnody Restaurant";
        const fileName = "invoices.txt";

        const libraryDirectoryPath = RNFS.LibraryDirectoryPath;

        const folderPath = `${libraryDirectoryPath}/${folderName}`;

        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          await RNFS.mkdir(folderPath);
          console.log("Folder created successfully:", folderPath);
        } else {
          console.log("Folder already exists:", folderPath);
        }

        const filePath = `${folderPath}/${fileName}`;
        await RNFS.writeFile(filePath, "", "utf8");
        console.log("File created successfully:", filePath);
      } catch (error) {
        console.error("Error creating folder and file:", error);
      }
    }
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, backgroundColor: item.white }}>
        <Image
          source={item.image}
          // resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
            resizeMode: sizeHelper.screenWidth > 450 ? "stretch" : "cover",
            // bottom: 10,
          }}
        />
        <Text style={styles.text}>{item.text}</Text>
        <TouchableOpacity
          style={{
            width: 60,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 10,
            // start: 30,
          }}
          onPress={() => onDone()}
        >
          <Text
            style={{
              fontFamily: "ProximaNova-Semibold",
              color: AppColor.blue2,
              fontSize: sizeHelper.calHp(30),
            }}
          >
            {I18nManager.isRTL ? "يتخط" : "SKIP"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onDone = () => {
    setRealApp(true);
    const isTrue = true;
    const realAPPTrue = JSON.stringify(isTrue);
    AsyncStorage.setItem("MY_REAL_APP", realAPPTrue);
  };

  useEffect(() => {
    setTimeout(() => {
      fetdatafunction();
    }, 2000);
  }, [showRealApp]);
  const fetdatafunction = async () => {
    try {
      getAppInfo();
      requestPermission();
      if (showRealApp) {
        let UserLogin = await AsyncStorage.getItem("ACCESS_TOKEN");
        console.log("Token Access ", UserLogin);
        // accessFiles();
        await loadData(UserLogin);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const getAppInfo = async () => {
    // console.log('getAppInfo');
    const val = await AsyncStorage.getItem("MY_REAL_APP");
    const realAPPTrue = JSON.parse(val);
    console.log("realAppTrue: " + realAPPTrue);
    if (realAPPTrue == null) {
      setRealApp(false);
    } else {
      setRealApp(true);
    }
  };
  const slidesEng = [
    {
      key: 1,
      title: "",
      text: "",
      image: require("../../assets/images/startup01.png"),
      backgroundColor: "transparent",
    },

    {
      key: 2,
      title: "",
      text: "",
      image: require("../../assets/images/startup02.png"),
      backgroundColor: "transparent",
    },
    {
      key: 3,
      title: "",
      text: "",
      image: require("../../assets/images/startup03.png"),
      backgroundColor: "transparent",
    },
    {
      key: 4,
      title: "",
      text: "",
      image: require("../../assets/images/startup04.png"),
      backgroundColor: "transparent",
    },
  ];
  const slidesArb = [
    {
      key: 1,
      title: "",
      text: "",
      image: require("../../assets/images/startup01AR.png"),
      backgroundColor: "transparent",
    },

    {
      key: 2,
      title: "",
      text: "",
      image: require("../../assets/images/startup02AR.png"),
      backgroundColor: "transparent",
    },
    {
      key: 3,
      title: "",
      text: "",
      image: require("../../assets/images/startup03AR.png"),
      backgroundColor: "transparent",
    },
    {
      key: 4,
      title: "",
      text: "",
      image: require("../../assets/images/startup04AR.png"),
      backgroundColor: "transparent",
    },
  ];
  const renderNextButton = () => {
    return (
      <View
        style={{
          width: sizeHelper.calWp(50),
          height: sizeHelper.calWp(50),
          backgroundColor: AppColor.blue2,
          borderRadius: sizeHelper.calWp(50) / 2,

          alignItems: "center",

          alignItems: "center",
          // position: 'absolute',
          bottom: sizeHelper.screenWidth > 450 ? -12 : -20,
          // start: 30,
        }}
      >
        <Icon
          name={I18nManager.isRTL ? "chevron-left" : "chevron-right"}
          color="rgba(255, 255, 255, .9)"
          size={sizeHelper.screenWidth > 450 ? 15 : 12}
          style={{
            bottom: sizeHelper.screenWidth > 450 ? -12 : -6,
            left: 1,
          }}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => onDone()}
        style={{
          width: sizeHelper.calWp(50),
          height: sizeHelper.calWp(50),
          backgroundColor: AppColor.blue2,
          borderRadius: sizeHelper.calWp(50) / 2,

          alignItems: "center",

          alignItems: "center",
          // position: 'absolute',
          bottom: sizeHelper.screenWidth > 450 ? -12 : -20,
          // start: 30,
        }}
      >
        <Icon
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={sizeHelper.screenWidth > 450 ? 15 : 12}
          style={{
            bottom: sizeHelper.screenWidth > 450 ? -12 : -6,
            left: 1,
          }}
        />
      </TouchableOpacity>
    );
  };

  const loadData = async (UserLogin) => {
    console.log("loadData", UserLogin);
    if (UserLogin) {
      getData(StringsListTable, async (cb) => {
        let stringsListEnglish = cb[0]?.StringsListOject
          ? JSON.parse(cb[0]?.StringsListOject)
          : "";
        let stringsListArabic = cb[1]?.StringsListOject
          ? JSON.parse(cb[1]?.StringsListOject)
          : "";
        console.log("StringsListTable...", stringsListEnglish);
        let data = {
          type: "ChangeStringsList",
          data: I18nManager.isRTL ? stringsListArabic : stringsListEnglish,
        };

        let response = await props.dispatch(SaveAllData(data));
        props.navigation.replace("Main");
      });
    } else {
      props.navigation.replace("Auth");
      // console.log('setTimeout else');
    }
  };

  // const accessFiles = async () => {
  //   if (Platform.OS === 'android') {
  //     const OsVer = Platform.constants['Release'];
  //     if (OsVer >= 10) {
  //       var val = await AsyncStorage.getItem('IS_FOLDER_CREATED');
  //       console.log('IS_FOLDER_CREATED', val);
  //       if (val === 'true') {
  //       } else {
  //         PermissionFile.readFolder();
  //         AsyncStorage.setItem('IS_FOLDER_CREATED', 'true', err => {
  //           if (err) {
  //             console.log('an error');
  //             throw err;
  //           }
  //         }).catch(err => {
  //           console.log('error is: ' + err);
  //         });
  //       }
  //     }
  //   }
  // };

  async function requestPermission() {
    try {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]).then((result) => {});
      }
    } catch (err) {
      console.warn(err);
    }
  }
  return (
    <Design
      slidesEng={slidesEng}
      slidesArb={slidesArb}
      renderItem={renderItem}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showRealApp={showRealApp}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    UserLogin: state.user.SaveAllData.UserLogin,
    stringsListEnglish: state.user.SaveAllData.stringsListEnglish,
    stringsListArabic: state.user.SaveAllData.stringsListArabic,
    StringsList: state.user.SaveAllData.StringsList,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
