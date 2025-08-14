import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../common/Loading";

const DiagnosticaList = ({ appointmentRefId }) => {
  const navigate = useNavigate();
  const { diagnosticaData, loading } = useSelector(
    (state) => state?.diagnostics
  );

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)?.toLocaleDateString("en-US", options);
  };

  // Handle edit action
  const handleEdit = (item) => {
    navigate(`/diagnostica-form/${item.patientId._id}/${appointmentRefId}`, {
      state: {
        isEdit: true,
        appointmentData: item, // You can pass the entire item if needed
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <Loading />
      ) : diagnosticaData?.length > 0 ? (
        diagnosticaData.map((item) => (
          <div
            key={item._id}
            className="max-w-md bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="bg-blue-600 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Appointment Details
              </h2>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : item.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Appointment ID
                    </p>
                    <p className="mt-1 text-sm text-gray-900 break-all">
                      {item._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Code</p>
                    <p className="mt-1 text-sm text-gray-900">{item.code}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Doctor</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {item.doctorId?.firstName} {item.doctorId?.lastName}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Step</p>
                    <p className="mt-1 text-sm text-gray-900">{item.step}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Comment</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {item.comment || "No comment"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Created At
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Updated At
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(item.updatedAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Patient</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {item.patientId?.firstName} {item.patientId?.lastName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-start items-start py-10 min-h-[200px]">
          <p className="text-gray-500 font-bold text-lg">No data found</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosticaList;
