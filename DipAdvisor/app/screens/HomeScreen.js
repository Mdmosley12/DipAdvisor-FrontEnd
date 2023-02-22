import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../assets/firebase";

function HomeScreen(props) {
  return (
    <View style={styles.background}>
      <Text>Welcome {auth.currentUser?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
