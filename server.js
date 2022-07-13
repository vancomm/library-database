import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import patronRouter from './src/routes/patrons.js';
import connectToDb from './src/services/connect-to-db.js';
import query from './src/services/query.js';

dotenv.config();
const port = process.env.PORT || 3000;

const db = connectToDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/patrons', patronRouter);

app.get('/books', async (req, res) => {
  const books = await query(db, 'SELECT * FROM book');
  res.status(200).send(books);
});

app.get('*', (req, res) => {
  res.send({ text: 'Hello world!' });
});

app.listen(port, console.log(`Server listening on port http://localhost:${port}`));
