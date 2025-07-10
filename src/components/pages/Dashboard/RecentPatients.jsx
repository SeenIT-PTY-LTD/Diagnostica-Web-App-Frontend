import Table from "../../../common/Table";

const patients = [
  {
    id: 1,
    patient: "Snehal",
    phone: "7020713132",
    dob: "24-06-1998",
    gender: "Female",
    address: "",
    image: "",
  },
  {
    id: 2,
    patient: "Kunal",
    phone: "8319808016",
    dob: "18-06-1999",
    gender: "Male",
    address: "Pune",
  },
  {
    id: 3,
    patient: "Ravi",
    phone: "9000000000",
    dob: "12-11-1992",
    gender: "Male",
    address: "Mumbai",
  },
  {
    id: 4,
    patient: "Neha",
    phone: "9123456789",
    dob: "10-01-1990",
    gender: "Female",
    address: "Nashik",
  },
  {
    id: 5,
    patient: "Ajay",
    phone: "7020719999",
    dob: "01-05-1995",
    gender: "Male",
    address: "Nagpur",
  },
  {
    id: 6,
    patient: "Pooja",
    phone: "9876543210",
    dob: "11-11-1997",
    gender: "Female",
    address: "Pune",
  },
];

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
  { key: "patient", label: "Patient" },
  { key: "phone", label: "Phone" },
  { key: "dob", label: "DOB" },
  { key: "gender", label: "Gender" },
  { key: "address", label: "Address" },
];

function RecentPatients() {
  const doctorCount = 5;
  const patientCount = patients.length;

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
            <p className="text-lg font-bold">{doctorCount}</p>
          </div>

          <div
            className="p-4 rounded-md text-sm"
            style={{
              backgroundColor: "rgb(209 218 254 / var(--tw-bg-opacity))",
            }}
          >
            <p className="text-gray-800 font-medium">Total Patients</p>
            <p className="text-lg font-bold">{patientCount}</p>
          </div>
        </div>
      </div>

      <Table
        title="Recent Patients"
        fields={fields}
        data={patients}
        rowsPerPage={3}
      />
    </>
  );
}

export default RecentPatients;
