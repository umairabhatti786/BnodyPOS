import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text, View, AccessibilityInfo, StyleSheet } from "react-native";

// Components
import SwipeThumb from "./SwipeThumb";

// Constants
import {
  DISABLED_RAIL_BACKGROUND_COLOR,
  DISABLED_THUMB_ICON_BACKGROUND_COLOR,
  DISABLED_THUMB_ICON_BORDER_COLOR,
  RAIL_BACKGROUND_COLOR,
  RAIL_BORDER_COLOR,
  RAIL_FILL_BACKGROUND_COLOR,
  RAIL_FILL_BORDER_COLOR,
  SWIPE_SUCCESS_THRESHOLD,
  THUMB_ICON_BACKGROUND_COLOR,
  THUMB_ICON_BORDER_COLOR,
  TITLE_COLOR,
} from "../constant/SwipeButton";

const SwipeButton = (props) => {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);

  /**
   * Retrieve layoutWidth to set maximum swipeable area.
   * Correct layout width will be received only after first render but we need it before render.
   * So render SwipeThumb only if layoutWidth > 0
   */
  const onLayoutContainer = async (e) => {
    if (isUnmounting || layoutWidth) {
      return;
    }
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    const handleScreenReaderToggled = (isEnabled) => {
      if (isUnmounting || screenReaderEnabled === isEnabled) {
        return;
      }
      setScreenReaderEnabled(isEnabled);
    };
    setIsUnmounting(false);
    const subscription = AccessibilityInfo.addEventListener(
      "change",
      handleScreenReaderToggled
    );

    AccessibilityInfo.isScreenReaderEnabled().then((isEnabled) => {
      if (isUnmounting) {
        return;
      }
      setScreenReaderEnabled(isEnabled);
    });

    return () => {
      setIsUnmounting(true);
      subscription.remove();
    };
  }, [isUnmounting, screenReaderEnabled]);

  const {
    containerStyles,
    disabled,
    disabledRailBackgroundColor,
    disabledThumbIconBackgroundColor,
    disabledThumbIconBorderColor,
    disableResetOnTap,
    enableReverseSwipe,
    forceReset,
    height,
    onSwipeFail,
    onSwipeStart,
    onSwipeSuccess,
    railBackgroundColor,
    railBorderColor,
    railFillBackgroundColor,
    railFillBorderColor,
    railStyles,
    resetAfterSuccessAnimDelay,
    resetAfterSuccessAnimDuration,
    shouldResetAfterSuccess,
    swipeSuccessThreshold,
    thumbIconBackgroundColor,
    thumbIconBorderColor,
    thumbIconComponent,
    thumbIconImageSource,
    thumbIconStyles,
    thumbIconWidth,
    title,
    titleColor,
    titleFontSize,
    titleMaxFontScale,
    titleStyles,
    width,
  } = props;
  return (
    <View
      style={[
        styles.container,
        {
          ...containerStyles,
          backgroundColor: disabled
            ? disabledRailBackgroundColor
            : railBackgroundColor,
          borderColor: railBorderColor,
          ...(width ? { width } : {}),
        },
      ]}
      onLayout={onLayoutContainer}
    >
      <Text
        maxFontSizeMultiplier={titleMaxFontScale}
        ellipsizeMode={"tail"}
        numberOfLines={1}
        importantForAccessibility={
          screenReaderEnabled ? "no-hide-descendants" : ""
        }
        style={[
          styles.title,
          {
            color: titleColor,
            fontSize: titleFontSize,
            ...titleStyles,
          },
        ]}
      >
        {title}
      </Text>
      {layoutWidth > 0 && (
        <SwipeThumb
          disabled={disabled}
          disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
          disabledThumbIconBorderColor={disabledThumbIconBorderColor}
          disableResetOnTap={disableResetOnTap}
          enableReverseSwipe={enableReverseSwipe}
          forceReset={forceReset}
          layoutWidth={layoutWidth}
          onSwipeFail={onSwipeFail}
          onSwipeStart={onSwipeStart}
          onSwipeSuccess={onSwipeSuccess}
          railFillBackgroundColor={railFillBackgroundColor}
          railFillBorderColor={railFillBorderColor}
          railStyles={railStyles}
          resetAfterSuccessAnimDelay={resetAfterSuccessAnimDelay}
          resetAfterSuccessAnimDuration={resetAfterSuccessAnimDuration}
          screenReaderEnabled={screenReaderEnabled}
          shouldResetAfterSuccess={shouldResetAfterSuccess}
          swipeSuccessThreshold={swipeSuccessThreshold}
          thumbIconBackgroundColor={thumbIconBackgroundColor}
          thumbIconBorderColor={thumbIconBorderColor}
          thumbIconComponent={thumbIconComponent}
          thumbIconHeight={height}
          thumbIconImageSource={thumbIconImageSource}
          thumbIconStyles={thumbIconStyles}
          thumbIconWidth={thumbIconWidth}
          title={title}
        />
      )}
    </View>
  );
};

