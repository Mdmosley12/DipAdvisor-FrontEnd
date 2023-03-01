const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "80%",
    height: 70,
    backgroundColor: "#fc5c65",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
  },
  registerButton: {
    width: "80%",
    height: 70,
    backgroundColor: "#4ecdc4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 150,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 5,
  },
  logo: {
    width: 150,
    height: 130,
    color: "black",
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 70,
  },
  companyName: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 15,
  },
  dip: {
    color: "#1A35FA",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  signupText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

module.exports = { styles };
