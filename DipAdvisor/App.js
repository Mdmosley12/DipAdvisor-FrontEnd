import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";
import { UserProvider } from "./app/contexts/UserContext";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import UploadImage from "./app/screens/UploadImage";

import NavBar from "./app/navigation/NavBar";

export default function App() {
  return (
    <NavigationContainer>
      <NavBar />
    </NavigationContainer>
  );
}
