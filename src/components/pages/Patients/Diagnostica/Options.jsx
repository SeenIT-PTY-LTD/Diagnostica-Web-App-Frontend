export const footAndAnkelsOptions = {
  // STEP 1: Side
  form1: {
    option: "Side",
    sides: [
      { value: "L", label: "LEFT" },
      { value: "R", label: "RIGHT" },
    ],
  },

  // STEP 2: Aetiology and Condition
  form2: [
    {
      option: "Acquired",
      disease: [
        { value: ": Acq : T :", label: "Traumatic (T)" },
        { value: ": Acq : I :", label: "Infective (I)" },
        { value: ": Acq : M/E :", label: "Metabolic/Endocrine (M/E)" },
        { value: ": Acq : F :", label: "Inflammatory (F)" },
        { value: ": Acq : D :", label: "Degenerative (D)" },
        { value: ": Acq : G :", label: "Iatrogenic (G)" },
        { value: ": Acq : P :", label: "Idiopathic (P)" },
      ],
      condition: [
        { value: "A :", label: "Acute (A)" },
        { value: "C :", label: "Chronic (C)" },
      ],
    },
    {
      option: "Congenital",
      disease: [
        { value: ": Con : C :", label: "Congenital (Con) - Chronic (C)" },
      ],
      condition: [],
    },
  ],

  // STEP 3: Foot region
  form3: {
    option: "Region",
    foot: [
      { value: "1 :", label: "1-Forefoot" },
      { value: "2 :", label: "2-Midfoot" },
      { value: "3 :", label: "3-Hindfoot" },
      { value: "4 :", label: "4-Ankle" },
    ],
  },

  // STEP 4: Anatomical structure
  form4: {
    option: "Anatomy",
    bones: [
      { value: "(C1:1)", label: "C1" },
      { value: "(C2:1)", label: "C2" },
      { value: "(C3:1)", label: "C3" },
      { value: "(CB:1)", label: "CB" },
      { value: "(N:1)", label: "N" },
    ],
    ligaments: [{ value: "(LF:2)", label: "LF" }],
    tendons: [
      { value: "(EHL:3)", label: "EHL" },
      { value: "(EDL2:3)", label: "EDL2" },
      { value: "(EDL3:3)", label: "EDL3" },
      { value: "(EDL4:3)", label: "EDL4" },
      { value: "(EDL5:3)", label: "EDL5" },
      { value: "(FHL:3)", label: "FHL" },
      { value: "(FDL2:3)", label: "FDL2" },
      { value: "(FDL3:3)", label: "FDL3" },
      { value: "(FDL4:3)", label: "FDL4" },
      { value: "(FDL5:3)", label: "FDL5" },
    ],
    nerves: [{ value: "(DMC:4)", label: "DMC" }],
    joints: [
      { value: "(M1)", label: "M1" },
      { value: "(M2)", label: "M2" },
      { value: "(M3)", label: "M3" },
      { value: "(M4)", label: "M4" },
      { value: "(M5)", label: "M5" },
      { value: "(P11)", label: "P11" },
      { value: "(P12)", label: "P12" },
      { value: "(P21)", label: "P21" },
      { value: "(P22)", label: "P23" },
      { value: "(P23)", label: "P23" },
      { value: "(P31)", label: "P31" },
      { value: "(P32)", label: "P32" },
      { value: "(P33)", label: "P33" },
      { value: "(P41)", label: "P41" },
      { value: "(P42)", label: "P42" },
      { value: "(P43)", label: "P43" },
      { value: "(P51)", label: "P51" },
      { value: "(P52)", label: "P52" },
      { value: "(P53)", label: "P53" },
      { value: "(SM)", label: "SM" },
      { value: "(SL)", label: "SL" },
    ],
    skin: [
      { value: "(Skin:5)", label: "Skin" },
      { value: "(Fat:5)", label: "Fat" },
      { value: "(Fascia:5)", label: "Fascia" },
    ],
  },

  // STEP 5: Pathology type
  form5: {
    option: "Pathology",
    fracture: [
      { value: "(C : F)", label: "Closed" },
      { value: "(O : F)", label: "Open" },
      { value: "(NU : F)", label: "Non Union" },
      { value: "(St : F)", label: "Stress" },
      { value: "(F/D: F)", label: "Fracture/Dislocation" },
      { value: "(Avu : F)", label: "Avulsion" },
      { value: "(P : F)", label: "Pathological" },
    ],
    ligament: [
      { value: ": (S : L)", label: "Sprain" },
      { value: ": (T: L)", label: "Tear" },
    ],
    tendinopathy: [
      { value: ": (Tr : T)", label: "Traumatic" },
      { value: ": (De: T)", label: "Degenerative" },
      { value: ": (In: T)", label: "Inflammatory" },
    ],
    osteoarthritis: [
      { value: ": (De: OA)", label: "Degenerative" },
      { value: ": (PT: OA)", label: "Posttraumatic" },
    ],
    inflammatoryArthritis: [
      { value: ": (Rhe: IA)", label: "Rheumatoid" },
      { value: ": (Pso: IA)", label: "Psoriatic" },
      { value: ": (Ser: IA)", label: "Seronegative" },
      { value: ": (Re: IA)", label: "Reactive" },
      { value: ": (S/A: IA)", label: "Septic Arthritis" },
      { value: ": (C/A: IA)", label: "Crystalline Arthropathy" },
    ],
    misc: [
      { value: ": (Fb: M)", label: "Foreign bony" },
      { value: ": (IGTN: M)", label: "IGTN" },
      { value: ": (Cal: M)", label: "Callus" },
      { value: ": (Co: M)", label: "Corn" },
      { value: ": (Wt: M)", label: "Wart" },
    ],
    joint: [
      { value: ": (ImST: J)", label: "Impingement Soft Tissue" },
      { value: ": (ImB: J)", label: "Impingement Bone" },
      { value: ": (OCD: J)", label: "OCD" },
      { value: ": (H: J)", label: "Hammer" },
      { value: ": (M: J)", label: "Mallet" },
      { value: ": (Cl: J)", label: "Claw" },
      { value: ": (Vr: J)", label: "Varus" },
      { value: ": (Vl: J)", label: "Valgus" },
      { value: ": (c_f: J)", label: "Coalition - Fibrosis" },
      { value: ": (c_b: J)", label: "Coalition - Bone" },
    ],
    softTissue: [
      { value: ": (Li: Stl)", label: "Lipoma" },
      { value: ": (Fb: Stl)", label: "Fibroma" },
      { value: ": (Gg: Stl)", label: "Ganglion" },
      { value: ": (U: Stl)", label: "Ulcer" },
      { value: ": (Ne: Stl)", label: "Neuroma" },
      { value: ": (P_f: Stl)", label: "Perineural Fibroma" },
      { value: ": (Sr: Stl)", label: "Sarcoma" },
      { value: ": (S/A: Stl)", label: "Septic Arthritis" },
    ],
    boneLesion: [
      { value: ": (Om: Bl)", label: "Osteomyelitis" },
      { value: ": (Os: Bl)", label: "Osteosarcoma" },
      { value: ": (GCT: Bl)", label: "GCT" },
      { value: ": (Oo: Bl)", label: "Osteoid Osteoma" },
      { value: ": (En: Bl)", label: "Enchondroma" },
      { value: ": (Me: Bl)", label: "Metastasis" },
      { value: ": (BC: Bl)", label: "Bone Cyst" },
      { value: ": (OCD: Bl)", label: "OCD" },
      { value: ": (St Re: Bl)", label: "Stress Response" },
      { value: ": (TmO: Bl)", label: "Transient Marrow Oedema" },
      { value: ": (AVN: Bl)", label: "AVN" },
    ],
    neurological: [
      { value: ": (Ca: N)", label: "Charcot Arthropathy" },
      { value: ": (Rd: N)", label: "Radiculopathy" },
      { value: ": (CRPS: N)", label: "CRPS" },
    ],
  },

  // STEP 6
  form6: {
    scores: {
      Score_1: [
        { value: "M", label: "Myocardial infarction (M)" },
        { value: "C", label: "Congestive heart failure (C)" },
        { value: "P", label: "Peripheral vascular disease (P)" },
        { value: "CD", label: "Cerebrovascular disease (CD)" },
        { value: "D", label: "Dementia (D)" },
        { value: "CP", label: "Chronic pulmonary disease (CP)" },
        { value: "R", label: "Rheumatologic disease (R)" },
        { value: "PU", label: "Peptic ulcer disease (PU)" },
        { value: "L", label: "Liver disease (mild) (L)" },
        { value: "DC", label: "Diabetes (controlled) (DC)" },
      ],
      Score_2: [
        { value: "H", label: "Hemiplegia (H)" },
        { value: "P", label: "Paraplegia (P)" },
        { value: "R", label: "Renal disease (R)" },
        { value: "M", label: "Malignancy (localized) (M)" },
        { value: "L", label: "Leukemia (L)" },
        { value: "LY", label: "Lymphoma (LY)" },
        { value: "D", label: "Diabetes (uncontrolled) (D)" },
      ],
      Score_3: [
        { value: "L3", label: "Liver disease (moderate/severe) (L3)" },
        { value: "A6", label: "AIDS (A6)" },
        { value: "M6", label: "Malignancy (metastatic tumour) (M6)" },
      ],
    },
  },

  // STEP 7: Diagnosis

  form7: {
    patient: [
      { value: "ASA1", label: "ASA 1 – Normal healthy patient" },
      { value: "ASA2", label: "ASA 2 – Patient with mild systemic disease" },
      { value: "ASA3", label: "ASA 3 – Patient with severe systemic disease" },
      {
        value: "ASA4",
        label:
          "ASA 4 – Patient with severe systemic disease that is a constant threat to life",
      },
      {
        value: "ASA5",
        label:
          "ASA 5 – Moribund patient who is not expected to survive without the operation",
      },
    ],
  },
};

