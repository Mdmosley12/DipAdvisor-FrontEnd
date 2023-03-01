import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Loading from "../components/Loading";
import { LocationsContext } from "../contexts/LocationsContext";
import { auth } from "../firebase";
import { styles, width } from "../styles/styles.SingleLocationScreen";
import { getSingleLocation, patchLocation } from "../utils/api";
import { checkAdmin } from "../utils/checkAdmin";

function SingleLocationScreen({ route, navigation }) {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const { setLocations } = useContext(LocationsContext);
  const { location_id } = route.params;
  if (!location_id) return navigation.navigate("HomeScreen");

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
      setLocations([]);
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

  const user = auth.currentUser;

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
          disabled={location.dangerous ? checkAdmin(user) : false}>
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
        {location.dangerous ? <Text>This Location is DANGEROUS</Text> : <></>}
        <FlatList
          data={[...new Set(location.image_urls)]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(index) => index.toString()}
          snapToInterval={width}
          decelerationRate="fast"
          pagingEnabled
          renderItem={({ item }) => (
            <View style={styles.imageItem}>
              <Image
                style={styles.image}
                source={{
                  uri: item ? item : "https://via.placeholder.com/160x160",
                }}
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

export default SingleLocationScreen;