SwipeButton.defaultProps = {
  containerStyles: {},
  disabled: false,
  disabledRailBackgroundColor: DISABLED_RAIL_BACKGROUND_COLOR,
  disabledThumbIconBackgroundColor: DISABLED_THUMB_ICON_BACKGROUND_COLOR,
  disabledThumbIconBorderColor: DISABLED_THUMB_ICON_BORDER_COLOR,
  disableResetOnTap: false,
  height: 50,
  railBackgroundColor: RAIL_BACKGROUND_COLOR,
  railBorderColor: RAIL_BORDER_COLOR,
  railFillBackgroundColor: RAIL_FILL_BACKGROUND_COLOR,
  railFillBorderColor: RAIL_FILL_BORDER_COLOR,
  swipeSuccessThreshold: SWIPE_SUCCESS_THRESHOLD,
  thumbIconBackgroundColor: THUMB_ICON_BACKGROUND_COLOR,
  thumbIconBorderColor: THUMB_ICON_BORDER_COLOR,
  thumbIconStyles: {},
  title: "",
  titleColor: TITLE_COLOR,
  titleFontSize: 20,
  titleStyles: {},
};

SwipeButton.propTypes = {
  containerStyles: PropTypes.object,
  disable: PropTypes.bool,
  disabledRailBackgroundColor: PropTypes.string,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  disableResetOnTap: PropTypes.bool,
  enableReverseSwipe: PropTypes.bool,
  forceReset: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSwipeFail: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railBackgroundColor: PropTypes.string,
  railBorderColor: PropTypes.string,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  railStyles: PropTypes.object,
  resetAfterSuccessAnimDelay: PropTypes.number,
  resetAfterSuccessAnimDuration: PropTypes.number,
  shouldResetAfterSuccess: PropTypes.bool,
  swipeSuccessThreshold: PropTypes.number, // Ex: 70. Swipping 70% will be considered as successful swipe
  thumbIconBackgroundColor: PropTypes.string,
  thumbIconBorderColor: PropTypes.string,
  thumbIconComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
  ]),
  thumbIconImageSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  thumbIconStyles: PropTypes.object,
  thumbIconWidth: PropTypes.number,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number,
  titleMaxFontScale: PropTypes.number,
  titleStyles: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 100 / 2,
    borderWidth: 1,
    justifyContent: "center",
    margin: 10,
  },
  title: {
    alignSelf: "flex-start",
    position: "absolute",
  },
});
export default SwipeButton;
// import React from "react";
// import { StyleSheet } from "react-native";

// import LinearGradient from "react-native-linear-gradient";

// import { PanGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedGestureHandler,
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   interpolate,
//   Extrapolate,
//   interpolateColor,
//   runOnJS,
// } from "react-native-reanimated";
// import { useState } from "react";

// const BUTTON_WIDTH = 350;
// const BUTTON_HEIGHT = 100;
// const BUTTON_PADDING = 10;
// const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

// const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
// const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// const SwipeButton = ({ onToggle }) => {
//   // Animated value for X translation
//   const X = useSharedValue(0);
//   // Toggled State
//   const [toggled, setToggled] = useState(false);

//   // Fires when animation ends
//   const handleComplete = (isToggled) => {
//     if (isToggled !== toggled) {
//       setToggled(isToggled);
//       onToggle(isToggled);
//     }
//   };

//   // Gesture Handler Events
//   const animatedGestureHandler = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.completed = toggled;
//     },
//     onActive: (e, ctx) => {
//       let newValue;
//       if (ctx.completed) {
//         newValue = H_SWIPE_RANGE + e.translationX;
//       } else {
//         newValue = e.translationX;
//       }

//       if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
//         X.value = newValue;
//       }
//     },
//     onEnd: () => {
//       if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
//         X.value = withSpring(0);
//         runOnJS(handleComplete)(false);
//       } else {
//         X.value = withSpring(H_SWIPE_RANGE);
//         runOnJS(handleComplete)(true);
//       }
//     },
//   });

//   const InterpolateXInput = [0, H_SWIPE_RANGE];
//   const AnimatedStyles = {
//     swipeCont: useAnimatedStyle(() => {
//       return {};
//     }),
//     colorWave: useAnimatedStyle(() => {
//       return {
//         width: H_WAVE_RANGE + X.value,

