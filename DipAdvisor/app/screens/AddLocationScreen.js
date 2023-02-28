import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";
import { Switch } from "react-native";
import { auth } from "../firebase";
import { addLocation } from "../utils/api";
import { styles } from "../styles/styles.AddLocationScreen";
import { useState } from "react";
import "react-native-get-random-values";
import { uploadImage, pickImage } from "../utils/imageUploads";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

function AddLocationScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const validationSchema = Yup.object().shape({
    location_name: Yup.string()
      .min(2, "Too short!")
      .max(20, "Too long!")
      .required("Location name required"),
    description: Yup.string()
      .min(5, "Too short!")
      .max(200, "Too long!")
      .required("Brief description required"),
  });

  const handlePost = (values) => {
    uploadImage(image, setImageURL)
      .then((url) => {
        values.created_by = auth.currentUser.email;
        values.image_urls = [imageURL];
        values.coordinates = [54.449505, -3.284804];
      })
      .then(() => {
        setTimeout(() => {
          console.log(values, "values");
        });
      }, 2000);

    addLocation(values)
      .then(({ location }) => {
        const locationID = { location_id: location[0]._id };
        navigation.navigate("SingleLocationScreen", locationID);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      <ScrollView>
        <KeyboardAvoidingView style={styles.background}>
          <Formik
            validationSchema={validationSchema}
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
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.label}>Location Name:</Text>
                <TextInput
                  style={styles.location_nameInput}
                  onChangeText={handleChange("location_name")}
                  onBlur={handleBlur("location_name")}
                  value={values.location_name}
                />
                {errors.location_name && touched.location_name ? (
                  <Text style={styles.locationNameError}>
                    {errors.location_name}
                  </Text>
                ) : null}
                <Text style={styles.label}>Description:</Text>
                <TextInput
                  multiline={true}
                  style={styles.descriptionInput}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
                {errors.description && touched.description ? (
                  <Text style={styles.descriptionError}>
                    {errors.description}
                  </Text>
                ) : null}
                <Button
                  title="Select photo"
                  onPress={() => pickImage(setImage)}
                />
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
                <Text style={styles.label}>
                  Is this location on public land?
                </Text>
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
                    By clicking "Add Location", I confirm I have recieved
                    express permission to swim from the land owner.
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
      </ScrollView>
    </ImageBackground>
  );
}

export default AddLocationScreen;
