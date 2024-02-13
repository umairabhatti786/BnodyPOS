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
import i18n from "i18n-js";
import * as Progress from "react-native-progress";

import Drawer from "../../assets/svg/drawer";
import HelpIcon from "../../assets/svg/helpIcon";
import LogoutIcon from "../../assets/svg/logoutIcon";
import NewIcon from "../../assets/svg/newIcon";
import RebootTerminalIcon from "../../assets/svg/rebootTerminalIcon";
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
import GlobalTaxList from "../../components/GlobalTaxList";
import BillingType from "../../components/BillingType";

const Design = ({
  onPressItem,
  isPopup,
  viewref,
  StringsList,
  isTerminalSetup,
  isPairPrinterFamily,
  isLoading,
  setTerminalSetup,
  setPairPrinterFamily,
  onClickSetting,
  displayAlert,
  setDisplayAlert,
  message,
  isBillNeedPost,
  drawerSetupArr,
  TerminalConfiguration,
  isRequriedLogin,
  reacallFunc,
  isSaleAgents,
  salesAgentsList,
  setIsSaleAgents,
  selectedSaleAgentsFun,
  selectedAgent,
  userConfiguration,
  onClickPowerOff,
  isLogout,
  isBillingType,
  setisBillingType,
  billingTypeData,
  selectBillingType,
  isSaleBilType,
  setSaleBilType,
  saleBilData,
  selectSaleBilType,
  setIsSaleBilType,
  saleBilType,
}) => {
  // console.log('drawerSetupArr', drawerSetupArr);
  const carouselArray = [
    {
      id: "totalSales",
      title: I18nManager.isRTL ? "إجمالي المبيعات" : "Total Sales",
      icon: <NewIcon />,
      color: "#7e9a49",
      value:
        Number(drawerSetupArr.CashSales) +
        Number(drawerSetupArr.creditSales) +
        Number(drawerSetupArr.cardSale),
    },
    {
      id: "cashInDrawer",
      title: I18nManager.isRTL ? "نقد في الدرج" : "Cash in Drawer",
      icon: <Drawer />,
      color: "#ba569c",
      value: Number(drawerSetupArr.estimatedAmountinDrawer),
    },
    {
      id: "totalReturns",
      title: I18nManager.isRTL ? "العوائد الإجمالية" : "Total Returns",
      icon: <RebootTerminalIcon />,
      color: "#d99359",
      value:
        Number(drawerSetupArr.creditRefunds) +
        Number(drawerSetupArr.cardReturn) +
        Number(drawerSetupArr.CashRefund),
    },
  ];
  const [activeSlide, setActiveSlide] = useState({
    activeSlide: I18nManager.isRTL ? carouselArray.length - 1 : 0,
  });
  const BottomArray = [
    {
      id: "new",
      title: StringsList?._4,
      icon: <NewIcon />,
      color: AppColor.green1,
      disable: false,
    },
    {
      id: "drawer",
      title: StringsList?._45,
      icon: <Drawer />,
      color: AppColor.pink,
      disable: false,
    },
    {
      id: "rebootTerminal",
      title: StringsList?._307,
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
            userConfiguration.AssignSalesAgentAgainstServices === 1
              ? AppColor.orange2
              : AppColor.disableColor
          }
        />
      ),
      disable: userConfiguration.AssignSalesAgentAgainstServices === 0,
      color:
        userConfiguration.AssignSalesAgentAgainstServices === 1
          ? AppColor.orange2
          : AppColor.disableColor,
    },
    {
      id: "postBills",
      title: StringsList?._308,
      icon: (
        <Image
          style={{
            height: 45,
            width: 30,
            tintColor: isBillNeedPost
              ? AppColor.orange2
              : AppColor.disableColor,
          }}
          source={require("../../assets/images/receipt.png")}
        />
      ),
      disable: !isBillNeedPost,
      color: isBillNeedPost ? AppColor.orange2 : AppColor.disableColor,
    },
    {
      id: "logout",
      title: StringsList?._326,
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
            opacity: item.id === "postBills" && !isBillNeedPost ? 0.4 : 1,
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
            onPressItem(item.id);
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
              {item.value.toFixed(TerminalConfiguration.DecimalsInAmount)}
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
      <Header
        onClickPowerOff={onClickPowerOff}
        StringsList={StringsList}
        isDashboard
        onClickSetting={onClickSetting}
      />
      <Text style={styles.aromatic}>
        {selectedAgent?.SalesAgentName
          ? selectedAgent?.SalesAgentName
          : TerminalConfiguration.SalesAgentName}
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

      {isPopup && (
        <View style={styles.popupContainer}>
          <DrawerPopUp
            StringsList={StringsList}
            userConfiguration={userConfiguration}
            TerminalConfiguration={TerminalConfiguration}
            cancel={onPressItem}
            viewref={viewref}
            // onSave={() => props.setIsDrawar(!props.isDrawar)}
          />
        </View>
      )}
      {isTerminalSetup && (
        <View style={styles.popupContainer}>
          <TerminalSetup onPressCancel={() => setTerminalSetup(false)} />
        </View>
      )}
      {isPairPrinterFamily && (
        <View style={styles.popupContainer}>
          <PairPrinterFamily
            onPressCancel={() => setPairPrinterFamily(false)}
          />
        </View>
      )}
      {isSaleAgents && (
        <View style={[styles.popupContainer]}>
          <SaleAgentsList
            onPressCancel={() => setIsSaleAgents(false)}
            reacallFunc={selectedSaleAgentsFun}
            data={salesAgentsList}
            StringsList={StringsList}
            isLoading={isLoading}
            isGlobal
          />
        </View>
      )}
      {isLogout && (
        <View style={styles.popupContainer}>
          <DrawerPrint
            StringsList={StringsList}
            TerminalConfiguration={TerminalConfiguration}
          />
        </View>
      )}
      {isLoading && (
        <View style={styles.popupContainer}>
          <Loading />
        </View>
      )}
      {isBillingType && (
        <View style={[styles.popupContainer]}>
          <BillingType
            onPressCancel={() => setisBillingType(false)}
            reacallFunc={reacallFunc}
            selectBillingType={selectBillingType}
            data={billingTypeData}
            StringsList={StringsList}
            isLoading={isLoading}
            type={"dashboard"}
          />
        </View>
      )}
      {isSaleBilType && (
        <View style={[styles.popupContainer]}>
          <BillingType
            onPressCancel={() => setIsSaleBilType(false)}
            reacallFunc={reacallFunc}
            data={saleBilData}
            StringsList={StringsList}
            isLoading={isLoading}
            selectBillingType={selectSaleBilType}
          />
        </View>
      )}
      {/* <TerminalSetup displayAlert={false} /> */}
      <AlertModel
        displayAlert={displayAlert}
        onAlertShow={setDisplayAlert}
        setisPromptAlert={() => {}}
        isPromptAlert={false}
        message={message}
        value={""}
        isConfirmation={isRequriedLogin}
        onChangeText={() => {}}
        reacallFunc={reacallFunc}
        placeholderText={""}
        type={"invoiceNumber"}
      />
    </View>
  );
};

export default Design;
