import * as Yup from "yup";

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  displayName: Yup.string()
    .min(2, "Too short!")
    .max(15, "Too Long!")
    .required("Required"),
  password: Yup.string().required("Password is required"),
});

module.exports = { signUpValidationSchema };
