import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Textinput from '../../components/ui/Textinput';
import Card from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

import { useLocation } from 'react-router-dom';



function Page4() {

    const navigate = useNavigate();
    const location = useLocation();
    const defaultValue = new URLSearchParams(location.search).get('defaultValue');
    const email = new URLSearchParams(location.search).get('email');
    
    const [Foot, setFoot] = useState(null);

    const foot = [
        { value: ": 1 :", label: "1-Forefoot" },
        { value: ": 2 :", label: "2-Midfoot" },
        { value: ": 3 :", label: "3-Hindfoot" },
        { value: ": 4 :", label: "4-Ankle" },


    ];

   

    const handlefootChange = (selectedOption) => {
        setFoot(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
        document.getElementById('defaultsize2').value = defaultValue + newDefaultValue;
      };

      const handleNext = () => {
        const newDefaultValue = Foot ? Foot.value : "";
        const combinedDefaultValue = defaultValue + newDefaultValue;
        navigate(`/step6?defaultValue=${combinedDefaultValue}&email=${email}`);
      };   
    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
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
            onClick : handleCancel
        },
       
        {
            title: "Back",
            onClick:handleBack
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
                <p><b>STEP 5 (Extension):</b> Extending
         Diagnostica, for soft tissue conditions, we
         can also use the anatomic location
         (Forefoot, Midfoot, Hindfoot and Ankle).</p>
                    <Select
                        className="react-select"
                        classNamePrefix="select"
                        onChange={handlefootChange}
                        options={foot}
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


            </Card >
        </div >

    );
}

export default Page4