import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Textinput from '../../components/ui/Textinput';
import Card from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Select from "react-select";


function Page5() {

    const navigate = useNavigate()
    const location = useLocation();
    const defaultValue = new URLSearchParams(location.search).get('defaultValue');
    const email = new URLSearchParams(location.search).get('email');
    const doctor =new URLSearchParams(location.search).get('doctor');

    const [Fracture, setFracture] = useState(null);
    const [Ligament,setLigament] = useState(null)
    const [Tedino, setTedino] = useState(null)
    const [Osteo, setOsteo] = useState(null)
    const [Inflammatory,setInflammatory] = useState(null)
    const [Misc,setMisc] = useState(null)
    const [Joint, setJoint] = useState(null)
    const [Softtissue,setSofttissue] = useState(null)
    const[Bonelesion,setBonelesion] = useState(null)
    const [Neuro,setNeuro] = useState(null)
   
    const fracture = [
        { value: "(C : F)", label: "Closed" },
        { value: "(O : F)", label: "Open" },
        { value: "(NU : F)", label: "Non Union" },
        { value: "(St : F)", label: "Stress" },
        { value: "(F/D: F)", label: "Fracture/Dislocation" },
        { value: "(Avu : F)", label: "Avulsion" },
        { value: "(P : F)", label: "Pathological" },
    ]

    const ligament = [
        { value: ": (S : L)", label: "Sprain" },
        { value: ": (T: L)", label: "Tear" },
    ]

    const tedinopathy = [
        { value: ": (Tr : T)", label: "Traumatic" },
        { value: ": (De: T)", label: "Degenerative" },
        { value: ": (In: T)", label: "Inflammatory" },
    ]

    const osteoarthiritis = [
        { value: ": (De: OA)", label: "Degenerative" },
        { value: ": (PT: OA)", label: "Posttraumatic" },
    ]

    const inflammatoryarthiritis = [
        { value: ": (Rhe: IA)", label: "Rheumatoid" },
        { value: ": (Pso: IA)", label: "Posriatic" },
        { value: ": (Ser: IA)", label: "Seronegative" },
        { value: ": (Re: IA)", label: "Reactive" },
        { value: ": (S/A: IA)", label: "Septic Arthiritis" },
        { value: ": (C/A: IA)", label: "Crystaline arthropathy" },
    ]

    const misc = [
        { value: ": (Fb: M)", label: "Foregin bony" },
        { value: ": (IGTN: M)", label: "IGTN" },
        { value: ": (Cal: M)", label: "Callus" },
        { value: ": (Co: M)", label: "Corn" },
        { value: ": (Wt: M)", label: "Wart" },
       ]

       const joint = [
        { value: ": (ImST: J)", label: "Impingement soft tissue" },
        { value: ": (ImB: J)", label: "Impingement bone" },
        { value: ": (OCD: J)", label: "OCD" },
        { value: ": (H: J)", label: "Hammer" },
        { value: ": (M: J)", label: "Mallet" },
        { value: ": (Cl: J)", label: "Claw" },
        { value: ": (Vr: J)", label: "Varus" },
        { value: ": (Vl: J)", label: "Valgus" },
        { value: ": (c_f: J)", label: "Coalition-fibrosis" },
        { value: ": (c_b: J)", label: "Coalition-bone" },
       ]

       const softtissue = [
        { value: ": (Li: Stl)", label: "Lipoma" },
        { value: ": (Fb: Stl)", label: "Fibroma" },
        { value: ": (Gg: Stl)", label: "Ganglion" },
        { value: ": (U: Stl)", label: "Ulcer" },
        { value: ": (Ne: Stl)", label: "Neuroma" },
        { value: ": (P_f: Stl)", label: "Perineural fibroma" },
        { value: ": (Sr: Stl)", label: "Sarcoma" },
        { value: ": (S/A: Stl)", label: "Septic arthiritis" },
       ]

       const bonelesion = [
        { value: ": (Om: Bl)", label: "Osteomyelitis" },
        { value: ": (Os: Bl)", label: "Osteosarcoma" },
        { value: ": (GCT: Bl)", label: "GCT" },
        { value: ": (Oo: Bl)", label: "Osteoid osteoma" },
        { value: ": (En: Bl)", label: "Enchondroma" },
        { value: ": (Me: Bl)", label: "Metastasis" },
        { value: ": (BC: Bl)", label: "Bone Cyst" },
        { value: ": (OCD: Bl)", label: "OCD" },
        { value: ": (St Re: Bl)", label: "Stress Response" },
        { value: ": (TmO: Bl)", label: "Transient marrow Oedema" },
        { value: ": (AVN: Bl)", label: "AVN" },
       ]

       const neurological = [
        { value: ": (Ca: N)", label: "Charcot arthropathy" },
        { value: ": (Rd: N)", label: "Radiculopathy" },
        { value: ": (CRPS: N)", label: "CRPS" },
       ]

       const handleFracture = (selectedOption) => {
        setFracture(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleLigament = (selectedOption) => {
        setLigament(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleTedino = (selectedOption) => {
        setTedino(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleOsteo = (selectedOption) => {
        setOsteo(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleInflam = (selectedOption) => {
        setInflammatory(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleMisc = (selectedOption) => {
        setMisc(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleJoint = (selectedOption) => {
        setJoint(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleSofttissue = (selectedOption) => {
        setSofttissue(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleBonelesion = (selectedOption) => {
        setBonelesion(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

      const handleNeuro = (selectedOption) => {
        setNeuro(selectedOption);
        const newDefaultValue = selectedOption ? selectedOption.value : "";
      };

    const handleNext = () => {
        let combinedDefaultValue = defaultValue || ''; 

        const FractueValue = Fracture ? Fracture.value : "";
        const LigamentValue = Ligament ? Ligament.value : "";
        const TedinoValue = Tedino ? Tedino.value : "";
        const OsteoValue = Osteo ? Osteo.value : "";
        const InflammatoryValue = Inflammatory ? Inflammatory.value : "";
        const MiscValue = Misc ?Misc.value : "";
        const JointValue = Joint ? Joint.value : "";
        const SofttissueValue = Softtissue ? Softtissue.value : "";
        const BonelesionValue = Bonelesion ? Bonelesion.value : "";
        const NeuroValue =Neuro ?Neuro.value : "";
        combinedDefaultValue = `${combinedDefaultValue} [ ${FractueValue} ${LigamentValue} ${TedinoValue} ${OsteoValue} ${InflammatoryValue} ${MiscValue} ${JointValue} ${SofttissueValue} ${BonelesionValue} ${NeuroValue}]`;
  
        const updatedURL = `/step7?defaultValue=${combinedDefaultValue} &email=${email}&doctor=${doctor}`;

        navigate(updatedURL);
    };

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };
    const handleCancel = () => {
        window.location.reload();
    };

    const handleBack = () => {
        navigate(-1);
    };


    const buttons = [
        {
            title: "Cancel",
            onClick: handleCancel
        },

        {
            title: "Back",
            onClick: handleBack
        },
        {
            title: "Next",
            onClick: handleNext
        }
    ];

    return (
        <div>
            <div className="flex justify-between flex-wrap items-center mb-10">
                <h4 className="font-medium lg:text-2xl text-xl active capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                    Diagnostica Code :
                </h4>
            </div>
            <Card>
                <div className="space-y-8 px-8 py-8">
                    <Textinput
                        label="CODE :"
                        id="defaultsize2"
                        type="text"
                        placeholder="DIAGNOSTICA CODE"
                        horizontal
                        defaultValue={`${defaultValue}  `}

                    />
                </div>

                <div className="space-y-10 px-8 py-8">
                    <p><b>STEP 5:</b> We assign letters for the individual conditions (Pathology),<b> AND</b> The Diagnostica code would be further extended with a description of
                        the condition.</p>
                </div>

                <div className="grid grid-cols-3 gap-4 ">
                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleFracture}
                            options={fracture}
                            styles={styles}
                            placeholder='Fracture'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleLigament}
                            options={ligament}
                            styles={styles}
                            placeholder='Ligament'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleTedino}
                            options={tedinopathy}
                            styles={styles}
                            placeholder='Tedinopathy'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleOsteo}
                            options={osteoarthiritis}
                            styles={styles}
                            placeholder='Osteoarthiritis'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleInflam}
                            options={inflammatoryarthiritis}
                            styles={styles}
                            placeholder='Inflammatory Arthiritis'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleMisc}
                            options={misc}
                            styles={styles}
                            placeholder='Misc'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleJoint}
                            options={joint}
                            styles={styles}
                            placeholder='Joints'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleSofttissue}
                            options={softtissue}
                            styles={styles}
                            placeholder='Soft tissue lesion'
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleBonelesion}
                            options={bonelesion}
                            styles={styles}
                            placeholder='Bone lesion '
                            id="hh"
                        />
                    </div>

                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={handleNeuro}
                            options={neurological}
                            styles={styles}
                            placeholder='Neurological'
                            id="hh"
                        />
                    </div>

                </div>
                <br />
                <br />

                <div className="flex justify-around">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            type="button"
                            className="btn btn-primary"
                            onClick={button.onClick}
                        >
                            {button.title}
                        </button>
                    ))}
                </div>


            </Card >
        </div >


    );
}

export default Page5