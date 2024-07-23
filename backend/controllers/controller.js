import { pool } from "../config/connect.js";

// Get all results or a specific result by ID
export async function getResults(req, res) {
    try {
        const { id, user } = req.query;
        let query = 'SELECT * FROM results';
        const queryParams = [];

        if (id) {
            query += ' WHERE id = $1';
            queryParams.push(id);
        } else if (user) {
            query += ' WHERE "user" = $1';
            queryParams.push(user);
        }

        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Insert a new result
export async function storeResults(req, res) {
    const { user, score, totalQuestions, correctAnswers } = req.body;

    if (!user || score === undefined || totalQuestions === undefined || correctAnswers === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO results ("user", score, totalQuestions, correctAnswers, date, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW(), NOW()) RETURNING *',
            [user, score, totalQuestions, correctAnswers]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a result by ID
export async function updateResult(req, res) {
    const { id } = req.params;
    const { user, score, totalQuestions, correctAnswers } = req.body;

    if (!id || !user || score === undefined || totalQuestions === undefined || correctAnswers === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await pool.query(
            'UPDATE results SET "user" = $1, score = $2, totalQuestions = $3, correctAnswers = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
            [user, score, totalQuestions, correctAnswers, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete all results or a specific result by ID
export async function deleteResults(req, res) {
    const { id } = req.query;

    try {
        let query = 'DELETE FROM results';
        const queryParams = [];

        if (id) {
            query += ' WHERE id = $1';
            queryParams.push(id);
        }

        const result = await pool.query(query, queryParams);
        res.json({ message: `Results deleted, total: ${result.rowCount}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
