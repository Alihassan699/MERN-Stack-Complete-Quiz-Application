import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Questions from './Questions';
import { MoveNextQuestion, MovePrevQuestion, PushAnswer } from '../redux/QuestionReducer';
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { setResult } from '../redux/ResultReducer';
import axios from 'axios';

function Quiz() {
    const [check, setChecked] = useState(undefined);
    const [showWarning, setShowWarning] = useState(false); // State for showing warning message
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, apiData, serverError } = useFetchQuestion()[0];
    const result = useSelector(state => state.questions.result);
    const { queue = [], trace = 0 } = useSelector(state => state.questions);

    const submitResults = async (score) => {
        const payload = {
            user: "Daily Tuitions",
            score: score,
            totalQuestions: queue.length,
            correctAnswers: result.filter((answer, index) => answer === queue[index].correctOption).length,
            date: new Date().toISOString()
        };
        try {
            const response = await axios.post('http://localhost:3000/apis/results', payload);
            if (response.status === 200) {
                console.log('Results submitted successfully');
            }
        } catch (error) {
            console.error('Error submitting results:', error);
        }
    };

    const calculateScore = () => {
        let score = 0;
        result.forEach((answerIndex, questionIndex) => {
            const correctAnswerIndex = queue[questionIndex].correctOption;
            if (answerIndex === correctAnswerIndex) {
                score += 10;
            }
        });
        return score;
    };

    function onNext() {
        if (check !== undefined) { // Check if an option is selected
            dispatch(MoveNextQuestion());
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
            setChecked(undefined);
            setShowWarning(false); // Hide the warning message
        } else {
            setShowWarning(true); // Show the warning message
        }
    }

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check);
        setShowWarning(false); // Hide the warning message when an option is selected
    }

    useEffect(() => {
        if (result.length && result.length >= queue.length) {
            navigate('/result', { replace: true });
        }
    }, [result, queue.length, navigate]);

    useEffect(() => {
        console.log('queue:', queue, 'trace:', trace, 'result:', result);
    }, [queue, trace, result]);

    if (isLoading) {
        return <h3 className='text-light'>Loading...</h3>;
    }

    if (serverError) {
        return <h3>{serverError || "Unknown error"}</h3>;
    }

    return (
        <div className="container">
            <h1 className='title text-light'>Quiz Application</h1>
            {showWarning && (
                <div className="warning-message m-3 font-bold text-[1.5rem]">
                    <p className="text-light " id='warning' >Please select an option before moving to the next question.</p>
                </div>
            )}
            <Questions 
                currentQuestionIndex={trace}
                selectedAnswers={result}
                onSelect={onChecked}
            />
            <div className="grid">
                <button className='btn prev' onClick={onPrev} disabled={trace === 0}>
                    Previous
                </button>
                <button className='btn next' onClick={onNext}>
                    {trace < queue.length - 1 ? 'Next' : 'Submit'}
                </button>
            </div>
        </div>
    );
}

export default Quiz;
