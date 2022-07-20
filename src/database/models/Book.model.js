import Model from './Model.js';
import select from '../crud/select.js';
import remove from '../crud/remove.js';
import insertOne from '../crud/insert-one.js';
import insertMany from '../crud/insert-many.js';
import update from '../crud/update.js';

const BookModel = new Model('book');

BookModel.get = async function get(params) {
  const books = await select(this.table, params);

  const populatedBooks = await Promise.all(books.map(async (book) => {
    const publisher = await select('publisher', { where: { id: book.publisherId } });

    const authors = await select('bookAuthor', {
      alias: 'ba',
      join: {
        left: 'authorId',
        table: 'author a',
        right: 'a.id',
      },
      where: {
        'ba.bookId': book.id,
      },
      columns: ['a.*'],
    });

    const categories = await select('bookCategory', {
      alias: 'bc',
      join: {
        left: 'categoryId',
        table: 'category c',
        right: 'c.id',
      },
      where: {
        'bc.bookId': book.id,
      },
      columns: ['c.*'],
    });

    const tags = await select('bookTag', {
      alias: 'bt',
      join: {
        left: 'tagId',
        table: 'tag t',
        right: 't.id',
      },
      where: {
        'bt.bookId': book.id,
      },
      columns: ['t.*'],
    });

    return {
      ...book, publisher, authors, categories, tags,
    };
  }));

  return populatedBooks;
};

BookModel.insert = async function insert(data) {
  const {
    authorIds, categoryIds, tagIds, ...bookData
  } = data;

  const bookId = await insertOne(this.table, bookData);

  const bookAuthorRows = authorIds.map((authorId) => [bookId, authorId]);
  const bookCategoryRows = categoryIds.map((categoryId) => [bookId, categoryId]);
  const bookTagRows = tagIds.map((tagId) => [bookId, tagId]);

  return Promise.all([
    insertMany('bookAuthor', ['bookId', 'authorId'], bookAuthorRows),
    insertMany('bookCategory', ['bookId', 'categoryId'], bookCategoryRows),
    insertMany('bookTag', ['bookId', 'tagId'], bookTagRows),
  ]);
};

BookModel.removeById = async function removeById(id) {
  return Promise.all([
    remove(this.table, { where: { id } }),
    remove('bookAuthor', { where: { bookId: id } }),
    remove('bookCategory', { where: { bookId: id } }),
    remove('bookTag', { where: { bookId: id } }),
  ]);
};

BookModel.updateById = async function updateById(bookId, book) {
  const {
    authorIds, categoryIds, tagIds, ...data
  } = book;

  const bookAuthorRows = authorIds.map((authorId) => [bookId, authorId]);
  const bookCategoryRows = categoryIds.map((categoryId) => [bookId, categoryId]);
  const bookTagRows = tagIds.map((tagId) => [bookId, tagId]);

  return Promise.all([
    update(this.table, { id: bookId }, data),
    remove('bookAuthor', { where: { bookId } }),
    remove('bookCategory', { where: { bookId } }),
    remove('bookTag', { where: { bookId } }),
  ]).then(() => Promise.all([
    insertMany('bookAuthor', ['bookId', 'authorId'], bookAuthorRows),
    insertMany('bookCategory', ['bookId', 'categoryId'], bookCategoryRows),
    insertMany('bookTag', ['bookId', 'tagId'], bookTagRows),
  ]));
};

export default BookModel;
