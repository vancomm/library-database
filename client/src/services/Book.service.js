import { booksRoute } from '../data/routes';
import BookAuthorService from './BookAuthor.service';
import BookCategoryService from './BookCategory.service';
import BookTagService from './BookTag.service';
import Service from './Service';

const BookService = new Service(booksRoute);

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

export default BookService;
