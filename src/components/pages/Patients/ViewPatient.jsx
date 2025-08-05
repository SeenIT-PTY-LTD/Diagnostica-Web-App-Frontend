import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointmentByPatientId,
  fetchAttemptedSectionPrompts,
  fetchSectionsByBodyPartId,
} from "../../../redux/features/patient/patientApiSlice";
import { useParams } from "react-router-dom";

// Import section components
import FootAndAnkelImages from "./FootAndAnkleParts/FootAndAnkelImages";
import MOXFQ from "./FootAndAnkleParts/MOXFQ";
import EQ5D from "./FootAndAnkleParts/EQ5D";
import PCS from "./FootAndAnkleParts/PCS";
import SF36 from "./FootAndAnkleParts/SF36";
import Diagnostica from "./Diagnostica/Diagnostica";
import PatientInfo from "./PatientInfo";

const sectionComponents = {
  Images: FootAndAnkelImages,
  MOXFQ,
  "EQ - 5D": EQ5D,
  PCS,
  "SF - 36": SF36,
  Diagnostica,
};

const ViewPatient = () => {
  const dispatch = useDispatch();
  const { id: patientId } = useParams();
  const { appointmentUserData, sectionData } = useSelector(
    (state) => state.patients
  );

  const [formReady, setFormReady] = useState(false);
  const [activeAppointmentId, setActiveAppointmentId] = useState(null);
  const [activeSection, setActiveSection] = useState("Patient Details");

  const appointmentIds = useMemo(
    () => appointmentUserData?.map((item) => item.appointmentId) || [],
    [appointmentUserData]
  );

  const sectionList = useMemo(
    () => [
      "Patient Details",
      ...sectionData.map((s) => s.sectionCode),
      "Diagnostica",
    ],
    [sectionData]
  );

  // Fetch appointments on load
  useEffect(() => {
    if (patientId) {
      dispatch(fetchAppointmentByPatientId(patientId)).then(() =>
        setFormReady(true)
      );
    }
  }, [dispatch, patientId]);

  // Set default appointment
  useEffect(() => {
    if (appointmentIds.length && !activeAppointmentId) {
      setActiveAppointmentId(appointmentIds[0]);
    }
  }, [appointmentIds, activeAppointmentId]);

  // Fetch section data for selected appointment
  useEffect(() => {
    if (activeAppointmentId && appointmentUserData?.length) {
      const selected = appointmentUserData.find(
        (item) => item.appointmentId === activeAppointmentId
      );

      console.log("selected?.bodyPartId", selected?.bodyPartId);

      if (selected?.bodyPartId) {
        dispatch(fetchSectionsByBodyPartId(selected.bodyPartId));
      }
    }
  }, [activeAppointmentId, appointmentUserData, dispatch]);

  // Fetch section data for selected appointment and there sub section
  useEffect(() => {
    if (
      activeAppointmentId &&
      activeSection &&
      activeSection !== "Patient Details" &&
      activeSection !== "Diagnostica" &&
      appointmentUserData?.length &&
      sectionData?.length
    ) {
      const selectedAppointment = appointmentUserData.find(
        (item) => item.appointmentId === activeAppointmentId
      );

      const selectedSection = sectionData.find(
        (section) => section.sectionCode === activeSection
      );

      if (selectedAppointment && selectedSection) {
        dispatch(
          fetchAttemptedSectionPrompts({
            appointmentRefId: selectedAppointment._id,
            sectionId: selectedSection._id,
          })
        );
      }
    }
  }, [
    activeAppointmentId,
    activeSection,
    appointmentUserData,
    sectionData,
    dispatch,
  ]);

  const renderSection = () => {
    if (activeSection === "Patient Details") {
      return <PatientInfo />;
    }

    const SectionComponent = sectionComponents[activeSection];
    return SectionComponent ? (
      <SectionComponent />
    ) : (
      <div>No Component Found</div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        View Patient Info
      </h1>

      {/* Appointment buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {appointmentIds.map((id) => (
          <button
            key={id}
            onClick={() => setActiveAppointmentId(id)}
            className={`px-4 py-2 text-sm sm:text-base rounded border transition-colors ${
              activeAppointmentId === id
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "text-gray-800 bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Section navigation */}
      <div className="flex flex-wrap gap-3 mb-6">
        {sectionList.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 text-sm sm:text-base rounded border transition-colors ${
              activeSection === section
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "text-gray-800 bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      {renderSection()}
    </div>
  );
};

export default ViewPatient;
