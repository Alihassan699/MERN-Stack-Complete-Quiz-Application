import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Result.css";
import ResultTable from './ResultTable';
import { useSelector } from 'react-redux';

function Result() {
    const result = useSelector(state => state.result.result);
    const questions = useSelector(state => state.questions.queue);

    const calculateScore = () => {
        let score = 0;
        result.forEach((answerIndex, questionIndex) => {
            const correctAnswerIndex = questions[questionIndex].answer;
            if (answerIndex === correctAnswerIndex) {
                score += 10; // Each correct answer gives 10 points
            }
        });
        return score;
    };

    const totalPoints = questions.length * 10; // Total possible points
    const userScore = calculateScore();
    const passPercentage = 50; // Percentage required to pass

    const passOrFail = userScore >= (totalPoints * passPercentage / 100) ? 'Passed' : 'Failed';

    return (
        <div className="container">
            <h1 className='title text-light'>Result Announcement</h1>
            <div className='result flex-center'>
                <div className="flex">
                    <span>User Name</span>
                    <span className='bold'>Daily Tuitions</span> {/* Placeholder for username */}
                </div>
                <div className="flex">
                    <span>Total Quiz Points</span>
                    <span className='bold'>{totalPoints}</span>
                </div>
                <div className="flex">
                    <span>Total Questions</span>
                    <span className='bold'>{questions.length}</span>
                </div>
                <div className="flex">
                    <span>Total Attempts</span>
                    <span className='bold'>{result.length}</span>
                </div>
                <div className="flex">
                    <span>Quiz Result</span>
                    <span className='bold'>{passOrFail}</span>
                </div>
            </div>
            <div className='start'>
                <Link className='btn' to='/'>Restart</Link>
            </div>
            <div className="container">
                <ResultTable />
            </div>
        </div>
    );
}

export default Result;
