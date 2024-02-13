import { StyleSheet } from 'react-native';
import AppColor from '../../constant/AppColor';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColor.blue1,
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: AppColor.blue1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'green',
  },
  renderItemContainer: {
    width: sizeHelper.calWp(150),
    height: sizeHelper.calHp(150),
    alignItems: 'center',
  },
  aromatic: {
    color: AppColor.orange3,
    fontSize: sizeHelper.calHp(40),
    fontFamily: 'ProximaNova-Regular',
    alignSelf: 'center',
  },
  pointOfSale: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(48),
    fontFamily: 'ProximaNova-Semibold',
    marginTop: sizeHelper.calHp(15),
    alignSelf: 'center',
  },
  carouselItemsContainer: {
    height: sizeHelper.calWp(270),
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItemsContainerV2: {
    width: sizeHelper.calWp(250),
    height: sizeHelper.calWp(250),
    borderRadius: sizeHelper.calWp(250) / 2,
    borderWidth: 1,
    borderColor: AppColor.blue3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItemsInnerContainer: {
    width: sizeHelper.calWp(220),
    height: sizeHelper.calWp(220),
    borderRadius: sizeHelper.calWp(220) / 2,
    backgroundColor: AppColor.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItemCount: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(48),
    fontFamily: 'ProximaNovaCond-light',
    marginHorizontal: sizeHelper.calHp(15),
    alignSelf: 'center',
  },
  carouselItemTittle: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(26),
    fontFamily: 'ProximaNova-Semibold',
    marginTop: sizeHelper.calHp(15),
    alignSelf: 'center',
  },
  itemTittle: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(20),
    fontFamily: 'ProximaNova-Semibold',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: AppColor.white,
  },
  itemsBottomLine: {
    width: sizeHelper.calWp(23),
    height: sizeHelper.calHp(5),
    overflow: 'hidden',
  },
  divider: {
    backgroundColor: AppColor.blue4,
    height: sizeHelper.calHp(1),
    position: 'absolute',
    bottom: 1.2,
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.popUpBackgroundColor,
  },
});

export default styles;
