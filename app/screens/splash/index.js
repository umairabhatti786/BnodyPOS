import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  I18nManager,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  NativeModules,
  Platform,
  NativeEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import {SaveAllData} from '../../redux/actions/asynchronousAction';
import {getData} from '../../sqliteHelper';
import Design from './design';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './style';
import AppColor from '../../constant/AppColor';
import {StringsListTable} from '../../sqliteTables/StringsList';

const Stack = createStackNavigator();

const SplashScreen = props => {
  const {navigation} = props;
  const [loading, setloading] = useState(true);
  const [showRealApp, setRealApp] = useState(false);
  const createFile = NativeModules.PermissionFile;
  const PermissionFile = NativeModules.PrinterNativeModule;
  const eventEmitter = new NativeEventEmitter(PermissionFile);
  useEffect(() => {
    if (Platform.OS === 'android') {
      const OsVer = Platform.constants['Release'];
      if (OsVer >= 10) {
        const newDevice = eventEmitter.addListener(
          'DeviceFound',
          async deviceDiscovered => {
            let uri = deviceDiscovered;
            console.log('Device discovered uri is: ' + uri);
            AsyncStorage.setItem('FILE_URI', uri, err => {
              if (err) {
                console.log('an error');
                throw err;
              }
              console.log('success');
            }).catch(err => {
              console.log('error is: ' + err);
            });
          },
        );

        return () => newDevice.remove();
      }
    }
  });
  useEffect(async () => {
    if (Platform.OS === 'android') {
      const OsVer = Platform.constants['Release'];
      if (OsVer >= 11) {
        let path = '/storage/emulated/0/Documents/Bnody POS/Invoices.txt';
        if (await RNFS.exists(path)) {
          // console.log(
          //   'File already exists',
          //  await RNFS.exists(path) + 'OS version',
          //   OsVer,
          // );
        } else {
          console.log('File creation', +'OS version', OsVer);
          createFile.overWriteAbove29(
            '',
            err => {
              if (err) {
                console.log('Permission Error', err);
              }
            },
            success => {
              if (success) {
                // You can use RN-fetch-blog to download files and storge into download Manager
                // RNFS.unlink(path);
                console.log('Folder created with empty file', success);
              }
            },
          );
        }
      } else {
        let path = '/storage/emulated/0/Downloads/Bnody POS/Invoices.txt';
        if (RNFS.exists(path)) {
          // console.log(
          //   'File already exists',
          // await  RNFS.exists(path) + 'OS version',
          //   OsVer,
          // );
        } else {
          console.log('File creation', +'OS version', OsVer);
          createFile.overWriteAPI29(
            '',
            err => {
              if (err) {
                console.log('Permission Error', err);
              }
            },
            success => {
              if (success) {
                // You can use RN-fetch-blog to download files and storge into download Manager
                // RNFS.unlink(path);
                console.log('Folder created with empty file', success);
              }
            },
          );
        }
      }
    }
  }, []);

  useEffect(async () => {
    try {
      requestPermission();
      getAppInfo();
      if (showRealApp) {
        let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
        console.log('Token Access ', UserLogin);
        accessFiles();
        await loadData(UserLogin);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [showRealApp]);

  // const checkDirectory = async () => {
  //   let path = '/storage/emulated/0/Documents/Bnody POS/Invoices.txt';
  //   if (await RNFS.exists(path)) {
  //     console.log('RNFS.exists(path):', RNFS.exists(path));
  //   } else {
  //     createNativeF.overWrite(
  //       '',
  //       err => {
  //         if (err) {
  //           console.log('Permission Error', err);
  //         }
  //       },
  //       success => {
  //         if (success) {
  //           // You can use RN-fetch-blog to download files and storge into download Manager
  //           console.log('Folder created with empty file', success);
  //           RNFS.unlink(path);
  //         }
  //       },
  //     );
  //   }
  // };

  const accessFiles = async () => {
    if (Platform.OS === 'android') {
      const OsVer = Platform.constants['Release'];
      if (OsVer >= 10) {
        var val = await AsyncStorage.getItem('IS_FOLDER_CREATED');
        console.log('IS_FOLDER_CREATED', val);
        if (val == 'true') {
        } else {
          PermissionFile.readFolder();
          AsyncStorage.setItem('IS_FOLDER_CREATED', 'true', err => {
            if (err) {
              console.log('an error');
              throw err;
            }
          }).catch(err => {
            console.log('error is: ' + err);
          });
        }
      }
    }
  };

  async function requestPermission() {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]).then(result => {
          console.log('requestPermission result', result);
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const slides = [
    {
      key: 1,
      title: '',
      text: '',
      image: require('../../assets/images/ad1.jpg'),
      backgroundColor: 'transparent',
    },

    {
      key: 2,
      title: '',
      text: '',
      image: require('../../assets/images/ad2.jpg'),
      backgroundColor: 'transparent',
    },
    {
      key: 3,
      title: '',
      text: '',
      image: require('../../assets/images/ad3.jpg'),
      backgroundColor: 'transparent',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1, backgroundColor: item.backgroundColor}}>
        <Image
          source={item.image}
          // resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
        <Text style={styles.text}>{item.text}</Text>
        <TouchableOpacity
          style={{
            width: 60,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 35,
            start: sizeHelper.screenWidth > 450 ? 40 : 15,
          }}
          onPress={() => onDone()}>
          <Text
            style={{
              fontFamily: 'ProximaNova-Regular',
              color: AppColor.white,
              fontSize: sizeHelper.calHp(30),
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onDone = () => {
    setRealApp(true);
    AsyncStorage.setItem('MY_REAL_APP', 'true', err => {
      if (err) {
        console.log('an error');
        throw err;
      }
      console.log('success');
    }).catch(err => {
      console.log('error is: ' + err);
    });
  };

  const getAppInfo = async () => {
    var val = await AsyncStorage.getItem('MY_REAL_APP').then(v => {
      console.log('app state is', v);
      if (v == 'true') {
        setRealApp(true);
      } else {
        setRealApp(false);
      }
    });
  };

  const moveToLogin = () => {
    navigation.navigate('login');
    setloading(false);
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
          color="rgba(255, 255, 255, .9)"
          size={15}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => onDone()} style={styles.buttonCircle}>
        <Icon name="check" color="rgba(255, 255, 255, .9)" size={15} />
      </TouchableOpacity>
    );
  };

  const loadData = async UserLogin => {
    if (UserLogin) {
      getData(StringsListTable, async cb => {
        let stringsListEnglish = cb[0]?.StringsListOject
          ? JSON.parse(cb[0]?.StringsListOject)
          : '';
        let stringsListArabic = cb[1]?.StringsListOject
          ? JSON.parse(cb[1]?.StringsListOject)
          : '';
        console.log('StringsListTable...', stringsListEnglish);
        let data = {
          type: 'ChangeStringsList',
          data: I18nManager.isRTL ? stringsListArabic : stringsListEnglish,
        };

        let response = await props.dispatch(SaveAllData(data));
        props.navigation.replace('Main');
      });
    } else {
      props.navigation.replace('Auth');
      // console.log('setTimeout else');
    }
  };

  return (
    <Design
      slides={slides}
      renderItem={renderItem}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showRealApp={showRealApp}
    />
  );
};
const mapStateToProps = state => {
  return {
    UserLogin: state.user.SaveAllData.UserLogin,
    stringsListEnglish: state.user.SaveAllData.stringsListEnglish,
    stringsListArabic: state.user.SaveAllData.stringsListArabic,
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
