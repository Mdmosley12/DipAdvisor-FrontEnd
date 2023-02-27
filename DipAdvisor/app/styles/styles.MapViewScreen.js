import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    width: 160,
    height: 200,
    alignItems: "center",
  },
  calloutTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutImage: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
});

module.exports = styles;
