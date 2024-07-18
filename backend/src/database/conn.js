import { Pool } from 'pg';
import { config } from 'dotenv';

config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure you have DATABASE_URL in your .env file
});

export default async function connect() {
  try {
    await pool.connect();
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to the PostgreSQL database", error);
    throw error;
  }
}
