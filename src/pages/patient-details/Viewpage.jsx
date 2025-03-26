import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Patient_Details from "./Patient_Details";
import PCS from "./PCS";
import MOXFQ from "./MOXFQ";
import SF_36 from "./SF_36";
import Images from "./image";
import Diagnostica from "./Diagnostica";
import EQ5D from "./health";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "../../components/ui/Tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { API } from "../../host";
import { jwtDecode } from "jwt-decode";

const Viewpage = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const email1 = new URLSearchParams(location.search).get("email");
  const decodedToken = token ? jwtDecode(token) : null;
  const doctor = decodedToken.email;
  const [activeComponent, setActiveComponent] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const buttons = [
    {
      title: "Patient Details",
    },
    {
      title: "Images",
    },
    {
      title: "MOXFQ",
    },
    {
      title: "EQ5D",
    },
    {
      title: "PCS",
    },
    {
      title: "SF_36",
    },
    {
      title: "Diagnostica",
    },
  ];

  const handleButtonClick = (title) => {
    setActiveComponent(title);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/getpatients`);
      if (response.status === 200) {
        const reversedData = response.data.reverse();
        //console.log(reversedData);
        const usersWithRowIndex = reversedData.map((user, index) => ({
          ...user,
          rowIndex: index + 1,
        }));
        setData(usersWithRowIndex);
        setAllData(usersWithRowIndex);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Set the active component from the location state or default to "Patient Details"
  useEffect(() => {
    if (location.state && location.state.activeComponent) {
      setActiveComponent(location.state.activeComponent);
    }
  }, [location.state]);

  // Find the index of the active tab based on `activeComponent`
  const activeIndex = buttons.findIndex(
    (button) => button.title === activeComponent
  );
  return (
    <div>
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h4 className="font-medium lg:text-2xl text-xl active capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          {/* {title} */} Patient Details
        </h4>
        <Tooltip content="Update" placement="top" arrow animation="shift-away">
          <Link
            to={`/step1?email=${email1}&doctor=${doctor}`}
            className="action-btn ml-4"
          >
            <Icon icon="heroicons:pencil-square" className="w-6 h-6" />{" "}
          </Link>
        </Tooltip>
      </div>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="xl:col-span-12 lg:col-span-12 md:col-span-9 col-span-12">
          <div className=" bg-transparent">
            <Tab.Group
              selectedIndex={activeIndex}
              onChange={(index) => setActiveComponent(buttons[index].title)}
            >
              <Tab.List className="lg:space-x-6 md:space-x-6 space-x-0 rtl:space-x-reverse">
                {buttons.map((item, i) => (
                  <Tab as={Fragment} key={i}>
                    {({ selected }) => (
                      <button
                        className={`text-sm font-medium mb-7 last:mb-0 capitalize ring-0 focus:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
                ${
                  activeComponent !== null && selected
                    ? "text-white bg-primary-600"
                    : "text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300"
                }
            `}
                        onClick={() => handleButtonClick(item.title)}
                      >
                        {item.title}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
      </div>
      {activeComponent === "PCS" && <PCS />}
      {activeComponent === "MOXFQ" && <MOXFQ />}
      {activeComponent === "SF_36" && <SF_36 />}
      {activeComponent === "Patient Details" && <Patient_Details />}
      {activeComponent === "Images" && <Images />}
      {activeComponent === "Diagnostica" && <Diagnostica token={token} />}
      {activeComponent === "EQ5D" && <EQ5D />}
    </div>
  );
};

export default Viewpage;
