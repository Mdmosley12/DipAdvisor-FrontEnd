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
import Loading from "../components/Loading";
import { getSingleLocation, patchLocation } from "../utils/api";

const { width } = Dimensions.get("window");

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
    return <Loading />;
  }

  const renderLocationProperty = ({ item }) => {
    return (
      <View style={styles.propertyItem}>
        <Text style={styles.propertyName}>{item.name}</Text>
        <Text style={styles.propertyValue}>{item.value}</Text>
      </View>
    );
  };

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
          snapToInterval={width}
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
        <View style={styles.propertiesList}>
          <FlatList
            data={[
              { name: "Depth", value: location.depth ? location.depth : "N/A" },
              { name: "Public", value: location.public ? "Yes" : "No" },
              {
                name: "Water Temperature",
                value: location.water_temp ? location.water_temp : "N/A",
              },
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderLocationProperty}
          />
        </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  closeButton: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    elevation: 2,
  },
  flagButton: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  flagButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  imageGrid: {
    height: 300,
    width: width,
    backgroundColor: "#EFEFEF",
  },
  imageItem: {
    width: width,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  propertiesList: {
    width: "100%",
  },
  propertyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 1,
  },
  propertyName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  propertyValue: {
    fontSize: 16,
  },
});

export default SingleLocationScreen;
