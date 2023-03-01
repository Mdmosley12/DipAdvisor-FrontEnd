import { auth } from "../firebase";

const handleLogin = (values) => {
  if (values.isChecked === true) {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  } else {
    alert("Please accept terms & conditions");
  }
};

module.exports = { handleLogin };
