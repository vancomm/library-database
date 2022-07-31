import * as yup from 'yup';
import RecordModel from './RecordModel';
import BookModel from './Book.model';
import PatronModel from './Patron.model';
import BookService from '../services/Book.service';
import PatronService from '../services/Patron.service';
import addDays from '../utils/add-days';
import wildcard from '../utils/wildcard';
import dateToString from '../utils/date-to-string';

const name = 'Borrows';

const formFields = [
  {
    label: 'Patron',
    name: 'patron',
    type: 'asyncTypeahead',
    placeholder: 'Search for a patron',
    validation: yup.array().of(yup.object()).length(1, 'Select a patron'),
    defaultValue: [],
    fetchFn: (limit, token) => (query) => PatronService.findString(
      wildcard(query, true, true),
      'firstName || \' \' || lastName',
      token,
      limit,
    ),
    labelKey: PatronModel.toLine,
  },
  {
    label: 'Book',
    name: 'book',
    type: 'asyncTypeahead',
    placeholder: 'Search for a book...',
    validation: yup.array().of(yup.object()).min(1, 'Select a book'),
    defaultValue: [],
    fetchFn: (limit, token) => (query) => BookService.findString(wildcard(query), 'title', token, limit),
    labelKey: (book) => book.title,
  },
  {
    label: 'Start date',
    name: 'borrowDate',
    type: 'date',
    placeholder: '',
    defaultValue: (new Date()).toISOString().split('T')[0],
    validation: yup.date().required('Enter date of borrow'),
  },
  {
    label: 'Borrow period',
    name: 'borrowPeriod',
    type: 'number',
    placeholder: 'Enter borrow period',
    defaultValue: 14,
    validation: yup.number().integer('This value must be integer').required('Enter borrow period'),
  },
];

const beforeInsert = async (values, { token }) => {
  const {
    patron, book, borrowDate, borrowPeriod,
  } = values;
  console.log(values);
  const res = await BookService.getAvailableCopy(book[0].id, token);
  if (res.status !== 200) {
    if (res.status === 404) return { success: false, message: 'This book is unavailable now. You can place a hold instead.' };
    const { message } = await res.json();
    return { success: false, message };
  }

  const { id: copyId } = await res.json();

  return {
    success: true,
    record: {
      patronId: patron[0].id,
      copyId,
      borrowDate,
      dueDate: dateToString(addDays(borrowDate, borrowPeriod)),
    },
  };
};

const beforeUpdate = async (values) => {
  const {
    id, patron, patronId, copyId, borrowDate, borrowPeriod,
  } = values;
  return {
    success: true,
    record: {
      id,
      patronId: patron[0]?.id ?? patronId,
      copyId,
      borrowDate,
      dueDate: dateToString(addDays(borrowDate, borrowPeriod)),
    },
  };
};

const tableHeaders = ['Book', 'Patron', 'Copy id', 'Start date', 'Due date', 'Return date'];

const toData = ({
  id, copy, patron, borrowDate, borrowPeriod,
}) => ({
  id,
  copyId: copy[0].id,
  patronId: patron[0].id,
  borrowDate,
  dueDate: addDays(borrowDate, borrowPeriod),
});

const toRow = ({
  id, book, patron, copyId, borrowDate, dueDate, returnDate,
}) => ([
  id,
  BookModel.toLine(book[0]),
  PatronModel.toLine(patron[0]),
  copyId,
  borrowDate,
  dueDate,
  returnDate,
]);

const toLine = (borrow) => {
  if (borrow?.book) return BookModel.toLine(borrow.book[0]);
  return '';
};

const BorrowModel = new RecordModel({
  name,
  formFields,
  tableHeaders,
  toData,
  toRow,
  toLine,
  beforeInsert,
  beforeUpdate,
});

export default BorrowModel;
