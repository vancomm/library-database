import Model from './Model.js';
import select from '../crud/select.js';

const BookModel = new Model('book');

BookModel.get = async function get(params) {
  const books = await select(this.table, params);

  const populatedBooks = await Promise.all(books.map(async (book) => {
    const [publisher] = await select('publisher', { where: { id: book.publisherId } });

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

// BookModel.remove = async function remove() {

// }

export default BookModel;
