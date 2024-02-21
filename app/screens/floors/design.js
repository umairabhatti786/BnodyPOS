import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  I18nManager,
} from "react-native";
import * as Animatable from "react-native-animatable";
import CirCleTableStyle from "../../components/CircleTableStyle";
import SquareTableStyle from "../../components/SquareTableStyle";
import AppColor from "../../constant/AppColor";
import sizeHelper from "../../helpers/sizeHelper";
import styles from "./style";
const Design = (props) => {
  const renderTable = ({ item, index }) => {
    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: sizeHelper.calHp(20),
            zIndex: item.isRestViewDetail ? 999 : 0,
            alignItems: "center",

            //    marginEnd: sizeHelper.calWp(22),
            //overflow: "hidden"
          }}
        >
          {item.TableTypeName == "Round" ? (
            <CirCleTableStyle
              item={item}
              index={index}
              Pprop={props}
              dispatch={props.dispatch}
              navigation={props.navigation}
              screenData={props.TableArray}
              setScreenData={props.setScreenData}
              setLoading={props.setLoading}
              setTableID={props.setTableID}
              storageItems={props.storageItems}
              setStorageItems={props.setStorageItems}
              StringsList={props.StringsList}
              orderCode={props?.orderCode}
              setOrderCode={props?.setOrderCode}
            />
          ) : (
            <SquareTableStyle
              item={item}
              index={index}
              Pprop={props}
              dispatch={props.dispatch}
              navigation={props.navigation}
              screenData={props.TableArray}
              setScreenData={props.setScreenData}
              setLoading={props.setLoading}
              setTableID={props.setTableID}
              storageItems={props.storageItems}
              setStorageItems={props.setStorageItems}
              StringsList={props.StringsList}
              orderCode={props?.orderCode}
              setOrderCode={props?.setOrderCode}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer]}>
      {props.TableArray !== null ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            width: "95%",
          }}
          numColumns={3}
          nestedScrollEnabled
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          CellRendererComponent={({ children }) => children}
          removeClippedSubviews={false}
          data={props.TableArray}
          extraData={props.TableArray}
          renderItem={renderTable}
          keyExtractor={(item) => "_" + item.TableCodeID.toString()}
          key={(item) => "_" + item.TableCodeID.toString()}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            flex: 1,
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
                width: 270,
                height: 270,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={require("../../assets/images/noFile.png")}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Design;
