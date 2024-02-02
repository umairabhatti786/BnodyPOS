import moment from 'moment';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {accountType, EsportsSport, sports, StrongHandFoot} from './Data';
import { useDispatch } from 'react-redux';
import {
  AirSportsPositions,
  AirSportsSkills,
  AmericanFootballPositions,
  AmericanFootballSkills,
  AquaticPositions,
  AquaticSkills,
  ArcheryPositions,
  ArcherySkills,
  AthleticsPositions,
  AthleticsSkills,
  AustralianFootballPositions,
  AustralianFootballSkills,
  BadmintonPositions,
  BadmintonSkills,
  BaseballPositions,
  BaseballSkills,
  BasketballPositions,
  BasketballSkills,
  BowlingPositions,
  BowlingSkills,
  BoxingPositions,
  BoxingSkills,
  CricketPositions,
  CricketSkills,
  CurlingPositions,
  CurlingSkills,
  EsportsPositions,
  EsportsSkills,
  FootballPositions,
  FootballSkills,
  FormulaOnePositions,
  FormulaOneSkills,
  GolfPositions,
  GolfSkills,
  GymnasticsPositions,
  GymnasticsSkills,
  HockeyPositions,
  HockeySkills,
  HorseRacingPositions,
  HorseRacingSkills,
  IceHockeyPositions,
  IceHockeySkills,
  LacrossePositions,
  MMAPositions,
  NetballPositions,
  NetballSkills,
  OtherPositions,
  OtherSkills,
  RugbyPositions,
  RugbySkills,
  SkiingPositions,
  SkiingSkills,
  SquashPositions,
  SquashSkills,
  SwimmingPositions,
  SwimmingSkills,
  TennisPositions,
  TennisSkills,
  VolleyballPositions,
  VolleyballSkills,
} from './PositionsAndSkills';

export const timeFormat = (time, format) => {
  const fireBaseTime = new Date(
    time?.seconds * 1000 + time?.nanoseconds / 1000000,
  );
  return moment(fireBaseTime).format(format);

  // .format('HH:mm:ss')
};

export const dateFormat = date => {
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    // nextDay: '[Tomorrow]',
    currentWeek: 'dddd',
    // nextWeek: 'dddd',
    lastDay: 'dddd',
    lastWeek: 'dddd',
    sameElse: 'DD MMM YY',
  });
};
export const notiDateFormat = date => {
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    // nextDay: '[Tomorrow]',
    currentWeek: 'dddd',
    // nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd',
    sameElse: 'DD MMM YY',
  });
};

export const requestNotificationPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  } catch (error) {
    console.log('Canclepermission', error);
  }
};

