import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { getAllLocations } from "../utils/api";

function MapViewScreen({ navigation }) {
  // const [startMapRegion, setStartMapRegion] = useState({
  //   latitude: 53.456215,
  //   longitude: -1.765994,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  //need useEffect to get current location

  //get user location at start
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    //get use location on rendering of the page
    //setStartMapRegion as an outcome
    // GET all coordinates and location name in API.
    getAllLocations().then((data) => {
      const allCoordinates = data.map((location) => {
        return {
          location_name: location.location_name,
          coordinate: {
            latitude: location.coordinates[0],
            longitude: location.coordinates[1],
          },
        };
      });
      console.log(allCoordinates);
      setMapMarkers(allCoordinates);
      // map these into coordinate and title list with setMapMarkers. Each one has a route set up for /api/locations/:id where id = _id value
      setIsLoading(false);
    });
  }, []);

  //potentially onChange of viewable map area, rerender shown markers, this may be inherrent part of maps.

  //functions to use:
  //onRegionChange callback function
  //onMarkerSelect
  //onMarkerPress
  //showCallout

  return (
    <SafeAreaView style={styles.container}>
      <Text>Find your nearest outdoor swimming location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      {/* // showsUserLocation={true} requires permissions, see react-native-permissions
        // showsMyLocationButton={true} moves to users current location
        //zoomEnabled={true}
        //showsScale={true} */}

      {/* <Marker
          coordinate={{
            latitude: userLocation
              ? userLocation.coords.latitude
              : Constants.manifest.extra.defaultLatitude,
            longitude: userLocation
              ? userLocation.coords.longitude
              : Constants.manifest.extra.defaultLongitude,
          }}
          title="Marker Title"
          description="Marker Description"
        /> */}

      {/* <Marker>
          {mapMarkers.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.coordinate.latitude,
                  longitude: marker.coordinate.longitude,
                }}
                title={marker.location_name}
              ></Marker>
            );
          })}
        </Marker> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewScreen;
