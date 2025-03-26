import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API } from "./host";

import Dashboard from "./pages/dashboard";
import Patient from "./pages/patient";
import Doctor from "./pages/doctors";
import DoctorForm from "./pages/doctors/DoctorForm";
import Viewpage from "./pages/patient-details/Viewpage";
import UpdateForm from "./pages/doctors/UpdateForm";
import Login from "./pages/auth/login";

import Layout from "./layout/Layout";
import Page from "./pages/components/Page";
import Page1 from "./pages/components/Page1";
import Page2 from "./pages/components/Page2";
import Page3 from "./pages/components/Page3";

import Page5 from "./pages/components/Page5";
import Page6 from "./pages/components/Page6";
import Page7 from "./pages/components/Page7";
import UserProfile from "./components/partials/header/Tools/UserProfile";
import FogotPassword from "./pages/auth/forgotpassword";
import OtpVerify from "./pages/auth/otpverification";
import ResetPassword from "./pages/auth/changepassword";
import Page8 from "./pages/components/Page8";
import UpdatePatient from "./pages/patient/UpdatePatientForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const decodedToken = token ? jwtDecode(token) : null;
  const initialUserData = {role: ""};

  const [userData, setUserData] = useState(initialUserData);
  // useEffect(() => {
  //  if(decodedToken){
  //   const decodedEmail = decodedToken.email;
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`${API}/getemail?email=${decodedEmail}`);
  //       const responseData = response.data;
  //       setUserData(responseData);
  //      // console.log(responseData.role)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchUserData();
  // }
  // }, [decodedToken]);


  const Current_user = userData.role
  const [activeComponentt, setActiveComponentt] = useState(null);

 
  if (!token) {
    // Handle the case where token is null
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000}  />
      <Routes>
        <Route path="" element={<Login setToken={setToken} />} />
        <Route path="/forgotpassword" element={<FogotPassword />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/*" element={token ? <Layout token={token}/> : <Navigate to='/' />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patient" element={<Patient Current_user ={Current_user}/>} />
          <Route path="doctors" element={<Doctor Current_user ={Current_user}/>} />
          <Route path="view" element={<Viewpage token={token}/>} />
          <Route path="form" element={<DoctorForm />} />
          <Route path="updateform" element={<UpdateForm />} />
          <Route path="update" element={<UpdatePatient />} />
          <Route path="profile" element={<UserProfile token={token} Current_user ={Current_user} />} />
          <Route path="step1" element={<Page/>} />
          <Route path="step2" element={<Page1/>} />
          <Route path="step3" element={<Page2/>} />
          <Route path="step4" element={<Page3/>} />
          {/* <Route path="step5" element={<Page4/>} /> */}
          <Route path="step6" element={<Page5/>} />
          <Route path="step7" element={<Page6/>} />
          <Route path="step8" element={<Page7/>} />
          <Route path="step9" element={<Page8 />} token={token}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
