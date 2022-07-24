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
  const {
    username, name, password, role,
  } = req.body;
  if (!username || !name || !password || !role) {
    res.status(422).json({ message: 'Request body must contain a username, a name, a password and a role.' });
    return;
  }
  const userExists = await UserModel.findOne({ username });
  if (userExists) {
    res.status(409).json({ message: 'Username taken.' });
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username, name, role, hash,
  };
  await UserModel.insert(user);
  const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
  res.status(201).json({ user, token });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
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
  const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
  res.status(200).json({ user, token });
});

/*
    TODO: authAdmin middleware
          check if req.user.role is 'admin'
          for privileged endpoints
*/

app.use('/patrons', auth, makeRouter(PatronModel));
app.use('/authors', auth, makeRouter(AuthorModel));
app.use('/tags', auth, makeRouter(TagModel));
app.use('/publishers', auth, makeRouter(PublisherModel));
app.use('/categories', auth, makeRouter(CategoryModel));
app.use('/books', auth, makeRouter(BookModel));
app.use('/bookauthors', auth, makeRouter(BookAuthorModel));
app.use('/booktags', auth, makeRouter(BookTagModel));
app.use('/bookcategories', auth, makeRouter(BookCategoryModel));
app.use('/copies', auth, makeRouter(CopyModel));
app.use('/users', auth, makeRouter(UserModel));

app.get('*', (req, res) => {
  res.status(418).send({ message: '=)' });
});

const key = readFileSync('key.pem');
const cert = readFileSync('cert.pem');

const server = createServer({ key, cert }, app);

server.listen(port, console.log(`Server listening on port https://localhost:${port}`));
