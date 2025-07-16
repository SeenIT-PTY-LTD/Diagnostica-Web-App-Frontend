// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchSinglePatient } from "../../../Redux/features/patient/patientApiSlice";
// import { useParams } from "react-router-dom";

// const ViewPatient = () => {
//   const dispatch = useDispatch();
//   const { id: patientId } = useParams();
//   const [formReady, setFormReady] = useState(false);

//   useEffect(() => {
//     if (patientId) {
//       dispatch(fetchSinglePatient(patientId)).then(() => setFormReady(true));
//     }
//   }, [dispatch, patientId]);

//   if (!formReady) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center py-10 text-lg">Loading patient data...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">
//         View Patient Info
//       </h1>

//       {/* Top buttons */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-6">
//         <button className="px-5 py-2 bg-blue-600 text-white text-base rounded border border-blue-600 hover:bg-blue-700 transition-colors">
//           Patient Details
//         </button>
//         <div className="flex flex-wrap gap-2">
//           {["Images", "MOFXQ", "EQ5D", "PCS", "SF_36", "Diagnosica"].map(
//             (item) => (
//               <button
//                 key={item}
//                 className="px-5 py-2 text-base text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-all"
//               >
//                 {item}
//               </button>
//             )
//           )}
//         </div>
//       </div>

//       {/* Info box */}
//       <div className="max-w-xl w-full p-4 bg-white rounded-lg border border-gray-200">
//         <div className="grid grid-cols-1 gap-5">
//           {[
//             "Name",
//             "DOB",
//             "Gender",
//             "Phone",
//             "Medicare Number",
//             "Address",
//             "State",
//             "Height",
//             "About Us",
//             "Doctor Details",
//             "URN",
//             "Email",
//             "Country",
//             "Postcode",
//             "Weight",
//             "BMI",
//           ].map((label) => (
//             <div key={label}>
//               <div className="flex justify-between items-center text-base py-2">
//                 <span className="font-semibold text-gray-800 w-1/3">
//                   {label}
//                 </span>
//                 <span className="text-gray-700 w-2/3 text-center">-</span>
//               </div>
//               <div className="border-b border-gray-200"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewPatient;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSinglePatient } from "../../../redux/features/patient/patientApiSlice";
import { useParams } from "react-router-dom";

// Import section components
import Images from "../Patients/BodyParts/Images";
// import MOFXQ from "./components/patientSections/MOFXQ";
// import EQ5D from "./components/patientSections/EQ5D";
// import PCS from "./components/patientSections/PCS";
// import SF_36 from "./components/patientSections/SF_36";
// import Diagnosica from "./components/patientSections/Diagnosica";

const sectionComponents = {
  Images,
//   MOFXQ,
//   EQ5D,
//   PCS,
//   SF_36,
//   Diagnosica,
};

const ViewPatient = () => {
  const dispatch = useDispatch();
  const { id: patientId } = useParams();
  const [formReady, setFormReady] = useState(false);
  const [activeSection, setActiveSection] = useState("Patient Details");

  useEffect(() => {
    if (patientId) {
      dispatch(fetchSinglePatient(patientId)).then(() => setFormReady(true));
    }
  }, [dispatch, patientId]);

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
    "SF_36",
    "Diagnosica",
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">View Patient Info</h1>

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
