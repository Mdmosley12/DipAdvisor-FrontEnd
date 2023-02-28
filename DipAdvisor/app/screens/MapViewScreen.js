import * as Location from "expo-location";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import Loading from "../components/Loading";
import { LocationsContext } from "../contexts/LocationsContext";
import styles from "../styles/styles.MapViewScreen";

function MapViewScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { locations } = useContext(LocationsContext);

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
    setLoading(true);
    const allCoordinates = locations.map((location) => {
      return {
        id: location._id,
        location_name: location.location_name,
        coordinate: {
          latitude: location.coordinates[0],
          longitude: location.coordinates[1],
        },
        images: location.image_urls[0],
        dangerous: location.dangerous,
      };
    });
    setMapMarkers(allCoordinates);
    setLoading(false);
  }, [locations]);

  const handleMarkerPress = (markerid) => {
    setSelectedMarker(markerid);
  };

  const markerClick = () => {
    navigation.navigate("SingleLocationScreen", {
      location_id: selectedMarker,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
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
          onCalloutPress={markerClick}>
          {mapMarkers.map((marker, index) => {
            if (
              (marker.coordinate.latitude !== undefined && !marker.dangerous) ||
              (marker.coordinate.longitude !== undefined && !marker.dangerous)
            ) {
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  title={marker.location_name}
                  onPress={() => handleMarkerPress(marker.id)}>
                  {/* //////////////callout section a work in progress
                   Free versions are too slow to render images within map, can uncomment this if upgrade */}
                  {/* {selectedMarker === marker && (
                  <Callout>
                    <View style={styles.calloutContainer}>
                    
                      
                {/* {marker.images !== undefined ? (
                      <Image
                      source={{ uri: marker.images }}
                      style={styles.calloutImage}
                      />
                      ) : null} 
                    </View> 
                  </Callout> 
                  
                )}//// */}
                </Marker>
              );
            }
          })}
        </MapView>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
    </SafeAreaView>
  );
}

export default MapViewScreen;
