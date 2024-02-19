import React, { useState, useRef } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Image,
  I18nManager,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as Progress from "react-native-progress";
import Drawer from "../../assets/svg/drawer.svg";
import HelpIcon from "../../assets/svg/helpIcon.svg";
import LogoutIcon from "../../assets/svg/logoutIcon.svg";
import NewIcon from "../../assets/svg/newIcon.svg";
import RebootTerminalIcon from "../../assets/svg/rebootTerminalIcon.svg";
import Header from "../../components/Header";
import sizeHelper from "../../helpers/sizeHelper";
import styles from "./style";
import AppColor from "../../constant/AppColor";
import DrawerPopUp from "../../components/DrawerPopUP";
import TerminalSetup from "../../components/TerminalSetup";
import PairPrinterFamily from "../../components/PairPrinterFamily";
import Loading from "../../components/Loading";
import AlertModel from "../../components/AlertModel";
import SaleAgentsList from "../../components/SaleAgentsList";
import DrawerPrint from "../../components/DrawerPrint";
import BillingType from "../../components/BillingType";

const Design = (props) => {
  // console.log('drawerSetupArr', drawerSetupArr);
  const carouselArray = [
    {
      id: "totalSales",
      title: I18nManager.isRTL ? "إجمالي المبيعات" : "Total Sales",
      icon: <NewIcon />,
      color: "#7e9a49",
      value:
        Number(props.drawerSetupArr.CashSales) +
        Number(props.drawerSetupArr.creditSales) +
        Number(props.drawerSetupArr.cardSale),
    },
    {
      id: "cashInDrawer",
      title: I18nManager.isRTL ? "نقد في الدرج" : "Cash in Drawer",
      icon: <Drawer />,
      color: "#ba569c",
      value: Number(props.drawerSetupArr.estimatedAmountinDrawer),
    },
    {
      id: "totalReturns",
      title: I18nManager.isRTL ? "العوائد الإجمالية" : "Total Returns",
      icon: <RebootTerminalIcon />,
      color: "#d99359",
      value:
        Number(props.drawerSetupArr.creditRefunds) +
        Number(props.drawerSetupArr.cardReturn) +
        Number(props.drawerSetupArr.CashRefund),
    },
  ];
  const [activeSlide, setActiveSlide] = useState({
    activeSlide: I18nManager.isRTL ? carouselArray.length - 1 : 0,
  });
  const BottomArray = [
    {
      id: "new",
      title: props.StringsList?._4,
      icon: <NewIcon />,
      color: AppColor.green1,
      disable: false,
    },
    {
      id: "drawer",
      title: props.StringsList?._45,
      icon: <Drawer />,
      color: AppColor.pink,
      disable: false,
    },
    {
      id: "rebootTerminal",
      title: props.StringsList?._307,
      icon: <RebootTerminalIcon />,
      color: AppColor.green1,
      disable: false,
    },
    {
      id: "saleAgents",
      title: I18nManager.isRTL ? "وكلاء البيع" : "Sale Agents",
      icon: (
        <HelpIcon
          color={
            props.userConfiguration.AssignSalesAgentAgainstServices === 1
              ? AppColor.orange2
              : AppColor.disableColor
          }
        />
      ),
      disable: props.userConfiguration.AssignSalesAgentAgainstServices === 0,
      color:
        props.userConfiguration.AssignSalesAgentAgainstServices === 1
          ? AppColor.orange2
          : AppColor.disableColor,
    },
    {
      id: "postBills",
      title: props.StringsList?._308,
      icon: (
        <Image
          style={{
            height: 45,
            width: 30,
            tintColor: props.isBillNeedPost
              ? AppColor.orange2
              : AppColor.disableColor,
          }}
          source={require("../../assets/images/receipt.png")}
        />
      ),
      disable: !props.isBillNeedPost,
      color: props.isBillNeedPost ? AppColor.orange2 : AppColor.disableColor,
    },
    {
      id: "logout",
      title: props.StringsList?._326,
      icon: <LogoutIcon />,
      color: AppColor.yellow1,
      disable: false,
    },
  ];

  const pagination = () => {
    return (
      <Pagination
        dotsLength={carouselArray.length}
        activeDotIndex={activeSlide.activeSlide}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const renderItems = ({ item, index }) => {
    //console.log('isBillNeedPost..', isBillNeedPost);
    return (
      <View
        style={[
          styles.renderItemContainer,
          {
            margin: sizeHelper.calWp(20),
            opacity: item.id === "postBills" && !props.isBillNeedPost ? 0.4 : 1,
          },
        ]}
      >
        <View
          style={[
            styles.divider,
            {
              width:
                index === 1 || index === 4
                  ? sizeHelper.calWp(300)
                  : sizeHelper.calWp(200),
            },
          ]}
        />

        <TouchableOpacity
          disabled={item.disable}
          style={[
            styles.renderItemContainer,
            { justifyContent: "space-between" },
          ]}
          onPress={() => {
            props.onPressItem(item.id);
          }}
        >
          {item.icon}
          <Text
            style={[
              styles.itemTittle,
              { color: item.disable ? AppColor.gray1 : AppColor.white },
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View
            style={[
              styles.itemsBottomLine,
              {
                backgroundColor: item.color,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const carouselRenderItems = ({ item, index }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={
            activeSlide.activeSlide === index
              ? styles.carouselItemsContainer
              : styles.carouselItemsContainerV2
          }
        >
          {activeSlide.activeSlide === index && (
            <View
              style={{
                position: "absolute",
                alignItems: "center",
              }}
            >
              <Progress.CircleSnail
                duration={3000}
                spinDuration={5000}
                size={sizeHelper.calWp(260)}
                thickness={sizeHelper.calWp(4)}
                color={[
                  AppColor.purple,
                  AppColor.green1,
                  AppColor.pink,
                  AppColor.orange1,
                  AppColor.orange2,
                  AppColor.yellow1,
                ]}
              />
            </View>
          )}
          <View style={styles.carouselItemsInnerContainer}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.carouselItemCount}
            >
              {item.value.toFixed(props.TerminalConfiguration.DecimalsInAmount)}
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
      <Header props={props} />
      <Text style={styles.aromatic}>
        {props.selectedAgent?.SalesAgentName
          ? props.selectedAgent?.SalesAgentName
          : props.TerminalConfiguration.SalesAgentName}
      </Text>
      <Text style={styles.pointOfSale}>
        {I18nManager.isRTL ? "نقطة البيع" : "Point Of Sale"}
      </Text>
      <View style={styles.topContainer}>
        <View>
          <Carousel
            inactiveSlideScale={0.8}
            data={I18nManager.isRTL ? carouselArray.reverse() : carouselArray}
            renderItem={carouselRenderItems}
            sliderWidth={sizeHelper.screenWidth}
            itemWidth={sizeHelper.calWp(250)}
            onSnapToItem={(index) =>
              setActiveSlide({
                activeSlide: I18nManager.isRTL
                  ? carouselArray.length - (1 + index)
                  : index,
              })
            }
          />
        </View>
        {pagination()}
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={3}
          style={{
            backgroundColor: AppColor.blue,
          }}
          columnWrapperStyle={{
            justifyContent: "space-around",
          }}
          contentContainerStyle={{ paddingVertical: sizeHelper.calHp(100) }}
          data={BottomArray}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
          key={(item) => item.id}
        />
      </View>

      {props.isPopup && (
        <View style={styles.popupContainer}>
          <DrawerPopUp
            StringsList={props.StringsList}
            userConfiguration={props.userConfiguration}
            TerminalConfiguration={props.TerminalConfiguration}
            cancel={props.onPressItem}
            viewref={props.viewref}
            // onSave={() => props.setIsDrawar(!props.isDrawar)}
          />
        </View>
      )}
      {props.isTerminalSetup && (
        <View style={styles.popupContainer}>
          <TerminalSetup onPressCancel={() => props.setTerminalSetup(false)} />
        </View>
      )}
      {props.isPairPrinterFamily && (
        <View style={styles.popupContainer}>
          <PairPrinterFamily
            onPressCancel={() => props.setPairPrinterFamily(false)}
          />
        </View>
      )}
      {props.isSaleAgents && (
        <View style={[styles.popupContainer]}>
          <SaleAgentsList
            onPressCancel={() => props.setIsSaleAgents(false)}
            reacallFunc={props.selectedSaleAgentsFun}
            data={props.salesAgentsList}
            StringsList={props.StringsList}
            isLoading={props.isLoading}
            isGlobal
          />
        </View>
      )}
      {props.isLogout && (
        <View style={styles.popupContainer}>
          <DrawerPrint
            StringsList={props.StringsList}
            TerminalConfiguration={props.TerminalConfiguration}
          />
        </View>
      )}
      {props.isLoading && (
        <View style={styles.popupContainer}>
          <Loading />
        </View>
      )}
      {props.isBillingType && (
        <View style={[styles.popupContainer]}>
          <BillingType
            onPressCancel={() => props.setisBillingType(false)}
            reacallFunc={props.reacallFunc}
            selectBillingType={props.selectBillingType}
            data={props.billingTypeData}
            StringsList={props.StringsList}
            isLoading={props.isLoading}
            type={"dashboard"}
          />
        </View>
      )}
      {props.isSaleBilType && (
        <View style={[styles.popupContainer]}>
          <BillingType
            onPressCancel={() => props.setIsSaleBilType(false)}
            reacallFunc={props.reacallFunc}
            data={props.saleBilData}
            tringsList={props.StringsList}
            isLoading={props.isLoading}
            selectBillingType={props.selectSaleBilType}
          />
        </View>
      )}
      {/* <TerminalSetup displayAlert={false} /> */}
      <AlertModel
        displayAlert={props.displayAlert}
        onAlertShow={props.setDisplayAlert}
        setisPromptAlert={() => {}}
        isPromptAlert={false}
        message={props.message}
        value={""}
        isConfirmation={props.isRequriedLogin}
        onChangeText={() => {}}
        reacallFunc={props.reacallFunc}
        placeholderText={""}
        type={"invoiceNumber"}
      />
    </View>
  );
};

export default Design;
