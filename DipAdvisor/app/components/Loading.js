import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={75} color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  textContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Loading;
