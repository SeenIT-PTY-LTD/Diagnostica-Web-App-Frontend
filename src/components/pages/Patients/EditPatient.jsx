import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { patientSchema } from "../../../validation/patientValidation";
import {
  updatePatient,
  fetchSinglePatient,
} from "../../../Redux/features/patient/patientApiSlice";
import { showToast } from "../../../common/showToast";

const EditPatient = () => {
  const dispatch = useDispatch();
  const { id: patientId } = useParams();
  const { selectedPatient, loading } = useSelector((state) => state.patients);
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchSinglePatient(patientId)).then(() => setFormReady(true));
    }
  }, [dispatch, patientId]);

  const formik = useFormik({
    initialValues: {
      firstName: selectedPatient?.firstName || "",
      lastName: selectedPatient?.lastName || "",
      dob: selectedPatient?.dob || "",
      gender: selectedPatient?.gender || "",
      phone: selectedPatient?.phone || "",
      patientCode: selectedPatient?.patientCode || "",
      country: selectedPatient?.country || "",
      medicareNumber: selectedPatient?.medicareNumber || "",
      address: selectedPatient?.address || "",
      state: selectedPatient?.state || "",
      postcode: selectedPatient?.postcode || "",
      height: selectedPatient?.height || "",
      weight: selectedPatient?.weight || "",
    },
    validationSchema: patientSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          updatePatient({ id: patientId, values })
        ).unwrap();
        showToast("success", "Patient bio updated!");
      } catch (error) {
        showToast("error", error.message || "Failed to update patient");
      }
    },
  });
  console.log("formik",formik);
  

  if (!formReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center py-10 text-lg">Loading patient data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-lg">
        <Formik
          initialValues={formik.initialValues}
          validationSchema={patientSchema}
          onSubmit={formik.handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">Edit Patient Bio</h2>

              {[
                { name: "firstName", placeholder: "First Name" },
                { name: "lastName", placeholder: "Last Name" },
                { name: "patientCode", placeholder: "Patient Code" },
                { name: "phone", placeholder: "Phone Number", type: "text" },
                { name: "dob", placeholder: "Date of Birth", type: "date" },
                { name: "gender", placeholder: "Gender" },
                { name: "country", placeholder: "Country" },
                { name: "medicareNumber", placeholder: "Medicare Number" },
                { name: "address", placeholder: "Address" },
                { name: "state", placeholder: "State" },
                { name: "postcode", placeholder: "Postcode" },
                { name: "height", placeholder: "Height" },
                { name: "weight", placeholder: "Weight" },
              ].map(({ name, placeholder, type = "text" }) => (
                <div key={name} className="mb-4">
                  <Field
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={`w-full border p-3 rounded ${
                      errors[name] && touched[name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
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
                className={`w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPatient;