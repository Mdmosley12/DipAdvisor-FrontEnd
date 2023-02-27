const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
    width: "80%",
    height: 460,
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
    marginTop: 125,
  },
  emailInput: {
    height: 40,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  emailError: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 20,
    marginTop: -20,
  },
  passwordInput: {
    height: 40,
    width: 280,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  passwordError: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 20,
    marginTop: -20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
  disclaimer: {
    backgroundColor: "white",
    marginBottom: 10,
    width: 280,
    fontWeight: "bold",
  },
});

module.exports = { styles };
