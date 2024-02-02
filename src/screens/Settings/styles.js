import { Dimensions, Platform } from "react-native";
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
    marginVertical: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },

  transparent: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { height: 40, width: 40 },
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
    backgroundColor: "red",
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: Platform.OS=="ios"? 60:10
  },
  iconContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { height: 30, width: 30 },
});
