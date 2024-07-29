// src/components/ResultTable.tsx
import React from 'react';

function ResultTable({ resultsData }) {
    return (
        <div className='container'>
            <h1 className='title text-light'>Result Table</h1>
            <table className='mt-3'>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>#</td>
                        <td>Name</td>
                        <td>Score</td>
                        <td>Total Questions</td>
                        <td>Correct Answers</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {resultsData.length > 0 ? (
                        resultsData.map((result, index) => (
                            <tr key={result.id} className='table-body'>
                                <td>{index + 1}</td>
                                <td>{result.user}</td>
                                <td>{result.score}</td>
                                <td>{result.totalQuestions}</td>
                                <td>{result.correctAnswers}</td>
                                <td>{new Date(result.date).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No results available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;
