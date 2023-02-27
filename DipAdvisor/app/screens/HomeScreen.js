import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { auth } from "../assets/firebase";
import { getTopLocations } from "../utils/api";
import { styles } from "../styles/styles.HomeScreen";

import { Text, Image, TouchableOpacity, View } from "react-native";
const PopularSpotsBox = ({ popularSpots, navigation }) => {
  return (
    <View>
      <Text>Most popular spots:</Text>
      {popularSpots.map((spot) => {
        return (
          <PopularSpotBox spot={spot} key={spot._id} navigation={navigation} />
        );
      })}
    </View>
  );
};

const PopularSpotBox = ({ spot, navigation }) => {
  const goToLocation = (locationID) => {
    navigation.navigate("SingleLocationScreen", locationID);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => goToLocation(spot._id)}>
        <Text>{spot.location_name}</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: spot.image_urls[0] }}
        />
        <Text> Votes: {spot.votes}</Text>
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

  // const handleGetLocation = (values) => {
  //   navigation.push("SingleLocationScreen", values);
  // };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundWelcome}>
        <Text>Where's today's dip {auth.currentUser.displayName}?</Text>
        <PopularSpotsBox popularSpots={popularSpots} navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
