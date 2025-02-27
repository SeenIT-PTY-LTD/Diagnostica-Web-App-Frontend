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
        <div className="grid gap-1 grid-cols-12">
          <div className="xl:col-span-3 lg:col-span-4 col-span-12 card-auto-height">
            <Card>
              <div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Name{" "}
                  </p>
                  <p>: {Data.fname}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    DOB{" "}
                  </p>
                  <p>: {Data.dob}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Gender{" "}
                  </p>
                  <p>: {Data.gender}</p>
                </div>
               
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Phone{" "}
                  </p>
                  <p>: {Data.phone}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Address{" "}
                  </p>
                  <p>: {Data.address}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    State{" "}
                  </p>
                  <p>: {Data.state}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Postcode{" "}
                  </p>
                  <p>: {Data.postcode}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Height{" "}
                  </p>
                  <p>: {Data.height}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Weight{" "}
                  </p>
                  <p>: {Data.weight}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    BMI
                  </p>
                  <p>: {Data.bmi}</p>
                </div> <div style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "left",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Email{" "}
                  </p>
                  <p style={{ fontSize: "15px" }}>: {Data.email}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="xl:col-span-9 lg:col-span-8 col-span-12">
            <Tab.Panels>
              <Tab.Panel>
                <Row className="mb-1" data={RowData} />
                <Row1 className="mb-1" data={RowData} />
                <Row2 className="mb-1" data={RowData} />
                {/* <Row3 className="mb-1" data={RowData} /> */}
                {/* <Row8 className="mb-1" data={RowData} /> */}
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
