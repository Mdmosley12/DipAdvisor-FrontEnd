import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Loading from "../components/Loading";
import { LocationsContext } from "../contexts/LocationsContext";
import { auth } from "../firebase";
import { styles, width } from "../styles/styles.SingleLocationScreen";
import {
  addPhotoToLocation,
  getSingleLocation,
  patchLocation,
} from "../utils/api";
import { checkAdmin } from "../utils/checkAdmin";
import { uploadImage } from "../utils/imageUploads";

function SingleLocationScreen({ route, navigation }) {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [visible, setVisible] = useState(false);

  const { location_id } = route.params;
  if (!location_id) return navigation.navigate("HomeScreen");

  useEffect(() => {
    getSingleLocation(location_id)
      .then((data) => {
        setLocation(data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        navigation.navigate("HomeScreen");
      });
  }, [location_id, handleAddPhotoToLocation]);

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

  const handleFlagLocation = () => {
    patchLocation(location_id).then((data) => {
      setLocation(data);
    });
  };

  if (loading) {
    return <Loading />;
  }

  const handleAddPhotoToLocation = () => {
    const body = { url: imageUrl };
    console.log(body);
    addPhotoToLocation(body, location_id).then(() => {
      getSingleLocation(location_id).then((data) => {
        setLocation(data);
        setLoading(false);
        setImage(false);
        setVisible(false);
      });
    });
  };

  const handleUploadImage = () => {
    uploadImage(image, setImageUrl);
    setImage(null);
    setVisible(true);
  };

  const user = auth.currentUser;

  return (
    <ImageBackground
      source={require("../assets/WelcomeScreenImg.jpg")}
      style={styles.background}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flagButton}
          onPress={handleFlagLocation}
          disabled={location.dangerous ? checkAdmin(user) : false}
        >
          <Image
            style={styles.flagIcon}
            source={require("../assets/RedFlag.png")}
          />
          <Text style={styles.flagButtonText}>
            {location.dangerous ? "Flagged as Dangerous" : "Flag as Dangerous"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {location.dangerous ? <Text>This Location is DANGEROUS</Text> : <></>}
        <View style={styles.imageGrid}>
          <FlatList
            data={[...new Set(location.image_urls)]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(index) => index.toString()}
            snapToInterval={width}
            decelerationRate="fast"
            pagingEnabled
            renderItem={({ item }) => (
              <View style={styles.imageItem}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item ? item : "https://via.placeholder.com/160x160",
                  }}
                  resizeMode="stretch"
                />
              </View>
            )}
          />
        </View>
        <ScrollView contentContainerStyle={styles.infoContainer}>
          <Text style={styles.title}>{location.location_name}</Text>
          <View style={styles.info}>
            <Text style={styles.description}>{location.description}</Text>
            <View style={styles.info_row}>
              <Text style={styles.info_name}>Depth</Text>
              <Text style={styles.info_value}>
                {location.depth ? location.depth : "N/A"}
              </Text>
            </View>
            <View style={styles.info_row}>
              <Text style={styles.info_name}>Public</Text>
              <Text style={styles.info_value}>
                {location.public ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.info_row}>
              <Text style={styles.info_name}>Water Temperature</Text>
              <Text style={styles.info_value}>
                {location.water_temp ? location.water_temp : "N/A"}
              </Text>
            </View>
            {!visible ? (
              <TouchableOpacity
                style={styles.photoButton}
                onPress={() => pickImage(setImage)}
              >
                <Text>Add Photo</Text>
              </TouchableOpacity>
            ) : null}
            {image && (
              <View>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 300,
                    height: 200,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                />
                <TouchableOpacity
                  style={styles.photoButton}
                  onPress={() => {
                    handleUploadImage();
                  }}
                >
                  <Text>Upload Photo</Text>
                </TouchableOpacity>
              </View>
            )}
            {visible ? (
              <TouchableOpacity
                style={styles.photoButton}
                onPress={() => handleAddPhotoToLocation()}
              >
                <Text>Post Photo</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default SingleLocationScreen;
