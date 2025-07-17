// features/diagnostics/diagnosticsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../utils/api';

export const createDiagnostic = createAsyncThunk(
    'diagnostics/createDiagnostic',
    async (diagnosticData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/diagnostics/create`, diagnosticData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const diagnosticsSlice = createSlice({
    name: 'diagnostics',
    initialState: {
        loading: false,
        error: null,
        success: false,
        diagnostic: null,
    },
    reducers: {
        resetDiagnosticState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.diagnostic = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDiagnostic.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createDiagnostic.fulfilled, (state, action) => {
                console.log('action.payload', action.payload);
                
                state.loading = false;
                state.success = true;
                state.diagnostic = action.payload;
            })
            .addCase(createDiagnostic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetDiagnosticState } = diagnosticsSlice.actions;
export default diagnosticsSlice.reducer;
