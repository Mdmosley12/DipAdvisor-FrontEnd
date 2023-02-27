const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "right",
  },

  // background: {
  //   flex: 1,
  //   padding: 20,
  // },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  votes: {
    fontSize: 12,
    fontStyle: "italic",
  },
  spotsTitle: {
    fontSize: 18,
  },
  boxTitle: {
    fontSize: 18,
    textAlign: "right",
  },
  backgroundWelcome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

module.exports = { styles };
