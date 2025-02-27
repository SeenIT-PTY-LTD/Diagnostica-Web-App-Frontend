import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "../../components/ui/Card";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { API } from "../../host";




const FormValidationSchema = yup.object({
  
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone Number is required"),


});

function calculateBMI(weight, height) {
  let heightInMeters = height / 100;
  let bmi = weight / (heightInMeters * heightInMeters);
  let bmiResult;

  if (bmi < 18.5) {
    bmiResult = 'Under Weight';
  } else if (bmi <= 25) {
    bmiResult = 'Normal';
  } else if (bmi <= 30) {
    bmiResult = 'Over Weight';
  } else {
    bmiResult = 'Obesity';
  }

  return {bmiResult };
}


const UpdatePatient = () => {
  const { setValue } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email1 = params.get("email");

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [state, setstate] = useState("");
  const [postcode, setpostcode] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState("");
 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API}/getpatient?email=${email1}`);
        const responseData = response.data;
       
        setfname(responseData.fname);
        setlname(responseData.lname);
        setdob(responseData.dob);
        setgender(responseData.gender);
        setEmail(responseData.email);
        setPhone(responseData.phone);
        setaddress(responseData.address);
        setstate(responseData.state);
        setpostcode(responseData.postcode);
        setHeight(responseData.height);
        setWeight(responseData.weight);
       

        setValue("fname", responseData.fname);
        setValue("lname", responseData.lname);
        setValue("dob", responseData.dob);
        setValue("gender", responseData.gender);
        setValue("email", responseData.email);
        setValue("phone", responseData.phone);
        setValue("address", responseData.address);
        setValue("state", responseData.state);
        setValue("postcode", responseData.postcode);
        setValue("height", responseData.height);
        setValue("weight", responseData.weight);

        const {bmiResult } = calculateBMI(responseData.weight, responseData.height);
        setBmiResult(bmiResult);
      
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [email1]);

  const Update = async (e) => {
    e.preventDefault();


    try {
      const { bmiResult } = calculateBMI(weight, height);
      const response = await axios.put(`${API}/update?email=${email}`, {
        email,
        fname: fname,
        lname: lname,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        state:state,
        postcode: postcode,
        height: height,
        weight: weight,
        bmi:bmiResult
        
 
      });

      // console.log(response);
      navigate("/patient");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <div className="flex justify-between flex-wrap items-center mb-6">
        <h5 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Update Admin
        </h5>
      </div> */}
      <div>
        <div className="d-flex  align-items-center">
          <div className="col-md-6">
            <div className="bg-transparent">
              <Card title='Edit Patient Bio'>

                <form className="space-y-3" onSubmit={Update} >

                  <div >
                    <label htmlFor="fname" className="capitalize form-label"><b>FirstName </b></label>
                    <input
                      type="text"
                      name="fname"
                      className=" form-control py-2 "
                      id="fname"
                      placeholder="First Name"
                      value={fname}
                      onChange={(e) => setfname(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="lname" className="capitalize form-label"><b>LastName </b></label>
                    <input
                      type="text"
                      name="lname"
                      className=" form-control py-2 "
                      id="lname"
                      placeholder="Last Name"
                      value={lname}
                      onChange={(e) => setlname(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="dob" className="capitalize form-label"><b>DOB </b></label>
                    <input
                      type="text"
                      name="dob"
                      className=" form-control py-2 "
                      id="dob"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={(e) => setdob(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="gender" className="capitalize form-label"><b>Gender </b></label>
                    <input
                      type="text"
                      name="gender"
                      className=" form-control py-2 "
                      id="gender"
                      placeholder="Gender"
                      value={gender}
                      onChange={(e) => setgender(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="phone" className="capitalize form-label"><b>Phone </b></label>
                    <input
                      type="text"
                      name="phone"
                      className=" form-control py-2"
                      id="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="address" className="capitalize form-label"><b>Address</b></label>
                    <input
                      type="text"
                      name="address"
                      className=" form-control py-2 "
                      id="address"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="state" className="capitalize form-label"><b>State</b></label>
                    <input
                      type="text"
                      name="state"
                      className=" form-control py-2 "
                      id="state"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setstate(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="postcode" className="capitalize form-label"><b>Postcode</b></label>
                    <input
                      type="text"
                      name="postcode"
                      className=" form-control py-2 "
                      id="postcode"
                      placeholder="Postcode"
                      value={postcode}
                      onChange={(e) => setpostcode(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="height" className="capitalize form-label"><b>Height</b></label>
                    <input
                      type="text"
                      name="height"
                      className=" form-control py-2 "
                      id="height"
                      placeholder="Height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="weight" className="capitalize form-label"><b>Weight</b></label>
                    <input
                      type="text"
                      name="weight"
                      className=" form-control py-2 "
                      id="weight"
                      placeholder="Weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>

                  <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark text-center" type="submit">
                      UPDATE
                    </button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePatient;
