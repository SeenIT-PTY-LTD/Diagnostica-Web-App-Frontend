import React, { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Table from "../../../common/Table";
import { useNavigate } from "react-router-dom";
import useDoctors from "../../../hooks/usePatients";

function Doctors() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const { data, loading, error, totalPages } = useDoctors(page, pageSize);
  console.log(data,'****data')

  const fields = [
    
    { key: "firstName", label: "name" },
     { key: "email", label: "email" },
    { key: "phone", label: "Phone" },
   
   
    // {
    //   key: "action",
    //   label: "Action",
    //   render: (_, row) => (
    //     <div className="flex items-center space-x-3">
    //       <button
    //         onClick={() => navigate(`/view-patient/${row._id}`)}
    //         className="text-blue-600 hover:text-blue-800"
    //       >
    //         <Eye size={18} />
    //       </button>
    //       <button
    //         onClick={() => navigate(`/edit-patient/${row._id}`)}
    //         className="text-green-600 hover:text-green-800"
    //       >
    //         <Pencil size={18} />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  if (error) return <p>Error: {error}</p>;

  return (
    <Table
      title={`page ${page} of ${pageSize}`}
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

export default Doctors;
