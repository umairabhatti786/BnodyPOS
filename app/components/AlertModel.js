import React from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {reach} from 'yup';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import CustomButton from './CustomButton';

const AlertModel = ({
  onAlertShow,
  displayAlert,
  message,
  isPromptAlert,
  setisPromptAlert,
  onChangeText,
  value,
  isConfirmation,
  reacallFunc,
  placeholderText,
  type,
}) => {
  // console.log('value alert', value, isPromptAlert, value === 'undefined');
  return (
    <Modal visible={displayAlert} transparent={true} animationType={'fade'}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
          backgroundColor: AppColor.popUpBackgroundColor,
        }}>
        <View
          style={{
            backgroundColor: AppColor.blue1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '75%',
            padding: sizeHelper.calWp(15),
            borderTopRightRadius: sizeHelper.calHp(10),
            borderTopLeftRadius: sizeHelper.calHp(10),
          }}>
          <Text
            style={{
              fontSize: sizeHelper.calHp(25),
              color: AppColor.white,
              fontFamily: 'Proxima Nova Bold',
            }}>
            {I18nManager.isRTL ? 'تطبيق بنودي' : 'Bnody App'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onAlertShow(false);
              setisPromptAlert(false);
            }}>
            <Icon
              name={'close'}
              size={sizeHelper.calWp(35)}
              color={AppColor.white}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '75%',
            backgroundColor: 'white',
            paddingVertical: sizeHelper.calHp(60),
            paddingHorizontal: sizeHelper.calWp(25),
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: sizeHelper.calHp(10),
            borderBottomRightRadius: sizeHelper.calHp(10),
          }}>
          {!isPromptAlert ? (
            <Text
              style={{
                fontSize: sizeHelper.calHp(20),
                color: AppColor.black,
                textAlign: 'center',

                fontFamily: 'Proxima Nova Bold',
              }}>
              {message}
            </Text>
          ) : (
            <TextInput
              style={{
                textAlignVertical: 'center',
                padding: 0,
                paddingStart: sizeHelper.calWp(18),
                width: sizeHelper.calWp(510),
                marginEnd: sizeHelper.calWp(10),
                height: sizeHelper.calHp(60),
                backgroundColor: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
                fontSize: sizeHelper.calHp(20),
                color: AppColor.black,
                // textAlign: I18nManager.isRTL ? 'right' : 'left',
                borderColor: AppColor.gray2,
                borderWidth: 1,
                borderRadius: sizeHelper.calWp(10),
              }}
              onChangeText={text => onChangeText(type, text)}
              placeholder={placeholderText}
              value={value}
            />
          )}
          <CustomButton
            containerStyle={{
              height: sizeHelper.calWp(40),
              width: sizeHelper.calWp(100),
              marginTop: sizeHelper.calHp(25),
            }}
            isDisabled={isPromptAlert && !value}
            title={I18nManager.isRTL ? 'موافق' : 'OK'}
            backgroundColor={AppColor.blue2}
            titleColor={AppColor.white}
            onPressButton={() => {
              if (isPromptAlert || isConfirmation) {
                console.log('on confirmation');
                reacallFunc(type);
              }
              onAlertShow(false);
              setisPromptAlert(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default AlertModel;
