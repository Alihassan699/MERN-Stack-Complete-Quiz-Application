import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Result.css";
import ResultTable from './ResultTable';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Result() {
    const result = useSelector(state => state.result.result);
    const questions = useSelector(state => state.questions.queue);
    const [resultsData, setResultsData] = useState([]);
    const user = 'Daily Tuitions'; // Replace with actual user data if available

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:3000/apis/result');
                console.log('Fetched results:', response.data);
                setResultsData(response.data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };
        fetchResults();
    }, []);

    const calculateScore = () => {
        let score = 0;
        result.forEach((answerIndex, questionIndex) => {
            const correctAnswerIndex = questions[questionIndex]?.correctOption;
            if (answerIndex === correctAnswerIndex) {
                score += 10;
            }
        });
        return score;
    };

    const totalPoints = questions.length * 10;
    const userScore = calculateScore();
    const passPercentage = 50;
    const passOrFail = userScore >= (totalPoints * passPercentage / 100) ? 'Passed' : 'Failed';

    return (
        <div className="container">
            <h1 className='title text-light'>Result Announcement</h1>
            <div className='result flex-center'>
                <div className="flex">
                    <span>User Name</span>
                    <span className='bold'>{user}</span>
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
                <ResultTable resultsData={resultsData} />
            </div>
        </div>
    );
}

export default Result;
