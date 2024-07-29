// src/redux/ResultReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const resultSlice = createSlice({
    name: 'result',
    initialState: {
        userId: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setUserId } = resultSlice.actions;
export default resultSlice.reducer;
