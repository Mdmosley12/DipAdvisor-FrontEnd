import React from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
} from "react-native";
import { Formik } from "formik";
import { Switch } from "react-native";
import { auth } from "../assets/firebase";
import { addLocation } from "../utils/api.utils";

function AddLocationScreen({ navigation }) {
  const handlePost = (values) => {
    values.created_by = auth.currentUser.email;
    addLocation(values).then(() => {
      navigation.navigate("HomeScreen");
    });
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#4ecdc4",
    width: "80%",
    // height: "85%",
    marginTop: 50,
    borderRadius: 8,
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
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  location_nameInput: {
    height: 40,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  descriptionInput: {
    height: 130,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  yes: {
    paddingLeft: 10,
  },
  no: {
    paddingRight: 10,
  },
  privateWarning: {
    color: "red",
    paddingBottom: 10,
    fontStyle: "italic",
  },
});

export default AddLocationScreen;
