import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Switch } from "react-native";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import "react-native-get-random-values";
import { uploadImage } from "../utils/imageUploads";
import * as ImagePicker from "expo-image-picker";
import { addLocationValidationSchema } from "../utils/addLocationValidationSchema";
import * as Location from "expo-location";
import { addLocation } from "../utils/api";
import { styles } from "../styles/styles.AddLocationScreen";
import PostLocationCoords from "./PostLocationCoords";

function AddLocationScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [visible, setVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [pinCoords, setPinCoords] = useState({
    latitude: 51.146592,
    longitude: -0.063179,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      setPinCoords(location);
    })();
  }, []);

  const handlePost = (values) => {
    values.created_by = auth.currentUser.email;
    values.coordinates = [pinCoords.latitude, pinCoords.longitude];
    values.image_urls = [imageURL];
    if (values.coordinates[0] !== undefined) {
      addLocation(values)
        .then(({ location }) => {
          const locationID = { location_id: location[0]._id };
          navigation.navigate("SingleLocationScreen", locationID);
          setVisible(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please drag pin to new location");
    }
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

  const uploadImageHandler = () => {
    uploadImage(image, setImageURL).then(() => {
      setImage(null);
      setVisible(true);
    });
  };
  return (
    <ImageBackground source={require("../assets/WelcomeScreenImg.jpg")}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.background}>
          <Formik
            validationSchema={addLocationValidationSchema}
            initialValues={{
              location_name: "",
              description: "",
              public: false,
              coordinates: pinCoords,
            }}
            onSubmit={handlePost}
            enableReinitialize={true}
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

                <Text style={styles.label} multiline={true}>
                  Hold pin and drag to location.
                </Text>
                <PostLocationCoords
                  style={styles.map}
                  setPinCoords={setPinCoords}
                  userLocation={userLocation}
                />
                <Button
                  title="Select photo"
                  onPress={() => pickImage(setImage)}
                />
                {image && (
                  <View>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Button
                      title="upload image"
                      onPress={() => uploadImageHandler()}
                    ></Button>
                  </View>
                )}

                <Text style={styles.publicTitle}>
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

                {!image && !imageURL ? (
                  <Text style={styles.privateWarning}>
                    Please Select Photo to Add Location
                  </Text>
                ) : image ? (
                  <Text style={styles.privateWarning}>
                    Please Upload Image to Add Location
                  </Text>
                ) : null}
                {visible ? (
                  <Button
                    style={styles.button}
                    onPress={handleSubmit}
                    title="Add Location"
                  />
                ) : null}
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}

export default AddLocationScreen;
