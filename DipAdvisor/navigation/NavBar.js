import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator } from "./ScreenNavigator";
import MapViewScreen from "../app/screens/MapViewScreen";
import AddLocationScreen from "../app/screens/AddLocationScreen";

function NavBar(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen
        name="View on Maps"
        component={MapViewScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Swim Spot"
        component={AddLocationScreen}
        options={{ headerShown: false }}
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
