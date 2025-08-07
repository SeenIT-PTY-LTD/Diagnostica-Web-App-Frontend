import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addDoctorSchema } from "../../../validation/doctorValidation";
import { addDoctor } from "../../../redux/features/doctor/doctorApiSlice";
import { showToast } from "../../../common/ShowToast";
import axios from "axios";

const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const formik = useFormik({
    initialValues: {
      medicareNumber: "",
      name: "",
      phone: "",
      email: "",
      specialization: "",
      location: "",
      hospitals: "",
      genderSpecificCare: "",
      countryCode: "",
      pediatricSpecialist: "",
    },
    validationSchema: addDoctorSchema,
    onSubmit: async (values) => {
      try {
        let response = await dispatch(addDoctor(values)).unwrap();
        if (response["isSuccess"]) {
          showToast("success", "Doctor added successfully!");
          navigate("/doctor");
        }

        // navigate("/doctors");
      } catch (error) {
        showToast("error", error.message || "Failed to add doctor");
      }
    },
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,idd,flags")
      .then(({ data }) => {
        const list = data
          .map((c) => ({
            code: c.idd.root + (c.idd.suffixes?.[0] || ""),
            name: c.name.common,
            flag: c.flags.svg,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
      })
      .finally(() => setLoadingCountries(false));
  }, []);

  return (
    <div className="py-1 px-1">
      <div className="bg-blue-100  border-b border-gray-200 rounded-t py-4 px-10">
        <h2 className="text-xl font-semibold text-gray-700">Add Doctor</h2>
      </div>

      <div className="bg-white w-full rounded shadow px-4">
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-2">
          {[
            { name: "medicareNumber", label: "Medical Registration Number" },
            { name: "name", label: "Doctor Name" },
            { name: "countryCode", label: "Country Code" },
            { name: "phone", label: "Contact Number" },
            { name: "email", label: "Email Address" },
            { name: "specialization", label: "Specialization" },
            { name: "location", label: "Geographic Location" },
            { name: "hospitals", label: "Hospitals I works at" },
          ].map(({ name, label }) => (
            <>
              {name !== "countryCode" ? (
                <div key={name}>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    id={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full border rounded px-4 py-2 focus:outline-none ${
                      formik.errors[name] && formik.touched[name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors[name] && formik.touched[name] && (
                    <p className="text-sm text-red-500 mt-1">
                      {formik.errors[name]}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    {label}
                  </label>
                  <select
                    name="countryCode"
                    value={formik.values.countryCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-2 border rounded pr-8 ${
                      formik.touched.countryCode && formik.errors.countryCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select country</option>

                    {countries.map((c) => (
                      <option key={c.name} value={c.code}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                  {formik.errors[name] && formik.touched[name] && (
                    <p className="text-sm text-red-500 mt-1">
                      {formik.errors[name]}
                    </p>
                  )}
                </div>
              )}
            </>
          ))}

          {/* Gender-specific care radio */}
          <label className="block font-semibold pt-2">
            Gender-specific care
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="genderSpecificCare"
                value="true"
                className="cursor-pointer"
                onChange={() =>
                  formik.setFieldValue("genderSpecificCare", true)
                }
                checked={formik.values.genderSpecificCare === true}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="genderSpecificCare"
                value="false"
                className="cursor-pointer"
                onChange={() =>
                  formik.setFieldValue("genderSpecificCare", false)
                }
                checked={formik.values.genderSpecificCare === false}
              />{" "}
              No
            </label>
          </div>
          {formik.errors.genderSpecificCare &&
            formik.touched.genderSpecificCare && (
              <p className="text-red-600 text-sm">
                {formik.errors.genderSpecificCare}
              </p>
            )}

          {/* Pediatric Specialist */}
          <label className="block font-semibold pt-2">
            Pediatric Specialist
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="pediatricSpecialist"
                value="true"
                className="cursor-pointer"
                onChange={() =>
                  formik.setFieldValue("pediatricSpecialist", true)
                }
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="pediatricSpecialist"
                value="false"
                className="cursor-pointer"
                onChange={() =>
                  formik.setFieldValue("pediatricSpecialist", false)
                }
              />{" "}
              No
            </label>
          </div>
          {formik.errors.pediatricSpecialist &&
            formik.touched.pediatricSpecialist && (
              <p className="text-red-600 text-sm">
                {formik.errors.pediatricSpecialist}
              </p>
            )}

          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition disabled:opacity-50"
          >
            {/* {loading ? "Submitting..." : "Add"} */}
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
