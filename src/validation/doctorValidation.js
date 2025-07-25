import * as Yup from "yup";

export const addDoctorSchema = Yup.object({
  medicareNumber: Yup.string().required("Medical Registration Number is required"),
  name: Yup.string().required("Doctor Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email Address is required"),
  specialization: Yup.string().required("Specialization is required"),
  location: Yup.string().required("Geographic Location is required"),
  hospitals: Yup.string().required("Hospital(s) name is required"),
  pediatricSpecialist: Yup.boolean().required("Please specify if pediatric specialist"),
  countryCode: Yup.string().required("Country Code is required"),
  genderSpecificCare: Yup.boolean().required("Gender care selection is required"),
});