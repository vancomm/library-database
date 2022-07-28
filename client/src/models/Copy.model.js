import * as yup from 'yup';
import BookModel from './Book.model';
import BookService from '../services/Book.service';
import RecordModel from './RecordModel';
import wildcard from '../utils/wildcard';

const name = 'Copies';

const formFields = [
  {
    label: 'Book',
    name: 'book',
    type: 'asyncTypeahead',
    placeholder: 'Search for a book...',
    validation: yup.array().of(yup.object()).min(1, 'Select a book'),
    defaultValue: [],
    labelKey: (book) => book.title,
    // fetchFn: (limit, token) => BookService.find(limit, 'title', token),
    fetchFn: (limit, token) => (query) => BookService.findString(wildcard(query), 'title', token, limit),
  },
  {
    label: 'Number',
    name: 'number',
    type: 'number',
    placeholder: 'Number of copies',
    defaultValue: 1,
    validation: yup.number().integer('Number must be integer').min(1, 'Number must be 1 or greater').required('Enter number of copies'),
  },
  {
    label: 'Date of acquisition',
    name: 'acquiredDate',
    type: 'date',
    placeholder: '',
    validation: yup.date().required('Enter date of acquisition'),
  },
  {
    label: 'Date of discard',
    name: 'discardedDate',
    type: 'date',
    placeholder: '',
    validation: yup.date('Enter date of discard'),
  },
];

const tableHeaders = ['Book', 'Date of acquisition', 'Date of discard'];

const toData = ({
  id, number, book, acquiredDate, discardedDate,
}) => ({
  id,
  number,
  bookId: book[0].id,
  acquiredDate,
  discardedDate,
});

const toRow = ({
  id, book, acquiredDate, discardedDate,
}) => ([
  id, BookModel.toLine(book[0]), acquiredDate, discardedDate,
]);

const toLine = (copy) => {
  if (typeof copy.book?.[0] === 'undefined') return '';
  return BookModel.toLine(copy.book[0]);
};

const CopyModel = new RecordModel({
  name, formFields, tableHeaders, toData, toRow, toLine,
});

export default CopyModel;
