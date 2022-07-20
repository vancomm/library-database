import { booksRoute } from '../data/routes';
import Service from './Service';
import BookAuthorService from './BookAuthor.service';
import BookCategoryService from './BookCategory.service';
import BookTagService from './BookTag.service';
import PublisherService from './Publisher.service';
import AuthorService from './Author.service';
import CategoryService from './Category.service';
import TagService from './Tag.service';

const BookService = new Service(booksRoute);

BookService.get = async function get(params) {
  const res = await fetch(
    `${this.apiRoute}/get`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  const { count, records } = await res.json();

  const populated = await Promise.all(records.map(async (book) => {
    const publisher = await PublisherService.getById(book.publisherId);

    const { records: bookAuthors } = await BookAuthorService.get({
      where: { bookId: book.id },
    });
    const authors = await Promise.all(bookAuthors
      .map(({ authorId }) => AuthorService.getById(authorId)));

    const { records: bookCategories } = await BookCategoryService.get({
      where: { bookId: book.id },
    });
    const categories = await Promise.all(bookCategories
      .map(({ categoryId }) => CategoryService.getById(categoryId)));

    const { records: bookTags } = await BookTagService.get({
      where: { bookId: book.id },
    });
    const tags = await Promise.all(bookTags
      .map(({ tagId }) => TagService.getById(tagId)));

    return {
      ...book, publisher, authors, categories, tags,
    };
  }));

  return { count, records: populated };
};

BookService.deleteById = async function deleteById(id) {
  await BookAuthorService.delete({ where: { bookId: id } });
  await BookCategoryService.delete({ where: { bookId: id } });
  await BookTagService.delete({ where: { bookId: id } });
  return this.delete({ where: { id } });
};

BookService.postOne = async function postOne(bookWithFKs) {
  const {
    authorIds, categoryIds, tagIds, ...book
  } = bookWithFKs;
  const res = await fetch(
    this.apiRoute,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    },
  );
  const bookId = await res.json();
  authorIds.forEach(async (authorId) => {
    await BookAuthorService.postOne({ bookId, authorId });
  });
  categoryIds.forEach(async (categoryId) => {
    await BookCategoryService.postOne({ bookId, categoryId });
  });
  tagIds.forEach(async (tagId) => {
    await BookTagService.postOne({ bookId, tagId });
  });
};

BookService.updateOne = async function updateOne(bookWithFKs) {
  const {
    authorIds, categoryIds, tagIds, ...book
  } = bookWithFKs;
  const res = await fetch(
    this.apiRoute,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    },
  );
  const bookId = await res.json();

  await BookAuthorService.delete({ where: { bookId } });
  await BookCategoryService.delete({ where: { bookId } });
  await BookTagService.delete({ where: { bookId } });

  authorIds.forEach(async (authorId) => {
    await BookAuthorService.postOne({ bookId, authorId });
  });
  categoryIds.forEach(async (categoryId) => {
    await BookCategoryService.postOne({ bookId, categoryId });
  });
  tagIds.forEach(async (tagId) => {
    await BookTagService.postOne({ bookId, tagId });
  });
};

export default BookService;
