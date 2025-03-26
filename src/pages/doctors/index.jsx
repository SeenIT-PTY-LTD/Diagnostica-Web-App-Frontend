import React from "react";
import Card from "../../components/ui/Card";
import HomeDoctor from "./HomeDoctor";
import DoctorDetails from "../../components/partials/Table/react-table-Doctor";

const Doctor = ({Current_user}) => {

  return (
    <div>
      <HomeDoctor title="Doctors" Current_user={Current_user}/>
      <div className="lg:col-span-12 col-span-12">
        <Card >
          <DoctorDetails Current_user={Current_user}/>
        </Card>
      </div>
    </div>
  );
};

export default Doctor;



