import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';

const CustomDropDown = ({
  buttonBackroundColor,
  titleColor,
  placeholderTitle,
  items,
  setItems,
  onChangeValue,
  dropDownWidth,
  dropDownHeight,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <FlatList
      nestedScrollEnabled
      style={{
        marginTop: sizeHelper.calHp(13),
        marginHorizontal: sizeHelper.calWp(13),
        backgroundColor: AppColor.blue1,
        zIndex: 999,
      }}
      // contentContainerStyle={{padding: 5}}
      data={[
        { name: 'kk' },
        { name: 'kakdk' },
        { name: 'lskjfoia' },
        { name: 'kakdk' },
        { name: 'lskjfoia' },
        { name: 'kakdk' },
        { name: 'lskjfoia' },
        { name: 'kk' },
        { name: 'kakdk' },
        { name: 'lskjfoia' },
        { name: 'kakdk' },
        { name: 'lskjfoia' },
        { name: 'kakdk' },
        { name: 'lskjfoia' },
      ]}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{
              zIndex: 999,

              backgroundColor: AppColor.yellowColor,
            }}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
};

export default CustomDropDown;
