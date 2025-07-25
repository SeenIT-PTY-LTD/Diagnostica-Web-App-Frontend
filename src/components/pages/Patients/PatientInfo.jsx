import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePatient } from "../../../redux/features/patient/patientApiSlice";

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

  const getValueByLabel = (label, patient) => {
    switch (label) {
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
    <div className="max-w-xl w-full p-4 bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 gap-5">
        {selectedPatient.map((patient) =>
          labels.map((label) => (
            <div key={`${patient._id}-${label}`}>
              <div className="flex justify-between items-center text-base py-2">
                <span className="font-semibold text-gray-800 w-1/3">
                  {label}
                </span>
                <span className="text-gray-700 w-2/3 text-center">
                  {getValueByLabel(label, patient)}
                </span>
              </div>
              <div className="border-b border-gray-200"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
