import { pool } from "../config/connect.js";


// Get all questions or a specific question by ID
export async function getQuestions(req, res) {
    const { id } = req.query;
    try {
        let query = 'SELECT * FROM questions';
        let params = [];
        
        if (id) {
            query += ' WHERE id = $1';
            params.push(id);
        }
        
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
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

// Update a question by ID
export async function updateQuestion(req, res) {
    const { id } = req.params;
    const { question, options, correctOption } = req.body;

    if (!id || !question || !options || !correctOption) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await pool.query(
            'UPDATE questions SET question = $1, options = $2, correctOption = $3 WHERE id = $4 RETURNING *',
            [question, options, correctOption, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete all questions or a specific question by ID
export async function dropQuestions(req, res) {
    const { id } = req.query;

    try {
        let query;
        let params = [];

        if (id) {
            const ids = id.split(',').map(i => i.trim());

            if (ids.some(i => isNaN(i))) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');
            query = `DELETE FROM questions WHERE id IN (${placeholders})`;
            params = ids.map(i => parseInt(i, 10));
        } else {
            query = 'DELETE FROM questions';
        }

        const result = await pool.query(query, params);
        const rowCount = result.rowCount;

        res.json({ message: `Questions deleted, total: ${rowCount}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Insert a new result with initial values
export async function storeResults(req, res) {
    const { user, quizId } = req.body;

    if (!user || !quizId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        console.log('Inserting result:', { user, quizId });  // Log input data

        const result = await pool.query(
            'INSERT INTO results ("user", "quizId", score, totalQuestions, correctAnswers, "date", created_at, updated_at) VALUES ($1, $2, 0, 0, 0, NOW(), NOW(), NOW()) RETURNING *',
            [user, quizId]
        );
        
        console.log('Result inserted:', result.rows[0]);  // Log the inserted result
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error storing result:', error.message);  // Log detailed error
        res.status(500).json({ error: error.message });
    }
}

// Get a specific result by quizId
export async function getResults(req, res) {
    try {
        const { quizId } = req.params; // Use req.params instead of req.query
        if (!quizId) {
            return res.status(400).json({ error: "Quiz ID is required" });
        }
        console.log(`Fetching result for quizId: ${quizId}`); // Log the quizId

        const result = await pool.query('SELECT * FROM results WHERE "quizId" = $1', [quizId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Result not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching result:', error.message); // Log the error
        res.status(500).json({ error: error.message });
    }
}

// Update result after quiz completion
export async function updateResult(req, res) {
    const { quizId } = req.params;
    const { answers } = req.body;  // Expecting user's answers to be sent in the request body

    if (!quizId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    try {
        // Hardcoded correct answers
        const correctAnswers = [
            { id: 16, correctOption: "Paris" },
            { id: 17, correctOption: "To compile JavaScript code 2" }
        ];

        // Calculate score
        let score = 0;
        let totalQuestions = correctAnswers.length;
        let correctAnswersCount = 0;

        correctAnswers.forEach(correctAnswer => {
            const userAnswer = answers.find(a => a.questionId === correctAnswer.id);
            if (userAnswer && userAnswer.selectedOption === correctAnswer.correctOption) {
                score += 10;  // Assuming each question is worth 10 points
                correctAnswersCount += 1;
            }
        });

        // Calculate additional fields
        const totalQuizPoints = totalQuestions * 10;
        const passPercentage = 50;
        const passOrFail = score >= (totalQuizPoints * passPercentage / 100) ? 'Passed' : 'Failed';

        // Update result in the database
        const result = await pool.query(
            'UPDATE results SET score = $1, totalQuestions = $2, correctAnswers = $3, totalQuizPoints = $4, passOrFail = $5, updated_at = NOW() WHERE "quizId" = $6 RETURNING *',
            [score, totalQuestions, correctAnswersCount, totalQuizPoints, passOrFail, quizId]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating result:', error.message);
        res.status(500).json({ error: error.message });
    }
}


// Drop all results or a specific result by ID
export async function dropResults(req, res) {
    const { id } = req.query;

    try {
        let query;
        let params = [];

        if (id) {
            const ids = id.split(',').map(i => i.trim());

            if (ids.some(i => isNaN(i))) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');
            query = `DELETE FROM results WHERE id IN (${placeholders})`;
            params = ids.map(i => parseInt(i, 10));
        } else {
            query = 'DELETE FROM results';
        }

        const result = await pool.query(query, params);
        const rowCount = result.rowCount;

        res.json({ message: `Results deleted, total: ${rowCount}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}