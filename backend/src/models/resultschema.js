import { Pool } from 'pg';
import { config } from 'dotenv';

config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure you have DATABASE_URL in your .env file
});

// Function to get all results
export const getResults = async () => {
  try {
    const res = await pool.query('SELECT * FROM results');
    return res.rows;
  } catch (err) {
    console.error('Error fetching results', err);
    throw err;
  }
};

// Function to add a result
export const addResult = async (username, result, attempts, points, achieved) => {
  try {
    const res = await pool.query(
      'INSERT INTO results (username, result, attempts, points, achieved) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, result, attempts, points, achieved]
    );
    return res.rows[0];
  } catch (err) {
    console.error('Error adding result', err);
    throw err;
  }
};

// Function to update a result by ID
export const updateResult = async (id, username, result, attempts, points, achieved) => {
  try {
    const res = await pool.query(
      'UPDATE results SET username = $1, result = $2, attempts = $3, points = $4, achieved = $5 WHERE id = $6 RETURNING *',
      [username, result, attempts, points, achieved, id]
    );
    return res.rows[0];
  } catch (err) {
    console.error('Error updating result', err);
    throw err;
  }
};

// Function to delete a result by ID
export const deleteResult = async (id) => {
  try {
    const res = await pool.query('DELETE FROM results WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  } catch (err) {
    console.error('Error deleting result', err);
    throw err;
  }
};
