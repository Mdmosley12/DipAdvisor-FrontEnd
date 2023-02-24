import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { auth } from "../assets/firebase";
import { CheckBox } from "react-native-elements";

function SignUpScreen({ navigation }) {
  const handleSignUp = (values) => {
    if (values.isChecked === true) {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Signed up with:", user.email);
          user.updateProfile({
            displayName: values.username,
          });
          console.log(user.username);
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
          initialValues={{
            email: "",
            displayName: "",
            password: "",
            isChecked: false,
          }}
          onSubmit={(values) => {
            handleSignUp(values);
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
              <Text style={styles.label}>Display Name:</Text>
              <TextInput
                style={styles.displayNameInput}
                onChangeText={handleChange("displayName")}
                onBlur={handleBlur("displayName")}
                value={values.displayName}
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
                title="Sign Up"
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default SignUpScreen;
