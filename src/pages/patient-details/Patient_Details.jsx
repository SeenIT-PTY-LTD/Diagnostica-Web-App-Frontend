import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Row from "../../components/ui/Row";
import Row1 from "../../components/ui/Row1";
import Row2 from "../../components/ui/Row2";
import Row3 from "../../components/ui/Row3";
import Row4 from "../../components/ui/Row4";
import Row5 from "../../components/ui/Row5";
import Row6 from "../../components/ui/Row6";
import Row7 from "../../components/ui/Row7";
import Row8 from "../../components/ui/row8";
import { API } from "../../host";

const Patient_Details = () => {
  const [Data, setData] = useState([]);
  const [RowData, setRowData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  useEffect(() => {
    if (email) {
      axios
        .get(`${API}/getpatient?email=${email}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching answers:", error);
        });

      axios
        .get(`${API}/getmeddata?email=${email}`)
        .then((response) => {
          // console.log(response.data)
          setRowData([response.data]);
        })
        .catch((error) => {
          console.error("Error fetching Row data:", error);
        });
    }
  }, [email]);

  return (
    <div>
      <Tab.Group>
        <div className="grid gap-4 grid-cols-12">
  {/* Increase user details width */}
<div className="xl:col-span-4 lg:col-span-5 md:col-span-6 col-span-12 card-auto-height">
  <Card>
    <div className="space-y-2">
      {[
        ["Name", Data?.fname],
        ["DOB", Data?.dob],
        ["Gender", Data?.gender],
        ["Phone", Data?.phone],
        ["Address", Data?.address],
        ["State", Data?.state],
        ["Postcode", Data?.postcode],
        ["Patient URN", ""],
        ["Medicare Number", ""],
        ["Height", Data?.height],
        ["Weight", Data?.weight],
        ["BMI", Data?.bmi],
        ["Email", Data?.email],
      ].map(([label, value], index) => (
        <div key={index} className="flex items-start">
          <p className="w-36 min-w-[9rem] text-left font-bold">{label}</p>
          <p className="flex-1 break-words">: {value || "-"}</p>
        </div>
      ))}
    </div>
  </Card>
</div>


  {/* Rest of the panel */}
  <div className="xl:col-span-8 lg:col-span-7 md:col-span-6 col-span-12">
    <Tab.Panels>
      <Tab.Panel>
        <Row className="mb-1" data={RowData} />
        <Row1 className="mb-1" data={RowData} />
        <Row2 className="mb-1" data={RowData} />
        <Row4 className="mb-1" data={RowData} />
        <Row5 className="mb-1" data={RowData} />
        <Row6 className="mb-1" data={RowData} />
        <Row7 data={RowData} />
      </Tab.Panel>
    </Tab.Panels>
  </div>
</div>

      </Tab.Group>
    </div>
  );
};

export default Patient_Details;
