import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { UserProvider } from "./app/contexts/UserContext";
import { auth } from "./app/assets/firebase";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import NavBar from "./navigation/NavBar";
import MapViewScreen from "./app/screens/MapViewScreen";
import AddLocationScreen from "./app/screens/AddLocationScreen";
import { MainStackNavigator } from "./navigation/ScreenNavigator";

const Stack = createStackNavigator();

export default function App() {
  // if (auth.currentUser === null) {
  //   return (
  //     <SafeAreaView>
  //       {/* <Text>No email authorisation</Text> */}

  // } else {
  //   return (
  //     <SafeAreaView>
  //       <Text>This would be the page showing</Text>
  //     </SafeAreaView>
  //   );
  // }

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <UserProvider>
  //       <NavigationContainer>
  //         <Stack.Navigator>
  //           <Stack.Screen
  //             name="WelcomeScreen"
  //             component={WelcomeScreen}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="LoginScreen"
  //             component={LoginScreen}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="SignUpScreen"
  //             component={SignUpScreen}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="HomeScreen"
  //             component={HomeScreen}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="Maps"
  //             component={MapViewScreen}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="AddLocation"
  //             component={AddLocationScreen}
  //             options={{ headerShown: false }}
  //           />
  //         </Stack.Navigator>
  //       </NavigationContainer>

  //       <NavigationContainer>
  //         <NavBar />
  //       </NavigationContainer>
  //     </UserProvider>
  //   </SafeAreaView>
  // );

  return (
    <NavigationContainer>
      <NavBar />
    </NavigationContainer>
  );
}
