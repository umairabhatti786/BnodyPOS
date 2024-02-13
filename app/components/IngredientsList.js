import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  I18nManager,
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
import { getData } from '../sqliteHelper';
import { HoldInvoiceTable } from '../sqliteTables/HoldInvoice';
import Loading from './Loading';
import AddonsEquivelentProductList from './AddonsEquivelentProductList';

const IngredientsList = ({
  displayAlert,
  onPressCancel,
  reacallFunc,
  data,
  StringsList,
  isLoading,
  isAddon,
  selectedAllProducts,
  isGlobal,
  onChangeText,
  onPressAddIntgredient,
}) => {
  // +console.log('ReturnInvoice......', data);
  const [isAddonEquivelent, setisAddonEquivelent] = useState(false)
  const [equivaletntP, setEquivaletntP] = useState([])
  const [addonIndex, setAddonIndex] = useState(0)
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
          borderRadius: 25,
        }}>
        <View
          style={{
            backgroundColor: AppColor.blue1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '50%',
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
            {StringsList._404}
          </Text>

          <TouchableOpacity onPress={onPressCancel}>
            <Icon
              name={'close'}
              size={sizeHelper.calWp(35)}
              color={AppColor.white}
            />
          </TouchableOpacity>
        </View>
        <View style={{
          zIndex: 0,
          width: '50%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: "center",

          backgroundColor: AppColor.white,
        }}>

          <View style={{
            width: sizeHelper.calWp(215),
            height: sizeHelper.calHp(60),
            backgroundColor: AppColor.white,
            borderRadius: sizeHelper.calHp(60),
            paddingStart: sizeHelper.calWp(20),
            marginVertical: sizeHelper.calHp(25),
            marginHorizontal: sizeHelper.calWp(10),
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,


          }}>
            <TextInput


              style={{
                zIndex: 0,
                textAlignVertical: 'center',
                padding: 0,
                paddingStart: sizeHelper.calWp(1),
                width: sizeHelper.calWp(220),
                height: sizeHelper.calHp(40),
                backgroundColor: 'transparent',
                fontFamily: 'Proxima Nova Bold',
                fontSize: sizeHelper.calHp(20),
                color: AppColor.black,
                textAlign: I18nManager.isRTL ? "right" : "left"
              }}
              placeholder={StringsList._135}

              onChangeText={text => {
                onChangeText(text);
              }}
            />
          </View>
          <CustomButton
            containerStyle={{
              marginEnd: sizeHelper.calHp(15),
              width: sizeHelper.calWp(80)

            }}
            backgroundColor={AppColor.blue2}
            title={StringsList._115}
            onPressButton={() => { onPressAddIntgredient(), onPressCancel() }}
          />
        </View>
        <View
          style={{
            width: '50%',
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
              height: sizeHelper.calHp(400),
            }}>
            {data.length > 0 ? (
              data.map((item, index) => {

                return (
                  <TouchableOpacity
                    key={item.SalesBillDetailsID}
                    onPress={() => {
                      reacallFunc(item, item, index);

                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: AppColor.white1,
                        // justifyContent: "center",
                        // alignItems: "center"
                      }}>
                      <CheckBoxCustom
                        value={item.isSelected}
                        onValueChange={() => { reacallFunc(item, item, index) }}
                        title={item.IngredientName}
                      />
                      {/* <Text
                        style={{
                          // width: '98%',
                          fontSize: sizeHelper.calHp(25),
                          marginVertical: sizeHelper.calHp(20),
                          marginHorizontal: '0.5%',
                          color: AppColor.black,
                          alignSelf: "center",
                          fontFamily: 'Proxima Nova Bold',
                        }}>
                        {item.IngredientName}
                      </Text> */}




                    </View>

                  </TouchableOpacity>)
              }))
              : (
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
                </Text>)}
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
