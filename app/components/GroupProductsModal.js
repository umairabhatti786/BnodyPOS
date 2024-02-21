import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  I18nManager,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";

const GroupProductsModal = ({
  productItems,
  setProductItems,
  data,
  StringsList,
}) => {
  return (
    <Modal
      visible={productItems}
      transparent={true}
      animationType={"fade"}
      zIndex={0}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // borderRadius: 25,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <View
          style={{
            backgroundColor: AppColor.blue1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "90%",
            padding: sizeHelper.calWp(15),
            borderTopRightRadius: sizeHelper.calHp(10),
            borderTopLeftRadius: sizeHelper.calHp(10),
          }}
        >
          <Text
            style={{
              fontSize: sizeHelper.calHp(25),
              color: AppColor.white,
              fontFamily: "Proxima Nova Bold",
            }}
          >
            {I18nManager.isRTL
              ? "تفاصيل منتجات المجموعة"
              : "Group Products Detail"}
          </Text>

          <TouchableOpacity onPress={() => setProductItems(false)}>
            <Image
              style={{
                width: sizeHelper.calHp(35),
                height: sizeHelper.calHp(35),
                resizeMode: "contain",
              }}
              source={require("../assets/images/cross.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "90%",
            backgroundColor: AppColor.white,
            paddingVertical: sizeHelper.calHp(20),
            // justifyContent: 'center',
            // alignItems: 'center',
            borderBottomLeftRadius: sizeHelper.calHp(10),
            borderBottomRightRadius: sizeHelper.calHp(10),
            paddingHorizontal: sizeHelper.calWp(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: AppColor.blue1,
              paddingVertical: sizeHelper.calHp(20),
              paddingStart: sizeHelper.calWp(8),
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                width: "33%",

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: "Proxima Nova Bold",
              }}
            >
              {StringsList._304}
            </Text>
            <Text
              style={{
                width: "31%",

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: "Proxima Nova Bold",
                textAlign: "center",
              }}
            >
              {StringsList._177}
            </Text>
            <Text
              style={{
                width: "22%",

                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: "Proxima Nova Bold",
                textAlign: "center",
              }}
            >
              {"UOM"}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: sizeHelper.calHp(400),
            }}
          >
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={true}
                    key={item.SalesInvoiceDetailsID}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "30%",
                          fontSize: sizeHelper.calHp(20),
                          marginVertical: sizeHelper.calHp(20),
                          // marginHorizontal: '0.5%',
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                        }}
                      >
                        {I18nManager.isRTL
                          ? item.ProductName2
                          : item.ProductName}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      <Text
                        style={{
                          width: "30%",
                          // marginHorizontal: '0.5%',
                          marginVertical: sizeHelper.calHp(20),
                          fontSize: sizeHelper.calHp(20),
                          color: AppColor.black,
                          fontFamily: "Proxima Nova Bold",
                          textAlign: "center",
                        }}
                      >
                        {item.Quantity}
                      </Text>
                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                      {item?.UOMFragment !== 0 && (
                        <Text
                          style={{
                            width: "20.5%",
                            // marginHorizontal: '0.5%',
                            marginVertical: sizeHelper.calHp(20),
                            fontSize: sizeHelper.calHp(20),
                            color: AppColor.black,
                            fontFamily: "Proxima Nova Bold",
                            textAlign: "center",
                            left: 8,
                          }}
                        >
                          {I18nManager.isRTL ? item.UOMName2 : item.UOMName}
                        </Text>
                      )}

                      <View
                        style={{
                          width: "0.5%",
                          height: "100%",
                          backgroundColor: AppColor.white1,
                          zIndex: 0,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 3,
                        backgroundColor: AppColor.white1,
                        zIndex: 0,
                      }}
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: sizeHelper.calHp(20),
                  marginVertical: sizeHelper.calHp(20),
                  marginHorizontal: "0.5%",
                  color: AppColor.black,
                  fontFamily: "Proxima Nova Bold",
                }}
              >
                No Record Found!
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#0F0F0F",
    opacity: 0.9,
  },
  headerContainer: {
    backgroundColor: AppColor.blue1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    padding: sizeHelper.calWp(10),
    borderTopRightRadius: sizeHelper.calHp(10),
    borderTopLeftRadius: sizeHelper.calHp(10),
  },
  heading: {
    fontSize: sizeHelper.calHp(25),
    color: AppColor.white,
    fontFamily: "Proxima Nova Bold",
  },
  img: {
    width: sizeHelper.calHp(35),
    height: sizeHelper.calHp(35),
    resizeMode: "contain",
  },
  headingsContainer: {
    width: "90%",
    backgroundColor: "#fff",
    paddingVertical: sizeHelper.calHp(15),
    borderBottomLeftRadius: sizeHelper.calHp(10),
    borderBottomRightRadius: sizeHelper.calHp(10),
    paddingHorizontal: sizeHelper.calWp(20),
  },
  heading1: {
    flexDirection: "row",
    backgroundColor: AppColor.blue1,
    paddingVertical: sizeHelper.calHp(10),
    paddingStart: sizeHelper.calWp(8),
  },
  text1: {
    width: "40%",
    fontSize: sizeHelper.calHp(25),
    color: AppColor.white,
    fontFamily: "Proxima Nova Bold",
  },
  text2: {
    width: "38%",
    fontSize: sizeHelper.calHp(25),
    color: AppColor.white,
    fontFamily: "Proxima Nova Bold",
    textAlign: "center",
  },
  text3: {
    width: "22%",
    fontSize: sizeHelper.calHp(25),
    color: AppColor.white,
    fontFamily: "Proxima Nova Bold",
    textAlign: "center",
  },
  renderContainer: {
    flexDirection: "row",
    backgroundColor: AppColor.white,
    padding: 2,
  },
  container: {
    width: "0.5%",
    height: "100%",
    backgroundColor: AppColor.white,
    zIndex: 0,
  },
  name: {
    width: "38%",
    fontSize: sizeHelper.calHp(20),
    marginVertical: sizeHelper.calHp(15),
    marginHorizontal: "0.5%",
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
  },
  headingView: {
    width: "0.5%",
    height: "100%",
    backgroundColor: AppColor.white1,
    zIndex: 0,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: AppColor.white1,
    zIndex: 0,
  },
  quantity: {
    width: "36.5%",
    marginHorizontal: "0.5%",
    marginVertical: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
    textAlign: "center",
  },
  productName: {
    width: "20.5%",
    marginHorizontal: "0.5%",
    marginVertical: sizeHelper.calHp(15),
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black,
    fontFamily: "Proxima Nova Bold",
    textAlign: "center",
  },
});
export default GroupProductsModal;
