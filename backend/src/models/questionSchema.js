import { Pool } from 'pg';
import { config } from 'dotenv';

config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure you have DATABASE_URL in your .env file
});

// Function to get all questions
export const getQuestions = async () => {
  try {
    const res = await pool.query('SELECT * FROM questions');
    return res.rows;
  } catch (err) {
    console.error('Error fetching questions', err);
    throw err;
  }
};

// Function to add a question
export const addQuestion = async (questions, answers) => {
  try {
    const res = await pool.query(
      'INSERT INTO questions (questions, answers) VALUES ($1, $2) RETURNING *',
      [questions, answers]
    );
    return res.rows[0];
  } catch (err) {
    console.error('Error adding question', err);
    throw err;
  }
};

// Function to update a question by ID
export const updateQuestion = async (id, questions, answers) => {
  try {
    const res = await pool.query(
      'UPDATE questions SET questions = $1, answers = $2 WHERE id = $3 RETURNING *',
      [questions, answers, id]
    );
    return res.rows[0];
  } catch (err) {
    console.error('Error updating question', err);
    throw err;
  }
};

// Function to delete a question by ID
export const deleteQuestion = async (id) => {
  try {
    const res = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  } catch (err) {
    console.error('Error deleting question', err);
    throw err;
  }
};
