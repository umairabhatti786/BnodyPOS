import React, {useEffect, useState} from 'react';
import {View, Modal, Text, TextInput, I18nManager} from 'react-native';

import {connect} from 'react-redux';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import CustomButton from './CustomButton';
import styles from '../screens/login/style';

const CashPaidPopUp = ({
  displayAlert,
  reacallFunc,
  StringsList,
  cashAmount,
  setCashAmount,
  netAmount,
  setIsPaidCash,
}) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  console.log('CashPaidPopUp prop......', netAmount);
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
          borderRadius: 25,
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
            {StringsList._15}
          </Text>
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
            fontFamily: 'Proxima Nova Semibold',
          }}>
          <Text
            style={{
              marginHorizontal: sizeHelper.calHp(10),
              marginBottom: sizeHelper.calHp(10),
            }}>
            {I18nManager.isRTL
              ? 'المبلغ المستحق'
              : 'Payable Amount ' + netAmount}
          </Text>
          <TextInput
            style={{
              textAlignVertical: 'center',
              padding: 0,
              paddingStart: sizeHelper.calWp(18),
              //   width: sizeHelper.calWp(510),
              marginEnd: sizeHelper.calWp(10),

              height: sizeHelper.calHp(60),
              backgroundColor: AppColor.white,
              fontFamily: 'Proxima Nova Bold',
              fontSize: sizeHelper.calHp(25),
              color: AppColor.black,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            name={'cashpaid'}
            onChangeText={setCashAmount}
            placeholder={'Amount'}
            value={cashAmount}
          />
          {isError && <Text style={styles.errorText}>{error}</Text>}
          <View
            style={{flexDirection: 'row', alignSelf: 'flex-end', zIndex: 0}}>
            <CustomButton
              containerStyle={[
                {
                  alignSelf: 'flex-end',
                  height: sizeHelper.calWp(45),
                  width: sizeHelper.calWp(150),
                  marginRight: sizeHelper.calHp(10),
                  marginTop: sizeHelper.calHp(10),
                },
              ]}
              title={StringsList._1}
              backgroundColor={AppColor.blue2}
              onPressButton={() => {
                if (Number(netAmount) <= cashAmount) {
                  setIsPaidCash(false);
                  reacallFunc('cashpaid');
                } else {
                  setError(
                    I18nManager.isRTL
                      ? 'المبلغ اقل من صافي المبلغ'
                      : 'Amount is less than net amount',
                  );
                  setIsError(true);
                }
              }}
            />
            <CustomButton
              containerStyle={[
                {
                  alignSelf: 'flex-end',
                  height: sizeHelper.calWp(45),
                  width: sizeHelper.calWp(150),

                  marginTop: sizeHelper.calHp(10),
                },
              ]}
              title={StringsList._2}
              backgroundColor={AppColor.red1}
              onPressButton={() => {
                setIsPaidCash(false);
              }}
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

export default connect(mapStateToProps, mapDispatchToProps)(CashPaidPopUp);
