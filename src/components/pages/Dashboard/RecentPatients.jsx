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

  const { data, loading, error } = usePatients(page, pageSize);

  if (error) return <p>Error: {error}</p>;

  return (
    <Table
      title="Recent Patients"
      fields={fields}
      data={data}
      rowsPerPage={pageSize}
      loading={loading}
    />
  );
}

export default RecentPatients;
