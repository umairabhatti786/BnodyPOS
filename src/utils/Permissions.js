import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

 export const cameraPermissionError = (error) => {
    if (error?.code == 'E_NO_CAMERA_PERMISSION') {
      Alert.alert(
        'Permission Not Granted',
        "You can enable camera permissions on your device's settings anytime.",
        [
          {
            text: 'Go To Settings',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
          },
        ],
      );
    }
  };

