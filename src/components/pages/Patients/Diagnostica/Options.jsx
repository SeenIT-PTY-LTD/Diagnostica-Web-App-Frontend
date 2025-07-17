const footAndAnkelsOptions = {
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
};
