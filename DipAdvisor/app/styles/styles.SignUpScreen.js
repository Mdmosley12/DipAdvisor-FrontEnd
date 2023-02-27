const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "80%",
    height: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  emailInput: {
    height: 30,
    width: 240,
    paddingHorizontal: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
  },
  passwordInput: {
    height: 30,
    width: 240,
    paddingHorizontal: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  displayNameInput: {
    height: 30,
    width: 240,
    paddingHorizontal: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  disclaimer: {
    marginBottom: 5,
    width: 240,
    fontSize: 12,
    fontWeight: "bold",
  },
});

module.exports = { styles };
