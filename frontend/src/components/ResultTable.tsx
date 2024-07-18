import React from 'react';

function ResultTable() {
    return (
        <div className='container'>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attempts</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-body'>
                        <td>Daily tuition</td> {/* Placeholder for username */}
                        <td>03</td> {/* Placeholder for attempts */}
                        <td>20</td> {/* Placeholder for points */}
                        <td>Passed</td> {/* Placeholder for result */}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;