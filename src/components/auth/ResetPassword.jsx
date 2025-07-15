import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordSchema } from "../../validation/authValidation";
import { resetPassword } from "../../Redux/features/auth/authSlice";
import { useEffect } from "react";
import { showToast } from "../../common/showToast";
import main from "../../assets/img/main.jpg";
import logo from "../../assets/img/logo.png";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, resetPasswordSuccess } = useSelector(
    (state) => state.auth
  );

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    if (!token) return showToast("error", "Token is missing from URL.");
    const payload = {
      token,
      password: values.password,
    };
    dispatch(resetPassword(payload));
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      showToast("success", resetPasswordSuccess);
      navigate("/");
    } else if (error) {
      showToast("error", error);
    }
  }, [error, resetPasswordSuccess, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${main})` }}
    >
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-55 h-32 mb-4" />
        <div className="w-96">
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            <Form className="bg-white p-6 shadow-lg rounded-lg w-full">
              <h2 className="text-xl font-bold text-center mb-4">
                Reset Password
              </h2>

              <div className="mb-3">
                <Field
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <p className="text-center mt-4 text-gray-500">
                Remember your password?{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
