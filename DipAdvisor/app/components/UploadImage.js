import { SafeAreaView, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../assets/firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import "firebase/storage";

function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const pickImage = async () => {
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

    // 'blob' comes from the Blob
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
  return <ImagePickerExample />;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Upload;
