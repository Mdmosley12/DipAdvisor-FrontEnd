import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import { Switch } from "react-native";
import { auth } from "../assets/firebase";
import { addLocation } from "../utils/api.utils";
import { styles } from "../styles/styles.AddLocationScreen";

function AddLocationScreen({ navigation }) {
  const handlePost = (values) => {
    values.created_by = auth.currentUser.email;
    addLocation(values).then(() => {
      navigation.navigate("HomeScreen");
    });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.background}>
        <Formik
          initialValues={{
            location_name: "",
            description: "",
            public: false,
          }}
          onSubmit={handlePost}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Location Name:</Text>
              <TextInput
                style={styles.location_nameInput}
                onChangeText={handleChange("location_name")}
                onBlur={handleBlur("location_name")}
                value={values.location_name}
              />
              <Text style={styles.label}>Description:</Text>
              <TextInput
                multiline={true}
                style={styles.descriptionInput}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
              <Text style={styles.label}>Is this location on public land?</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.no}>No</Text>
                <Switch
                  value={values.public}
                  onValueChange={(value) => setFieldValue("public", value)}
                  trackColor={{ false: "black", true: "black" }}
                  thumbColor={"white"}
                />
                <Text style={styles.yes}>Yes</Text>
              </View>
              {!values.public ? (
                <Text style={styles.privateWarning}>
                  By clicking "Add Location", I confirm I have recieved express
                  permission to swim from the land owner.
                </Text>
              ) : null}
              <Button
                style={styles.button}
                onPress={handleSubmit}
                title="Add Location"
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default AddLocationScreen;
