import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectToDb from './src/db/connect-to-db.js';
import makeRouter from './src/make-router.js';
import PatronModel from './src/db/models/Patron.model.js';
import AuthorModel from './src/db/models/Author.model.js';
import TagModel from './src/db/models/Tag.model.js';
import PublisherModel from './src/db/models/Publisher.model.js';
import CategoryModel from './src/db/models/Category.model.js';
import BookModel from './src/db/models/Book.model.js';
import BookTagModel from './src/db/models/BookTag.model.js';
import BookCategoryModel from './src/db/models/BookCategory.model.js';

dotenv.config();
const port = process.env.PORT || 3000;
const dbPath = process.env.DATABASE_PATH;

const db = connectToDb(dbPath);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/patrons', makeRouter(db, PatronModel));
app.use('/authors', makeRouter(db, AuthorModel));
app.use('/tags', makeRouter(db, TagModel));
app.use('/publishers', makeRouter(db, PublisherModel));
app.use('/categories', makeRouter(db, CategoryModel));
app.use('/books', makeRouter(db, BookModel));
app.use('/bookauthor', makeRouter(db, BookTagModel));
app.use('/booktag', makeRouter(db, BookTagModel));
app.use('/bookcategory', makeRouter(db, BookCategoryModel));

app.get('*', (req, res) => {
  res.status(418).send({ message: '=)' });
});

app.listen(port, console.log(`Server listening on port http://localhost:${port}`));
