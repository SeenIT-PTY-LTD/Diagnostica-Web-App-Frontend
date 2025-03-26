import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "../../components/ui/Card";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { API } from "../../host";




const FormValidationSchema = yup.object({
  userid: yup.string().required("User_id is required"),
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().required("Email is Required"),

});

const UpdateDoctor = () => {
  const {
    setValue,

  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });


  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idcode = params.get("idcode");

  const [userid, setUserid] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUserData = async () => {
      try {
       // console.log(idcode)
        const response = await axios.get(`${API}/getdoctor?idcode=${idcode}`);
        const responseData = response.data;
       // console.log(responseData)
        setUserid(responseData.userid)
        setFirstname(responseData.firstname)
        setLastname(responseData.lastname)
        setPhone(responseData.phone)
        setEmail(responseData.email)

        setValue("userid", responseData.userid);
        setValue("firstname", responseData.firstname);
        setValue("lastname", responseData.lastname);
        setValue("phone", responseData.phone);
        setValue("email", responseData.email);


      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userid]);

  const Update = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.put(`${API}/updatedoctor?idcode=${idcode}`, {
        idcode,
        userid: userid,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,



      });

      // console.log(response);
      navigate('/doctors');
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
              <Card title='Update Admin'>

                <form className="space-y-3" onSubmit={Update} >

                  <div >
                    <label htmlFor="userid" className="capitalize form-label"><b>userid</b></label>
                    <input
                      type="text"
                      name="userid"
                      className=" form-control py-2 "
                      id="userid"
                      placeholder="userid"
                      value={userid}
                      onChange={(e) => setUserid(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="firstname" className="capitalize form-label"><b>FirstName </b></label>
                    <input
                      type="text"
                      name="firstname"
                      className=" form-control py-2 "
                      id="firstname"
                      placeholder="First Name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="lastname" className="capitalize form-label"><b>LastName </b></label>
                    <input
                      type="text"
                      name="lastname"
                      className=" form-control py-2 "
                      id="lastname"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
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
                    <label htmlFor="email" className="capitalize form-label"><b>Email</b></label>
                    <input
                      type="text"
                      name="email"
                      className=" form-control py-2 "
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

export default UpdateDoctor;
