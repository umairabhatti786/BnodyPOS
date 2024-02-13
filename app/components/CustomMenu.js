import React, { useState } from 'react';
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-menu';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import sizeHelper from '../helpers/sizeHelper';
import AppColor from '../constant/AppColor';

export const CustomMenu = ({ menuList, onSelect }) => {
  const renderTouchable = () => <TouchableOpacity></TouchableOpacity>;

  const TopNavigation = () => (
    <View
      style={{
        marginEnd: sizeHelper.calWp(30),
      }}>
      <Menu
        useNativeDriver={true}
        onSelect={value => alert(`User selected the number ${value}`)}>
        <MenuTrigger
          useNativeDriver={true}
          renderTouchable={renderTouchable}>
          <Icon
            name={'suitcase'}
            size={
              sizeHelper.screenWidth > 450
                ? sizeHelper.calWp(30)
                : sizeHelper.calWp(35)
            }
            color={AppColor.black}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            width: 10,
            // backgroundColor: 'green',
            marginTop: sizeHelper.calWp(32),
            borderRadius: sizeHelper.calWp(2),
            elevation: 20,
            paddingHorizontal: sizeHelper.calWp(10),
          }}>
          {menuList.map((item, index) => (
            <MenuOption
              renderTouchable={renderTouchable}
              key={item.id}
              value={item.id}>
              {index !== 0 && (
                <View
                  style={{
                    marginBottom: sizeHelper.calHp(5),
                    borderBottomWidth: 1,
                    borderBottomColor: AppColor.black,
                  }}
                />
              )}
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                {item.icon}
                <Text
                  style={{
                    fontSize: sizeHelper.calHp(20),
                    marginStart: sizeHelper.calWp(5),
                    fontFamily: 'Proxima Nova Bold',
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: item.color,
                  }}>
                  {item.title}
                </Text>
              </View>
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
