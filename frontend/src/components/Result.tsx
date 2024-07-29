import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/Result.css";
import axios from 'axios';

function Result() {
    const location = useLocation();
    const quizId = location.state?.quizId;

    const [resultData, setResultData] = useState<any>(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                if (!quizId) {
                    console.error('Quiz ID is not available');
                    return;
                }

                console.log(`Fetching result for quizId: ${quizId}`); // Debugging log
                const response = await axios.get(`http://localhost:4000/apis/results/${quizId}`);
                setResultData(response.data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };
        
        fetchResult();
    }, [quizId]);

    if (!resultData) {
        return <div>Loading...</div>;
    }

    const { user, score, totalquestions, correctanswers, date, created_at, updated_at } = resultData;
    const totalQuizPoints = totalquestions * 10 || 0;
    const passPercentage = 50;
    const passOrFail = score >= (totalQuizPoints * passPercentage / 100) ? 'Passed' : 'Failed';

    console.log('Result Data:', resultData);  // Log the result data for debugging

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
                    <span className='bold'>{totalQuizPoints}</span>
                </div>
                <div className="flex">
                    <span>Total Questions</span>
                    <span className='bold'>{totalquestions || 0}</span>
                </div>
                <div className="flex">
                    <span>Total Attempts</span>
                    <span className='bold'>{correctanswers || 0}</span>
                </div>
                <div className="flex">
                    <span>Score</span>
                    <span className='bold'>{score}</span>
                </div>
                <div className="flex">
                    <span>Quiz Result</span>
                    <span className='bold'>{passOrFail}</span>
                </div>
                <div className="flex">
                    <span>Date</span>
                    <span className='bold'>{new Date(date).toLocaleString()}</span>
                </div>
                <div className="flex">
                    <span>Created At</span>
                    <span className='bold'>{new Date(created_at).toLocaleString()}</span>
                </div>
                <div className="flex">
                    <span>Updated At</span>
                    <span className='bold'>{new Date(updated_at).toLocaleString()}</span>
                </div>
            </div>
            <div className='start'>
                <Link className='btn' to='/'>Restart</Link>
            </div>
        </div>
    );
}

export default Result;
