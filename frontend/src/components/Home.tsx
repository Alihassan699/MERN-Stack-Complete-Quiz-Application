import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/ResultReducer';

function Home() {
    const inputRef = useRef(null);

    const dispatch = useDispatch()

    const startQuiz = () => {
        if(inputRef.current?.value){
            dispatch(setUserId())
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
                <Link className='btn' to='/quiz' onClick={startQuiz}>Start Quiz</Link>
            </div>
        </div>
    );
}

export default Home;