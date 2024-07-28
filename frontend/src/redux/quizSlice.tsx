import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [], 
    currentQuestionIndex: 0,
    selectedAnswers: [],
    result: [],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setCurrentQuestionIndex: (state, action) => {
            state.currentQuestionIndex = action.payload;
        },
        setSelectedAnswers: (state, action) => {
            state.selectedAnswers = action.payload;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        resetQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.selectedAnswers = [];
            state.result = [];
        }
    }
});

export const { setQuestions, setCurrentQuestionIndex, setSelectedAnswers, setResult, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;