//         opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
//       };
//     }),
//     swipeable: useAnimatedStyle(() => {
//       return {
//         backgroundColor: interpolateColor(
//           X.value,
//           [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
//           ["#06d6a0", "#fff"]
//         ),
//         transform: [{ translateX: X.value }],
//       };
//     }),
//     swipeText: useAnimatedStyle(() => {
//       return {
//         opacity: interpolate(
//           X.value,
//           InterpolateXInput,
//           [0.7, 0],
//           Extrapolate.CLAMP
//         ),
//         transform: [
//           {
//             translateX: interpolate(
//               X.value,
//               InterpolateXInput,
//               [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
//               Extrapolate.CLAMP
//             ),
//           },
//         ],
//       };
//     }),
//   };

//   return (
//     <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
//       <AnimatedLinearGradient
//         style={[AnimatedStyles.colorWave, styles.colorWave]}
//         colors={["#06d6a0", "#1b9aaa"]}
//         start={{ x: 0.0, y: 0.5 }}
//         end={{ x: 1, y: 0.5 }}
//       />
//       <PanGestureHandler onGestureEvent={animatedGestureHandler}>
//         <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} />
//       </PanGestureHandler>
//       <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
//         Swipe Me
//       </Animated.Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   swipeCont: {
//     height: BUTTON_HEIGHT,
//     width: BUTTON_WIDTH,
//     backgroundColor: "#fff",
//     borderRadius: BUTTON_HEIGHT,
//     padding: BUTTON_PADDING,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   colorWave: {
//     position: "absolute",
//     left: 0,
//     height: BUTTON_HEIGHT,
//     borderRadius: BUTTON_HEIGHT,
//   },
//   swipeable: {
//     position: "absolute",
//     left: BUTTON_PADDING,
//     height: SWIPEABLE_DIMENSIONS,
//     width: SWIPEABLE_DIMENSIONS,
//     borderRadius: SWIPEABLE_DIMENSIONS,
//     zIndex: 3,
//   },
//   swipeText: {
//     alignSelf: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//     zIndex: 2,
//     color: "#1b9aaa",
//   },
// });

// export default SwipeButton;
// import React, { useEffect } from "react";
// import { I18nManager, StyleSheet, Text, View } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import LinearGradient from "react-native-linear-gradient";
// import { PanGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedGestureHandler,
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   interpolate,
//   Extrapolate,
//   interpolateColor,
//   runOnJS,
// } from "react-native-reanimated";
// import { useState } from "react";
// import sizeHelper from "../helpers/sizeHelper";
// import AppColor from "../constant/AppColor";

// const BUTTON_WIDTH = sizeHelper.screenWidth - sizeHelper.calWp(35);
// const BUTTON_HEIGHT = sizeHelper.calWp(75);
// const BUTTON_PADDING = 3;
// const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

// const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
// const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// const SwipeButton = ({ onToggle, tableCode, orderID, toggled, setToggled }) => {
//   // Animated value for X translation

//   const X = useSharedValue(0);
//   // Toggled State

//   // Fires when animation ends
//   const handleComplete = (isToggled) => {
//     if (isToggled !== toggled) {
//       setToggled(isToggled);
//       onToggle(isToggled);
//     }
//   };

//   // Gesture Handler Events
//   const animatedGestureHandler = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.completed = toggled;
//     },
//     onActive: (e, ctx) => {
//       let newValue;
//       if (ctx.completed) {
//         newValue = H_SWIPE_RANGE + e.translationX;
//       } else {
//         newValue = e.translationX;
//       }

//       if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
//         X.value = newValue;
//       }
//     },
//     onEnd: () => {
//       if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
//         X.value = withSpring(0);
//         runOnJS(handleComplete)(false);
//       } else {
//         X.value = withSpring(H_SWIPE_RANGE);
//         runOnJS(handleComplete)(true);
//       }
//     },
//   });

//   const InterpolateXInput = [0, H_SWIPE_RANGE];
//   const AnimatedStyles = {
//     swipeCont: useAnimatedStyle(() => {
//       return {};
//     }),
//     colorWave: useAnimatedStyle(() => {
//       return {
//         width: H_WAVE_RANGE + X.value,

//         opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
//       };
//     }),
//     swipeable: useAnimatedStyle(() => {
//       return {
//         backgroundColor: interpolateColor(
//           X.value,
//           [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
//           [AppColor.white, AppColor.white]
//         ),
//         transform: [{ translateX: X.value }],
//       };
//     }),
//     swipeText: useAnimatedStyle(() => {
//       return {
//         opacity: interpolate(
//           X.value,
//           InterpolateXInput,
//           [1, 0],
//           Extrapolate.CLAMP
//         ),
//         transform: [
//           {
//             translateX: interpolate(
//               X.value,
//               InterpolateXInput,
//               [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
//               Extrapolate.CLAMP
//             ),
//           },
//         ],
//       };
//     }),
//   };

