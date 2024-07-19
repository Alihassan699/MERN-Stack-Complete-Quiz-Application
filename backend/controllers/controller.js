

import { pool } from '../config/db.js'; 

// Get all questions 
export async function getQuestions(req, res) {
    try {
        const result = await pool.query('SELECT * FROM questions');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Insert a question
export async function postQuestions(req, res) {
    const { question, options, correctOption } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO questions (question, options, correctOption) VALUES ($1, $2, $3) RETURNING *',
            [question, options, correctOption]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete all questions
export async function dropQuestions(req, res) {
    try {
        await pool.query('DELETE FROM questions');
        res.json({ message: "All questions deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all results
export async function getresults(req, res) {
    try {
        const result = await pool.query('SELECT * FROM results');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Insert a result
export async function storeResults(req, res) {
    const { username, score, totalQuestions, correctAnswers } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO results (username, score, totalQuestions, correctAnswers, date) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [username, score, totalQuestions, correctAnswers]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete all results
export async function dropresults(req, res) {
    try {
        await pool.query('DELETE FROM results');
        res.json({ message: "All results deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
