import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Home.css";
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/ResultReducer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function Home() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startQuiz = async () => {
        if (inputRef.current?.value) {
            const username = inputRef.current.value;
            const quizId = uuidv4(); // Generate a new quiz ID

            try {
                // Post the username to the API
                await axios.post('http://localhost:3000/apis/results', {
                    user: username,
                    quizId: quizId,
                });

                dispatch(setUserId(username));
                navigate('/quiz', { state: { quizId } });
            } catch (error) {
                console.error('Error posting username to API:', error);
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
            <h1 className='title text-light'>Add New Questions</h1>
            <div className='start'>
                <Link className='btn' to='/QuestionForm'>Add Questions</Link>
            </div>
        </div>
    );
}

export default Home;
