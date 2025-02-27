import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import MobileLogo from "../../assets/logobg.png";
import MobileLogo1 from "../../assets/26807.jpg";
import { API } from "../../host";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/doctorlogin`, formData);

      const { token } = response.data;
      const decodedToken = jwtDecode(token);
      setToken(token);
      localStorage.setItem("token", token);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response.data.message);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-dark dark:bg-slate-800  " style={{ backgroundImage: `url(${MobileLogo1})`, backgroundSize: 'cover', backgroundPosition: 'center' , opacity: 2.0 }}>
            <div className="auth-box2 flex flex-col justify-center h-full">
              <div className="mobile-logo text-center mb-6 lg:hidden block"></div>
              <div className="d-flex justify-content-center align-items-center mb-3">
                            <img src={MobileLogo} alt="" height='300px' width="300px" />
                        </div>
              <div className="text-center 2xl:mb-2 mb-1">
                {/* <h4 className="font-medium mb-4">Diagnostica</h4> */}
                <div className="text-slate-500 dark:text-slate-400 text-base">
                 Sign In to your Diagnostica account
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>

                <div className="flex justify-between">
                  {/* <Checkbox
                    value={checked}
                    onChange={() => setChecked(!checked)}
                    label="Keep me signed in"
                  /> */}
                  <Link
                    to="/forgotpassword"
                    className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
                  >
                    Forgot Password?{" "}
                  </Link>
                </div>

                <button
                  className="btn btn-dark block w-full text-center"
                  type="submit"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
