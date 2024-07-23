import React from 'react';

function ResultTable({ resultsData }) {
    console.log('Results data in ResultTable:', resultsData);

    return (
        <div className='container'>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>#</td>
                        <td>Name</td>
                        <td>Score</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {resultsData.length > 0 ? (
                        resultsData.map((result, index) => (
                            <tr key={index} className='table-body'>
                                <td>{index + 1}</td>
                                <td>{result.user}</td>
                                <td>{result.score}</td>
                                <td>{new Date(result.date).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No results available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;
