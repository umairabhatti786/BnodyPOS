import { Dimensions, Platform, StyleSheet } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import sizeHelper from "../../assets/helpers/sizeHelper";
const { height, width } = Dimensions.get("window");
export const styles = ScaledSheet.create({
  main: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor:"red",
    zIndex: 9999999999,
    // marginTop: Platform.OS == "ios" ? 50 : 20,

    marginHorizontal: 10,
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    padding: 5,
  },
  icon: {
    height: 30,
    width: 30,
  },
  iconImage: { height: 50, width: 50 },
  card: { height: 100, width: 80 },
  textContainer: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  modilizeContainer: {
    // flex: 1,
  },
  //
  content: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  content__modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
  },

  content__heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },
  sBox: {
    height: 30,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 20,
    backgroundColor: "lightblue",
  },

  //

  bottomView: { flex: 1, justifyContent: "flex-end" },
  bottomContnet: {
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  iconsContainer: {
    backgroundColor: "transparent",
    padding: 5,
  },
  bottomIcon: {
    height: sizeHelper.screenWidth > 450 ? 35 : 30,
    width: sizeHelper.screenWidth > 450 ? 35 : 30,
    borderRadius: 100,
  },
});
