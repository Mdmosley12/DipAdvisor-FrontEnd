import React from "react";
import {
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/styles.WelcomeScreen";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      <View style={styles.logoContainer}>
        <FontAwesome name="circle" size={200} color="rgba(0,0,0,0.4)" />
        <MaterialCommunityIcons
          name="diving-snorkel"
          size={100}
          style={{
            position: "absolute",
            justifyContent: "center",
            alignContent: "center",
            margin: "25%",
            color: "#40b2b0",
          }}
        />
        <Text style={styles.companyName}>
          <Text style={styles.dip}>Dip</Text>
          Advisor
        </Text>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <View>
          <Text style={styles.loginText}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <View>
          <Text style={styles.signupText}>SignUp</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default WelcomeScreen;
