import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Icon from "../../ui/Icon";
import Tooltip from "../../ui/Tooltip";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { Link , useNavigate} from "react-router-dom";
import { API } from "../../../host";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";


const COLUMNS = [
  {
    Header: "#",
    accessor: "rowIndex", // Add a special accessor for the row index
  },
  {
    Header: "FIRST NAME",
    accessor: "firstname",
  },
  {
    Header: "LAST NAME",
    accessor: "lastname",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "ACTION",
    accessor: "actions", // You can add action buttons here
  },
];

const DoctorTable = ({Current_user}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);

  const [refresh, setRefresh] = useState(false)
  

  useEffect(() => {
    fetchData();
   // console.log(Current_user)
  }, [refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/getdoctor1`);
      if (response.status === 200) {
        // Add rowIndex to each user object and set it in state
        const usersWithRowIndex = response.data.map((user, index) => ({
          ...user,
          rowIndex: index + 1,
        }));
        setData(usersWithRowIndex);
        setAllData(usersWithRowIndex);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (idcode) => {
    try {
      const response = await axios.delete(`${API}/deletedoctor?idcode=${idcode}`);
      console.log(response);
     setRefresh(!refresh)
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Initial page settings
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;


  const exportData = async(format) => {
    if (format === 'csv') {
      // CSV Export
      const exportedData = allData.map((row) => ({
        'Row #': row.rowIndex,
        'First Name': row.firstname,
        'Last Name': row.lastname,
        'Email': row.email,
        'Phone': row.phone,
      }));

      const csvData = [
        Object.keys(exportedData[0]).join(','),
        ...exportedData.map((row) => Object.values(row).join(',')),
      ].join('\n');

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      

      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Doctor_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'pdf') {
      try {
        const rowsPerPage = 30; 
        const totalPages = Math.ceil(allData.length / rowsPerPage);
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        let yOffset = 10;
        
        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, allData.length);
          const currentPageData = allData.slice(startIndex, endIndex);
          
          const tableData = currentPageData.map((row) => [
            row.rowIndex,
            `${row.firstname} ${row.lastname}`,
            row.email,
            row.phone,
          ]);
    
          pdf.text(`Page ${currentPage}`, 10, yOffset);
          pdf.autoTable({
            startY: yOffset + 10,
            head: [['Row #', 'Name', 'Email', 'Phone']],
            body: tableData,
          });
    
          if (currentPage < totalPages) {
            pdf.addPage();
            yOffset = 10; // Set yOffset for the new page
          } 
        }
    
        pdf.save('Doctor_data.pdf');
      } catch (error) {
        console.error('Error exporting data:', error);
      }
    }
    
  };

  const range = 1;

  return (
    <>
      <div className="md:flex justify-between items-center mb-6">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          <select
            className="form-control py-2 w-max"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Page{" "}
            <span>
              {pageIndex + 1} of {pageOptions.length}
            </span>
          </span>
        </div>
        <div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>
      <table   id="table-to-export" className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
        <thead className="bg-slate-200 dark:bg-slate-700">
          <tr>
            <th className=" table-th " >#</th>
            <th className=" table-th " > NAME</th>
            <th className=" table-th " >EMAIL</th>
            <th className=" table-th " >PHONE</th>
            {Current_user === 'superadmin' && (
            <th className=" table-th " >ACTION</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.original.idcode}>
                <td className="table-td">{row.original.rowIndex}</td>
                <td className="table-td">{`${row.original.firstname} ${row.original.lastname}`}</td>
               
                <td className="table-td">{row.original.email}</td>
                <td className="table-td">{row.original.phone}</td>
                {Current_user === 'superadmin' && (
                <td className="table-td">
                  <div className="d-flex justify-around rtl-space-x-reverse">
                    <Tooltip content="Update" placement="top" arrow animation="shift-away">
                      <Link to={`/updateform?idcode=${row.original.idcode}`} className="action-btn">
                        <Icon icon="heroicons:pencil-square" />
                      </Link>
                    </Tooltip>
                    <Tooltip
                      content="Delete"
                      placement="top"
                      arrow
                      animation="shift-away"
                      theme="danger"
                    >
                      <button
                        className="action-btn"
                        type="button"
                        onClick={() => handleDelete(row.original.idcode)}
                      >
                        <Icon icon="heroicons:trash" />
                      </button>
                    </Tooltip>
                  </div>
                </td>
                 )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => exportData('pdf')}
            className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportData('csv')}
            className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
          >
            Export CSV
          </button>
        </div>
        <ul className="flex items-center space-x-3 rtl:space-x-reverse">
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <Icon icon="heroicons:chevron-double-left-solid" />
            </button>
          </li>
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Prev
            </button>
          </li>
          {pageOptions.map((page, pageIdx) => {
        if (
          pageIdx === pageIndex ||
          (pageIdx >= pageIndex - range && pageIdx <= pageIndex + range)
        ) {
          return (
            <li key={pageIdx}>
              <button
                href="#"
                aria-current="page"
                className={`${
                  pageIdx === pageIndex
                    ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium"
                    : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal"
                } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                onClick={() => gotoPage(pageIdx)}
              >
                {page + 1}
              </button>
            </li>
          );
        }
        return null;
      })}
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
          </li>
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <Icon icon="heroicons:chevron-double-right-solid" />
            </button>
          </li>
        </ul>
      </div>

    </>
  );
};

export default DoctorTable;
