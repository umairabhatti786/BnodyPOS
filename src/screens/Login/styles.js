import { Dimensions } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import sizeHelper from "../../assets/helpers/sizeHelper";
const { height, width } = Dimensions.get("window");
export const styles = ScaledSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  bgImage: {
    height: 300,
    width: sizeHelper.screenWidth > 450 ? width - 10 : width - 20,
    top: sizeHelper.screenWidth > 450 ? "65%" : "62%",
    left: 0,
    right: 0,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999999,
    marginHorizontal: sizeHelper.screenWidth > 450 ? 0 : 10,
    borderRadius: 50,
  },
  sBox: {
    height: 75,
    width: 200,
    position: "absolute",

    top: -30,
    bottom: 0,
    zIndex: 999999999,
    justifyContent: "center",
    alignItems: "center",
    left: sizeHelper.screenWidth > 450 ? 200 : 105,
    right: sizeHelper.screenWidth > 450 ? 200 : 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  touches: {
    backgroundColor: colors.white,
    height: 60,
    width: width - 90,
    borderRadius: 100,
    marginVertical: 10,
    flexDirection: "row",
    // justifyContent: 'space-around',
    alignItems: "center",
  },
  innerView: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
