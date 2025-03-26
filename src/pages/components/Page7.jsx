import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Textinput from "../../components/ui/Textinput";
import Card from "../../components/ui/Card";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../host";

function Page7() {
  const location = useLocation();
  const defaultValue = new URLSearchParams(location.search).get("defaultValue");
  const navigate = useNavigate();
  const [Patient, setPatient] = useState(null);
  const [NewDefaultValue, setNewDefaultValue] = useState("");
  //const [email, setEmail] = useState('')
  const email = new URLSearchParams(location.search).get("email");
  const doctor = new URLSearchParams(location.search).get("doctor");

  const patient = [
    { value: "ASA1", label: "ASA 1 – Normal healthy patient" },
    { value: "ASA2", label: "ASA 2 – Patient with mild systemic disease" },
    { value: "ASA3", label: "ASA 3 – Patient with severe systemic disease" },
    {
      value: "ASA4",
      label:
        "ASA 4 – Patient with severe systemic disease that is a constant threat to life",
    },
    {
      value: "ASA5",
      label:
        "ASA 5 – Moribund patient who is not expected to survive without the operation",
    },
  ];

  const handlePatientChange = (selectedOption) => {
    setPatient(selectedOption);
    const newDefaultValue = selectedOption ? selectedOption.value : "";
    document.getElementById("defaultsize2").value =
      defaultValue + newDefaultValue;
    setNewDefaultValue(newDefaultValue);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    const Newvalue = `${defaultValue} ${NewDefaultValue}`;

    const updatedURL = `/step9?defaultValue=${Newvalue} &email=${email}&doctor=${doctor}`;

    navigate(updatedURL);
  };

  const buttons = [
    {
      title: "Cancel",
      onClick: handleCancel,
    },
    {
      title: "Back",
      onClick: handleBack,
    },

    {
      title: "Next",
      onClick: handleNext,
    },
  ];

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  return (
    <div>
      <div className="flex justify-between flex-wrap items-center mb-10">
        <h4 className="font-medium lg:text-2xl text-xl active capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Diagnostica Code :
        </h4>
      </div>
      <Card>
        <div className="space-y-8 px-8 py-8">
          <Textinput
            label="CODE :"
            id="defaultsize2"
            type="text"
            placeholder="DIAGNOSTICA CODE"
            horizontal
            defaultValue={`${defaultValue} ${NewDefaultValue}`}
          />
        </div>

        <div className="space-y-10 px-8 py-8">
          <p>
            <b>STEP 7:</b> If the Patient has surgery, then American Society of
            Anaesthesiologists (ASA) Classifications can be added.
          </p>
          <Select
            className="react-select"
            classNamePrefix="select"
            onChange={handlePatientChange}
            options={patient}
            isClearable
            styles={styles}
            id="hh"
          />
        </div>

        <div className="flex justify-around">
          {buttons.map((button, index) => (
            <button
              key={index}
              type="button"
              className="btn btn-primary"
              onClick={button.onClick}
            >
              {button.title}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Page7;
