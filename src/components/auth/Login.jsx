import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  login,
  forgotPasswordByEmail,
} from "../../redux/features/auth/authSlice";
import main from "../../assets/img/main.jpg";
import logo from "../../assets/img/logo.png";
import {
  forgotPasswordSchema,
  loginSchema,
} from "../../validation/authValidation";
import { showToast } from "../../common/ShowToast";

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLoginSubmit = async (values) => {
    const resultAction = await dispatch(login(values));
    if (login.fulfilled.match(resultAction)) {
      showToast("success", "Logged in successfully!");
      navigate("/dashboard");
    } else if (login.rejected.match(resultAction)) {
      showToast("error", resultAction.payload?.message || "Login failed.");
    }
  };

  const handleForgotPasswordSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    const resultAction = await dispatch(forgotPasswordByEmail(values.email));
    setSubmitting(false);

    if (forgotPasswordByEmail.fulfilled.match(resultAction)) {
      showToast("success", "Reset link sent to your email.");
      resetForm();
      setForgotPassword(false);
    } else if (forgotPasswordByEmail.rejected.match(resultAction)) {
      showToast(
        "error",
        resultAction.payload?.message || "Failed to send reset link."
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${main})` }}
    >
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-55 h-32 mb-4" />
        <div className="w-96">
          {" "}
          {!forgotPassword ? (
            <Formik
              key="login-form"
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleLoginSubmit}
            >
              <Form className="bg-white p-6 shadow-lg rounded-lg w-full">
                <h2 className="text-xl font-bold text-center mb-4">
                  Sign In to your Diagnostica account
                </h2>

                <div className="mb-3">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                  />
                  <div className="min-h-4">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                  />
                  <div className="min-h-4">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex justify-end mt-4 text-sm">
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </Form>
            </Formik>
          ) : (
            <Formik
              key="forgot-password-form"
              initialValues={{ email: "" }}
              validationSchema={forgotPasswordSchema}
              onSubmit={handleForgotPasswordSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="bg-white p-6 shadow-lg rounded-lg w-full">
                  <h2 className="text-xl font-bold text-center mb-4">
                    Reset Your Password
                  </h2>

                  <div className="mb-4">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full border p-2 rounded"
                    />
                    <div className="min-h-4">
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-60"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setForgotPassword(false)}
                    className="mt-4 w-full text-blue-500 hover:underline text-sm"
                  >
                    Back to Login
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
