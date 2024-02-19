import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScopedStorage from "react-native-scoped-storage";
import Toast from "react-native-root-toast";
import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  I18nManager,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  NativeModules,
  Platform,
  NativeEventEmitter,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import RNFS from "react-native-fs";
import { SaveAllData } from "../../redux/actions/asynchronousAction";
import { getData } from "../../sqliteHelper";
import Design from "./design";
import sizeHelper from "../../helpers/sizeHelper";
import styles from "./style";
import AppColor from "../../constant/AppColor";
import { StringsListTable } from "../../sqliteTables/StringsList";

const SplashScreen = (props) => {
  // const createFile = NativeModules.PermissionFile;
  // const PermissionFile = NativeModules.PrinterNativeModule;
  // const eventEmitter = new NativeEventEmitter(PermissionFile);
  // const eventEmitter = new NativeEventEmitter(NativeModules.PrinterNativeModule);
  const { navigation } = props;
  const [loading, setloading] = useState(true);
  const [showRealApp, setRealApp] = useState(false);

  // useEffect(() => {
  //   // Check if the platform is Android
  //   if (Platform.OS === "android") {
  //     // Access the Android version
  //     const osVersion = Platform.constants.Release;

  //     // Check if the Android version is 10 or above
  //     if (osVersion >= 10) {
  //       // Add a listener for the "DeviceFound" event
  //       const newDevice = eventEmitter.addListener(
  //         "DeviceFound",
  //         async (deviceDiscovered) => {
  //           try {
  //             // Store the URI in AsyncStorage
  //             await AsyncStorage.setItem("FILE_URI", deviceDiscovered);
  //             console.log("Device discovered URI:", deviceDiscovered);
  //           } catch (error) {
  //             console.error("Error storing URI in AsyncStorage:", error);
  //           }
  //         }
  //       );

  //       // Remove the listener when the component unmounts
  //       return () => newDevice.remove();
  //     }
  //   }
  // }, []);

  useEffect(async () => {
    if (Platform.OS === "android") {
      try {
        const folderPath = "/storage/emulated/0/Documents/Bnody POS";
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
              "Bnody POS"
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
        const folderName = "Bnody POS";
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
  // useEffect(async () => {
  //   try {
  //     if (Platform.OS === "android") {
  //       const OsVer = Platform.constants["Release"];
  //       if (OsVer >= 11) {
  //         let path = "/storage/emulated/0/Documents/Bnody POS/Invoices.txt";
  //         if (await RNFS.exists(path)) {
  //         } else {
  //           createFile.overWriteAbove29(
  //             "",
  //             (err) => {
  //               if (err) {
  //                 console.log("Permission Error", err);
  //               }
  //             },
  //             (success) => {
  //               if (success) {
  //                 console.log("Folder created with empty file", success);
  //               }
  //             }
  //           );
  //         }
  //       } else {
  //         let path = "/storage/emulated/0/Downloads/Bnody POS/Invoices.txt";
  //         if (await RNFS.exists(path)) {
  //         } else {
  //           createFile.overWriteAPI29(
  //             "",
  //             (err) => {
  //               if (err) {
  //                 console.log("Permission Error", err);
  //               }
  //             },
  //             (success) => {
  //               if (success) {
  //                 console.log("Folder created with empty file", success);
  //               }
  //             }
  //           );
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error creating", error);
  //   }
  // }, []);
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
  useEffect(() => {
    fetdatafunction();
  }, [showRealApp]);

  // const checkDirectory = async () => {
  //   let path = '/storage/emulated/0/Documents/Bnody POS/Invoices.txt';
  //   if (await RNFS.exists(path)) {
  //     console.log('RNFS.exists(path):', RNFS.exists(path));
  //   } else {
  //     createNativeF.overWrite(
  //       '',
  //       err => {
  //         if (err) {
  //           console.log('Permission Error', err);
  //         }
  //       },
  //       success => {
  //         if (success) {
  //           // You can use RN-fetch-blog to download files and storge into download Manager
  //           console.log('Folder created with empty file', success);
  //           RNFS.unlink(path);
  //         }
  //       },
  //     );
  //   }
  // };

  // const accessFiles = async () => {
  //   if (Platform.OS === "android") {
  //     const OsVer = Platform.constants["Release"];
  //     if (OsVer >= 10) {
  //       var val = await AsyncStorage.getItem("IS_FOLDER_CREATED");
  //       console.log("IS_FOLDER_CREATED", val);
  //       if (val == "true") {
  //       } else {
  //         PermissionFile.readFolder();
  //         AsyncStorage.setItem("IS_FOLDER_CREATED", "true", (err) => {
  //           if (err) {
  //             console.log("an error");
  //             throw err;
  //           }
  //         }).catch((err) => {
  //           console.log("error is: " + err);
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

  const slides = [
    {
      key: 1,
      title: "",
      text: "",
      image: require("../../assets/images/ad1.jpg"),
      backgroundColor: "transparent",
    },

    {
      key: 2,
      title: "",
      text: "",
      image: require("../../assets/images/ad2.jpg"),
      backgroundColor: "transparent",
    },
    {
      key: 3,
      title: "",
      text: "",
      image: require("../../assets/images/ad3.jpg"),
      backgroundColor: "transparent",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
        }}
      >
        <Image
          source={item.image}
          // resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
        <Text style={styles.text}>{item.text}</Text>
        <TouchableOpacity
          style={{
            width: 60,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: Platform.OS === "ios" ? 55 : 35,
            start: sizeHelper.screenWidth > 450 ? 40 : 15,
            // backgroundColor: "red",
          }}
          onPress={() => onDone()}
        >
          <Text
            style={{
              fontFamily: "ProximaNova-Regular",
              color: AppColor.white,
              fontSize: sizeHelper.calHp(30),
            }}
          >
            Skip
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

  const getAppInfo = async () => {
    // console.log('getAppInfo');
    const val = await AsyncStorage.getItem("MY_REAL_APP");
    const realAPPTrue = JSON.parse(val);
    if (realAPPTrue == true) {
      setRealApp(true);
    } else {
      setRealApp(false);
    }
  };

  const moveToLogin = () => {
    navigation.navigate("login");
    setloading(false);
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name={I18nManager.isRTL ? "chevron-left" : "chevron-right"}
          color="rgba(255, 255, 255, .9)"
          size={15}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => onDone()} style={styles.buttonCircle}>
        <Icon name="check" color="rgba(255, 255, 255, .9)" size={15} />
      </TouchableOpacity>
    );
  };

  const loadData = async (UserLogin) => {
    // console.log('loadData');
    if (UserLogin) {
      getData(StringsListTable, async (cb) => {
        let stringsListEnglish = cb[0]?.StringsListOject
          ? JSON.parse(cb[0]?.StringsListOject)
          : "";
        let stringsListArabic = cb[1]?.StringsListOject
          ? JSON.parse(cb[1]?.StringsListOject)
          : "";
        // console.log("StringsListTable...", stringsListEnglish);
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

  return (
    <Design
      slides={slides}
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
