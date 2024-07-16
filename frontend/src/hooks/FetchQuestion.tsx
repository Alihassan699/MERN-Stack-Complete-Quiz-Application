import { useEffect, useState } from "react";
import Data from "../database/Data";
import { useDispatch } from "react-redux";
import { startExamAction } from '../redux/QuestionReducer'; // Ensure correct action

// Fetch question hook
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        // Async function to fetch backend data
        (async () => {
            try {
                let questions = Data;
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false, apiData: questions }));

                    // Dispatch the startExamAction with the questions
                    dispatch(startExamAction(questions));
                } else {
                    throw new Error("No Questions Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false, serverError: error.message }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}
