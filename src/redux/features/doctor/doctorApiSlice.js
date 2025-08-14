import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// Fetch paginated patients
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async ({ page = 1, size = 10, search, searchCriteria = "" }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        page,
        size,
        ...(search ? { search } : {}), // only add if truthy
        ...(searchCriteria ? { searchCriteria } : {}),
      }).toString();

      const response = await api.get(`/user?role=doctor?${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch single patient by ID
export const fetchSingleDoctor = createAsyncThunk(
  "doctors/fetchSingleDoctor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update patient by ID
export const updatePatient = createAsyncThunk(
  "doctors/updateDoctor",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/user/${id}`, values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update patient by ID
export const addDoctor = createAsyncThunk(
  "doctors/createDoctor",
  async (data, { rejectWithValue }) => {
    try {
      let newobj = JSON.parse(JSON.stringify(data));
      
      let split = data.name.split('')
      newobj['firstName'] = split[0];
      newobj['lastName'] = split[1]
      delete newobj.name
      const response = await api.post(`/user/registration`, newobj);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    data: [],
    appointmentUserData: [],
    sectionData: [],
    loading: false,
    error: null,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.result.list || [];
        state.totalPages = action.payload?.result.count || 0;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchSingleDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPatient = action.payload.result;
      })
      .addCase(fetchSingleDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch patient";
      })

       .addCase(addDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDoctor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
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

  },
});

export default doctorSlice.reducer;
