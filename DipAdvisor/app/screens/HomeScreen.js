import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { auth } from "../firebase";
import { getTopLocations } from "../utils/api";
import { styles } from "../styles/styles.HomeScreen";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";

const PopularSpotsBox = ({ popularSpots, navigation }) => {
  return (
    <ScrollView>
      <View>
        <Text style={styles.spotsTitle}>Most popular spots:</Text>
      </View>
      <View
        style={{
          flexWrap: "wrap",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {popularSpots.map((spot) => {
          return <PopularSpotBox spot={spot} key={spot._id} />;
        })}
      </View>
    </ScrollView>
  );
};

const PopularSpotBox = ({ spot, navigation }) => {
  const goToLocation = (locationID) => {
    const spotToShow = { location_id: locationID };
    navigation.push("SingleLocationScreen", spotToShow);
  };

  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={() => goToLocation(spot._id)} title="go">
        <Text style={styles.boxTitle}>{spot.location_name}</Text>
        <Image
          style={{ width: 160, height: 160 }}
          source={{ uri: spot.image_urls[0] }}
        />
        <Text style={styles.votes}>{spot.votes} votes</Text>
      </TouchableOpacity>
    </View>
  );
};
const HomeScreen = ({ navigation }) => {
  const [popularSpots, setPopularSpots] = useState([]);

  useEffect(() => {
    getTopLocations().then((data) => {
      setPopularSpots(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWelcome}>
        <Text style={styles.heading}>
          Where's today's dip {auth.currentUser.displayName}?
        </Text>
        <PopularSpotsBox popularSpots={popularSpots} />
      </View>
    </View>
  );
};

export default HomeScreen;
