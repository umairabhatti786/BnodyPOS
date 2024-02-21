import { StyleSheet } from "react-native";
import AppColor from "../../constant/AppColor";
import sizeHelper from "../../helpers/sizeHelper";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColor.white,
    flex: 1,
  },
  topContainer: {
    // flex: 1,
    backgroundColor: AppColor.white,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    // flex: 1,
    backgroundColor: AppColor.backColor,

    // justifyContent: 'center',
    // alignItems: 'center',
    top: sizeHelper.screenWidth > 450 ? 0 : 20,
  },
  renderItemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  termianal: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(20),
    fontFamily: "ProximaNova-Semibold",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  overView: {
    color: AppColor.black,
    fontSize: sizeHelper.calHp(36),
    fontFamily: "ProximaNova-Semibold",
    alignSelf: "center",
  },
  agentName: {
    color: AppColor.black,
    fontSize: sizeHelper.calHp(40),
    fontFamily: "ProximaNova-Semibold",
    alignSelf: "center",
  },
  pointOfSale: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(48),
    fontFamily: "ProximaNova-Semibold",
    marginTop: sizeHelper.calHp(15),
    alignSelf: "center",
  },

  carouselItemsContainerV2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.white,
  },
  divider: {
    width: "95%",
    height: sizeHelper.calHp(2),
    borderBottomWidth: sizeHelper.calHp(2),
    borderBottomColor: AppColor.gray2,
    marginHorizontal: sizeHelper.calHp(22),
    // marginBottom: sizeHelper.calHp(10),
  },
  carouselItemsInnerContainer: {
    width: sizeHelper.calWp(150),
    height: sizeHelper.calWp(150),
    borderRadius: sizeHelper.calWp(150) / 2,
    backgroundColor: AppColor.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  carouselItemCount: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: "ProximaNovaCond-light",
    marginHorizontal: sizeHelper.calHp(15),
    alignSelf: "center",
  },
  carouselItemTittle: {
    color: AppColor.black,
    fontSize: sizeHelper.calHp(20),
    fontFamily: "ProximaNova-Semibold",
    marginTop: sizeHelper.calHp(35),
    alignSelf: "center",
  },
  itemTittle: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(25),
    fontFamily: "ProximaNova-Semibold",
    textAlign: "left",
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
    overflow: "hidden",
  },

  popupContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.popUpBackgroundColor,
  },
  terminalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.orange,

    padding: sizeHelper.calHp(2),
    borderRadius: sizeHelper.calHp(5),

    height: sizeHelper.calHp(30),
    // width: sizeHelper.calHp(100),
    marginTop: sizeHelper.calHp(10),
  },
});

export default styles;
