import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserResult } from '../redux/ResultReducer';

export const updateResult = async (answer, correctOption) => {
    const dispatch = useDispatch();
    let score = 0;

    if (answer === correctOption) {
        score = 10;
    }

    dispatch(setUserResult(score));
};
