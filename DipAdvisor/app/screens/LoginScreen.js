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
import { auth } from "../firebase";
import { styles } from "../styles/styles.LoginScreen";
import * as Yup from "yup";

function LoginScreen({ navigation }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    if (values.isChecked === true) {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please accept terms & conditions");
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
          validationSchema={validationSchema}
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
            errors,
            touched,
          }) => (
            <View style={styles.loginContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.emailInput}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Text style={styles.emailError}>{errors.email}</Text>
              ) : null}
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <Text style={styles.passwordError}>{errors.password}</Text>
              ) : null}
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
