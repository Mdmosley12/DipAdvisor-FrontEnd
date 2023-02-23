import { View, Text, StyleSheet } from "react-native";

function AddLocationScreen(prop) {
  return (
    <View style={styles.container}>
      <Text>Adding location holder text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddLocationScreen;
