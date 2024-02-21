import { StyleSheet } from "react-native";
import AppColor from "../../constant/AppColor";
import sizeHelper from "../../helpers/sizeHelper";
import { I18nManager } from "react-native";

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: AppColor.blue1,
    justifyContent: "center",
    //
    alignItems: "center",
  },
  signinText: {
    fontSize: sizeHelper.calHp(24),
    color: AppColor.black,
    marginTop: sizeHelper.calHp(18),
    fontFamily: "ProximaNova-Regular",
  },
  inputContainer: {
    width: sizeHelper.calWp(609),
    height: sizeHelper.calHp(80),
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(30),
    paddingStart: sizeHelper.calWp(27),
    marginTop: sizeHelper.calHp(50),
    alignItems: "center",
    flexDirection: "row",
    borderColor: AppColor.red,
    borderRadius: sizeHelper.calWp(5),
    borderWidth: 1,
  },
  popupContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.popUpBackgroundColor,
    zIndex: 9999,
  },
  inputField: {
    textAlignVertical: "center",
    padding: 0,
    paddingStart: sizeHelper.calWp(18),
    width: sizeHelper.calWp(510),
    marginEnd: sizeHelper.calWp(10),
    height: sizeHelper.calHp(75),
    backgroundColor: AppColor.white,
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  signinButtonContainer: {
    paddingVertical: sizeHelper.calWp(10),
    backgroundColor: AppColor.orange,
    borderRadius: sizeHelper.calHp(25.5),
    paddingHorizontal: sizeHelper.calWp(35),
    marginTop: sizeHelper.calHp(40),
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    //marginEnd: sizeHelper.calWp(74),
  },
  buttonText: {
    // textAlign: 'left',
    textAlignVertical: "center",
    fontSize: sizeHelper.calHp(24),
    color: AppColor.white,
    fontFamily: "ProximaNova-Semibold",
    marginEnd: sizeHelper.calWp(4),
  },
  errorText: {
    //textAlign: 'right',
    color: AppColor.orange,
    fontFamily: "ProximaNova-Semibold",
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(20),

    marginStart: sizeHelper.calWp(55),
  },
  input: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "space-between",
    flex: 0.8,
    alignItems: "center",
    backgroundColor: AppColor.white,
    fontSize: 15,
    color: "#424242",
    margin: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  bgimg: {
    position: "absolute",
    width: 250,
    height: 200,
    top: 0,
    // right: I18nManager.isRTL ? 0 : width - 250,
  },
  intro: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: AppColor.blue,
  },
  topView: {
    flex: 1,
    backgroundColor: AppColor.blue,
  },
});

export default styles;
