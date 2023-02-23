import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AddLocationNavigator,
  MainStackNavigator,
  MapNavigator,
} from "./ScreenNavigator";
import HomeScreen from "../app/screens/HomeScreen";
import MapViewScreen from "../app/screens/MapViewScreen";
import { Button } from "react-native-elements";
import AddLocationScreen from "../app/screens/AddLocationScreen";

function NavBar(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen
        name="View on Maps"
        component={MapNavigator}
        // options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        // options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Swim Spot"
        component={AddLocationNavigator}
        // options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default NavBar;
