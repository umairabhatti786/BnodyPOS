import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

import {reach} from 'yup';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import {CheckBoxCustom} from './CheckBoxCustom';
import CustomButton from './CustomButton';
import CustomDropDown from './CustomDropDown';
import {CustomMenu} from './CustomMenu';
import {getData} from '../sqliteHelper';
import {HoldInvoiceTable} from '../sqliteTables/HoldInvoice';
import Loading from './Loading';

const BillingType = ({
  displayAlert,
  onPressCancel,
  reacallFunc,
  data,
  StringsList,
  isLoading,
  selectBillingType,
  type,
}) => {
  console.log('Billing type......', data);
  return (
    <Modal
      visible={displayAlert}
      transparent={true}
      animationType={'fade'}
      zIndex={0}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // borderRadius: 25,
        }}>
        <View
          style={{
            backgroundColor: AppColor.blue1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '70%',
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
            {type === 'bill' ? StringsList._334 : StringsList._174}
          </Text>

          {/* <TouchableOpacity onPress={onPressCancel}>
            <Icon
              name={'close'}
              size={sizeHelper.calWp(35)}
              color={AppColor.white}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            width: '70%',
            backgroundColor: AppColor.white,
            paddingVertical: sizeHelper.calHp(20),
            // justifyContent: 'center',
            // alignItems: 'center',
            borderBottomLeftRadius: sizeHelper.calHp(10),
            borderBottomRightRadius: sizeHelper.calHp(10),
            paddingHorizontal: sizeHelper.calWp(20),
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: sizeHelper.calHp(325),
              // backgroundColor: "green"
            }}>
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.SalesBillDetailsID}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: item.isSelected
                        ? AppColor.green
                        : AppColor.white1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                    onPress={() => {
                      selectBillingType(item);
                      //  onPressCancel()
                    }}>
                    <Text
                      style={{
                        // width: '98%',
                        fontSize: sizeHelper.calHp(25),
                        marginVertical: sizeHelper.calHp(20),
                        marginHorizontal: '0.5%',
                        color: item.isSelected
                          ? AppColor.green
                          : AppColor.black,
                        alignSelf: 'center',
                        fontFamily: 'Proxima Nova Bold',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: sizeHelper.calHp(20),
                  marginVertical: sizeHelper.calHp(20),
                  marginHorizontal: '0.5%',
                  color: AppColor.black,
                  fontFamily: 'Proxima Nova Bold',
                }}>
                No Record Found!
              </Text>
            )}
          </ScrollView>
          <View style={{zIndex: 0}}>
            <CustomButton //cancel
              containerStyle={[
                {
                  alignSelf: 'flex-end',
                  height: sizeHelper.calWp(60),
                  width: sizeHelper.calWp(166.66),

                  marginTop: sizeHelper.calHp(10),
                },
              ]}
              title={type === 'dashboard' ? StringsList._1 : StringsList._1}
              backgroundColor={AppColor.blue2}
              onPressButton={() =>
                type === 'dashboard'
                  ? reacallFunc('billingType')
                  : reacallFunc('saleBilType')
              }
            />
          </View>
        </View>
      </View>
      {isLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColor.popUpBackgroundColor,
            zIndex: 9999,
          }}>
          <Loading />
        </View>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(BillingType);
