import {I18nManager, StyleSheet} from 'react-native';
import AppColor from '../../constant/AppColor';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColor.gray4,
  },

  title: {
    fontSize: 32,
  },
  amountDetailsContianer: {
    backgroundColor: AppColor.white,
    // marginTop: sizeHelper.calHp(22),
    borderRadius: sizeHelper.calWp(15),
    borderWidth: 1,
    borderColor: AppColor.gray2,
  },
  titleValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizeHelper.calHp(10),
    //  flexWrap: "wrap",
    // backgroundColor: "green"
  },
  titleValueStyle: {
    fontSize: sizeHelper.calHp(30),
    color: AppColor.black,
    //fontFamily: 'Proxima Nova Bold',
    textAlign: 'left',
    fontWeight: 'bold',
    //backgroundColor: "green"
  },
  titleValueStyle2: {
    fontSize: sizeHelper.calHp(25),
    color: AppColor.black,
    fontFamily: 'Proxima Nova Regular',
    textAlign: 'left',
    // backgroundColor: "green"
  },
  dashedLine: {
    marginTop: sizeHelper.calHp(2),
    width: sizeHelper.calWp(100),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    zIndex: 0,
  },
  productItemContainer: {
    marginTop: sizeHelper.calHp(18),
    marginEnd: sizeHelper.calWp(22),
  },
  hiddenItemContainer: {
    flex: 1,
    height: sizeHelper.calHp(120),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: sizeHelper.calHp(15),
    overflow: 'hidden',
    margin: sizeHelper.calWp(7),
    backgroundColor: AppColor.red,
  },
  deleteButton: {
    backgroundColor: AppColor.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeHelper.calWp(100),
    borderRadius: sizeHelper.calHp(15),
  },
  productListContainer: {
    marginTop: sizeHelper.calHp(4),
    alignSelf: 'center',
    width: '100%',
    height: sizeHelper.calHp(540),
    alignItems: 'center',
    // marginStart: sizeHelper.calWp(-15),
    //marginEnd: sizeHelper.calWp(-15)
  },
  selectedProductListContainer: {
    marginTop: sizeHelper.calHp(4),
    alignSelf: 'center',
    width: '100%',
    height: sizeHelper.calHp(550),
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.popUpBackgroundColor,
    zIndex: 9999,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizeHelper.calHp(15),
    alignItems: 'center',
  },
  buttonsContainerV2: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: sizeHelper.calHp(20),
    alignItems: 'center',
  },
  buttonStyle: {
    height: sizeHelper.calWp(50),
    width: sizeHelper.calWp(150),
  },
  invoiceContainer: {
    borderRadius: sizeHelper.calWp(5),
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calHp(20),
    width: '90%',
    height: '50%',
    backgroundColor: AppColor.white,
  },
  invoiceHeader: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: sizeHelper.calHp(0),
  },
  invoiceHeaderText: {
    fontSize: sizeHelper.calHp(30),
    color: AppColor.black,
    // fontFamily: 'Proxima Nova Bold',
    fontWeight: 'bold',
  },

  viewShotStyle: {
    width: '100%',
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calHp(30),
    backgroundColor: AppColor.white,
    paddingBottom: sizeHelper.calHp(100),
  },
  qtyContainer: {
    width: '30%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  invoiceListContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: sizeHelper.calHp(0),
  },
  divider: {
    width: '100%',
    backgroundColor: AppColor.black,
    height: sizeHelper.calHp(2),
    marginTop: sizeHelper.calHp(10),
    marginBottom: sizeHelper.calHp(5),
  },
  invoiceButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: sizeHelper.calWp(20),
  },
  invoiceButtonStyle: {
    height: sizeHelper.calWp(45),
    width: sizeHelper.calWp(150),
    marginTop: sizeHelper.calHp(10),
    marginEnd: sizeHelper.calHp(20),
  },
  inputField: {
    textAlignVertical: 'center',
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(40),
    backgroundColor: 'transparent',

    fontFamily: 'ProximaNova-Regular',
    fontSize: sizeHelper.calHp(25),
    color: AppColor.black,
    // textAlign: "left"
  },
  textInput: {
    height: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '95%',
    borderRadius: 5,
    borderColor: 'red',
    backgroundColor: AppColor.backColor,
    borderColor: AppColor.gray,
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
  },
});

export default styles;
