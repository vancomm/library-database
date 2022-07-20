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
