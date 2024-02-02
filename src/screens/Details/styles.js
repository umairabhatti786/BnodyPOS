import { Dimensions } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import sizeHelper from "../../assets/helpers/sizeHelper";
import { SFCompact } from "../../utils/Fonts";
const { height, width } = Dimensions.get("window");
export const styles = ScaledSheet.create({
  flex: {
    height: 300,
    width: "98%",
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },

  iconContainer: {
    backgroundColor: "#D9D9D9",
    marginHorizontal: 8,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  textContainer: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  sBox: {
    height: 30,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: { height: 27, width: 27 },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 5,
  },
  tagBody: {
    marginHorizontal: 10,
    height: 25,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
  },
  tagName: {
    fontSize: 12,
    color: colors.black,
    fontFamily: SFCompact.regular,
    top: Platform.OS == "ios" ? 0 : -2,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scollInner: {
    justifyContent: "center",
    // marginVertical: 10,
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  eventHeader: { padding: 20, width: "100%" },
  cardsContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0EBD9",
    marginHorizontal: 20,
    borderWidth: 0.5,
    marginVertical: 10,
    borderColor: "#F0EBD9",
    width: 350,
  },
  detailsContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 20,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 20,
  },
  innerMapContainer: {
    height: 400,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  bottomView: {
    backgroundColor: colors.white,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
