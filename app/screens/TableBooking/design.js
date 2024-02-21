import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import CirCleTableStyle from "../../components/CircleTableStyle";
import LongTable from "../../components/LongTable";
import SquareTableStyle from "../../components/SquareTableStyle";
import sizeHelper from "../../helpers/sizeHelper";
import styles from "./style";
import BottomTabBar from "../../components/BottomTabBar";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import AppColor from "../../constant/AppColor";
const Design = (props) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        props={props}
        isSearch={true}
        onInvoiceClick={props.onInvoiceClick}
      />
      <BottomTabBar
        props={props.navigation}
        dispatch={props.dispatch}
        StringsList={props.StringsList}
        orderCode={props?.orderCode}
        setOrderCode={props?.setOrderCode}
      />
      {props.isLoading && (
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
      )}
    </View>
  );
};

export default Design;
