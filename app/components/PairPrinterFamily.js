import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import { reach } from 'yup';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import { CheckBoxCustom } from './CheckBoxCustom';
import CustomButton from './CustomButton';
import CustomDropDown from './CustomDropDown';
import { CustomMenu } from './CustomMenu';

const PairPrinterFamily = ({
  displayAlert,
  isPromptAlert,
  terminalCode,
  StringsList,
  onPressCancel,
}) => {
  const [pairPrinterFamily, setPairPrinterFamily] = useState([
    {
      productFamilyName: 'Product Family Name',
      printerFamilyName: 'Printer Family Name',
      printerName: 'Printer Name',
    },
    {
      productFamilyName: 'Product Family Name',
      printerFamilyName: 'Printer Family Name',
      printerName: 'Printer Name',
    },
    {
      productFamilyName: 'Product Family Name',
      printerFamilyName: 'Printer Family Name',
      printerName: 'Printer Name',
    },
    {
      productFamilyName: 'Product Family Name',
      printerFamilyName: 'Printer Family Name',
      printerName: 'Printer Name',
    },
    {
      productFamilyName: 'Product Family Name',
      printerFamilyName: 'Printer Family Name',
      printerName: 'Printer Name',
    },
    {
      productFamilyName: 'Product Family Name',
      printerFamilyName: 'Printer Family Name',
      printerName: 'Printer Name',
    },
    {
      productFamilyName: 'Product Family Name',
      printerFamilyName: 'Printer Family Name',
      printerName: 'Printer Name',
    },
  ]);

  return (
    <Modal visible={displayAlert} transparent={true} animationType={'fade'}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
        }}>
        <View
          style={{
            backgroundColor: AppColor.black,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
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
            {StringsList._118}
          </Text>

          <TouchableOpacity onPress={onPressCancel}>
            <Icon
              name={'close'}
              size={sizeHelper.calWp(35)}
              color={AppColor.white}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '90%',
            backgroundColor: AppColor.white,
            paddingVertical: sizeHelper.calHp(20),
            // justifyContent: 'center',
            // alignItems: 'center',
            borderBottomLeftRadius: sizeHelper.calHp(10),
            borderBottomRightRadius: sizeHelper.calHp(10),
            paddingHorizontal: sizeHelper.calWp(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: AppColor.blue1,
              paddingVertical: sizeHelper.calHp(20),
              paddingStart: sizeHelper.calWp(8),
            }}>
            <Text
              style={{
                width: '40%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
              }}>
              {StringsList._120}
            </Text>
            <Text
              style={{
                width: '38%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
              }}>
              {StringsList._122}
            </Text>
            <Text
              style={{
                width: '22%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
              }}>
              {StringsList._123}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: sizeHelper.calHp(400),
            }}>
            {pairPrinterFamily.map(item => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '0.5%',
                        height: '100%',
                        backgroundColor: AppColor.white1,
                        zIndex: 0,
                      }}
                    />
                    <Text
                      style={{
                        width: '38%',
                        fontSize: sizeHelper.calHp(20),
                        marginVertical: sizeHelper.calHp(20),
                        marginHorizontal: '0.5%',
                        color: AppColor.black,
                        fontFamily: 'Proxima Nova Bold',
                      }}>
                      {item.productFamilyName}
                    </Text>
                    <View
                      style={{
                        width: '0.5%',
                        height: '100%',
                        backgroundColor: AppColor.white1,
                        zIndex: 0,
                      }}
                    />
                    <Text
                      style={{
                        width: '36.5%',
                        marginHorizontal: '0.5%',
                        marginVertical: sizeHelper.calHp(20),
                        fontSize: sizeHelper.calHp(20),
                        color: AppColor.black,
                        fontFamily: 'Proxima Nova Bold',
                      }}>
                      {item.printerFamilyName}
                    </Text>
                    <View
                      style={{
                        width: '0.5%',
                        height: '100%',
                        backgroundColor: AppColor.white1,
                        zIndex: 0,
                      }}
                    />
                    <Text
                      style={{
                        width: '20.5%',
                        marginHorizontal: '0.5%',
                        marginVertical: sizeHelper.calHp(20),
                        fontSize: sizeHelper.calHp(20),
                        color: AppColor.black,
                        fontFamily: 'Proxima Nova Bold',
                      }}>
                      {item.printerName}
                    </Text>
                    <View
                      style={{
                        width: '0.5%',
                        height: '100%',
                        backgroundColor: AppColor.white1,
                        zIndex: 0,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 3,
                      backgroundColor: AppColor.white1,
                      zIndex: 0,
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingVertical: sizeHelper.calHp(10),
            }}>
            <CustomButton
              containerStyle={{
                height: sizeHelper.calWp(40),
                width: sizeHelper.calWp(120),
                marginTop: sizeHelper.calHp(25),
              }}
              backgroundColor={AppColor.blue2}
              isDisabled={isPromptAlert && !terminalCode}
              title={props.StringsList._1}
              titleColor={AppColor.white}
              onPressButton={() => { }}
            />
            <CustomButton
              containerStyle={{
                height: sizeHelper.calWp(40),
                width: sizeHelper.calWp(120),
                marginTop: sizeHelper.calHp(25),
                marginStart: sizeHelper.calHp(25),
                backgroundColor: AppColor.red1,
              }}
              backgroundColor={AppColor.red1}
              isDisabled={isPromptAlert && !terminalCode}
              title={props.StringsList._2}
              titleColor={AppColor.white}
              onPressButton={onPressCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PairPrinterFamily);
