import React from "react";
import { useNavigate } from "react-router-dom";

const Diagnostica = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        className={`px-4 py-2 text-sm sm:text-base rounded border transition-colors bg-blue-600 text-white border-blue-600 hover:bg-blue-700`}
        onClick={() => navigate("/diagnostica-form")}
      >
        Create New Diagnostica Path
      </button>
    </div>
  );
};

export default Diagnostica;
