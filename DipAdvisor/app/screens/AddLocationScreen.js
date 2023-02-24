import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Switch } from "react-native";
import { auth } from "../assets/firebase";
import { addLocation } from "../utils/api";
import { styles } from "../styles/styles.AddLocationScreen";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../assets/firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

function AddLocationScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const handlePost = (values) => {
    uploadImage().then(() => {
      values.created_by = auth.currentUser.email;
      values.image_urls = imageURL;
      addLocation(values).then(({ location }) => {
        const locationID = { location_id: location[0]._id };
        navigation.navigate("SingleLocationScreen", locationID);
      });
    });
  };
  const pickImage = async () => {
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

  const uploadImage = async () => {
    const storageRef = ref(storage, uuidv4());

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log(snapshot);
        console.log("Uploaded a blob!");
        return snapshot;
      })
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageURL(url);
          console.log("File available at", url);
        });
      });
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeScreenImg.jpg")}
    >
      <ScrollView>
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

                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
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
