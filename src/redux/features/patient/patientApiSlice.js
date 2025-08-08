import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// Fetch dashboard count
export const fetchDashboardCount = createAsyncThunk(
  "dashboard/fetchDashboardCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/get-dashboard-counts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch paginated patients
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async ({ page = 1, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/patient?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch single patient by ID
export const fetchSinglePatient = createAsyncThunk(
  "patients/fetchSinglePatient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/patient/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update patient by ID
export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/patient/${id}`, values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAppointmentByPatientId = createAsyncThunk(
  "patients/fetch-appoinment-by-patient",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/appointment/fetch-appoinment-by-patient?patientId=${patientId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSectionsByBodyPartId = createAsyncThunk(
  "patients/fetchSectionsByBodyPartId",
  async (bodyPartId, { rejectWithValue }) => {
    try {
      const filters = encodeURIComponent(JSON.stringify({ bodyPartId }));
      const response = await api.get(`/section?filters=${filters}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAttemptedSectionPrompts = createAsyncThunk(
  "patients/fetchAttemptedSectionPrompts",
  async (
    { appointmentRefId, sectionId, startDate, endDate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `/appointment/get-attempted-section-promts?appointmentRefId=${appointmentRefId}&sectionId=${sectionId}&startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    data: [],
    dashboardCount: [],
    appointmentUserData: [],
    sectionData: [],
    attemptedSectionPrompts: [],
    selectedPatient: null,
    loading: false,
    error: null,
    totalPages: 0,
  },
  reducers: {
    resetAttemptedSectionPrompts: (state) => {
      state.attemptedSectionPrompts = [];
    },
    resetAppointmentUserData: (state) => {
      state.appointmentUserData = [];
      state.sectionData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardCount.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardCount = action.payload.result || [];
      })
      .addCase(fetchDashboardCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.result.list || [];
        state.totalPages = action.payload?.result.count || 0;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchSinglePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPatient = action.payload.result;
      })
      .addCase(fetchSinglePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch patient";
      })

      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatient.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      })

      // Section data fetch by patientId
      .addCase(fetchAppointmentByPatientId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentByPatientId.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentUserData = action.payload.result?.list || [];
      })
      .addCase(fetchAppointmentByPatientId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch patient sections";
      })

      // Section data fetch
      .addCase(fetchSectionsByBodyPartId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionsByBodyPartId.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionData = action.payload.result?.list || [];
      })
      .addCase(fetchSectionsByBodyPartId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sections";
      })

      .addCase(fetchAttemptedSectionPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttemptedSectionPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.attemptedSectionPrompts = action.payload.result || [];
      })
      .addCase(fetchAttemptedSectionPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch attempted section prompts";
      });
  },
});

export const { resetAttemptedSectionPrompts, resetAppointmentUserData } =
  patientSlice.actions;
export default patientSlice.reducer;
