import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import makeRouter from './src/make-router.js';
import PatronModel from './src/database/models/Patron.model.js';
import AuthorModel from './src/database/models/Author.model.js';
import TagModel from './src/database/models/Tag.model.js';
import PublisherModel from './src/database/models/Publisher.model.js';
import CategoryModel from './src/database/models/Category.model.js';
import BookModel from './src/database/models/Book.model.js';
import BookAuthorModel from './src/database/models/BookAuthor.model.js';
import BookTagModel from './src/database/models/BookTag.model.js';
import BookCategoryModel from './src/database/models/BookCategory.model.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/patrons', makeRouter(PatronModel));
app.use('/authors', makeRouter(AuthorModel));
app.use('/tags', makeRouter(TagModel));
app.use('/publishers', makeRouter(PublisherModel));
app.use('/categories', makeRouter(CategoryModel));
app.use('/books', makeRouter(BookModel));
app.use('/bookauthor', makeRouter(BookAuthorModel));
app.use('/booktag', makeRouter(BookTagModel));
app.use('/bookcategory', makeRouter(BookCategoryModel));

app.get('*', (req, res) => {
  res.status(418).send({ message: '=)' });
});

app.listen(port, console.log(`Server listening on port http://localhost:${port}`));
