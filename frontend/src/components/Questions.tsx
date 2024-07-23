import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Question.css'

function Questions({ currentQuestionIndex, selectedAnswers, onSelect }) {
    const questions = useSelector(state => state.questions.queue);
    const question = questions[currentQuestionIndex];

    if (!question) {
        return (
            <>
                <h1 className='text-light'>
                    No more questions. If you want to submit your answers, please click on the submit button.
                </h1>
                <h1 className='text-light'>And thanks for your attention.</h1>
            </>
        );
    }

    return (
        <div className='questions'>
            <h2 className='text-light'>{question?.question}</h2>
            <ul key={question?.id}>
                {
                    question?.options.map((q, i) => (
                        <li key={i} className={selectedAnswers[currentQuestionIndex] === i ? 'selected' : ''}>
                            <input 
                                type="radio"
                                value={i}
                                name={`options-${currentQuestionIndex}`}
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                                checked={selectedAnswers[currentQuestionIndex] === i}
                            />
                            <label htmlFor={`q${i}-option`}>{q}</label>
                            <div className={`check ${selectedAnswers[currentQuestionIndex] === i ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Questions;
