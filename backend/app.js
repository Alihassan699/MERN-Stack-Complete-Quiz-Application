import { connectdb } from './config/connect.js';
import express from 'express';
import bodyParser from 'body-parser';
import router from './router/route.js';
import cors from 'cors';

// Import .env file
import { config } from 'dotenv';
config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for the frontend URL
const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({ origin: frontendUrl }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database and handle any connection errors
connectdb().catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1); 
});

app.use('/apis', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
