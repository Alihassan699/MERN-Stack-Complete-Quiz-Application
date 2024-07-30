import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../redux/QuestionReducer';

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/apis/questions');
                dispatch(setQuestions(response.data));
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err);
                } else {
                    setError(new Error('An unknown error occurred') as AxiosError);
                }
            }
        };

        fetchData();
    }, [dispatch]);

    return { error };
};