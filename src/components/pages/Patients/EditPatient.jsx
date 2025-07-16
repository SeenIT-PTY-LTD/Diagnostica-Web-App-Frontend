import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useFormik } from "formik";
import { patientSchema } from "../../../validation/patientValidation";
import {
  updatePatient,
  fetchSinglePatient,
} from "../../../redux/features/patient/patientApiSlice";
import { showToast } from "../../../common/ShowToast";

const EditPatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const { selectedPatient, loading } = useSelector((state) => state.patients);
  console.log("selectedPatient:", selectedPatient);

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
        await dispatch(updatePatient({ id: patientId, values })).unwrap();
        showToast("success", "Patient bio updated!");
        navigate("/patient");
      } catch (error) {
        showToast("error", error.message || "Failed to update patient");
      }
    },
  });
  console.log("formik values:", formik);

  if (!formReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center py-10 text-lg">Loading patient data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-start pt-16 px-4">
      <div className="w-full max-w-lg">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 shadow-lg rounded-lg"
        >
          <div className="flex flex-col items-start">
            <h2 className="mt-3 text-start text-2xl font-bold text-gray-900">
              Edit Patient Bio
            </h2>
          </div>

          <div className="space-y-5 mt-6">
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "phone", label: "Phone Number" },
              { name: "patientCode", label: "Patient Code" },
              { name: "dob", label: "Date of Birth", type: "date" },
              { name: "gender", label: "Gender" },
              { name: "country", label: "Country" },
              { name: "medicareNumber", label: "Medicare Number" },
              { name: "address", label: "Address" },
              { name: "state", label: "State" },
              { name: "postcode", label: "Postcode" },
              { name: "height", label: "Height" },
              { name: "weight", label: "Weight" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border p-3 rounded-md shadow-sm ${
                    formik.errors[name] && formik.touched[name]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.errors[name] && formik.touched[name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors[name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
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
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
