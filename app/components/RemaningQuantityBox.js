import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  I18nManager,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import sizeHelper from "../helpers/sizeHelper";
import AppColor from "../constant/AppColor";
import { getQuantity } from "../redux/actions/asynchronousAction";
import Loading from "./Loading";
const RemaningQuantityBox = ({
  openModal,
  setModalOpen,
  itemCode,
  TerminalConfiguration,
}) => {
  const OffModal = () => {
    setModalOpen(false);
  };

  const [Quentity, setQuentity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const serverHit = async () => {
    setQuentity(
      await getQuantity(`Products/GetCurrentQuantity?productCode=${itemCode}`)
    );
    setIsLoading(false);
  };
  useEffect(() => {
    serverHit();
  }, []);

  return (
    <Modal visible={openModal} transparent={true} animationType={"fade"}>
      {isLoading ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: AppColor.popUpBackgroundColor,
            zIndex: 9999,
          }}
        >
          <Loading />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: AppColor.popUpBackgroundColor,
          }}
        >
          <View
            style={{
              backgroundColor: AppColor.blue5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "85%",
              padding: sizeHelper.calWp(15),
            }}
          >
            <Text
              style={{
                fontSize: sizeHelper.calHp(25),
                color: AppColor.white,
                fontFamily: "Proxima Nova Bold",
                marginLeft: sizeHelper.calWp(15),
              }}
            >
              {I18nManager.isRTL
                ? "صندوق الكمية المتبقية "
                : "Remaining Quantity Box"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                OffModal();
              }}
            >
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
              width: "85%",
              backgroundColor: "white",
              paddingVertical: sizeHelper.calHp(25),
              paddingHorizontal: sizeHelper.calWp(25),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "#E3FFDC",
                  width: "49%",
                  // height: sizeHelper.calHp(90),
                  borderRadius: sizeHelper.calHp(5),
                  borderColor: "#69AD73",
                  borderWidth: sizeHelper.calHp(2),
                  paddingVertical: sizeHelper.calHp(7),
                  paddingHorizontal: sizeHelper.calWp(15),
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    color: "#69AD73",
                    fontSize: sizeHelper.calHp(16),
                    padding: 3,
                    fontWeight: "700",
                  }}
                >
                  Remaining Quantity
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: sizeHelper.calHp(16),
                    padding: 3,
                  }}
                >
                  {Quentity ? Quentity : 0}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#FEF3DC",
                  width: "49%",
                  // height: sizeHelper.calHp(90),
                  borderRadius: sizeHelper.calHp(5),
                  borderColor: "#CE8B63",
                  borderWidth: sizeHelper.calHp(2),
                  // paddingVertical: sizeHelper.calHp(7),
                  paddingHorizontal: sizeHelper.calWp(15),
                  marginLeft: sizeHelper.calWp(15),
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    color: "#CE8B63",
                    fontSize: sizeHelper.calHp(16),
                    padding: 3,
                    fontWeight: "700",
                    paddingTop: sizeHelper.calHp(7),
                  }}
                >
                  Godown Name
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: sizeHelper.calHp(16),
                    padding: 3,
                  }}
                >
                  {TerminalConfiguration?.GoDownName
                    ? TerminalConfiguration.GoDownName
                    : ""}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderColor: "#E72950",
                borderWidth: sizeHelper.calHp(2),
                borderRadius: sizeHelper.calHp(5),
                marginTop: sizeHelper.calHp(15),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: sizeHelper.calHp(4),
                  paddingHorizontal: sizeHelper.calWp(15),
                }}
              >
                <Icon size={20} name="warning" color={"#E72950"} />
                <Text
                  style={{
                    color: "#E72950",
                    fontSize: sizeHelper.calHp(16),
                    padding: sizeHelper.calHp(5),
                  }}
                >
                  Lorem lpsum dolor sit amet.consectetur adipiscing elit.sed do
                  elusmod tempor incid ut labore et dolore magna allqua quls
                  lpum.
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default RemaningQuantityBox;
