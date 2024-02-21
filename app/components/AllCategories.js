import React, {Children, useEffect} from 'react';
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

import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import CategoryItem from './CategoryItem';

const AllCategories = ({
  data,
  onPressItem,
  focus,
  flatListRef,
  disabled,
  onInvoiceClick,
  orderNumber,
  children,
  childrenStyle,
  storageItems,
  selectedProducts,
  StringsList,
  orderDetails,
  TerminalConfiguration,
}) => {
  const renderItems = ({item, index}) => {
    return (
      <View style={{marginStart: sizeHelper.calWp(9)}}>
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
        <Text style={styles.categorytitle}>{StringsList._524}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {storageItems ? (
            <>
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.invoiceContainer,
                  {
                    padding: sizeHelper.calHp(10),
                    paddingHorizontal: sizeHelper.calHp(20),
                    borderRadius: sizeHelper.calHp(30),
                    backgroundColor: AppColor.green,
                    marginTop: sizeHelper.calHp(10),
                    marginEnd: sizeHelper.calHp(15),
                    // flexDirection: 'row',
                    // left: sizeHelper.calHp(180),
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <View style={childrenStyle}>{children}</View>
              </TouchableOpacity>
            </>
          ) : orderDetails ? (
            <>
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.invoiceContainer,
                  {
                    padding: sizeHelper.calHp(10),
                    paddingHorizontal: sizeHelper.calHp(20),
                    borderRadius: sizeHelper.calHp(30),
                    backgroundColor: AppColor.green,
                    marginTop: sizeHelper.calHp(10),
                    marginEnd: sizeHelper.calHp(15),
                    // flexDirection: 'row',
                    // left: sizeHelper.calHp(180),
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <View style={childrenStyle}>{children}</View>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          contentContainerStyle={{padding: 5}}
          data={data}
          renderItem={renderItems}
          // keyExtractor={(item) => item.ProductFamilyCode}
          keyExtractor={item => '_' + item.ProductFamilyCode.toString()}
          key={item => '_' + item.ProductBarCode.toString()}
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
    marginTop: sizeHelper.calHp(15),
    marginStart: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(26),
    color: AppColor.blue5,
    fontFamily: 'Proxima Nova Bold',
  },
});
export default AllCategories;
