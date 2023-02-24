import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#4ecdc4",
    width: "100%",
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
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
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
});

module.exports = { styles };
