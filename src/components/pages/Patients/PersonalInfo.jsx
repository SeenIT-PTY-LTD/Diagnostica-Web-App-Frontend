import React, { useState } from "react";

const PersonalInfo = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDoctorOpen, setIsDoctorOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-200">
      {" "}
      <div className="border rounded-md shadow w-full overflow-hidden">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className="font-semibold text-lg">About us</span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAboutOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white">
            <div className="grid grid-cols-12 gap-2 items-center w-full">
              {" "}
              {/* Changed to 12 columns */}
              <label className="col-span-4 font-medium">
                {" "}
                {/* Adjusted column span */}
                How did you hear about us ?
              </label>
              <span className="col-span-1">:</span>
              <span className="col-span-7 text-gray-600"></span>{" "}
              {/* Adjusted column span */}
            </div>
          </div>
        </div>
      </div>
      {/* Doctor Details */}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        {" "}
        {/* Added margin-top */}
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
          <div className="p-4 border-t bg-white space-y-6">
            {[
              {
                title: "Referred Doctor's",
                fields: [
                  "Referring doctor's name",
                  "Referring doctor's clinic/address",
                ],
              },
              {
                title: "General Doctor's",
                fields: ["Regular GP's name", "Regular GP's clinic/address"],
              },
              {
                title: "Physiotherapist's",
                fields: [
                  "Physiotherapist's name",
                  "Physiotherapist's clinic/address",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold">{section.title}</h3>
                {section.fields.map((field, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-2 items-center w-full"
                  >
                    <label className="col-span-4">{field}</label>{" "}
                    {/* Adjusted column span */}
                    <span className="col-span-1">:</span>
                    <span className="col-span-7 text-gray-600"></span>{" "}
                    {/* Adjusted column span */}
                  </div>
                ))}
                <div className="grid grid-cols-12 gap-2 items-center w-full">
                  {" "}
                  {/* Changed to 12 columns */}
                  <label className="col-span-4">Phone</label>{" "}
                  {/* Adjusted column span */}
                  <span className="col-span-1">:</span>
                  <span className="col-span-7 text-gray-600"></span>{" "}
                  {/* Adjusted column span */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*Insurance & Compensation Details*/}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className="font-semibold text-lg">
            Insurance & Compensation Details
          </span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAboutOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white">
            <div className="grid grid-cols-12 gap-2 items-center w-full">
              {" "}
              {/* Changed to 12 columns */}
              <label className="col-span-4 font-medium">
                {" "}
                {/* Adjusted column span */}
                How did you hear about us ?
              </label>
              <span className="col-span-1">:</span>
              <span className="col-span-7 text-gray-600"></span>{" "}
              {/* Adjusted column span */}
            </div>
          </div>
        </div>
      </div>
      {/*Medications & Allergies*/}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className="font-semibold text-lg">Medications & Allergies</span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAboutOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white">
            <div className="grid grid-cols-12 gap-2 items-center w-full">
              {" "}
              {/* Changed to 12 columns */}
              <label className="col-span-4 font-medium">
                {" "}
                {/* Adjusted column span */}
                How did you hear about us ?
              </label>
              <span className="col-span-1">:</span>
              <span className="col-span-7 text-gray-600"></span>{" "}
              {/* Adjusted column span */}
            </div>
          </div>
        </div>
      </div>
      {/*MRI Saftey Questions*/}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className="font-semibold text-lg">MRI Saftey Questions</span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAboutOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white">
            <div className="grid grid-cols-12 gap-2 items-center w-full">
              {" "}
              {/* Changed to 12 columns */}
              <label className="col-span-4 font-medium">
                {" "}
                {/* Adjusted column span */}
                How did you hear about us ?
              </label>
              <span className="col-span-1">:</span>
              <span className="col-span-7 text-gray-600"></span>{" "}
              {/* Adjusted column span */}
            </div>
          </div>
        </div>
      </div>
      {/*Surgical History*/}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className="font-semibold text-lg">Surgical History</span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAboutOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white">
            <div className="grid grid-cols-12 gap-2 items-center w-full">
              {" "}
              {/* Changed to 12 columns */}
              <label className="col-span-4 font-medium">
                {" "}
                {/* Adjusted column span */}
                How did you hear about us ?
              </label>
              <span className="col-span-1">:</span>
              <span className="col-span-7 text-gray-600"></span>{" "}
              {/* Adjusted column span */}
            </div>
          </div>
        </div>
      </div>
      {/*Medical History*/}
      <div className="border rounded-md shadow w-full overflow-hidden mt-4">
        <div
          className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className="font-semibold text-lg">Medical History</span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAboutOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t bg-white">
            <div className="grid grid-cols-12 gap-2 items-center w-full">
              {" "}
              {/* Changed to 12 columns */}
              <label className="col-span-4 font-medium">
                {" "}
                {/* Adjusted column span */}
                How did you hear about us ?
              </label>
              <span className="col-span-1">:</span>
              <span className="col-span-7 text-gray-600"></span>{" "}
              {/* Adjusted column span */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
