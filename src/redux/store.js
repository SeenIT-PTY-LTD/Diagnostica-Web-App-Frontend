// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import patientReducer from "./features/patient/patientApiSlice";
import diagnosticsReducer from "./features/diagnostica/Diagnostica";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    diagnostics: diagnosticsReducer,
  },
});
