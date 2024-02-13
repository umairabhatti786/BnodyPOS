import React from 'react';
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
} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18n-js';
import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './style';
import LoginShape from '../../assets/svg/loginShape.svg';
import BnodyLogo from '../../assets/svg/bnodyLogo.svg';
import sizeHelper from '../../helpers/sizeHelper';
import appColor from '../../constant/AppColor';

import Loading from '../../components/Loading';
import AlertModel from '../../components/AlertModel';
import PrivacyPolicy from '../../components/PrivacyPolicy';

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
    userName: yup
      .string()
      .required('Name is required'),
    password: yup
      .string()
      .min(6, ({ min }) => 'Password must be at least of 6 characters')
      .required('Password is required'),
  });

  return (
    // console.log('props CardSetupParent', props.CardSetupParent),
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.loginContainer}>
        <StatusBar hidden />
        <View
          style={{
            alignSelf: 'flex-end',
            width: sizeHelper.calWp(363),
            height: sizeHelper.calWp(449),
            alignItems: 'flex-end',
            // flexWrap: 'wrap',

            transform: [
              I18nManager.isRTL ? { rotateY: '180deg' } : { rotate: '0deg' },
            ],
          }}>
          <LoginShape width={'100%'} height={'100%'} />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          style={{ flex: 0.7, justifyContent: 'center' }}>
          <View style={{ alignSelf: 'center', justifyContent: "center", alignItems: "center", }}>
            <BnodyLogo
              width={sizeHelper.calWp(150)}
              height={sizeHelper.calHp(69)}
            />
            <Text style={styles.signinText}>
              {I18nManager.isRTL
                ? 'تسجيل الدخول إلى حسابك'
                : 'Sign in to your account'}
            </Text>
          </View>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              userName: '',
              password: '',
            }}
            onSubmit={values => {
              onClickSignin(values);
            }}>
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <View>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: errors.userName
                        ? appColor.orange
                        : 'transparent',
                      borderWidth: errors.userName ? 1 : 0,
                    },
                  ]}>
                  <Icon
                    name={'user'}
                    size={sizeHelper.calWp(21)}
                    color={appColor.black}
                  />

                  <TextInput
                    editable={!isLoading}
                    name={'userName'}
                    onChangeText={handleChange('userName')}
                    style={styles.inputField}
                    placeholder={
                      I18nManager.isRTL ? 'اسم االمستخدم' : 'User Name'
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
                        ? appColor.orange
                        : 'transparent',
                      borderWidth: errors.password ? 1 : 0,
                    },
                  ]}>
                  <Icon
                    name={'lock'}
                    size={sizeHelper.calWp(21)}
                    color={appColor.black}
                  />
                  <TextInput
                    editable={!isLoading}
                    name={'password'}
                    onChangeText={handleChange('password')}
                    secureTextEntry={!isVisiblePassword}
                    style={styles.inputField}
                    error={errors.password}
                    placeholder={I18nManager.isRTL ? 'كلمه السر' : 'Password'}
                    value={values.password}
                  />
                  <TouchableOpacity
                    style={{
                      height: sizeHelper.calHp(64),
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: sizeHelper.calWp(45),
                    }}
                    onPress={visiblePassword}>
                    <Icon
                      name={isVisiblePassword ? 'eye' : 'eye-slash'}
                      size={sizeHelper.calWp(21)}
                      color={
                        isVisiblePassword ? appColor.black : appColor.grayColor
                      }
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
                  style={styles.signinButtonContainer}>
                  {isLoading ? (
                    <View
                      style={{
                        flexDirection: 'row',

                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Loading />
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',

                        alignItems: 'center',
                      }}>
                      <Text style={styles.buttonText}>
                        {I18nManager.isRTL ? 'تسجيل الدخول' : 'Sign in'}
                      </Text>
                      <Icon
                        name={
                          I18nManager.isRTL ? 'chevron-left' : 'chevron-right'
                        }
                        size={sizeHelper.calWp(18)}
                        color={appColor.white}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
        {
          !isPrivacy && (
            <View style={styles.popupContainer}>
              <PrivacyPolicy
                StringsList={StringsList}
                onAcceptPrivacy={onAcceptPrivacy}
                onPressCancel={onRejectPrivacy}
              />
            </View>
          )
        }

        <AlertModel
          displayAlert={displayAlert}
          onAlertShow={setDisplayAlert}
          setisPromptAlert={setisPromptAlert}
          isPromptAlert={isPromptAlert}
          message={message}
          value={terminalCode}
          placeholderText={'Please Enter terminal code'}
          onChangeText={onChangeText}
          reacallFunc={reacallLoginApi}
        />

      </View>
    </TouchableWithoutFeedback>
  );
};

export default Design;
