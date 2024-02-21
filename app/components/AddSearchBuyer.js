import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  I18nManager,
  Alert,
} from 'react-native';
import translatorHelper, {t} from '../helpers/translatorHelp';

import {Formik} from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from './Header';
import sizeHelper from '../helpers/sizeHelper';
import CustomButton from './CustomButton';
import CustomRadioButton from './CustomRadioButton';
import AppColor from '../constant/AppColor';
import {ServerCall} from '../redux/actions/asynchronousAction';
import Loading from './Loading';
import CustomDropDown from './CustomDropDown';
import {initial} from 'lodash';

// import { date } from 'yup';

const AddSearchBuyer = ({props}) => {
  const [isAdd, setAdd] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [initialValues, setInitialValues] = useState({
    BuyerName: '',
    PrimaryPhone: '',
    CCRNumber: '',
    ValueAddedTaxNumber: '',
    BuyerCode: '',
    BuyerAddress: '',
  });
  const [loyaltys, setLoyaltys] = useState(props.loyaltyList);
  const [selectedLoyalty, setSelectedLoyalty] = useState();
  const [loyaltyEmail, setLoyaltyEmail] = useState(null);

  const current = new Date();
  console.log('current date....', initialValues);
  const [date, setDate] = useState('select Date');
  const [show, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [loyaltyDate, setLoyaltyDate] = useState('');
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const [type, setType] = useState('');
  const arry = [
    {title: props.StringsList._285, value: 'BuyerName'},
    {title: props.StringsList._138, value: 'PrimaryPhone'},
    {title: props.StringsList._139, value: 'CCRNumber'},
    {title: props.StringsList._140, value: 'ValueAddedTaxNumber'},
    {title: props.StringsList._141, value: 'BuyerCode'},
    {title: props.StringsList._383, value: 'BuyerAddress'},
  ];
  const onChangeText = (text, type) => {
    console.log('On Change Text', text, type);
    if (type === 'loyaltyEmail') {
      setLoyaltyEmail(text);
    } else {
      setSearchText(text);
    }
  };
  useEffect(async () => {
    let date, month, year;
    date = current.getDate();
    month = current.getMonth() + 1;
    year = current.getFullYear();
    const ndate = year + '/' + month + '/' + date;
    const currentDate = `${year}${month < 10 ? '0' + month : month + 1}${
      date < 10 ? '0' + date : date
    }`;

    setDate(ndate);
    setCurrentDate(currentDate);
    if (props.buyerInfo) {
      if (props.buyerInfo.LoyaltyCard !== null) {
        if (
          props.buyerInfo.LoyaltyCard.RegistrationDate &&
          props.buyerInfo.LoyaltyCard.RegistrationDate !== ''
        ) {
          //  console.log("props.buyerInfo.LoyaltyCard.RegistrationDate", props.buyerInfo.LoyaltyCard.RegistrationDate)

          let date, month, year;
          year = props.buyerInfo.LoyaltyCard.RegistrationDate.slice(0, 4);
          month = props.buyerInfo.LoyaltyCard.RegistrationDate.slice(4, 6);
          date = props.buyerInfo.LoyaltyCard.RegistrationDate.slice(6, 8);
          const currentDate = year + '/' + month + '/' + date;
          setLoyaltyDate(currentDate);
        }
        setSelectedLoyalty(
          props.buyerInfo.LoyaltyCard.LoyaltyName
            ? props.buyerInfo.LoyaltyCard.LoyaltyName
            : '',
        );
      }
      if (props.buyerInfo !== null && props.buyerInfo?.BuyerName !== '') {
        setInitialValues(props.buyerInfo);
      } else {
        setInitialValues(null);
      }
    }
  }, []);

  const onClickCancel = () => {
    props.navigation.replace('home');
  };

  const loginValidationSchema = yup.object().shape({
    BuyerName: yup
      .string()

      .required(props.StringsList._286),
    PrimaryPhone: yup
      .string()

      .required(props.StringsList._286),

    BuyerAddress:
      props.userConfiguration?.ChangeSalesAgentAllowed === 0
        ? yup.string()
        : yup
            .string()

            .required(props.StringsList._286),
  });
  const onSelect = type => {
    if (type === 'Add') {
      setAdd(true);
      setType('Add');
      let inital = {
        BuyerName: '',
        PrimaryPhone: '',
        CCRNumber: '',
        ValueAddedTaxNumber: '',
        BuyerCode: '',
        BuyerAddress: '',
      };
      setInitialValues(inital);
    } else {
      setAdd(false);
      if (props.buyerInfo) setInitialValues(props.buyerInfo);
    }
  };

  const addSaveBuyer = async values => {
    let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
    let loyaltyObj = null;
    setLoading(true);
    let ccode = I18nManager.isRTL ? 'ar-SA' : 'en-US';

    if (selectedLoyalty !== '') {
      loyaltys.forEach(element => {
        if (element.label === selectedLoyalty) {
          console.log(' element.LoyaltyCode', element);

          loyaltyObj = {
            BuyerCode: initialValues.BuyerCode
              ? initialValues.BuyerCode
              : values.BuyerCode,
            Email: loyaltyEmail,
            LoyaltyCode: element.LoyaltyCode,
            LoyaltyCardID: 0,
            RegistrationDate: currentDate,
          };
        }
      });
    }

    if (isAdd) {
      let body = {
        BuyerName: values.BuyerName,
        ReturnCode: 0,
        BuyerCode: values.BuyerCode,
        PrimaryPhone: values.PrimaryPhone,
        CCRNumber: values.CCRNumber,
        ValueAddedTaxNumber: values.ValueAddedTaxNumber,
        BuyerAddress: values.BuyerAddress,
        Operation: 'add',
        CurrentDate: currentDate,
        LoyaltyCard: loyaltyObj,
        CultureCode: ccode,
      };
      // console.log("add buyer body", body)

      const response1 = await props.dispatch(
        ServerCall(UserLogin, 'Buyer/CreateBuyer', 'POST', body),
      );
      let res = await JSON.parse(response1);
      console.log('parse res data==>', res);
      if (res && res.BuyerName !== '') {
        setInitialValues(res);
        setAdd(false);
      }
      // searchBuyer(response1.BuyerCode, "add");
      // props.setBuyerInfo(null);
      // props.setBuyerInfo(response1)

      // props.setisBuyer(false);
    } else {
      if (initialValues.BuyerName !== '') {
        if (values === 'Save') {
          props.otherOptions('buyer');
          props.setBuyerInfo(initialValues);
          props.setisBuyer(false);
        } else {
          if (selectedLoyalty !== '' && !initialValues.LoyaltyCard) {
            initialValues.LoyaltyCard = loyaltyObj;
            initialValues.Operation = 'search';
            initialValues.CurrentDate = currentDate;
            initialValues.CultureCode = ccode;
            console.log(' initial Values...', initialValues);

            const response1 = await props.dispatch(
              ServerCall(UserLogin, 'Buyer/CreateBuyer', 'POST', initialValues),
            );

            props.setBuyerInfo(response1);
          } else {
          }
        }
      }
    }
    setLoading(false);
  };

  const searchBuyer = async (BCode, type) => {
    console.log('searchBuyer', BCode);
    let ccode = I18nManager.isRTL ? 'ar-SA' : 'en-US';
    setLoading(true);
    if (!props.buyerInfo || type === 'add') {
      let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
      setType('search');
      let body = {
        BuyerName: '',
        ReturnCode: 0,
        BuyerCode: null,
        PrimaryPhone: BCode ? BCode : searchText,
        CCRNumber: '',
        ValueAddedTaxNumber: '',
        BuyerAddress: '',
        Operation: 'search',
        CurrentDate: currentDate,
        LoyaltyCard: null,
        CaltureCode: ccode,
      };

      const response1 = await props.dispatch(
        ServerCall(UserLogin, 'Buyer/CreateBuyer', 'POST', body),
      );

      let res = await JSON.parse(response1);
      console.log('parse res data==>', res);
      if (res && res.BuyerName !== null) {
        setInitialValues(res);
        setSearchText('');
        if (res.LoyaltyCard !== null) {
          if (
            res.LoyaltyCard.RegistrationDate &&
            res.LoyaltyCard.RegistrationDate !== ''
          ) {
            let date, month, year;
            year = res.LoyaltyCard.RegistrationDate.slice(0, 4);
            month = res.LoyaltyCard.RegistrationDate.slice(4, 6);
            date = res.LoyaltyCard.RegistrationDate.slice(6, 8);
            const currentDate = year + '/' + month + '/' + date;
            setLoyaltyDate(currentDate);
          } else {
            setLoyaltyDate('');
          }

          setSelectedLoyalty(res?.LoyaltyCard?.LoyaltyName);
        } else {
          setSelectedLoyalty('');
        }
      } else if (res.BuyerName === null) {
        Alert.alert('Restaurant POS', 'Buyer not found', [
          {
            text: 'OK',
            onPress: () => {
              console.log('okkkk'), setLoading(false);
              let inital = {
                BuyerName: '',
                PrimaryPhone: '',
                CCRNumber: '',
                ValueAddedTaxNumber: '',
                BuyerCode: '',
                BuyerAddress: '',
              };
              setInitialValues(inital);
              setSearchText('');
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              console.log('cancel'), setLoading(false);
              let inital = {
                BuyerName: '',
                PrimaryPhone: '',
                CCRNumber: '',
                ValueAddedTaxNumber: '',
                BuyerCode: '',
                BuyerAddress: '',
              };
              setInitialValues(inital);
              setSearchText('');
            },
            style: 'cancel',
          },
        ]);
        setLoading(false);
      } else {
        let inital = {
          BuyerName: '',
          PrimaryPhone: '',
          CCRNumber: '',
          ValueAddedTaxNumber: '',
          BuyerCode: '',
          BuyerAddress: '',
        };
        setInitialValues(inital);
        props.setBuyerInfo(null);
        setSearchText('');
      }
      // console.log("response1..........", loyaltys)
      setLoading(false);
    } else {
      let inital = {
        BuyerName: '',
        PrimaryPhone: '',
        CCRNumber: '',
        ValueAddedTaxNumber: '',
        BuyerCode: '',
        BuyerAddress: '',
      };
      setSelectedLoyalty('');
      setInitialValues(inital);
      props.setBuyerInfo(null);
      setSearchText('');
      setLoading(false);
    }
  };
  const onChange = (event, selectedDate) => {
    setShow(false);
    let date, month, year;
    date = selectedDate.getDate();
    month = selectedDate.getMonth() + 1;
    year = selectedDate.getFullYear();

    const currentDate = year + '/' + month + '/' + date;

    setDate(currentDate);
  };
  return (
    <Animatable.View
      style={styles.container}
      ref={props.buyerViewRef}
      duration={600}
      useNativeDriver
      value={100}
      // easing="ease-in"
      animation="slideInRight">
      <View style={styles.redioButtonContainer}>
        <CustomRadioButton
          onSelect={() => onSelect('Add')}
          isSelected={isAdd}
          title={props.StringsList._115}
        />
        <CustomRadioButton
          onSelect={() => onSelect('Search')}
          isSelected={!isAdd}
          title={props.StringsList._135}
        />
      </View>
      {!isAdd && (
        <View style={styles.searchAddContainer}>
          <Text
            style={[
              styles.title,
              {right: sizeHelper.screenWidth > 450 ? 35 : -5},
            ]}>
            {props.StringsList._137}
          </Text>
          <View style={styles.textInputContainer2}>
            <TextInput
              style={[styles.textInput2]}
              placeholder={props.StringsList._135}
              onChangeText={text => {
                onChangeText(text.trim());
              }}
              value={searchText}
            />
          </View>
          <CustomButton
            backgroundColor={
              initialValues.BuyerName !== '' && searchText === ''
                ? AppColor.red
                : AppColor.blue2
            }
            title={
              initialValues.BuyerName !== '' && searchText === ''
                ? props.StringsList._117
                : props.StringsList._135
            }
            onPressButton={() => {
              if (searchText !== '') {
                searchBuyer(null);
              } else {
                setInitialValues({
                  BuyerName: '',
                  PrimaryPhone: '',
                  CCRNumber: '',
                  ValueAddedTaxNumber: '',
                  BuyerCode: '',
                  BuyerAddress: '',
                });
                setSearchText('');
              }
            }}
          />
        </View>
      )}
      <View style={styles.divider} />
      <Formik
        validationSchema={isAdd ? loginValidationSchema : ''}
        initialValues={{
          BuyerName: '',
          PrimaryPhone: '',
          CCRNumber: '',
          ValueAddedTaxNumber: '',
          BuyerCode: '',
          BuyerAddress: '',
        }}
        onSubmit={values => {
          // console.log('onSubmit values...', values, type, typee);
          addSaveBuyer(values);
        }}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          <View style={{zIndex: 0}}>
            <View
              style={{
                // paddingHorizontal: sizeHelper.calWp(20),
                paddingVertical: sizeHelper.calWp(15),
              }}>
              {arry.map(item => {
                // console.log('values...', initialValues[item?.value], values)
                // console.log('error value', errors[item?.value]);
                return (
                  <View id={item.value}>
                    <View
                      style={{
                        width: '100%',
                        // backgroundColor: 'green',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: sizeHelper.calHp(20),
                      }}>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          zIndex={0}
                          editable={isAdd}
                          BuyerName={item.value}
                          onChangeText={handleChange(item.value.trim())}
                          style={styles.textInput}
                          placeholder={item.title}
                          value={
                            isAdd
                              ? values[item?.value]
                              : initialValues[item?.value]
                          }
                          error={errors[item?.value]}
                          // onChangeText={text => {
                          //   onChangeText(text, item.value);
                          // }}
                        />
                      </View>
                    </View>
                    {errors[item?.value] && (
                      <Text style={styles.errorText}>
                        {errors[item?.value]}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
            <Text style={styles.title}>{props.StringsList._417}</Text>
            <View style={styles.divider} />
            <View
              style={{marginTop: sizeHelper.calHp(25), flexDirection: 'row'}}>
              <CustomDropDown
                dropDownWidth={sizeHelper.calWp(166.66)}
                dropDownHeight={sizeHelper.calWp(46)}
                items={loyaltys}
                setItems={setLoyaltys}
                // onChangeValue={setLoyaltys}
                dropDownDirection={'TOP'}
                placeholderTitle={props.StringsList._368}
                setValue={setSelectedLoyalty}
                value={selectedLoyalty}
                open={loyaltyOpen}
                setOpen={setLoyaltyOpen}
              />
              <CustomButton
                containerStyle={{
                  marginStart: sizeHelper.calHp(40),
                  height: sizeHelper.calWp(46),
                }}
                backgroundColor={AppColor.blue2}
                title={isAdd ? date : loyaltyDate ? loyaltyDate : date}
                onPressButton={() => {
                  setShow(!show);
                }}
              />
              <View style={styles.textInputContainer2}>
                <TextInput
                  value={
                    !isAdd && initialValues.LoyaltyCard
                      ? initialValues.LoyaltyCard.Email
                      : loyaltyEmail
                  }
                  style={styles.textInput2}
                  placeholder={props.StringsList._411}
                  onChangeText={text => {
                    onChangeText(text, 'loyaltyEmail');
                  }}
                />
              </View>
            </View>
            {(isAdd ||
              (!initialValues.LoyaltyCard &&
                initialValues.BuyerName !== '')) && (
              <CustomButton
                containerStyle={{
                  marginTop: sizeHelper.calHp(25),
                  alignSelf: 'flex-end',
                }}
                backgroundColor={AppColor.blue2}
                title={isAdd ? props.StringsList._115 : props.StringsList._413}
                onPressButton={handleSubmit}
              />
            )}
            <View style={styles.buttonContainer}>
              <CustomButton
                containerStyle={{
                  marginEnd: sizeHelper.calHp(15),
                }}
                backgroundColor={AppColor.blue2}
                title={props.StringsList._1}
                onPressButton={() => {
                  if (
                    initialValues.BuyerName !== '' &&
                    initialValues.BuyerName !== null
                  ) {
                    console.log(
                      initialValues.BuyerName !== '' &&
                        initialValues.BuyerName !== null,
                    );
                    addSaveBuyer('Save');
                  }
                }}
              />
              <CustomButton
                containerStyle={{
                  backgroundColor: AppColor.red1,
                }}
                backgroundColor={AppColor.red1}
                onPressButton={() => props.setisBuyer(false)}
                title={props.StringsList._2}
              />
            </View>
          </View>
        )}
      </Formik>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={current}
          mode={'date'}
          // is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {isLoading && (
        <View style={styles.popupContainer}>
          <Loading />
        </View>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: AppColor.white,
    paddingBottom: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calWp(15),
    shadowColor: AppColor.black,
    paddingHorizontal: sizeHelper.calWp(40),

    shadowOffset: {
      width: 52,
      height: 40,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 40,
    alignSelf: 'center',
  },
  textInput: {
    zIndex: 0,
    textAlignVertical: 'center',
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(450),
    height: sizeHelper.calHp(40),
    backgroundColor: 'transparent',
    fontFamily: 'Proxima Nova Bold',
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,

    //backgroundColor: 'green',
  },
  textInputContainer: {
    zIndex: 0,
    width: sizeHelper.calWp(500),
    height: sizeHelper.calHp(60),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(60),
    paddingStart: sizeHelper.calWp(20),
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: AppColor.blue1,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 10,
  },
  textInput2: {
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
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    overflow: 'hidden',
    //backgroundColor: 'green',
  },
  textInputContainer2: {
    width:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(230)
        : sizeHelper.calWp(200),
    height: sizeHelper.calHp(50),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(5),
    paddingStart: sizeHelper.calWp(20),
    marginHorizontal:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(60)
        : sizeHelper.calWp(40),
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: AppColor.blue1,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 10,
    overflow: 'hidden',
    textAlignVertical: 'center',
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    height: 3,
    backgroundColor: AppColor.gray2,
    marginTop: sizeHelper.calHp(15),
  },
  title: {
    fontSize: sizeHelper.calHp(18),
    color: AppColor.black,
    fontFamily: 'Proxima Nova Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: sizeHelper.calHp(40),
  },
  redioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizeHelper.calHp(25),
  },
  searchAddContainer: {
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(25),
  },
  errorText: {
    //textAlign: 'right',
    color: AppColor.orange,
    fontFamily: 'ProximaNova-Semibold',
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(20),

    marginStart: sizeHelper.calWp(200),
  },
  popupContainer: {
    width: '115%',
    height: '115%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.popUpBackgroundColor,
  },
});

const mapStateToProps = state => {
  return {
    TerminalConfiguration: state.user.SaveAllData.TerminalConfiguration,
    ProductsInfo: state.user.SaveAllData.ProductsInfo,
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSearchBuyer);
