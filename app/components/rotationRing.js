import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const SvgExample = () => {
  const slice = () => {
    let slices = [];

    // Option 2: Different size pieces
    const numberOfSlice = 8; // Number for slice
    const colorArr = [
      "red",
      "green",
      "yellow",
      "blue",
      "red",
      "green",
      "yellow",
      "blue",
      "red",
    ]; // Color the slice
    for (let i = 0; i < numberOfSlice; i++) {
      slices.push({ percent: 1 / numberOfSlice, color: colorArr[i] || "gray" });
    }

    let cumulativePercent = 0;

    function getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }

    let arr = [];
    arr = slices.map((slice, index) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        "L 0 0", // Line
      ].join(" ");
      return <Path d={pathData} fill={slice.color} key={pathData} />;
    });
    console.log("rotation array", arr);
    return arr;
  };

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Svg
        height="300"
        width="300"
        viewBox="-1 -1 2 2"
        style={{ transform: [{ rotate: "0deg" }] }}
      >
        {slice()}
      </Svg>
    </View>
  );
};

export default SvgExample;
