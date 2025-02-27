import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { API } from "../../../../host";

const GroupChart1 = () => {

  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const fetchData = async () => {
    try {
      const doctorsResponse = await axios.get(`${API}/getdoctor1`);
      if (doctorsResponse.status === 200) {
        setDoctorCount(doctorsResponse.data.length);
      }

      const patientsResponse = await axios.get(`${API}/getpatients`);
      if (patientsResponse.status === 200) {
        setPatientCount(patientsResponse.data.length);
       
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={`py-[18px] px-4 rounded-[6px] bg-[#B4C2FD] dark:bg-slate-900 `}>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex-1">
            <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
              Total Doctors
            </div>
            <div className="text-slate-900 dark:text-white text-lg font-medium">
              {doctorCount}
            </div>
          </div>
        </div>
      </div>
      <div className={`py-[18px] px-4 rounded-[6px] bg-[#D1DAFE] dark:bg-slate-900 `}>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex-1">
            <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
              Total Patients
            </div>
            <div className="text-slate-900 dark:text-white text-lg font-medium">
              {patientCount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChart1;