import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
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
import FastImage from "react-native-fast-image";
import sizeHelper from "../assets/helpers/sizeHelper";
const Card = React.memo(({ item, navigation, onAddFav }) => {
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
          <Text style={styles.name}>{item.event_title}</Text>

          <View style={styles.eventContainer}>
            <View>
              <Text numberOfLines={1} style={styles.eventName}>
                {truncateText(item.event_location?.neighborhood, 3)}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginHorizontal: 4,
              }}
            >
              <View style={styles.div} />
            </View>

            <View>
              <Text numberOfLines={1} style={styles.date}>
                {formatDate(item.event_date)}
              </Text>
            </View>

            {/* <Text style={styles.date}>{item.event_date}</Text> */}
          </View>
          <View style={styles.tagsContainer}>
            {Array.isArray(item.event_tags) &&
              item.event_tags.length > 0 &&
              item.event_tags.map(
                (tag, index) =>
                  tag !== null && (
                    <ImageBackground
                      key={tag} // Add a unique key for each tag
                      style={styles.tagBody}
                      source={images.tag}
                      imageStyle={{ borderRadius: 50 }}
                    >
                      <View style={{ padding: 5 }}>
                        <Text style={styles.tagName}>{tag}</Text>
                      </View>
                    </ImageBackground>
                  )
              )}
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
    backgroundColor: "#F2ECEC",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
    padding: 7,
    // height: 100,
    // left: -3,
  },
  cardContainer: {
    // width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  imageContainer: { justifyContent: "center" },
  img: { height: 70, width: 61, borderRadius: 5 },
  centerContainer: {
    width: "68%",
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
    fontWeight: Platform.OS == "ios" ? "600" : "300",
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly", // Use space-evenly to distribute space between children
    flex: 1, // Allow the container to take the available width
    // left: -8,
  },
  eventName: {
    flex: 1, // Make both text views take equal space
    fontSize: 14,
    color: colors.black,
    marginHorizontal: 5,
    fontFamily: SFCompact.regular,
  },
  div: {
    height: 5,
    width: 5,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
  },
  date: {
    flex: 1, // Make both text views take equal space
    fontSize: 14,
    color: colors.black,
    marginHorizontal: 5,
    fontFamily: SFCompact.regular,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    // marginHorizontal: 5,
    // left: -5,
  },
  tagBody: {
    marginHorizontal: 3,
    height: 28,
    // width: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  tagName: {
    fontSize: 12,

    color: colors.black,
    fontFamily: SFCompact.regular,
    top: Platform.OS == "ios" ? 0 : -3,
    textAlign: "center",
  },
  heartContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  fillIcon: { height: 20, width: 20 },
});
export default Card;
