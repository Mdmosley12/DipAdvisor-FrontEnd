import { Text, View, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { styles } from "../styles/styles.PostLocationCoords";

function PostLocationCoords({ userLocation, setPinCoords }) {
  const log = (eventName, e) => {
    console.log(eventName, e.nativeEvent);
    if (eventName === "onDragEnd") {
      setPinCoords(e.nativeEvent.coordinate);
      console.log(e.nativeEvent.coordinate, "pinCoords");
    }
  };

  if (!userLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No user location enabled</Text>
      </SafeAreaView>
    );
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
        >
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            onSelect={(e) => log("onSelect", e)}
            onDrag={(e) => log("onDrag", e)}
            onDragStart={(e) => log("onDragStart", e)}
            onDragEnd={(e) => log("onDragEnd", e)}
            onPress={(e) => log("onPress", e)}
            draggable
          />
        </MapView>
      )}
    </SafeAreaView>
  );
}

export default PostLocationCoords;
