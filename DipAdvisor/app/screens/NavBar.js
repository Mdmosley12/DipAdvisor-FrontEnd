import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import MapView from "./MapView";
import { Button } from "react-native-elements";
import AddLocation from "./AddLocation";

function NavBar(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator style={styles.navigation}>
      <Tab.Screen
        name="View on Maps"
        component={MapView}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Swim Spot"
        component={AddLocation}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  nav: {
    margin: 0,
    padding: 0,
  },
});

export default NavBar;
