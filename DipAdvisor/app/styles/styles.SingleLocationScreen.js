const { StyleSheet } = require("react-native");
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  closeButton: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    elevation: 2,
  },
  flagButton: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  flagButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  imageGrid: {
    marginTop: 100,
    height: width / 2,
    width: width,
    backgroundColor: "#EFEFEF",
  },
  imageItem: {
    width: width,
    height: width / 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    width: width,
  },
  info: {
    flexDirection: "column",
    marginVertical: 10,
    width: "98%",
  },
  info_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  info_name: {
    fontWeight: "bold",
    flex: 1,
  },
  info_value: {
    flex: 1,
    textAlign: "right",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  propertiesList: {
    width: "100%",
  },
  propertyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 1,
  },
  propertyName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  propertyValue: {
    fontSize: 16,
  },
  photoButton: {
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 50,
    width: 150,
    alignSelf: "center",
  },
  photoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

module.exports = { styles, width };
