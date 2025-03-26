import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../host";

function Diagnostica({ token }) {
  const [Data, setData] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const email1 = new URLSearchParams(location.search).get("email");
  const decodedToken = token ? jwtDecode(token) : null;
  const doctor = decodedToken.email;
  const [refresh, setRefresh] = useState(false);

  const openNewTab = () => {
    navigate(`/step1?email=${email1}&doctor=${doctor}`);
    // window.open(`step1?email=${email1}&doctor=${doctor}`);
  };

  const fetchRef = useRef(false); // Prevents re-fetching

  useEffect(() => {
    if (email1 && !fetchRef.current) {
      fetchRef.current = true; // Mark as fetched
      axios
        .get(`${API}/getdatas?email=${email1}`)
        .then((response) => {
          setData(response.data);
          setRefresh(!refresh);
          if (response.data.length > 0) {
            // Data is available, hide the button
            setShowButton(false);
            localStorage.setItem('userData', JSON.stringify(response.data));
          }
        })
        .catch((error) => {
          console.error("Error fetching answers:", error);
        });
    }
  }, [email1]);

  const stepStyles = {
    fontWeight: "bold",
    fontSize: "15px",
    paddingBottom: "5px",
  };

  const ScoreStyles = {
    fontWeight: "bold",
    fontSize: "12px",
    paddingBottom: "5px",
  };

  const flexContainerStyles = {
    fontSize: "14px",
  };

  const flexContainerStyles1 = {
    fontSize: "14px",
    width: "30px",
    textAlign: "left",
  };

  return (
    <div>
      {showButton && (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={openNewTab}
          >
            DIAGNOSTICA
          </button>
          <br />
          <br />
          {/* <p>Redirect to New Tab</p> */}
        </div>
      )}

      {Data.length > 0 && (
        <div>
          <div className="flex gap-7">
            <p>
              <b>Data from the API:</b>
            </p>

            <ul>
              {Data.map((item, index) => (
                <li key={index}>
                  <p>
                    <b>Data:</b> {item.data}
                  </p>
                  <p>
                    <b>Comment:</b> {item.comment}
                  </p>
                  <p>
                    <b>Doctor:</b> {item.doctor}
                  </p>
                  <p>
                    <b>Date:</b> {item.date}
                  </p>
                  <p>
                    <b>Time:</b> {item.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-6 py-5">
              <div className="col-span-3">
                <p style={stepStyles} className="mb-2">
                  STEP 1 :
                </p>
                <div className="flex">
                  <p style={flexContainerStyles1}>L</p>
                  <p style={flexContainerStyles}>: Left</p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles1}>R</p>
                  <p style={flexContainerStyles}>: Right</p>
                </div>
              </div>

              <div className="col-span-6">
                <p style={stepStyles} className="mb-2">
                  STEP 2 :
                </p>

                <div className="flex justify-between">
                  <div>
                    <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                      Acquired (Acq)
                    </p>
                    <div className="flex">
                      <p style={flexContainerStyles1}>T</p>
                      <p style={flexContainerStyles}>: Traumatic (T)</p>
                    </div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>I</p>
                      <p style={flexContainerStyles}>: Infective (I)</p>
                    </div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>M/E</p>
                      <p style={flexContainerStyles}>: Metabolic/Endocrine</p>
                    </div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>F</p>
                      <p style={flexContainerStyles}>: Inflammatory (F)</p>
                    </div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>D</p>
                      <p style={flexContainerStyles}>: Degenerative (D)</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>G</p>
                      <p style={flexContainerStyles}>: Iatrogenic (G)</p>
                    </div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>P</p>
                      <p style={flexContainerStyles}>: Idiopathic (P)</p>
                    </div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>A</p>
                      <p style={flexContainerStyles}>: Acute(A)</p>
                    </div>
                    <div className="flex">
                      <p style={flexContainerStyles1}>C</p>
                      <p style={flexContainerStyles}>: Chronic (C)</p>
                    </div>
                  </div>

                  <div>
                    <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                      Congential (Con)
                    </p>
                    <div className="flex">
                      <p style={flexContainerStyles1}>C</p>
                      <p style={flexContainerStyles}>: Chronic (C)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <p style={stepStyles} className="mb-2">
                  STEP 3 :
                </p>
                <div className="flex">
                  <p style={flexContainerStyles1}>1 </p>
                  <p style={flexContainerStyles}>: 1-Forefoot</p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles1}>2 </p>
                  <p style={flexContainerStyles}>: 2-Midfoot</p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles1}>3 </p>
                  <p style={flexContainerStyles}>: 3-Hindfoot</p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles1}>4 </p>
                  <p style={flexContainerStyles}>: 4-Ankle</p>
                </div>
              </div>
            </div>

            <div className="py-4">
              <p style={stepStyles}>STEP : 4.1 Forefoot</p>
              <div className="grid grid-cols-12 gap-6 py-2">
                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    1 Bone{" "}
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    {" "}
                    1 Ligament
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    1 Tendon
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    1 Nerve
                  </p>
                </div>
              </div>
              <p style={stepStyles}>STEP : 4.2 Midfoot</p>
              <div className="grid grid-cols-12 gap-6 py-2">
                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    2 Bone{" "}
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    {" "}
                    2 Ligament
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    2 Tendon
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    2 Nerve
                  </p>
                </div>
              </div>
              <p style={stepStyles}>STEP : 4.3 Hindfoot</p>
              <div className="grid grid-cols-12 gap-6 py-2">
                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    3 Bone{" "}
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    {" "}
                    3 Ligament
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    3 Tendon
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    3 Nerve
                  </p>
                </div>
              </div>
              <p style={stepStyles}>STEP : 4.4 Ankle</p>
              <div className="grid grid-cols-12 gap-6 py-2">
                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    4 Bone{" "}
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    {" "}
                    4 Ligament
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    4 Tendon
                  </p>
                </div>

                <div className="col-span-3">
                  <p style={ScoreStyles} className="mb-1">
                    4 Nerve
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 py-4">
              <div className="col-span-3">
                <p style={stepStyles} className="mb-2">
                  Skin:
                </p>
                <p style={flexContainerStyles}>(Skin : 5)-Skin</p>
                <p style={flexContainerStyles}>(Fat : 5)-Fat </p>
                <p style={flexContainerStyles}>(Fascia : 5)-Fascia</p>
              </div>

              {/* <div className='col-span-3'>
                <p style={stepStyles} className='mb-2'>STEP 5 :</p>
                <div className='flex'><p style={flexContainerStyles1}>1 </p><p style={flexContainerStyles}>: 1-Forefoot</p></div>
                <div className='flex'><p style={flexContainerStyles1}>2 </p><p style={flexContainerStyles}>: 2-Midfoot</p></div>
                <div className='flex'><p style={flexContainerStyles1}>3 </p><p style={flexContainerStyles}>: 3-Hindfoot</p></div>
                <div className='flex'><p style={flexContainerStyles1}>4 </p><p style={flexContainerStyles}>: 4-Ankle</p></div>
              </div> */}
            </div>

            <div className="grid grid-cols-12 gap-6 py-4">
              <div className="col-span-12">
                <p style={stepStyles} className="mb-2">
                  STEP : 5
                </p>
                <div className="flex justify-between">
                  <div>
                    <p style={stepStyles} className="mb-2">
                      Fracture :
                    </p>
                    <p style={flexContainerStyles}>(C : F)-Closed</p>
                    <p style={flexContainerStyles}>(O : F)-Open</p>
                    <p style={flexContainerStyles}>(NU : F)-Non Union</p>
                    <p style={flexContainerStyles}>(St : F)-Stress</p>
                    <p style={flexContainerStyles}>
                      (F/D : F)-Fracture/Dislocation
                    </p>
                    <p style={flexContainerStyles}>(Avu : F)-Avulsion</p>
                    <p style={flexContainerStyles}>(P : F)-Pathological</p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Ligament :
                    </p>
                    <p style={flexContainerStyles}>(S : L)-Sprain</p>
                    <p style={flexContainerStyles}>(T : L)-Sprain</p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Tedinopathy :
                    </p>
                    <p style={flexContainerStyles}>(Tr : T)-Traumatic</p>
                    <p style={flexContainerStyles}>(De : T)-Degenerative</p>
                    <p style={flexContainerStyles}>(In : T)-Inflammatory</p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Osteoarthiritis :
                    </p>
                    <p style={flexContainerStyles}>(De : OA)-Degenerative</p>
                    <p style={flexContainerStyles}>(PT : OA)-Posttraumatic</p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Inflammatoryarthiritis :
                    </p>
                    <p style={flexContainerStyles}>(Rhe : IA)-Rheumatoid</p>
                    <p style={flexContainerStyles}>(Pso: IA)-Posriatic</p>
                    <p style={flexContainerStyles}>(Ser: IA)-Seronegative</p>
                    <p style={flexContainerStyles}>(Re: IA)-Reactive</p>
                    <p style={flexContainerStyles}>
                      (S/A: IA)-Septic Arthiritis
                    </p>
                    <p style={flexContainerStyles}>
                      (C/A: IA)-Crystaline arthropathy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 py-4">
              <div className="col-span-12">
                <div className="flex justify-between">
                  <div>
                    <p style={stepStyles} className="mb-2">
                      Misc :
                    </p>
                    <p style={flexContainerStyles}>(Fb: M)-Foregin bony</p>
                    <p style={flexContainerStyles}>(IGTN: M)-IGTN</p>
                    <p style={flexContainerStyles}>(Cal: M)-Callus</p>
                    <p style={flexContainerStyles}>(Co: M)-Corn</p>
                    <p style={flexContainerStyles}>(Wt: M)-Wart</p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Joint :
                    </p>
                    <p style={flexContainerStyles}>
                      (ImST: J)-Impingement soft tissue
                    </p>
                    <p style={flexContainerStyles}>(ImB: J)-Impingment bone</p>
                    <p style={flexContainerStyles}>(OCD: J)-OCD</p>
                    <p style={flexContainerStyles}>(H: J)-Hammer</p>
                    <p style={flexContainerStyles}>(M: J)-Mallet</p>
                    <p style={flexContainerStyles}>(Cl: J)-Claw</p>
                    <p style={flexContainerStyles}>(Vr: J)-Varus</p>
                    <p style={flexContainerStyles}>(M: J)-Valgus</p>
                    <p style={flexContainerStyles}>
                      (c_f: J)-Coalition-fibrosis
                    </p>
                    <p style={flexContainerStyles}>(c_b: J)-Coalition_bone</p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Soft Tissue :
                    </p>
                    <p style={flexContainerStyles}>(Li : Stl)-Lipoma</p>
                    <p style={flexContainerStyles}>(Fb : Stl)-Fibroma</p>
                    <p style={flexContainerStyles}>(Gg : Stl)-Ganglion</p>
                    <p style={flexContainerStyles}>(U : Stl)-Ulcer</p>
                    <p style={flexContainerStyles}>(Ne : Stl)-Neuroma</p>
                    <p style={flexContainerStyles}>
                      (P_f : Stl)-Perineural fibroma
                    </p>
                    <p style={flexContainerStyles}>(Sr : Stl)-Sarcoma</p>
                    <p style={flexContainerStyles}>
                      (S/A : Stl)-Septic Arthiritis
                    </p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Bonelesion :
                    </p>
                    <p style={flexContainerStyles}>(Om : Bl)-Osteomyelitis</p>
                    <p style={flexContainerStyles}>(Os: Bl)-Osteosarcoma</p>
                    <p style={flexContainerStyles}>(GCT: Bl)-GCT</p>
                    <p style={flexContainerStyles}>(Oo : Bl)-Osteoid osteoma</p>
                    <p style={flexContainerStyles}>(En: Bl)-Enchondroma</p>
                    <p style={flexContainerStyles}>(Me: Bl)-Metastasis</p>
                    <p style={flexContainerStyles}>(BC: Bl)-Bone Cyst</p>
                    <p style={flexContainerStyles}>(OCD: Bl)-OCD</p>
                    <p style={flexContainerStyles}>
                      (St Re: Bl)-Stress Response
                    </p>
                    <p style={flexContainerStyles}>
                      (TmO: Bl)-Transient marrow Oedema
                    </p>
                    <p style={flexContainerStyles}>(AVN: Bl)-AVN</p>
                  </div>

                  <div>
                    <p style={stepStyles} className="mb-2">
                      Neurological :
                    </p>
                    <p style={flexContainerStyles}>
                      (Ca : N)-Charcot arthropathy
                    </p>
                    <p style={flexContainerStyles}>(Rd : N)-Radiculopathy</p>
                    <p style={flexContainerStyles}>(CRPS: Bl)-CRPS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4">
              <p style={stepStyles}>STEP : 6</p>
              <div className="grid grid-cols-12 gap-6 py-2">
                <div className="col-span-4">
                  <p style={ScoreStyles} className="mb-1">
                    SCORE 1{" "}
                  </p>
                  <div className="flex">
                    <p style={flexContainerStyles1}>M</p>{" "}
                    <p style={flexContainerStyles}>
                      : Myocardial infarction (M)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>C</p>{" "}
                    <p style={flexContainerStyles}>
                      : Congestive heart failure (C)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>P</p>{" "}
                    <p style={flexContainerStyles}>
                      : Peripheral vascular disease (P)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>CD</p>{" "}
                    <p style={flexContainerStyles}>
                      : Cerebrovascular disease (CD)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>D</p>{" "}
                    <p style={flexContainerStyles}>: Dementia (D)</p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>CP</p>{" "}
                    <p style={flexContainerStyles}>
                      : Chronic pulmonary disease (CP)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>R</p>{" "}
                    <p style={flexContainerStyles}>
                      : Rheumatologic disease (R)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>PU</p>{" "}
                    <p style={flexContainerStyles}>
                      : Peptic ulcer disease (PU)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>L</p>{" "}
                    <p style={flexContainerStyles}>
                      : Liver disease (mild) (L)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>DC</p>{" "}
                    <p style={flexContainerStyles}>
                      : Diabetes (controlled) (DC)
                    </p>
                  </div>
                </div>

                <div className="col-span-4">
                  <p style={ScoreStyles} className="mb-1">
                    SCORE 2
                  </p>
                  <div className="flex">
                    <p style={flexContainerStyles1}>H</p>
                    <p style={flexContainerStyles}>: Hemiplegia (H)</p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>P</p>
                    <p style={flexContainerStyles}>: Paraplegia (P)</p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>R</p>
                    <p style={flexContainerStyles}>: Renal disease (R)</p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>M</p>
                    <p style={flexContainerStyles}>
                      : Malignancy (localized) (M)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>L</p>
                    <p style={flexContainerStyles}>: Leukemia (L)</p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>LY</p>
                    <p style={flexContainerStyles}>: Lymphoma (LY)</p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>D</p>
                    <p style={flexContainerStyles}>
                      : Diabetes (uncontrolled) (D)
                    </p>
                  </div>
                </div>

                <div className="col-span-4">
                  <p style={ScoreStyles} className="mb-1">
                    SCORE 3
                  </p>
                  <div className="flex">
                    <p style={flexContainerStyles1}>L3</p>
                    <p style={flexContainerStyles}>
                      : Liver disease (moderate/severe) (L3)
                    </p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>A6</p>
                    <p style={flexContainerStyles}>: AIDS (A6)</p>
                  </div>
                  <div className="flex">
                    <p style={flexContainerStyles1}>M6</p>
                    <p style={flexContainerStyles}>
                      : Malignancy (metastatic tumour) (M6)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <p style={stepStyles} className="mb-2">
                  STEP : 7
                </p>
                <div className="flex">
                  <p style={flexContainerStyles}>ASA1</p>
                  <p style={flexContainerStyles}>
                    {" "}
                    : ASA 1 – Normal healthy patient
                  </p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles}>ASA2</p>
                  <p style={flexContainerStyles}>
                    {" "}
                    : ASA 2 – Patient with mild systemic disease
                  </p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles}>ASA3</p>
                  <p style={flexContainerStyles}>
                    {" "}
                    : ASA 3 – Patient with severe systemic disease
                  </p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles}>ASA4</p>
                  <p style={flexContainerStyles}>
                    {" "}
                    : ASA 4 – Patient with severe systemic disease that is a
                    constant threat to life
                  </p>
                </div>
                <div className="flex">
                  <p style={flexContainerStyles}>ASA5</p>
                  <p style={flexContainerStyles}>
                    {" "}
                    : ASA 5 – Moribund patient who is not expected to survive
                    without the operation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Diagnostica;
