import * as yup from 'yup';
import RecordModel from './RecordModel';
import BookModel from './Book.model';
import PatronModel from './Patron.model';
import BookService from '../services/Book.service';
import PatronService from '../services/Patron.service';
import CopyService from '../services/Copy.service';
import addDays from '../utils/add-days';

const name = 'Borrows';

const formFields = [
  {
    label: 'Patron',
    name: 'patron',
    type: 'asyncTypeahead',
    placeholder: 'Search for a patron',
    validation: yup.array().of(yup.object()).length(1, 'Select a patron'),
    defaultValue: [],
    fetchFn: (limit, token) => PatronService.find(limit, 'firstName || \' \' || lastName', token, false, false),
    labelKey: PatronModel.toLine,
  },
  {
    label: 'Book',
    name: 'book',
    type: 'asyncTypeahead',
    placeholder: 'Search for a book...',
    validation: yup.array().of(yup.object()).min(1, 'Select a book'),
    defaultValue: [],
    fetchFn: (limit, token) => BookService.find(limit, 'title', token),
    labelKey: (book) => book.title,
  },
  {
    label: 'Date',
    name: 'borrowDate',
    type: 'date',
    placeholder: '',
    validation: yup.date().required('Enter date of borrow'),
  },
  {
    label: 'Borrow period',
    name: 'borrowPeriod',
    type: 'number',
    placeholder: 'Enter borrow period',
    validation: yup.number().integer('This value must be integer').required('Enter borrow period'),
  },
];

const beforeInsert = async (values) => {
  const {
    patron, book, borrowDate, borrowPeriod,
  } = values;
  const copy = await CopyService.find();
};

const beforeUpdate = async (values) => {

};

const tableHeaders = ['Book', 'Patron', 'Date', 'Due date'];

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
  id, book, patron, borrowDate, dueDate,
}) => ([
  id,
  BookModel.toLine(book[0]),
  PatronModel.toLine(patron[0]),
  borrowDate,
  dueDate,
]);

// const toLine = ({ book }) => BookModel.toLine(book[0]);
const toLine = (borrow) => {
  // console.log(borrow);
  if (borrow?.book) return BookModel.toLine(borrow.book[0]);
  return '';
};

const BorrowModel = new RecordModel({
  name, formFields, tableHeaders, toData, toRow, toLine,
});

export default BorrowModel;
