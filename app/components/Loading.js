import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppColor from '../constant/AppColor';

const Loading = () => {
  return <ActivityIndicator size="small" color={AppColor.white} />;
};
export default Loading;
