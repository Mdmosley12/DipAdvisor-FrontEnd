import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { auth } from "../firebase";
import { getTopLocations } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { styles } from "../styles/styles.HomeScreen";
import { ScrollView } from "react-native";

import {
  Keyboard,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PopularSpotsBox = ({ popularSpots }) => {
  return (
    <ScrollView>
      <View>
        <Text>Most popular spots:</Text>
      </View>
      <View
        style={{
          flexWrap: "wrap",
          flex: 1,
          flexDirection: "row",
          // justifyContent: "space-evenly",
        }}
      >
        {popularSpots.map((spot) => {
          return <PopularSpotBox spot={spot} key={spot._id} />;
        })}
      </View>
    </ScrollView>
  );
};

const PopularSpotBox = ({ spot }) => {
  return (
    <View style={{ padding: "10%" }}>
      <Text>{spot.location_name}</Text>
      <Image
        style={{ width: 110, height: 110 }}
        source={{ uri: spot.image_urls[0] }}
      />
      <Text> Votes: {spot.votes}</Text>
    </View>
  );
};

const HomeScreen = ({ navigation }, props) => {
  const userValue = useContext(UserContext);
  const [popularSpots, setPopularSpots] = useState([]);
  useEffect(() => {
    getTopLocations().then((data) => {
      setPopularSpots(data);
    });
  }, []);

  const handleGetLocation = (values) => {
    navigation.push("SingleLocationScreen", values);
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundWelcome}>
        <Text>Where's today's dip {auth.currentUser.displayName}?</Text>
        <PopularSpotsBox popularSpots={popularSpots} />
      </View>
    </View>
  );
};

export default HomeScreen;
