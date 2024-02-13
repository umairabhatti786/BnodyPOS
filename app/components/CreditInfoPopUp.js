import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import translatorHelper, {t} from '../helpers/translatorHelp';
import i18n from 'i18n-js';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';

import Header from './Header';
import sizeHelper from '../helpers/sizeHelper';
import CustomButton from './CustomButton';
import CustomRadioButton from './CustomRadioButton';
import AppColor from '../constant/AppColor';

const CreditInfoPopUP = props => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const arry = [
    {
      title: props.StringsList._23,
      value: 'total',
      placeholder: '0.00',
      editable: false,
    },
    {
      title: props.StringsList._70,
      value: 'cashAdavance',
      placeholder: '0.00',
      editable: true,
    },
    {
      title: props.StringsList._55,
      value: 'credit',
      placeholder: '0.00',
      editable: false,
    },
    {
      title: props.StringsList._71,
      value: 'cashPaid',
      placeholder: '0.00',
      editable: true,
    },
    {
      title: `${props.StringsList._16}`,
      value: 'balance',
      placeholder: '0.00',
      editable: false,
    },
    {
      title: props.isCredit ? props.StringsList._72 : props.StringsList._73,
      value: 'buyerCode',
      placeholder: '0000',
      editable: props.isCredit ? false : true,
    },

    {
      title: props.StringsList._285,
      value: 'name',
      placeholder: 'name',
      editable: props.isCredit ? false : true,
    },
  ];
  const handleCheck = values => {
    if (values.cashPaid >= values.cashAdavance) {
      setError('');
      setIsError(false);
    } else {
      setError('Cash Paid should be equal or greater than Cash Advance');
      setIsError(true);
    }
    // console.log('On Change Text', text, type);
  };
  useEffect(() => {
    // console.log("Credit Info PopUP", props)
  });

  return (
    <Animatable.View
      style={styles.container}
      ref={props.viewref}
      duration={500}
      useNativeDriver
      value={100}
      // easing="ease-in"
      animation="slideInRight">
      <Formik
        initialValues={{
          total: String(props.totalPrice),
          cashAdavance: '',
          credit: String(props.totalPrice),
          cashPaid: '',
          balance: '',
          buyerCode: props.isCredit ? props.buyerInfo?.BuyerCode : '0000',

          name: props.isCredit ? props.buyerInfo?.BuyerName : '',
        }}
        onSubmit={values => {
          // console.log('onSubmit values...', props.buyerInfo);

          if (Number(values.cashPaid) >= Number(values.cashAdavance)) {
            setError('');
            setIsError(false);
            props.setCashAmount(values.cashPaid);
            props.cashPaidAmountFun(
              Number(values.cashAdavance),
              values.buyerCode,
            );
            props.cancel('credit', 'save');
          } else {
            setError('Cash Paid should be equal or greater than Cash Advance');
            setIsError(true);
          }
        }}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          (values.credit = String(props.totalPrice - values.cashAdavance)),
          ((values.balance = String(values.cashPaid - values.cashAdavance)),
          ((values.cashPaid = String(values.cashPaid)),
          (
            // console.log('values...', values, errors),
            <View>
              <View
                style={{
                  paddingHorizontal: sizeHelper.calWp(20),
                  paddingVertical: sizeHelper.calWp(15),
                }}>
                {arry.map((item, index) => {
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
                            name={item.value}
                            onChangeText={handleChange(item.value)}
                            style={styles.textInput}
                            placeholder={item.placeholder}
                            editable={item.editable}
                            value={values[item?.value]}
                            error={errors[item?.value]}
                            // onChangeText={text => {
                            //   onChangeText(text, item.value);
                            // }}
                          />
                        </View>
                      </View>
                      {index === 3 && isError && (
                        <Text style={styles.errorText}>{error}</Text>
                      )}
                      {errors[item?.value] && (
                        <Text style={styles.errorText}>
                          {errors[item?.value]}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  containerStyle={{
                    marginEnd: sizeHelper.calHp(15),
                  }}
                  title={props.StringsList._1}
                  onPressButton={handleSubmit}
                  backgroundColor={AppColor.blue2}
                />
                <CustomButton
                  containerStyle={{
                    backgroundColor: AppColor.red1,
                  }}
                  backgroundColor={AppColor.red1}
                  onPressButton={() => props.cancel('credit')}
                  title={props.StringsList._2}
                />
              </View>
            </View>
          )))
        )}
      </Formik>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: AppColor.white,
    paddingBottom: sizeHelper.calHp(20),
    borderRadius: sizeHelper.calWp(15),
    shadowColor: AppColor.black,
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
  title: {
    fontSize: sizeHelper.calHp(18),
    color: AppColor.black,
    fontFamily: 'Proxima Nova Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizeHelper.calHp(60),
  },
  errorText: {
    //textAlign: 'right',
    color: AppColor.orange,
    fontFamily: 'ProximaNova-Semibold',
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(20),

    marginStart: sizeHelper.calWp(200),
  },
});

export default CreditInfoPopUP;
