import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

function MapViewScreen({ navigation }, props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>

      <Text>Single location 3 holder</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapViewScreen;
