import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    result: []
};

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        }
    }
});

export const { setUserId, setResult } = resultSlice.actions;
export default resultSlice.reducer;