import dropDatabase from './drop-db.js';
import connectToDb from './connect-to-db.js';

export default function createDb() {
  dropDatabase();

  const db = connectToDb();

  db.run(`CREATE TABLE patron(
  patronid  INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname  TEXT NOT NULL,
  phone     TEXT,
  email     TEXT
)`);

  db.run(`CREATE TABLE publisher(
  publisherid       INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT NOT NULL,
  contactfirstname  TEXT,
  contactlastname   TEXT,
  contactphone      TEXT,
  contactemail      TEXT
)`);

  db.run(`CREATE TABLE book(
  bookid        INTEGER PRIMARY KEY AUTOINCREMENT,
  publisherid   INTEGER NOT NULL,
  title         TEXT,
  publisheddate TEXT,
  pagescount    INTEGER,

  FOREIGN KEY(publisherid) REFERENCES publisher(publisherid)
)`);

  db.run(`CREATE TABLE copy(
  copyid        INTEGER PRIMARY KEY AUTOINCREMENT,
  bookid        INTEGER NOT NULL,
  acquireddate  TEXT NOT NULL,
  discardeddate TEXT,

  FOREIGN KEY(bookid) REFERENCES book(bookid)
)`);

  db.run(`CREATE TABLE borrow (
  borrowid    INTEGER PRIMARY KEY AUTOINCREMENT,
  patronid    INTEGER NOT NULL,
  copyid      INTEGER NOT NULL,
  borrowdate  TEXT NOT NULL,
  duedate     TEXT NOT NULL,
  returndate  TEXT,

  FOREIGN KEY(patronid) REFERENCES patron(patronid),
  FOREIGN KEY(copyid) REFERENCES copy(copyid)
)`);

  db.run(`CREATE TABLE hold(
  holdid    INTEGER PRIMARY KEY AUTOINCREMENT,
  patronid  INTEGER NOT NULL,
  bookid    INTEGER NOT NULL,
  startdate TEXT NOT NULL,
  enddate   TEXT,

  FOREIGN KEY(patronid) REFERENCES patron(patronid),
  FOREIGN KEY(bookid) REFERENCES book(bookid)
)`);

  db.run(`CREATE TABLE review(
  patronid    INTEGER NOT NULL,
  bookid      INTEGER NOT NULL,
  reviewpts   INTEGER NOT NULL,
  reviewtext  TEXT,
  reviewdate  TEXT NOT NULL
)`);

  db.run(`CREATE TABLE author(
  authorid  INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname  TEXT NOT NULL,
  phone     TEXT,
  email     TEXT
)`);

  db.run(`CREATE TABLE book_author(
  bookid    INTEGER NOT NULL,
  authorid  INTEGER NOT NULL,

  PRIMARY KEY(bookid, authorid),

  FOREIGN KEY(bookid) REFERENCES book(bookid),
  FOREIGN KEY(authorid) REFERENCES author(authorid)
)`);

  db.run(`CREATE TABLE tag(
  tagid INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  value TEXT
)`);

  db.run(`CREATE TABLE book_tag(
  bookid INTEGER NOT NULL,
  tagid  INTEGER NOT NULL,

  PRIMARY KEY(bookid, tagid),

  FOREIGN KEY(bookid) REFERENCES book(bookid),
  FOREIGN KEY(tagid) REFERENCES tag(tagid)
)`);

  db.run(`CREATE TABLE category(
  categoryid        INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT NOT NULL,
  parentcategoryid  INTEGER,

  FOREIGN KEY(parentcategoryid) REFERENCES category(categoryid)
)`);

  db.run(`CREATE TABLE book_category(
  bookid      INTEGER NOT NULL,
  categoryid  INTEGER NOT NULL,

  PRIMARY KEY(bookid, categoryid),

  FOREIGN KEY(bookid) REFERENCES book(bookid),
  FOREIGN KEY(categoryid) REFERENCES category(categoryid)
)`);
}
