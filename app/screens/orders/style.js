import { I18nManager, StyleSheet } from "react-native";
import AppColor from "../../constant/AppColor";
import sizeHelper from "../../helpers/sizeHelper";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColor.backColor,
    zIndex: 999,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: sizeHelper.calHp(10),
    marginHorizontal: sizeHelper.calHp(10),
    //  flexWrap: "wrap",
    // backgroundColor: "green"
  },
  titleValueStyle: {
    fontSize: sizeHelper.calHp(25),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
    textAlign: "left",
    //backgroundColor: "green"
  },
  titleValueStyle2: {
    fontSize: sizeHelper.calHp(25),
    color: AppColor.black,
    fontFamily: "ProximaNova-Regular",
    textAlign: "left",
    // backgroundColor: "green"
  },
  dashedLine: {
    marginTop: sizeHelper.calHp(2),
    width: sizeHelper.calWp(100),
    borderWidth: 1,
    borderStyle: "dashed",
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
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: sizeHelper.calHp(15),
    overflow: "hidden",
    margin: sizeHelper.calWp(10),
    backgroundColor: AppColor.red,
  },
  deleteButton: {
    backgroundColor: AppColor.red,
    justifyContent: "center",
    alignItems: "center",
    width: sizeHelper.calWp(100),
    borderRadius: sizeHelper.calHp(15),
  },
  productListContainer: {
    marginTop: sizeHelper.calHp(4),
    alignSelf: "center",
    width: "100%",
    height: "100%",
    // height: sizeHelper.calHp(540),
    alignItems: "center",
    // marginStart: sizeHelper.calWp(-15),
    //marginEnd: sizeHelper.calWp(-15)
  },
  selectedProductListContainer: {
    marginTop: sizeHelper.calHp(4),
    alignSelf: "center",
    width: "100%",
    height: sizeHelper.calHp(550),
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: sizeHelper.calHp(10),
    alignItems: "center",
  },
  buttonsContainerV2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: sizeHelper.calHp(10),
    alignItems: "flex-end",
    backgroundColor: AppColor.yellowColor,
    flex: 1,
    alignSelf: "flex-end",

    // marginLeft: sizeHelper.calWp(20),
  },
  buttonStyle: {
    height: sizeHelper.calWp(50),
    // flex: 1,
    // width: "69%",
  },
  buttonStyle2: {
    height: sizeHelper.calWp(60),
    // flex: 1,
    width: "90%",
  },
  invoiceContainer: {
    borderRadius: sizeHelper.calWp(5),
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calHp(20),
    width: "90%",
    height: "50%",
    backgroundColor: AppColor.white,
  },
  invoiceHeader: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: sizeHelper.calHp(0),
  },
  invoiceHeaderText: {
    fontSize: sizeHelper.calHp(30),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
  },

  viewShotStyle: {
    width: "100%",
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calHp(30),
    backgroundColor: AppColor.white,
    paddingBottom: sizeHelper.calHp(100),
  },
  qtyContainer: {
    width: "30%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  invoiceListContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: sizeHelper.calHp(5),
  },
  divider: {
    width: "100%",
    backgroundColor: AppColor.black,
    height: sizeHelper.calHp(2),
    marginTop: sizeHelper.calHp(15),
    marginBottom: sizeHelper.calHp(10),
  },
  invoiceButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: sizeHelper.calWp(20),
  },
  invoiceButtonStyle: {
    height: sizeHelper.calWp(45),
    width: sizeHelper.calWp(150),
    marginTop: sizeHelper.calHp(10),
    marginEnd: sizeHelper.calHp(20),
  },
  inputField: {
    textAlignVertical: "center",
    textAlign: I18nManager.isRTL ? "left" : "right",
    padding: 0,
    paddingStart: sizeHelper.calWp(1),
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(40),
    backgroundColor: "transparent",

    fontFamily: "ProximaNova-Regular",
    fontSize: sizeHelper.calHp(25),
    color: AppColor.black,
    // textAlign: "left"
  },
  input: {
    height: 35,
    // margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderColor: AppColor.gray1,
    width: 140,
    borderRadius: 5,
  },

  iconView: { alignItems: "center" },
  iconTextView: { alignItems: "center", marginLeft: sizeHelper.calWp(10) },
  text: {
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(18),
  },
  iconContainer: {
    width: sizeHelper.calWp(60),
    height: sizeHelper.calHp(60),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: sizeHelper.calWp(30),
  },
  swipeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  swipeButtonContainer: {
    width: "100%",
    borderRadius: 30,
  },
  textInput: {
    height: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    borderColor: "red",
    backgroundColor: AppColor.backColor,
    borderColor: AppColor.gray,
    justifyContent: "center",
    alignItems: "center",
  },

  //  Dropdown 1 style

  dropdown1BtnStyle: {
    width: sizeHelper.calWp(265),
    height: sizeHelper.calHp(65),
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.gray1,
  },
  dropdown1BtnTxtStyle: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },

  dropdown1DropdownStyle: { backgroundColor: "#fff" },
  dropdown1RowStyle: {
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
  },
  dropdown1RowTxtStyle: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },
  dropdown1SelectedRowStyle: { backgroundColor: "#fff" },

  // Dropdown 2 style

  dropdown2BtnStyle: {
    width: sizeHelper.calWp(265),
    height: sizeHelper.calHp(65),
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.gray1,
  },
  dropdown2BtnTxtStyle: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },

  dropdown2DropdownStyle: { backgroundColor: "#fff" },
  dropdown2RowStyle: {
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
  },
  dropdown2RowTxtStyle: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },
  dropdown2SelectedRowStyle: { backgroundColor: "#fff" },

  // DropdownStyle 3

  dropdown3BtnStyle: {
    width: sizeHelper.calWp(530),
    height: sizeHelper.calWp(65),
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.gray1,
  },
  dropdown3BtnTxtStyle: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },

  dropdown3DropdownStyle: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
  },
  dropdown3RowStyle: {
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
  },
  dropdown3RowTxtStyle: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },
  dropdown3SelectedRowStyle: { backgroundColor: "#fff" },

  // Dropdown Small

  dropdownSmall: {
    width: sizeHelper.calWp(200),
    height: sizeHelper.calHp(50),

    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.gray1,
  },
  dropdownPayment: {
    width: 250,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.gray1,
  },
  dropdownBtnTxtSmall: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },

  dropdownDropdownStyleSmall: { backgroundColor: "#fff" },
  dropdownRowStyleSmall: {
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
    height: 35,
  },
  dropdownRowTxtStyleSmall: {
    color: AppColor.black,
    textAlign: "left",
    fontFamily: "Proxima Nova Bold",
    fontSize: sizeHelper.calHp(20),
  },
  dropdownSelectedRowStyleSmall: { backgroundColor: "#fff" },
  dropdownSmallView: {
    width: sizeHelper.calWp(160),
    height: sizeHelper.calHp(50),

    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.gray1,
  },
});

export default styles;
