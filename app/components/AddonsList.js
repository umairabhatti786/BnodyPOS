import React, {useEffect, useState} from 'react';
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
import AddonsEquivelentProductList from './AddonsEquivelentProductList';

const AddonsList = ({
  displayAlert,
  onPressCancel,
  reacallFunc,
  data,
  StringsList,
  isLoading,
  isAddon,
  selectedAllProducts,
}) => {
  // +console.log('Addon product......', data);
  const [isAddonEquivelent, setisAddonEquivelent] = useState(false);
  const [equivaletntP, setEquivaletntP] = useState([]);
  const [addonIndex, setAddonIndex] = useState(0);
  // var equivaletntP = []
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
            {'Addons'}
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
              {StringsList._304}
            </Text>
            <Text
              style={{
                width: '31%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
                textAlign: 'center',
              }}>
              {StringsList._177}
            </Text>
            <Text
              style={{
                width: '22%',

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: 'Proxima Nova Bold',
                textAlign: 'center',
              }}>
              {StringsList._320 + ' ' + StringsList._98}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: sizeHelper.calHp(400),
            }}>
            {data.length > 0 ? (
              data.map((item, index) => {
                return isAddon ? (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      reacallFunc(item, 'returnInvoice', index);
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
                        {item.ProductName}
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
                          textAlign: 'center',
                        }}>
                        {item.Quantity}
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
                          textAlign: 'center',
                        }}>
                        {item.GrandAmount}
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
                        onPress={() => {
                          setisAddonEquivelent(true);
                          setEquivaletntP(item.EquivalentProducts);
                          setAddonIndex(index);
                          console.log(
                            'setisAddonEquivelent',
                            equivaletntP,
                            item.EquivalentProducts,
                          );
                        }}
                        style={{
                          width: '13%',
                          marginHorizontal: '0.5%',
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: 'Proxima Nova Bold',
                          alignItems: 'center',
                        }}>
                        {item?.EquivalentProducts.length > 0 && (
                          <View
                            style={{
                              backgroundColor: AppColor.green,
                              width: 33,
                              height: 33,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 33 / 2,
                            }}>
                            <Icon
                              name="life-saver"
                              size={20}
                              color={AppColor.yellow1}
                            />
                          </View>
                        )}
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
                ) : null;
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
          <View style={{alignSelf: 'flex-end'}}>
            {!isAddon && (
              <CustomButton
                containerStyle={{
                  marginEnd: sizeHelper.calHp(15),
                }}
                backgroundColor={AppColor.blue2}
                title={StringsList._306}
                onPressButton={selectedAllProducts}
                isDisabled={data.length < 1}
              />
            )}
          </View>
        </View>
      </View>
      {isAddonEquivelent && (
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
          <AddonsEquivelentProductList
            onPressCancel={() => setisAddonEquivelent(false)}
            reacallFunc={reacallFunc}
            data={equivaletntP}
            StringsList={StringsList}
            addonIndex={addonIndex}
            isLoading={isLoading}
            isAddon
          />
        </View>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddonsList);
