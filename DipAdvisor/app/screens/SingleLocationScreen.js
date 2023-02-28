import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Loading from "../components/Loading";
import { auth } from "../firebase";
import { styles, width } from "../styles/styles.SingleLocationScreen";
import {
  getSingleLocation,
  patchLocation,
  addPhotoToLocation,
} from "../utils/api";
import { checkAdmin } from "../utils/checkAdmin";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../utils/imageUploads";

function SingleLocationScreen({ route, navigation }) {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { location_id } = route.params;
  if (!location_id) return navigation.navigate("HomeScreen");
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);

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
  }, [location_id, imageUrl]);

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

  const addPhoto = (image, setImageUrl, imageUrl) => {
    const values = {};
    uploadImage(image, setImageUrl)
      .then((url) => {
        values.image_urls = [imageUrl];
      })
      .then(() => {
        setTimeout(() => {}, 2000);
      });

    const body = { url: imageUrl };
    addPhotoToLocation(body, location_id).then((place) => {});
  };

  const renderLocationProperty = ({ item }) => {
    return (
      <View style={styles.propertyItem}>
        <Text style={styles.propertyName}>{item.name}</Text>
        <Text style={styles.propertyValue}>{item.value}</Text>
      </View>
    );
  };

  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.imageGrid}>
        {location.dangerous ? <Text>This Location is DANGEROUS</Text> : <></>}
        <FlatList
          data={location.image_urls}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={width}
          decelerationRate="fast"
          pagingEnabled
          renderItem={({ item }) => (
            <View style={styles.imageItem}>
              <Image
                style={styles.image}
                source={{ uri: item }}
                resizeMode="stretch"
              />
            </View>
          )}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{location.location_name}</Text>
        <FlatList
          data={[
            {
              name: "Depth",
              value: location.depth ? location.depth : "N/A",
            },
            { name: "Public", value: location.public ? "Yes" : "No" },
            {
              name: "Water Temperature",
              value: location.water_temp ? location.water_temp : "N/A",
            },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLocationProperty}
        />
        <ScrollView>
          <Text style={styles.description}>{location.description}</Text>
          <Button title="add pic" onPress={() => pickImage(setImage)} />
          {image && (
            <View>
              <Image source={{ uri: image }} style={{ width: 12, height: 9 }} />
              <Button
                title="addPhoto function"
                onPress={() => {
                  addPhoto(image, setImageUrl, imageUrl);
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default SingleLocationScreen;
