import {
  View,
  ImageBackground,
  SafeAreaView,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import CustomText from "../../components/CustomText";
import { colors } from "../../utils/colors";
import Button from "../../components/Button";
import { SFCompact } from "../../utils/Fonts";
import { CrossIcon } from "../../assets/SVG/svg";
import Loading from "../../components/Loading";

import { Delete_Request } from "../../api/Requests";
import Toast from "react-native-root-toast";
const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("@token");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
      await AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };
  const onDeleteAccount = async () => {
    setLoading(true);
    try {
      let token = await AsyncStorage.getItem("@token");
      let loginType = await AsyncStorage.getItem("LOGIN_TYPE");

      const body = {
        sso_token: token,
        login_type: loginType,
      };

      const url = "https://assemble-backend.onrender.com/api/oauth/delete";

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
      await AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(() => {
          Toast.show("Account deleted successfully");
          navigation.navigation("Login");
          setLoading(false);
        });
      // Handle success and navigation logic here
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Handle error logic here
    }
  };

  // const onDeleteAccount = async () => {
  //   setLoading(true);
  //   try {
  //     let token = await AsyncStorage.getItem("@token");
  //     let loginType = await AsyncStorage.getItem("LOGIN_TYPE");
  //     let  body = {
  //       sso_token: token,
  //       login_type: loginType,
  //     };
  //     console.log(loginType, token, queryParams);
  //     const response = await Delete_Request(queryParams);
  //     console.log(response);
  //     setLoading(false);
  //     // Handle success and navigation logic here
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     // Handle error logic here
  //   }
  // };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const openEmailApp = () => {
    const email = "info@assemble.fun";

    Linking.openURL(`mailto:${email}`)
      .then(() => console.log("Email app opened"))
      .catch((err) => console.error("Error opening email app:", err));
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleGoBack}
          style={styles.iconContainer}
        >
          <CrossIcon
            onPress={handleGoBack}
            style={styles.icon}
            fill={colors.black}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <CustomText
            color={"transparent"}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="assemble"
          />
        </View>
        <View style={styles.transparent}>
          <CrossIcon style={styles.icon} fill="transparent" />
        </View>
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={commonStyles.main}>
          <ImageBackground style={styles.main} source={images.background}>
            <Header />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                top: sizeHelper.screenWidth > 450 ? "15%" : "20%",
              }}
            >
              <View style={{ margin: 20 }}>
                <CustomText
                  label="Settings"
                  color={colors.black}
                  fontSize={24}
                  fontWeight={"bold"}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <>
                  <Button
                    text={"DELETE ACCOUNT"}
                    color={colors.black}
                    fontSize={17}
                    height={65}
                    width={"70%"}
                    fontWeight={"600"}
                    backgroundColor={colors.white}
                    borderRadius={100}
                    margin={20}
                    fontFamily={SFCompact.semiBold}
                    onPress={onDeleteAccount}
                  />
                </>
                <>
                  <Button
                    text={"CONTACT"}
                    color={colors.black}
                    fontSize={17}
                    height={65}
                    width={"70%"}
                    fontWeight={"600"}
                    backgroundColor={colors.white}
                    borderRadius={100}
                    margin={20}
                    fontFamily={SFCompact.semiBold}
                    onPress={openEmailApp}
                  />
                </>
                <>
                  <Button
                    text={"LOGOUT"}
                    color={colors.black}
                    fontSize={17}
                    height={65}
                    width={"70%"}
                    fontWeight={"600"}
                    backgroundColor={colors.white}
                    borderRadius={100}
                    margin={20}
                    fontFamily={SFCompact.semiBold}
                    onPress={logout}
                  />
                </>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default SettingsScreen;
