import React, { useState } from "react";
import Table from "../../../common/Table";
import useDoctors from "../../../hooks/useDoctors";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, loading, error, totalPages } = useDoctors(page, pageSize);
  const totalPagesData = Math.ceil(totalPages / pageSize);

  const fields = [
    { key: "firstName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  if (error) return <p>Error: {error}</p>;
  const profileButtonClasses = `bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500`;

  return (
    <>
      {/* <div className="flex justify-end mb-4">
        <button
          className={profileButtonClasses}
          onClick={() => navigate("/add-doctor")}
        >
          Add Doctor
        </button>
      </div> */}

      <Table
        title={`page ${page} of ${totalPagesData}`}
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
    </>
  );
}

export default Doctors;
