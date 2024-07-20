import { pool } from "../config/connect.js";


// Get all questions 
export async function getQuestions(req, res) {
    try {
        const result = await pool.query('SELECT * FROM questions');
            res.json(result.rows);
        } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }
}
        

// Insert a new question
export async function postQuestions(req, res) {
    const { question, options, correctOption } = req.body;

    console.log('Request body:', req.body);  // Log the request body

    if (!question || !options || !correctOption) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO questions (question, options, correctOption) VALUES ($1, $2, $3) RETURNING *',
            [question, options, correctOption]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);  // Log the error
        res.status(500).json({ error: error.message });
    }
}
        
        
//Delete all questions  
export async function dropQuestions(req, res) {
    try {
        await pool.query('DELETE FROM questions');
        res.json({ message: "All questions deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
        
        
        
// Get all results
export async function getresults(req, res) {
    try {
        const result = await pool.query('SELECT * FROM results');
        res.json(result.rows);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
        

        
// Insert a new result
export async function storeResults(req, res) {
    const { user, score, totalQuestions, correctAnswers } = req.body;

    console.log('Request body:', req.body);  // Log the request body

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
        console.error('Error executing query:', error.message);  // Log the error
        res.status(500).json({ error: error.message });
    }
}

        
        
//Delete all results  
export async function dropresults(req, res) {
    try {
        await pool.query('DELETE FROM results');
        res.json({ message: "All results deleted" });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}