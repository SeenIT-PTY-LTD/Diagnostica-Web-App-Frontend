import Table from "../../../common/Table";
import usePatients from "../../../hooks/usePatients";

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
];

function RecentPatients() {
  const page = 1;
  const pageSize = 5;

  const { data, loading, error, dashboardCount } = usePatients(page, pageSize);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="p-4 rounded-md text-sm"
            style={{
              backgroundColor: "rgb(180 194 253 / var(--tw-bg-opacity))",
            }}
          >
            <p className="text-gray-800 font-medium">Total Doctors</p>
            <p className="text-lg font-bold">{dashboardCount?.doctorCount}</p>
          </div>

          <div
            className="p-4 rounded-md text-sm"
            style={{
              backgroundColor: "rgb(209 218 254 / var(--tw-bg-opacity))",
            }}
          >
            <p className="text-gray-800 font-medium">Total Patients</p>
            <p className="text-lg font-bold">{dashboardCount?.patientCount}</p>
          </div>
        </div>
      </div>
      <Table
        title="Recent Patients"
        fields={fields}
        data={data}
        rowsPerPage={pageSize}
        loading={loading}
      />
    </>
  );
}

export default RecentPatients;