export function extractForm1(code) {
  if (!code) return "";
  if (code.includes("R")) return "R";
  if (code.includes("L")) return "L";
  return "";
}

export function extractForm2(code) {
  if (!code) return { aetiology: "", disease: "", condition: "" };

  // Default
  let aetiology = "";
  let disease = "";
  let condition = "";

  // Congenital (Con)
  if (code.includes(": Con :")) {
    aetiology = "Congenital";

    // Direct match for disease
    disease = ": Con : C :";

    // Condition is always Chronic for congenital in your config
    condition = "";
  }

  // Acquired (Acq)
  if (code.includes(": Acq :")) {
    aetiology = "Acquired";

    // Find disease match from your list
    const diseases = [
      ": Acq : T :",
      ": Acq : I :",
      ": Acq : M/E :",
      ": Acq : F :",
      ": Acq : D :",
      ": Acq : G :",
      ": Acq : P :",
    ];
    disease = diseases.find((d) => code.includes(d)) || "";

    // Find condition
    if (code.includes("A :")) condition = "A :";
    if (code.includes("C :")) condition = "C :";
  }

  return { aetiology, disease, condition };
}

export function extractForm3(code) {
  if (!code) return { region: "" };

  const regions = ["1 :", "2 :", "3 :", "4 :"];
  const region = regions.find((r) => code.includes(r)) || "";

  return { region };
}

