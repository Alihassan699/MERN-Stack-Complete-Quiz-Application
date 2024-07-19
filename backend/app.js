import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

dotenv.config();

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'quiz_Application',
    password: 'Al!h@ss@n',
    port: 5432
});

db.connect();

const app = express();
const port = process.env.PORT || 4000; 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
