import * as yup from 'yup';
import AuthorService from '../services/Author.service';
import CategoryService from '../services/Category.service';
import PublisherService from '../services/Publisher.service';
import TagService from '../services/Tag.service';
import AuthorModel from './Author.model';
import CategoryModel from './Category.model';
import PublisherModel from './Publisher.model';
import RecordModel from './RecordModel';
import TagModel from './Tag.model';

const name = 'Books';

const formFields = [
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    placeholder: 'Title',
    validation: yup.string().required('Enter a title'),
  },
  {
    label: 'Date of publication',
    name: 'publishedDate',
    type: 'date',
    placeholder: '',
    validation: yup.date().required('Enter a date'),
  },
  {
    label: 'Pages count',
    name: 'pages',
    type: 'number',
    placeholder: 'Pages count',
    validation: yup.number().integer().required('Enter number of pages'),
  },
  {
    label: 'Publisher',
    name: 'publisher',
    type: 'asyncTypeahead',
    placeholder: 'Search for a publisher...',
    validation: yup.array().of(yup.object()).length(1, 'Select a publisher'),
    defaultValue: [],
    labelKey: PublisherModel.toLine,
    fetchFn: (limit, token) => PublisherService.find(limit, 'name', token),
  },
  {
    label: 'Authors',
    name: 'authors',
    type: 'asyncTypeahead',
    placeholder: 'Search for an author...',
    multiple: true,
    validation: yup.array().of(yup.object()).min(1, 'Select one or more authors'),
    defaultValue: [],
    labelKey: AuthorModel.toLine,
    fetchFn: (limit, token) => AuthorService.find(limit, 'firstName || \' \' || lastName', token, false, false),
  },
  {
    label: 'Categories',
    name: 'categories',
    type: 'asyncTypeahead',
    placeholder: 'Search for a category...',
    multiple: true,
    validation: yup.array().of(yup.object()),
    defaultValue: [],
    labelKey: CategoryModel.toLine,
    fetchFn: (limit, token) => CategoryService.find(limit, 'name', token),
  },
  {
    label: 'Tags',
    name: 'tags',
    type: 'asyncTypeahead',
    placeholder: 'Search for a tag...',
    multiple: true,
    validation: yup.array().of(yup.object()),
    defaultValue: [],
    labelKey: TagModel.toLine,
    fetchFn: (limit, token) => TagService.find(limit, 'name', token),
  },
];

const tableHeaders = ['Title', 'Pages', 'Publisher', 'Publication date', 'Authors', 'Categories', 'Tags'];

const toData = ({
  id, title, publisher, publishedDate, pages, authors, categories, tags,
}) => ({
  id,
  title,
  publisherId: publisher[0].id,
  publishedDate,
  pages,
  authorIds: authors.map((author) => author.id),
  categoryIds: categories.map((category) => category.id),
  tagIds: tags.map((tag) => tag.id),
});

const toRow = ({
  id, title, pages, publisher, publishedDate, authors, categories, tags,
}) => ([
  id,
  title,
  pages,
  PublisherModel.toLine(publisher[0]),
  publishedDate,
  authors.map(AuthorModel.toLine).join(', '),
  categories.map(CategoryModel.toLine).join(', '),
  tags.map(TagModel.toLine).join(', '),
]);

const toLine = (book) => book.title;

const BookModel = new RecordModel({
  name, formFields, tableHeaders, toData, toRow, toLine,
});

export default BookModel;
