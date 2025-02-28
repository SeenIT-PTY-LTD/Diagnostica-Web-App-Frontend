import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Textinput from '../../components/ui/Textinput';
import Card from '../../components/ui/Card';
import { useLocation } from 'react-router-dom';
import Select from "react-select";
import Radio from '../../components/ui/Radio';


function Page1() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAcquired, setShowAcquired] = useState(false);
  const [showCongenital, setShowCongenital] = useState(false);
  
  const [value, setValue] = useState("");

  const defaultValue = new URLSearchParams(location.search).get('defaultValue');
  const [originalDefaultValue, setOriginalDefaultValue] = useState(defaultValue);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const email = new URLSearchParams(location.search).get('email');
  const doctor =new URLSearchParams(location.search).get('doctor');

  const [disease1, setDisease] = useState(null);
  const [congential1, setcongential] = useState(null);


  const disease = [

    { value: ": Acq : T :", label: "Traumatic (T)" },
    { value: ": Acq : I :", label: "Infective (I)" },
    { value: ": Acq : M/E :", label: "Metabolic/Endocrine (M/E)" },
    { value: ": Acq : F :", label: "Inflammatory (F)" },
    { value: ": Acq : D :", label: "Degenerative (D)" },
    { value: ": Acq : G :", label: "Iatrogenic (G)" },
    { value: ": Acq : P :", label: "Idiopathic (P)" },

  ];

  const congential = [
    { value: ": Con : C :", label: "Chronic(c)" },
  ]
  const A_c = [
    { value: "A :", label: "Acute(A)" },
    { value: "C :", label: "Chronic (C)" },
  ]

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  useEffect(() => {
    setOriginalDefaultValue(defaultValue);
  }, [defaultValue]);



  const handlediseaseChange = (selectedOption) => {
    setDisease(selectedOption);
    const newDefaultValue = selectedOption ? selectedOption.value : "";
    document.getElementById('defaultsize2').value = `${defaultValue}   ${newDefaultValue}  `;
  };
  const handleDisease = (selectedOption) => {
    setcongential(selectedOption);
    const newDefaultValue = selectedOption ? selectedOption.value : "";
    const img1Value = disease1 ? disease1.value : "";

    // Check if dropmenu 1 is selected
    if (disease1) {
      document.getElementById('defaultsize2').value = `${defaultValue}   ${img1Value}  ${newDefaultValue}`;
    } else {
      document.getElementById('defaultsize2').value = `${defaultValue}  ${newDefaultValue} `; // Without dropmenu 1
    }
  };

  const handleDiseaseChange = (selectedOption) => {
    setSelectedDisease(selectedOption);
    const newDefaultValue = selectedOption ? selectedOption.value : "";
    document.getElementById('defaultsize2').value = defaultValue + newDefaultValue;
  };

  const handleNext = () => {
    let combinedDefaultValue = defaultValue || ''; 
  
    if (showAcquired) {
      const acquiredValue = disease1 ? disease1.value : '';
      const acuteValue = congential1 ? congential1.value : '';
      combinedDefaultValue = `${combinedDefaultValue} ${acquiredValue} ${acuteValue}`;
    } else if (showCongenital) {
      const congenitalValue = selectedDisease ? selectedDisease.value : '';
      combinedDefaultValue = `${combinedDefaultValue} ${congenitalValue}`;
    }
  
    navigate(`/step3?defaultValue=${combinedDefaultValue}&email=${email}&doctor=${doctor}`);
  };
  

  const handleCancel = () => {
    window.location.reload();
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "L") {
      setShowAcquired(true);
      setShowCongenital(false);
    } else if (selectedValue === "R") {
      setShowAcquired(false);
      setShowCongenital(true);
    }
    setValue(selectedValue);
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
            defaultValue={defaultValue}
          />
        </div>

        <div className="space-y-10 px-8 py-8">
          <p><b>STEP 2:</b> We assign a designator for aetiology.</p>

          <div className="flex flex-wrap space-xy-5 justify-around items-center space-y-8 px-8 py-8">
            <Radio
              label="Acquired"
              name="x"
              value="L"
              checked={value === "L"}
              onChange={handleChange}
            />
            <Radio
              label="Congenital"
              name="x"
              value="R"
              checked={value === "R"}
              onChange={handleChange}
            />
          </div>
          {showAcquired && (
            <Select
              className="react-select"
              classNamePrefix="select"
              placeholder="Acquired"
              options={disease}
              isClearable
              onChange={handlediseaseChange}
              styles={styles}
              id="acquiredDropdown"
            />
          )}
          {showAcquired && (
            <Select
              className="react-select"
              classNamePrefix="select"
              placeholder="Acute"
              options={A_c}
              isClearable
              onChange={handleDisease}
              styles={styles}
              id="acquiredAcuteDropdown"
            />
          )}
          {showCongenital && (
            <Select
              className="react-select"
              classNamePrefix="select"
              placeholder="Congenital"
              options={congential}
              isClearable
              onChange={handleDiseaseChange}
              styles={styles}
              id="congenitalDropdown"
            />
          )}


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
        </div>

      </Card >
    </div >

  );
}

export default Page1