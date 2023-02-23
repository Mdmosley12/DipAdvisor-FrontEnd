import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";
import { UserProvider } from "./app/contexts/UserContext";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import NavBar from "./app/screens/NavBar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <NavigationContainer>
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
            {/* <Stack.Screen name="NavBar" component={NavBar} /> */}
          </Stack.Navigator>
        </NavigationContainer>

        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
