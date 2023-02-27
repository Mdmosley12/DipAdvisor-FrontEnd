import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { auth } from "../assets/firebase";
import { getTopLocations } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { styles } from "../styles/styles.HomeScreen";

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

const HomeScreen = ({ navigation }) => {
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
  console.log(userValue);
  return (
    <View style={styles.container}>
      <Formik initialValues={{ location_id: "" }} onSubmit={handleGetLocation}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("location_id")}
              onBlur={handleBlur("location_id")}
              value={values.location_id}
              placeholder="Search (Location ID)"
              placeholderTextColor="#9B9B9B"
              keyboardType="numeric"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => Keyboard.dismiss()}
            >
              <Ionicons
                style={styles.icon}
                name="search"
                size={24}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.backgroundWelcome}>
        <Text>Welcome {auth.currentUser?.displayName}</Text>
        <Text>Where's today's dip {auth.currentUser.displayName}?</Text>
        <PopularSpotsBox popularSpots={popularSpots} />
      </View>
    </View>
  );
};

export default HomeScreen;
