import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { images } from "../assets/images";
import FastImage from "react-native-fast-image";
const MapComponent = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyDeYRRtmStCSHXQBJxZa4t9uB_WXNO55H0";
  useEffect(() => {
    updateMapCenter();
  }, [latitude, longitude]);
  const updateMapCenter = () => {
    // Update the map center based on the latitude and longitude of the selected event

    try {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },

        3000
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleMapPress = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${latitude},${longitude}`;
    const label = address;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const CustomMarkerComponent = React.memo(() => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        zIndex: 999999,
      }}
    >
      <FastImage
        source={images.blackLocation} // Use the golden location image
        style={{ height: 60, width: 60 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={[
            {
              width: "100%",
              height: "100%",
              borderRadius: 10,
              overflow: "hidden",
            },
          ]}
          // initialRegion={{
          //   latitude: 32.7157,
          //   longitude: -117.1611,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          // onRegionChangeComplete={(region) => setRegion(region)}
        >
          <Marker
            onPress={() => handleMapPress()}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <CustomMarkerComponent />
          </Marker>
          <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
            <CustomMarkerComponent />
          </Marker>
        </MapView>
      </View>
      <TouchableOpacity style={styles.overlay} onPress={handleMapPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: "hidden", // Clip the border radius
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});

export default MapComponent;
