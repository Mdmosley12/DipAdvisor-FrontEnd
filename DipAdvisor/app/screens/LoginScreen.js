import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
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

function LoginScreen({ navigation }) {
  const userValue = useContext(UserContext);

  const handleLogin = (values) => {
    if (values.isChecked === true) {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          userValue.setUser(user.displayName);
          console.log("Logged in with:", user.email);
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeScreen");
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginContainer: {
    // backgroundColor: 'blue',
    borderRadius: 8,
    width: "80%",
    height: 450,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 125,
  },
  emailInput: {
    height: 40,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  passwordInput: {
    height: 40,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
  disclaimer: {
    // backgroundColor: 'white',
    marginBottom: 10,
    width: 280,
    fontWeight: "bold",
  },
});
