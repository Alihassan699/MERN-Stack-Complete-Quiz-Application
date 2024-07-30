import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFetchQuestion } from '../hooks/FetchQuestion';
import Questions from './Questions';
import { moveNextQuestion, movePrevQuestion, setSelectedAnswers } from '../redux/QuestionReducer';
import axios from 'axios';

function Quiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const quizId = location.state?.quizId;
    const currentQuestionIndex = useSelector((state) => state.questions.trace);
    const selectedAnswers = useSelector((state) => state.questions.selectedAnswers || []);
    const questions = useSelector((state) => state.questions.queue);
    const { error } = useFetchQuestion();

    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if (error) {
            console.error('Error fetching questions:', error);
        }
    }, [error]);

    const handleSelect = (index) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionIndex] = index;
        dispatch(setSelectedAnswers(newSelectedAnswers));
        setShowWarning(false);
    };

    const handleNext = () => {
        if (selectedAnswers[currentQuestionIndex] === undefined) {
            setShowWarning(true);
            return;
        }
        if (currentQuestionIndex < questions.length - 1) {
            dispatch(moveNextQuestion());
        } else {
            submitQuiz();
        }
    };

    const handlePrev = () => {
        dispatch(movePrevQuestion());
    };

    const submitQuiz = async () => {
        if (!quizId) {
            alert('Quiz ID is not available.');
            return;
        }

        // Calculate the result here
        const correctAnswers = questions.filter((question, index) => question.correctAnswer === selectedAnswers[index]).length;
        const result = {
            user: 'testUser', 
            quizId: quizId,
            score: correctAnswers * 10, 
            totalQuestions: questions.length,
            correctAnswers: correctAnswers,
            selectedAnswers,
            date: new Date().toISOString()
        };

        try {
            // Store result in backend
            await axios.post('http://localhost:3000/apis/results', result);
            // Navigate to result page
            navigate('/result', { state: { quizId } });
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('An error occurred while submitting the quiz.');
        }
    };

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>
            {showWarning && (
                <div className="warning-message m-3 font-bold text-[1.5rem]">
                    <p className="text-light" id='warning'>Please select an option before moving to the next question.</p>
                </div>
            )}
            <Questions
                currentQuestionIndex={currentQuestionIndex}
                selectedAnswers={selectedAnswers}
                onSelect={handleSelect}
            />
            <div className="grid">
                <button className='btn prev' onClick={handlePrev} disabled={currentQuestionIndex === 0}>Previous</button>
                <button className='btn next' onClick={handleNext}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                </button>
            </div>
        </div>
    );
}

export default Quiz;