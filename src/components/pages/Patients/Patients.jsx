import  { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Table from "../../../common/table";
import { useNavigate } from "react-router-dom";
import usePatients from "../../../hooks/usePatients";

function Patients() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const { data, loading, error, totalPages } = usePatients(page, pageSize);

  const fields = [
    {
      key: "image",
      label: "Image",
      render: (value) =>
        value ? (
          <img
            src={value}
            alt="img"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            N/A
          </div>
        ),
    },
    { key: "firstName", label: "Patient" },
    { key: "phone", label: "Phone" },
    { key: "dob", label: "DOB" },
    { key: "gender", label: "Gender" },
    { key: "address", label: "Address" },
    {
      key: "action",
      label: "Action",
      render: (_, row) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => console.log("View", row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => navigate(`/edit-patient/${row._id}`)}
            className="text-green-600 hover:text-green-800"
          >
            <Pencil size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (error) return <p>Error: {error}</p>;

  return (
    <Table
      title="Recent Patients"
      fields={fields}
      data={data}
      rowsPerPage={pageSize}
      showSearch={true}
      serverPagination={true}
      currentPage={page}
      totalCount={totalPages}
      onPageChange={(newPage) => setPage(newPage)}
      loading={loading}
    />
  );
}

export default Patients;
