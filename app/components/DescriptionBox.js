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

const DescriptionBox = ({
  descriptionDetail,
  setDescriptionDetail,
  descriptionModal,
  setDescriptionModal,
  selectedProductNotes,
  onSaveNotes,
  StringsList,
}) => {
  return (
    <>
      <CustomModal
        title={StringsList._43}
        displayModal={descriptionModal}
        onModalShow={setDescriptionModal}
        setisPromptModal={() => {}}
        isPromptModal={false}
        children={
          <>
            <View>
              <View
                style={{
                  width:
                    sizeHelper.screenWidth > 450
                      ? sizeHelper.calWp(520)
                      : sizeHelper.calHp(500),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={styles.textInput}
                  placeholder={StringsList._529}
                  placeholderTextColor={AppColor.black}
                  value={descriptionDetail}
                  onChangeText={setDescriptionDetail}
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
              <View>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    width:
                      sizeHelper.screenWidth > 450
                        ? sizeHelper.calWp(510)
                        : sizeHelper.calHp(500),
                    alignItems: 'center',
                    left: 15,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 8,
                    }}>
                    <CustomButton
                      containerStyle={{
                        height: sizeHelper.calWp(45),
                        width: sizeHelper.calWp(120),
                      }}
                      title={StringsList._2}
                      backgroundColor={AppColor.red}
                      titleColor={AppColor.white}
                      onPressButton={setDescriptionModal}
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
                      }}
                      title={StringsList._1}
                      backgroundColor={AppColor.blue2}
                      titleColor={AppColor.white}
                      onPressButton={() => onSaveNotes(selectedProductNotes)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </>
        }
      />
    </>
  );
};
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
export default DescriptionBox;
