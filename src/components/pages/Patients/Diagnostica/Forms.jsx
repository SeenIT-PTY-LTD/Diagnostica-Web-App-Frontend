import { useState } from "react";
import Card from "../../../../common/Card";

const DiagnosticaCodeForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    code: "",
    side: "",
    aetiology: "",
    area: "",
    bone: "",
    ligament: "",
    tendon: "",
    nerves: "",
    joints: "",
    skin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const anatomicalAreas = [
    { value: "head", label: "Head" },
    { value: "neck", label: "Neck" },
    { value: "torso", label: "Torso" },
    { value: "limb", label: "Limb" },
    // Add more if needed
  ];

  const displayCode = `:${
    formData.aetiology
      ? ` ${
          formData.aetiology.charAt(0).toUpperCase() +
          formData.aetiology.slice(1)
        }`
      : ""
  } :${formData.side ? ` ${formData.side.charAt(0).toUpperCase()}` : ""} :${
    formData.area ? ` ${formData.area.charAt(0).toUpperCase()}` : ""
  } :`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Diagnostica Code :
          </h2>

          <div className="mb-6">
            <label
              htmlFor="code"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              CODE :
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={step === 3 ? displayCode : formData.code}
              placeholder={step === 3 ? "" : "DIAGNOSTICA CODE"}
              disabled={step === 3}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {step === 1 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 1:{" "}
                <span className="font-normal">
                  We assign a region for the injury as it relates to standard
                  anatomical position, namely, RIGHT (R) or LEFT (L)
                </span>
              </p>

              <div className="flex items-center justify-center gap-10 mt-4">
                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="side"
                    value="left"
                    checked={formData.side === "left"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">LEFT</span>
                </label>

                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="side"
                    value="right"
                    checked={formData.side === "right"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">RIGHT</span>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 2:{" "}
                <span className="font-normal">
                  We assign a designator for aetiology.
                </span>
              </p>

              <div className="flex items-center justify-center gap-20 mt-4">
                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="aetiology"
                    value="acquired"
                    checked={formData.aetiology === "acquired"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Acquired</span>
                </label>

                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="aetiology"
                    value="congenital"
                    checked={formData.aetiology === "congenital"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Congenital</span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 3:{" "}
                <span className="font-normal">
                  The anatomic area is given a designator.
                </span>
              </p>

              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {anatomicalAreas.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 4:{" "}
                <span className="font-normal">
                  The individual structures are categorized. Choose values from
                  each dropdown.
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="bone"
                  value={formData.bone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Bone</option>
                  <option value="humerus">Humerus</option>
                  <option value="femur">Femur</option>
                  <option value="tibia">Tibia</option>
                </select>

                <select
                  name="ligament"
                  value={formData.ligament}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Ligament</option>
                  <option value="acl">ACL</option>
                  <option value="pcl">PCL</option>
                </select>

                <select
                  name="tendon"
                  value={formData.tendon}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Tendon</option>
                  <option value="achilles">Achilles</option>
                  <option value="patellar">Patellar</option>
                </select>

                <select
                  name="nerves"
                  value={formData.nerves}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Nerve</option>
                  <option value="sciatic">Sciatic</option>
                  <option value="ulnar">Ulnar</option>
                </select>

                <select
                  name="joints"
                  value={formData.joints}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Joint</option>
                  <option value="knee">Knee</option>
                  <option value="elbow">Elbow</option>
                </select>

                <select
                  name="skin"
                  value={formData.skin}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Skin Area</option>
                  <option value="scalp">Scalp</option>
                  <option value="forearm">Forearm</option>
                </select>
              </div>
            </div>
          )}

          <div
            className={`flex ${
              step === 1 ? "justify-between" : "justify-evenly"
            }`}
          >
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                // Cancel logic
              }}
            >
              Cancel
            </button>

            {step > 1 && (
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setStep((prev) => prev - 1)}
              >
                Back
              </button>
            )}

            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                if (step < 4) {
                  setStep((prev) => prev + 1);
                } else {
                  console.log("Final Data Submitted:", formData);
                  // Perform submission here
                }
              }}
            >
              {step === 4 ? "Submit" : "Next"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DiagnosticaCodeForm;
