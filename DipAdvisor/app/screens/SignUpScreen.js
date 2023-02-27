import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, ImageBackground, Text, TextInput, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { auth } from "../assets/firebase";
import { styles } from "../styles/styles.SignUpScreen";
import { marginTopChanger } from "../utils/marginTopChanger";

function SignUpScreen({ navigation }) {
  const [containerMarginTop, setContainerMarginTop] = useState(125);
  marginTopChanger(setContainerMarginTop);

  const handleSignUp = (values) => {
    if (values.isChecked === true) {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Signed up with:", user.email);
          user.updateProfile({
            displayName: values.displayName,
          });
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
      source={require("../assets/WelcomeScreenImg.jpg")}>
      <Formik
        initialValues={{
          email: "",
          displayName: "",
          password: "",
          isChecked: false,
        }}
        onSubmit={(values) => {
          handleSignUp(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View
            style={{
              ...styles.loginContainer,
              marginTop: containerMarginTop,
            }}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.emailInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
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
              autoCapitalize="none"
            />
            <Text style={styles.disclaimer}>
              By using this App, the user agrees to indemnify and hold harmless
              the App and its developers, affiliates, and partners from any
              claims, damages, or expenses arising out of or in connection with
              the use of the information provided.
            </Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                title="Accept terms & conditions"
                checked={values.isChecked}
                onPress={() => setFieldValue("isChecked", !values.isChecked)}
              />
            </View>
            <Button
              style={styles.button}
              onPress={handleSubmit}
              title="Sign Up"
            />
          </View>
        )}
      </Formik>
    </ImageBackground>
  );
}

export default SignUpScreen;
