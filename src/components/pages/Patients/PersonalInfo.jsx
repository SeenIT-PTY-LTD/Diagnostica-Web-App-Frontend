import React, { useState } from "react";
import { useSelector } from "react-redux";

const PersonalInfo = () => {
  const { selectedPatient } = useSelector((state) => state.patients);

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDoctorOpen, setIsDoctorOpen] = useState(false);
  const [isInsurenceDetailsOpen, setIsInsurenceDetailsOpen] = useState(false);
  const [isMedicationsOpen, setIsMedicationsOpen] = useState(false);
  const [isMRIQuestionsOpen, setIsMRIQuestionsOpen] = useState(false);
  const [isSurgicalHistoryOpen, setIsSurgicalHistoryOpen] = useState(false);
  const [isMedicalHistoryOpen, setIsMedicalHistoryOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-200">
      {" "}
      {/* About Us */}
      <div className="border rounded-md shadow w-full overflow-hidden">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className="font-semibold text-lg">About Us</span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>

        <div
          className={`transition-all duration-300 ${
            isAboutOpen ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white space-y-4">
            {Array.isArray(selectedPatient) &&
              selectedPatient.map((patient, idx) => {
                // key-value mapping for labels
                const aboutFields = {
                  firstName: "First Name",
                  lastName: "Last Name",
                  dob: "Date of Birth",
                  gender: "Gender",
                  phone: "Phone",
                  address: "Address",
                  state: "State",
                  postcode: "Postcode",
                };

                return (
                  <div
                    key={idx}
                    className="space-y-4 border-b pb-4 last:border-0"
                  >
                    {Object.entries(aboutFields).map(([key, label]) => (
                      <div
                        key={key}
                        className="grid grid-cols-12 gap-2 items-center w-full"
                      >
                        <label className="col-span-4 font-medium">
                          {label}
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {patient[key] || "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Doctor Details */}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsDoctorOpen(!isDoctorOpen)}
        >
          <span className="font-semibold text-lg">Doctor Details</span>
          <span>{isDoctorOpen ? "▲" : "▼"}</span>
        </div>

        <div
          className={`transition-all duration-300 ${
            isDoctorOpen ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white space-y-8">
            {Array.isArray(selectedPatient) &&
              selectedPatient.map((patient, idx) => {
                const doctorDetails = patient.doctorDetails || {};
                return (
                  <div
                    key={doctorDetails._id || idx}
                    className="space-y-6 border-b pb-4"
                  >
                    {/* Referred Doctor */}
                    <div className="space-y-2">
                      <h3 className="font-bold">Referred Doctor's</h3>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">
                          Referring doctor's name
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.doctorType?.generalPhysician || "-"}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">
                          Referring doctor's clinic/address
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.doctorAddress || "-"}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">Phone</label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.referDoctorNumber || "-"}
                        </span>
                      </div>
                    </div>

                    {/* General Doctor */}
                    <div className="space-y-2">
                      <h3 className="font-bold">General Doctor's</h3>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">Regular GP's name</label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.generalDoctorName || "-"}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">
                          Regular GP's clinic/address
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.generalDoctorAddress || "-"}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">Phone</label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.generaldoctorNumber || "-"}
                        </span>
                      </div>
                    </div>

                    {/* Physiotherapist */}
                    <div className="space-y-2">
                      <h3 className="font-bold">Physiotherapist's</h3>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">
                          Physiotherapist's name
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.physiotherapistName || "-"}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">
                          Physiotherapist's clinic/address
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.physiotherapistAddress || "-"}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 items-center w-full">
                        <label className="col-span-4">Phone</label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {doctorDetails.physiotherapistNumber || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/*Insurance & Compensation Details*/}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsInsurenceDetailsOpen(!isInsurenceDetailsOpen)}
        >
          <span className="font-semibold text-lg">
            Insurance & Compensation Details
          </span>
          <span>{isInsurenceDetailsOpen ? "▲" : "▼"}</span>
        </div>

        <div
          className={`transition-all duration-300 ${
            isInsurenceDetailsOpen ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white space-y-6">
            {Array.isArray(selectedPatient) &&
              selectedPatient.map((patient, idx) => {
                const worker = patient.workerCompensation || {};
                const insurance = patient.insuranceDetails || {};

                return (
                  <div
                    key={idx}
                    className="space-y-6 border-b pb-6 last:border-0"
                  >
                    {/* Worker Compensation Section */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Worker Compensation</h3>

                      {[
                        { label: "Claim Number", value: worker.claimNumber },
                        { label: "Date of Injury", value: worker.dateOfInjury },
                        { label: "Company Name", value: worker.companyName },
                        {
                          label: "Permanent Address",
                          value: worker.permanentAddress,
                        },
                        {
                          label: "Contact Person Name at Workplace",
                          value: worker.contactPersonNameAtWorkplace,
                        },
                        {
                          label: "Contact Person First Name",
                          value: worker.contactPersonFirstName,
                        },
                        {
                          label: "Contact Person Last Name",
                          value: worker.contactPersonLastName,
                        },
                        {
                          label: "Contact Person Number",
                          value: worker.contactPersonNumber,
                        },
                      ].map((field, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-12 gap-2 items-center w-full"
                        >
                          <label className="col-span-4 font-medium">
                            {field.label}
                          </label>
                          <span className="col-span-1">:</span>
                          <span className="col-span-7 text-gray-600">
                            {field.value || "-"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Insurance Details Section */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Insurance Details</h3>

                      {[
                        {
                          label: "Insurance Company Name",
                          value: insurance.insuranceCompanyName,
                        },
                        {
                          label: "Insurance Company Address",
                          value: insurance.insuranceCompanyAddress,
                        },
                        {
                          label: "Manager First Name",
                          value: insurance.managerFirstName,
                        },
                        {
                          label: "Manager Last Name",
                          value: insurance.managerLastName,
                        },
                        {
                          label: "Manager Phone",
                          value: insurance.managerPhone,
                        },
                        {
                          label: "Manager Email",
                          value: insurance.managerEmail,
                        },
                      ].map((field, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-12 gap-2 items-center w-full"
                        >
                          <label className="col-span-4 font-medium">
                            {field.label}
                          </label>
                          <span className="col-span-1">:</span>
                          <span className="col-span-7 text-gray-600">
                            {field.value || "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Medications & Allergies */}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsMedicationsOpen(!isMedicationsOpen)}
        >
          <span className="font-semibold text-lg">Medications & Allergies</span>
          <span>{isMedicationsOpen ? "▲" : "▼"}</span>
        </div>

        <div
          className={`transition-all duration-300 ${
            isMedicationsOpen ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white space-y-4">
            {Array.isArray(selectedPatient) &&
              selectedPatient.map((patient, idx) => (
                <div
                  key={idx}
                  className="space-y-4 border-b pb-4 last:border-0"
                >
                  {Array.isArray(patient.medicationsFaqs) &&
                    patient.medicationsFaqs.map((faq, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center w-full"
                      >
                        <label className="col-span-4 font-medium">
                          {faq.question}
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {faq.answer || "-"}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* MRI Safety Questions */}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsMRIQuestionsOpen(!isMRIQuestionsOpen)}
        >
          <span className="font-semibold text-lg">MRI Safety Questions</span>
          <span>{isMRIQuestionsOpen ? "▲" : "▼"}</span>
        </div>

        <div
          className={`transition-all duration-300 ${
            isMRIQuestionsOpen ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white space-y-4">
            {Array.isArray(selectedPatient) &&
              selectedPatient.map((patient, idx) => (
                <div
                  key={idx}
                  className="space-y-4 border-b pb-4 last:border-0"
                >
                  {Array.isArray(patient.mriSafetyFaqs) &&
                    patient.mriSafetyFaqs.map((faq, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center w-full"
                      >
                        <label className="col-span-4 font-medium">
                          {faq.question}
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {faq.answer || "-"}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Surgical History */}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsSurgicalHistoryOpen(!isSurgicalHistoryOpen)}
        >
          <span className="font-semibold text-lg">Surgical History</span>
          <span>{isSurgicalHistoryOpen ? "▲" : "▼"}</span>
        </div>

        <div
          className={`transition-all duration-300 ${
            isSurgicalHistoryOpen ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white space-y-4">
            {Array.isArray(selectedPatient) &&
              selectedPatient.map((patient, idx) => (
                <div
                  key={idx}
                  className="space-y-4 border-b pb-4 last:border-0"
                >
                  {Array.isArray(patient.surgicalFaqs) &&
                    patient.surgicalFaqs.map((faq, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center w-full"
                      >
                        <label className="col-span-4 font-medium">
                          {faq.question}
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {faq.answer || "-"}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Medical History */}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsMedicalHistoryOpen(!isMedicalHistoryOpen)}
        >
          <span className="font-semibold text-lg">Medical History</span>
          <span>{isMedicalHistoryOpen ? "▲" : "▼"}</span>
        </div>

        <div
          className={`transition-all duration-300 ${
            isMedicalHistoryOpen ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white space-y-4">
            {Array.isArray(selectedPatient) &&
              selectedPatient.map((patient, idx) => (
                <div
                  key={idx}
                  className="space-y-4 border-b pb-4 last:border-0"
                >
                  {Array.isArray(patient.medicalFaqs) &&
                    patient.medicalFaqs.map((faq, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center w-full"
                      >
                        <label className="col-span-4 font-medium">
                          {faq.question}
                        </label>
                        <span className="col-span-1">:</span>
                        <span className="col-span-7 text-gray-600">
                          {faq.answer || "-"}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
