import { View, Text, StyleSheet, SafeAreaView } from "react-native";

function MapViewScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
      <Text>Map holder</Text>
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
