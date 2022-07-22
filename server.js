import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createServer } from 'https';
import { readFileSync } from 'fs';
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
import CopyModel from './src/database/models/Copy.model.js';
import UserModel from './src/database/models/User.model.js';
import auth from './src/middleware/auth.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    res.status(422).json({ message: 'Request body must contain a username, a password and a role.' });
    return;
  }
  const userExists = await UserModel.findOne({ username });
  if (userExists) {
    res.status(409).json({ message: 'Username taken.' });
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username, role, hash,
  };
  await UserModel.insert(user);
  const token = jwt.sign({ username, role }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
  res.status(201).json({ user, token });
});

app.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    res.status(404).json({ message: 'Username not found.' });
    return;
  }
  const { hash } = user;
  const correct = await bcrypt.compare(password, hash);
  if (!correct) {
    res.status(400).json({ message: 'Incorrect password.' });
    return;
  }
  const token = jwt.sign({ username, role }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
  res.status(200).json({ user, token });
});

app.use('/patrons', auth, makeRouter(PatronModel));
app.use('/authors', makeRouter(AuthorModel));
app.use('/tags', makeRouter(TagModel));
app.use('/publishers', makeRouter(PublisherModel));
app.use('/categories', makeRouter(CategoryModel));
app.use('/books', makeRouter(BookModel));
app.use('/bookauthor', makeRouter(BookAuthorModel));
app.use('/booktag', makeRouter(BookTagModel));
app.use('/bookcategory', makeRouter(BookCategoryModel));
app.use('/copy', makeRouter(CopyModel));

app.get('*', (req, res) => {
  res.status(418).send({ message: '=)' });
});

const key = readFileSync('key.pem');
const cert = readFileSync('cert.pem');

const server = createServer({ key, cert }, app);

server.listen(port, console.log(`Server listening on port https://localhost:${port}`));
