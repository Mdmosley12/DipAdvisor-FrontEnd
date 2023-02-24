import WelcomeScreen from "../app/screens/WelcomeScreen";
import LoginScreen from "../app/screens/LoginScreen";
import HomeScreen from "../app/screens/HomeScreen";
import SignUpScreen from "../app/screens/SignUpScreen";

import MapViewScreen from "../app/screens/MapViewScreen";
import SingleLocationScreen from "../app/screens/SingleLocationScreen";
import AddLocationScreen from "../app/screens/AddLocationScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StyleSheet } from "react-native";
import { UserProvider } from "../app/contexts/UserContext";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleLocationScreen"
            component={SingleLocationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </UserProvider>
    </SafeAreaView>
  );
};

const AddLocationNavigator = () => {
  return (
    <SafeAreaView>
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Add Swim Location"
            component={AddLocationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </UserProvider>
    </SafeAreaView>
  );
};

const MapStackNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="View all map locations"
            component={MapViewScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Single Location"
            component={SingleLocationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </UserProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export { MainStackNavigator, MapStackNavigator, AddLocationNavigator };