import React from "react";
import Card from "../../components/ui/Card";
import HomeBred from "./HomeBred";
import PatientDetails from "../../components/partials/Table/react-table-Patient";

const Patient = ({Current_user}) => {
  return (
    <div>
      <HomeBred title="Patient" />
      <div className="lg:col-span-12 col-span-12">
        <Card title="Recent Patients">
          <PatientDetails Current_user ={Current_user}/>
        </Card>
      </div>
    </div>
  );
};

export default Patient;
