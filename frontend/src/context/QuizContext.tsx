// src/context/QuizContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Question = {
    id: number;
    question: string;
    options: string[];
    correctOption: number;
};

type QuizState = {
    queue: Question[];
    trace: number;
    result: (number | undefined)[];
};

type QuizAction =
    | { type: 'MOVE_NEXT'; }
    | { type: 'MOVE_PREV'; }
    | { type: 'PUSH_ANSWER'; payload: number | undefined }
    | { type: 'SET_QUEUE'; payload: Question[] }
    | { type: 'SET_TRACE'; payload: number };

const initialState: QuizState = {
    queue: [],
    trace: 0,
    result: []
};

const QuizContext = createContext<{
    state: QuizState;
    dispatch: React.Dispatch<QuizAction>;
} | undefined>(undefined);

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
    switch (action.type) {
        case 'MOVE_NEXT':
            return {
                ...state,
                trace: state.trace + 1
            };
        case 'MOVE_PREV':
            return {
                ...state,
                trace: state.trace - 1
            };
        case 'PUSH_ANSWER':
            const newResult = [...state.result];
            newResult[state.trace] = action.payload;
            return {
                ...state,
                result: newResult
            };
        case 'SET_QUEUE':
            return {
                ...state,
                queue: action.payload
            };
        case 'SET_TRACE':
            return {
                ...state,
                trace: action.payload
            };
        default:
            return state;
    }
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
