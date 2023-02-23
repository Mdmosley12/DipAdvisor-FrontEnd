import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../assets/firebase";

const HomeScreen = ({ navigation }) => {
  const handleGetLocation = (values) => {
    navigation.push("SingleLocationScreen", values);
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
              onPress={() => Keyboard.dismiss()}>
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
      <Text style={styles.heading}>Welcome, {auth.currentUser?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});

export default HomeScreen;
