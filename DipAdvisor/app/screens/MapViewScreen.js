import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { getAllLocations } from "../utils/api";

function MapViewScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // gets user location at start, asks for permission if not already granted
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAllLocations().then((data) => {
      const allCoordinates = data.map((location) => {
        return {
          id: location._id,
          location_name: location.location_name,
          coordinate: {
            latitude: location.coordinates[0],
            longitude: location.coordinates[1],
          },
          images: location.image_urls[0],
        };
      });
      setMapMarkers(allCoordinates);
      //Each one has a route set up for /api/locations/:id where id = _id value
      setIsLoading(false);
    });
  }, []);

  console.log(mapMarkers, "<<<map markers");
  console.log(userLocation, "<<<user location");

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const markerClick = () => {
    console.log("callout clicked");
  };
  //functions to use:
  //onRegionChange callback function
  //onMarkerSelect
  //onMarkerPress
  //showCallout

  return (
    <SafeAreaView style={styles.container}>
      <Text>Find your nearest outdoor swimming location</Text>

      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsScale={true}
          zoomEnabled={true}
          onCalloutPress={markerClick}
        >
          {mapMarkers.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.location_name + "666"}
                onPress={() => handleMarkerPress(marker)}
              >
                {selectedMarker === marker && (
                  <Callout>
                    <View style={styles.calloutContainer}>
                      {/* //Text not showing */}
                      <Text style={styles.calloutTitle}>
                        {/* //42 put in to see which title is appearing */}
                        {marker.location_name + "42"}
                      </Text>
                      {/* //Image not showing */}
                      <Image
                        source={{ uri: marker.images }}
                        style={styles.calloutImage}
                      />
                    </View>
                  </Callout>
                )}
              </Marker>
            );
          })}
        </MapView>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    width: 160,
    height: 200,
    alignItems: "center",
  },
  calloutTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutImage: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
});

export default MapViewScreen;
