// src/redux/ResultReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const resultSlice = createSlice({
    name: 'result',
    initialState: {
        userId: null,
        resultData: {
            user: '',
            score: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            totalQuizPoints: 0,
            passOrFail: '',
            date: '',
            created_at: '',
            updated_at: '',
        },
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setResultData: (state, action) => {
            state.resultData = action.payload;
        },
    },
});

export const { setUserId, setResultData } = resultSlice.actions;
export default resultSlice.reducer;
