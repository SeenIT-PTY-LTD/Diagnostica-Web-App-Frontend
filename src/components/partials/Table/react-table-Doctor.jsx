import React from "react";
import DoctorTable from "./DoctorTable";

const DoctorDetails = ({Current_user}) => {
  return (
    <div >
      <DoctorTable Current_user={Current_user}/>
    </div>
  );
};

export default DoctorDetails;
