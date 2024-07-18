import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    queue: [],
    trace: 0,
    result: [],
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        startExamAction: (state, action) => {
            state.queue = action.payload;
        },
        MoveNextQuestion: (state) => {
            state.trace += 1;
        },
        MovePrevQuestion: (state) => {
            state.trace -= 1;
        },
        PushAnswer: (state, action) => {
            state.result.push(action.payload);
        }
    }
});

export const { startExamAction, MoveNextQuestion, MovePrevQuestion, PushAnswer } = questionSlice.actions;
export default questionSlice.reducer;