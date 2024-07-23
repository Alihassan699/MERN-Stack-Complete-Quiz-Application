import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Home.css";
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/ResultReducer';
import axios from 'axios';

function Home() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startQuiz = async () => {
        if (inputRef.current?.value) {
            const username = inputRef.current.value;

            try {
                // Post the username to the API
                const response = await axios.post('http://localhost:3000/apis/results', {
                    user: username,
                    score: 0,
                    totalQuestions: 0,
                    correctAnswers: 0,
                    date: new Date().toISOString()
                });

                console.log('Response from API:', response.data);

                // Dispatch the username to the Redux store
                dispatch(setUserId(username));

                // Navigate to the quiz page
                navigate('/quiz');
            } catch (error: any) {
                console.error('Error posting username to API:', error.message);
                alert('An error occurred while starting the quiz. Please try again.');
            }
        } else {
            alert('Please enter your username');
        }
    };

    return (
        <div className="container">
            <h1 className='title text-light'>Quiz Application</h1>
            <ol>
                <li>You will be asked ten questions one after another.</li>
                <li>Ten points are awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one option from them.</li>
                <li>You can review and change the selected option before submitting.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <form id='form'>
                <input id='input1' ref={inputRef} type='text' placeholder='User Name' />
            </form>

            <div className="start">
                <button className='btn' onClick={startQuiz}>Start Quiz</button>
            </div>
            
            <div className='start'>
                <Link className='btn' to='/QuestionForm'>Add Questions</Link>
            </div>
        </div>
    );
}

export default Home;
