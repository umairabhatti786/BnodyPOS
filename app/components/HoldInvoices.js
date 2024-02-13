import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import { reach } from 'yup';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import { CheckBoxCustom } from './CheckBoxCustom';
import CustomButton from './CustomButton';
import CustomDropDown from './CustomDropDown';
import { CustomMenu } from './CustomMenu';
import { getData } from '../sqliteHelper';
import { HoldInvoiceTable } from '../sqliteTables/HoldInvoice';

const HoldInvoices = ({ displayAlert, onPressCancel, reacallFunc, deleteHoldedInvoice }) => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    holdInvoices()

  }, []);
  const holdInvoices = () => {
    getData(HoldInvoiceTable, cb => {
      setInvoices(cb);
    });
  }
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
            backgroundColor: AppColor.blue1,
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
            Hold Invoices
          </Text>

          <TouchableOpacity onPress={onPressCancel}>
            <IconA
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
                width: '33%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
              }}>
              Invoice Number
            </Text>
            <Text
              style={{
                width: '31%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
              }}>
              Net Amount
            </Text>
            <Text
              style={{
                width: '22%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
              }}>
              Date
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: sizeHelper.calHp(400),
            }}>
            {invoices.length > 0 ? (
              invoices.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      reacallFunc(item.invoiceNumber), onPressCancel();
                    }}>
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
                          width: '30%',
                          fontSize: sizeHelper.calHp(20),
                          marginVertical: sizeHelper.calHp(20),
                          marginHorizontal: '0.5%',
                          color: AppColor.black,
                          fontFamily: 'Proxima Nova Bold',
                        }}>
                        {item.invoiceNumber}
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
                          width: '30%',
                          marginHorizontal: '0.5%',
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: 'Proxima Nova Bold',
                        }}>
                        {item.totalPrice}
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
                        {item.date}
                      </Text>
                      <View
                        style={{
                          width: '0.5%',
                          height: '100%',
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => { deleteHoldedInvoice(item.invoiceNumber), holdInvoices() }}
                        style={{
                          width: '13%',
                          marginHorizontal: '0.5%',
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: 'Proxima Nova Bold',
                          alignItems: "center"
                        }}>
                        <Icon name="trash-o" size={24} color={AppColor.red} />
                      </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(HoldInvoices);
