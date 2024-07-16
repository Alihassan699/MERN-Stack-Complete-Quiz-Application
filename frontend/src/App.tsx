import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/quiz',
            element: <Quiz />
        },
        {
            path: '/result',
            element: <Result />
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
