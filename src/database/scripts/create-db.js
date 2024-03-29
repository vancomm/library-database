import db from '../db.js';
import resetDb from './reset-db.js';

export default function createDb(dbPath) {
  resetDb(dbPath);

  db.run(`CREATE TABLE patron(
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName  TEXT NOT NULL,
  phone     TEXT,
  email     TEXT
)`);

  db.run(`CREATE TABLE publisher(
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT NOT NULL,
  contactFirstName  TEXT,
  contactLastName   TEXT,
  contactPhone      TEXT,
  contactEmail      TEXT
)`);

  db.run(`CREATE TABLE book(
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  publisherId   INTEGER NOT NULL,
  title         TEXT NOT NULL,
  publishedDate TEXT NOT NULL,
  pages         INTEGER NOT NULL,

  FOREIGN KEY(publisherId) REFERENCES publisher(id)
)`);

  db.run(`CREATE TABLE copy(
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  bookId        INTEGER NOT NULL,
  acquiredDate  TEXT NOT NULL,
  discardedDate TEXT,

  FOREIGN KEY(bookId) REFERENCES book(id)
)`);

  db.run(`CREATE TABLE borrow (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  patronId    INTEGER NOT NULL,
  copyId      INTEGER NOT NULL,
  borrowDate  TEXT NOT NULL,
  dueDate     TEXT NOT NULL,
  returnDate  TEXT,

  FOREIGN KEY(patronid) REFERENCES patron(id),
  FOREIGN KEY(copyId) REFERENCES copy(id)
)`);

  db.run(`CREATE TABLE hold(
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  patronId  INTEGER NOT NULL,
  bookId    INTEGER NOT NULL,
  startDate TEXT NOT NULL,
  endDate   TEXT,

  FOREIGN KEY(patronId) REFERENCES patron(id),
  FOREIGN KEY(bookId) REFERENCES book(id)
)`);

  db.run(`CREATE TABLE review(
  patronId    INTEGER NOT NULL,
  bookId      INTEGER NOT NULL,
  reviewPts   INTEGER NOT NULL,
  reviewDate  TEXT NOT NULL,
  reviewText  TEXT,
  
  FOREIGN KEY (patronId) REFERENCES patron(id)
)`);

  db.run(`CREATE TABLE author(
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName  TEXT NOT NULL,
  phone     TEXT,
  email     TEXT
)`);

  db.run(`CREATE TABLE category(
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL,
  parentId  INTEGER,

  FOREIGN KEY(parentId) REFERENCES category(id)
)`);

  db.run(`CREATE TABLE tag(
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL
)`);

  db.run(`CREATE TABLE bookAuthor(
  bookId    INTEGER NOT NULL,
  authorId  INTEGER NOT NULL,

  PRIMARY KEY(bookId, authorId),

  FOREIGN KEY(bookId) REFERENCES book(id),
  FOREIGN KEY(authorId) REFERENCES author(id)
)`);

  db.run(`CREATE TABLE bookCategory(
  bookId      INTEGER NOT NULL,
  categoryId  INTEGER NOT NULL,

  PRIMARY KEY(bookId, categoryId),

  FOREIGN KEY(bookId) REFERENCES book(id),
  FOREIGN KEY(categoryId) REFERENCES category(id)
)`);

  db.run(`CREATE TABLE bookTag(
  bookId INTEGER NOT NULL,
  tagId  INTEGER NOT NULL,

  PRIMARY KEY(bookId, tagId),

  FOREIGN KEY(bookId) REFERENCES book(id),
  FOREIGN KEY(tagId) REFERENCES tag(id)
)`);

  db.run(`CREATE TABLE user(
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  username  TEXT NOT NULL,
  hash      TEXT NOT NULL,
  name      TEXT NOT NULL,
  role      TEXT NOT NULL,
  patronId  INTEGER,

  FOREIGN KEY(patronId) REFERENCES patron(id)
)`);
}
