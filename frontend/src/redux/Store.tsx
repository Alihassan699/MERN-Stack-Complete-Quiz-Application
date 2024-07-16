import { combineReducers, configureStore } from "@reduxjs/toolkit";
import QuestionsReducer from "./QuestionReducer";
import ResultReducer from "./ResultReducer";

const rootReducer = combineReducers({
    questions: QuestionsReducer,
    result: ResultReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;
