import React, { useState } from "react";
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";

const CustomMenu = ({ onSelect, menuList }) => {
  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;
  const [selected, setSelected] = useState(0);
  const onPressHandler = (id) => {
    setSelected(id);
  };
  const TopNavigation = () => (
    <View
      style={
        {
          // marginEnd: sizeHelper.calWp(30),
        }
      }
    >
      <Menu
        onSelect={(value) => {
          alert(`User selected the number ${value}`);
        }}
      >
        <MenuTrigger renderTouchable={renderTouchable}>
          <Text
            style={{
              fontSize: sizeHelper.calHp(30),
              color: AppColor.gray2,
              fontFamily: "Proxima Nova Bold",
            }}
          >
            ...
          </Text>
          {/* <Icon
            name={'suitcase'}
            size={
              sizeHelper.screenWidth > 450
                ? sizeHelper.calWp(30)
                : sizeHelper.calWp(35)
            }
            color={AppColor.black}
          /> */}
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            width: 150,
            // backgroundColor: 'green',
            marginTop: sizeHelper.calWp(32),
            borderRadius: sizeHelper.calWp(2),
            elevation: 20,
            paddingHorizontal: sizeHelper.calWp(10),
          }}
        >
          {menuList.map((item, index) => (
            <MenuOption
              renderTouchable={renderTouchable}
              key={item.id}
              value={item.id}
            >
              {index !== 0 && (
                <View
                  style={{
                    marginBottom: sizeHelper.calHp(5),
                    borderBottomWidth: 0,
                    borderBottomColor: AppColor.black,
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => onPressHandler(item.id)}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor:
                    item.id === selected ? AppColor.blue : AppColor.white,
                  height: 20,
                  // width: 50,
                }}
              >
                {/* {item.icon} */}
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(20),
                    marginStart: sizeHelper.calWp(5),
                    fontFamily: "Proxima Nova Bold",
                    alignSelf: "center",
                    textAlign: "center",
                    color:
                      item.id === selected ? AppColor.white : AppColor.black,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
  return (
    <View>
      <TopNavigation />
    </View>
  );
};
export default CustomMenu;
