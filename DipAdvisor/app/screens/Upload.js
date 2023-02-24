import { SafeAreaView, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getStorage } from "firebase/storage";
import { storage } from "../assets/firebase";
import uuid from "uuid";
import "firebase/storage";

function ImagePickerExample() {
  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662

    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function () {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function (e) {
    //     console.log(e);
    //     reject(new TypeError("Network request failed"));
    //   };
    //   xhr.responseType = "blob";
    //   xhr.open("GET", uri, true);
    //   xhr.send(null);
    // });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    const storageRef = ref(storage, "hello");

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
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log(snapshot);
      console.log("Uploaded a blob or file!");
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload image" onPress={uploadImage}></Button>
    </View>
  );
}

function Upload(props) {
  return (
    <SafeAreaView style={styles.background}>
      <Text>UPLOAD</Text>
      <ImagePickerExample></ImagePickerExample>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Upload;
