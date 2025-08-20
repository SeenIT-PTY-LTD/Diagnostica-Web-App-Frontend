import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "./ShowToast";
import { CheckCircle, XCircle, Loader2, MailCheck, Smartphone } from "lucide-react";
import { API_URL } from "../utils/api";

const VerifyEmail = () => {
  const { token } = useParams();
  console.log("Token from URL:", token);
  
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    message: "Verifying your email...",
    type: "loading",
  });

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/patient/verify-email/${token}`
        );
        console.log("response", res);

        if (res.status === 200) {
          showToast("success", res?.data.message || "Email verified successfully!");
          setStatus({ 
            message: res?.data.message, 
            type: "success" 
          });
        }
      } catch (err) {
        setStatus({
          message: err.response?.data?.message || "Invalid or expired link. Please request again.",
          type: "error",
        });
      }
    };

    verifyAccount();
  }, [token, navigate]);

  const renderIcon = () => {
    if (status.type === "loading") return <Loader2 className="animate-spin text-blue-500 w-16 h-16" />;
    if (status.type === "success") return <CheckCircle className="text-green-500 w-16 h-16" />;
    if (status.type === "error") return <XCircle className="text-red-500 w-16 h-16" />;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="bg-white shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-md text-center transform transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="relative">
            {renderIcon()}
            {status.type === "success" && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                <MailCheck className="text-green-500 w-6 h-6" />
              </div>
            )}
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          {status.type === "success" ? "Email Verified Successfully!" : 
           status.type === "error" ? "Verification Failed" : 
           "Verifying Your Email"}
        </h1>
        
        <p className={`text-lg mb-4 ${
          status.type === "success" ? "text-green-600" :
          status.type === "error" ? "text-red-600" : 
          "text-gray-600"
        }`}>
          {status.message}
        </p>
        
        {/* Additional message for successful verification */}
        {status.type === "success" && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center mb-2">
              <Smartphone className="text-blue-500 w-5 h-5 mr-2" />
              <span className="text-blue-700 font-medium">Next Step</span>
            </div>
            <p className="text-blue-600 text-sm">
              Please try now to login on Diagnostica app
            </p>
          </div>
        )}
        
        {/* {status.type === "success" && (
          <div className="space-y-4 mt-6">
            <p className="text-sm text-gray-500 mb-2">
              Redirecting to login in {countdown} seconds...
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 w-full"
            >
              Go to Login Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        )} */}
        
        {status.type === "error" && (
          <div className="space-y-4 mt-4">
            <p className="text-sm text-gray-500">
              Please try registering again or contact support if the problem persists.
            </p>
          </div>
        )}
        
        {status.type === "loading" && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              This may take a few moments...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;