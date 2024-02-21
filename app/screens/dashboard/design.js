import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  I18nManager,
  ImageBackground,
} from "react-native";
import * as Progress from "react-native-progress";
import BillingType from "../../components/BillingType";
import NewIcon from "../../assets/svg/newIcon";
import Header from "../../components/Header";
import sizeHelper from "../../helpers/sizeHelper";
import styles from "./style";
import AppColor from "../../constant/AppColor";
import DrawerPopUp from "../../components/DrawerPopUP";
import TerminalSetup from "../../components/TerminalSetup";
import PairPrinterFamily from "../../components/PairPrinterFamily";
import Loading from "../../components/Loading";
import AlertModel from "../../components/AlertModel";

const Design = (props) => {
  const carouselArray = [
    {
      id: "totalOrders",
      title: props?.StringsList._23 + " " + props?.StringsList._506,

      color: AppColor.greenText,
      value: Number(
        props?.TerminalConfiguration?.LastBillNumber
          ? props?.TerminalConfiguration?.LastBillNumber
          : 0
      ),
    },
    {
      id: "totalSales",
      title: I18nManager.isRTL ? "إجمالي المبيعات" : "Total Sales",

      color: AppColor.blueText,
      value: Number(props?.drawerSetupArr.estimatedAmountinDrawer),
    },
    {
      id: "totalReturns",
      title: props?.StringsList._506 + " " + props?.StringsList._29,

      color: AppColor.pinkText,
      value:
        Number(props?.drawerSetupArr.creditRefunds) +
        Number(props?.drawerSetupArr.cardReturn) +
        Number(props?.drawerSetupArr.CashRefund),
    },
    {
      id: "cashTransaction",
      title: I18nManager.isRTL ? "المعاملة النقدية" : "Transaction Cash",

      color: AppColor.yellowText,
      value: Number(props?.drawerSetupArr.CashSales),
    },
    {
      id: "creditTransaction",
      title: I18nManager.isRTL ? "ائتمان المعاملات" : "Transaction Credit",

      color: AppColor.grayText,
      value:
        Number(props?.drawerSetupArr.cardSale) +
        Number(props?.drawerSetupArr.creditSales),
    },
  ];

  const BottomArray = [
    {
      id: "new",
      title: props?.StringsList?._4,
      icon: <NewIcon />,

      disable: false,
      backgroundColor: AppColor.green1,
      imageBackground: require("../../assets/images/new.jpg"),
    },
    {
      id: "postBills",
      title: props?.StringsList?._308,

      disable: !props?.isBillNeedPost,
      color: props?.isBillNeedPost ? AppColor.white : AppColor.disableColor,
      backgroundColor: props?.isBillNeedPost
        ? AppColor.orange2
        : AppColor.disableColor,
      imageBackground: require("../../assets/images/postBills.jpg"),
    },
    {
      id: "return",
      title: props.StringsList._29,

      color: AppColor.pink,
      disable: false,
      backgroundColor: AppColor.pink,
      imageBackground: require("../../assets/images/return.jpg"),
    },
    {
      id: "drawer",
      title: props?.StringsList?._45,

      color: AppColor.pink,
      disable: false,
      backgroundColor: AppColor.pink,
      imageBackground: require("../../assets/images/drawerback.png"),
    },
    {
      id: "pendingOrders",
      title: I18nManager?.isRTL ? "الأوامر المعلقة" : "Pending Orders",

      disable: false,
      backgroundColor: AppColor.orange2,
      color: AppColor.black3,
      imageBackground: require("../../assets/images/pending.jpg"),
    },
    {
      id: "reprint",
      title: props.StringsList._518,

      color: AppColor.black3,
      disable: false,
      backgroundColor: AppColor.red,
      imageBackground: require("../../assets/images/reprint.jpg"),
    },
  ];

  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        disabled={item.disable}
        onPress={() => {
          props?.onPressItem(item.id);
        }}
      >
        <ImageBackground
          source={item.imageBackground}
          style={{
            opacity:
              item.id === "postBills" && !props?.isBillNeedPost ? 0.4 : 1,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: item.backgroundColor,
            width: sizeHelper.calWp(220),
            height: sizeHelper.calHp(205),
            marginVertical:
              sizeHelper.screenWidth > 450
                ? sizeHelper.calHp(18)
                : sizeHelper.calHp(20),
          }}
        >
          <Text
            style={[
              styles.itemTittle,
              {
                color: item.disable ? AppColor.white : AppColor.white,
                // opacity:
                //   item.id === 'postBills' && !props?.isBillNeedPost ? 2 : 1,
              },
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {item.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const carouselRenderItems = ({ item, index }) => {
    let value = item?.value ? item.value : 0;
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: AppColor.white,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          width: sizeHelper.calWp(220),
          height: sizeHelper.calWp(250),
          borderRadius: 10,
          alignSelf: "center",
          justifyContent: "center",
          marginHorizontal: sizeHelper.calHp(10),
          marginVertical: sizeHelper.calHp(10),
        }}
      >
        <View style={styles.carouselItemsContainerV2}>
          <View
            style={{
              position: "absolute",

              width: sizeHelper.calWp(150),
              height: sizeHelper.calWp(150),
              borderRadius: sizeHelper.calWp(150) / 2,

              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Progress.CircleSnail
              duration={3000}
              spinDuration={5000}
              size={sizeHelper.calWp(175)}
              thickness={sizeHelper.calWp(4)}
              color={[
                item?.id === "totalOrders"
                  ? AppColor.greenText
                  : item?.id === "totalSales"
                  ? AppColor.blueText
                  : item?.id === "totalReturns"
                  ? AppColor.pinkText
                  : item?.id === "cashTransaction"
                  ? AppColor.yellowText
                  : AppColor.grayText,
              ]}
            />
          </View>

          <View style={styles.carouselItemsInnerContainer}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[styles.carouselItemCount, { color: item?.color }]}
            >
              {value.toFixed(props?.TerminalConfiguration.DecimalsInAmount)}
            </Text>
          </View>
        </View>
        <Text style={styles.carouselItemTittle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden />
      <Header props={props} isSearch={props.isSearch} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: sizeHelper.calHp(10),
          marginHorizontal: sizeHelper.calHp(22),
        }}
      >
        <View>
          <Text style={styles.overView}>
            {I18nManager.isRTL ? "ملخص" : "Overview"}
          </Text>
        </View>

        <View style={styles.terminalView}>
          <Text style={styles.termianal}>
            {props?.StringsList?._82 +
              ":" +
              props?.TerminalConfiguration?.TerminalCode}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.topContainer}>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={I18nManager.isRTL ? carouselArray.reverse() : carouselArray}
          renderItem={carouselRenderItems}
          horizontal={false}
          style={{
            backgroundColor: AppColor.white,
          }}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            backgroundColor: AppColor.white,
          }}
          contentContainerStyle={{
            paddingBottom: 0,
            marginVertical: sizeHelper.calHp(20),
          }}
          keyExtractor={(item) => "_" + item.id.toString()}
          key={(item) => "_" + item.id.toString()}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View
          style={{
            borderBottomWidth: sizeHelper.calHp(2),
            borderBottomColor: AppColor.gray2,
            marginHorizontal: sizeHelper.calHp(22),
          }}
        >
          <Text
            style={{
              color: AppColor.black,
              fontSize: sizeHelper.calHp(36),
              fontFamily: "ProximaNova-Semibold",
              bottom: 7,
              paddingTop: 15,
            }}
          >
            {I18nManager.isRTL ? "روابط سريعة" : "Quick Links"}
          </Text>
        </View>
        <FlatList
          style={{
            backgroundColor: AppColor.backColor,
          }}
          contentContainerStyle={{
            paddingVertical: sizeHelper.calHp(20),
          }}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-around",
            backgroundColor: AppColor.backColor,
          }}
          data={BottomArray}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
          key={(item) => item.id}
        />
      </View>

      {props?.isPopup && (
        <View style={styles.popupContainer}>
          <DrawerPopUp
            StringsList={props?.StringsList}
            userConfiguration={props?.userConfiguration}
            TerminalConfiguration={props?.TerminalConfiguration}
            cancel={props?.onPressItem}
            viewref={props?.viewref}
          />
        </View>
      )}
      {props?.isPairPrinterFamily && (
        <View style={styles.popupContainer}>
          <PairPrinterFamily
            onPressCancel={() => props?.setPairPrinterFamily(false)}
          />
        </View>
      )}

      {props.isDrawar && (
        <View style={styles.popupContainer}>
          <DrawerPopUp
            StringsList={props.StringsList}
            userConfiguration={props.userConfiguration}
            TerminalConfiguration={props.TerminalConfiguration}
            cancel={() => {
              props.drawerRef?.current?.fadeOutRight().then(() => {
                props?.setIsDrawar(!props?.isDrawar);
                props?.getDrawerSetting();
              });
            }}
            viewref={props.drawerRef}
          />
        </View>
      )}
      {props?.isBillingType && (
        <View style={[styles.popupContainer]}>
          <BillingType
            onPressCancel={() => props?.setisBillingType(false)}
            reacallFunc={props?.reacallFunc}
            selectBillingType={props?.selectBillingType}
            data={props?.billingTypeData}
            StringsList={props?.StringsList}
            isLoading={props?.isLoading}
            type={"dashboard"}
          />
        </View>
      )}
      {props?.isSaleBilType && (
        <View style={[styles.popupContainer]}>
          <BillingType
            onPressCancel={() => props?.setIsSaleBilType(false)}
            reacallFunc={props?.reacallFunc}
            data={props?.saleBilData}
            StringsList={props?.StringsList}
            isLoading={props?.isLoading}
            selectBillingType={props?.selectSaleBilType}
          />
        </View>
      )}
      {props?.isTerminalSetup && (
        <View style={styles.popupContainer}>
          <TerminalSetup onPressCancel={() => props?.setTerminalSetup(false)} />
        </View>
      )}
      {props?.isLoading && (
        <View style={styles.popupContainer}>
          <Loading />
        </View>
      )}
      {/* <TerminalSetup displayAlert={false} /> */}
      <AlertModel
        displayAlert={props.displayAlert}
        onAlertShow={props.setDisplayAlert}
        setisPromptAlert={props.setisPromptAlert}
        isPromptAlert={props.isPromptAlert}
        message={props.message}
        value={props.alertValue}
        onChangeText={props.onChangeText}
        reacallFunc={props.reacallFunc}
        placeholderText={props.message}
        type={props.alertType}
        StringsList={props.StringsList}
        props={props}
      />
    </View>
  );
};

export default Design;
