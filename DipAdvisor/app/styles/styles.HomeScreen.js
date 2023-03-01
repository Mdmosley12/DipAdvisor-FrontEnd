const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  popularSpotsContainer: {
    flexWrap: "wrap",
    flex: 1,
    flexDirection: "row",
  },
  votes: {
    fontSize: 12,
    fontStyle: "italic",
  },
  spotsTitle: {
    fontSize: 22,
    marginTop: 40,
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    borderRadius: 10,
  },
  backgroundWelcome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});

module.exports = { styles };
