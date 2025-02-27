import React, { useState, useMemo, useEffect } from "react";
import Card from "../../ui/Card";
import Icon from "../../ui/Icon";
import Tooltip from "../../ui/Tooltip";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { API } from "../../../host";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";

const COLUMNS = [
  {
    Header: "#",
    accessor: "rowIndex",
  },
  {
    Header: "CUSTOMER",
    accessor: "fname",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "DOB",
    accessor: "dob",
  },
  {
    Header: "GENDER",
    accessor: "gender",
  },
  {
    Header: "ADDRESS",
    accessor: "address",
  },
  {
    Header: "ACTION",
    accessor: "actions",
  },
];
const PatientTable = ({ Current_user }) => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${API}/getpatients`);
  //     if (response.status === 200) {
  //       const usersWithRowIndex = response.data.map((user, index) => ({
  //         ...user,
  //         rowIndex: index + 1,
  //       }));
  //       setData(usersWithRowIndex);
  //       setAllData(usersWithRowIndex);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching doctor data:", error);
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/getpatients`);
      if (response.status === 200) {
        const reversedData = response.data.reverse();
        //console.log(reversedData);
        const usersWithRowIndex = reversedData.map((user, index) => ({
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

  const navigate = useNavigate();
  const handleView = (email) => {
    // Navigate to the ViewPage with the patient's email as a parameter
    navigate(`/view?email=${encodeURIComponent(email)}`);
  };

  // const handleDelete = async (email) => {
  //   const endpoints = [
  //     "delete",
  //     "deletepcs",
  //     "deletemoxfq",
  //     "deletesf",
  //     "deleteimage",
  //     "deletemeddata",
  //   ];

  //   for (const endpoint of endpoints) {
  //     try {
  //       const response = await axios.delete(
  //         `${API}/${endpoint}?email=${email}`
  //       );

  //       if (response.status === 200) {
  //         window.location.reload();
  //       } else {
  //         console.error(
  //           `Delete request for ${endpoint} failed with status:`,
  //           response.status
  //         );
  //       }
  //     } catch (error) {
  //       console.error(`Error deleting ${endpoint}:`,‹ error);
  //     }
  //   }
  // };

  const handleDelete = async (email) => {
    const endpoints = [
      "delete",
      "deletepcs",
      "deletemoxfq",
      "deletesf",
      "deleteimage",
      "deletemeddata",
      "deletecomment",
      "deleterange",
      "deleteeq",
      "deletedata",
    ];

    try {
      // Map each endpoint to a promise that deletes it
      const deleteRequests = endpoints.map(async (endpoint) => {
        const response = await axios.delete(
          `${API}/${endpoint}?email=${email}`
        );
        if (response.status !== 200) {
          console.error(
            `Delete request for ${endpoint} failed with status:`,
            response.status
          );
          throw new Error(`Delete request for ${endpoint} failed`);
        }
      });

      // Wait for all promises to resolve
      await Promise.all(deleteRequests);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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

  const exportData = async (format) => {
    if (format === "csv") {
      // CSV Export
      const exportedData = allData.map((row) => ({
        "#": row.rowIndex,
        Name: row.fname,
        Email: row.email,
        Phone: row.phone,
        DOB: row.dob,
        GENDER: row.gender,
        ADDRESS: row.address,
      }));

      const csvData = [
        Object.keys(exportedData[0]).join(","),
        ...exportedData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "Patient_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(allData.length / rowsPerPage);

        const pdf = new jsPDF("p", "mm", "a4");
        let yOffset = 10;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, allData.length);
          const currentPageData = allData.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.rowIndex,
            row.fname,
            row.email,
            row.phone,
            row.dob,
            row.gender,
            row.address,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset);
          pdf.autoTable({
            startY: yOffset + 10,
            head: [["#", "Name", "Email", "Phone", "DOB", "GENDER", "ADDRESS"]],
            body: tableData,
          });

          if (currentPage < totalPages) {
            pdf.addPage();
            yOffset = 10; // Set yOffset for the new page
          }
        }

        pdf.save("Patient_data.pdf");
      } catch (error) {
        console.error("Error exporting data:", error);
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
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className=" table-th ">#</th>
                  <th className=" table-th ">PATIENT</th>
                  <th className=" table-th ">PHONE</th>
                  <th className=" table-th ">EMAIL</th>
                  {/* <th className=" table-th ">DOB</th> */}
                  <th className=" table-th ">GENDER</th>
                  <th className=" table-th ">ADDRESS</th>
                  <th className=" table-th ">ACTION</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.original.email}>
                      <td className="table-td">{row.original.rowIndex}</td>
                      <td className="table-td">{row.original.fname}</td>
                      <td className="table-td">{row.original.phone}</td>
                      <td className="table-td">{row.original.email}</td>
                      {/* <td className="table-td">{row.original.dob}</td> */}
                      <td className="table-td">{row.original.gender}</td>
                      <td className="table-td">{row.original.address}</td>
                      <td className="table-td">
                        <div className="d-flex justify-around rtl-space-x-reverse">
                          <Tooltip
                            content="Update"
                            placement="top"
                            arrow
                            animation="shift-away"
                          >
                            <Link
                              to={`/update?email=${row.original.email}`}
                              className="action-btn"
                            >
                              <Icon icon="heroicons:pencil-square" />
                            </Link>
                          </Tooltip>
                          &nbsp;&nbsp;
                          <Tooltip
                            content="View"
                            placement="top"
                            arrow
                            animation="shift-away"
                          >
                            <button
                              className="action-btn"
                              type="button"
                              onClick={() => handleView(row.original.email)}
                            >
                              <Icon icon="heroicons:eye" />
                            </button>
                          </Tooltip>
                          &nbsp;&nbsp;
                          {Current_user === "superadmin" && (
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
                                onClick={() => handleDelete(row.original.email)}
                              >
                                <Icon icon="heroicons:trash" />
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => exportData("pdf")}
            className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportData("csv")}
            className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
          >
            Export CSV
          </button>
        </div>
        <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <Icon icon="heroicons:chevron-double-left-solid" />
            </button>
          </li>
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
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
              className={` ${
                !canNextPage ? "opacity-50 cursor-not-allowed" : ""
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
              className={` ${
                !canNextPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Icon icon="heroicons:chevron-double-right-solid" />
            </button>
          </li>
        </ul>
      </div>
      {/*end*/}
    </>
  );
};

export default PatientTable;
