import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiagnosticaList from "./DiagnosticaList";
import { fetchDiagnostica } from "../../../../redux/features/diagnostica/Diagnostica";
import { useDispatch } from "react-redux";

const Diagnostica = () => {
  const dispatch = useDispatch();

  const { id: patientId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchDiagnostica({ patientId: patientId }));
  }, [dispatch,patientId]);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={`px-4 py-2 text-sm sm:text-base rounded border transition-colors bg-blue-600 text-white border-blue-600 hover:bg-blue-700`}
          onClick={() => navigate(`/diagnostica-form/${patientId}`)}
        >
          Create New Diagnostica Path
        </button>
      </div>
      <DiagnosticaList />
    </>
  );
};

export default Diagnostica;
