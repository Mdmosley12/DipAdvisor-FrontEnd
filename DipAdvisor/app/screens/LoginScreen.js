import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import { CheckBox } from "react-native-elements";
import { auth } from "../assets/firebase";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { styles } from "../styles/styles.LoginScreen";

function LoginScreen({ navigation }) {
  const userValue = useContext(UserContext);

  const handleLogin = (values) => {
    if (values.isChecked === true) {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          userValue.setUser(user.email);
          console.log("Logged in with:", user.email);
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("WelcomeScreen");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      <KeyboardAvoidingView behavior="padding">
        <Formik
          initialValues={{ email: "", password: "", isChecked: false }}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View style={styles.loginContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.emailInput}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <Text style={styles.disclaimer}>
                By using this App, the user agrees to indemnify and hold
                harmless the App and its developers, affiliates, and partners
                from any claims, damages, or expenses arising out of or in
                connection with the use of the information provided.
              </Text>
              <CheckBox
                style={styles.checkbox}
                title="Accept terms & conditions"
                checked={values.isChecked}
                onPress={() => setFieldValue("isChecked", !values.isChecked)}
              />
              <Button
                style={styles.button}
                onPress={handleSubmit}
                title="Log In"
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default LoginScreen;
