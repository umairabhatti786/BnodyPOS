import React from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";
import AppColor from "../constant/AppColor";

const Loader = () => {
  return <ActivityIndicator size="small" color={AppColor.white} />;
};
export default Loader;
