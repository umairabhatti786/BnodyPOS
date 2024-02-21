import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUniqueId, getMacAddress } from "react-native-device-info";
import { sha1 } from "react-native-sha1";
import base64 from "react-native-base64";
import * as RNLocalize from "react-native-localize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  I18nManager,
  PermissionsAndroid,
  BackHandler,
  Platform,
} from "react-native";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

import {
  ServerCall,
  SaveAllData,
} from "../../redux/actions/asynchronousAction";

import Design from "./design";
import errorMessages from "../../constant/errorMessages";

import DBTable from "../../constant/UpdateDB";

const LoginScreen = (props) => {
  const netInfo = useNetInfo();
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [deviceUniqueId, setDeviceUniqueId] = useState("");
  const [languageTag, setlanguageTag] = useState("");
  const [isPromptAlert, setisPromptAlert] = useState(false);
  const [terminalCode, setTerminalCode] = useState();
  const [values, setvalues] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [networkState, setNetworkState] = useState(true);
  const [isPrivacy, setIsPrivacy] = useState(true);

  const visiblePassword = () => {
    setVisiblePassword(!isVisiblePassword);
  };

  useEffect(() => {
    if (!isPromptAlert) {
      setLoading(false);
    }
  }, [isPromptAlert]);

  const onClickSignin = async (values) => {
    setLoading(true);
    let code, msg, msg1;

    let loginUser = await AsyncStorage.getItem("LOGIN_USER_INFO");
    loginUser = JSON.parse(loginUser);

    msg1 = errorMessages.GetLoginMessage(-23, props.StringsList);

    let accessToken, loginUserInfo;

    sha1(values.password).then(async (hash) => {
      loginUserInfo = {
        UserName: values.userName,
        Password: hash,
        TerminalID: terminalCode,
        TerminalGUID: deviceUniqueId,
        // dbId: 0,
      };

      // let str =
      //   values.userName + ':' + hash + ':' + deviceUniqueId + ':' + languageTag;
      // accessToken = base64.encode(str);
      let net = false;
      if (
        values.userName.trim() === loginUser?.UserName.trim() &&
        hash === loginUser?.Password &&
        net
      ) {
        console.log("user Match");
        props.navigation.replace("Main");
        // await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
      } else {
        console.log("loginUserInfo....", loginUserInfo);
        const response = await props.dispatch(
          ServerCall("", "AuthorizeUser/SignIn", "POST", loginUserInfo)
        );

        if (!response[0]) {
          setLoading(false);
          msg = errorMessages.GetLoginMessage(15, props.StringsList);
          setMessage(msg);
          setDisplayAlert(true);
        } else {
          console.log("login response ......split", response);
          code =
            response[0] === "0" ? response[0] : String(response).split(",");
          accessToken = String(response).substring(12);

          console.log("accessToken =======>", accessToken);

          // console.log("login response ......split", response.length, code, msg)
          msg = errorMessages.GetLoginMessage(code[0], props.StringsList);
          ////////
          // console.log("login response ......split", response[2])
          code = String(response).split(",");
          // console.log("login response ......split", response.length, code, msg)
          msg = errorMessages.GetLoginMessage(code[0], props.StringsList);
          loginUserInfo.dbId = code[1];
          // console.log(
          //   "login response split",
          //   loginUser?.dbId && loginUser?.dbId !== code[1] && isBillNeedPost
          // );
          loginUserInfo.dbId = code[1];
          if (code[0] === "0") {
            setLoading(true);

            if (loginUser?.dbId && loginUser?.dbId !== code[1]) {
              const res = await props.dispatch(
                ServerCall("", "AuthorizeUser/SignIn", "POST", loginUserInfo)
              );
              setMessage(msg1);
              setDisplayAlert(true);
            } else if (loginUser?.dbId !== code[0]) {
              await DBTable.AddDataInDb(props, "", accessToken, loginUserInfo);
            } else {
              await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
              await AsyncStorage.setItem(
                "LOGIN_USER_INFO",
                JSON.stringify(loginUserInfo)
              );
              props.navigation.replace("Main");
            }
            setLoading(false);
          }
          if (msg) {
            if (code[0] === "6") {
              setvalues(values);
              setisPromptAlert(true);
              setDisplayAlert(true);
              //  await AsyncStorage.removeItem('LOGIN_USER_INFO');
            } else if (code[0] !== "0") {
              setLoading(false);
              setMessage(msg);
              setDisplayAlert(true);
              setTerminalCode();
            }
          }
        }
      }
      // if (!response.success) {
      //   alert("network error")
      // }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      initFunc();
    }, 1000);
  }, []);

  const initFunc = async () => {
    try {
      if (Platform.OS === "android") {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.VIBRATE
        );
      }

      console.log("login useEffect");
      let acceptPrivacy = await AsyncStorage.getItem(
        "ACCEPT_PRIVACY",
        (err) => {
          if (err) {
            console.log("an error");
            throw err;
          }
          console.log("success");
        }
      ).catch((err) => {
        console.log("error is: " + err);
      });
      acceptPrivacy = JSON.parse(acceptPrivacy);
      let isPrivacy = acceptPrivacy === true ? true : false;
      setIsPrivacy(isPrivacy);
      console.log("acceptPrivacy status ====>", isPrivacy);

      let loginUserInfo = await AsyncStorage.getItem("LOGIN_USER_INFO");
      loginUserInfo = JSON.parse(loginUserInfo);
      console.log("LOGIN_USER_INFO", loginUserInfo);

      let uniq = getUniqueId();

      setDeviceUniqueId(uniq);
      var localeInfo = RNLocalize.getLocales();
      var languageTag = localeInfo[0].languageTag;
      setlanguageTag(languageTag);
      if (!isPrivacy) {
      }
    } catch (e) {
      console.log("Error ===>", e);
    }
  };
  const onAcceptPrivacy = () => {
    setIsPrivacy(true);
    AsyncStorage.setItem("ACCEPT_PRIVACY", "true", (err) => {
      if (err) {
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err) => {
      console.log("error is: " + err);
    });
  };
  const onRejectPrivacy = () => {
    BackHandler.exitApp();
  };

  const onChangeText = (type, text) => {
    console.log("setTerminalCode", text);
    setTerminalCode(text);
  };
  const reacallLoginApi = () => {
    onClickSignin(values);
  };
  return (
    <Design
      isVisiblePassword={isVisiblePassword}
      visiblePassword={visiblePassword}
      onClickSignin={onClickSignin}
      isLoading={isLoading}
      message={message}
      displayAlert={displayAlert}
      setDisplayAlert={setDisplayAlert}
      setisPromptAlert={setisPromptAlert}
      isPromptAlert={isPromptAlert}
      onChangeText={onChangeText}
      terminalCode={terminalCode}
      reacallLoginApi={reacallLoginApi}
      StringsList={props.StringsList}
      placeholderText={"Please enter Terminal code"}
      isPrivacy={isPrivacy}
      onAcceptPrivacy={onAcceptPrivacy}
      onRejectPrivacy={onRejectPrivacy}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
