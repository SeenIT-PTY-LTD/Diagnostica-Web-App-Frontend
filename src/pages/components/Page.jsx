import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Textinput from '../../components/ui/Textinput';
import Card from '../../components/ui/Card';
import Radio from '../../components/ui/Radio';
import { useParams } from 'react-router-dom';

function Page() {
  
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [region, setRegion] = useState("");
  const email = new URLSearchParams(location.search).get('email');
  const doctor =new URLSearchParams(location.search).get('doctor');
  const handleChange = (e) => {
    setValue(e.target.value);
    setRegion(e.target.value);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const buttons = [
    {
      title: "Cancel",
      onClick: handleCancel, // Changed "onclick" to "onClick"
    },
    {
      title: "Next",
      onClick: () => {
        navigate(`/step2?defaultValue=${region}&email=${email}&doctor=${doctor}`);
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center mb-6">
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
            defaultValue={region}
            horizontal
          />
        </div>

        <div className='flex justify-center space-y-8 px-8 py-8'>
          <p><b>STEP 1:</b> We assign a region for the injury as it relates to standard anatomical position, namely, RIGHT (R) or LEFT (L)</p>
        </div>

        <div className="flex flex-wrap space-xy-5 justify-around items-center space-y-8 px-8 py-8">
          <Radio
            label="LEFT"
            name="x"
            value="L"
            checked={value === "L"}
            onChange={handleChange}
          />
          <Radio
            label="RIGHT"
            name="x"
            value="R"
            checked={value === "R"}
            onChange={handleChange}
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

export default Page;
