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
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 125,
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
    backgroundColor: "white",
    borderRadius: 8,
  },
  emailError: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 20,
    marginTop: -20,
  },
  passwordInput: {
    height: 30,
    width: 240,
    paddingHorizontal: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
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
