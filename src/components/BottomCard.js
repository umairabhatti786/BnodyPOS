import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { colors } from "../utils/colors";
import { images } from "../assets/images";
import {
  CustomHeartIcon,
  FillHeartIcon,
  UnFillHeartIcon,
} from "../assets/SVG/svg";
import CustomText from "./CustomText";
import { SFCompact } from "../utils/Fonts";
import sizeHelper from "../assets/helpers/sizeHelper";
import FastImage from "react-native-fast-image";
const BottomCard = React.memo(({ item, navigation, onAddFav }) => {
  const formatDate = (dateString) => {
    const eventDateParts = dateString.split("-");
    const day = parseInt(eventDateParts[0], 10);
    const month = parseInt(eventDateParts[1], 10) - 1; // Month is zero-based
    const year = parseInt(eventDateParts[2], 10);

    let eventDate = new Date(year, month, day);

    // Format the date as "Sun, Jan 28"
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = eventDate.toLocaleString("en-US", options);

    return formattedDate;
  };
  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(" ") + "";
      return truncatedText;
    } else {
      return text;
    }
  }
  return (
    <TouchableOpacity
      key={item._id}
      onPress={() => {
        navigation.navigate("Details", { eventId: item._id });
      }}
      style={styles.cardMain}
    >
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          {item.event_image !== null ? (
            <FastImage
              style={styles.img}
              source={{ uri: item.event_image }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <FastImage
              source={images.card}
              resizeMode="cover"
              style={styles.img}
            />
          )}
        </View>
        <View style={styles.centerContainer}>
          <Text style={{...styles.name,fontWeight:"700"}}>{truncateText(item.event_title, 10)}</Text>

          <View style={styles.eventContainer}>
            <View>
              <Text

               style={{...styles.eventName,}}>
                {truncateText(item.event_location?.neighborhood, 3)}
              </Text>
            </View>

            <View style={styles.div} />
            <View>
              <Text style={styles.date}>{formatDate(item.event_date)}</Text>
            </View>

            {/* <Text style={styles.date}>{item.event_date}</Text> */}
          </View>
          <View style={styles.tagsContainer}>
            {Array.isArray(item.event_tags) &&
              item.event_tags.length > 0 &&
              item.event_tags[0].split(",").map((tag) => (
                <ImageBackground
                  key={tag} // Add a unique key for each tag
                  style={styles.tagBody}
                  source={images.tag}
                  imageStyle={{ borderRadius: 50 }}
                >
                  <View style={{ padding: 5 }}>
                    <Text style={{...styles.tagName,fontWeight:"700"}}>{tag}</Text>
                  </View>
                </ImageBackground>
              ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onAddFav(item)}
          style={styles.heartContainer}
        >
          {item.favEvent.isFav === true ? (
            <FillHeartIcon style={{ height: 20, width: 20 }} />
          ) : (
            <UnFillHeartIcon
              style={{ height: 25, width: 25 }}
              fill={"#cfb34e"}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  cardMain: {
    marginHorizontal: 10,
    alignContent: "center",
    justifyContent: "center",
    width: sizeHelper.screenWidth > 450 ? 550 : 400,
    marginBottom: 30,
    padding: 7,
  },
  cardContainer: {
    backgroundColor: "#F2ECEC",
    // width: "80%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 10,
    // marginVertical: 5,
    padding: 10,
  },
  imageContainer: { justifyContent: "center" },
  img: { height: 70, width: 61, borderRadius: 5 },
  centerContainer: {
    width: Platform.OS === "ios" ? "68%" : "68%",
    // Platform.OS === "ios"
    //   ? "60%"
    //   : sizeHelper.screenWidth > 450
    //   ? "60%"
    //   : "70%",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    //   fontWeight: '700',
    color: colors.black,
    marginHorizontal: 5,
    // textShadowColor: 'rgba(0, 0, 0, 0.65)',
    // textShadowOffset: {width: 2, height: 2},
    // textShadowRadius: 3,
    fontFamily: SFCompact.bold,
    top: -2,
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    width: "72%",
    justifyContent: "space-between",
  },
  eventName: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 5,
    fontFamily: SFCompact.regular,
    marginHorizontal: 5,
  },
  div: {
    height: 5,
    width: 5,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    marginHorizontal: 5,
    // marginRight: 5,
  },
  date: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 5,
    fontFamily: SFCompact.regular,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    marginHorizontal: 5,
    left: -12,
  },
  tagBody: {
    marginHorizontal: 10,
    height: 25,
    // width: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  tagName: {
    fontSize: 12,

    color: colors.black,
    fontFamily: SFCompact.regular,
    top: -3,
    textAlign: "center",
  },
  heartContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  fillIcon: { height: 20, width: 20 },
});
export default BottomCard;
