import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  DevSettings,
  I18nManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {CreateTable, DeleteTable, getData, updateColunm} from '../sqliteHelper';
import {
  InsertTerminalSetup,
  TerminalSetupCoulumnskey,
  TerminalSetupCreateTableCoulumns,
  TerminalSetupTable,
} from '../sqliteTables/TerminalSetup';
import {setI18nConfig} from '../helpers/translatorHelp';

const TerminalSetup = ({
  displayAlert,

  isPromptAlert,

  terminalCode,

  StringsList,
  onPressCancel,
}) => {
  const [isDrawerHandling, setDrawerHandling] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState(false);
  const [isEndDrawerLayout, setEndDrawerLayout] = useState(false);
  const [isBeepSound, setBeepSound] = useState(false);
  const [isSelfBilling, setSelfBilling] = useState(false);
  const [isPrintProductFamily, setPrintProductFamily] = useState(false);
  const [isBillLabeling, setBillLabeling] = useState(false);
  const [isSelfCount, setSelfCount] = useState(false);
  const [isPrintAddOns, setPrintAddOns] = useState(false);
  const [noOfCopies, setNoOfCopies] = useState('');
  const [startFrom, setStartFrom] = useState('');
  const [languageOpen, setLanguageOpen] = useState(false);

  const [language, setLanguage] = useState([
    {label: 'English', value: 'english'},
    {label: 'Arabic', value: 'arabic'},
  ]);
  const [lanaguageValue, setLanguageValue] = useState();
  const [preLanaguageValue, setPreLanguageValue] = useState();
  const [cashPaidAlert, setCashPaidAlert] = useState(false);
  const [printGroupProducts, setPrintGroupProducts] = useState(false);
  useEffect(async () => {
    getData(TerminalSetupTable, cb => {
      console.log('cb[0].Copies', cb[0]);
      setDrawerHandling(cb[0].DrawerHanding === 'true' ? true : false);
      setDeliveryNotes(cb[0].DeliveryNotes === 'true' ? true : false);
      setEndDrawerLayout(cb[0].EndDrawerOnLogout === 'true' ? true : false);
      setBeepSound(cb[0].BeepSound === 'true' ? true : false);
      setSelfBilling(cb[0].SelfBilling === 'true' ? true : false);
      setPrintProductFamily(cb[0].PrintProductFamily === 'true' ? true : false);
      setBillLabeling(cb[0].BillLabeling === 'true' ? true : false);
      setSelfCount(cb[0].SelfCount === 'true' ? true : false);
      setPrintAddOns(cb[0].PrintAddons === 'true' ? true : false);
      setPrintGroupProducts(cb[0].printGroupProducts === 'true' ? true : false);
      setNoOfCopies(cb[0].Copies === 'false' ? '01' : cb[0].Copies);
      setLanguageValue(cb[0].TerminalLanguage);
      setPreLanguageValue(cb[0].TerminalLanguage);
      setStartFrom(cb[0].StartFrom === 'false' ? '001' : cb[0].StartFrom);
      // console.log('create Table ', cb);
    });
    let cashalert = await AsyncStorage.getItem('CASH_PAID_ALERT');
    if (cashalert === 'true') {
      setCashPaidAlert(true);
    }
  }, []);

  const updateTerminalSetting = () => {
    let columnName = [
      'DeliveryNotes',
      'EndDrawerOnLogout',
      'BeepSound',
      'TerminalLanguage',
      'SelfBilling',
      'DrawerHanding',
      'BillLabeling',
      'Copies',
      'SelfCount',
      'StartFrom',
      'PrintProductFamily',
      'PrintAddons',
      'printGroupProducts',
    ];
    let columnValue = [
      deliveryNotes,
      isEndDrawerLayout,
      isBeepSound,
      lanaguageValue,
      isSelfBilling,
      isDrawerHandling,
      isBillLabeling,
      noOfCopies,
      isSelfCount,
      startFrom,
      isPrintProductFamily,
      isPrintAddOns,
      printGroupProducts,
    ];
    updateColunm(TerminalSetupTable, columnName, 'id', '12345678', columnValue);
    if (preLanaguageValue !== lanaguageValue) {
      setI18nConfig(lanaguageValue === 'english' ? 'en' : 'ar');
      DevSettings.addMenuItem('Show Secret Dev Screen', () => {
        Alert.alert('Showing secret dev screen!');
      });
      DevSettings.reload();
    }
  };

  const saveCashPaidValue = val => {
    let keyValue = String(val);
    setCashPaidAlert(val);
    AsyncStorage.setItem('CASH_PAID_ALERT', keyValue, err => {
      if (err) {
        console.log('an error');
        throw err;
      }
      console.log('success');
    }).catch(err => {
      console.log('error is: ' + err);
    });
  };

  const onChangeText = (text, type) => {
    if (type === 'startFrom') {
      setStartFrom(text);
    } else {
      setNoOfCopies(text);
    }
  };
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
            {StringsList._35}
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
          <Text
            style={{
              fontSize: sizeHelper.calHp(20),
              color: AppColor.black,
              fontFamily: 'Proxima Nova Bold',
            }}>
            {StringsList._84}
          </Text>
          <View
            style={{
              width: '75%',
              justifyContent: 'space-between',
              //   alignItems: 'center',
              flexDirection: 'row',
              marginTop: sizeHelper.calHp(10),
              //   backgroundColor: 'green',
            }}>
            <View
              style={{
                // width: '75%',
                justifyContent: 'flex-start',

                // backgroundColor: 'yellow',
                alignItems: 'flex-start',
                // marginTop: sizeHelper.calHp(10),
              }}>
              <CheckBoxCustom
                value={isDrawerHandling}
                onValueChange={setDrawerHandling}
                title={StringsList._370}
              />
              <CheckBoxCustom
                value={isEndDrawerLayout}
                onValueChange={setEndDrawerLayout}
                title={StringsList._86}
              />
            </View>
            <View
              style={{
                // width: '50%',
                // backgroundColor: 'blue',
                alignItems: 'flex-start',

                // marginTop: sizeHelper.calHp(10),
              }}>
              <CheckBoxCustom
                value={deliveryNotes}
                onValueChange={setDeliveryNotes}
                title={'Delivery Notes'}
              />
              <CheckBoxCustom
                value={isBeepSound}
                onValueChange={setBeepSound}
                title={StringsList._85}
              />
            </View>
          </View>

          <View
            style={{
              // width: '50%',
              // backgroundColor: 'blue',
              alignItems: 'flex-start',
              marginBottom: sizeHelper.calHp(10),
            }}>
            <CheckBoxCustom
              value={cashPaidAlert}
              onValueChange={saveCashPaidValue}
              title={
                I18nManager.isRTL
                  ? 'إجمالي المدفوعات النقدية'
                  : 'Total Cash Paid'
              }
            />
          </View>
          {/* <View
            style={{
              width: '80%',
              // backgroundColor: 'white',
              paddingVertical: sizeHelper.calHp(20),
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
              marginBottom: sizeHelper.calHp(20),
              // zIndex: 90000,

              //   paddingHorizontal: sizeHelper.calWp(20),
            }}>
            <Text
              style={{
                fontSize: sizeHelper.calHp(15),
                color: AppColor.black,
                fontFamily: 'Proxima Nova Bold',
                marginEnd: sizeHelper.calWp(20),
              }}>
              {StringsList._365}
            </Text>

            <CustomDropDown
              dropDownWidth={sizeHelper.calWp(166.66)}
              dropDownHeight={sizeHelper.calWp(46)}
              items={language}
              setItems={setLanguage}
              // onChangeValue={setLanguage}
              placeholderTitle={'English'}
              setValue={setLanguageValue}
              value={lanaguageValue}
              open={languageOpen}
              setOpen={setLanguageOpen}
            />
          </View> */}
          <View
            style={{
              width: '100%',
              height: 3,
              backgroundColor: AppColor.white1,
              zIndex: 0,
            }}
          />
          <Text
            style={{
              fontSize: sizeHelper.calHp(20),
              color: AppColor.black,
              fontFamily: 'Proxima Nova Bold',
              zIndex: 0,
            }}>
            {StringsList._84}
          </Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              //   alignItems: 'center',
              flexDirection: 'row',
              marginTop: sizeHelper.calHp(10),
              zIndex: 0,
              //   backgroundColor: 'green',
            }}>
            <View
              style={{
                // width: '75%',
                justifyContent: 'flex-start',

                // backgroundColor: 'yellow',
                zIndex: 0,
                alignItems: 'flex-start',
                // marginTop: sizeHelper.calHp(10),
              }}>
              <CheckBoxCustom
                value={isSelfBilling}
                onValueChange={setSelfBilling}
                title={StringsList._103}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,
                    fontFamily: 'Proxima Nova Bold',
                  }}>
                  {StringsList._104}
                </Text>
                <TextInput
                  style={{
                    textAlignVertical: 'center',
                    paddingVertical: 0,
                    paddingStart: sizeHelper.calWp(10),
                    marginStart: sizeHelper.calWp(18),
                    width: sizeHelper.calWp(100),
                    marginEnd: sizeHelper.calWp(10),
                    height: sizeHelper.calHp(45),
                    backgroundColor: AppColor.white,
                    fontFamily: 'Proxima Nova Bold',
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,
                    borderWidth: 1,
                    // textAlign: I18nManager.isRTL ? 'right' : 'left',
                  }}
                  onChangeText={text => onChangeText(text)}
                  value={noOfCopies}
                  placeholder={'1'}
                />
              </View>
              <CheckBoxCustom
                value={isPrintProductFamily}
                onValueChange={setPrintProductFamily}
                title={StringsList._110}
              />
              <CheckBoxCustom
                value={printGroupProducts}
                onValueChange={setPrintGroupProducts}
                title={'Print Group Products'}
              />
            </View>
            <View
              style={{
                // width: '50%',
                // backgroundColor: 'blue',
                alignItems: 'flex-start',
                zIndex: 0,

                // marginTop: sizeHelper.calHp(10),
              }}>
              <CheckBoxCustom
                value={isBillLabeling}
                onValueChange={setBillLabeling}
                title={StringsList._111}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBoxCustom
                  value={isSelfCount}
                  onValueChange={setSelfCount}
                  title={StringsList._112}
                />
                <Text
                  style={{
                    marginStart: sizeHelper.calWp(10),
                    marginTop: sizeHelper.calWp(10),
                    fontSize: sizeHelper.calHp(15),
                    color: AppColor.black,
                    fontFamily: 'Proxima Nova Bold',
                  }}>
                  {StringsList._113}
                </Text>
                <TextInput
                  style={{
                    paddingVertical: 0,
                    textAlignVertical: 'center',
                    marginTop: sizeHelper.calWp(10),
                    paddingStart: sizeHelper.calWp(5),
                    marginStart: sizeHelper.calWp(10),
                    width: sizeHelper.calWp(100),

                    height: sizeHelper.calHp(45),
                    backgroundColor: AppColor.white,
                    fontFamily: 'Proxima Nova Bold',
                    fontSize: sizeHelper.calHp(20),
                    color: AppColor.black,

                    borderWidth: 1,

                    // textAlign: I18nManager.isRTL ? 'right' : 'left',
                  }}
                  onChangeText={text => onChangeText(text, 'startFrom')}
                  value={startFrom}
                  placeholder={'1'}
                />
              </View>

              <CheckBoxCustom
                value={isPrintAddOns}
                onValueChange={setPrintAddOns}
                title={StringsList._400}
              />
            </View>
          </View>
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
              title={StringsList._1}
              titleColor={AppColor.white}
              onPressButton={() => {
                updateTerminalSetting();
                onPressCancel();
              }}
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
              title={StringsList._2}
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

export default connect(mapStateToProps, mapDispatchToProps)(TerminalSetup);
