import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../redux/QuestionReducer';

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/apis/questions');
                dispatch(setQuestions(response.data));
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [dispatch]);

    return { error };
};

export const MoveNextQuestion = () => {
    const dispatch = useDispatch();
    dispatch({ type: 'questions/moveNextQuestion' });
};

export const MovePrevQuestion = () => {
    const dispatch = useDispatch();
    dispatch({ type: 'questions/movePrevQuestion' });
};
