import React, { useEffect, useState } from "react";
import Table from "../../../common/Table";
import useDoctors from "../../../hooks/useDoctors";

function Doctors() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pageSize = 5;

  const { data, loading, error, totalPages } = useDoctors(
    page,
    pageSize,
    debouncedSearchTerm,
    "firstName"
  );
  const totalPagesData = Math.ceil(totalPages / pageSize);

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

  const fields = [
    { key: "firstName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  if (error) return <p>Error: {error}</p>;
  // const profileButtonClasses = `bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500`;

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
        data={data || []}
        rowsPerPage={pageSize}
        showSearch={true}
        serverPagination={true}
        currentPage={page}
        totalCount={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        onSearch={(term) => {
          setSearchTerm(term);
        }}
        loading={loading}
      />
    </>
  );
}

export default Doctors;
