import { Formik } from "formik";
import React, { useState } from "react";
import { Button, ImageBackground, Text, TextInput, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { styles } from "../styles/styles.LoginScreen";
import { marginTopChanger } from "../utils/marginTopChanger";
import { loginValidationSchema } from "../utils/loginValidationSchema";
import { handleLogin } from "../utils/handleLogin";

function LoginScreen() {
  const [containerMarginTop, setContainerMarginTop] = useState(125);

  marginTopChanger(setContainerMarginTop);

  return (
    <ImageBackground
      source={require("../assets/WelcomeScreenImg.jpg")}
      style={styles.background}
    >
      <Formik
        validationSchema={loginValidationSchema}
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
          <View
            style={{ ...styles.loginContainer, marginTop: containerMarginTop }}
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
              title="Log In"
            />
          </View>
        )}
      </Formik>
    </ImageBackground>
  );
}

export default LoginScreen;
