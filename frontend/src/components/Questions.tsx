
// src/components/Questions.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Question.css';

function Questions({ currentQuestionIndex, selectedAnswers, onSelect }) {
    const questions = useSelector(state => state.questions.queue);
    const question = questions[currentQuestionIndex];

    if (!question) {
        return <div className="text-light">Loading...</div>;
    }

    const handleSelect = (index) => {
        onSelect(index);
    };

    return (
        <div className="questions">
            <h2 className="text-light">{question.question}</h2>
            <ul key={question.id}>
                {question.options.map((option, index) => (
                    <li key={index}>
                        <input
                            type="radio"
                            id={`q${index}-option`}
                            name="options"
                            value={index}
                            checked={selectedAnswers[currentQuestionIndex] === index}
                            onChange={() => handleSelect(index)}
                        />
                        <label className="text-primary" htmlFor={`q${index}-option`}>{option}</label>
                        <div className={`check ${selectedAnswers[currentQuestionIndex] === index ? 'checked' : ''}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Questions;
