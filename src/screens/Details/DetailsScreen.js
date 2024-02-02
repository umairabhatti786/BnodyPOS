import {
  View,
  ImageBackground,
  SafeAreaView,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Linking,
  Platform,
} from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import RNCalendarEvents from "react-native-calendar-events";
import React, { useEffect, useRef, useState } from "react";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import CustomText from "../../components/CustomText";
import { colors } from "../../utils/colors";
import Button from "../../components/Button";
import { SFCompact } from "../../utils/Fonts";
import {
  BackIcon,
  CalanderIcon,
  CrossIcon,
  FillHeartIcon,
  ForwardIcon,
  HeartIcon,
  UnFillHeartIcon,
  UploadIcon,
} from "../../assets/SVG/svg";
import Toast from "react-native-root-toast";
import FastImage from "react-native-fast-image";
import DateCard from "../../components/DateCard";
import LocationCard from "../../components/LocationCard";
import MapComponent from "../../components/MapComponent";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { Get_Single_Event } from "../../api/Requests";
const DetailsScreen = ({ navigation, route }) => {
  const eventID = route.params?.eventId;

  const [eventDetail, setEventDetails] = useState({});

  const [loading, setLoading] = useState(false);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const generateLink = async (eventDetail) => {
    try {
      var link = await dynamicLinks().buildShortLink(
        {
          link: `https://assemble.page.link/jfVL?id=${eventDetail?._id}`,
          domainUriPrefix: "https://assemble.page.link",

          android: {
            packageName: "com.assemble",
            // fallbackUrl:
          },
          ios: {
            bundleId: "com.assemble.assemble",
          },

          social: {
            title: eventDetail.event_title
              ? eventDetail.event_title
              : "Check out this post on Assemble",
            descriptionText: eventDetail?.event_description
              ? eventDetail?.event_description
              : "",
            imageUrl: eventDetail?.event_image ? eventDetail?.event_image : "",
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      );

      return link;
    } catch (error) {
      console.log("error raised", error);
    }
  };
  const onShare = async () => {
    try {
      const link = await generateLink(eventDetail);
      console.log(link);
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const openExternalLink = async () => {
    const url = eventDetail.ticket_link;
    await Linking.openURL(url);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchEventsDetails(eventID);
    }, [route.params?.eventId])
  );
  const fetchEventsDetails = async (eventID) => {
    setLoading(true);
    try {
      let response = await Get_Single_Event(eventID);
      if (response.event !== undefined) {
        let address = response.event.event_location.address;
        response.event.event_title = truncateText(
          response.event.event_title,
          5
        );

        response.event.event_location.neighborhood = truncateText(
          response.event.event_location.neighborhood,
          2
        );
        response.event.event_location.address = truncateText(
          response.event.event_location.address,
          3
        );
        response.event.realAddress = address;
        response.event.event_image =
          response.event.event_image === null ||
          response.event.event_image === undefined
            ? images.details
            : response.event.event_image;
        response.event.ticket_link =
          response.event.ticket_link !== undefined
            ? response.event.ticket_link
            : "";
        const eventDateParts = response.event.event_date.split("-");
        const day = parseInt(eventDateParts[0], 10);
        const month = parseInt(eventDateParts[1], 10) - 1; // Month is zero-based
        const year = parseInt(eventDateParts[2], 10);

        let eventDate = new Date(year, month, day);

        // Format the date as "Sun, Jan 28"
        const options = { weekday: "short", month: "short", day: "numeric" };
        response.event.event_date = eventDate.toLocaleString("en-US", options);

        setTimeout(() => {
          setEventDetails(response.event);
          setLoading(false);
          console.log("running stop");
        }, 200);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  function truncateText(text, maxWords) {
    const words = text.split(" ");

    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(" ") + "...";

      return truncatedText;
    } else {
      return text;
    }
  }
  const requestCalendarPermission = async () => {
    try {
      const result = await RNCalendarEvents.requestPermissions();

      if (result === "authorized") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error requesting calendar permission:", error);
      return false;
    }
  };
  const addEventToCalendar = async () => {
    try {
      const hasPermission = await requestCalendarPermission();

      if (hasPermission) {
        // const startDate = new Date();
        // const endDate = (new Date() + 7);

        // console.log("startDate",startDate)
        //         console.log("startDate",startDate)

        // endDate.setDate(endDate.getDate() + 7);
        const eventId = await RNCalendarEvents.saveEvent("New Event", {
          startDate: "2024-01-05T09:00:00.000Z",
          endDate: "2024-01-08T09:00:00.000Z",

          // recurrenceRule: {
          //   frequency: "weekly",
          //   occurrence: 52,
          //   interval: 2,
          //   endDate: "2024-01-08T09:00:00.000Z",
          // },
        });
        Alert.alert(
          "Event Added",
          "The event has been added to your calendar. To view the event, open your calendar app.",
          [
            {
              text: "OK",
              onPress: () => {
                const calendarAppUrl =
                  Platform.OS === "ios"
                    ? "calshow:"
                    : "content://com.android.calendar/time/";

                Linking.openURL(calendarAppUrl);
              },
            },
          ],
          { cancelable: false }
        );

        console.log("Event added successfully. Event ID:", eventId);
      } else {
        console.log("Calendar permission not granted");
      }
    } catch (error) {
      console.error("Error adding event to calendar:", error);
    }
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleGoBack}
          style={[styles.iconContainer, { marginHorizontal: 8 }]}
        >
          <BackIcon
            // onPress={handleGoBack}
            style={styles.icon}
            fill={colors.black}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <CustomText
            color={"transparent"}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="assemble"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.iconContainer}>
            {eventDetail?.favEvent?.isFav === true ? (
              <FillHeartIcon style={styles.icon} />
            ) : (
              <UnFillHeartIcon style={styles.icon} fill={colors.black} />
            )}
          </View>
          <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.6}
            style={[styles.iconContainer, { marginHorizontal: 10 }]}
          >
            <UploadIcon style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onPress = () => {
    if (eventDetail.ticket_link === "") {
      addEventToCalendar();
    } else {
      openExternalLink();
    }
  };

  return (
    <SafeAreaView style={commonStyles.main}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.scollInner}>
            <View style={styles.scrollContainer}>
              <FastImage
                style={styles.flex}
                source={{ uri: eventDetail.event_image }}
                // imageStyle={{ borderRadius: 20, height: 300, width: "100%" }}
                resizeMode="cover"
              >
                {!loading && <Header />}

                <View
                  style={{
                    top: 150,
                    left: 10,
                    right: 0,
                  }}
                >
                  <View style={styles.tagsContainer}>
                    {Array.isArray(eventDetail.event_tags) &&
                      eventDetail.event_tags.length > 0 &&
                      eventDetail.event_tags[0].split(",").map((tag) => (
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
              </FastImage>
            </View>
            <View style={styles.eventHeader}>
              <CustomText
                label={eventDetail.event_title}
                fontSize={16}
                color={colors.black}
                // fontFamily={SFCompact.regular}
                fontFamily={SFCompact.bold}
                fontWeight={Platform.OS == "ios" ? "500" : "300"}
              />
            </View>
            <View style={styles.cardsContainer}>
              <DateCard item={eventDetail} />
              <View style={styles.divider} />
              <LocationCard item={eventDetail} />
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <CustomText
              label="Event Detail"
              fontFamily={SFCompact.semiBold}
              fontSize={15}
              fontWeight={Platform.OS == "ios" ? "500" : "300"}
            />
            <View style={{ marginVertical: 10 }}>
              <CustomText
                label={eventDetail.event_description}
                fontFamily={SFCompact.light}
                fontSize={15}
              />
            </View>
            <View style={styles.mapContainer}>
              <View style={styles.innerMapContainer}>
                <MapComponent
                  latitude={eventDetail?.event_location?.latitude}
                  longitude={eventDetail?.event_location?.longitude}
                  address={eventDetail?.event_location?.address}
                />
              </View>

              <CustomText
                label={eventDetail?.realAddress ? eventDetail?.realAddress : ""}
                color="#1C1916"
                fontFamily={SFCompact.light}
                fontSize={13}
                textAlign="center"
                alignSelf="center"
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                text={
                  eventDetail.ticket_link === ""
                    ? "ADD TO CALENDAR"
                    : "GET TICKETS"
                }
                color={colors.white}
                fontSize={17}
                height={65}
                width={"100%"}
                backgroundColor={"#080808"}
                borderRadius={100}
                margin={20}
                fontFamily={SFCompact.semiBold}
                onPress={onPress}
              />
              {eventDetail.ticket_link === "" && (
                <View style={styles.bottomView}>
                  <CustomText
                    label={"Tickets available at the door".toLocaleUpperCase()}
                    color={colors.black}
                    fontFamily={SFCompact.light}
                    fontSize={12}
                    textAlign="center"
                    alignSelf="center"
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DetailsScreen;
