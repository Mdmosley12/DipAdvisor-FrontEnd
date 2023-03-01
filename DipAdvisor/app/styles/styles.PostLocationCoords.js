import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

module.exports = { styles };
