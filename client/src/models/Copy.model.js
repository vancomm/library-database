import * as yup from 'yup';
import Model from './Model';
import BookModel from './Book.model';
import BookService from '../services/Book.service';

const CopyModel = new Model({
  name: 'Copies',
  schema: yup.object().shape({
    book: yup.array().of(yup.object()).min(1, 'Select a book'),
    number: yup.number().integer('Number must be integer').min(1, 'Number must be 1 or greater').required('Enter number of copies'),
    acquiredDate: yup.date().required('Enter date of acquisition'),
    discardedDate: yup.date('Enter date of discard'),
  }),
  formControls: [
    {
      label: 'Book',
      name: 'book',
      type: 'asyncTypeahead',
      placeholder: 'Search for a book...',
      labelKey: (book) => book.title,
      fetchFn: (limit) => BookService.find(limit, 'title'),
    },
    {
      label: 'Number',
      name: 'number',
      type: 'number',
      placeholder: 'Number of copies',
    },
    {
      label: 'Date of acquisition',
      name: 'acquiredDate',
      type: 'date',
      placeholder: '',
    },
    {
      label: 'Date of discard',
      name: 'discardedDate',
      type: 'date',
      placeholder: '',
    },
  ],
  defaultValues: {
    book: [],
    number: 1,
  },
  headers: ['Book', 'Date of acquisition', 'Date of discard'],
  recordsToTable: (copies) => copies
    .map(({
      id, book, acquiredDate, discardedDate,
    }) => ({
      id, data: [BookModel.recordToTitle(book[0]), acquiredDate, discardedDate],
    })),
  cleanRecord: ({
    id, number, book, acquiredDate, discardedDate,
  }) => ({
    id,
    number,
    bookId: book[0].id,
    acquiredDate,
    discardedDate,
  }),
  recordToTitle: (copy) => {
    if (typeof copy.book?.[0] === 'undefined') return '';
    return BookModel.recordToTitle(copy.book[0]);
  },
});

export default CopyModel;
