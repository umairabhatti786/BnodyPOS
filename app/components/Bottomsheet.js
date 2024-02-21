import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";

import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";

const BottomSheet = ({
  data,
  setPaymentsValue,
  setPaymentView,
  placewithpay,
}) => {
  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setPaymentsValue(item.value);
            placewithpay(item.value);
            setPaymentView(false);
          }}
          style={{
            // flexDirection: "row",

            flex: 1,
            paddingLeft: sizeHelper.calWp(40),
            paddingVertical: sizeHelper.calWp(20),
            maxWidth: "47%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <View
            style={{
              padding: sizeHelper.calWp(8),
              flex: 1,

              borderRadius: sizeHelper.calWp(5),
              backgroundColor: AppColor.white,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#08101F",

                textAlign: "center",
                color: AppColor.black,
                paddingVertical: sizeHelper.calWp(5),
              }}
            >
              {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Animatable.View
      // ref={animRef}
      animation="fadeInUpBig"
      style={{
        height: sizeHelper.screentHeight / 3,
        position: "absolute",
        width: sizeHelper.screenWidth,
        bottom: 0,
        zIndex: 50000,
        elevation: 5,
        overflow: "hidden",
        borderTopLeftRadius: sizeHelper.calHp(20),
        borderTopRightRadius: sizeHelper.calHp(20),
        backgroundColor: AppColor.white,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            // flexDirection: "row",
            // justifyContent: "space-between",
            paddingHorizontal: sizeHelper.calHp(20),
            justifyContent: "center",
            backgroundColor: AppColor.blue1,
          }}
        >
          <Text
            style={{
              fontSize: sizeHelper.calWp(35),
              color: AppColor.white,
              fontFamily: "Proxima Nova Bold",
              textAlign: "left",
              padding: sizeHelper.calWp(20),
            }}
          >
            Select Payment Method
          </Text>
        </View>
        {!data ? (
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Image
                style={{
                  width: 250,
                  height: 250,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={require("../assets/images/noFile.png")}
              />
            </View>
          </View>
        ) : (
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              numColumns={2}
              // keyExtractor={(item) => "_" + item.value}
              keyExtractor={(item) => "_" + item.value.toString()}
              key={(item) => "_" + item.value.toString()}
            />
          </View>
        )}
      </SafeAreaView>
    </Animatable.View>
  );
};
export default BottomSheet;
