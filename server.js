import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectToDb from './src/db/connect-to-db.js';
import makeRouter from './src/db/make-router.js';

dotenv.config();
const port = process.env.PORT || 3000;
const dbPath = process.env.DATABASE_PATH;

console.log(dbPath);

const db = connectToDb(dbPath);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/patrons', makeRouter(db, 'patron'));
app.use('/authors', makeRouter(db, 'author'));

app.get('*', (req, res) => {
  res.send({ text: 'Hello world!' });
});

app.listen(port, console.log(`Server listening on port http://localhost:${port}`));
