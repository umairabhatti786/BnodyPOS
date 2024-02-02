import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ImageBackground,
  SectionList,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Image,
  Animated,
  SafeAreaView,
  PanResponder,
  PermissionsAndroid,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from "axios";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { images } from "../../assets/images";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import {
  CustomHeartIcon,
  FillHeartIcon,
  FillHeartIconBlack,
  ProfileIcon,
} from "../../assets/SVG/svg";
import CustomText from "../../components/CustomText";
import { colors } from "../../utils/colors";
import { Modalize } from "react-native-modalize";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../components/Card";
import { SFCompact } from "../../utils/Fonts";
import Loading from "../../components/Loading";
import { Get_All_Events } from "../../api/Requests";
import Button from "../../components/Button";
import BottomCard from "../../components/BottomCard";
import BottomEvents from "../../components/BottomEvents";
import Toast from "react-native-root-toast";
const HomeScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const modalizeRef = useRef(null);
  const flatListRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventss, setEventss] = useState([]);
  const [hideModelize, setHideModelize] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [userScroll, setUserScroll] = useState(true);
  const [userlocation, setUserLocation] = useState(false);
  const [locationDetails, setLocationDetails] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      fetchAllEvents();
      requestLocationPermission();
      handleGetLocation();
    }, [])
  );
  useEffect(() => {
    checkDynamicLink();
  }, []);

  const checkDynamicLink = async () => {
    dynamicLinks()
      .getInitialLink()
      .then(async (link) => {
        if (link?.url) {
          const id = link?.url?.split("=").pop();
          navigation.navigate("Details", { eventId: id });
        } else {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    dynamicLinks().onLink(handleDynamicLink);
  }, [dynamicLinks]);

  const handleDynamicLink = async (link) => {
    if (link?.url) {
      const id = link.url?.split("=").pop();
      if (id) {
        navigation.navigate("Details", { eventId: id });
      } else {
        setLoading(false);
      }
    }
  };
  // const pan = useRef(new Animated.ValueXY()).current;

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: (e, gestureState) => {
  //       // Allow pan responder to handle the gesture if it's a vertical drag
  //       return Math.abs(gestureState.dy) > 5;
  //     },
  //     onPanResponderMove: (_, gestureState) => {
  //       // Check the gesture direction and adjust modal height accordingly
  //       if (gestureState.dy < 0) {
  //         // User is dragging up
  //         setModalHeight(sizeHelper.screentHeight);
  //       } else {
  //         // User is dragging down
  //         setModalHeight(sizeHelper.screenWidth);
  //       }
  //     },
  //     onPanResponderRelease: () => {
  //       // Reset pan position
  //       Animated.spring(pan, {
  //         toValue: 0,
  //         useNativeDriver: false,
  //       }).start();
  //     },
  //   })
  // ).current;

  const handleGetLocation = async () => {
    try {
      const apiKey = "AIzaSyDXoHO79vxypTv8xL4V10cf5kFpIYDO9Rk";

      let response = await getLocationPermissions();

      if (response === true || response === "granted") {
        try {
          const position = await new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition((position) => {
              resolve(position),
                (error) => reject(error),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 };
            });
          });

          const latitude = position?.coords?.latitude;
          const longitude = position?.coords?.longitude;

          // Set userLocation state here
          setUserLocation(position?.coords);

          const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

          try {
            const response = await axios.get(geocodingApiUrl);
            const results = response.data.results;

            if (results && results.length > 0) {
              const firstResult = results[0];
              const resultPlaceId = firstResult.place_id;
              setPlaceId(resultPlaceId);

              const placesApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${resultPlaceId}&key=${apiKey}`;

              try {
                const placesResponse = await axios.get(placesApiUrl);
                const result = placesResponse.data.result;

                if (result) {
                  const addressComponents = result.address_components;
                  const city =
                    addressComponents.find(
                      (component) =>
                        component.types.includes("locality") ||
                        component.types.includes("administrative_area_level_2")
                    )?.long_name || "";

                  const formattedAddress = `${city}`;

                  setLocationDetails(formattedAddress);
                }
              } catch (placesError) {
                console.error("Error fetching place details:", placesError);
              }
            }
          } catch (error) {
            console.error("Error fetching location details:", error);
          }
        } catch (error) {
          console.error("Location error:", error);
        }
      } else {
        // If permission is not granted, request permission again
        Alert.alert(
          "Permission Denied",
          "Please grant location permission to use this feature.",
          [
            {
              text: "OK",
              onPress: async () => {
                try {
                  const permissionResult = await request(
                    Platform.OS === "android"
                      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                      : PERMISSIONS.IOS.ACCESS_FINE_LOCATION
                  );

                  if (
                    permissionResult === true ||
                    permissionResult === "granted"
                  ) {
                    // Permission granted after the second attempt
                    handleGetLocation();
                  } else {
                    // Handle case where permission is still not granted
                    console.log("Permission still not granted.");
                  }
                } catch (permissionError) {
                  console.error(
                    "Error requesting location permission:",
                    permissionError
                  );
                }
              },
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLocationPermissions = async () => {
    try {
      const permissionResult = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        })
      );

      return permissionResult === RESULTS.GRANTED;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      let response = await getLocationPermissions();

      if (response === true || response === "granted") {
        try {
          Geolocation.getCurrentPosition(
            (position) => {
              try {
                if (position) {
                  const { latitude, longitude } = position.coords;
                  mapRef?.current?.animateToRegion(
                    {
                      latitude,
                      longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                    3000
                  );
                  setUserLocation(position.coords);
                }
              } catch (error) {
                console.error("Error handling location:", error);
              }
            },
            (error) => {
              console.error("Error getting location:", error);
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
          );
        } catch (locationError) {
          console.error("Error in getCurrentPosition:", locationError);
        }
      } else {
        console.log("Error: Location permission not granted.");
      }
    } catch (permissionError) {
      console.error("Error requesting location permission:", permissionError);
    }
  };

  const onAddFav = async (item) => {
    try {
      const token = await AsyncStorage.getItem("@token");
      const eventID = item._id;
      const body = {
        sso_token: token,
      };
      if (item.favEvent.isFav === false) {
        try {
          const url = `https://assemble-backend.onrender.com/api/events/addfavorite/${eventID}`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              // Add any additional headers if needed
            },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            if (response.ok) {
              const updatedEvents = eventss.map((event) => {
                if (event._id === eventID) {
                  event.favEvent.isFav = true;
                }
                return event;
              });

              if (Array.isArray(updatedEvents) && updatedEvents.length > 0) {
                const modifiedEvents = updatedEvents.map((event) => {
                  event.event_title = truncateText(event.event_title, 3);
                  event.event_location.neighborhood = truncateText(
                    event.event_location.neighborhood,
                    3
                  );

                  return event;
                });
                modifiedEvents.sort(
                  (a, b) => new Date(b.event_date) - new Date(a.event_date)
                );

                setEventss(modifiedEvents);

                const currentDate = new Date();
                const eventSections = [];

                modifiedEvents.forEach((event) => {
                  const eventDateParts = event?.event_date.split("-");
                  if (eventDateParts.length === 3) {
                    // Assuming the format is DD-MM-YYYY
                    const day = parseInt(eventDateParts[0], 10);
                    const month = parseInt(eventDateParts[1], 10) - 1; // Month is zero-based
                    const year = parseInt(eventDateParts[2], 10);

                    let eventDate = new Date(year, month, day);

                    // Set the time portion of the event date to midnight
                    eventDate.setHours(0, 0, 0, 0);

                    const currentDate = new Date();
                    const isFutureEvent = eventDate > currentDate;

                    const sectionTitle = isFutureEvent
                      ? "Upcoming Events"
                      : formatEventDate(eventDate);

                    // Create the section if it doesn't exist
                    let section = eventSections.find(
                      (sec) => sec.title === sectionTitle
                    );
                    if (!section) {
                      section = { title: sectionTitle, data: [] };
                      eventSections.push(section);
                    }

                    section.data.push(event);

                    // Sort events within each section based on their specific dates
                    section.data.sort(
                      (a, b) => new Date(a.event_date) - new Date(b.event_date)
                    );
                  }
                });

                setEvents(eventSections);
              }
              Toast.show("Event Added in Favorites");
            }
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const url = `https://assemble-backend.onrender.com/api/events/removefavorite/${eventID}`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              // Add any additional headers if needed
            },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            if (response.ok) {
              const updatedEvents = eventss.map((event) => {
                if (event._id === eventID) {
                  event.favEvent.isFav = false;
                }
                return event;
              });

              if (Array.isArray(updatedEvents) && updatedEvents.length > 0) {
                const modifiedEvents = updatedEvents.map((event) => {
                  event.event_title = truncateText(event.event_title, 3);
                  event.event_location.neighborhood = truncateText(
                    event.event_location.neighborhood,
                    3
                  );

                  return event;
                });
                modifiedEvents.sort(
                  (a, b) => new Date(b.event_date) - new Date(a.event_date)
                );
                setEventss(modifiedEvents);
                const currentDate = new Date();
                const eventSections = [];
                modifiedEvents.forEach((event) => {
                  const eventDateParts = event?.event_date.split("-");
                  if (eventDateParts.length === 3) {
                    // Assuming the format is DD-MM-YYYY
                    const day = parseInt(eventDateParts[0], 10);
                    const month = parseInt(eventDateParts[1], 10) - 1; // Month is zero-based
                    const year = parseInt(eventDateParts[2], 10);

                    let eventDate = new Date(year, month, day);

                    // Set the time portion of the event date to midnight
                    eventDate.setHours(0, 0, 0, 0);

                    const currentDate = new Date();
                    const isFutureEvent = eventDate > currentDate;

                    const sectionTitle = isFutureEvent
                      ? "Upcoming Events"
                      : formatEventDate(eventDate);

                    // Create the section if it doesn't exist
                    let section = eventSections.find(
                      (sec) => sec.title === sectionTitle
                    );
                    if (!section) {
                      section = { title: sectionTitle, data: [] };
                      eventSections.push(section);
                    }

                    section.data.push(event);

                    // Sort events within each section based on their specific dates
                    section.data.sort(
                      (a, b) => new Date(a.event_date) - new Date(b.event_date)
                    );
                  }
                });
                setEvents(eventSections);
              }
              Toast.show("Event Removed From Favorites");
            }
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getItemLayout = (data, index) => ({
    length: 100, // Assuming item height is 100, adjust accordingly
    offset: 100 * index,
    index,
  });
  const onHandlePress = () => {
    navigation.navigate("Settings");
  };

  const onNavigateToFav = () => {
    navigation.navigate("AllFavEvents");
  };
  const formatEventDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      let response = await Get_All_Events();

      if (Array.isArray(response.events) && response.events.length > 0) {
        setEventss(response.events);
        const modifiedEvents = response.events.map((event) => {
          event.event_title = truncateText(event.event_title, 3);
          event.event_location.neighborhood = truncateText(
            event.event_location.neighborhood,
            2
          );
          if (event.event_tags.length > 0) {
            event.tagNumbers = event.event_tags.map((tag, index) => ({
              tag,
              number: index + 1,
            }));
          }
          return event;
        });

        // Sort events by date, with the newest events first
        modifiedEvents.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );

        const eventSections = [];

        modifiedEvents.forEach((event) => {
          const eventDateParts = event?.event_date.split("-");
          if (eventDateParts.length === 3) {
            // Assuming the format is DD-MM-YYYY
            const day = parseInt(eventDateParts[0], 10);
            const month = parseInt(eventDateParts[1], 10) - 1; // Month is zero-based
            const year = parseInt(eventDateParts[2], 10);

            let eventDate = new Date(year, month, day);

            // Set the time portion of the event date to midnight
            eventDate.setHours(0, 0, 0, 0);

            const currentDate = new Date();
            const isFutureEvent = eventDate > currentDate;

            const sectionTitle = isFutureEvent
              ? "Upcoming Events"
              : formatEventDate(eventDate);

            // Create the section if it doesn't exist
            let section = eventSections.find(
              (sec) => sec.title === sectionTitle
            );
            if (!section) {
              section = { title: sectionTitle, data: [] };
              eventSections.push(section);
            }
            // Sort events within each section based on their specific dates

            section.data.push(event);
            section.data.sort(
              (a, b) => new Date(a.event_date) - new Date(b.event_date)
            );
          }
        });

        setEvents(eventSections);
      } else {
        setEvents(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
  const openExternalLink = async () => {
    const url = "https://w3dv4qeze3p.typeform.com/to/BCoUhmwU";
    await Linking.openURL(url);
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onHandlePress}
          style={styles.iconContainer}
        >
          <ProfileIcon style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <CustomText
            color={colors.black}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="assemble"
            fontFamily={SFCompact.semiBold}
            fontWeight={Platform.OS === "ios" ? "700" : "400"}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onNavigateToFav}
          style={styles.iconContainer}
        >
          <FillHeartIconBlack style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSectionHeader = ({ section }) => (
    <View style={{ padding: 10 }}>
      <CustomText
        label={section.title}
        color={colors.black}
        fontSize={14}
        fontWeight={Platform.OS == "ios" ? "600" : "300"}
        fontFamily={SFCompact.semiBold}
      />
    </View>
  );
  const renderItem = ({ section, item }) => (
    <Card item={item} navigation={navigation} onAddFav={onAddFav} />
  );
  const renderItemBottom = ({ section, item }) => (
    <BottomCard item={item} navigation={navigation} onAddFav={onAddFav} />
  );
  const footerComponent = () => {
    return (
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={images.background}
      >
        <View
          style={{
            backgroundColor: colors.white,
            height: 300,
            width: 370,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginVertical: 20,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <CustomText
              label={"Don't see the event you're \nlooking for? "}
              color={colors.black}
              fontSize={17}
              alignSelf="center"
              textAlign="center"
              fontFamily={SFCompact.regular}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <CustomText
              label={"Send it our way and we will \nadd to  the list"}
              color={colors.black}
              fontSize={13}
              alignSelf="center"
              textAlign="center"
              fontFamily={SFCompact.light}
            />
          </View>
          <>
            <Button
              text={"SUBMIT EVENT"}
              color={colors.white}
              fontSize={14}
              height={65}
              width={"50%"}
              backgroundColor={colors.black}
              borderRadius={100}
              margin={20}
              fontFamily={SFCompact.regular}
              onPress={openExternalLink}
            />
          </>
        </View>
      </ImageBackground>
    );
  };

  const CustomMarkerComponent = React.memo(({ event, index }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        zIndex: 999999,
      }}
    >
      {index === selectedEventIndex && selectedEventIndex !== 0 ? (
        <FastImage
          source={images.blackLocation} // Use the black location image
          style={{ height: 60, width: 60 }}
          resizeMode="contain"
        />
      ) : (
        <FastImage
          source={images.goldenLocation} // Use the golden location image
          style={{ height: 60, width: 60 }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  ));

  const updateMapCenter = (index) => {
    // Update the map center based on the latitude and longitude of the selected event

    try {
      const selectedEvent = eventss[index];
      if (selectedEvent && selectedEvent.event_location) {
        const { latitude, longitude } = selectedEvent.event_location;
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },

          3000
        );
      }
    } catch (error) {
      console.log("updateMapCenter", error);
    }
  };
  const onScroll = (event) => {
    if (hideModelize && userScroll) {
      let width = sizeHelper.screenWidth > 450 ? 550 : 380;
      const xPos =
        event.nativeEvent?.contentOffset?.x < 0
          ? 0
          : event.nativeEvent?.contentOffset?.x;
      const current = Math.floor(xPos / width);
      updateMapCenter(current);
      setSelectedEventIndex(current);
    }
  };

  const onPressMarker = (event, index) => {
    try {
      setHideModelize(true);
      setTimeout(() => {
        scrollToIndex(index);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToIndex = (index) => {
    setUserScroll(false);
    flatListRef.current?.scrollToIndex({
      index,
      animated: false,
    });
    updateMapCenter(index);
    setSelectedEventIndex(index);
    setTimeout(() => {
      setUserScroll(true);
    }, 5000);
    // Set back to true after scrolling
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
          <View style={styles.container}>
            <MapView
              // provider={PROVIDER_GOOGLE}
              ref={mapRef}
              style={[
                styles.map,
                {
                  height: "100%",
                  width: "100%",
                },
              ]}
              initialRegion={{
                latitude:
                  !userlocation && userlocation?.latitude
                    ? userlocation.latitude
                    : 32.7157,
                longitude:
                  !userlocation && userlocation?.longitude
                    ? userlocation.longitude
                    : 117.1611,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {!loading && userlocation !== false && (
                <Marker
                  coordinate={{
                    latitude: userlocation?.latitude,
                    longitude: userlocation?.longitude,
                  }}
                >
                  <FastImage
                    source={images.location}
                    style={{ height: 80, width: 50 }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Marker>
              )}

              {!loading &&
                eventss.length > 0 &&
                eventss.map((event, index) => (
                  <Marker
                    onPress={() => onPressMarker(event, index)}
                    key={event._id}
                    coordinate={{
                      latitude: event.event_location.latitude,
                      longitude: event.event_location.longitude,
                    }}
                  >
                    <CustomMarkerComponent event={event} index={index} />
                  </Marker>
                ))}
            </MapView>
            {!hideModelize && (
              // <Animated.View
              //   style={{
              //     flex: 1,
              //     justifyContent: "center",
              //     alignItems: "center",
              //     transform: [{ translateY: pan.y }],
              //     top: "20%",
              //   }}
              //   {...panResponder.panHandlers}
              // >
              //   <View
              //     style={{
              //       backgroundColor: "white",
              //       padding: 16,
              //       borderRadius: 8,
              //       width: "100%",
              //       height: modalHeight,
              //     }}
              //   >
              <Modalize
                modalStyle={{
                  backgroundColor: "#FFFFFF",
                  flex: 1,
                  width: "100%",
                }}
                ref={modalizeRef}
                alwaysOpen={
                  !hideModelize && sizeHelper.screenWidth > 450 ? 460 : 440
                }
                useNativeDriver
                modalHeight={sizeHelper.screentHeight - 135}
                handlePosition="inside"
                panGestureComponentProps={{ enabled: true }}
              >
                <View style={styles.content}>
                  <CustomText
                    label={
                      locationDetails
                        ? "Events in" + " " + locationDetails
                        : "Events in San Diego"
                    }
                    color={colors.black}
                    fontSize={16}
                    alignSelf="center"
                    textAlign="center"
                    fontFamily={SFCompact.semiBold}
                    fontWeight={Platform.OS == "ios" ? "700" : "300"}
                  />
                </View>

                {eventss.length > 0 ? (
                  <SectionList
                    sections={events}
                    keyExtractor={(item, index) => `${item?._id}_${index}`}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    ListFooterComponent={loading ? null : footerComponent}
                  />
                ) : (
                  <>
                    <View
                      style={{
                        backgroundColor: colors.white,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CustomText
                          label={"No Events found"}
                          color={colors.black}
                          fontSize={16}
                        />
                      </View>
                    </View>
                    <ImageBackground
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      source={images.background}
                    >
                      <View
                        style={{
                          backgroundColor: colors.white,
                          height: 300,
                          width: 370,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                          marginVertical: 20,
                        }}
                      >
                        <View style={{ marginVertical: 10 }}>
                          <CustomText
                            label={"Don't see the event you're \nlooking for? "}
                            color={colors.black}
                            fontSize={17}
                            alignSelf="center"
                            textAlign="center"
                            fontFamily={SFCompact.regular}
                          />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <CustomText
                            label={
                              "Send it our way and we will \nadd to  the list"
                            }
                            color={colors.black}
                            fontSize={13}
                            alignSelf="center"
                            textAlign="center"
                            fontFamily={SFCompact.light}
                          />
                        </View>
                        <>
                          <Button
                            text={"SUBMIT EVENT"}
                            color={colors.white}
                            fontSize={14}
                            height={65}
                            width={"50%"}
                            backgroundColor={colors.black}
                            borderRadius={100}
                            margin={20}
                            fontFamily={SFCompact.regular}
                            onPress={openExternalLink}
                          />
                        </>
                      </View>
                    </ImageBackground>
                  </>
                )}
              </Modalize>
              //  </View>
              // </Animated.View>
            )}

            {hideModelize && (
              <BottomEvents
                modalizeRef={modalizeRef}
                setHideModelize={setHideModelize}
                flatListRef={flatListRef}
                eventss={eventss}
                renderItemBottom={renderItemBottom}
                onScroll={onScroll}
                selectedEventIndex={selectedEventIndex}
                getItemLayout={getItemLayout}
                requestLocationPermission={requestLocationPermission}
              />
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default HomeScreen;
