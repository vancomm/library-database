import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectToDb from './src/db/connect-to-db.js';
import makeRouter from './src/make-router.js';

dotenv.config();
const port = process.env.PORT || 3000;
const dbPath = process.env.DATABASE_PATH;

const db = connectToDb(dbPath);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/patrons', makeRouter(db, 'patron'));
app.use('/authors', makeRouter(db, 'author'));
app.use('/tags', makeRouter(db, 'tag'));
app.use('/publishers', makeRouter(db, 'publisher'));
app.use('/categories', makeRouter(db, 'category'));
app.use('/books', makeRouter(db, 'book'));
app.use('/bookauthor', makeRouter(db, 'bookAuthor'));
app.use('/booktag', makeRouter(db, 'bookTag'));
app.use('/bookcategory', makeRouter(db, 'bookCategory'));

app.get('*', (req, res) => {
  res.status(418).send({ message: '=)' });
});

app.listen(port, console.log(`Server listening on port http://localhost:${port}`));
