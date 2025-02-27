import React from "react";
import PatientTable from "./PatientTable";

const PatientDetails = ({Current_user}) => {
  return (
    <div className=" space-y-5">
      <PatientTable Current_user ={Current_user}/>
    </div>
  );
};

export default PatientDetails;
