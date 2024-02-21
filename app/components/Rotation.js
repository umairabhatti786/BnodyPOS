import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
  Dimensions,
} from "react-native";

const Rotation = () => {
  const animated = useRef(new Animated.Value(0)).current;

  const rotate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateOpposit = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  const transform = [{ rotate }];
  const transform1 = [{ rotate: rotateOpposit }];

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          borderRadius:
            Math.round(
              Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,
          width: Dimensions.get("window").width * 0.8,
          height: Dimensions.get("window").width * 0.8,
          borderWidth: 5,
          borderColor: "red",
          justifyContent: "center",
          alignItems: "center",
          transform,
        }}
        underlayColor="#ccc"
      >
        <Animated.View style={[styles.dot, { top: 0 }]}>
          <Text style={styles.text}>1</Text>
        </Animated.View>

        <Animated.View style={[styles.dot, { bottom: 0 }]}>
          <Text style={styles.text}>2</Text>
        </Animated.View>
        <Animated.View style={[styles.dot, { right: 0 }]}>
          <Text style={styles.text}>3</Text>
        </Animated.View>
        <Animated.View style={[styles.dot, { left: 0 }]}>
          <Text style={styles.text}>4</Text>
        </Animated.View>
        {/* <Animated.View style={[styles.dot, { top: Dimensions.get('window').width * 0.6, left: 20 }]}>
                    <Text style={styles.text}>5</Text>
                </Animated.View>
                <Animated.View style={[styles.dot, { bottom: Dimensions.get('window').width * 0.3, left: -20 }]}>
                    <Text style={styles.text}>6</Text>
                </Animated.View>
                <Animated.View style={[styles.dot, { bottom: Dimensions.get('window').width * 0.3, right: -20 }]}>
                    <Text style={styles.text}>7</Text>
                </Animated.View> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    position: "absolute",
    width: 200,
    height: 200, // this is the diameter of circle
    borderRadius: 100,
    borderWidth: 1,
    // justifyContent: "space-between",
    flexDirection: "row",
    // paddingStart: 80
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});

export default Rotation;
