import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { styles } from "../styles/styles.HomeScreen";
import { getTopLocations } from "../utils/api";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PopularSpotsBox = ({ popularSpots, navigation }) => {
  return (
    <ScrollView>
      <View>
        <Text style={styles.spotsTitle}>Most popular spots:</Text>
      </View>
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

  const handleGetLocation = (values) => {
    navigation.navigate("SingleLocationScreen", values);
  };

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
        <Text style={styles.heading}>
          Where's today's dip {auth.currentUser.displayName}?
        </Text>
        <PopularSpotsBox popularSpots={popularSpots} navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
