import React from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  I18nManager,
  Image,
} from "react-native";
import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";

const CustomModal = ({
  onModalShow,
  displayModal,
  message,
  isPromptModal,
  setisPromptModal,
  onChangeText,
  value,
  isConfirmation,
  reacallFunc,
  placeholderText,
  type,
  children,
  title,
}) => {
  // console.log('value alert', value, isPromptModal, value === 'undefined');
  return (
    <Modal visible={displayModal} transparent={true} animationType={"fade"}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // borderRadius: 25,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <View
          style={{
            backgroundColor: AppColor.blue1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "75%",
            padding: sizeHelper.calWp(15),
            borderTopRightRadius: sizeHelper.calHp(10),
            borderTopLeftRadius: sizeHelper.calHp(10),
          }}
        >
          <Text
            style={{
              fontSize: sizeHelper.calHp(25),
              color: AppColor.white,
              fontFamily: "Proxima Nova Bold",
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onModalShow(false);
              setisPromptModal(false);
            }}
          >
            <Image
              style={{
                width: sizeHelper.calHp(35),
                height: sizeHelper.calHp(35),
                resizeMode: "contain",
              }}
              source={require("../assets/images/cross.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "75%",
            backgroundColor: AppColor.blue1,
            height: sizeHelper.calHp(2),
            // borderWidth: 0.5,
            // marginTop: sizeHelper.calHp(15),
            // marginBottom: sizeHelper.calHp(10),
          }}
        />
        <View
          style={{
            width: "75%",
            backgroundColor: AppColor.white,
            paddingVertical: sizeHelper.calHp(30),
            paddingHorizontal: sizeHelper.calWp(25),
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: sizeHelper.calHp(10),
            borderBottomRightRadius: sizeHelper.calHp(10),
          }}
        >
          <View
            style={{
              alignItems: "center",
              width: "100%",
            }}
          >
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;
