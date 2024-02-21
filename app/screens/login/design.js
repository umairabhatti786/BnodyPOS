import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  I18nManager,
  ActivityIndicator,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";

import { Formik } from "formik";
import * as yup from "yup";

import styles from "./style";
import LoginShape from "../../assets/svg/loginShape.svg";
import BnodyLogo from "../../assets/svg/bnodyLogoBlue.svg";
import sizeHelper from "../../helpers/sizeHelper";
import AppColor from "../../constant/AppColor";

import Loader from "../../components/Loader";
import AlertModel from "../../components/AlertModel";
import PrivacyPolicy from "../../components/PrivacyPolicy";

const Design = ({
  isVisiblePassword,
  visiblePassword,
  onClickSignin,
  isLoading,
  setDisplayAlert,
  displayAlert,
  message,
  setisPromptAlert,
  isPromptAlert,
  terminalCode,
  onChangeText,
  reacallLoginApi,
  StringsList,
  isPrivacy,
  onAcceptPrivacy,
  onRejectPrivacy,
}) => {
  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required("Name is required"),
    password: yup
      .string()
      .min(6, ({ min }) => "Password must be at least of 6 characters")
      .required("Password is required"),
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../../assets/images/splashBg.png")}
          style={styles.loginContainer}
        >
          <StatusBar hidden />

          <KeyboardAvoidingView
            behavior="position"
            style={{ flex: 0.5, justifyContent: "center" }}
          >
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: AppColor.white,
                padding: 15,
                borderRadius: 5,
              }}
            >
              <BnodyLogo
                width={sizeHelper.calWp(150)}
                height={sizeHelper.calHp(69)}
              />
              <Text style={styles.signinText}>
                {I18nManager.isRTL ? StringsList._464 : "Login to your Account"}
              </Text>

              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  userName: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  onClickSignin(values);
                }}
              >
                {({ handleChange, handleSubmit, values, errors, isValid }) => (
                  <View>
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          borderColor: errors.userName
                            ? AppColor.orange
                            : AppColor.gray1,
                        },
                      ]}
                    >
                      <Icon
                        name={"user"}
                        size={sizeHelper.calWp(30)}
                        color={AppColor.orange}
                      />

                      <TextInput
                        editable={!isLoading}
                        name={"userName"}
                        onChangeText={handleChange("userName")}
                        style={styles.inputField}
                        placeholder={
                          I18nManager.isRTL
                            ? StringsList._209
                            : "Enter username"
                        }
                        value={values.userName}
                        error={errors.userName}
                      />
                    </View>
                    {errors.userName && (
                      <Text style={styles.errorText}>{errors.userName}</Text>
                    )}
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          marginTop: sizeHelper.calHp(33),
                          borderColor: errors.password
                            ? AppColor.orange
                            : AppColor.gray1,
                        },
                      ]}
                    >
                      <Icon
                        name={"lock"}
                        size={sizeHelper.calWp(30)}
                        color={AppColor.orange}
                      />
                      <TextInput
                        editable={!isLoading}
                        name={"password"}
                        onChangeText={handleChange("password")}
                        secureTextEntry={!isVisiblePassword}
                        style={styles.inputField}
                        error={errors.password}
                        placeholder={
                          I18nManager.isRTL
                            ? StringsList._210
                            : "Enter password"
                        }
                        value={values.password}
                      />
                      <TouchableOpacity
                        style={{
                          height: sizeHelper.calHp(64),
                          justifyContent: "center",
                          alignItems: "center",
                          width: sizeHelper.calWp(45),
                        }}
                        onPress={visiblePassword}
                      >
                        <Icon
                          name={isVisiblePassword ? "eye" : "eye-slash"}
                          size={sizeHelper.calWp(21)}
                          color={
                            isVisiblePassword
                              ? AppColor.black
                              : AppColor.grayColor
                          }
                          style={{ marginRight: 10 }}
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TouchableOpacity
                      disabled={isLoading}
                      onPress={() => {
                        handleSubmit();
                        Keyboard.dismiss();
                      }}
                      style={styles.signinButtonContainer}
                    >
                      {isLoading ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Loader />
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.buttonText}>
                            {I18nManager.isRTL ? "تسجيل الدخول" : "Sign in"}
                          </Text>
                          <Icon
                            name={
                              I18nManager.isRTL
                                ? "chevron-left"
                                : "chevron-right"
                            }
                            size={sizeHelper.calWp(18)}
                            color={AppColor.white}
                            style={{
                              top: Platform.OS === "ios" ? 2 : 0,
                              left: 4,
                            }}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
          {!isPrivacy && (
            <View style={styles.popupContainer}>
              <PrivacyPolicy
                StringsList={StringsList}
                onAcceptPrivacy={onAcceptPrivacy}
                onPressCancel={onRejectPrivacy}
              />
            </View>
          )}

          <AlertModel
            displayAlert={displayAlert}
            onAlertShow={setDisplayAlert}
            setisPromptAlert={setisPromptAlert}
            isPromptAlert={isPromptAlert}
            message={message}
            value={terminalCode}
            placeholderText={"Please Enter terminal code"}
            onChangeText={onChangeText}
            reacallFunc={reacallLoginApi}
          />
          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              right: 20,
              bottom: 20,
              position: 'absolute',
            }}>
            <Text
              style={{
                fontFamily: 'ProximaNova-Regular',
                fontSize: sizeHelper.calWp(22),
                color: AppColor.white,
              }}>
              Version : 2.0.1
            </Text>
          </View> */}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};
export default Design;
