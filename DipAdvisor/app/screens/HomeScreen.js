import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { auth } from "../assets/firebase";
import { getTopLocations } from "../utils/api.utils";

const PopularSpotsBox = ({ popularSpots }) => {
  return (
    <View>
      <Text>Most popular spots:</Text>
      {popularSpots.map((spot) => {
        return <PopularSpotBox spot={spot} key={spot._id} />;
      })}
    </View>
  );
};

const PopularSpotBox = ({ spot }) => {
  return (
    <View>
      <Text>{spot.location_name}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: spot.image_urls[0] }}
      />
      <Text> Votes: {spot.votes}</Text>
    </View>
  );
};

const HomeScreen = (props) => {
  const userValue = useContext(UserContext);
  const [popularSpots, setPopularSpots] = useState([]);
  useEffect(() => {
    getTopLocations().then((data) => {
      setPopularSpots(data);
    });
  }, []);

  return (
    <View style={styles.background}>
      <Text>Welcome {auth.currentUser?.email}</Text>
      <Text>Where's today's dip {userValue.user}?</Text>
      <PopularSpotsBox popularSpots={popularSpots} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
