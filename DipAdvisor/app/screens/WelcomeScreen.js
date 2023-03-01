import React from "react";
import {
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/styles.WelcomeScreen";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/React-icon.png")}
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
