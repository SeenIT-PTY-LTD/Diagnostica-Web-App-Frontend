import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePatient } from "../../../redux/features/patient/patientApiSlice";
import api from "../../../utils/api";

const PatientInfo = () => {
  const dispatch = useDispatch();
  const { id: patientId } = useParams();
  const { selectedPatient } = useSelector((state) => state.patients);
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchSinglePatient(patientId)).then(() => setFormReady(true));
    }
  }, [dispatch, patientId]);

  const labels = [
    "Profile Image",
    "Name",
    "DOB",
    "Gender",
    "Phone",
    "Medicare Number",
    "Address",
    "State",
    "Height",
    "About Us",
    "Doctor Details",
    "URN",
    "Email",
    "Country",
    "Postcode",
    "Weight",
    "BMI",
  ];
  const placeholderImage = "/default-avatar.png"; // keep this in public folder

  const getValueByLabel = (label, patient) => {
    switch (label) {
      case "Profile Image":
        return (
          <div className="flex justify-start sm:justify-end">
            <img
              src={
                patient.profileImage
                  ? `${api}/images/${patient.profileImage}`
                  : placeholderImage
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border border-gray-300"
              onError={(e) => (e.target.src = placeholderImage)}
            />
          </div>
        );
      case "Name":
        return `${patient.firstName} ${patient.lastName}`;
      case "DOB":
        return patient.dob;
      case "Gender":
        return patient.gender;
      case "Phone":
        return `${patient.countryCode} ${patient.phone}`;
      case "Medicare Number":
        return patient.patientCode;
      case "Address":
        return patient.address;
      case "State":
        return patient.state;
      case "Height":
        return patient.height ? `${patient.height} cm` : "-";
      case "About Us":
        return "-"; // Placeholder
      case "Doctor Details":
        return "-"; // Placeholder
      case "URN":
        return patient.urn;
      case "Email":
        return patient.email;
      case "Country":
        return patient.country;
      case "Postcode":
        return patient.postcode;
      case "Weight":
        return patient.weight ? `${patient.weight} kg` : "-";
      case "BMI":
        return patient.bmi || "-";
      default:
        return "-";
    }
  };

  if (!formReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center py-10 text-lg">Loading patient data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-lg w-full mx-auto p-4 sm:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 gap-3">
        {selectedPatient.map((patient) =>
          labels.map((label) => (
            <>
              <div
                key={`${patient._id}-${label}`}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:text-base py-2 gap-1 sm:gap-3"
              >
                <span className="font-medium text-gray-800 w-full sm:w-1/3 break-words">
                  {label}
                </span>
                <span className="text-gray-700 w-full sm:w-2/3 break-words whitespace-pre-wrap text-left sm:text-right">
                  {getValueByLabel(label, patient)}
                </span>
              </div>
              <div className="w-full border-b border-gray-200 mt-0"></div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
