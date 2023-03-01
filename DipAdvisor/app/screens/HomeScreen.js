import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { styles } from "../styles/styles.HomeScreen";

import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { LocationsContext } from "../contexts/LocationsContext";

const PopularSpotsBox = ({ popularSpots, navigation }) => {
  return (
    <ScrollView>
      <View style={styles.popularSpotsContainer}>
        {popularSpots.map((spot) => {
          return (
            <PopularSpotBox
              spot={spot}
              key={spot._id}
              navigation={navigation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const PopularSpotBox = ({ spot, navigation }) => {
  const goToLocation = (locationID) => {
    const spotToShow = { location_id: locationID };
    navigation.navigate("SingleLocationScreen", spotToShow);
  };
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={() => goToLocation(spot._id)} title="go">
        <Text style={styles.boxTitle}>{spot.location_name}</Text>
        <Image
          style={{ width: 160, height: 160, borderRadius: 20 }}
          source={{
            uri:
              spot.image_urls.length >= 1 && spot.image_urls[0].length > 0
                ? spot.image_urls[0]
                : "https://via.placeholder.com/160x160",
          }}
        />
        <Text style={styles.votes}>{spot.votes} votes</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [popularSpots, setPopularSpots] = useState([]);
  const { locations } = useContext(LocationsContext);
  useEffect(() => {
    setPopularSpots(locations.sort((a, b) => a.votes - b.votes).slice(0, 7));
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      {/* <View style={styles.container}> */}
      <View style={styles.backgroundWelcome}>
        <Text style={styles.heading}>
          Where's today's dip {auth.currentUser.displayName}?
        </Text>
        <Text style={styles.spotsTitle}>Most popular spots:</Text>
        <PopularSpotsBox popularSpots={popularSpots} navigation={navigation} />
      </View>
      {/* </View> */}
    </ImageBackground>
  );
};

export default HomeScreen;
