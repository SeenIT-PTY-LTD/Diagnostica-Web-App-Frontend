import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "../../components/ui/Textinput";
import Select from "react-select";
import Card from "../../components/ui/Card";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../host";

const FormValidationSchema = yup
  .object({
    userid: yup.string().required(" User_id is required"),
    firstname: yup.string().required(" First Name is required"),
    lastname: yup.string().required(" Lastst Name is required"),
    phone: yup.string().required("Phone Number is required"),
    email: yup.string().required("Email is Required"),
    password: yup.string().required("Password is Required"),
    profileImage: yup
      .mixed()
      .test("fileType", "Invalid file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png"].includes(value[0].type);
      }),
  })
  .required();

const Add_Board = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API}/doctor`, {
        ...data,
        role: selectedRole.value,
      });

      if (response.status === 200) {
        toast.success("User created successfully");
        history.back();
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error("Error creating user");
      }
    }
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const [selectedRole, setSelectedRole] = useState(null);

  const role = [
    { value: "superadmin", label: "Super Admin" },
    { value: "doctor", label: "Doctor" },
  ];

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          New Doctor
        </h4>
      </div>
      <div>
        <div className="d-flex  align-items-center">
          <div className="col-md-6">
            <div className=" ">
              <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <Textinput
                    name="userid"
                    label="Doctor ID*"
                    placeholder="userid"
                    register={register}
                    error={errors.userid}
                  />
                  <Textinput
                    name="firstname"
                    label="First Name*"
                    placeholder="First Name"
                    register={register}
                    error={errors.firstname}
                  />
                  <Textinput
                    name="lastname"
                    label="Last Name*"
                    placeholder="Last Name"
                    register={register}
                    error={errors.lastname}
                  />
                  <Textinput
                    name="email"
                    label="Email*"
                    placeholder="Email"
                    register={register}
                    error={errors.email}
                  />
                  <Textinput
                    name="phone"
                    label="Phone*"
                    placeholder="Phone"
                    register={register}
                    error={errors.phone}
                  />
                  <div>
                    <label htmlFor=" hh2" className="form-label ">
                      Role*
                    </label>
                    <Select
                      options={role}
                      value={selectedRole}
                      onChange={(selectedOption) =>
                        setSelectedRole(selectedOption)
                      }
                      placeholder="Select Role"
                      id="hh2"
                    />
                  </div>

                  <Textinput
                    name="password"
                    label="Password*"
                    placeholder="Password"
                    register={register}
                    error={errors.password}
                  />

                  {/* <div>
                    <label htmlFor="profileImage" className="block">
                      Profile Image :
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept=".jpg, .jpeg, .png"
                      
                    />
                  </div> */}

                  <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark text-center">Add</button>
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

export default Add_Board;
