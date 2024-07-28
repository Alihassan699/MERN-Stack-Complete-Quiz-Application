import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResults = createAsyncThunk('results/fetchResults', async () => {
    const response = await axios.get('http://localhost:4000/apis/results');
    return response.data;
});

const resultSlice = createSlice({
    name: 'result',
    initialState: {
        result: [],
        userId: 'User',
        resultsData: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResults.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.resultsData = action.payload;
            })
            .addCase(fetchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUserId } = resultSlice.actions;

export default resultSlice.reducer;