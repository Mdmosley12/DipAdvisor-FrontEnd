import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { auth } from "../firebase";
import { styles } from "../styles/styles.SignUpScreen";
import { marginTopChanger } from "../utils/marginTopChanger";
import { signUpValidationSchema } from "../utils/signUpValidationSchema";
import { handleSignUp } from "../utils/handleSignUp";

function SignUpScreen({ navigation }) {
  const [containerMarginTop, setContainerMarginTop] = useState(125);
  marginTopChanger(setContainerMarginTop);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("WelcomeScreen");
        auth.currentUser.reload();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      <Formik
        validationSchema={signUpValidationSchema}
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
          errors,
          touched,
        }) => (
          <View
            style={{
              ...styles.loginContainer,
              marginTop: containerMarginTop,
            }}
          >
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

            <Text style={styles.label}>Display Name:</Text>
            <TextInput
              style={styles.displayNameInput}
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              value={values.displayName}
            />
            {errors.displayName && touched.displayName ? (
              <Text style={styles.displayNameError}>{errors.displayName}</Text>
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
              By using this App, the user agrees to indemnify and hold harmless
              the App and its developers, affiliates, and partners from any
              claims, damages, or expenses arising out of or in connection with
              the use of the information provided.
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
    </ImageBackground>
  );
}

export default SignUpScreen;