//   return orderID === 1 && tableCode ? (
//     <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
//       <AnimatedLinearGradient
//         style={[AnimatedStyles.colorWave, styles.colorWave]}
//         colors={[AppColor.green, AppColor.green]}
//         start={{ x: 0.0, y: 0.5 }}
//         end={{ x: 1, y: 0.5 }}
//       />
//       <PanGestureHandler onGestureEvent={animatedGestureHandler}>
//         <Animated.View
//           style={[
//             styles.swipeable,
//             AnimatedStyles.swipeable,
//             {
//               justifyContent: I18nManager.isRTL ? "flex-end" : "flex-start",
//               marginLeft: I18nManager.isRTL ? BUTTON_WIDTH - 50 : 0,
//               alignItems: "center",
//             },
//           ]}
//         >
//           <Icon
//             style={{
//               paddingLeft: 3,
//               marginTop:
//                 sizeHelper.screenWidth > 450
//                   ? sizeHelper.calWp(23)
//                   : sizeHelper.calWp(20),
//             }}
//             name="forward"
//             size={sizeHelper.calHp(24)}
//             color={AppColor.yellowColor}
//           />
//         </Animated.View>
//       </PanGestureHandler>
//       <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
//         Swipe to Pay & Place Order
//       </Animated.Text>
//     </Animated.View>
//   ) : orderID !== 1 && orderID !== 0 ? (
//     <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
//       <AnimatedLinearGradient
//         style={[AnimatedStyles.colorWave, styles.colorWave]}
//         colors={[AppColor.green, AppColor.green]}
//         start={{ x: 0.0, y: 0.5 }}
//         end={{ x: 1, y: 0.5 }}
//       />
//       <PanGestureHandler onGestureEvent={animatedGestureHandler}>
//         <Animated.View
//           style={[
//             styles.swipeable,
//             AnimatedStyles.swipeable,
//             {
//               justifyContent: I18nManager.isRTL ? "flex-end" : "flex-start",
//               marginLeft: I18nManager.isRTL ? BUTTON_WIDTH - 50 : 0,
//               alignItems: "center",
//             },
//           ]}
//         >
//           <Icon
//             style={{
//               paddingLeft: 3,
//               marginTop:
//                 sizeHelper.screenWidth > 450
//                   ? sizeHelper.calWp(23)
//                   : sizeHelper.calWp(20),
//             }}
//             name="forward"
//             size={sizeHelper.calHp(24)}
//             color={AppColor.yellowColor}
//           />
//         </Animated.View>
//       </PanGestureHandler>
//       <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
//         Swipe to Pay & Place Order
//       </Animated.Text>
//     </Animated.View>
//   ) : (
//     <View style={[styles.swipeDisCont]}>
//       <View style={[styles.swipeable]}>
//         <Icon
//           style={{ paddingLeft: 5, justifyContent: "center" }}
//           name="forward"
//           size={sizeHelper.calHp(24)}
//           color={AppColor.yellowColor}
//         />
//       </View>
//       <Text style={[styles.DisswipeText]}>Swipe to Pay & Place Order</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   swipeCont: {
//     height: BUTTON_HEIGHT,
//     width: BUTTON_WIDTH,
//     backgroundColor: AppColor.blue2,
//     borderRadius: BUTTON_HEIGHT,
//     padding: BUTTON_PADDING,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     marginVertical: 5,
//   },
//   colorWave: {
//     position: "absolute",
//     left: 0,
//     height: BUTTON_HEIGHT,
//     borderRadius: BUTTON_HEIGHT,
//   },
//   swipeable: {
//     alignItems: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     left: BUTTON_PADDING,
//     height: SWIPEABLE_DIMENSIONS,
//     width: SWIPEABLE_DIMENSIONS,
//     borderRadius: SWIPEABLE_DIMENSIONS,
//     zIndex: 3,
//   },
//   swipeText: {
//     alignSelf: "center",
//     fontSize: sizeHelper.calHp(25),
//     // fontWeight: "bold",
//     zIndex: 2,
//     color: "#fff",
//     fontFamily: "ProximaNova-Regular",
//   },
//   swipeDisCont: {
//     height: BUTTON_HEIGHT,
//     width: BUTTON_WIDTH,
//     backgroundColor: AppColor.disableColor,
//     borderRadius: BUTTON_HEIGHT,
//     padding: BUTTON_PADDING,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     marginVertical: 5,
//   },
//   DisswipeText: {
//     alignSelf: "center",
//     fontSize: sizeHelper.calHp(25),
//     fontFamily: "ProximaNova-Regular",
//     zIndex: 2,
//     color: AppColor.grayColor,
//   },
// });

// export default SwipeButton;
