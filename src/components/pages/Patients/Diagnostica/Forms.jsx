import { useCallback, useEffect, useState } from "react";
import Card from "../../../../common/Card";
import { footAndAnkelsOptions } from "./Options";
import { createDiagnostic } from "../../../../redux/features/diagnostica/Diagnostica";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../../../common/ShowToast";

const DiagnosticaCodeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    code: "",
    side: "",
    aetiology: "",
    disease: "",
    condition: "",
    region: "",
    bones: "",
    ligaments: "",
    tendons: "",
    nerves: "",
    joints: "",
    skin: "",
    fracture: "",
    ligament: "",
    tendinopathy: "",
    osteoarthritis: "",
    inflammatoryArthritis: "",
    misc: "",
    joint: "",
    softTissue: "",
    boneLesion: "",
    neurological: "",
    Score_1: "",
    Score_2: "",
    Score_3: "",
    patient: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateCode = useCallback(() => {
    let code = "";

    if (formData.side) code += `:${formData.side}`;
    if (formData.disease) code += `${formData.disease}`;
    if (formData.condition) code += `${formData.condition}`;
    if (formData.region) code += `${formData.region}`;

    const anatomy = [
      formData.bones,
      formData.ligaments,
      formData.tendons,
      formData.nerves,
      formData.joints,
      formData.skin,
    ]
      .filter(Boolean)
      .join(" ");
    if (anatomy) code += ` ${anatomy}`;

    const step5 = [
      formData.fracture,
      formData.ligament,
      formData.tendinopathy,
      formData.osteoarthritis,
      formData.inflammatoryArthritis,
      formData.misc,
      formData.joint,
      formData.softTissue,
      formData.boneLesion,
      formData.neurological,
    ]
      .filter(Boolean)
      .join(" ");
    if (step5) code += ` ${step5}`;

    const step6 = [formData.Score_1, formData.Score_2, formData.Score_3]
      .filter(Boolean)
      .join(" ");
    if (step6) code += ` ${step6}`;

    if (formData.patient) code += `${formData.patient}`;

    return code;
  }, [
    formData.side,
    formData.disease,
    formData.condition,
    formData.region,
    formData.bones,
    formData.ligaments,
    formData.tendons,
    formData.nerves,
    formData.joints,
    formData.skin,
    formData.fracture,
    formData.ligament,
    formData.tendinopathy,
    formData.osteoarthritis,
    formData.inflammatoryArthritis,
    formData.misc,
    formData.joint,
    formData.softTissue,
    formData.boneLesion,
    formData.neurological,
    formData.Score_1,
    formData.Score_2,
    formData.Score_3,
    formData.patient,
  ]);

  const handleSubmit = () => {
    const finalCode = generateCode();

    const diagnosticData = {
      code: finalCode,
      doctorId: "657d3cc03100a7e6de4d9d39",
      step: step,
      patientId: patientId,
      comment: formData.comment,
      status: "Completed"
    };

    dispatch(createDiagnostic(diagnosticData))
      .unwrap()
      .then((res) => {
        showToast("success", res?.message);
      })
      .catch((err) => {
        showToast("error", err?.message);
      });
  };

  useEffect(() => {
    const finalCode = generateCode();
    setFormData((prev) => ({
      ...prev,
      code: finalCode,
    }));
  }, [generateCode, setFormData]);

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
              value={step >= 1 ? generateCode() : formData.code}
              placeholder="DIAGNOSTICA CODE"
              readOnly
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
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
                {footAndAnkelsOptions.form1.sides.map((side) => (
                  <label
                    key={side.value}
                    className="inline-flex items-center text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name="side"
                      value={side.value}
                      checked={formData.side === side.value}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">{side.label}</span>
                  </label>
                ))}
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

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-20">
                  {footAndAnkelsOptions.form2.map((option) => (
                    <label
                      key={option.option}
                      className="inline-flex items-center text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="aetiology"
                        value={option.option}
                        checked={formData.aetiology === option.option}
                        onChange={handleChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">{option.option}</span>
                    </label>
                  ))}
                </div>

                {formData.aetiology && (
                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Disease:
                      </label>
                      <select
                        name="disease"
                        value={formData.disease}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Disease</option>
                        {footAndAnkelsOptions.form2
                          .find((opt) => opt.option === formData.aetiology)
                          ?.disease.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    {footAndAnkelsOptions.form2.find(
                      (opt) => opt.option === formData.aetiology
                    )?.condition.length > 0 && (
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Condition:
                        </label>
                        <select
                          name="condition"
                          value={formData.condition}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Condition</option>
                          {footAndAnkelsOptions.form2
                            .find((opt) => opt.option === formData.aetiology)
                            ?.condition.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}
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
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Region...</option>
                {footAndAnkelsOptions.form3.foot.map((area) => (
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
                {/* Bones */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bones:
                  </label>
                  <select
                    name="bones"
                    value={formData.bones}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Bone</option>
                    {footAndAnkelsOptions.form4.bones.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ligaments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ligaments:
                  </label>
                  <select
                    name="ligaments"
                    value={formData.ligaments}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Ligament</option>
                    {footAndAnkelsOptions.form4.ligaments.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tendons */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tendons:
                  </label>
                  <select
                    name="tendons"
                    value={formData.tendons}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Tendon</option>
                    {footAndAnkelsOptions.form4.tendons.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nerves */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nerves:
                  </label>
                  <select
                    name="nerves"
                    value={formData.nerves}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Nerve</option>
                    {footAndAnkelsOptions.form4.nerves.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Joints */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Joints:
                  </label>
                  <select
                    name="joints"
                    value={formData.joints}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Joint</option>
                    {footAndAnkelsOptions.form4.joints.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skin */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Skin:
                  </label>
                  <select
                    name="skin"
                    value={formData.skin}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Skin Area</option>
                    {footAndAnkelsOptions.form4.skin.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 5:{" "}
                <span className="font-normal">
                  We assign letters for the individual conditions (Pathology),
                  AND The Diagnostica code would be further extended with a
                  description of the condition.
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fracture */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fracture:
                  </label>
                  <select
                    name="fracture"
                    value={formData.fracture}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Fracture</option>
                    {footAndAnkelsOptions.form5.fracture.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ligaments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ligaments:
                  </label>
                  <select
                    name="ligament"
                    value={formData.ligament}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Ligament</option>
                    {footAndAnkelsOptions.form5.ligament.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tedinopathy */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tedinopathy:
                  </label>
                  <select
                    name="tendinopathy"
                    value={formData.tendinopathy}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Tedinopathy</option>
                    {footAndAnkelsOptions.form5?.tendinopathy.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Osteoarthritis */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Osteoarthritis:
                  </label>
                  <select
                    name="osteoarthritis"
                    value={formData.osteoarthritis}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Osteoarthritis</option>
                    {footAndAnkelsOptions.form5?.osteoarthritis.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Inflammatory Arthiritis */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Inflammatory Arthiritis:
                  </label>
                  <select
                    name="inflammatoryArthritis"
                    value={formData.inflammatoryArthritis}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Arthiritis</option>
                    {footAndAnkelsOptions.form5?.inflammatoryArthritis.map(
                      (item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Misc */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Misc:
                  </label>
                  <select
                    name="misc"
                    value={formData.misc}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Misc</option>
                    {footAndAnkelsOptions.form5?.misc.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Joints */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Joints:
                  </label>
                  <select
                    name="joint"
                    value={formData.joint}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Joint</option>
                    {footAndAnkelsOptions.form5?.joint.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Soft tissue lesion */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Soft tissue lesion:
                  </label>
                  <select
                    name="softTissue"
                    value={formData.softTissue}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select softTissue</option>
                    {footAndAnkelsOptions.form5?.softTissue.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bone lesion */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bone lesion:
                  </label>
                  <select
                    name="boneLesion"
                    value={formData.boneLesion}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select boneLesion</option>
                    {footAndAnkelsOptions.form5?.boneLesion.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Neurological */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Neurological:
                  </label>
                  <select
                    name="neurological"
                    value={formData.neurological}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select neurological</option>
                    {footAndAnkelsOptions.form5?.neurological.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 6:{" "}
                <span className="font-normal">
                  The Diagnostica code can be extended to account for
                  comorbidity descriptors. We can use Charlson Comorbidity Index
                  (CCI) as the added descriptor.
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* SCORE 1 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SCORE 1:
                  </label>
                  <select
                    name="Score_1"
                    value={formData.Score_1}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Score 1</option>
                    {footAndAnkelsOptions.form6?.scores?.Score_1.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SCORE 2 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SCORE 2:
                  </label>
                  <select
                    name="Score_2"
                    value={formData.Score_2}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Score 2</option>
                    {footAndAnkelsOptions.form6?.scores?.Score_2.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SCORE 3 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SCORE 3&6:
                  </label>
                  <select
                    name="Score_3"
                    value={formData.Score_3}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Score 3&6</option>
                    {footAndAnkelsOptions.form6?.scores?.Score_3.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 7:{" "}
                <span className="font-normal">
                  If the Patient has surgery, then American Society of
                  Anaesthesiologists (ASA) Classifications can be added.
                </span>
              </p>

              <select
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Region...</option>
                {footAndAnkelsOptions.form7?.patient.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 8 && (
            <div className="mb-8">
              <p className="font-semibold text-sm text-gray-800 mb-4">
                STEP 8: <span className="font-normal">Comment section.</span>
              </p>

              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Enter your comments..."
                rows={4}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1 sm:flex-none sm:px-6"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            {step > 1 && (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1 sm:flex-none sm:px-6 order-first sm:order-none"
                onClick={() => setStep((prev) => prev - 1)}
              >
                Back
              </button>
            )}

            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1 sm:flex-none sm:px-6"
              onClick={() => {
                if (step < 8) {
                  setStep((prev) => prev + 1);
                } else {
                  handleSubmit();
                  console.log("Final Data Submitted:", {
                    ...formData,
                    code: generateCode(),
                  });
                }
              }}
              disabled={
                (step === 1 && !formData.side) ||
                (step === 2 &&
                  (!formData.aetiology ||
                    !formData.disease ||
                    (footAndAnkelsOptions.form2.find(
                      (opt) => opt.option === formData.aetiology
                    )?.condition.length > 0 &&
                      !formData.condition))) ||
                (step === 3 && !formData.region) ||
                (step === 4 &&
                  !formData.bones &&
                  !formData.ligaments &&
                  !formData.tendons &&
                  !formData.nerves &&
                  !formData.joints &&
                  !formData.skin) ||
                (step === 5 &&
                  !formData.fracture &&
                  !formData.ligament &&
                  !formData.osteoarthritis &&
                  !formData.inflammatoryArthritis &&
                  !formData.misc &&
                  !formData.joint &&
                  !formData.softTissue &&
                  !formData.boneLesion &&
                  !formData.neurological) ||
                (step === 6 &&
                  !formData.Score_1 &&
                  !formData.Score_2 &&
                  !formData.Score_3) ||
                (step === 7 && !formData.patient) ||
                (step === 8 && !formData.comment)
              }
            >
              {step === 8 ? "Submit" : "Next"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DiagnosticaCodeForm;
