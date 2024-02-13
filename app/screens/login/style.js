import { StyleSheet } from 'react-native';
import AppColor from '../../constant/AppColor';
import sizeHelper from '../../helpers/sizeHelper';
import { I18nManager } from 'react-native';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: AppColor.blue1,
    //justifyContent: 'center',
    //
    alignItems: 'center',
  },
  signinText: {
    fontSize: sizeHelper.calHp(24),
    color: AppColor.orange3,
    marginTop: sizeHelper.calHp(18),
    fontFamily: 'ProximaNova-Regular',
  },
  inputContainer: {
    width: sizeHelper.calWp(609),
    height: sizeHelper.calHp(64),
    backgroundColor: 'white',
    borderRadius: sizeHelper.calHp(30),
    paddingStart: sizeHelper.calWp(27),
    marginTop: sizeHelper.calHp(99),
    alignItems: 'center',
    flexDirection: 'row',
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
  inputField: {
    textAlignVertical: 'center',
    padding: 0,
    paddingStart: sizeHelper.calWp(18),
    width: sizeHelper.calWp(510),
    marginEnd: sizeHelper.calWp(10),
    height: sizeHelper.calHp(60),
    backgroundColor: AppColor.white,
    fontFamily: 'Proxima Nova Bold',
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  signinButtonContainer: {
    paddingVertical: sizeHelper.calWp(10),
    backgroundColor: AppColor.orange,
    borderRadius: sizeHelper.calHp(25.5),
    paddingHorizontal: sizeHelper.calWp(35),
    marginTop: sizeHelper.calHp(40),
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    //marginEnd: sizeHelper.calWp(74),
  },
  buttonText: {
    // textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: sizeHelper.calHp(24),
    color: AppColor.white,
    fontFamily: 'ProximaNova-Semibold',
    marginEnd: sizeHelper.calWp(4),
  },
  errorText: {
    //textAlign: 'right',
    color: AppColor.orange,
    fontFamily: 'ProximaNova-Semibold',
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(20),

    marginStart: sizeHelper.calWp(55),
  },
});

export default styles;
