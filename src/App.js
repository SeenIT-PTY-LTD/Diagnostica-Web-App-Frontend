import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ResetPassword";
import "./index.css";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Settings from "./components/pages/Settings";
import Patients from "./components/pages/Patients/Patients";
import { Toaster } from "react-hot-toast";
import EditPatient from "./components/pages/Patients/EditPatient";
import ViewPatient from "./components/pages/Patients/ViewPatient";
import StaticImages from "./common/Image";

const App = () => {
  const { auth } = useSelector((state) => state);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            auth.token ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/reset-password"
          element={
            auth.token ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
          }
        />

        {/* Protected Routes with Layout wrapping all authenticated pages */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient" element={<Patients />} />
          <Route path="/edit-patient/:id" element={<EditPatient />} />
          <Route path="/view-patient/:id" element={<ViewPatient />} />
          <Route path="/view-img" element={<StaticImages />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
