import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Textinput from "../../components/ui/Textinput";
import Card from "../../components/ui/Card";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function Page6() {
  const location = useLocation();
  const defaultValue = new URLSearchParams(location.search).get("defaultValue");
  const email = new URLSearchParams(location.search).get("email");
  const doctor = new URLSearchParams(location.search).get("doctor");
  const navigate = useNavigate();

  const [Img11, setImg11] = useState(null);
  const [Img12, setImg12] = useState(null);
  const [Img13, setImg13] = useState(null);

  const Score_1 = [
    { value: "M", label: "Myocardial infarction (M)" },
    { value: "C", label: "Congestive heart failure (C)" },
    { value: "P", label: "Peripheral vascular disease (P)" },
    { value: "CD", label: "Cerebrovascular disease (CD)" },
    { value: "D", label: "Dementia (D)" },
    { value: "CP", label: "Chronic pulmonary disease (CP)" },
    { value: "R", label: "Rheumatologic disease (R)" },
    { value: "PU", label: "Peptic ulcer disease (PU)" },
    { value: "L", label: "Liver disease (mild) (L)" },
    { value: "DC", label: "Diabetes (controlled) (DC)" },
  ];

  const Score_2 = [
    { value: "H", label: "Hemiplegia (H)" },
    { value: "P", label: "Paraplegia (P)" },
    { value: "R", label: "Renal disease (R)" },
    { value: "M", label: "Malignancy (localized) (M)" },
    { value: "L", label: "Leukemia (L)" },
    { value: "LY", label: "Lymphoma (LY)" },
    { value: "D", label: "Diabetes (uncontrolled) (D)" },
  ];

  const Score_3 = [
    { value: "L3 ", label: "Liver disease (moderate/severe) (L3)" },
    { value: "A6 ", label: "AIDS (A6)" },
    { value: "M6 ", label: "Malignancy (metastatic tumour) (M6)" },
  ];

  // const handleimg1Change = (selectedOption) => {
  //     setImg11(selectedOption);
  //     const newDefaultValue = selectedOption.map((option) => option.value);
  //     if (selectedOption.length === 2) {
  //         document.getElementById('defaultsize2').value = `${defaultValue}  ${newDefaultValue[0]} ${newDefaultValue[1]} `;
  //     } else {
  //         document.getElementById('defaultsize2').value = `${defaultValue}  ${newDefaultValue[0]} `;
  //     }

  // }

  const handleimg1Change = (selectedOption) => {
    setImg11(selectedOption);

    // Ensure selectedOption is not null/undefined
    const newDefaultValue =
      selectedOption && selectedOption.length > 0
        ? selectedOption.map((option) => option.value)
        : [];

    // Get input element
    const inputElement = document.getElementById("defaultsize2");

    // Check if newDefaultValue is empty
    if (newDefaultValue.length === 0) {
      inputElement.value = defaultValue; // Reset to defaultValue when all selections are removed
    } else if (newDefaultValue.length === 2) {
      inputElement.value = `${defaultValue} ${newDefaultValue[0]} ${newDefaultValue[1]}`;
    } else {
      inputElement.value = `${defaultValue} ${newDefaultValue[0]}`;
    }
  };

  // const handleimg2Change = (selectedOption) => {
  //     setImg12(selectedOption);
  //     const img1Value = Img11[0] ? Img11[0].value : "";
  //     const img12Value = Img11[1] ? Img11[1].value : "";
  //     const newDefaultValue = selectedOption.map((option) => option.value);

  //     if (Img11[0] && Img11[1] && selectedOption.length === 2) {
  //         document.getElementById('defaultsize2').value = `${defaultValue} ${img1Value}${img12Value} ${newDefaultValue[0]} ${newDefaultValue[1]} `;
  //     } else if (selectedOption.length === 1) {
  //         document.getElementById('defaultsize2').value = `${defaultValue} ${img1Value}${img12Value} ${newDefaultValue[0]}  `;
  //     } else if (selectedOption.length === 1) {
  //         document.getElementById('defaultsize2').value = `${defaultValue} ${img1Value}${img12Value} ${newDefaultValue[0]}  `;
  //     } else {
  //         document.getElementById('defaultsize2').value = `${defaultValue} ${img1Value} ${newDefaultValue[0]} `;
  //     }

  // }

  const handleimg2Change = (selectedOption) => {
    setImg12(selectedOption);

    // Ensure Img11 is not null or undefined
    const img1Value = Img11 && Img11[0] ? Img11[0].value : "";
    const img12Value = Img11 && Img11[1] ? Img11[1].value : "";

    // Ensure selectedOption is not null or undefined
    const newDefaultValue =
      selectedOption && selectedOption.length > 0
        ? selectedOption.map((option) => option.value)
        : [];

    // Get input element
    const inputElement = document.getElementById("defaultsize2");

    // Construct input value based on selections
    if (Img11.length >= 2 && newDefaultValue.length === 2) {
      inputElement.value = `${defaultValue} ${img1Value}${img12Value} ${newDefaultValue[0]} ${newDefaultValue[1]}`;
    } else if (newDefaultValue.length === 1) {
      inputElement.value = `${defaultValue} ${img1Value}${img12Value} ${newDefaultValue[0]}`;
    } else {
      inputElement.value = `${defaultValue} ${img1Value}${img12Value}`;
    }
  };

  const handleimg3Change = (selectedOption) => {
    setImg13(selectedOption);
    const img1Value = Img11[0] ? Img11[0].value : "";
    const img12Value = Img11[1] ? Img11[1].value : "";
    const img2Value = Img12[0] ? Img12[0].value : "";
    const img21Value = Img12[1] ? Img12[1].value : "";
    const newDefaultValue = selectedOption ? selectedOption.value : "";
    if (Img11[0] && Img11[1] && Img12[0] && Img12[1]) {
      document.getElementById(
        "defaultsize2"
      ).value = `${defaultValue} ${img1Value}${img12Value}${img2Value}${img21Value}  ${newDefaultValue} `;
    } else if (Img11[0] && Img12[0] && Img12[1]) {
      document.getElementById(
        "defaultsize2"
      ).value = `${defaultValue} ${img1Value}${img2Value}${img21Value}  ${newDefaultValue} `;
    } else if (Img11[0] && Img11[1] && Img12[0]) {
      document.getElementById(
        "defaultsize2"
      ).value = `${defaultValue} ${img1Value}${img12Value}${img2Value}  ${newDefaultValue} `;
    } else if (Img11[0] && Img12[0]) {
      document.getElementById(
        "defaultsize2"
      ).value = `${defaultValue} ${img1Value}${img12Value} ${newDefaultValue}  `;
    } else if (Img12[0] && Img12[1]) {
      document.getElementById(
        "defaultsize2"
      ).value = `${defaultValue} ${img1Value}${img12Value} ${newDefaultValue}  `;
    } else {
      document.getElementById(
        "defaultsize2"
      ).value = `${defaultValue} ${img1Value} ${newDefaultValue} `;
    }
  };

  const handleNext = () => {
    // Create an array to store selected values from dropdowns
    const selectedValues = [];

    // Add values from dropdowns to the array
    if (Img11) {
      selectedValues.push(
        `(${Img11.map((option) => option.value).join(":")}:1)`
      );
    }
    if (Img12) {
      selectedValues.push(
        `(${Img12.map((option) => option.value).join(":")}:2)`
      );
    }
    if (Img13) selectedValues.push(`${Img13.value}:3`);

    // Combine the selected values
    const combinedValues = `[${selectedValues.join(" ")}] :`;

    // Build the updated URL
    const updatedURL = `/step8?defaultValue=${defaultValue} ${combinedValues}&email=${email}&doctor=${doctor}`;

    // Navigate to the updated URL
    navigate(updatedURL);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleBack = () => {
    navigate(-1);
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
            defaultValue={defaultValue}
          />
        </div>

        <div className="space-y-10 px-8 py-8">
          <p>
            <b>STEP 6:</b> The Diagnostica code can be extended to account for
            comorbidity descriptors. We can use Charlson Comorbidity Index (CCI)
            as the added descriptor.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* SCORE 1 */}
          <div className="cols-span-4">
            <label htmlFor="mul_1" className="form-label">
              SCORE 1
            </label>
            <Select
              isClearable={false}
              onChange={handleimg1Change}
              styles={styles}
              isMulti
              options={Score_1}
              className="react-select"
              classNamePrefix="select"
              id="mul_1"
            />
          </div>

          {/* SCORE 2 (only active if SCORE 1 is selected) */}
          {Img11 && (
            <div className="cols-span-4">
              <label htmlFor="hh1" className="form-label">
                SCORE 2
              </label>
              <Select
                isClearable={false}
                onChange={handleimg2Change}
                styles={styles}
                isMulti
                options={Score_2}
                className="react-select"
                classNamePrefix="select"
                id="hh1"
              />
            </div>
          )}

          {/* SCORE 3 & 6 (only active if SCORE 2 is selected) */}
          {Img11 && (
            <div className="cols-span-4">
              <label htmlFor="hh2" className="form-label">
                SCORE 3 & 6
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                onChange={handleimg3Change}
                options={Score_3}
                isClearable
                styles={styles}
                id="hh2"
              />
            </div>
          )}
        </div>
        <br />
        <br />
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

export default Page6;
