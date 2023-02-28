import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { styles } from "../styles/styles.HomeScreen";

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LocationsContext } from "../contexts/LocationsContext";

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
        }}>
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
          style={{ width: 160, height: 160 }}
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
    <View style={styles.backgroundWelcome}>
      <Text style={styles.heading}>
        Where's today's dip {auth.currentUser.displayName}?
      </Text>
      <PopularSpotsBox popularSpots={popularSpots} navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
