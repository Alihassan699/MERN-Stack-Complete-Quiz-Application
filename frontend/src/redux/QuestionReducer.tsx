import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    queue: [],
    trace: 0,
    selectedAnswers: [],
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.queue = action.payload;
        },
        moveNextQuestion: (state) => {
            state.trace += 1;
        },
        movePrevQuestion: (state) => {
            state.trace -= 1;
        },
        setSelectedAnswers: (state, action) => {
            state.selectedAnswers = action.payload;
        },
    },
});

export const { setQuestions, moveNextQuestion, movePrevQuestion, setSelectedAnswers } = questionSlice.actions;

export default questionSlice.reducer;