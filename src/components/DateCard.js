import { View, Text, Platform, Alert, Linking } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";
import { CalanderIcon, ForwardIcon } from "../assets/SVG/svg";
import CustomText from "./CustomText";
import { SFCompact } from "../utils/Fonts";
import RNCalendarEvents from "react-native-calendar-events";
const DateCard = ({ item }) => {
  // const formatDate = (dateString) => {
  //   const eventDateParts = dateString.split("-");
  //   const day = parseInt(eventDateParts[0], 10);
  //   const month = parseInt(eventDateParts[1], 10) - 1; // Month is zero-based
  //   const year = parseInt(eventDateParts[2], 10);

  //   let eventDate = new Date(year, month, day);

  //   // Format the date as "Sun, Jan 28"
  //   const options = { weekday: "short", month: "short", day: "numeric" };
  //   const formattedDate = eventDate.toLocaleString("en-US", options);

  //   return formattedDate;
  // };
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
  return (
    <TouchableOpacity
      onPress={addEventToCalendar}
      activeOpacity={0.6}
      style={{
        alignItems: "center",
        backgroundColor: colors.white,
        padding: 10,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CalanderIcon style={{ height: 20, width: 20 }} fill={"#cfb34e"} />
          <View style={{ marginHorizontal: 20 }}>
            <CustomText
              label={item.event_date + " at " + item.event_time}
              color={"#1C1916"}
              fontFamily={SFCompact.light}
              fontSize={16}
              fontWeight={Platform.OS == "ios" ? "400" : "300"}
            />
            {/* <CustomText
              label={formatDate(item.event_date) + " at " + item.event_time}
              color={"#1C1916"}
              fontFamily={SFCompact.light}
              fontSize={16}
            /> */}
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ForwardIcon style={{ height: 20, width: 20 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DateCard;
