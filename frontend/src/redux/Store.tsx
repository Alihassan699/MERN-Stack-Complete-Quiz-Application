import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './QuestionReducer';
import resultReducer from './ResultReducer';

const store = configureStore({
    reducer: {
        questions: questionReducer,
        result: resultReducer,
    },
});

export default store;