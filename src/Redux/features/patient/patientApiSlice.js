// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../utils/api";

// export const fetchPatients = createAsyncThunk(
//   "patients/fetchPatients",
//   async ({ page = 1, size = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/patient?page=${page}&size=${size}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updatePatient = createAsyncThunk(
//   "patients/updatePatient",
//   async ({ id, values }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/patient/${id}`, values);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const patientSlice = createSlice({
//   name: "patients",
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//     totalPages: 0,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatients.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPatients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload.result.list || [];
//         state.totalPages = action.payload?.result.count || 0;
//       })
//       .addCase(fetchPatients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Something went wrong";
//       })
//       .addCase(updatePatient.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updatePatient.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(updatePatient.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Update failed";
//       })

//   },
// });

// export default patientSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

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

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    data: [],
    selectedPatient: null,
    loading: false,
    error: null,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default patientSlice.reducer;
