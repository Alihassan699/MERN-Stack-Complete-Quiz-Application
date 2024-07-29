// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import QuestionForm from './components/QuestionForm';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/QuestionForm',
            element: <QuestionForm />
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