export function extractForm4(code) {
  if (!code) {
    return {
      bones: "",
      ligaments: "",
      tendons: "",
      nerves: "",
      joints: "",
      skin: "",
    };
  }

  const anatomyOptions = footAndAnkelsOptions.form4;

  const findMatch = (options) =>
    options.find((opt) => code.includes(opt.value))?.value || "";

  return {
    bones: findMatch(anatomyOptions.bones),
    ligaments: findMatch(anatomyOptions.ligaments),
    tendons: findMatch(anatomyOptions.tendons),
    nerves: findMatch(anatomyOptions.nerves),
    joints: findMatch(anatomyOptions.joints),
    skin: findMatch(anatomyOptions.skin),
  };
}

export function extractForm5(code) {
  if (!code) {
    return {
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
    };
  }

  const pathologyOptions = footAndAnkelsOptions.form5;

  const findMatch = (options) =>
    options.find((opt) => code.includes(opt.value))?.value || "";

  return {
    fracture: findMatch(pathologyOptions.fracture),
    ligament: findMatch(pathologyOptions.ligament),
    tendinopathy: findMatch(pathologyOptions.tendinopathy),
    osteoarthritis: findMatch(pathologyOptions.osteoarthritis),
    inflammatoryArthritis: findMatch(pathologyOptions.inflammatoryArthritis),
    misc: findMatch(pathologyOptions.misc),
    joint: findMatch(pathologyOptions.joint),
    softTissue: findMatch(pathologyOptions.softTissue),
    boneLesion: findMatch(pathologyOptions.boneLesion),
    neurological: findMatch(pathologyOptions.neurological),
  };
}

export function extractForm6(code) {
  if (!code) {
    return { Score_1: "", Score_2: "", Score_3: "", combined: "" };
  }

  const scores = footAndAnkelsOptions.form6.scores;

  // 🔹 Take only part after last ")"
  let lastChunk = code.split(")").pop() || code;

  // 🔹 Remove ASA codes (so they don’t stick to M6 etc.)
  lastChunk = lastChunk.replace(/ASA\d+/g, "").trim();

  // 🔹 Tokenize properly
  const tokens = lastChunk
    .split(/[\s:]+/) // split by space or colon
    .map((t) => t.trim())
    .filter(Boolean);

  // 🔹 Prioritize longer matches first (M6 over M)
  const sortByLength = (arr) =>
    [...arr].sort((a, b) => b.value.length - a.value.length);

  const findMatch = (options) => {
    const sorted = sortByLength(options);
    return sorted.find((opt) => tokens.includes(opt.value))?.value || "";
  };

  const Score_1 = findMatch(scores.Score_1);
  const Score_2 = findMatch(scores.Score_2);
  const Score_3 = findMatch(scores.Score_3);

  // 🔹 Deduplicate & preserve order
  const combined = [Score_1, Score_2, Score_3].filter(Boolean).join(" ");

  return { Score_1, Score_2, Score_3, combined };
}

export function extractForm7(code) {
  if (!code) return { patient: "" };

  const match = code.match(/ASA\d/); // looks for ASA1, ASA2, ASA3...
  return { patient: match ? match[0] : "" };
}
