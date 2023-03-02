import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#4ecdc4",
    width: "90%",
    marginTop: 50,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: "center",
    paddingVertical: 20,
    // paddingHorizontal: 20,
    backgroundColor: "rgba(250, 250, 250, 0.8)",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 40,
  },
  location_nameInput: {
    height: 40,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  locationNameError: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 20,
    marginTop: -20,
  },
  descriptionInput: {
    height: 130,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  descriptionError: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 20,
    marginTop: -20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  yes: {
    paddingLeft: 10,
  },
  no: {
    paddingRight: 10,
  },
  privateWarning: {
    color: "red",
    paddingBottom: 10,
    fontStyle: "italic",
  },
  map: {
    width: "80%",
  },
  publicTitle: {
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 40,
  },
  image: {
    width: 280,
    height: 200,
    marginTop: 15,
  },
});

module.exports = { styles };
