import { auth } from "../firebase";

const handleSignUp = (values) => {
  if (values.isChecked === true) {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Signed up with:", user.email);
        user.updateProfile({
          displayName: values.displayName,
          displayName: values.displayName,
        });
      })
      .catch((error) => alert(error.message));
  } else {
    alert("Please accept terms & conditions");
  }
};

module.exports = { handleSignUp };
