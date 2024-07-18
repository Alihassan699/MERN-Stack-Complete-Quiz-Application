import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Questions from './Questions';
import { MoveNextQuestion, MovePrevQuestion, PushAnswer } from '../redux/QuestionReducer';
import { useFetchQuestion } from '../hooks/FetchQuestion';

function Quiz() {
    const [check, setChecked] = useState(undefined);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, apiData, serverError } = useFetchQuestion()[0];
    const result = useSelector(state => state.questions.result);
    const { queue = [], trace = 0 } = useSelector(state => state.questions);

    
    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());

            if (result.length <= trace) {
                
                dispatch(PushAnswer(check));
            }

            setChecked(undefined);
        } else {
        
            const score = calculateScore();
            dispatch(setResult(score));
            navigate('/result', { replace: true });
        }
    }

    
    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check);
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

    function calculateScore() {
        let score = 0;
        result.forEach((answerIndex, questionIndex) => {
            const correctAnswerIndex = questions[questionIndex].answer;
            if (answerIndex === correctAnswerIndex) {
                score += 10; 
            }
        });
        return score;
    }

    return (
        <div className="container">
            <h1 className='title text-light'>Quiz Application</h1>
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