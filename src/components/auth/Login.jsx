import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/features/auth/authSlice";
import main from "../../assets/img/main.jpg";
import logobg from "../../assets/img/logobg.png";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(form));
    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual forgot password logic
    console.log("Forgot Password Email:", forgotEmail);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${main})` }}
    >
      <div className="flex flex-col items-center">
        <img src={logobg} alt="Logo" className="w-55 h-32 mb-4" />

        {!forgotPassword ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-bold text-center mb-4">
              Sign In to your Diagnostica account
            </h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-2 mb-2 rounded"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-2 mb-2 rounded"
              onChange={handleChange}
              required
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex justify-between mt-4 text-sm">
              <span className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </span>
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleForgotPasswordSubmit}
            className="bg-white p-6 shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-bold text-center mb-4">
              Reset Your Password
            </h2>

            <input
              type="email"
              name="forgotEmail"
              placeholder="Enter your email"
              className="w-full border p-2 mb-4 rounded"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => setForgotPassword(false)}
              className="mt-4 w-full text-blue-500 hover:underline text-sm"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
