import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';

const ProductItem = ({item, onSelectProduct, TerminalConfiguration}) => {
  return (
    <TouchableOpacity
      // disabled={item.isSelected}
      onPress={() => onSelectProduct(item)}
      style={[
        styles.mainContainer,
        {borderColor: item.isSelected ? AppColor.yellowColor : AppColor.gray2},
      ]}>
      {item.MediaContents ? (
        <Image
          source={{uri: item.MediaContentType + ',' + item.MediaContents}}
          style={styles.categoryImage}
        />
      ) : (
        <View style={styles.categoryImage}>
          <Icon
            name="file-image-o"
            size={sizeHelper.calWp(50)}
            color={AppColor.black2}
          />
        </View>
      )}
      <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
        {I18nManager.isRTL ? item.ProductName2 : item.ProductName}
      </Text>
      <Text numberOfLines={1} style={styles.price}>
        {item?.PriceOriginal.toFixed(TerminalConfiguration.DecimalsInAmount)}
      </Text>
      {item.isSelected === true && (
        <Image
          source={require('../assets/images/selectedItemIcon.png')}
          style={[
            styles.selectedItemIcon,
            I18nManager.isRTL ? {left: -1} : {right: -1},
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: sizeHelper.calHp(200),
    width:
      sizeHelper.screenWidth > 450
        ? sizeHelper.screenWidth / 4 - sizeHelper.calWp(32)
        : sizeHelper.screenWidth / 3 - sizeHelper.calWp(30),
    paddingTop: sizeHelper.calHp(20),
    paddingBottom: sizeHelper.calHp(12),
    borderRadius: sizeHelper.calWp(5),
    paddingHorizontal: sizeHelper.calWp(5),
    borderWidth: 1,

    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: sizeHelper.calWp(5),
    //elevation: sizeHelper.calWp(5),
    backgroundColor: AppColor.white,
    // shadowColor: AppColor.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  categoryImage: {
    height: sizeHelper.calHp(80),
    width: sizeHelper.calWp(155),
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  title: {
    marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(15),
    color: AppColor.black,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Semibold',
  },
  price: {
    marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(16),
    color: AppColor.black,
    fontFamily: 'Proxima Nova Bold',
    fontWeight: 'bold',
  },
  selectedItemIcon: {
    position: 'absolute',
    height: sizeHelper.calHp(35),
    width: sizeHelper.calWp(35),
    resizeMode: 'cover',
    //backgroundColor: 'green',
    bottom: -1,

    alignSelf: 'flex-start',

    //transform: [I18nManager.isRTL ? {rotateY: '180deg'} : {rotate: '0deg'}],
  },
});

export default ProductItem;
