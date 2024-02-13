import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  I18nManager,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import sizeHelper from '../helpers/sizeHelper';
import AppColor from '../constant/AppColor';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';

const CustomerNotes = ({
  StringsList,
  customerNotes,
  setCustomerNotes,
  customerNotesOpen,
  setCustomerNotesOpen,
}) => {
  return (
    <CustomModal
      title={StringsList._43}
      displayModal={customerNotesOpen}
      onModalShow={() => setCustomerNotesOpen(false)}
      setisPromptModal={() => {}}
      isPromptModal={false}
      children={
        <>
          <View
            style={{
              // top: -20,
              zIndex: 1000,
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(530)
                    : sizeHelper.calHp(500),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.textInput}
                placeholder={'Customer Notes'}
                placeholderTextColor={AppColor.black}
                value={customerNotes}
                onChangeText={setCustomerNotes}
                keyboardType="default"
                autoCorrect={true}
                editable={true}
                enablesReturnKeyAutomatically={true}
                maxLength={99}
                multiline={true}
                numberOfLines={2}
                spellCheck={true}
                textAlign={'left'}
                textAlignVertical={'top'}
                adjustsFontSizeToFit
              />
            </View>

            <View
              style={{
                flexDirection: 'row-reverse',
                width:
                  sizeHelper.screenWidth > 450
                    ? sizeHelper.calWp(510)
                    : sizeHelper.calHp(500),
                alignItems: 'center',
                // height: 40,
                // paddingVertical: 8,
                // backgroundColor: AppColor.backColor,
                left: sizeHelper.screenWidth > 450 ? 5 : -5,
                top: sizeHelper.screenWidth > 450 ? 0 : -5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginHorizontal: 8,
                }}>
                <CustomButton
                  containerStyle={{
                    height: sizeHelper.calWp(45),
                    width: sizeHelper.calWp(120),
                    //   marginTop: sizeHelper.calHp(25),
                  }}
                  // isDisabled={isPromptModal && !value}
                  title={StringsList._2}
                  backgroundColor={AppColor.red}
                  titleColor={AppColor.white}
                  onPressButton={() => setCustomerNotesOpen(false)}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}>
                <CustomButton
                  containerStyle={{
                    height: sizeHelper.calWp(45),
                    width: sizeHelper.calWp(120),
                    //   marginTop: sizeHelper.calHp(25),
                  }}
                  // isDisabled={isPromptModal && !value}
                  title={StringsList._1}
                  backgroundColor={AppColor.blue2}
                  titleColor={AppColor.white}
                  onPressButton={() => setCustomerNotesOpen(false)}
                />
              </View>
            </View>
          </View>
        </>
      }
    />
  );
};

export default CustomerNotes;

const styles = StyleSheet.create({
  textInput: {
    height: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderColor: 'red',
    backgroundColor: AppColor.backColor,
    borderColor: AppColor.gray1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
  },
});
