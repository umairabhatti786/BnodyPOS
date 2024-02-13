import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18n-js';

import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import CategoryItem from './CategoryItem';

const AllCategories = ({ data, onPressItem, focus, flatListRef, disabled }) => {
  const renderItems = ({ item, index }) => {
    return (
      <View style={{ marginStart: sizeHelper.calWp(9) }}>
        <CategoryItem
          onPressItem={onPressItem}
          isSelected={item.isSelected}
          item={item}
          focus={focus}
          disabled={disabled}
          index={index}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // paddingHorizontal: sizeHelper.calWp(40),
        }}>
        <Text style={styles.categorytitle}>
          {I18nManager.isRTL ? 'التصنيفات' : 'Categories'}
        </Text>
        {/* <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder="Search Product Name/Code"
          />
          <Icon
            name={'search'}
            size={sizeHelper.calWp(15)}
            color={AppColor.grayColor}
          />
        </View> */}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <TouchableOpacity>
          <Icon
            name={'angle-left'}
            size={sizeHelper.calWp(35)}
            color={AppColor.black}
          />
        </TouchableOpacity> */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          disabled={disabled}
          ref={flatListRef}
          style={{
            marginTop: sizeHelper.calHp(13),
            marginHorizontal: sizeHelper.calWp(13),
          }}
          contentContainerStyle={{ padding: 5 }}
          data={data}
          renderItem={renderItems}
          keyExtractor={item => item.ProductFamilyCode}
        />
        {/* <TouchableOpacity>
          <Icon
            name={'angle-right'}
            size={sizeHelper.calWp(35)}
            color={AppColor.black}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColor.white,
    //flex:1,
    //height:sizeHelper.calHp(142),
    paddingTop: sizeHelper.calHp(14),
    // paddingHorizontal: sizeHelper.calWp(24),
    //width:sizeHelper.screenWidth,
    paddingBottom: sizeHelper.calHp(15),
  },
  searchContainer: {
    width: sizeHelper.calWp(311),
    height: sizeHelper.calHp(32),
    backgroundColor: 'white',
    borderRadius: sizeHelper.calHp(5),
    paddingStart: sizeHelper.calWp(8),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: AppColor.gray2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  search: {
    textAlignVertical: 'center',
    padding: 0,
    paddingStart: sizeHelper.calWp(6),
    width: sizeHelper.calWp(280),
    height: sizeHelper.calHp(25),
    backgroundColor: 'white',
    fontSize: sizeHelper.calHp(18),
    fontFamily: 'ProximaNova-Regular',
  },
  categorytitle: {
    marginStart: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(22),
    color: AppColor.blue1,
    fontFamily: 'Proxima Nova Bold',
  },
});
export default AllCategories;
