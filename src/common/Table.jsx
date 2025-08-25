import { useState, useMemo, useEffect } from "react";

function Table({
  title = "Table",
  fields = [],
  data = [],
  rowsPerPage = 5,
  showSearch = false,
  serverPagination = false,
  currentPage: controlledPage = 1,
  totalCount = 0,
  onPageChange,
  onSearch,
  loading = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [internalPage, setInternalPage] = useState(1);
  const isControlled = serverPagination && typeof onPageChange === "function";

  const activePage = isControlled ? controlledPage : internalPage;

  // Debounce search for server mode
  useEffect(() => {
    if (isControlled && typeof onSearch === "function") {
      const delay = setTimeout(() => {
        onSearch(searchTerm.trim());
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [searchTerm, isControlled, onSearch]);

  const filteredData = useMemo(() => {
    if (isControlled) return data;
    if (!showSearch || searchTerm.trim() === "") return data;
    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data, showSearch, isControlled]);

  const totalPages = useMemo(() => {
    return isControlled
      ? Math.ceil(totalCount / rowsPerPage)
      : Math.ceil(filteredData.length / rowsPerPage);
  }, [isControlled, totalCount, rowsPerPage, filteredData.length]);

  const paginatedData = useMemo(() => {
    if (isControlled) return filteredData;
    const start = (activePage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [activePage, filteredData, rowsPerPage, isControlled]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isControlled) setInternalPage(1);
    else if (typeof onPageChange === "function") onPageChange(1);
  };

  const handlePageChange = (newPage) => {
    if (isControlled) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md w-full">
      {/* Title + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        )}
      </div>

      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              {fields.map((field) => (
                <th key={field.key} className="px-4 py-2 text-left">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-6"></div>
                  </td>
                  {fields.map((field, i) => (
                    <td key={i} className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    {(activePage - 1) * rowsPerPage + index + 1}
                  </td>
                  {fields.map((field) => (
                    <td key={field.key} className="px-4 py-2">
                      {field.render
                        ? field.render(row[field.key], row)
                        : row[field.key] || "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={fields.length + 1}
                  className="text-center py-4 text-gray-500"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
        <div className="flex justify-end mt-4 space-x-2 overflow-x-auto">
          <button
            onClick={() => handlePageChange(Math.max(activePage - 1, 1))}
            disabled={activePage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                activePage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(Math.min(activePage + 1, totalPages))
            }
            disabled={activePage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
    </div>
  );
}

export default Table;
