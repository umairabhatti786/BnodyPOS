'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { View } from 'react-native-animatable';

import QRCodeScanner from 'react-native-qrcode-scanner-plus';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColor from '../constant/AppColor';
import sizeHelper from '../helpers/sizeHelper';

const QRCodeScannerScreen = ({ onSuccess, closeScanner }) => {
  return (
    <QRCodeScanner
      showMarker
      reactivateTimeout={5000}
      reactivate={true}
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      containerStyle={{ marginTop: 10 }}
      cameraStyle={{
        // height: sizeHelper.calHp(350),
        marginTop: 20,
        width: sizeHelper.calHp(200),
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      topContent={
        <TouchableOpacity onPress={closeScanner} style={styles.buttonTouchable}>
          <Icon
            name={'close'}
            size={sizeHelper.calWp(35)}
            color={AppColor.white}
          />
        </TouchableOpacity>
      }
    // bottomContent={
    //   <TouchableOpacity style={styles.buttonTouchable}>
    //     <Text style={styles.buttonText}>OK. Got it!</Text>
    //   </TouchableOpacity>
    // }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    alignSelf: 'flex-end',
    // backgroundColor: "green",
    marginEnd: sizeHelper.calWp(70),
    justifyContent: "center",
    alignItems: "center",
    // padding: 16,
    height: sizeHelper.calHp(80),
    width: sizeHelper.calWp(60)
  },
});

export default QRCodeScannerScreen;
