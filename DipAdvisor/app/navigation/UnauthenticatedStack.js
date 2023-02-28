import { FontAwesome } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MapViewScreen from "../screens/MapViewScreen";

const Stack = createBottomTabNavigator();

const UnauthenticatedStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={({ route }) => ({
          tabBarItemStyle: {
            display:
              route.name === "LoginScreen" || route.name === "SignupScreen"
                ? "none"
                : "flex",
          },
        })}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome name="home" size={24} color="black" />
            ),
          }}
        />
        <Stack.Screen
          name="View on Maps"
          component={MapViewScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome name="map" size={20} color="black" />
            ),
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UnauthenticatedStack;
