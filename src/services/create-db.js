import dropDatabase from './drop-db.js';
import connectToDb from './connect-to-db.js';

export default function createDb() {
  dropDatabase();

  const db = connectToDb();

  db.run(`CREATE TABLE patron(
  patronId  INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName  TEXT NOT NULL,
  phone     TEXT,
  email     TEXT
)`);

  db.run(`CREATE TABLE publisher(
  publisherId       INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT NOT NULL,
  contactFirstName  TEXT,
  contactLastName   TEXT,
  contactPhone      TEXT,
  contactEmail      TEXT
)`);

  db.run(`CREATE TABLE book(
  bookId        INTEGER PRIMARY KEY AUTOINCREMENT,
  publisherId   INTEGER NOT NULL,
  title         TEXT,
  publishedDate TEXT,
  pagesCount    INTEGER,

  FOREIGN KEY(publisherId) REFERENCES publisher(publisherId)
)`);

  db.run(`CREATE TABLE copy(
  copyId        INTEGER PRIMARY KEY AUTOINCREMENT,
  bookId        INTEGER NOT NULL,
  acquiredDate  TEXT NOT NULL,
  discardedDate TEXT,

  FOREIGN KEY(bookId) REFERENCES book(bookId)
)`);

  db.run(`CREATE TABLE borrow (
  borrowId    INTEGER PRIMARY KEY AUTOINCREMENT,
  patronId    INTEGER NOT NULL,
  copyId      INTEGER NOT NULL,
  borrowDate  TEXT NOT NULL,
  dueDate     TEXT NOT NULL,
  returnDate  TEXT,

  FOREIGN KEY(patronId) REFERENCES patron(patronId),
  FOREIGN KEY(copyId) REFERENCES copy(copyId)
)`);

  db.run(`CREATE TABLE hold(
  holdId    INTEGER PRIMARY KEY AUTOINCREMENT,
  patronId  INTEGER NOT NULL,
  bookId    INTEGER NOT NULL,
  startDate TEXT NOT NULL,
  endDate   TEXT,

  FOREIGN KEY(patronId) REFERENCES patron(patronId),
  FOREIGN KEY(bookId) REFERENCES book(bookId)
)`);

  db.run(`CREATE TABLE review(
  patronId    INTEGER NOT NULL,
  bookId      INTEGER NOT NULL,
  reviewPts   INTEGER NOT NULL,
  reviewText  TEXT,
  reviewDate  TEXT NOT NULL
)`);

  db.run(`CREATE TABLE author(
  authorId  INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName  TEXT NOT NULL,
  phone     TEXT,
  email     TEXT
)`);

  db.run(`CREATE TABLE book_author(
  bookId    INTEGER NOT NULL,
  authorId  INTEGER NOT NULL,

  PRIMARY KEY(bookId, authorId),

  FOREIGN KEY(bookId) REFERENCES book(bookId),
  FOREIGN KEY(authorId) REFERENCES author(authorId)
)`);

  db.run(`CREATE TABLE tag(
  tagId INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  value TEXT
)`);

  db.run(`CREATE TABLE book_tag(
  bookId INTEGER NOT NULL,
  tagId  INTEGER NOT NULL,

  PRIMARY KEY(bookId, tagId),

  FOREIGN KEY(bookId) REFERENCES book(bookId),
  FOREIGN KEY(tagId) REFERENCES tag(tagId)
)`);

  db.run(`CREATE TABLE category(
  categoryId        INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT NOT NULL,
  parentcategoryId  INTEGER,

  FOREIGN KEY(parentcategoryId) REFERENCES category(categoryId)
)`);

  db.run(`CREATE TABLE book_category(
  bookId      INTEGER NOT NULL,
  categoryId  INTEGER NOT NULL,

  PRIMARY KEY(bookId, categoryId),

  FOREIGN KEY(bookId) REFERENCES book(bookId),
  FOREIGN KEY(categoryId) REFERENCES category(categoryId)
)`);
}
