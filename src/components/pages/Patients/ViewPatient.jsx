import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointmentByPatientId,
  fetchSectionsByBodyPartId,
  fetchSinglePatient,
} from "../../../redux/features/patient/patientApiSlice";
import { useParams } from "react-router-dom";

// Import section components
import FootAndAnkelImages from "./FootAndAnkleParts/FootAndAnkelImages";
import MOFXQ from "./FootAndAnkleParts/MOXFQ";
import EQ5D from "./FootAndAnkleParts/EQ5D";
import PCS from "./FootAndAnkleParts/PCS";
import SF36 from "./FootAndAnkleParts/SF36";

const sectionComponents = {
  Images: FootAndAnkelImages,
  MOFXQ,
  EQ5D,
  PCS,
  SF36,
  // Diagnosica: Diagnosica,
};

const ViewPatient = () => {
  const dispatch = useDispatch();
  const { id: patientId } = useParams();
  const { appointmentUserData } = useSelector((state) => state.patients);
  const [formReady, setFormReady] = useState(false);
  const [activeAppointmentSection, setAppointmentActiveSection] =
    useState(null);
  const appointmentIds = useMemo(() => {
    return appointmentUserData?.list?.map((item) => item.appointmentId) || [];
  }, [appointmentUserData]);

  const [activeSection, setActiveSection] = useState("Patient Details");
  console.log("appointmentIds", appointmentIds);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchSinglePatient(patientId)).then(() => setFormReady(true));
      dispatch(fetchAppointmentByPatientId(patientId)).then(() =>
        setFormReady(true)
      );
      dispatch(fetchSectionsByBodyPartId("686e58cdcd2a32f97ed3d928")).then(() =>
        setFormReady(true)
      );
    }
  }, [dispatch, patientId]);

  useEffect(() => {
    if (appointmentIds.length > 0 && !activeAppointmentSection) {
      setAppointmentActiveSection(appointmentIds[0]);
    }
  }, [appointmentIds, activeAppointmentSection]);

  if (!formReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center py-10 text-lg">Loading patient data...</div>
      </div>
    );
  }

  const renderSection = () => {
    if (activeSection === "Patient Details") return null;

    const Component = sectionComponents[activeSection];
    return Component ? <Component /> : <div>No Component Found</div>;
  };

  const sectionList = [
    "Patient Details",
    "Images",
    "MOFXQ",
    "EQ5D",
    "PCS",
    "SF36",
    "Diagnosica",
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        View Patient Info
      </h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {appointmentIds.map((id) => (
          <button
            key={id}
            onClick={() => setAppointmentActiveSection(id)}
            className={`px-4 py-2 text-sm sm:text-base rounded border transition-colors ${
              activeAppointmentSection === id
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "text-gray-800 bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {sectionList.map((item) => (
          <button
            key={item}
            onClick={() => setActiveSection(item)}
            className={`px-4 py-2 text-sm sm:text-base rounded border transition-colors ${
              activeSection === item
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "text-gray-800 bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Info Box */}
      {activeSection === "Patient Details" && (
        <div className="max-w-xl w-full p-4 bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 gap-5">
            {[
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
            ].map((label) => (
              <div key={label}>
                <div className="flex justify-between items-center text-base py-2">
                  <span className="font-semibold text-gray-800 w-1/3">
                    {label}
                  </span>
                  <span className="text-gray-700 w-2/3 text-center">-</span>
                </div>
                <div className="border-b border-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section Component */}
      {renderSection()}
    </>
  );
};

export default ViewPatient;
