import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryItem = ({
  isSelected,
  onPressItem,
  item,
  focus,
  index,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPressItem(item, index)}
      style={[
        styles.mainContainer,
        {
          borderColor: index === focus ? AppColor.yellowColor : AppColor.gray2,
        },
      ]}>
      {item.MediaContents ? (
        <Image
          source={{ uri: item.MediaContentType + ',' + item.MediaContents }}
          style={styles.categoryImage}
        />
      ) : (
        <View style={styles.categoryImage}>
          <Icon
            name="file-image-o"
            size={sizeHelper.calWp(50)}
            color={AppColor.black + '36'}
          />
        </View>
      )}
      <Text style={styles.title}>
        {I18nManager.isRTL ? item.ProductFamilyName2 : item.ProductFamilyName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: sizeHelper.calHp(150),
    width: sizeHelper.calWp(165),
    paddingTop: sizeHelper.calHp(13),
    paddingBottom: sizeHelper.calHp(17),
    borderRadius: sizeHelper.calWp(5),
    paddingHorizontal: sizeHelper.calWp(11),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calWp(5),
    shadowColor: AppColor.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
    backgroundColor: AppColor.white,
  },
  categoryImage: {
    height: sizeHelper.calHp(80),
    width: sizeHelper.calWp(155),
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(15),
    color: AppColor.black,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Semibold',
  },
});

export default CategoryItem;
