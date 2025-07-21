import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../common/showToast";
import { patientSchema } from "../../../validation/patientValidation";
import { updatePatient } from "../../../Redux/features/patient/patientApiSlice";
import { useParams } from "react-router-dom";

const EditPatient = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
const { id: patientId} = useParams();
console.log("Patient ID:", patientId);

  const initialValues = {
    fullName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    patientCode: "",
    medicareNumber: "",
    address: "",
    state: "",
    country: "",
    postcode: "",
    height: "",
    weight: "",
  };

  // const handleSubmit = async (values) => {
  //   // Replace this with your patient update logic
  //   console.log("Submitting patient data:", values);
  //   showToast("success", "Patient bio updated!");
  // };

  const handleSubmit = async (values) => {
  try {
    await dispatch(updatePatient({ id: patientId, values })).unwrap();
    showToast("success", "Patient bio updated!");
  } catch (error) {
    showToast("error", error.message || "Failed to update patient");
  }
};

  return (
    <div className="min-h-screen bg-cover bg-center flex items-start justify-start py-10">
      <div className="w-full max-w-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={patientSchema}
          onSubmit={handleSubmit}
        >
          <Form className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Patient Bio</h2>

            {[
              { name: "fullName", placeholder: "Full Name" },
              { name: "dob", placeholder: "Date of Birth", type: "date" },
              { name: "gender", placeholder: "Gender" },
              {
                name: "phoneNumber",
                placeholder: "Phone Number",
                type: "number",
              },
              { name: "patientCode", placeholder: "Patient Code" },
              { name: "medicareNumber", placeholder: "Medicare Number" },
              { name: "address", placeholder: "Address" },
              { name: "state", placeholder: "State" },
              { name: "country", placeholder: "Country" },
              { name: "postcode", placeholder: "Postcode" },
              { name: "height", placeholder: "Height" },
              { name: "weight", placeholder: "Weight" },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name} className="mb-4">
                <Field
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="w-full border p-3 rounded"
                />
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditPatient;