const notificationPermissionError = error => {
  if (error?.code == 'E_NO_CONTACTS_PERMISSION') {
    Alert.alert(
      'Permission Not Granted',
      'Kazzah allows you to build a close network of friends who help each other find trusted pros. Access to your contacts automates the process of building your connections at your control',
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

export const locationPermissionError = () => {
  Alert.alert(
    'Permission Not Granted',
    "You can enable location permissions on your device's settings anytime.",
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
};

export const positionSkillValidate = (value, type) => {
  if (value == 'Account Type') {

    return accountType;
  } else if (value == 'Select Sport') {
    if (type?.accountType == 'Esports') {
      return EsportsSport;
    } else {
      return sports;
    }
  }
   else if (value == 'Select Position') {
    if (type?.accountType == 'Esports') {
      return EsportsPositions;
    }

    if (type?.selectSport == 'Air Sports') {
      return AirSportsPositions;
    }

    if (type?.selectSport == 'American Football') {
      return AmericanFootballPositions;
    }
    if (type?.selectSport == 'Archery') {
      return ArcheryPositions;
    }

    if (type?.selectSport == 'Aquatic') {
      return AquaticPositions;
    }

    if (type?.selectSport == 'Australian Football') {
      return AustralianFootballPositions;
    }

    if (type?.selectSport == 'Athletics') {
      return AthleticsPositions;
    }

    if (type?.selectSport == 'Badminton') {
      return BadmintonPositions;
    }

    if (type?.selectSport == 'Baseball') {
      return BaseballPositions;
    }
    if (type?.selectSport == 'Basketball') {
      return BasketballPositions;
    }
    if (type?.selectSport == 'Bowling') {
      return BowlingPositions;
    }
    if (type?.selectSport == 'Boxing') {
      return BoxingPositions;
    }
    if (type?.selectSport == 'Curling') {
      return CurlingPositions;
    }
    if (type?.selectSport == 'Cricket') {
      return CricketPositions;
    }
    if (type?.selectSport == 'Football') {
      return FootballPositions;
    }
    if (type?.selectSport == 'Formula One') {
      return FormulaOnePositions;
    }
    if (type?.selectSport == 'Golf') {
      return GolfPositions;
    }
    if (type?.selectSport == 'Gymnastics') {
      return GymnasticsPositions;
    }
    if (type?.selectSport == 'Hockey') {
      return HockeyPositions;
    }

    if (type?.selectSport == 'Horse Racing') {
      return HorseRacingPositions;
    }
    if (type?.selectSport == 'Ice Hockey') {
      return IceHockeyPositions;
    }
    if (type?.selectSport == 'Lacrosse') {
      return LacrossePositions;
    }
    if (type?.selectSport == 'MMA') {
      return MMAPositions;
    }
    if (type?.selectSport == 'Netball') {
      return NetballPositions;
    }
    if (type?.selectSport == 'Rugby') {
      return RugbyPositions;
    }
    if (type?.selectSport == 'Skiing') {
      return SkiingPositions;
    }
    if (type?.selectSport == 'Squash') {
      return SquashPositions;
    }

    if (type?.selectSport == 'Swimming') {
      return SwimmingPositions;
    }
    if (type?.selectSport == 'Tennis') {
      return TennisPositions;
    }
    if (type?.selectSport == 'Volleyball') {
      return VolleyballPositions;
    }
    if (type?.selectSport == 'Squash') {
      return SquashPositions;
    } if(type?.selectSport=="Other") {
      return OtherPositions;
    }
  }

  else if(value=="Strong Hand" || value=="Strong Foot"){

    return StrongHandFoot


  }


  else if (value == 'Skill #1' || value=="Skill #2" || value =="Skill #3") {
    if (type?.accountType == 'Esports') {
      return EsportsSkills;
    }

    if (type?.selectSport == 'Air Sports') {
      return AirSportsSkills;
    }

    if (type?.selectSport == 'American Football') {
      return AmericanFootballSkills;
    }
    if (type?.selectSport == 'Archery') {
      return ArcherySkills;
    }

    if (type?.selectSport == 'Aquatic') {
      return AquaticSkills;
    }

    if (type?.selectSport == 'Australian Football') {
      return AustralianFootballSkills;
    }

    if (type?.selectSport == 'Athletics') {
      return AthleticsSkills;
    }

    if (type?.selectSport == 'Badminton') {
      return BadmintonSkills;
    }

    if (type?.selectSport == 'Baseball') {
      return BaseballSkills
    }
    if (type?.selectSport == 'Basketball') {
      return BasketballSkills;
    }
    if (type?.selectSport == 'Bowling') {
      return BowlingSkills;
    }
    if (type?.selectSport == 'Boxing') {
      return BoxingSkills;
    }
    if (type?.selectSport == 'Curling') {
      return CurlingSkills;
    }
    if (type?.selectSport == 'Cricket') {
      return CricketSkills;
    }
    if (type?.selectSport == 'Football') {
      return FootballSkills;
    }
    if (type?.selectSport == 'Formula One') {
      return FormulaOneSkills;
    }
    if (type?.selectSport == 'Golf') {
      return GolfSkills;
    }
    if (type?.selectSport == 'Gymnastics') {
      return GymnasticsSkills;
    }
    if (type?.selectSport == 'Hockey') {
      return HockeySkills;
    }

    if (type?.selectSport == 'Horse Racing') {
      return HorseRacingSkills;
    }
    if (type?.selectSport == 'Ice Hockey') {
      return IceHockeySkills
    }
    if (type?.selectSport == 'Lacrosse') {
      return LacrossePositions;
    }
    if (type?.selectSport == 'MMA') {
      return MMAPositions;
    }
    if (type?.selectSport == 'Netball') {
      return NetballSkills;
    }
    if (type?.selectSport == 'Rugby') {
      return RugbySkills;
    }
    if (type?.selectSport == 'Skiing') {
      return SkiingSkills
    }
    if (type?.selectSport == 'Squash') {
      return SquashSkills;
    }

    if (type?.selectSport == 'Swimming') {
      return SwimmingSkills;
    }
    if (type?.selectSport == 'Tennis') {
      return TennisSkills;
    }
    if (type?.selectSport == 'Volleyball') {
      return VolleyballSkills;
    }
    if (type?.selectSport == 'Squash') {
      return SquashSkills;
    } if(type?.selectSport=="Other") {
      return OtherSkills;
    }
  }
};
