const { StyleSheet } = require("react-native");

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
    height: 300,
    width: width,
    backgroundColor: "#EFEFEF",
  },
  imageItem: {
    width: width,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    padding: 20,
    width: "100%",
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
});

module.exports = { styles };
