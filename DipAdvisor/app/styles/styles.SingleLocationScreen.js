const { StyleSheet } = require("react-native");
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    borderRadius: 8,
    width: "90%",
    height: "auto",
    shadowColor: "#000",
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // zIndex: 2,
    // backgroundColor: "blue",
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
    marginTop: 10,
    // height: width / 2,
    width: "100%",
    // borderRadius: 20,
    // backgroundColor: "#EFEFEF",
  },
  imageItem: {
    width: width,
    height: width / 2,
    // borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  infoContainer: {
    // width: width,
  },
  info: {
    flexDirection: "column",
    // marginVertical: 10,
    // width: "98%",
  },
  info_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  info_name: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 15,
  },
  info_value: {
    flex: 1,
    textAlign: "right",
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 10,
    marginTop: 10,
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
    alignSelf: "center",
  },
  photoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

module.exports = { styles, width };
