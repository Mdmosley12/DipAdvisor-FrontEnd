import * as Yup from "yup";

const addLocationValidationSchema = Yup.object().shape({
  location_name: Yup.string()
    .min(2, "Too short!")
    .max(20, "Too long!")
    .required("Location name required"),
  description: Yup.string()
    .min(5, "Too short!")
    .max(200, "Too long!")
    .required("Brief description required"),
});

module.exports = { addLocationValidationSchema };
