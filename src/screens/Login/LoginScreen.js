import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import CustomText from "../../components/CustomText";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import Toast from "react-native-root-toast";
import { IPhoneIcon } from "../../assets/SVG/svg";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import { SFCompact } from "../../utils/Fonts";
import { colors } from "../../utils/colors";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { SignUp_Request } from "../../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/Loading";

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    setIsLoading(true);
    try {
      let ressss = await AsyncStorage.getItem("@token");
      console.log("ressss", ressss);
      if (ressss !== null) {
        navigation.navigate("Home");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onPressGoogle = async () => {
    GoogleSignin.configure();
    (await GoogleSignin.isSignedIn()) && (await GoogleSignin.signOut());
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        setIsLoading(true);

        const data = {
          sso_token: userInfo?.user?.id,
          login_type: "google",
          name: userInfo?.user?.name,
          email: userInfo?.user?.email,
        };

        const response = await SignUp_Request(data);

        if (response?.message === "OAuth user created successfully") {
          await AsyncStorage.setItem("@token", response?.user?.sso_token);
          await AsyncStorage.setItem("LOGIN_TYPE", response?.user?.login_type);
          Toast.show("Login successful");
          setIsLoading(false);
          navigation.navigate("Home");
        } else if (
          response.message ===
          "User with this email and login_type (Google) already exists"
        ) {
          await AsyncStorage.setItem("@token", response?.sso_token);
          await AsyncStorage.setItem("LOGIN_TYPE", response?.login_type);
          console.log("error", response);
          setIsLoading(false);
          Toast.show("Login successful");
          navigation.navigate("Home");
        }

        // respanseData(userInfo);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setIsLoading(false);
        console.log("user cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setIsLoading(false);
        console.log("operation (e.g. sign in) is in progress already");
        setIsLoading(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setIsLoading(false);
        console.log("play services not available or outdated");
      } else {
        setIsLoading(false);
        console.log("some other error happened", error);
      }
    }
  };

  const onPressApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    console.log({ credentialState }, appleAuth.State.AUTHORIZED, {
      appleAuthRequestResponse,
    });

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const { email, fullName, user } = appleAuthRequestResponse;

      const data = {
        sso_token: user,
        login_type: "apple",
        name: fullName?.givenName,
        email: email,
      };

      const response = await SignUp_Request(data);
      if (response?.message === "OAuth user created successfully") {
        await AsyncStorage.setItem("@token", response?.user?.sso_token);
        await AsyncStorage.setItem("LOGIN_TYPE", response?.user?.login_type);
        Toast.show("Login successful");
        setIsLoading(false);
        navigation.navigate("Home");
      } else if (
        response.message ===
        "User with this email and login_type (Apple) already exists"
      ) {
        await AsyncStorage.setItem("@token", response?.sso_token);
        await AsyncStorage.setItem("LOGIN_TYPE", response?.login_type);
        console.log("error", response);
        setIsLoading(false);
        Toast.show("Login successful");
        navigation.navigate("Home");
      }
    }
  };

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      GoogleSignin.configure({
        webClientId:
          "153444834280-be509i52m49jlt7l0ds0ic9ucbg5lh0l.apps.googleusercontent.com",
      });
      if (await GoogleSignin.isSignedIn()) {
        await GoogleSignin.signOut();
      }
    };

    configureGoogleSignIn();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{ flex: 1, marginVertical: Platform.OS == "ios" ? -50 : 0 }}
        >
          <ImageBackground style={styles.main} source={images.assembleLogin}>
            <ImageBackground
              style={styles.bgImage}
              imageStyle={{
                borderRadius: sizeHelper.screenWidth > 450 ? 60 : 70,
              }}
              source={images.bigBox}
            >
              <ImageBackground style={styles.sBox} source={images.smallBox}>
                <View style={{ bottom: 5 }}>
                  <CustomText
                    color={colors.black}
                    fontSize={12}
                    alignSelf="center"
                    textAlign="center"
                    label="Login or signup"
                    // fontWeight="600"
                    fontFamily={SFCompact.semiBold}
                    fontWeight={Platform.OS == "ios" ? "600" : "300"}
                  />
                </View>
              </ImageBackground>
              <View style={styles.container}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.touches}
                  onPress={onPressGoogle}
                >
                  <View style={styles.innerView}>
                    <Image
                      source={images.GoogleLogo}
                      style={{ height: 50, width: 50 }}
                    />
                  </View>
                  <View>
                    <View>
                      <CustomText
                        color={"#B2B2B2"}
                        fontSize={12}
                        alignSelf="center"
                        fontWeight="600"
                        textAlign="center"
                        label="Continue with Google"
                        fontFamily={SFCompact.regular}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                {Platform.OS === "ios" && (
                  <TouchableOpacity
                    style={styles.touches}
                    onPress={onPressApple}
                  >
                    <View style={styles.innerView}>
                      <IPhoneIcon style={{ height: 40, width: 40 }} />
                    </View>
                    <View>
                      <View>
                        <CustomText
                          color={"#B2B2B2"}
                          fontSize={12}
                          alignSelf="center"
                          fontWeight="600"

                          textAlign="center"
                          label="Continue with Apple"
                          fontFamily={SFCompact.regular}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default LoginScreen;
