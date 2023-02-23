import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getSingleLocation, patchLocation } from "../utils/api";

function SingleLocationScreen({ route, navigation }) {
  const { location_id } = route.params;
  if (!location_id) return navigation.navigate("HomeScreen");
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleLocation(location_id)
      .then((data) => {
        setLocation(data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        navigation.navigate("HomeScreen");
      });
  }, [location_id]);

  const handleFlagLocation = () => {
    patchLocation(location_id).then((data) => {
      setLocation(data);
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("HomeScreen")}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flagButton}
          onPress={handleFlagLocation}
          disabled={location.dangerous}>
          <Image
            style={styles.flagIcon}
            source={require("../assets/RedFlag.png")}
          />
          <Text style={styles.flagButtonText}>
            {location.dangerous ? "Flagged as Dangerous" : "Flag as Dangerous"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageGrid}>
        <FlatList
          data={location.image_urls}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={Dimensions.get("window").width}
          decelerationRate="fast"
          pagingEnabled
          renderItem={({ item }) => (
            <View style={styles.imageItem}>
              <Image
                style={styles.image}
                source={{ uri: item }}
                resizeMode="stretch"
              />
            </View>
          )}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{location.location_name}</Text>
        <Text style={styles.description}>{location.description}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  closeButton: {
    justifyContent: "center",
  },
  flagButton: {
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    zIndex: 2,
  },
  flagButtonText: {
    marginLeft: 8,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "red",
    padding: 8,
    borderRadius: 8,
  },
  imageGrid: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 16,
  },
  imageItem: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 2,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default SingleLocationScreen;
