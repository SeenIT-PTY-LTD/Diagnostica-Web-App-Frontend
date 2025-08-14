import React, { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePatients from "../../../hooks/usePatients";
import { formatDateMMDDYYYY } from "../../../utils/dateFormat";
import Table from "../../../common/Table";

function Patients() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pageSize = 5;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Reset to page 1 when search term changes
      if (searchTerm !== debouncedSearchTerm) {
        setPage(1);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const { data, loading, error, totalCount, totalPages } = usePatients(
    page,
    pageSize,
    debouncedSearchTerm,
    "firstName"
  );

  const fields = [
    { key: "firstName", label: "Patient" },
    { key: "phone", label: "Phone" },
    {
      key: "dob",
      label: "DOB",
      render: (value) => formatDateMMDDYYYY(value),
    },
    { key: "gender", label: "Gender" },
    { key: "address", label: "Address" },
    {
      key: "action",
      label: "Action",
      render: (_, row) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/view-patient/${row._id}`)}
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

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <Table
      title="Patients Data"
      fields={fields}
      data={data || []}
      rowsPerPage={pageSize}
      showSearch={true}
      serverPagination={true}
      currentPage={page}
      totalCount={totalPages}
      onPageChange={(newPage) => {
        setPage(newPage);
      }}
      onSearch={(term) => {
        setSearchTerm(term);
      }}
      loading={loading}
    />
  );
}
export default Patients;
