import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, MapStackNavigator } from "./ScreenNavigator";
import AddLocationScreen from "../screens/AddLocationScreen";

function NavBar(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="View on Maps"
        component={MapStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Swim Spot"
        component={AddLocationScreen}
        options={{ headerShown: false, tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
